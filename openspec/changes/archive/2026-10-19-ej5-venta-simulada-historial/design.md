# Design

## Context

Ver `proposal.md` — Why. El Ejercicio 5 ya está implementado (`eb29f55`, mergeado en `c1afe3b`) y este change documenta su comportamiento y corrige dos defectos.

Estado actual relevante:

- `js/app.js` mantiene la venta en curso en `window.ventaEnCurso.renglones` y el historial en `window.historialVentas`.
- `renderRenglonesVenta()` vacía `#ventas-renglones` y reconstruye cada fila, creando un `<input type="number">` nuevo por renglón. Su listener de `change` llama a `cambiarCantidadRenglon`, que actualiza el modelo y **siempre** vuelve a llamar a `renderRenglonesVenta()`.
- Consecuencia medida: al editar la cantidad, el nodo enfocado se destruye. El foco cae al `body` o al inicio de la página, el segundo ArrowUp no llega al campo y un clic en «Quitar renglón» se pierde porque la tabla se redibuja antes de que el clic se complete.
- `index.html` conserva textos de maqueta en mensajes de estado: «(datos de ejemplo)» en `#catalogo-sin-resultados` y `#catalogo-vacio`, y «(mensaje de ejemplo)» en `#libros-exito`, `#libros-error`, `#clientes-exito` y `#clientes-error`.

Restricciones: vanilla JS sin librerías ni `npm`, `textContent` para datos, no cambiar ids ni visibilidad de mensajes, estilos de código existentes (`var`, funciones nombradas), y la corrección no debe alterar el modelo de datos, la confirmación, el historial ni la persistencia del Ej.6.

## Goals / Non-Goals

**Goals:**

- Editar una cantidad válida actualiza el subtotal de esa fila y el total **sin reemplazar el input** ni perder el foco.
- Una cantidad inválida restaura el último valor válido, muestra el error y no destruye el campo enfocado.
- «Quitar renglón» sigue funcionando con un solo clic.
- Los mensajes del catálogo y los mensajes de alta quedan como texto definitivo, sin referencias a datos de ejemplo.
- Una sola fuente de verdad para el total y los subtotales, sin duplicar fórmulas.

**Non-Goals:**

- Reescribir la venta, el historial o la persistencia ya implementados.
- Cambiar ids, estructura HTML, clases, visibilidad o textos funcionales que el JS escribe.
- Editar `README.md` o los casos manuales.
- Agregar pruebas automatizadas o un runner: la verificación es por lectura de código y comprobación manual en navegador.

## Decisions

### Actualización en su lugar para una cantidad válida

En el listener de `change` de cada input de cantidad, capturado en el closure de `renderRenglonesVenta()` junto con la celda de subtotal de esa fila:

1. Parsear el valor con `parsearCantidadEntera`.
2. Si es válido, asignar `renglon.cantidad`, actualizar el `textContent` de la celda de subtotal de esa fila y recalcular el total con un helper.
3. Mostrar el mensaje de éxito.
4. **No** llamar a `renderRenglonesVenta()`.

Así el nodo `<input>` sigue siendo el mismo, conserva el foco y el clic sobre «Quitar renglón» no se pierde.

Alternativas consideradas:

- Redibujar y luego restaurar foco y selección: rechazada porque el nodo nuevo rompe el clic en curso y la restauración de selección es frágil entre navegadores.
- Delegación de eventos con `data-index` en la tabla: rechazada porque exige un refactor mayor; el closure por fila ya existe y es suficiente para el volumen de la vista.

`cambiarCantidadRenglon(index, nuevaCantidad)` se conserva como API de actualización del modelo y devuelve si la cantidad fue válida, para no duplicar la validación. El listener de la fila usa ese resultado y actualiza su propia celda y el total. Si otro código llama a la función sin referencias de fila, el modelo queda actualizado y la vista se reconcilia al siguiente render.

### Helpers únicos para subtotal y total

Se extraen dos helpers:

- `calcularSubtotal(renglon)`: `redondear2(cantidad * precioUnitario)`.
- `actualizarTotalVenta()`: suma los subtotales vigentes de `window.ventaEnCurso.renglones`, redondea a dos decimales y escribe `#ventas-total`.

`renderRenglonesVenta()` usa los mismos helpers al construir filas. Editar una cantidad y quitar un renglón llaman a `actualizarTotalVenta()`, de modo que la fórmula vive en un solo lugar.

Alternativa considerada: mantener la suma inline en cada camino. Rechazada porque es exactamente el tipo de duplicación que produjo la inconsistencia actual.

### Cantidad inválida sin robar el foco

Si el valor no es un entero positivo, el listener restaura `input.value = renglon.cantidad` (el modelo conserva la última cantidad válida), muestra el error y no vuelve a renderizar. Cuando el evento ocurre con el campo enfocado (Enter, flechas), el foco permanece naturalmente. Si el evento se dispara por `blur` (Tab), no se fuerza el foco de vuelta: se respeta la navegación del usuario y se evita pelear con el siguiente control.

### Quitar renglón puede seguir redibujando

`eliminarRenglon(index)` mantiene el patrón actual: quita del modelo, actualiza el total y redibuja la tabla. El usuario ya hizo clic en el botón, por lo que no hay foco dentro de la fila que preservar ni clic en curso que proteger.

### Corrección de textos sin tocar estructura

Se editan únicamente los nodos de texto de los seis párrafos, conservando `id`, `role`, `hidden` y clases:

- `#catalogo-sin-resultados`: «No se encontraron libros con ese título.»
- `#catalogo-vacio`: «No hay libros en el catálogo.»
- `#libros-exito`: «Libro agregado correctamente.»
- `#libros-error`: «No se pudo agregar el libro: revisá los campos.»
- `#clientes-exito`: «Cliente agregado correctamente.»
- `#clientes-error`: «No se pudo agregar el cliente: revisá los campos.»

El JavaScript del Ej.4 ya reescribe los cuatro mensajes de alta en cada operación; el texto estático es solo el estado inicial y debe ser coherente. Para el catálogo, el texto es el que se muestra de forma efectiva, por lo que la delta MODIFIED del Ej.3 fija la expectativa.

## Risks / Trade-offs

- [El evento `change` se dispara al perder el foco] → En el camino válido no hay re-render, así que el foco ya avanzó al siguiente control de forma natural; en el inválido se evita forzarlo de vuelta. Las comprobaciones manuales cubren ArrowUp, Tab y clic.
- [`<input type="number">` acepta estados transitorios vacíos o `-`] → `parsearCantidadEntera` ya los rechaza; la restauración usa la última cantidad válida del modelo.
- [Duplicación de la fórmula de total] → Se centraliza en `calcularSubtotal` y `actualizarTotalVenta`, usados por render, edición y quita.
- [Sin runner de pruebas] → La verificación combina lectura de código (ids, flujos y fórmulas) con comprobaciones manuales que confirma el usuario; no se marcan como completadas sin esa confirmación.
- [El precio histórico depende de copiar al agregar] → No se toca esa lógica; se verifica por lectura que `precioUnitario` se copia en el renglón y en la venta confirmada.

## Migration Plan

Sin migración de datos: el modelo y las claves de `localStorage` no cambian. Los cambios son de presentación e interacción en `js/app.js` e `index.html`. Rollback: revertir esos dos archivos y los textos de los seis mensajes; el historial guardado sigue siendo compatible.
