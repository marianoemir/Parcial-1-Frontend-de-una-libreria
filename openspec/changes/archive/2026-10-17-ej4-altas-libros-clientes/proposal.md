# Proposal

## Why

El Ejercicio 3 dejó el catálogo generado desde JS y el filtro por título funcionando, pero las secciones "Libros" y "Clientes" de index.html siguen marcadas como "Maqueta: sin funcionamiento todavía": existen los formularios de alta y los listados vacíos, sin comportamiento ni validaciones reales. El Ejercicio 4 de la consigna exige registrar libros (título, ISBN, precio, editorial, género y autores) y clientes (nombre completo y email) con validaciones locales, preventDefault en el envío, mensajes de error cerca de cada formulario y actualización del listado y de las opciones relacionadas sin recargar la página.

## What Changes

- Se agregan en `js/app.js` las funciones de alta de libro y alta de cliente con validaciones locales sobre el modelo de datos existente (window.libros, window.editoriales, window.generos, window.autores, window.clientes).
- Formulario de libros (`#libros-form`): título, ISBN, precio, editorial (<select>), género (<select> con opción "Sin clasificar") y autores (select múltiple); validaciones de no vacíos, ISBN único sin espacios ni guiones y sin dígito de control, precio numérico mayor a cero, editorial y autores existentes en datos locales, al menos un autor, género opcional que si se asigna debe existir.
- Formulario de clientes (`#clientes-form`): nombre completo y email; validaciones de no vacíos, formato de email válido y email único sin espacios exteriores ni distinción de mayúsculas/minúsculas.
- Control de envío con preventDefault en ambos formularios; mensajes de error mostrados cerca del formulario; solo se agrega si todas las comprobaciones pasan.
- Tras alta correcta: se actualizan el listado de libros/clientes registrados, las opciones de los <select> relacionados (editorial, género, autores en el formulario de libros; cliente en Ventas) y el catálogo, sin recargar la página, sin fetch, sin localStorage y sin servidor.
- Datos insertados en el DOM con textContent (no innerHTML); identificadores estables (li1, ed1, gen1, au1, cl1...); ningún id existente de index.html cambia.

## Capabilities

### New Capabilities

- `ej4-altas-libros-clientes`: altas de libros y clientes con validaciones locales, envío controlado con preventDefault, mensajes de error cerca del formulario y actualización reactiva de listados y opciones relacionadas sin recarga.

### Modified Capabilities

- Ninguna. Las capabilities del Ej.1 (`ej1-vistas-navegacion`, `ej1-semantica-formularios`), Ej.2 (`ej2-identidad-visual`, `ej2-adaptacion-accesible`) y Ej.3 (`ej3-catalogo-js-filtro`) no cambian requisitos: este change solo agrega comportamiento JS de altas y validaciones sobre formularios y listados existentes, sin alterar semántica, ids, presentación ni navegación.

## Impact

- Archivos afectados en `apply` (este change solo planifica, no los toca): `js/app.js` (agregar validaciones, alta de libro/cliente, actualización de listados y <select> relacionados; reutilizar el modelo de datos del Ej.3); `index.html` (ningún cambio estructural: los formularios, botones, ids, tablas y mensajes de éxito/error ya existen en la maqueta).
- Sin dependencias nuevas, sin fetch, sin servidor, sin localStorage, sin cambios de CSS ni de HTML fuera de la lógica JS.
- Supuestos: apertura con doble clic (index.html directo, sin servidor); los datos se pierden al recargar (sin persistencia, esa es la responsabilidad del Ej.6).

## Correcciones posteriores (fix de selectores)

Tras archivar este change se detectaron y corrigieron fallas de los selectores del alta de libro, consolidadas aquí desde el change `fix-selectores-ej4` (tareas 1.1 a 7.3 en `tasks.md`):

- R-01: el selector múltiple de autores (`#libro-autores`) se reconstruía incluyendo una opción `value=""`, y al guardar con un autor real seleccionado aparecía «El autor  no existe». Se parametrizó `reconstruirSelect` en `js/app.js` con tres modos — placeholder deshabilitado, opción inicial habilitada y seleccionada, sin placeholder — de modo que autores se reconstruye sin opción vacía, género «Sin clasificar» queda habilitado y seleccionado por defecto, y editorial y cliente de venta conservan su placeholder deshabilitado.
- R-02: `validarLibro` descarta los ids vacíos de `autorIds` antes de validar; sin autores reales el error es exactamente «Seleccioná al menos un autor».
- R-03: la opción «Sin clasificar» del género quedaba deshabilitada y no era reseleccionable; ahora está habilitada y seleccionada por defecto.
- R-04: `procesarAltaLibro` y `procesarAltaCliente` guardan título y nombre con `.trim()`.
- R-05: `window.inicializar` llama a `window.ejecutarBusqueda()` en lugar de `renderCatalogo(window.libros)`, respetando el texto restaurado en `#catalogo-busqueda`.
- R-06: se quitaron de `index.html` los párrafos «Maqueta: sin funcionamiento todavía.» de Catálogo, Libros y Clientes (permanecen únicamente en Ventas e Historial).

Archivos afectados: `js/app.js` (seis correcciones) e `index.html` (retiro de tres párrafos de maqueta). Sin librerías, sin CDN, sin `package.json`/`node_modules` y sin cambios en los `id`. Ningún archivo de `test/` fue modificado; el arnés local dio 187 pasó / 0 falló antes y después. Los requisitos de `openspec/specs/ej4-altas-libros-clientes/spec.md` se actualizaron para reflejar estas correcciones.
