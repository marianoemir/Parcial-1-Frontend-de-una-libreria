# Proposal

## Why

El Ejercicio 6 ya está implementado en `main` (commit `eb29f55`, mergeado en `c1afe3b` mediante el PR #2), pero sus requisitos no están reflejados en las specs de OpenSpec y el README de entrega todavía tiene huecos de documentación y afirmaciones de prueba que no distinguen entre verificaciones ejecutadas y pendientes. Sin este change, la funcionalidad existente queda sin trazabilidad y la entrega puede declarar como aprobado algo que no se ejecutó.

Este change se crea **a posteriori**: documenta la persistencia y la verificación ya realizadas, y planifica únicamente las correcciones de documentación. No se vuelve a implementar el Ejercicio 6.

## What Changes

- Agregar la capability `ej6-persistencia-documentacion` con requisitos sobre:
  - persistencia de libros, clientes y ventas en `localStorage`;
  - carga inicial de ejemplos y recuperación al reabrir sin duplicar;
  - tolerancia a un `localStorage` ilegible;
  - contenido mínimo y verificable del README de entrega;
  - prohibición de declarar como aprobada una prueba que no se ejecutó.
- Corregir el README de entrega:
  - verificar el título y corregir la «í» solo si el archivo presenta `librer-a` (la lectura actual muestra `# Parcial 1: Frontend de una Librería` con UTF-8 correcto);
  - aclarar que el proyecto no usa imágenes;
  - aclarar que las pruebas con `jsdom` se ejecutaron localmente y no forman parte del repositorio, sin cambiar ningún resultado;
  - mantener como pendiente la fila de teclado y anchos de 320/1280 px hasta que el usuario la complete con lo observado en el navegador.
- Actualizar la capability existente `ej4-altas-libros-clientes` para eliminar la contradicción entre su requisito «Sin dependencias externas ni persistencia» y la persistencia incorporada por el Ejercicio 6.
- Verificar por lectura de código el cumplimiento de los requisitos de persistencia. Las comprobaciones de navegador quedan **PENDIENTES** de confirmación del usuario.

## Capabilities

### New Capabilities

- `ej6-persistencia-documentacion`: persistencia local de libros, clientes y ventas, y documentación de entrega verificable (README completo y resultados de pruebas declarados con honestidad).

### Modified Capabilities

- `ej4-altas-libros-clientes`: se actualiza el requisito «Sin dependencias externas ni persistencia» para reflejar que las altas siguen sin depender de `fetch` ni de un servidor, pero ahora persisten en `localStorage` cuando está disponible, conforme al Ejercicio 6.

## Impact

- Documentación: `README.md` (título, nota sobre imágenes y aclaración de las pruebas con `jsdom`).
- Especificaciones: nueva `openspec/specs/ej6-persistencia-documentacion/spec.md` y delta de `openspec/specs/ej4-altas-libros-clientes/spec.md` al archivar el change.
- Código: no se prevén cambios en `js/app.js`, `index.html` ni `css/`; la persistencia ya está implementada y se verifica por lectura.
- Pruebas: las verificaciones de persistencia y de documentación son por lectura y revisión; las comprobaciones manuales de navegador (teclado y anchos de 320/1280 px) quedan pendientes de ejecución por el usuario.
- Riesgo principal: dar por aprobada una prueba no ejecutada o introducir en el README un resultado observado que no se haya comprobado.
