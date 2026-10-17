# Spec Delta

## Purpose

Permite registrar libros y clientes mediante formularios existentes con validaciones locales, sin recargar la página ni depender de un servidor, y actualiza los listados y las opciones relacionadas tras cada alta exitosa.

## ADDED Requirements

### Requirement: Registro de libro con todos sus campos

El sistema SHALL registrar un libro con título, ISBN, precio, editorial, género y autores a partir del formulario existente #libros-form, reutilizando el modelo de datos local del Ej.3 (window.libros, window.editoriales, window.generos, window.autores).

#### Scenario: Campos obligatorios no vacíos

- **WHEN** se envía el formulario de libro con el título o el ISBN vacío
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: ISBN único sin espacios ni guiones ni dígito de control

- **WHEN** se envía un ISBN que coincide con uno existente después de quitar espacios y guiones y sin considerar el dígito de control
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Precio numérico mayor que cero

- **WHEN** el precio no es numérico o es menor o igual a cero
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Editorial y autores existentes en datos locales

- **WHEN** se selecciona una editorial o un autor que no existe en window.editoriales o window.autores
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Al menos un autor seleccionado

- **WHEN** no se selecciona ningún autor en el selector múltiple
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Género opcional y existente si se asigna

- **WHEN** no se asigna género (opción "Sin clasificar")
- **THEN** el libro se guarda sin género asignado y se muestra como "Sin clasificar"
- **WHEN** se asigna un género que no existe en window.generos
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Alta exitosa actualiza todo sin recargar

- **WHEN** todas las validaciones de libro pasan
- **THEN** el libro se agrega a window.libros con un identificador estable, el listado de libros registrados, el catálogo y las opciones de <select> relacionados (editorial, género, autores) se actualizan sin recargar la página, usando preventDefault en el envío

### Requirement: Registro de cliente

El sistema SHALL registrar un cliente con nombre completo y email a partir del formulario existente #clientes-form, reutilizando window.clientes del Ej.3.

#### Scenario: Nombre completo y email no vacíos

- **WHEN** se envía el formulario de cliente con nombre completo o email vacío
- **THEN** se muestra un error cerca del formulario y no se agrega el cliente

#### Scenario: Email con formato válido

- **WHEN** el email no tiene formato válido
- **THEN** se muestra un error cerca del formulario y no se agrega el cliente

#### Scenario: Email único sin espacios exteriores y sin distinción de mayúsculas

- **WHEN** ya existe un cliente con el mismo email comparado sin espacios en los extremos y sin distinguir mayúsculas de minúsculas
- **THEN** se muestra un error cerca del formulario y no se agrega el cliente

#### Scenario: Alta exitosa actualiza todo sin recargar

- **WHEN** todas las validaciones de cliente pasan
- **THEN** el cliente se agrega a window.clientes con un identificador estable, el listado de clientes registrados y la opción de cliente en el <select> de Ventas se actualizan sin recargar la página, usando preventDefault en el envío

### Requirement: Errores cerca del formulario y solo agregar si todo pasa

El sistema SHALL mostrar los errores de validación cerca de cada formulario (#libros-error para libros, #clientes-error para clientes) y SHALL agregar el registro solo cuando todas las comprobaciones pasan.

#### Scenario: Envío bloqueado con errores

- **WHEN** existen errores de validación en un formulario
- **THEN** ningún registro se agrega y el formulario no se envía al servidor (preventDefault)

### Requirement: Inserción segura de datos como texto

El sistema SHALL insertar datos de libros y clientes en el DOM como texto (textContent), sin interpretar HTML (no innerHTML).

#### Scenario: Datos con etiquetas HTML se muestran como texto

- **WHEN** se inserta un dato que contiene etiquetas HTML en un listado o mensaje
- **THEN** se muestra como texto literal y no se renderiza como HTML

### Requirement: Sin dependencias externas ni persistencia

El sistema SHALL no usar fetch, ni servidor, ni localStorage para las altas de este Ejercicio 4; los datos viven solo en memoria mientras dura la sesión.

#### Scenario: Todo funciona con datos locales

- **WHEN** se abre index.html directamente (sin servidor)
- **THEN** las altas de libros y clientes funcionan con el modelo de datos local y se pierden al recargar la página
