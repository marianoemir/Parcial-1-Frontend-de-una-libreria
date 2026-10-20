# Tasks

## 1. Modelo y helpers de validación (js/app.js)

- [x] 1.1 Agregar función para generar ids estables nuevos (liN para libros, clN para clientes) a partir del máximo existente en window.libros/window.clientes; verificar que los ids existentes (li1..li7, cl1..cl3) no cambien. verificado (usuario y Chromium)
- [x] 1.2 Implementar normalizadora de ISBN (quitar espacios y guiones) y función de duplicado de ISBN sobre window.libros; verificar que un ISBN existente detectado tras normalizar se considera duplicado. verificado (usuario y Chromium)
- [x] 1.3 Implementar validarLibro(datos): título e ISBN no vacíos, ISBN único, precio numérico > 0, editorial existente, al menos un autor, todos los autores existentes, género opcional pero existente si se asigna; devuelve lista de mensajes de error. Verificar cada regla con una llamada directa a la función. verificado (usuario y Chromium)
- [x] 1.4 Implementar validarCliente(datos): nombre completo y email no vacíos, email con formato válido, email único (trim + case-insensitive sobre window.clientes); devuelve lista de mensajes de error. Verificar cada regla con una llamada directa a la función. verificado (usuario y Chromium)

## 2. Alta de libro (js/app.js + index.html listeners)

- [x] 2.1 Agregar listener de submit a #libros-form con preventDefault; leer título, ISBN, precio, editorial, género y autores (select múltiple); verificar que el envío no recargue la página y no se envie al servidor. verificado (usuario y Chromium)
- [x] 2.2 Mostrar errores de validación de libro en #libros-error cerca del formulario y no agregar nada si hay errores; verificar con envíos inválidos (ISBN vacío, precio 0, autor ausente, etc.). verificado (usuario y Chromium)
- [x] 2.3 Agregar libro a window.libros con id estable, renderizar #libros-lista (o #libros-vacio), actualizar #catalogo-lista mediante window.renderCatalogo y mostrar #libros-exito; verificar que el libro nuevo aparece en el listado y en el catálogo sin recargar. verificado (usuario y Chromium)
- [x] 2.4 Insertar todos los datos mostrados con textContent (nunca innerHTML); verificar con un valor que contenga etiquetas HTML que se muestre como texto literal. verificado (usuario y Chromium)

## 3. Alta de cliente (js/app.js + index.html listeners)

- [x] 3.1 Agregar listener de submit a #clientes-form con preventDefault; leer nombre completo y email; verificar que el envío no recargue la página. verificado (usuario y Chromium)
- [x] 3.2 Mostrar errores de validación de cliente en #clientes-error cerca del formulario y no agregar nada si hay errores; verificar con email vacío, email mal formado y email duplicado (mayúsculas/minúsculas y con espacios). verificado (usuario y Chromium)
- [x] 3.3 Agregar cliente a window.clientes con id estable, renderizar #clientes-lista (o #clientes-vacio) y mostrar #clientes-exito; verificar que el cliente nuevo aparece sin recargar. verificado (usuario y Chromium)
- [x] 3.4 Insertar todos los datos mostrados con textContent (nunca innerHTML); verificar con un valor que contenga etiquetas HTML. verificado (usuario y Chromium)

## 4. Opciones relacionadas de <select> (sin recarga)

- [x] 4.1 Implementar actualizarOpciones() que reconstruya opciones de editorial, género y autores en #libros-form y de cliente en #ventas-cliente a partir de window.editoriales/window.generos/window.autores/window.clientes con document.createElement + textContent, sin cambiar la opción placeholder ni los ids existentes; verificar tras cada alta que las nuevas opciones aparecen. verificado (usuario y Chromium)
- [x] 4.2 Verificar que al agregar libro/cliente se refresquen las opciones relacionadas y el catálogo sin recargar la página, en una sola secuencia end-to-end. verificado (usuario y Chromium)

## 5. Verificación de integración (abrir index.html directamente, sin servidor)

- [x] 5.1 Abrir index.html en el navegador y completar el flujo de alta de libro válido (con ISBN nuevo, precio > 0, editorial ed1/ed2, uno o más autores de au1/au2/au3, género con/sin clasificar); verificar listado, catálogo, opciones de <select> y mensaje de éxito. verificado (usuario y Chromium)
- [x] 5.2 Abrir index.html y completar el flujo de alta de cliente válido; verificar listado de clientes, opción en #venta-cliente y mensaje de éxito. verificado (usuario y Chromium)
- [x] 5.3 Verificar que ningún id existente de index.html cambió y que no hay fetch ni servidor involucrados (la persistencia con localStorage se agregó después en ej6) verificado (usuario y Chromium)

