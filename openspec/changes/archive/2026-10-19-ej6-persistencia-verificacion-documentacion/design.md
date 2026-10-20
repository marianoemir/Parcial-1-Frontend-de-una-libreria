# Design

## Context

Ver `proposal.md` para la motivación. El Ejercicio 6 ya está implementado en `main` (commit `eb29f55`, mergeado en `c1afe3b`); este change no reimplementa la funcionalidad. La persistencia vive al final de `js/app.js` (constantes en 998-1000, guardado en 1002-1010, lectura defensiva en 1013-1023, carga inicial en 1027-1037 y listener final en 1068-1079) y se invoca al agregar un libro (535), al agregar un cliente (597) y al confirmar una venta (862).

Restricciones: JavaScript vanilla sin `npm`, `localStorage` como único almacenamiento, claves ya usadas por la aplicación, y una entrega que no puede declarar pruebas no ejecutadas. El README actual ya contiene la mayor parte de la documentación; faltan la aclaración sobre imágenes, la distinción entre pruebas locales y pruebas incluidas en el repositorio, y la verificación del título.

## Goals / Non-Goals

**Goals:**

- Dejar una spec que describa la persistencia ya implementada y su comportamiento ante datos ilegibles.
- Corregir el README para que la entrega sea verificable y honesta sobre lo ejecutado.
- Resolver la contradicción entre la spec del Ej.4 y la persistencia incorporada por el Ej.6.
- Verificar por lectura de código cada requisito de persistencia antes de marcarlo como cumplido.

**Non-Goals:**

- Cambiar el modelo de datos, las claves de `localStorage` o la lógica de ventas.
- Agregar pruebas automatizadas al repositorio o instalar un runner.
- Ejecutar las comprobaciones manuales de teclado y anchos de 320/1280 px; quedan pendientes de confirmación del usuario.
- Renombrar el repositorio remoto de GitHub.

## Decisions

### 1. Documentar la implementación existente sin tocar código

La persistencia ya cumple el flujo pedido: los arrays de ejemplo se definen al inicio de `js/app.js`; `cargarDesdeLocalStorage` reemplaza `window.libros` y `window.clientes` solo cuando encuentra arrays válidos y asigna `window.historialVentas`; luego `guardarEnLocalStorage` escribe las tres claves. Las altas y la confirmación de venta vuelven a guardar. No hay razón para modificar código ni para agregar una capa de almacenamiento.

Alternativa considerada: reimplementar la persistencia con un módulo separado. Se descarta porque el Ejercicio ya está entregado y el change es de verificación y documentación.

### 2. Contrato de almacenamiento estable

Se mantienen las claves `libreria_libros`, `libreria_clientes` y `libreria_ventas`, con arrays serializados como JSON. El guardado es de tipo write-through: cada mutación relevante guarda las tres claves, no solo la modificada. Esto simplifica la coherencia y conserva el comportamiento actual.

Alternativa considerada: guardar solo la clave afectada. Se descarta para no cambiar el código existente ni introducir estados parciales distintos de los ya probados.

### 3. Lectura defensiva acotada a JSON inválido o valores no-array

`leerArrayGuardado` devuelve `null` si la clave no existe, si `JSON.parse` falla o si el valor no es un array. `cargarDesdeLocalStorage` usa los ejemplos para libros y clientes, y una lista vacía para ventas, y luego guarda. `guardarEnLocalStorage` captura errores de escritura. Así, un `localStorage` ilegible no interrumpe la carga.

La validación no inspecciona la forma interna de cada elemento de un array válido. Un array con objetos incompletos podría fallar al renderizar; ese caso queda fuera del alcance de «ilegible» y se registra como límite conocido, no como comportamiento garantizado.

Alternativa considerada: validar cada libro, cliente y venta al cargar. Se descarta porque excede el Ejercicio 6 y requeriría definir un esquema de validación que la consigna no pide.

### 4. Correcciones del README

