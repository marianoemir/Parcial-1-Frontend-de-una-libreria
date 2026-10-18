# Tasks

## 1. Modelo y helpers de validación (js/app.js)

- [ ] 1.1 Agregar función para generar ids estables nuevos (liN para libros, clN para clientes) a partir del máximo existente en window.libros/window.clientes; verificar que los ids existentes (li1..li7, cl1..cl3) no cambien.
- [ ] 1.2 Implementar normalizadora de ISBN (quitar espacios y guiones) y función de duplicado de ISBN sobre window.libros; verificar que un ISBN existente detectado tras normalizar se considera duplicado.
- [ ] 1.3 Implementar validarLibro(datos): título e ISBN no vacíos, ISBN único, precio numérico > 0, editorial existente, al menos un autor, todos los autores existentes, género opcional pero existente si se asigna; devuelve lista de mensajes de error. Verificar cada regla con una llamada directa a la función.
- [ ] 1.4 Implementar validarCliente(datos): nombre completo y email no vacíos, email con formato válido, email único (trim + case-insensitive sobre window.clientes); devuelve lista de mensajes de error. Verificar cada regla con una llamada directa a la función.

## 2. Alta de libro (js/app.js + index.html listeners)

- [ ] 2.1 Agregar listener de submit a #libros-form con preventDefault; leer título, ISBN, precio, editorial, género y autores (select múltiple); verificar que el envío no recargue la página y no se envie al servidor.
- [ ] 2.2 Mostrar errores de validación de libro en #libros-error cerca del formulario y no agregar nada si hay errores; verificar con envíos inválidos (ISBN vacío, precio 0, autor ausente, etc.).
- [ ] 2.3 Agregar libro a window.libros con id estable, renderizar #libros-lista (o #libros-vacio), actualizar #catalogo-lista mediante window.renderCatalogo y mostrar #libros-exito; verificar que el libro nuevo aparece en el listado y en el catálogo sin recargar.
- [ ] 2.4 Insertar todos los datos mostrados con textContent (nunca innerHTML); verificar con un valor que contenga etiquetas HTML que se muestre como texto literal.

## 3. Alta de cliente (js/app.js + index.html listeners)

- [ ] 3.1 Agregar listener de submit a #clientes-form con preventDefault; leer nombre completo y email; verificar que el envío no recargue la página.
- [ ] 3.2 Mostrar errores de validación de cliente en #clientes-error cerca del formulario y no agregar nada si hay errores; verificar con email vacío, email mal formado y email duplicado (mayúsculas/minúsculas y con espacios).
- [ ] 3.3 Agregar cliente a window.clientes con id estable, renderizar #clientes-lista (o #clientes-vacio) y mostrar #clientes-exito; verificar que el cliente nuevo aparece sin recargar.
- [ ] 3.4 Insertar todos los datos mostrados con textContent (nunca innerHTML); verificar con un valor que contenga etiquetas HTML.

## 4. Opciones relacionadas de <select> (sin recarga)

- [ ] 4.1 Implementar actualizarOpciones() que reconstruya opciones de editorial, género y autores en #libros-form y de cliente en #ventas-cliente a partir de window.editoriales/window.generos/window.autores/window.clientes con document.createElement + textContent, sin cambiar la opción placeholder ni los ids existentes; verificar tras cada alta que las nuevas opciones aparecen.
- [ ] 4.2 Verificar que al agregar libro/cliente se refresquen las opciones relacionadas y el catálogo sin recargar la página, en una sola secuencia end-to-end.

## 5. Verificación de integración (abrir index.html directamente, sin servidor)

- [ ] 5.1 Abrir index.html en el navegador y completar el flujo de alta de libro válido (con ISBN nuevo, precio > 0, editorial ed1/ed2, uno o más autores de au1/au2/au3, género con/sin clasificar); verificar listado, catálogo, opciones de <select> y mensaje de éxito.
- [ ] 5.2 Abrir index.html y completar el flujo de alta de cliente válido; verificar listado de clientes, opción en #venta-cliente y mensaje de éxito.
- [ ] 5.3 Verificar que ningún id existente de index.html cambió y que no hay fetch, localStorage ni servidor involucrados.
