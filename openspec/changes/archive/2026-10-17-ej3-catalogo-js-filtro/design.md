# Design

## Context

Ver `proposal.md` (Why) para la motivación. Estado actual: `js/app.js` vacío (solo comentario "Pendiente Ej.3-6"); `index.html` tiene el catálogo hardcodeado con 2 fichas en `#catalogo-lista` y los textos "Maqueta: sin funcionamiento todavía" de cada sección; ya existen el buscador (`#catalogo-buscador-form`, `#catalogo-busqueda`, `#catalogo-buscar-boton`) y los mensajes de estado (`#catalogo-sin-resultados`, `#catalogo-vacio`). Restricciones duras: vanilla JavaScript (sin fetch, sin build step, sin servidor, apertura con doble clic), no cambiar ningún `id` existente del HTML, insertar datos de usuario con `textContent` (no `innerHTML`), no agregar ABML de editoriales/géneros/autores, todos los artifacts en español con headings y palabras clave SHALL/MUST en inglés.

## Goals / Non-Goals

**Goals:**

- Definir el modelo de datos en JS (arrays y objetos con `id` estables para libros, editoriales, géneros, autores y clientes).
- Definir la función de render del catálogo a partir del array de libros (`textContent`, no `innerHTML`).
- Definir la función de filtro por título (minúsculas, coincidencia parcial, `trim()`).
- Definir la escucha de eventos del buscador y el alternar de mensajes de vacío / sin resultados.
- Dejar `#catalogo-lista` como contenedor vacío que JS llena (quitar las 2 fichas hardcodeadas del HTML).

**Non-Goals:**

- ABML de editoriales, géneros ni autores (no se requiere en este Ej.3).
- `fetch`, servidor, `localStorage` ni persistencia (Ej.6).
- Validaciones de alta y `preventDefault` (Ej.4), cálculos de venta e historial inmutable (Ej.5).
- Cambios de CSS, semántica HTML o `id` existentes (pertenecen al Ej.1/Ej.2).

## Decisions

- **Modelo de datos: arrays globales con `id` de string estable.** `libros`, `editoriales`, `generos`, `autores`, `clientes` definidos en `js/app.js`. Cada libro lleva `editorialId` (referencia a editorial existente) y `autorIds[]` (uno o más autores existentes); `generoId` es opcional y, si se asigna, referencia un género existente. Alternativa: `id` numéricos autoincrementales. Se eligen strings estables ("li1", "ed1", "au1", "gen1", "cl1") porque coinciden con los `value` ya usados en los `select` del HTML del Ej.1 y no dependen del orden de inserción.
- **Render dinámico: `renderCatalogo(librosAFiltrar)` limpia `#catalogo-lista` y crea un `<article>` por libro.** Cada campo (título, ISBN, editorial, género, autores, precio) se escribe con `textContent`; el género faltante se muestra como "Sin clasificar". Si el array filtrado está vacío, se muestra `#catalogo-vacio` y se oculta `#catalogo-sin-resultados` (y viceversa). Alternativa: template literal con `innerHTML`. Se descarta por la regla de seguridad de insertar datos como texto plano.
- **Filtro: `filtrarPorTitulo(texto)` aplica `texto.trim().toLowerCase()` y `libro.titulo.toLowerCase().includes(texto)`.** Si el texto está vacío (tras `trim()`), retorna todos los libros. Alternativa: expresión regular. Se descarta por complejidad innecesaria; `includes` cubre coincidencias parciales y `toLowerCase` la insensibilidad a mayúsculas.
- **Eventos: `DOMContentLoaded` inicializa (render inicial del catálogo completo + listener del buscador); el botón "Buscar" y el evento `input` del campo disparan `filtrarPorTitulo` + `renderCatalogo`.** Separación de responsabilidades: una función para datos (filtro), una para DOM (render), una para coordinar (evento). No se usa delegación de eventos compleja ni módulos ES6 (sin build step).
- **HTML: en `apply` se quitan las 2 fichas hardcodeadas de `#catalogo-lista`, dejándolo vacío para que JS lo llene; ningún `id`, clase ni texto de sección cambia.** Los mensajes `#catalogo-sin-resultados` y `#catalogo-vacio` ya existen con `hidden` y se reutilizan.

## Risks / Trade-offs

- [Riesgo] Usar `innerHTML` en lugar de `textContent` al insertar datos de usuario → posible inyección HTML. Mitigación: regla explícita en `tasks.md` de usar solo `textContent` y verificación por inspección de `js/app.js`.
- [Riesgo] Búsqueda vacía no muestra todo el catálogo (filtro retorna [] en vez de todos). Mitigación: condición explícita `if (!texto) return todos` en `filtrarPorTitulo` y escenario de verificación en `tasks.md`.
- [Riesgo] IDs de editorial/autor/género rotos (referencia a entidad inexistente). Mitigación: revisar en `tasks.md` que cada `editorialId` y cada `autorId` de los libros existe en su array respectivo.
- [Trade-off] Arrays globales vs. módulo ES6: se priorizan globales por la restricción de sin build step y apertura con doble clic.

## Migration Plan

Sin despliegue: el `apply` edita archivos locales. Orden: (1) escribir `js/app.js` con modelo de datos, `renderCatalogo`, `filtrarPorTitulo` y listeners; (2) en `index.html` quitar las 2 fichas hardcodeadas de `#catalogo-lista` dejando el contenedor vacío; (3) reabrir con doble clic y comprobar render inicial, filtro, búsqueda vacía y sin coincidencias; (4) verificar `textContent` (sin `innerHTML`) por inspección. Rollback: `git checkout -- js/app.js index.html`. Las comprobaciones manuales las confirma el usuario.
