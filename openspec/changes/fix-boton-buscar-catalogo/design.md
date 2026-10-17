# Design

## Context

El catálogo se genera desde `window.libros` y el filtrado se centraliza en `filtrarPorTitulo(texto)` y `renderCatalogo(librosAFiltrar)`, que ya manejan búsqueda vacía, coincidencias parciales, mayúsculas/minúsculas, trim y mensaje de sin resultados. El problema está únicamente en el cableado de eventos: el botón usa `onclick` inline y `btnBuscar.onclick` en JS, mientras el campo usa `addEventListener("input")`. La DOM stub de pruebas registra listeners en `eventListeners[type]`, por lo que solo `addEventListener` los hace visibles a los tests.

## Goals / Non-Goals

**Goals:**
- Consolidar el disparo de la búsqueda en `addEventListener`.
- Eliminar el `onclick` inline del botón en `index.html`.
- Mantener el listener `input` existente.
- Prevenir la recarga al presionar Enter en el campo de búsqueda.
- Reutilizar `ejecutarBusqueda()` como único punto de filtrado/render/mensaje.

**Non-Goals:**
- No cambiar el algoritmo de filtrado ni el renderizado de fichas.
- No modificar el modelo de datos ni otras secciones (libros, clientes, etc.).
- No agregar frameworks ni cambiar la estructura HTML más allá del botón.

## Decisions

- **Registrar el clic con `addEventListener`**: en lugar de `btnBuscar.onclick = ...`, usar `btnBuscar.addEventListener("click", handler)` que llame a `ejecutarBusqueda()` y prevenga el comportamiento por defecto. Alternativa descartada: mantener `onclick` y además `addEventListener` (duplicaría disparos y no satisface la verificación de ausencia de `onclick`).
- **Prevenir submit del formulario**: registrar `submit` en `#catalogo-buscador-form` con `preventDefault()` y llamar a `ejecutarBusqueda()`, cubriendo Enter sin depender del botón. Alternativa descartada: cambiar el botón a `type="submit"` (alteraría semántica y podría recargar si no se previene).
- **Mantener `input`**: el listener `input` sigue activo según la spec; el botón solo ofrece disparo explícito adicional. No se elimina el filtrado automático por tecla.
- **Limpieza de atributo inline**: editar `index.html` para quitar `onclick="..."` del botón, dejando `type="button"`.

## Risks / Trade-offs

- [Riesgo] Doble disparo si botón y submit ambos ejecutan búsqueda → Mitigación: el botón es `type="button"`, por lo que no dispara `submit`; solo Enter dispara `submit`. Ambos llaman la misma función idempotente.
- [Riesgo] Tests que verifican `onclick` property → Mitigación: se elimina la asignación por propiedad; los tests esperan `addEventListener`.
- [Riesgo] DOM stub no emula `event.preventDefault` en todos los casos → Mitigación: el handler recibe el evento y llama `preventDefault` si existe.

## Migration Plan

1. Editar `index.html` quitando el `onclick` inline.
2. Editar `js/app.js`: reemplazar `btnBuscar.onclick = ...` por `btnBuscar.addEventListener("click", ...)`.
3. Agregar listener `submit` al formulario de búsqueda con `preventDefault()` y `ejecutarBusqueda()`.
4. Mantener registro del listener `input` en `inicializar`.
5. Ejecutar `node test/run-tests.js` y verificar que todos los tests pasen.

## Open Questions

- Ninguna.
