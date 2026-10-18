# Tasks

## 1. Modelo de datos en JavaScript

- [x] 1.1 Escribir en `js/app.js` los arrays y objetos con identificadores estables: al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios; cada libro con `editorialId` de editorial existente y `autorIds[]` de uno o más autores existentes; `generoId` opcional de género existente. Verificación: inspección de `js/app.js` confirma conteo mínimo y relaciones válidas.
- [x] 1.2 Verificar que cada `editorialId` de los libros existe en `editoriales`, cada `autorId` de `autorIds[]` existe en `autores`, y cada `generoId` asignado existe en `generos`. Verificación: inspección estática de `js/app.js`; ninguna referencia rota.

## 2. Render del catálogo y filtro por título

- [x] 2.1 Implementar `renderCatalogo(librosAFiltrar)` que limpie `#catalogo-lista` y cree un `<article>` por libro con título, ISBN, editorial, género («Sin clasificar» si falta), autores y precio, insertando todo con `textContent` (no `innerHTML`). Verificación: `js/app.js` no contiene `innerHTML`; render genera una ficha por libro del array pasado.
- [x] 2.2 Implementar `filtrarPorTitulo(texto)` que aplique `trim()`, `toLowerCase()` y `includes()` sobre `libro.titulo`; retorne todos los libros si el texto está vacío tras `trim()`. Verificación: inspección de `js/app.js` confirma las tres transformaciones y el caso de texto vacío.
- [x] 2.3 Reemplazar en `index.html` las 2 fichas hardcodeadas de `#catalogo-lista` por el contenedor vacío (sin quitar ningún `id`, clase ni texto de sección). Verificación: `#catalogo-lista` existe vacío en el HTML; los 74 `id` del Ej.1 siguen intactos.

## 3. Eventos del buscador y mensajes de estado

- [x] 3.1 Conectar en `js/app.js` el evento `DOMContentLoaded` (render inicial del catálogo completo) y el listener del buscador (botón "Buscar" e `input` del campo) que llamen a `filtrarPorTitulo` + `renderCatalogo`. Verificación: al abrir `index.html` con doble clic se muestra todo el catálogo sin servidor.
- [x] 3.2 Alternar `#catalogo-sin-resultados` y `#catalogo-vacio` según el resultado: búsqueda vacía → todo el catálogo; sin coincidencias → mensaje claro de `#catalogo-sin-resultados`. Verificación: inspección y prueba manual del buscador con término vacío y con término sin coincidencias.

## 4. Verificación final contra las specs

- [x] 4.1 Repasar cada Scenario de `openspec/changes/ej3-catalogo-js-filtro/specs/ej3-catalogo-js-filtro/spec.md` sobre el resultado y comprobar que todos se cumplen (modelo de datos, catálogo generado desde JS, filtro insensible/parcial/trim, búsqueda vacía y sin coincidencias, `textContent`, eventos con responsabilidades reconocibles, sin fetch ni ABML). Verificación: todas las WHEN/THEN de la spec se cumplen en la aplicación.

## Correcciones posteriores (fix del botón Buscar)

> Tareas del change `fix-boton-buscar-catalogo`, incorporadas aquí al consolidar sus correcciones dentro del Ej.3. Se reprodujeron tal cual (mismo texto, estado y evidencia); solo se bajó un nivel los encabezados de grupo para anidarlos en esta sección.

### 1. Mantener onclick inline como fallback (decisión B)

- [x] 1.1 Conservar el atributo `onclick` inline de `#catalogo-buscar-boton` en `index.html` llamando a `ejecutarBusqueda()` (fallback navegador, según memoria previa); verificar que el botón conserve `type="button"` e `id="catalogo-buscar-boton"`
- [x] 1.2 Asegurar que el inline `onclick` no use `event` ni lógica duplicada; solo invoque `ejecutarBusqueda()`

### 2. Cablear eventos con addEventListener (grader)

- [x] 2.1 Reemplazar `btnBuscar.onclick = ...` por `btnBuscar.addEventListener("click", ...)` que invoque `ejecutarBusqueda()` y prevenga el comportamiento por defecto; verificar que `boton.eventListeners["click"]` tenga al menos un listener
- [x] 2.2 Registrar `submit` en `#catalogo-buscador-form` con `preventDefault()` y llamada a `ejecutarBusqueda()`; verificar que Enter no recargue la página
- [x] 2.3 Mantener el listener `input` sobre `#catalogo-busqueda` en `inicializar`; verificar que `busqueda.eventListeners["input"]` tenga al menos un listener
- [x] 2.4 Asegurar que `ejecutarBusqueda()` filtre, renderice y actualice mensajes (vacío → todo el catálogo; sin coincidencias → mensaje visible); verificar con `node test/run-tests.js`

### 3. Validación

- [x] 3.1 Ejecutar `node test/run-tests.js` y confirmar que todos los tests pasan (0 fallos)
- [x] 3.2 Revisar que el botón tenga listener click via addEventListener y que el formulario de búsqueda prevenga submit
