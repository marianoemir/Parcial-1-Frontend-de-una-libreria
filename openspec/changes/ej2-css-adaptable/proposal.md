# Proposal

## Why

El Ejercicio 1 dejó la estructura HTML completa pero sin presentación: `css/styles.css` está vacío y la página se ve con estilos de navegador. El Ejercicio 2 de la consigna (20 pts) exige identidad visual propia, organización con Flexbox/Grid y uso adaptable y accesible, todo solo con CSS local y sin romper lo ya logrado.

## What Changes

- Identidad visual propia y coherente solo con CSS: paleta definida con variables CSS, tipografía de pila del sistema, escala de espaciado, tarjetas para el catálogo, formularios y botones uniformes en las 5 vistas (`#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`).
- CSS externo en archivos locales bajo `css/` (se mantiene `css/styles.css` como entrada; se permite dividir en un segundo archivo local solo si se justifica en `design.md`). Sin estilos inline y sin `<style>` en el HTML. Sin librerías, frameworks, CDNs, Google Fonts ni recursos remotos.
- Clases reutilizables mínimas agregadas al HTML para elementos equivalentes (tarjetas, campos, botones, mensajes, contenedores de tablas). **Se agregan clases al HTML**: solo atributos `class` nuevos (la navegación usa `menu-principal`, no `nav-principal`, que colisionaría con el `id="nav-principal"` existente); ningún `id` existente se cambia, ningún texto «Maqueta: sin funcionamiento todavía» se quita, ninguna etiqueta semántica se altera.
- Organización del contenido con Flexbox o Grid (a decidir en `design.md`): navegación, lista de fichas del catálogo y formularios adaptan su disposición según el ancho.
- Comprobación a 320 px y 1280 px: textos y controles legibles, sin scroll horizontal de la página; cada tabla SHALL desplazarse dentro de su propio contenedor (envoltorios con scroll propio agregados en el HTML con clases).
- Accesibilidad visual sin JS: foco visible en todos los controles, navegación por teclado intacta, mensajes de error y estado con texto explícito (no solo color), el CSS no SHALL anular el atributo `hidden` (regla de guardia `[hidden]`).
- Resolución de «vista actual identificable» sin JS (hoy `aria-current="page"` fijo en Catálogo): se resuelve solo con CSS mediante resaltado de la sección destino (`section:target`); la decisión y sus límites se registran en `design.md`. No se agrega JS.
- Imágenes: no se agregan (supuesto; ver supuestos). Si en `apply` se decidiera agregar alguna, SHALL ser local y con `alt` correcto.
- Limpieza de entrega: se elimina `PROMPT1.md` de la raíz del repo (era andamiaje del Ejercicio 1, no parte de la entrega).
- Fuera de alcance explícito: JS funcional, datos, validaciones, ventas, `localStorage` y README (se arma al final entre todos los ejercicios).

## Capabilities

### New Capabilities

- `ej2-identidad-visual`: identidad visual coherente y organización del CSS (paleta con variables, tipografía del sistema, espaciado, tarjetas, formularios, botones; CSS externo local, clases reutilizadas, Flexbox/Grid; limpieza de `PROMPT1.md`).
- `ej2-adaptacion-accesible`: presentación adaptable y accesible sin JS (320 px y 1280 px sin scroll horizontal de página, tablas con scroll propio, foco visible y teclado, mensajes con texto no solo color, `hidden` respetado, vista actual identificable sin JS, imágenes locales con `alt` si las hubiera).

### Modified Capabilities

- Ninguna. Las capacidades `ej1-vistas-navegacion` y `ej1-semantica-formularios` no cambian requisitos: el HTML conserva sus `id`, su semántica y sus textos; este change solo agrega `class` y CSS.

## Impact

- Archivos afectados en `apply` (este change solo planifica, no los toca): `css/styles.css` (contenido completo), `index.html` (solo agregado de atributos `class` y envoltorios de tablas con clase; sin cambios de `id` ni textos), posible segundo CSS local si `design.md` lo justifica, y eliminación de `PROMPT1.md`.
- Sin dependencias nuevas, sin cambios de comportamiento JS, sin cambios en las specs del Ej.1.
- Supuestos: (1) no se agregan imágenes; (2) se acepta `:target` como mecanismo de «vista actual» sin JS con los límites documentados en `design.md`; (3) basta con Chromium/Firefox de escritorio + vista móvil a 320 px para comprobar (doble clic, sin servidor).
