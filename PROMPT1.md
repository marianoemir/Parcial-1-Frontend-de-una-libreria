# PROMPT1 — Copiar y pegar al orquestador (Ejercicio 1)

> Copiá el bloque de abajo tal cual al orquestador active-stack.

```text
Trabajemos con SDD (framework active-stack) sobre @docs/Consigna Primer Parcial.pdf.

Change activo: `ej1-estructura-html` (ya creado con proposal, specs, design y tasks).
Leé su estado con `openspec status --change "ej1-estructura-html" --json` y sus artefactos en `openspec/changes/ej1-estructura-html/`.

Objetivo: implementá UNICAMENTE el Ejercicio 1 (1. Estructura y pantallas HTML, 20 pts) siguiendo esos artefactos al pie de la letra. Cumplí todas estas consignas del Ej.1 y nada más:

1. `index.html` como entrada; varias páginas o secciones de una misma página, con navegación clara entre las 5 vistas.
2. Catálogo: título de la librería, buscador por título y listado; cada libro con título, ISBN, editorial, género, autores y precio; sin género => «Sin clasificar».
3. Libros: formulario de alta + listado. Clientes: formulario de alta + listado. Ventas: selección de cliente + renglones + resumen. Historial: listado + acceso a detalles.
4. Etiquetas semánticas (header, nav, main, section, footer, table); cada campo con label asociada; botones con texto de acción; tablas con th.
5. Mensajes para listas vacías, búsquedas sin resultados y operaciones correctas/rechazadas (con texto, no solo color).
6. Estructura con los campos, contenedores e id que usará JavaScript (Ej.3-5), SIN implementar lógica JS.

Restricciones duras: solo HTML nativo (+ esqueleto listo para CSS/JS futuro). PROHIBIDO en este paso: identidad visual CSS (Ej.2), datos/filtro JS (Ej.3), validaciones y preventDefault (Ej.4), cálculos de venta (Ej.5), localStorage y README de casos (Ej.6), librerías/frameworks/CDNs, API/BD/servidor, login real.

Verificación: `index.html` abre con doble clic; las 5 vistas son alcanzables y la actual es identificable; inspección confirma semántica, labels, th, mensajes e id estables. Si algo del Ej.1 falta, completalo; si algo es de Ej.2-6, NO lo implementes, anotalo como pendiente.
```
