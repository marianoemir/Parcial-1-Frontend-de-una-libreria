# Spec Delta

## MODIFIED Requirements

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
- **THEN** mantiene un listener de `input` que ejecuta el filtrado y renderizado

#### Scenario: Búsqueda vacía muestra todo el catálogo

- **WHEN** el campo de búsqueda está vacío o contiene solo espacios
- **THEN** se muestra todo el catálogo de libros

#### Scenario: Búsqueda sin coincidencias muestra mensaje

- **WHEN** se busca un título que no coincide con ningún libro
- **THEN** se muestra el mensaje claro de que no se encontraron libros

#### Scenario: Enter no recarga la página

- **WHEN** el usuario presiona Enter dentro del campo de búsqueda
- **THEN** no se recarga la página y se ejecuta la búsqueda (filtrado y renderizado)
