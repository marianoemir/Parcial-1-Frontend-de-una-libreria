# Design

## Context

Ver `proposal.md` para la motivación. El estado actual verificado en `js/app.js`:

- `actualizarOpciones()` (líneas 426-454) usa `reconstruirSelect`, que siempre crea una opción con `disabled = true` y `selected = true`, y la antepone a cada `<select>`. Para `#libro-autores` (múltiple) se llama con texto `""`, por lo que queda una opción vacía seleccionada; `procesarAltaLibro` (líneas 473-479) recorre `options` y empuja el `value` de las seleccionadas, incluyendo `""`. `validarLibro` (líneas 286-295) no filtra los ids vacíos: con solo `""` no dispara «Seleccioná al menos un autor» y en su lugar emite «El autor  no existe».
- `reconstruirSelect(generoSelect, window.generos, "Sin clasificar", "")` crea «Sin clasificar» con `disabled = true`, así que una vez elegido un género real no puede volver a seleccionarse.
- `procesarAltaLibro` guarda `titulo: datos.titulo` sin `trim` (línea 499) y `procesarAltaCliente` guarda `nombre: datos.nombre` sin `trim` (línea 564); el email ya se recorta (línea 565).
- `window.inicializar` (líneas 212-223, DOMContentLoaded del Ej.3) ejecuta `window.renderCatalogo(window.libros)` sin mirar el valor actual de `#catalogo-busqueda`, por lo que ignora el texto que el navegador restaura al cargar.
- `index.html` tiene 5 párrafos `<p><strong>Maqueta: sin funcionamiento todavía.</strong>…</p>`, uno por sección (Catálogo, Libros, Clientes, Ventas, Historial). Ningún `id` cambia.

`test/tests.js` (líneas 786-836) reimplementa `reconstruirSelect` y afirma `autoresSelect.options.length === window.autores.length + 1` (línea 835), es decir, espera el placeholder en el `<select multiple>`. El alcance de `test/` está pendiente con su autor.

## Goals / Non-Goals

**Goals:**
- Corregir el comportamiento de las opciones de los selectores de alta (R-01, R-03) y el mensaje de autor (R-02).
- Guardar título y nombre con `trim` (R-04).
- Hacer que el catálogo respete el buscador al cargar (R-05).
- Retirar los textos de maqueta de las secciones que ya funcionan (R-06).
- Mantener todo nativo (HTML/CSS/JS), sin CDNs, sin npm y con apertura directa de `index.html`.

**Non-Goals:**
- No modificar `test/` (decisión pendiente con su autor).
- No tocar el listener `input` no-op del buscador.
- No implementar persistencia, ventas (Ej.5), `localStorage` (Ej.6), README ni cambios de CSS.
- No cambiar ningún `id` existente ni introducir dependencias externas.

## Decisions

