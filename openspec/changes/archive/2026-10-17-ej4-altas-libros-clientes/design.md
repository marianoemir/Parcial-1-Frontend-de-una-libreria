# Design

## Context

El Ej.3 ya implementó en js/app.js el modelo de datos local (window.libros, window.editoriales, window.generos, window.autores, window.clientes con ids estables), el render del catálogo y el filtro por título. En index.html ya existen los formularios y listados de Libros y Clientas como maqueta: #libros-form, #clientes-form, botones #libros-agregar-boton y #clientes-agregar-boton, tablas #libros-tabla/#clientes-tabla con tbody #libros-lista/#clientes-lista, y párrafos de estado #libros-error/#libros-exito y #clientes-error/#clientes-exito. Los <select> traen opciones hardcodeadas (editoriales ed1/ed2, géneros gen1/gen2 + "Sin clasificar", autores au1/au2, clientes cl1/cl2). Limitaciones del proyecto: vanilla JS, sin fetch, sin servidor, sin localStorage (Ej.6), datos en memoria mientras dura la sesión, textContent para insertar datos (no innerHTML), no cambiar ids existentes de index.html, artifacts en español con headings y SHALL/MUST en inglés.

## Goals / Non-Goals

**Goals:**

- Alta de libro válida (título, ISBN, precio, editorial, género opcional, uno o más autores) con todas las validaciones del Ej.4.
- Alta de cliente válida (nombre completo, email único) con todas las validaciones del Ej.4.
- preventDefault en ambos envíos; errores cerca del formulario; solo agregar si todo pasa.
- Tras alta exitosa: actualizar listados, catálogo y opciones de <select> relacionados sin recargar.
- Reutilizar el modelo de datos del Ej.3 y los ids estables (liN, clN).

**Non-Goals:**

- Editar o eliminar registros (no exigido por el Ej.4).
- Persistencia con localStorage (responsabilidad del Ej.6).
- Cambiar ids, estructura ni presentación de index.html.
- Fetch, servidor o llamadas de red de cualquier tipo.

## Decisions

### Reusar formularios y contenedores existentes de index.html

No se agregan nuevos elementos ni ids a index.html. Se escucha el envío de #libros-form y #clientes-form (submit) y se invoca preventDefault. Los mensajes de error se escriben en #libros-error y #clientes-error (role="alert", ya existentes); los de éxito en #libros-exito y #clientes-exito.

Alternativa considerada: agregar nuevos contenedores de error. Rechazada porque cambiaría el HTML del Ej.1 y no es necesario.

### Funciones de validación puras sobre el modelo local

validarLibro(datos) y validarCliente(datos) devuelven una lista de mensajes de error. Cada requisito del Ej.4 es una comprobación independiente: no vacíos, ISBN único (normalizado sin espacios ni guiones), precio > 0, editorial y autores existentes, al menos un autor, género opcional pero existente si se asigna; nombre y email no vacíos, email con formato válido, email único (trim + case-insensitive).

Alternativa considerada: validar campo a campo en el DOM. Rechazada porque separar validación de la interacción facilita pruebas y reuso.

### Normalización de ISBN

Se comparan ISBN quitando espacios y guiones de ambos lados (candidato y los ya guardados en window.libros). El requisito menciona "sin dígito de control": como los ISBN del modelo local se guardan tal cual se escriben, la comparación se hace sobre la cadena normalizada (sin espacios ni guiones) de ambos lados.

### Generación dinámica de opciones de <select>

Tras cada alta, se reconstruyen las opciones de editorial, género y autores en #libros-form y de cliente en #ventas-cliente a partir de window.editoriales, window.generos, window.autores y window.clientes, creando elementos con document.createElement y textContent, sin tocar la opción placeholder ni los valores existentes (ed1, ed2, gen1, gen2, au1, au2, cl1, cl2).

Alternativa considerada: innerHTML con plantillas. Rechazada por la restricción de textContent del Ej.3/Ej.4.

### Identificadores estables para nuevos registros

Nuevo libro: id "li" + (máximo numérico de ids li* existentes + 1). Nuevo cliente: id "cl" + (máximo + 1). Los ids existentes del modelo (li1..li7, cl1..cl3) no se tocan.

### Render de listados y catálogo

renderLibrosTabla() pinta #libros-lista (o #libros-vacio si vacío) con textContent por celda; renderClientesTabla() hace lo mismo con #clientes-lista / #clientes-vacio. El catálogo existente (#catalogo-lista vía window.renderCatalogo) se vuelve a renderizar tras cada alta de libro para que el libro nuevo aparezca de inmediato.

Alternativa considerada: insertar solo la fila nueva. Rechazada porque render completo es más simple, consistente con el Ej.3 y el volumen de datos es pequeño.

## Risks / Trade-offs

- [Datos se pierden al recargar] → No es problema de este change: la persistencia es alcance del Ej.6 (localStorage).
- [Validación de email simple] → Un patrón de expresiones regulares básico cubre el formato válido requerido; casos edge de RFC 5322 quedan fuera de scope del Ej.4.
- [Selector múltiple de autores] → En algunos navegadores el envío de <select multiple> requiere atención para leer todos los valores seleccionados; se leen con .options filtrando selected.
- [Opciones de <select> hardcodeadas en el HTML inicial] → Al agregar un libro/cliente nuevo, las opciones se regeneran desde JS; si el usuario recarga, vuelve al estado hardcodeado inicial (aceptable sin localStorage).

## Open Questions

Ninguna que afecte specs, enfoque o desglose de tareas.
