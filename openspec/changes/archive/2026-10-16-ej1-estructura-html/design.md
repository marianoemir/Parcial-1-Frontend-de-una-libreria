# Design

## Context

Ver `proposal.md` (Why). Estado actual: repo con solo `README.md` y `docs/Consigna Primer Parcial.pdf`; no hay HTML. Restricciones: solo HTML nativo en este change; sin CSS (Ej.2) ni JS funcional (Ej.3–5); sin librerías, frameworks ni CDNs; apertura directa de `index.html` sin npm ni servidor.

## Goals / Non-Goals

**Goals:**

- Definir una estructura de navegación única y verificable a simple vista.
- Fijar el esqueleto de las 5 vistas con todos los bloques y estados que exige el Ej.1.
- Dejar `id` y contenedores estables para que Ej.3–5 solo agreguen render y eventos.

**Non-Goals:**

- Diseño visual, colores, tipografía, Flexbox/Grid (Ejercicio 2).
- Arrays de datos, render de catálogo y filtro por título (Ejercicio 3).
- Validaciones de alta, `preventDefault` y actualización sin recarga (Ejercicio 4).
- Cálculos de subtotal/total, precio histórico e historial inmutable (Ejercicio 5).
- `localStorage`, README de casos manuales y entrega (Ejercicio 6).

## Decisions

- **Una sola página con 5 secciones (`#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`) enlazadas desde el `nav`, con `index.html` como entrada.** Alternativa considerada: 5 archivos HTML separados. Se elige SPA por secciones porque reduce duplicación de `header`/`nav`/`footer`, mantiene un único `id` por contenedor JS y la consigna lo permite («varias páginas o secciones de una misma página»). Si el docente prefiere multi-página, cada `section` se extrae a su archivo sin cambiar `id` ni requisitos.
- **Catálogo con tarjetas (`article`) para libros y tablas para Libros/Clientes/Historial/Ventas.** Alternativa: todo con tablas. Se elige mixto porque la ficha de libro lleva 6 campos descriptivos (título, ISBN, editorial, género, autores, precio) y admite el caso «Sin clasificar»; las tablas quedan para datos tabulares con `th`.
- **Mensajes como regiones visibles con texto (`role="status"`/`role="alert"`) en lugar de solo color.** Exigido por la consigna y anticipa el criterio de accesibilidad del Ej.2; además cada formulario reserva su zona de errores/éxito cerca de los campos.
- **Nombres de `id` por vista y rol (`catalogo-lista`, `libros-form`, `ventas-renglones`, etc.).** Alternativa: `id` genéricos. Se eligen prefijados por vista para que los scripts de Ej.3–5 no colisionen y los escenarios de validación puedan referenciarlos.

## Risks / Trade-offs

- [Riesgo] Confundir este change con implementación → Mitigación: `tasks.md` solo crea y verifica estructura/estados; prohíbe agregar CSS de identidad y JS funcional.
- [Riesgo] Elegir multi-página cuando el corrector espera secciones (o viceversa) → Mitigación: la spec exige navegación clara en ambas variantes y los `id` se conservan al migrar.
- [Riesgo] Olvidar el estado «Sin clasificar» o algún mensaje de vacío → Mitigación: checklist de verificación manual en `tasks.md` que recorre cada escenario de las specs.