- **R-01 — `reconstruirSelect` con placeholder opcional y sin opción vacía en el selector múltiple.** Se parametriza el helper para distinguir tres casos: (a) placeholder deshabilitado (editorial, venta-cliente), (b) opción inicial habilitada y seleccionada (género), (c) sin placeholder (autores múltiples). Para autores se omitirá por completo la opción vacía, de modo que leer las opciones seleccionadas nunca devuelva `""`. Alternativa descartada: crear la opción vacía con `disabled` pero sin `selected` — igualmente aportaría un `value` `""` interpretable como autor y contaría en `options.length`; además el requisito exige que no se agregue.
- **R-02 — `validarLibro` normaliza los ids de autores.** Antes de validar, se descartan los identificadores vacíos (`filter(id => id !== "")`). Si no queda ninguno, el error es exactamente «Seleccioná al menos un autor»; si quedan, se validan contra `window.autores`. Se mantiene el filtrado también en `procesarAltaLibro` como defensa en profundidad, aunque el contrato queda en `validarLibro`. Alternativa descartada: corregir solo la lectura de `select` sin tocar `validarLibro` — la función pura seguiría siendo incorrecta para cualquier otro consumidor.
- **R-03 — «Sin clasificar» habilitada y por defecto.** El selector de género se reconstruye con su opción inicial (value `""`, texto «Sin clasificar») *habilitada* y `selected = true`, para que pueda reseleccionarse tras elegir un género. Editorial y venta-cliente conservan el placeholder deshabilitado. Alternativa descartada: añadir «Sin clasificar» como una opción más al final — no sería la opción por defecto y rompería el orden esperado.
- **R-04 — `trim` explícito al almacenar.** `procesarAltaLibro` guarda `datos.titulo.trim()` y `procesarAltaCliente` guarda `datos.nombre.trim()`. Alternativa descartada: recortar en `validarLibro` — esa función es de validación, no de transformación, y debe seguir siendo pura respecto de los datos.
- **R-05 — `inicializar` respeta el buscador.** Se reemplaza la llamada incondicional `window.renderCatalogo(window.libros)` por `window.ejecutarBusqueda()`, que lee `#catalogo-busqueda`, aplica `trim` y filtra (vacío → todo el catálogo). En el momento de `DOMContentLoaded`, `window.ejecutarBusqueda` ya está definida. Alternativa descartada: leer el campo y elegir entre filtro y render total — duplicaría la lógica que ya vive en `ejecutarBusqueda`.
- **R-06 — retirar el párrafo de maqueta en 3 secciones.** Se elimina el `<p>` que contiene «Maqueta: sin funcionamiento todavía.» en Catálogo, Libros y Clientes, conservando los de Ventas e Historial. Ningún `id` cambia. Se ajusta en la delta de `ej2-identidad-visual` el escenario «Id intactos», que hoy exige que esos textos permanezcan.

## Risks / Trade-offs

- [Conclusión] No hay conflicto con `test/tests.js:835`: esa aserción opera sobre una copia local de `reconstruirSelect` definida dentro del propio test y no depende del código de `js/app.js`. El arnés local da 187 pasó / 0 falló antes y después de R-01; `test/` no se modifica.
- [Riesgo] El párrafo de maqueta del Catálogo también incluye «Datos de ejemplo (no reales).» → Mitigación: se asume que se retira el `<p>` completo de esa sección (el enunciado pide quitar el texto de maqueta); se registra como pregunta abierta.
- [Riesgo] Al guardar cualquier alta, `actualizarOpciones()` reconstruye el selector de género y este vuelve a «Sin clasificar» → Comportamiento preexistente del patrón de reconstrucción; se acepta y se registra.
- [Riesgo] `window.inicializar` reasigna el render del catálogo y podría afectar pruebas que cuentan fichas → Mitigación: con el campo vacío `filtrarPorTitulo("")` devuelve todo el catálogo, equivalente al comportamiento previo.
- [Riesgo] El requisito R-06 contradice el escenario actual de `ej2-identidad-visual` → Mitigación: se incluye una delta de esa capability que ajusta el escenario, dejando la spec coherente.

## Migration Plan

1. Editar `js/app.js`: parametrizar `reconstruirSelect` para los tres casos (placeholder deshabilitado / opción inicial habilitada / sin opción) en `actualizarOpciones`.
2. Editar `js/app.js`: normalizar ids vacíos en `validarLibro` y devolver «Seleccioná al menos un autor» cuando no quede ninguno.
3. Editar `js/app.js`: `trim` al almacenar título y nombre en `procesarAltaLibro` y `procesarAltaCliente`.
4. Editar `js/app.js`: `window.inicializar` llama a `window.ejecutarBusqueda()` en lugar de renderizar todo sin filtrar.
5. Editar `index.html`: retirar el `<p>` de maqueta en Catálogo, Libros y Clientes.
6. Verificación manual en navegador (confirma el usuario) y ejecución del arnés local equivalente, porque `test/run-tests.js` tiene rutas absolutas a `C:/Users/andre/...`, registrando el resultado.

Rollback: revertir los cambios de `js/app.js` e `index.html` (no hay migraciones de datos ni cambios de esquema).

## Open Questions

- ¿El párrafo de maqueta del Catálogo se elimina completo (incluye «Datos de ejemplo (no reales).») o solo la frase de maqueta? Se asumió el párrafo completo.
- ¿Confirmar que `ej2-identidad-visual` es la capability correcta para la delta de R-06, dado que su escenario «Id intactos» menciona explícitamente los textos de maqueta?