- **Título:** la línea 1 del README ya es `# Parcial 1: Frontend de una Librería`; los bytes UTF-8 de la «í» son `C3 AD`. No existe la cadena `librer-a` en los archivos versionados. La forma sin tilde que coincide con el nombre del repositorio remoto es `Parcial-1-Frontend-de-una-libreria`, que no se edita desde el README. Decisión: verificar el título y corregirlo solo si en el momento de aplicar apareciera el defecto; no inventar un cambio sobre un texto ya correcto.
- **Imágenes:** se agrega una línea explícita de que el proyecto no usa imágenes. Se verificó que no hay archivos de imagen ni referencias `img`, `url(...)` o URLs en `index.html`, `css/` ni `js/`. Ubicación propuesta: una línea bajo las instrucciones de apertura, para que se lea antes de la navegación.
- **Pruebas con `jsdom`:** se agrega una nota introductoria a la tabla de resultados que aclare que las pruebas automatizadas se ejecutaron localmente y no forman parte del repositorio. No se modifica ningún resultado declarado. La nota cubre la fila 62 («Aprobado (ejecutado en pruebas automatizadas con jsdom)») y las demás filas que mencionan `jsdom` (63-65).
- **Fila pendiente:** la fila 66 de teclado y anchos de 320/1280 px se mantiene como «Pendiente de verificar manualmente». El usuario la completará con lo observado en el navegador; no se copian resultados de otras filas.

Alternativa considerada: cambiar cada celda «Aprobado (jsdom)» por una redacción larga. Se descarta porque una nota única evita repetir la aclaración y conserva intactos los resultados.

### 5. Reconciliar la spec del Ej.4 con una delta MODIFIED

La spec `ej4-altas-libros-clientes` afirma que el sistema no usa `localStorage` y que los datos se pierden al recargar. Eso dejó de ser cierto con el Ej.6. Se incluye una delta MODIFIED que conserva el encabezado existente (para que el archivo de spec coincida al archivar) y actualiza el texto: no se usa `fetch` ni servidor, se persiste en `localStorage` cuando está disponible y, si no lo está, las altas siguen en memoria. Se agrega un escenario para el caso sin `localStorage`.

Alternativa considerada: dejar la spec del Ej.4 como histórica y limitar el cambio a la capability nueva. Se descarta porque las specs son acumulativas y quedarían dos requisitos contradictorios sobre el mismo sistema.

### 6. Verificación por lectura y revisión documental

Cada requisito de persistencia se contrasta con las líneas citadas de `js/app.js`; cada requisito del README se contrasta con el texto de `README.md`. No se agregan pruebas al repositorio. Las comprobaciones que dependen del navegador se marcan como pendientes y no se convierten en afirmaciones de aprobación.

## Risks / Trade-offs

- **El README declara «Aprobado» en filas basadas en `jsdom` sin que esas pruebas estén en el repositorio** → la nota aclaratoria indica que se ejecutaron localmente y no se incluyen; no se cambia el resultado.
- **El título señalado por el usuario no aparece en el README** → se documenta la constatación y se limita la tarea a verificar; si el defecto está en el nombre del repositorio remoto, queda fuera del alcance editable.
- **Un array JSON válido con elementos malformados puede romper el render** → se declara como límite del alcance «ilegible»; la spec solo garantiza JSON inválido o valores no-array.
- **`localStorage` puede fallar por cuota o modo privado** → el guardado captura el error y la interfaz sigue en memoria; el README documenta los límites entre navegadores, perfiles y equipos.
- **Los datos corruptos se sobrescriben con los ejemplos al recargar** → es el comportamiento actual; evita que la página quede inutilizable, aunque no recupera la información dañada.
- **Saltos de línea:** el repositorio usa CRLF; los artefactos nuevos deben conservarlo para no generar diffs espurios.

## Migration Plan

No hay migración de datos: las claves y el formato JSON no cambian. El change es documental y de specs. Al archivar, la capability nueva se copia a `openspec/specs/ej6-persistencia-documentacion/spec.md` y la delta MODIFIED actualiza el requisito correspondiente de `ej4-altas-libros-clientes`. Rollback: revertir los cambios del README y no archivar el change; el código y los datos guardados permanecen compatibles.
