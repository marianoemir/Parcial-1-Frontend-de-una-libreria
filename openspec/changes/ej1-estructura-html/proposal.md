# Proposal

## Why

El parcial exige una base HTML verificable antes de agregar estilos, datos y comportamiento. Sin una estructura con vistas, navegación, semántica y estados bien definidos, los ejercicios 2 a 6 no tienen sobre qué apoyarse ni cómo evaluarse (20 puntos del Ejercicio 1).

## What Changes

- Se crea `index.html` como punto de entrada único del proyecto.
- Se definen las 5 vistas exigidas (Catálogo, Libros, Clientes, Ventas, Historial), como páginas separadas o secciones de una misma página, con navegación clara entre ellas.
- Se estructura cada vista con sus bloques obligatorios: buscador y fichas de libro en Catálogo; formulario de alta + listado en Libros y Clientes; selector de cliente + renglones + resumen en Ventas; listado de ventas + acceso a detalle en Historial.
- Se aplican etiquetas semánticas (`header`, `nav`, `main`, `section`, `footer`, `table`) y accesibilidad estructural: cada campo con `label` asociado, botones con texto de acción, tablas con `th`.
- Se contemplan mensajes de estado: listas vacías, búsquedas sin resultados, operaciones correctas o rechazadas.
- Se prevén los `id` y contenedores que JavaScript usará en Ej.3–5 (listados, historial, formularios), SIN implementar lógica JS ni estilos en este change.
- Se crean `css/styles.css` y `js/app.js` como archivos vacíos (solo un comentario) enlazados desde `index.html`, y los selects llevan una primera opción vacía deshabilitada.

## Capabilities

### New Capabilities

- `ej1-vistas-navegacion`: Vistas exigidas por el Ejercicio 1 y navegación clara entre ellas desde `index.html`.
- `ej1-semantica-formularios`: Semántica HTML, formularios con etiquetas y botones descriptivos, tablas con encabezados y mensajes de estado, más los ganchos estructurales para los datos locales y JavaScript.

### Modified Capabilities

- Ninguna (no existen specs previas; es el primer change del proyecto).

## Impact

- Afecta únicamente la estructura HTML del proyecto (`index.html` y páginas/secciones vinculadas).
- No afecta CSS (Ejercicio 2), datos/filtro JS (Ejercicio 3), validaciones de alta (Ejercicio 4), cálculos de venta (Ejercicio 5) ni persistencia/README (Ejercicio 6).
- Alcance técnico invariable: HTML nativo, sin librerías, frameworks ni CDNs de CSS o JavaScript; sin API, base de datos, servidor ni login real.
