# Spec Delta

## MODIFIED Requirements

### Requirement: CSS externo local con clases reutilizadas

El CSS SHALL vivir en archivos locales bajo `css/` sin estilos inline ni elementos `<style>` en el HTML; los elementos equivalentes SHALL compartir clases reutilizables y ningún `id` existente SHALL cambiar.

#### Scenario: Inspección de estilos

- **WHEN** se inspecciona `index.html` y `css/`
- **THEN** no hay atributos `style` ni bloques `<style>`, no hay referencias remotas (ni CDNs ni fuentes externas) y los elementos equivalentes comparten clase

#### Scenario: Id intactos

- **WHEN** se comparan los `id` del HTML con los del Ejercicio 1
- **THEN** todos los `id` existen sin cambios; el texto «Maqueta: sin funcionamiento todavía.» permanece únicamente en las secciones Ventas e Historial (se quitó de Catálogo, Libros y Clientes porque ya funcionan, además del párrafo del header y la leyenda del footer ya retirados)
