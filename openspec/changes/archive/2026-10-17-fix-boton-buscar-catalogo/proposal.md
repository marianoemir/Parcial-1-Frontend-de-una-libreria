# Proposal

## Why

El botón "Buscar por título" del catálogo combina un `onclick` inline con una propiedad `onclick` asignada en JS, y el filtro automático por `input` hace que el botón parezca no funcionar. Además, las pruebas automatizadas que verifican `addEventListener("click")` fallan porque el botón se cablea con `onclick = ...`. Se necesita consolidar el disparo del filtrado mediante `addEventListener`, eliminar el `onclick` inline, mantener el listener de `input` según la spec, y evitar la recarga de página al presionar Enter.

## What Changes

- Eliminar el atributo `onclick` inline del botón `#catalogo-buscar-boton` en `index.html`.
- Registrar el clic del botón con `addEventListener("click", ...)` en `js/app.js`, invocando la lógica compartida de búsqueda/render/mensaje.
- Mantener el listener `input` sobre `#catalogo-busqueda` (según la spec).
- Asegurar que una búsqueda vacía (o solo espacios) muestre todo el catálogo.
- Asegurar que una búsqueda sin coincidencias muestre el mensaje de "no se encontraron libros".
- Evitar la recarga de página al presionar Enter en el campo de búsqueda (prevenir `submit` del formulario o su efecto por defecto).
- Unificar el manejo del evento en `ejecutarBusqueda()` para que botón e input compartan render y mensajes.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `ej3-catalogo-js-filtro`: el requisito "Eventos y funciones con responsabilidades reconocibles" se amplía para exigir que el botón de búsqueda se cablee mediante `addEventListener("click")`, que no exista `onclick` inline, que se mantenga el listener `input`, y que Enter no recargue la página.

## Impact

- `index.html`: atributo `onclick` del botón `#catalogo-buscar-boton`.
- `js/app.js`: bloque de eventos del buscador (`btnBuscar.onclick`, `ejecutarBusqueda`, `inicializar`).
- `test/tests.js` y pruebas ocultas: verificación de listeners `click`/`input`, ausencia de `onclick` inline, comportamiento vacío/sin coincidencias, no recarga.
