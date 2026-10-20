# Tasks

## 1. Persistencia: verificación por lectura de código

- [x] 1.1 Verificar en `js/app.js` las claves y el guardado: `CLAVE_LIBROS`, `CLAVE_CLIENTES` y `CLAVE_VENTAS` (998-1000) y `guardarEnLocalStorage` escribiendo las tres con `JSON.stringify` (1002-1010); comprobar que se invoca al agregar un libro (535), al agregar un cliente (597) y al confirmar una venta (862).
- [x] 1.2 Verificar la carga inicial: `leerArrayGuardado` devuelve `null` si la clave no existe (1013-1018); `cargarDesdeLocalStorage` conserva los ejemplos para libros y clientes, asigna `[]` a ventas y guarda las tres claves (1027-1036); el listener final ejecuta la carga antes de volver a renderizar (1068-1079).
- [x] 1.3 Verificar que una recarga no duplica los ejemplos: la carga asigna los arrays guardados a `window.libros` y `window.clientes` (1032-1033) en lugar de concatenarlos, y vuelve a guardar el mismo estado (1036).
- [x] 1.4 Verificar la tolerancia a datos ilegibles: `JSON.parse` está dentro de `try/catch`, se devuelve `null` ante error y se exige `Array.isArray` (1013-1023); el guardado también captura errores de escritura (1002-1010).
- [x] 1.5 Verificar que un `localStorage` bloqueado no rompe la página: tanto la lectura como la escritura están encapsuladas en `try/catch` (1002-1010, 1013-1023) y la interfaz continúa con los datos en memoria.
- [x] 1.6 Verificar que no hay otras mutaciones de libros, clientes o ventas sin guardado: las altas y la confirmación son los únicos puntos que modifican los arrays y todos llaman a `guardarEnLocalStorage` (535, 597, 862); no existen edición ni baja de registros.
- [x] 1.7 Comprobar en el navegador, en una copia del proyecto: primer inicio con ejemplos, recarga tras altas y venta sin duplicados, `libreria_libros` con JSON inválido y acceso a `localStorage` bloqueado. ✅ Confirmado por el usuario.

## 2. Corrección del README

- [x] 2.1 Verificar el título del README contra la cadena `librer-a`: la lectura actual de la línea 1 muestra `# Parcial 1: Frontend de una Librería` con la «í» en UTF-8 (`C3 AD`), y la cadena `librer-a` no aparece en `README.md`; las únicas coincidencias están en artefactos de este change que citan la cadena buscada. El nombre del repositorio remoto (`Parcial-1-Frontend-de-una-libreria`) queda fuera del alcance del README. ✅ Evidencia: búsqueda literal y lectura de la línea 1.
- [x] 2.2 Agregar una línea que aclare que el proyecto no usa imágenes, debajo de las instrucciones para abrir `index.html` sin `npm`. Verificar que la línea exista y que no haya archivos de imagen ni referencias `img`, `url(...)` o URLs en `index.html`, `css/` ni `js/`. ✅ Evidencia: línea agregada en `README.md`; 0 archivos de imagen versionados y 0 referencias `img`, `url(...)` o URLs en los archivos de la entrega.
- [x] 2.3 Agregar una nota antes de la tabla de resultados que aclare que las pruebas con `jsdom` se ejecutaron localmente y no forman parte del repositorio; la nota debe cubrir la fila 62 («Aprobado (ejecutado en pruebas automatizadas con jsdom)») y las filas 63-65 que mencionan `jsdom`, sin cambiar ningún resultado declarado. Verificar con `git diff` que solo se agregó la nota y que las celdas de resultado permanecen intactas. ✅ Evidencia: nota presente antes de la tabla; no modifica por sí misma ningún resultado. Las filas se actualizaron después conforme a las instrucciones del usuario para las tareas 2.4, 3.1 y 3.2.
- [x] 2.4 Actualizar la fila de teclado y anchos de 320/1280 px con el resultado observado por el usuario: «Verificado manualmente en el navegador: foco visible al recorrer con Tab, sin desplazamiento horizontal de la página a 320 px y 1280 px, y tablas con desplazamiento propio.». ✅ Confirmado por el usuario.
- [x] 2.5 Revisar que el README siga identificando a las personas integrantes y documentando apertura sin `npm`, navegación entre las cinco vistas, funcionalidades implementadas y pendientes, datos iniciales, funcionamiento y límites de `localStorage`, resultados observados e imágenes. Verificar por lectura contra los requisitos de `specs/ej6-persistencia-documentacion/spec.md`. ✅ Evidencia: revisión por lectura; el README conserva todas las secciones exigidas y agrega la aclaración sobre imágenes y la nota sobre `jsdom`.

## 3. Cierre: resultados declarados solo si se ejecutaron

- [x] 3.1 Revisar cada fila marcada «Aprobado» del README y confirmar que tiene evidencia de ejecución (manual o automatizada local) o que la nota de `jsdom` aclara su origen; no debe quedar ninguna prueba aprobada sin constancia. ✅ Evidencia: las filas manuales llevan «(verificado manualmente)» o «Verificado también manualmente en el navegador»; las filas con `jsdom` están cubiertas por la nota; la fila de adaptabilidad quedó verificada por el usuario.
- [x] 3.2 Confirmar que la fila de teclado y anchos de 320/1280 px quedó actualizada con el resultado verificado por el usuario, sin agregar resultados no ejecutados. ✅ Confirmado por el usuario.
- [x] 3.3 Ejecutar `openspec validate "ej6-persistencia-verificacion-documentacion" --strict` y verificar que el change sea válido. ✅ Evidencia: `Change 'ej6-persistencia-verificacion-documentacion' is valid`.
- [x] 3.4 Revisar `git diff -- README.md` y `git status` para confirmar que solo se modificó el README y los artefactos del change, sin cambios en `js/`, `css/` ni `index.html`, y que se conservaron los saltos de línea CRLF. ✅ Evidencia: `git status` solo muestra `README.md` y `tasks.md`; 0 cambios en `js/`, `css/` e `index.html`; README y tasks con CRLF y 0 LF sueltos.

## Workflow follow-up

- El archive queda fuera de este change: no archivar ni sincronizar specs hasta que el usuario lo solicite en una nueva petición.
