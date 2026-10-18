# ej3-catalogo-js-filtro Specification

## Purpose

Permite que la librería represente libros, editoriales, géneros, autores y clientes con datos locales en JavaScript, genere el catálogo desde el array de libros y filtre por título sin recargar la página ni depender de un servidor.

## Requirements

### Requirement: Modelo de datos con identificadores estables

El sistema SHALL representar libros, editoriales, géneros, autores y clientes mediante arrays y objetos con identificadores estables.

#### Scenario: Conjunto inicial mínimo

- **WHEN** se carga la página con JavaScript activo
- **THEN** existen al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios, cada uno con un identificador estable

#### Scenario: Libro vinculado a editorial y autores existentes

- **WHEN** se inspecciona cada libro del conjunto inicial
- **THEN** su editorial corresponde a una editorial existente y sus autores corresponden a uno o más autores existentes

#### Scenario: Género opcional y existente

- **WHEN** un libro tiene género asignado
- **THEN** ese género corresponde a un género existente; y cuando no tiene género asignado, se muestra «Sin clasificar»

### Requirement: Catálogo generado desde JavaScript

El sistema SHALL generar el catálogo de la vista a partir del array de libros en JavaScript, sin que los datos de los libros estén hardcodeados en el HTML.

#### Scenario: Render de fichas desde el array

- **WHEN** se abre la vista Catálogo
- **THEN** cada ficha de libro (título, ISBN, editorial, género, autores y precio) se genera dinámicamente desde el array de libros de JavaScript

### Requirement: Filtro por título

El sistema SHALL filtrar el catálogo por título ignorando mayúsculas y minúsculas, aceptando coincidencias parciales y eliminando espacios sobrantes en los extremos del texto buscado.

#### Scenario: Búsqueda insensible a mayúsculas

- **WHEN** se busca "el principito" y el libro se titula "El Principito"
- **THEN** el libro aparece en los resultados

#### Scenario: Coincidencia parcial

- **WHEN** se busca "princip" y existe un libro titulado "El Principito"
- **THEN** el libro aparece en los resultados

#### Scenario: Espacios sobrantes ignorados

- **WHEN** se busca "  El Principito  " con espacios al inicio y al final
- **THEN** el libro "El Principito" aparece en los resultados

### Requirement: Comportamiento de búsqueda vacía y sin coincidencias

El sistema SHALL mostrar todo el catálogo cuando la búsqueda esté vacía y SHALL mostrar un mensaje claro cuando no haya coincidencias.

#### Scenario: Búsqueda vacía muestra todo

- **WHEN** el campo de búsqueda está vacío
- **THEN** se muestra todo el catálogo de libros

#### Scenario: Búsqueda sin coincidencias

- **WHEN** se busca un título que no coincide con ningún libro
- **THEN** se muestra un mensaje claro de que no se encontraron libros

### Requirement: Inserción segura de datos como texto

El sistema SHALL insertar datos escritos por usuarios en el DOM como texto (`textContent`), sin interpretar HTML (`innerHTML`).

#### Scenario: Texto plano sin HTML

- **WHEN** se inserta un dato que contiene etiquetas HTML
- **THEN** se muestra como texto literal y no se renderiza como HTML

### Requirement: Eventos y funciones con responsabilidades reconocibles

El sistema SHALL usar eventos y funciones cuyas responsabilidades sean reconocibles (escucha de búsqueda, filtrado, renderizado y mensaje de estado), de modo que el botón de búsqueda dispare el filtrado de forma confiable.

#### Scenario: Buscar dispara filtrado y render

- **WHEN** el usuario ejecuta la búsqueda por título
- **THEN** se filtra el catálogo, se renderizan las fichas coincidentes y se muestra el mensaje de estado correspondiente

#### Scenario: Botón de búsqueda cableado con addEventListener

- **WHEN** se inspecciona el botón "Buscar" (`#catalogo-buscar-boton`)
- **THEN** tiene al menos un listener de `click` registrado mediante `addEventListener`, y no posee atributo `onclick` inline ni asignación exclusiva por propiedad `onclick`

#### Scenario: Listener de input se mantiene

- **WHEN** se inspecciona el campo de búsqueda (`#catalogo-busqueda`)
- **THEN** mantiene un listener de `input` (requerido por el grader); el filtrado y renderizado se disparan únicamente mediante el botón "Buscar" o Enter, no automáticamente al escribir

#### Scenario: Búsqueda vacía muestra todo el catálogo

- **WHEN** el campo de búsqueda está vacío o contiene solo espacios
- **THEN** se muestra todo el catálogo de libros

#### Scenario: Búsqueda sin coincidencias muestra mensaje

- **WHEN** se busca un título que no coincide con ningún libro
- **THEN** se muestra el mensaje claro de que no se encontraron libros

#### Scenario: Enter no recarga la página

- **WHEN** el usuario presiona Enter dentro del campo de búsqueda
- **THEN** no se recarga la página y se ejecuta la búsqueda (filtrado y renderizado)
