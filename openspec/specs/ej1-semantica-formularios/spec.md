# ej1-semantica-formularios Specification

## Purpose

Fija la semántica HTML, los formularios accesibles y los mensajes de estado del Ejercicio 1, dejando previstos los ganchos que usará JavaScript sin implementar lógica.

## Requirements

### Requirement: Estructura semantica base

Cada página SHALL incluir encabezado, navegación y contenido principal con etiquetas semánticas (`header`, `nav`, `main`; `section`/`footer`/`table` donde corresponda).

#### Scenario: Inspección semántica

- **WHEN** se inspecciona el HTML de cualquier vista
- **THEN** existen `header`, `nav` y `main` bien anidados y sin contenido fuera de lugar

### Requirement: Formularios con etiquetas y botones descriptivos

Cada campo SHALL tener una `label` asociada (atributo `for`) y cada botón SHALL tener un texto que describa su acción.

#### Scenario: Campo con etiqueta asociada

- **WHEN** se activa una etiqueta o se inspecciona un campo
- **THEN** el foco va al campo correspondiente por su asociación `for`/`id`

#### Scenario: Botones autoexplicativos

- **WHEN** se leen los botones de formularios, buscador, renglones y confirmación
- **THEN** cada texto describe la acción (por ejemplo «Agregar libro», «Confirmar venta», «Quitar renglón»)

### Requirement: Tablas con encabezados

Toda tabla de listados e historial SHALL incluir encabezados (`th`, con `scope` cuando corresponda) que describan cada columna.

#### Scenario: Tabla accesible

- **WHEN** se recorre una tabla de libros, clientes, renglones o historial
- **THEN** cada columna tiene su encabezado y los datos quedan alineados con él

### Requirement: Mensajes de estado previstos

La estructura SHALL contemplar mensajes para listas vacías, búsquedas sin resultados y operaciones correctas o rechazadas, con texto explícito y no solo color.

#### Scenario: Lista vacía

- **WHEN** un listado o el historial no tiene registros
- **THEN** se muestra un mensaje de lista vacía en lugar de un bloque en blanco

#### Scenario: Búsqueda sin resultados

- **WHEN** una búsqueda no coincide con ningún libro
- **THEN** se muestra un mensaje claro de sin resultados

#### Scenario: Resultado de operación

- **WHEN** un alta o una venta se acepta o se rechaza
- **THEN** se muestra un mensaje de éxito o de error con texto descriptivo

### Requirement: Ganchos estructurales para datos locales y JavaScript

Los listados y el historial SHALL conectarse con los datos locales mediante contenedores e identificadores estables, contemplando los campos y estados que utilizará JavaScript, sin implementar aún la lógica.

#### Scenario: Contenedores listos para render JS

- **WHEN** se inspecciona el HTML antes de agregar JavaScript
- **THEN** existen contenedores con `id` para catálogo, listados de libros y clientes, renglones, resumen e historial, más los formularios con sus campos nominales
