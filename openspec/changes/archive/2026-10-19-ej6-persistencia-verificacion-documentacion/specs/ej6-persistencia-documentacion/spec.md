# Spec Delta

## Purpose

Define la persistencia local de los datos de la librería y las condiciones mínimas de documentación y verificación de la entrega, para que el sistema recupere su estado y el README describa con honestidad lo que se ejecutó.

## ADDED Requirements

### Requirement: Persistencia local de libros, clientes y ventas

El sistema SHALL guardar en `localStorage` los libros, los clientes y las ventas confirmadas cada vez que se agrega un libro, se agrega un cliente o se confirma una venta, usando las claves `libreria_libros`, `libreria_clientes` y `libreria_ventas`.

#### Scenario: Alta de libro se persiste

- **WHEN** se agrega un libro válido desde el formulario de Libros
- **THEN** el libro queda guardado en `libreria_libros` y sigue presente después de recargar la página

#### Scenario: Alta de cliente se persiste

- **WHEN** se agrega un cliente válido desde el formulario de Clientes
- **THEN** el cliente queda guardado en `libreria_clientes` y sigue presente después de recargar la página

#### Scenario: Venta confirmada se persiste

- **WHEN** se confirma una venta válida desde la vista Ventas
- **THEN** la venta completa, con sus renglones y su total, queda guardada en `libreria_ventas` y sigue visible en el Historial después de recargar la página

### Requirement: Primer inicio con ejemplos y recarga sin duplicados

En el primer inicio, cuando no hay datos guardados, el sistema SHALL cargar los ejemplos definidos en `js/app.js` y SHALL guardarlos; en los inicios siguientes SHALL recuperar los datos guardados y SHALL NOT duplicar los ejemplos.

#### Scenario: Primer inicio guarda los ejemplos

- **WHEN** se abre la aplicación por primera vez y las claves de `localStorage` no existen
- **THEN** se muestran los libros y clientes de ejemplo y se guardan las tres claves con esos datos y con el historial vacío

#### Scenario: Recarga recupera lo guardado sin duplicar

- **WHEN** se recarga la página después de agregar libros, agregar clientes y confirmar una venta
- **THEN** se recuperan esos registros y no se agregan copias de los libros ni de los clientes de ejemplo

### Requirement: LocalStorage ilegible no rompe la página

Si una clave de `localStorage` contiene JSON inválido o un valor que no es un array, el sistema SHALL ignorar ese valor, SHALL continuar con los ejemplos o con una lista vacía según corresponda, y SHALL NOT interrumpir la carga de la página.

#### Scenario: JSON inválido en libros

- **WHEN** `libreria_libros` contiene un texto que no se puede interpretar como JSON
- **THEN** el catálogo se muestra con los libros de ejemplo y la página sigue operativa

#### Scenario: Valor que no es un array en ventas

- **WHEN** `libreria_ventas` contiene un objeto u otro valor que no es un array
- **THEN** el historial se muestra vacío y la página sigue operativa

#### Scenario: Acceso a localStorage bloqueado

- **WHEN** el navegador impide leer o escribir en `localStorage`
- **THEN** la página carga y las altas y ventas siguen funcionando en memoria durante la sesión, sin interrumpir la interfaz

### Requirement: README de entrega completo

El README SHALL identificar a las personas integrantes del grupo y SHALL documentar cómo abrir `index.html` sin `npm`, la navegación entre las cinco vistas, las funcionalidades implementadas y pendientes, la ubicación de los datos iniciales, el funcionamiento y los límites de `localStorage`, los resultados observados de los casos manuales y la procedencia de las imágenes o la ausencia de imágenes.

#### Scenario: Autoría y ejecución sin npm

- **WHEN** se lee el README
- **THEN** figuran los nombres de las personas integrantes del grupo y los pasos para abrir `index.html` directamente en un navegador, sin instalar dependencias ni ejecutar `npm`

#### Scenario: Navegación y alcance funcional

- **WHEN** se lee el README
- **THEN** se describen las cinco vistas y su navegación, y se distinguen las funcionalidades implementadas de las pendientes o fuera de alcance

#### Scenario: Datos iniciales y persistencia

- **WHEN** se lee el README
- **THEN** se indica dónde están definidos los datos iniciales, qué claves usa `localStorage`, qué se persiste y cuáles son sus límites entre navegadores, perfiles y equipos

#### Scenario: Resultados observados de los casos manuales

- **WHEN** se lee la tabla de resultados del README
- **THEN** cada caso incluye su resultado observado o queda marcado como pendiente, sin resultados genéricos ni inventados

#### Scenario: Procedencia de imágenes

- **WHEN** se lee el README
- **THEN** se aclara que el proyecto no usa imágenes o, si se usaran, se indica su procedencia

### Requirement: Resultados de pruebas declarados solo si se ejecutaron

El README SHALL marcar como aprobada una prueba solo cuando exista constancia de su ejecución; las pruebas no ejecutadas SHALL figurar como pendientes y SHALL NOT presentarse como aprobadas.

#### Scenario: Prueba ejecutada con evidencia

- **WHEN** una fila de resultados indica «Aprobado»
- **THEN** el README permite identificar si la comprobación fue manual o automatizada y no atribuye al repositorio pruebas que no están incluidas en él

#### Scenario: Pruebas automatizadas locales no incluidas en el repositorio

- **WHEN** una fila se basa en pruebas con `jsdom` ejecutadas localmente
- **THEN** el README aclara que esas pruebas no forman parte del repositorio, sin cambiar el resultado declarado

#### Scenario: Prueba no ejecutada queda pendiente

- **WHEN** una comprobación no se ejecutó en el navegador
- **THEN** la fila correspondiente indica «Pendiente de verificar manualmente» y no se completa con un resultado observado inventado
