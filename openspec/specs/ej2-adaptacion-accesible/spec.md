# ej2-adaptacion-accesible Specification

## Purpose

Fija el comportamiento adaptable y accesible de la presentación del Ejercicio 2, para que la librería sea legible a 320 px y 1280 px y usable con teclado, solo con CSS y sin JavaScript.

## Requirements

### Requirement: Legible a 320 px y 1280 px sin scroll horizontal de página

La página SHALL ser legible a 320 px y 1280 px de ancho sin provocar scroll horizontal del documento: textos y controles se ajustan o envuelven dentro del viewport abierto con doble clic.

#### Scenario: Comprobación a 320 px

- **WHEN** se abre `index.html` a 320 px de ancho
- **THEN** todo texto y control es legible y la página no genera scroll horizontal

#### Scenario: Comprobación a 1280 px

- **WHEN** se abre `index.html` a 1280 px de ancho
- **THEN** el contenido usa el ancho disponible, sigue legible y la página no genera scroll horizontal

### Requirement: Tablas con scroll en su propio contenedor

Cada tabla que exceda el ancho disponible SHALL desplazarse dentro de su propio contenedor con scroll horizontal propio, sin extender la página.

#### Scenario: Tabla ancha en móvil

- **WHEN** una tabla de libros, clientes, renglones o historial excede 320 px
- **THEN** la tabla se desplaza dentro de su contenedor y la página sigue sin scroll horizontal

### Requirement: Foco visible y navegación por teclado

Todos los controles SHALL conservar un indicador de foco visible y SHALL ser alcanzables y operables solo con teclado, sin trampas de foco.

#### Scenario: Recorrido por teclado

- **WHEN** se recorre la página con Tab y Shift+Tab hasta accionar un control con Enter o Espacio
- **THEN** cada parada muestra un foco claramente visible y el control responde

### Requirement: Mensajes con texto y atributo hidden respetado

Los mensajes de error y estado SHALL expresarse con texto explícito (no solo color) y el CSS SHALL NOT anular el atributo `hidden`: un elemento con `hidden` SHALL permanecer oculto.

#### Scenario: Mensaje de error comprensible

- **WHEN** se muestra un mensaje de error o estado previsto en el HTML
- **THEN** su significado se entiende por el texto aun sin percibir el color

#### Scenario: Elemento oculto sigue oculto

- **WHEN** un mensaje lleva el atributo `hidden`
- **THEN** no es visible ni ocupa lugar, independientemente de las reglas de presentación

### Requirement: Vista actual identificable sin JavaScript

La sección destino SHALL indicarse como marca visible usando solo CSS y HTML (`section:target`), sin JavaScript; el enlace con `aria-current="page"` SHALL quedar fijo en Catálogo para lectores de pantalla y SHALL NOT llevar aspecto fuerte de "activo"; el mecanismo y sus límites SHALL quedar documentados en `design.md`.

#### Scenario: Navegación a una vista

- **WHEN** se sigue un enlace de la navegación principal hacia una sección
- **THEN** la sección destino (`:target`) queda resaltada como marca visible sin ejecutar JavaScript, mientras `aria-current` permanece fijo como referencia para tecnologías de asistencia

### Requirement: Imágenes locales con alternativo correcto

El proyecto SHALL NOT cargar imágenes remotas; si se agrega alguna imagen informativa SHALL ser local y tener texto alternativo, y las decorativas SHALL llevar `alt=""`.

#### Scenario: Verificación de recursos gráficos

- **WHEN** se inspeccionan las imágenes del proyecto (o su ausencia)
- **THEN** no hay URLs remotas y cada imagen local cumple su regla de alternativo (o no hay imágenes, lo cual también cumple)
