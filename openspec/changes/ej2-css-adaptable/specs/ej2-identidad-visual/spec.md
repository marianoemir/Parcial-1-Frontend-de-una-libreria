# Spec Delta

## Purpose

Define la identidad visual propia y la organización del CSS del Ejercicio 2, para que las 5 vistas compartan presentación coherente con CSS externo local y sin romper la estructura del Ejercicio 1.

## ADDED Requirements

### Requirement: Identidad visual coherente en las 5 vistas

El sistema SHALL presentar paleta propia con variables CSS, tipografía de pila del sistema, escala de espaciado, tarjetas, formularios y botones con estilo uniforme en Catálogo, Libros, Clientes, Ventas e Historial.

#### Scenario: Recorrido visual de las 5 vistas

- **WHEN** se recorren las 5 secciones en un navegador
- **THEN** colores, tipografía, espaciado, tarjetas, campos y botones se ven coherentes y sin aspecto de navegador por defecto en tarjetas, campos y botones

#### Scenario: Paleta con variables CSS

- **WHEN** se inspecciona el CSS
- **THEN** los colores se definen una vez como variables CSS y se reutilizan en todas las vistas

### Requirement: CSS externo local con clases reutilizadas

El CSS SHALL vivir en archivos locales bajo `css/` sin estilos inline ni elementos `<style>` en el HTML; los elementos equivalentes SHALL compartir clases reutilizables y ningún `id` existente SHALL cambiar.

#### Scenario: Inspección de estilos

- **WHEN** se inspecciona `index.html` y `css/`
- **THEN** no hay atributos `style` ni bloques `<style>`, no hay referencias remotas (ni CDNs ni fuentes externas) y los elementos equivalentes comparten clase

#### Scenario: Id intactos

- **WHEN** se comparan los `id` del HTML con los del Ejercicio 1
- **THEN** todos los `id` existen sin cambios y los textos «Maqueta: sin funcionamiento todavía» siguen presentes

### Requirement: Organización con Flexbox o Grid

El contenido SHALL organizarse con Flexbox o Grid: navegación, fichas del catálogo y formularios adaptan su disposición al ancho disponible en lugar de usar tablas o posicionamiento absoluto para maquetar.

#### Scenario: Disposición por CSS moderno

- **WHEN** se inspecciona el CSS de navegación, catálogo y formularios
- **THEN** la maquetación usa Flexbox o Grid y el contenido fluye sin solaparse
