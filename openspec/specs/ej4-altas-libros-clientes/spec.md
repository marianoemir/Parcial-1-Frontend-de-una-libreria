# ej4-altas-libros-clientes Specification

## Purpose

Permite registrar libros y clientes mediante formularios existentes con validaciones locales, sin recargar la página ni depender de un servidor, y actualiza los listados y las opciones relacionadas tras cada alta exitosa.

## Requirements

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

- **WHEN** no se selecciona ningún autor en el selector múltiple (`#libro-autores`)
- **THEN** el error mostrado es exactamente «Seleccioná al menos un autor» y no se agrega el libro; los identificadores vacíos que pudieran estar presentes en el selector no se cuentan como autores seleccionados y no producen el mensaje «El autor  no existe»

#### Scenario: Género opcional y existente si se asigna

- **WHEN** no se asigna género (opción «Sin clasificar» seleccionada por defecto y habilitada)
- **THEN** el libro se guarda sin género asignado (`null`) y se muestra como «Sin clasificar»
- **WHEN** se asigna un género que no existe en window.generos
- **THEN** se muestra un error cerca del formulario y no se agrega el libro

#### Scenario: Alta exitosa actualiza todo sin recargar

- **WHEN** todas las validaciones de libro pasan
- **THEN** el libro se agrega a window.libros con un identificador estable y con el título almacenado sin espacios sobrantes en los extremos, y el listado de libros registrados, el catálogo y las opciones de <select> relacionados (editorial, género, autores) se actualizan sin recargar la página, usando preventDefault en el envío

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
- **THEN** el cliente se agrega a window.clientes con un identificador estable y con el nombre almacenado sin espacios sobrantes en los extremos, y el listado de clientes registrados y la opción de cliente en el <select> de Ventas se actualizan sin recargar la página, usando preventDefault en el envío

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

El sistema SHALL no usar `fetch` ni servidor para las altas de este Ejercicio 4. Las altas SHALL persistir libros y clientes en `localStorage` cuando esté disponible, conforme a la capability `ej6-persistencia-documentacion`; si `localStorage` no está disponible, SHALL seguir funcionando en memoria durante la sesión.

#### Scenario: Todo funciona con datos locales

- **WHEN** se abre index.html directamente (sin servidor)
- **THEN** las altas de libros y clientes funcionan con el modelo de datos local y, cuando `localStorage` está disponible, se recuperan al recargar la página

#### Scenario: Sin localStorage las altas siguen funcionando

- **WHEN** el navegador bloquea el acceso a `localStorage`
- **THEN** las altas de libros y clientes funcionan en memoria durante la sesión y no interrumpen la interfaz

### Requirement: Opciones de los selectores de alta sin valor vacío seleccionado

El sistema SHALL construir las opciones de los selectores del alta de libro de modo que el selector múltiple de autores nunca aporte un valor vacío, que el género «Sin clasificar» sea reseleccionable y que editorial y cliente de venta conserven su placeholder deshabilitado.

#### Scenario: Selector múltiple de autores sin opción vacía

- **WHEN** se inspecciona el selector múltiple de autores (`#libro-autores`) después de construir sus opciones
- **THEN** no existe una opción con value `""` y ningún valor seleccionado es `""`, de modo que leer los autores seleccionados nunca devuelve una cadena vacía

#### Scenario: Género «Sin clasificar» habilitado y seleccionado por defecto

- **WHEN** se inspecciona el selector de género (`#libro-genero`)
- **THEN** la opción «Sin clasificar» (value `""`) está habilitada (sin atributo `disabled`) y seleccionada por defecto, y puede volver a seleccionarse después de elegir un género real

#### Scenario: Editorial y cliente de venta conservan su placeholder deshabilitado

- **WHEN** se inspeccionan el selector de editorial (`#libro-editorial`) y el selector de cliente de la venta (`#venta-cliente`)
- **THEN** su opción inicial (value `""`) permanece deshabilitada y actúa como placeholder no seleccionable como valor válido
