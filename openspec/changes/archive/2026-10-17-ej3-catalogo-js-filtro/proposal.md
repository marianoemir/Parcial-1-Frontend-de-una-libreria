# Proposal

## Why

El Ejercicio 1 y 2 dejaron la estructura HTML completa y la presentación CSS lista, pero sin datos ni comportamiento: `js/app.js` está vacío y el catálogo está hardcodeado en `index.html`, marcado "sin funcionamiento todavía". El Ejercicio 3 de la consigna exige representar libros, editoriales, géneros, autores y clientes con arrays y objetos de identificadores estables, generar el catálogo desde JavaScript y agregar un filtro por título que ignore mayúsculas/minúsculas, busque coincidencias parciales y elimine espacios sobrantes.

## What Changes

- Se crea un modelo de datos en `js/app.js`: arrays y objetos con identificadores estables para libros, editoriales, géneros, autores y clientes (al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios), con relaciones libro→editorial existente y libro→uno o más autores existentes; género opcional y, si se asigna, de un género existente.
- `js/app.js` genera el catálogo del HTML a partir del array de libros (render dinámico de fichas en `#catalogo-lista`), en lugar de mantener los datos hardcodeados en `index.html`.
- Se implementa el filtro por título en el buscador existente (`#catalogo-busqueda` + `#catalogo-buscar-boton`): ignora mayúsculas/minúsculas, acepta coincidencias parciales, elimina espacios sobrantes en los extremos; búsqueda vacía muestra todo el catálogo y búsqueda sin coincidencias muestra un mensaje claro.
- Se insertan datos de usuario como texto en el DOM (`textContent`, no `innerHTML`).
- Se usan eventos y funciones con responsabilidades reconocibles (escucha de input/buscar, filtrado, render, mensaje de vacío).
- No se requiere fetch ni ABML de editoriales/géneros/autores.
- Se conserva la estructura HTML del Ej.1 y 2 (ningún `id` cambia; las fichas hardcodeadas del catálogo se reemplazan por el contenedor vacío que JS llena).

## Capabilities

### New Capabilities

- `ej3-catalogo-js-filtro`: modelo de datos local en JS, generación del catálogo a partir del array de libros y filtro por título en la vista Catálogo.

### Modified Capabilities

- Ninguna. Las capabilities del Ej.1 y Ej.2 (`ej1-vistas-navegacion`, `ej1-semantica-formularios`, `ej2-identidad-visual`, `ej2-adaptacion-accesible`) no cambian requisitos: este change solo agrega comportamiento JS y datos locales sin alterar semántica, `id`, presentación ni navegación.

## Impact

- Archivos afectados en `apply` (este change solo planifica, no los toca): `js/app.js` (contenido completo: modelo de datos, render y filtro); `index.html` (se reemplazan las dos fichas hardcodeadas de `#catalogo-lista` por el contenedor listo para render; ningún `id` ni texto de sección cambia).
- Sin dependencias nuevas, sin fetch, sin servidor, sin `localStorage`, sin cambios de comportamiento CSS ni HTML fuera del contenedor del catálogo.
- Supuestos: apertura con doble clic (`index.html` directo, sin servidor); los datos son ficticios y se pierden al recargar (sin persistencia en este Ej.3).

## Correcciones posteriores (fix del botón Buscar)

Tras archivar este change se corrigió el disparo del filtrado del catálogo, consolidado aquí desde el change `fix-boton-buscar-catalogo` (tareas 1.1 a 3.2 en `tasks.md`):

- El botón `#catalogo-buscar-boton` combinaba un `onclick` inline con una propiedad `onclick` asignada en JS, y el filtro automático por `input` hacía que el botón pareciera no funcionar; además, las pruebas que verifican `addEventListener("click")` fallaban porque el botón se cableaba con `onclick = ...`.
- Se unificó el manejo del evento en `ejecutarBusqueda()` y se cableó el clic del botón con `addEventListener("click", ...)` en `js/app.js`; se mantuvo el listener `input` sobre `#catalogo-busqueda` y se evitó la recarga de página al presionar Enter (`preventDefault()` en el `submit` del formulario de búsqueda).
- Búsqueda vacía (o solo espacios) muestra todo el catálogo; búsqueda sin coincidencias muestra el mensaje correspondiente.
- Archivos afectados: `index.html` (botón `#catalogo-buscar-boton`) y `js/app.js` (bloque de eventos del buscador). El requisito «Eventos y funciones con responsabilidades reconocibles» de `openspec/specs/ej3-catalogo-js-filtro/spec.md` se amplió para exigir lo anterior.
