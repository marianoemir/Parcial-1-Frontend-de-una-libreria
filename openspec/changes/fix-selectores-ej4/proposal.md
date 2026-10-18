# Proposal

## Why

El Ejercicio 4 (altas de libros y clientes) tiene defectos verificados en sus selectores y en el guardado de texto: el selector múltiple de autores recibe una opción vacía que queda seleccionada y rompe la validación con «El autor  no existe»; la opción «Sin clasificar» del género queda deshabilitada y no se puede volver a elegir tras asignar un género; los títulos y nombres se guardan sin recortar espacios; y el catálogo no respeta el texto que el navegador restaura en el buscador al cargar. Además, quedan textos de maqueta obsoletos en secciones que ya funcionan.

## What Changes

- **R-01 — Autores sin opción vacía**: el `<select multiple>` `#libro-autores` no debe contener ni dejar seleccionada una opción vacía; su valor seleccionado nunca debe ser `""`.
- **R-02 — Mensaje sin autores**: al no elegir ningún autor, el error debe ser exactamente «Seleccioná al menos un autor»; los ids vacíos no cuentan como autores y no deben producir «El autor  no existe».
- **R-03 — «Sin clasificar» seleccionable**: en `#libro-genero` la opción «Sin clasificar» (value `""`) debe estar habilitada (sin `disabled`) y seleccionada por defecto, para poder volver a elegirla tras asignar un género; al guardar, el género es `null`. `#libro-editorial` y `#venta-cliente` conservan su placeholder deshabilitado.
- **R-04 — Texto sin espacios sobrantes**: al guardar un libro se almacena el título recortado; al guardar un cliente se almacena el nombre recortado.
- **R-05 — Buscador al cargar**: al iniciar, el catálogo debe respetar el texto que el navegador restaura en `#catalogo-busqueda` (con texto → aplica el filtro; vacío → muestra todo el catálogo).
- **R-06 — Limpieza de maqueta**: quitar el texto «Maqueta: sin funcionamiento todavía.» de las secciones Catálogo, Libros y Clientes de `index.html` (ya funcionan); se conserva en Ventas e Historial.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `ej4-altas-libros-clientes`: se ajustan los requisitos de alta de libro (autores sin opción vacía, mensaje exacto de autor faltante, «Sin clasificar» habilitada y seleccionable) y de guardado con `trim` (título de libro, nombre de cliente).
- `ej3-catalogo-js-filtro`: se amplía el requisito de eventos/inicialización para que el catálogo aplique al cargar el texto restaurado por el navegador en `#catalogo-busqueda`.
- `ej2-identidad-visual`: se ajusta el escenario «Id intactos» para permitir quitar los textos «Maqueta: sin funcionamiento todavía.» de Catálogo, Libros y Clientes, sin cambiar ningún `id`.

## Impact

- `js/app.js`: `actualizarOpciones` (interno `reconstruirSelect`), `validarLibro`, `procesarAltaLibro`, `procesarAltaCliente`, `inicializar`.
- `index.html`: párrafos de maqueta de las secciones Catálogo, Libros y Clientes.
- `test/`: no se modifica y no resulta afectado. La aserción de `test/tests.js:835` sobre la opción vacía de `#libro-autores` usa una copia local de `reconstruirSelect` dentro del propio test y no depende del código de `js/app.js` (ver `design.md`, Risks).
- Sin dependencias externas: se mantiene HTML/CSS/JS nativos, sin CDNs, sin npm y con apertura directa de `index.html`.
