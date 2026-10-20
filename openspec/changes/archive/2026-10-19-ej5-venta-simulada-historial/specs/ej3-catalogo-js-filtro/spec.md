# Spec Delta

## MODIFIED Requirements

### Requirement: Comportamiento de búsqueda vacía y sin coincidencias

El sistema SHALL mostrar todo el catálogo cuando la búsqueda esté vacía y SHALL mostrar un mensaje claro cuando no haya coincidencias. Además, los mensajes de estado del catálogo SHALL estar redactados como texto definitivo, sin referencias a datos de ejemplo.

#### Scenario: Búsqueda vacía muestra todo

- **WHEN** el campo de búsqueda está vacío
- **THEN** se muestra todo el catálogo de libros

#### Scenario: Búsqueda sin coincidencias

- **WHEN** se busca un título que no coincide con ningún libro
- **THEN** se muestra un mensaje claro de que no se encontraron libros

#### Scenario: Los mensajes del catálogo no contienen texto de datos de ejemplo

- **WHEN** se inspeccionan los mensajes `#catalogo-vacio` y `#catalogo-sin-resultados`
- **THEN** sus textos son definitivos y no incluyen la expresión «(datos de ejemplo)» ni ninguna otra referencia a datos ficticios o de maqueta
