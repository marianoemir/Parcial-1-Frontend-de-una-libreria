# Proposal

## Why

El Ejercicio 5 de la consigna (venta simulada e historial) ya está implementado en `main` antes de que existiera este change: llegó con el PR #2 de Facundo (`eb29f55`, mergeado en `c1afe3b`). Por eso este change no propone construir la funcionalidad desde cero, sino **documentar como especificación el comportamiento ya entregado y corregir dos defectos detectados** en esa implementación. La documentación permite verificar el Ejercicio 5 contra escenarios observables y deja registro de las correcciones necesarias.

## What Changes

- Se documenta el comportamiento ya implementado de la venta simulada: composición de la venta, edición y quita de renglones, cálculos con dos decimales, confirmación con precio histórico y consulta del historial en modo lectura.
- **Corrección A**: al cambiar la cantidad de un renglón, el campo pierde el foco porque `cambiarCantidadRenglon` redibuja toda la tabla y reemplaza el `<input>`. Se pedirá actualizar en su lugar el subtotal de la fila y el total (sin reemplazar el input) cuando la cantidad sea válida, y restaurar el valor mostrando el error conservando el foco cuando sea inválida. Quitar un renglón puede seguir redibujando la tabla.
- **Corrección B**: se quitan los textos residuales de maqueta de `index.html`: «(datos de ejemplo)» de `#catalogo-sin-resultados` y `#catalogo-vacio`, y «(mensaje de ejemplo)» de `#libros-exito`, `#libros-error`, `#clientes-exito` y `#clientes-error`. No cambia ningún `id` ni la visibilidad de esos mensajes.
- También se quita « (datos de ejemplo)» de los dos `<caption>` de las tablas de Libros y Clientes, que quedan como «Libros registrados» y «Clientes registrados»; no cambia ningún `id`.
- Se agrega una delta MODIFIED a `ej3-catalogo-js-filtro` para dejar explícito que los mensajes del catálogo no contienen texto de datos de ejemplo.

## Capabilities

### New Capabilities

- `ej5-venta-historial`: composición, edición, cálculo, confirmación y consulta del historial de una venta simulada con datos locales, incluida la conservación del foco al editar cantidades.

### Modified Capabilities

- `ej3-catalogo-js-filtro`: el requisito de comportamiento de búsqueda vacía y sin coincidencias se amplía para exigir que los mensajes del catálogo estén redactados como texto definitivo, sin referencias a datos de ejemplo.

## Impact

- `js/app.js`: `cambiarCantidadRenglon`, el render de renglones y la actualización de subtotales/total; sin cambios en el modelo de datos ni en las funciones de confirmación e historial.
- `index.html`: textos de seis párrafos de estado y dos `<caption>`; ningún `id`, atributo de visibilidad ni estructura cambia.
- Sin librerías, CDNs, fuentes remotas, `npm`, `fetch`, servidor ni cambios en la persistencia existente.
- `README.md` no se modifica en este change.