## Correcciones posteriores (fix de selectores)

> Tareas del change `fix-selectores-ej4`, incorporadas aquí al consolidar sus correcciones dentro del Ej.4. Se reprodujeron tal cual (mismo texto, estado y evidencia); solo se bajó un nivel los encabezados de grupo para anidarlos en esta sección.

### 1. Selectores del alta de libro (R-01, R-03)

- [x] 1.1 Parametrizar `reconstruirSelect` dentro de `actualizarOpciones` en `js/app.js` para distinguir tres casos: placeholder deshabilitado (editorial, venta-cliente), opción inicial habilitada y seleccionada (género), y sin placeholder (autores). Verificación: leer el código y confirmar que `#libro-autores` (múltiple) se reconstruye sin ninguna opción `value=""`, que `#libro-genero` recibe «Sin clasificar» (value `""`) con `disabled` ausente/false y `selected = true`, y que `#libro-editorial` y `#venta-cliente` mantienen su opción inicial con `disabled = true` ✅ Evidencia: `js/app.js` — `reconstruirSelect(select, items, modo, textoInicial, valorInicial)` con modos `placeholder`/`inicial`/`sin-inicial`; autores sin opción inicial; género con «Sin clasificar» habilitada y `selected`; editorial y venta-cliente con placeholder `disabled=true`. Revisión de código OK.
- [x] 1.2 Verificar en navegador que guardar un libro con un autor real seleccionado no produce «El autor  no existe» y que el libro se agrega (confirma el usuario) ✅ Evidencia: confirmado por el usuario en el navegador.
- [x] 1.3 Verificar en navegador que, tras elegir un género real, se puede volver a elegir «Sin clasificar» y guardar el libro sin género, mostrándose «Sin clasificar» (confirma el usuario) ✅ Evidencia: confirmado por el usuario en el navegador.

### 2. Validación de autores (R-02)

- [x] 2.1 En `validarLibro` (`js/app.js`) descartar los ids vacíos de `autorIds` antes de validar: si no queda ninguno, el error debe ser exactamente «Seleccioná al menos un autor»; si quedan, validarlos contra `window.autores`. Verificación: en la consola del navegador, `window.validarLibro` con `autorIds: [""]` y el resto de campos válidos devuelve un error que incluye «Seleccioná al menos un autor» y no incluye «El autor  no existe» (confirma el usuario); complementariamente, revisión de código de la función pura (código aplicado) ✅ Evidencia: confirmado por el usuario en el navegador.

### 3. Guardado con texto sin espacios sobrantes (R-04)

- [x] 3.1 En `procesarAltaLibro` (`js/app.js`) almacenar `titulo` con `.trim()` al crear el libro. Verificación: guardar un libro con título `"  Rayuela  "` y confirmar en el listado y el catálogo que el título aparece sin espacios en los extremos (confirma el usuario) ✅ Evidencia: confirmado por el usuario en el navegador.
- [x] 3.2 En `procesarAltaCliente` (`js/app.js`) almacenar `nombre` con `.trim()` al crear el cliente. Verificación: guardar un cliente con nombre `"  Ana López  "` y confirmar en el listado que el nombre aparece sin espacios en los extremos (confirma el usuario) ✅ Evidencia: confirmado por el usuario en el navegador.

### 4. Buscador al cargar (R-05)

- [x] 4.1 Reemplazar en `window.inicializar` (`js/app.js`) la llamada incondicional `window.renderCatalogo(window.libros)` por `window.ejecutarBusqueda()`, para que se respete el valor actual de `#catalogo-busqueda`. Verificación: revisión de código; y ejecutar el arnés de pruebas local (ver 7.1) confirmando que con el campo vacío el catálogo sigue mostrando todos los libros; y en navegador, recargar con texto en el campo y confirmar que el catálogo queda filtrado por ese texto (confirma el usuario) (código aplicado) ✅ Evidencia: confirmado por el usuario en el navegador.

### 5. Limpieza de maqueta (R-06)

