# Tasks

> Nota: las comprobaciones manuales en el navegador las confirma el usuario; ninguna tarea se marca [x] sin su confirmación.

## 1. Clases en el HTML, identidad visual y base CSS

Clases nuevas declaradas (solo agregados de `class`, sin tocar ningún `id` ni texto): `contenedor`, `menu-principal`, `tarjeta`, `campo`, `boton`, `boton-primario`, `mensaje`, `mensaje-error`, `mensaje-exito`, `tabla-scroll`. La navegación usa `menu-principal` (no `nav-principal`, que colisionaría con el `id="nav-principal"` existente). Envoltorios nuevos: un `div.tabla-scroll` alrededor de cada `table` (libros, clientes, renglones de venta, historial y detalle).

- [ ] 1.1 Escribir en `css/styles.css` la paleta con variables `:root`, la tipografía de pila del sistema y la escala de espaciado, y comprobar abriendo `index.html` con doble clic que las 5 vistas comparten colores, fuente y ritmo visual (confirma el usuario).
- [ ] 1.2 Agregar las clases declaradas arriba a nav, fichas, formularios, botones y mensajes de `index.html` sin cambiar ningún `id` ni quitar textos «Maqueta: sin funcionamiento todavía», y comprobar con búsqueda de `id="` que todos los `id` del Ej.1 siguen intactos (confirma el usuario).
- [ ] 1.3 Estilizar tarjetas del catálogo, campos de formulario, botones y mensajes (`tarjeta`, `campo`, `boton`, `boton-primario`, `mensaje`, `mensaje-error`, `mensaje-exito`) con apariencia uniforme, y comprobar recorriendo las 5 secciones que elementos equivalentes se ven iguales (confirma el usuario).
- [ ] 1.4 Agregar la guardia `[hidden]{display:none!important}` como primera regla de estado y los prefijos visuales `.mensaje-error::before { content: "Error: " }` / `.mensaje-exito::before { content: "Éxito: " }` en CSS sin cambiar los textos del HTML (que siguen siendo «No se pudo…» / «…correctamente…»), y comprobar quitando `hidden` en memoria a un mensaje de éxito y uno de error que ambos se entienden por su texto (confirma el usuario).

## 2. Maquetación

- [ ] 2.1 Maquetar con Grid la lista del catálogo (`#catalogo-lista` con `auto-fill/minmax`) y con Flexbox la navegación (`.menu-principal`) y las filas de formulario más una media query de refuerzo (~640 px), y comprobar que a 1280 px el catálogo muestra varias columnas y a 320 px colapsa a una sin solapes (confirma el usuario).

## 3. Adaptación y tablas

- [ ] 3.1 Envolver cada `table` en un `div.tabla-scroll` con `overflow-x:auto` y reglas `max-width:100%`, `min-width:0` y `overflow-wrap:break-word`, y comprobar a 320 px que cada tabla ancha se desplaza dentro de su contenedor (confirma el usuario).
- [ ] 3.2 Comprobar a 320 px y 1280 px (ventana del navegador o herramientas de desarrollo, sin servidor) que todos los textos y controles son legibles y la página no genera scroll horizontal en ninguna de las 5 vistas (confirma el usuario; no marcar [x] sin su confirmación).

## 4. Accesibilidad sin JS

- [ ] 4.1 Aplicar estilo `:focus-visible` de alto contraste sin eliminar el contorno por defecto y comprobar recorriendo toda la página solo con Tab/Shift+Tab que cada parada muestra foco visible y cada control se acciona con Enter o Espacio (confirma el usuario; no marcar [x] sin su confirmación).
- [ ] 4.2 Implementar el resaltado `section:target` (borde + fondo + `scroll-margin-top`) conservando `aria-current="page"` fijo en Catálogo para lectores de pantalla y sin dar al enlace con `aria-current` aspecto fuerte de activo, y comprobar que al seguir cada enlace de la navegación la sección destino (`:target`) queda identificada como marca visible sin ejecutar JavaScript (confirma el usuario).

## 5. Limpieza y verificación final

- [ ] 5.1 Eliminar `PROMPT1.md` de la raíz y comprobar que ya no existe listando la raíz y que `index.html` reabre con doble clic con las 5 vistas alcanzables, sin estilos inline, sin `<style>`, sin recursos remotos y sin imágenes (o con imágenes solo locales con `alt` correcto si alguna se hubiera agregado; las decorativas con `alt=""`) (confirma el usuario; no marcar [x] sin su confirmación).
- [ ] 5.2 Repasar cada Scenario de `specs/ej2-identidad-visual/spec.md` y `specs/ej2-adaptacion-accesible/spec.md` sobre el resultado y comprobar que todos se cumplen (variables, clases reutilizadas, Grid/Flexbox, 320/1280, tablas con scroll propio, foco, mensajes con texto, `hidden`, vista actual, recursos locales) (confirma el usuario).
