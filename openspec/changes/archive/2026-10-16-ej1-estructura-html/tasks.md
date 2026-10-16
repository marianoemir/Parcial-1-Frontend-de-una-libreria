# Tasks

## 1. Estructura base y navegación

- [x] 1.1 Crear `index.html` con `header`, `nav` (5 enlaces), `main` con 5 secciones y `footer`, y verificar que abre con doble clic sin servidor. Evidencia: `index.html` (header/nav#nav-principal/main#contenido-principal/footer, sections #catalogo #libros #clientes #ventas #historial); verificación estática sin navegador + comprobación manual de apertura con doble clic confirmada por el usuario (APROBADO).
- [x] 1.2 Verificar navegación clara: desde cada vista se llega a las otras 4 y la vista actual queda identificada. Evidencia: 5 enlaces `nav-catalogo…nav-historial` con `href="#…"`, `aria-current="page"` en `nav-catalogo`. Decisión R-01: página única por secciones según `design.md` (no 5 archivos HTML).

## 2. Vistas Catálogo, Libros y Clientes

- [x] 2.1 Estructurar Catálogo (título de la librería, buscador con `label`, contenedor de fichas con los 6 campos y caso «Sin clasificar») y verificar cada bloque por inspección. Evidencia: `#catalogo-titulo`, form `#catalogo-buscador-form` (label→`catalogo-busqueda` + botón `#catalogo-buscar-boton`), `#catalogo-lista` con 2 `article` de 6 campos, «Sin clasificar» en 2.º ejemplo.
- [x] 2.2 Estructurar Libros (formulario de alta con `label` por campo + listado en tabla con `th`) y verificar etiquetas, botones y encabezados. Evidencia: form `#libros-form` (ids `libro-titulo/isbn/precio/editorial/genero/autores`, género con opción «Sin clasificar», autores `multiple`), botón `#libros-agregar-boton`, tabla `#libros-tabla` (6 `th scope="col"`, tbody `#libros-lista`).
- [x] 2.3 Estructurar Clientes (formulario nombre completo + email con `label` + listado en tabla con `th`) y verificar etiquetas, botones y encabezados. Evidencia: form `#clientes-form` (`cliente-nombre`, `cliente-email` type=email, sin apellido separado), botón `#clientes-agregar-boton`, tabla `#clientes-tabla` (2 `th scope="col"`, tbody `#clientes-lista`).

## 3. Vistas Ventas, Historial, estados y ganchos JS

- [x] 3.1 Estructurar Ventas (selector de cliente, zona de renglones, resumen con total) e Historial (tabla id/fecha/cliente/total + acceso a detalle) y verificar bloques y `th`. Evidencia: `#venta-cliente`, `#ventas-renglon-form` (`renglon-libro`, `renglon-cantidad`, botón `#ventas-agregar-renglon-boton`), tabla `#ventas-renglones-tabla` (5 `th scope="col"`, tbody `#ventas-renglones`, botón `#ventas-quitar-renglon-1`), resumen `#ventas-resumen` con `#ventas-total`, botón `#ventas-confirmar-boton`; tabla `#historial-tabla` (5 `th`, tbody `#historial-lista`) + `details#historial-detalle-001` con tabla de renglones (4 `th`).
- [x] 3.2 Reservar mensajes de lista vacía, búsqueda sin resultados y éxito/error con texto (no solo color) y verificar que cada estado tiene su región en el HTML. Evidencia: 9 `role="status"` + 3 `role="alert"`, 12 regiones con `hidden` (solo visibles las de estado inicial), todas con texto explícito; «Maqueta: sin funcionamiento todavía» visible en las 5 secciones.
- [x] 3.3 Asignar `id` estables a formularios, campos, contenedores y mensajes, y verificar por inspección que existen todos los ganchos que usarán los Ej.3–5 sin agregar lógica JS ni CSS de identidad. Evidencia: 74 `id` kebab-case prefijados por vista; 6 botones todos `type="button"`; `css/styles.css` y `js/app.js` existen con solo un comentario; `index.html` enlaza ambos; grep confirma sin lógica JS ni URLs externas (menciones de `preventDefault`/`localStorage` solo en comentarios `<!-- Pendiente -->`).
