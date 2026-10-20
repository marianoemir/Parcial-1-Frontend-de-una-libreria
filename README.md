# Parcial 1: Frontend de una Librería

Tecnicatura Universitaria en Programación — Programación III (UTN)

## Integrantes del Grupo
* Integrante 1: Chirino Mariano
* Integrante 2: Fabre Andrés
* Integrante 3: Quiroga Facundo

🔗 **[Ver repositorio del Parcial 1 - Frontend de Librería](https://github.com/marianoemir/Parcial-1-Frontend-de-una-libreria)**

---

## Instrucciones para abrir el proyecto sin `npm`
El proyecto está desarrollado utilizando únicamente HTML, CSS y JavaScript nativos, por lo que **no requiere instalación de dependencias, compilación ni servidores locales (npm)**.

1. Descargá o cloná el repositorio en tu computadora.
2. Abrí la carpeta del proyecto.
3. Hacé doble clic en el archivo **`index.html`** o arrastralo directamente a cualquier navegador web moderno (Google Chrome, Firefox, Edge, etc.) para visualizar la aplicación.

El proyecto no usa imágenes: no hay archivos de imagen ni referencias a imágenes en `index.html`, `css/` ni `js/`.

---

## Navegación entre Vistas
La interfaz se organiza en distintas vistas accesibles mediante la barra de navegación superior:
* **Catálogo**: Muestra el título de la librería, un buscador interactivo por título y el listado completo de libros con sus detalles.
* **Libros**: Permite registrar nuevos libros mediante un formulario validado y ver el listado actualizado.
* **Clientes**: Permite dar de alta nuevos clientes y visualizar la lista de clientes registrados.
* **Ventas**: Permite seleccionar un cliente, agregar renglones de libros con cantidades, calcular subtotales y total general, y confirmar la venta.
* **Historial**: Muestra las ventas confirmadas con su ID, fecha, cliente, total y la opción de consultar el detalle de sus renglones.

---

## Funcionalidades implementadas y pendientes
**Implementadas:** catálogo con buscador por título; alta de libros y de clientes con validaciones; venta simulada (cliente, renglones, cantidades editables, subtotales y total); historial de ventas con detalle de renglones; persistencia en `localStorage`.

**Pendientes / fuera de alcance:** edición y baja de libros, clientes o ventas; gestión de stock, cobros y facturación; ABM de editoriales, géneros y autores (la consigna no lo exige).

---

## Ubicación de los datos iniciales
Los datos de ejemplo (editoriales, géneros, autores, clientes y libros) están definidos al comienzo de `js/app.js` como arrays en `window.editoriales`, `window.generos`, `window.autores`, `window.clientes` y `window.libros`. Solo libros y clientes se persisten; editoriales, géneros y autores se leen siempre de ese archivo.

---

## Almacenamiento Local (`localStorage`)
* **Funcionamiento**: El sistema almacena los datos de libros, clientes e historial de ventas utilizando el `localStorage` del navegador.
* **Límites**: Este almacenamiento depende exclusivamente del navegador, del perfil de usuario activo y de la ubicación de apertura del archivo. **No comparte información entre diferentes usuarios, navegadores o equipos.**
* **Claves y estructura** (visibles en DevTools → Application → Local Storage):
  * `libreria_libros`: array de `{ id, titulo, isbn, editorialId, generoId, autorIds, precio }`.
  * `libreria_clientes`: array de `{ id, nombre, email }`.
  * `libreria_ventas`: array de `{ id, fecha, clienteId, clienteNombre, clienteEmail, total, renglones: [{ libroId, isbn, titulo, cantidad, precioUnitario, subtotal }] }`.
* **Cómo reproducir la comprobación del precio histórico** (en una copia del proyecto): confirmar una venta y anotar los importes; en DevTools editar solo el campo `precio` de un libro dentro de `libreria_libros`, sin tocar `libreria_ventas`; recargar y abrir "Ver detalle" de la venta. Los renglones usan el `precioUnitario` y `subtotal` guardados en la venta, no el precio actual del catálogo.
* **Datos iniciales**: En el primer inicio de la aplicación, el sistema carga un conjunto de datos ficticios iniciales. En las siguientes recargas, recupera la información guardada sin duplicar los registros iniciales.

---

## Resultados de Casos Manuales de Prueba

Nota: las pruebas con `jsdom` mencionadas en la tabla se ejecutaron localmente durante el desarrollo y no forman parte de este repositorio; los resultados declarados se conservan tal como se observaron.

| Caso | Resultado Esperado | Resultado Observado |
| :--- | :--- | :--- |
| **Búsqueda de libros** | Búsqueda parcial por parte del título sin distinguir mayúsculas/minúsculas; búsqueda vacía muestra todo el catálogo; texto inexistente muestra mensaje sin resultados. | (verificado manualmente) **Aprobado**: Coincide correctamente sin importar mayúsculas, muestra todo al vaciar el campo y avisa si no hay coincidencias. |
| **Alta de libro** | Se rechaza si el título o ISBN están vacíos, precio inválido o ISBN duplicado. El válido se agrega al catálogo y selección de venta. | (verificado manualmente) **Aprobado**: Valida correctamente campos obligatorios, formato de precio y duplicidad de ISBN. |
| **Alta de cliente** | Se rechazan emails vacíos, con formato inválido o duplicados (sin distinguir mayúsculas y sin espacios). El válido aparece en el listado y selector. | (verificado manualmente) **Aprobado**: Valida correctamente formato de correo y previene correos repetidos. |
| **Venta simulada (Renglones)** | No se confirma sin cliente, sin renglones o con cantidades inválidas (cero/negativas/decimales). Libros repetidos actualizan la cantidad en lugar de duplicar renglón. | **Aprobado** (ejecutado en pruebas automatizadas con jsdom): sin cliente, sin renglones y cantidades 0, negativas, decimales, vacías o no numéricas no confirman la venta; un libro repetido suma la cantidad al renglón existente y avisa, sin crear otro renglón. Verificado también manualmente en el navegador. |
| **Venta válida (Cálculos)** | Dos unidades a $1500 y una a $2000 generan subtotales de $3000 y $2000; total general $5000; detalle guardado en el historial. | **Aprobado** (jsdom): subtotales $3000.00 y $2000.00, total $5000.00; el detalle queda en el historial. Verificado también manualmente en el navegador. |
| **Precio Histórico (Inmutabilidad)** | Al confirmar una venta y modificar posteriormente el precio de catálogo de esos libros en `localStorage`, el historial conserva los importes originales de la venta al recargar. | **Aprobado** (jsdom, modificando `precio` en `libreria_libros` y recargando): el detalle de la venta sigue mostrando $1500.00 y $5000.00. Verificado también manualmente en el navegador. |
| **Recarga y Persistencia** | Al recargar la página después de altas y ventas, se recuperan los datos correctamente sin duplicar los elementos de ejemplo iniciales. | **Aprobado** (jsdom): tras altas y una venta, al recargar se recuperan libros, clientes y ventas sin duplicar los ejemplos. Verificado también manualmente en el navegador. |
| **Adaptabilidad y Accesibilidad** | Interfaz utilizable en anchos de 320 px y 1280 px sin desplazamiento horizontal general, con foco visible en controles y tablas con desplazamiento propio. | Verificado manualmente en el navegador: foco visible al recorrer con Tab, sin desplazamiento horizontal de la página a 320 px y 1280 px, y tablas con desplazamiento propio. |