- [x] 5.1 Quitar en `index.html` el párrafo `<p><strong>Maqueta: sin funcionamiento todavía.</strong>…</p>` de las secciones Catálogo, Libros y Clientes (en Catálogo el párrafo incluye además «Datos de ejemplo (no reales).»; se asume que se retira el párrafo completo). Verificación: `Select-String -Path index.html -Pattern "Maqueta: sin funcionamiento"` devuelve exactamente 2 coincidencias (Ventas e Historial) ✅ Evidencia: `Select-String -Path index.html -Pattern "Maqueta: sin funcionamiento"` → 2 coincidencias.
- [x] 5.2 Confirmar que ningún `id` del HTML cambió y que no se agregaron recursos remotos. Verificación: comparar la lista de `id` de `index.html` antes/después del cambio y confirmar que el set es idéntico; revisar que no haya `http://`/`https://` ni `src`/`href` remotos ✅ Evidencia: set de `id` antes/después idéntico (72 = 72, sin duplicados; todas las etiquetas `for` con `id` coincidente); grep de recursos remotos (`https?://|cdn|@import|node_modules|package.json`) sin coincidencias; `package.json` y `node_modules` no existen.

### 6. Dependencia de `test/tests.js` con la opción vacía (reporte, sin modificar)

- [x] 6.1 Inspeccionar `test/tests.js` (bloque `testActualizarOpciones`, ~líneas 786-836) y reportar si depende de la opción vacía de `#libro-autores`: se verificó que reconstruye el select con placeholder y afirma `autoresSelect.options.length === window.autores.length + 1` (línea 835), por lo que R-01 hará fallar esa aserción. Verificación/entregable: reporte escrito que cita archivo, número de línea y aserción, e indica que NO se modificó ningún archivo de `test/` ✅ Evidencia (corrige la hipótesis anterior): `test/tests.js:786-854` — `testActualizarOpciones` define su PROPIO `reconstruirSelect` local (líneas 811-830) y NO llama a `window.actualizarOpciones`; la aserción de línea 835 (`autoresSelect.options.length === window.autores.length + 1`) opera sobre esa copia local (placeholder + items), por lo que R-01 NO la afecta. Arnés: Pasó 187 / Falló 0, sin cambios. Ningún archivo de `test/` fue modificado.
- [x] 6.2 Reportar si `test/run-tests.js` es ejecutable tal cual en esta máquina. Verificación/entregable: reporte escrito indicando que `run-tests.js` codifica rutas absolutas a `C:/Users/andre/...` (inexistentes aquí), por lo que no corre tal cual sin editar `test/` (prohibido); documentar el arnés local equivalente usado en 7.1 ✅ Evidencia: `test/run-tests.js` líneas 4, 13 y 23 usan rutas absolutas `C:/Users/andre/...` inexistentes en esta máquina; NO corre tal cual sin editar `test/`. Se usó el arnés local equivalente en `…/Temp/opencode/fix-selectores-harness.js` (dom-stub.js → app.js → tests.js con rutas correctas).

### 7. Integración y verificación final

- [x] 7.1 Ejecutar el arnés de pruebas localmente contra `js/app.js` (cargando `test/dom-stub.js`, luego `js/app.js`, luego `test/tests.js`, con rutas locales correctas) y registrar el resultado. Verificación: capturar la salida «Pasó: N | Falló: M»; baseline medido antes de los cambios = 187 pasó / 0 falló; tras R-01 se espera que falle 1 aserción (la de placeholder de autores citada en 6.1) y se debe reportar honestamente ✅ Evidencia: baseline (antes) = Pasó: 187 | Falló: 0 | Total: 187; después de los cambios = Pasó: 187 | Falló: 0 | Total: 187. No falló ninguna aserción: la de placeholder citada en 6.1 usa una copia local y no se ve afectada. Arnés: `…/Temp/opencode/fix-selectores-harness.js`.
- [x] 7.2 Verificación manual integral en navegador (doble clic en `index.html`, sin servidor): altas de libro y cliente exitosas, imposibilidad de «El autor  no existe», reselección de «Sin clasificar», títulos/nombres sin espacios sobrantes, buscador respetando texto al cargar y ausencia de textos de maqueta en Catálogo/Libros/Clientes (confirma el usuario) ✅ Evidencia: confirmado por el usuario en el navegador.
- [x] 7.3 Confirmar el cumplimiento de la restricción dura: sin librerías/frameworks, sin CDNs/recursos remotos, sin `package.json`/`node_modules`, y `index.html` funcional por doble clic. Verificación: revisión de `index.html` y `js/app.js` y listado del árbol del proyecto ✅ Evidencia: sin librerías/frameworks/CDNs; grep de recursos remotos sin coincidencias; `package.json` y `node_modules` no existen; `index.html` abre por doble clic (sin servidor); css/ y js/ locales.
