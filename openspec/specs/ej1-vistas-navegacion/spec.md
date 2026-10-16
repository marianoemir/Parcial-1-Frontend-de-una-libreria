# ej1-vistas-navegacion Specification

## Purpose

Define las vistas exigidas por el Ejercicio 1 y su navegación clara desde index.html, para que cada pantalla del parcial exista y sea alcanzable.

## Requirements

### Requirement: Entrada unica en index.html

El proyecto SHALL organizarse con `index.html` como entrada y las vistas como páginas vinculadas o secciones de la misma página.

#### Scenario: Apertura del proyecto

- **WHEN** se abre `index.html` en el navegador sin servidor ni npm
- **THEN** se muestra la librería con acceso visible a las 5 vistas

### Requirement: Navegacion clara entre las 5 vistas

La interfaz SHALL ofrecer navegación visible y permanente hacia Catálogo, Libros, Clientes, Ventas e Historial.

#### Scenario: Recorrido completo por navegación

- **WHEN** se usa la navegación principal desde cualquier vista
- **THEN** se puede llegar a cada una de las 5 vistas sin URLs adivinadas

#### Scenario: Vista actual identificable

- **WHEN** se está en una vista
- **THEN** la navegación indica cuál es la vista actual

### Requirement: Vista Catalogo con buscador y fichas

La vista Catálogo SHALL mostrar el título de la librería, un buscador por título y el listado de libros con título, ISBN, editorial, género, autores y precio; sin género asignado SHALL mostrar «Sin clasificar».

#### Scenario: Libro completo en catálogo

- **WHEN** se muestra un libro con todos sus datos
- **THEN** son visibles título, ISBN, editorial, género, autores y precio

#### Scenario: Libro sin género

- **WHEN** se muestra un libro sin género asignado
- **THEN** en lugar del género se lee «Sin clasificar»

### Requirement: Vista Libros con alta y listado

La vista Libros SHALL incluir un formulario de alta y el listado de libros registrados.

#### Scenario: Estructura de alta de libro

- **WHEN** se visita la vista Libros
- **THEN** existe un formulario con campos de título, ISBN, precio, editorial, género y autores más su listado correspondiente

### Requirement: Vista Clientes con alta y listado

La vista Clientes SHALL incluir un formulario de alta (nombre completo y email) y el listado de clientes registrados.

#### Scenario: Estructura de alta de cliente

- **WHEN** se visita la vista Clientes
- **THEN** existe un formulario con campos de nombre completo y email más su listado correspondiente

### Requirement: Vista Ventas con cliente renglones y resumen

La vista Ventas SHALL incluir selección de cliente, composición de renglones y resumen de la venta.

#### Scenario: Estructura de venta

- **WHEN** se visita la vista Ventas
- **THEN** existe un selector de cliente, una zona de renglones y un resumen con total

### Requirement: Vista Historial con detalle

La vista Historial SHALL incluir el listado de ventas con identificador, fecha, cliente y total, y acceso a sus detalles (renglones).

#### Scenario: Acceso al detalle de una venta

- **WHEN** se consulta una venta del historial
- **THEN** se pueden ver sus renglones sin editar ni eliminar la venta
