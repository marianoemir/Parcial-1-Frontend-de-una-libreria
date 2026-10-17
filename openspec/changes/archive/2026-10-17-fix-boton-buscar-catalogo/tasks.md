# Tasks

## 1. Mantener onclick inline como fallback (decisión B)

- [x] 1.1 Conservar el atributo `onclick` inline de `#catalogo-buscar-boton` en `index.html` llamando a `ejecutarBusqueda()` (fallback navegador, según memoria previa); verificar que el botón conserve `type="button"` e `id="catalogo-buscar-boton"`
- [x] 1.2 Asegurar que el inline `onclick` no use `event` ni lógica duplicada; solo invoque `ejecutarBusqueda()`

## 2. Cablear eventos con addEventListener (grader)

- [x] 2.1 Reemplazar `btnBuscar.onclick = ...` por `btnBuscar.addEventListener("click", ...)` que invoque `ejecutarBusqueda()` y prevenga el comportamiento por defecto; verificar que `boton.eventListeners["click"]` tenga al menos un listener
- [x] 2.2 Registrar `submit` en `#catalogo-buscador-form` con `preventDefault()` y llamada a `ejecutarBusqueda()`; verificar que Enter no recargue la página
- [x] 2.3 Mantener el listener `input` sobre `#catalogo-busqueda` en `inicializar`; verificar que `busqueda.eventListeners["input"]` tenga al menos un listener
- [x] 2.4 Asegurar que `ejecutarBusqueda()` filtre, renderice y actualice mensajes (vacío → todo el catálogo; sin coincidencias → mensaje visible); verificar con `node test/run-tests.js`

## 3. Validación

- [x] 3.1 Ejecutar `node test/run-tests.js` y confirmar que todos los tests pasan (0 fallos)
- [x] 3.2 Revisar que el botón tenga listener click via addEventListener y que el formulario de búsqueda prevenga submit
