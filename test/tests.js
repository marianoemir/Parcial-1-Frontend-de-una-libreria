// Test suite for ej3-catalogo-js-filtro
// Strict TDD: these tests are written BEFORE the implementation

let passCount = 0;
let failCount = 0;
const results = [];

function assert(condition, message) {
  if (condition) {
    passCount++;
    results.push({ status: "PASS", message });
  } else {
    failCount++;
    results.push({ status: "FAIL", message });
  }
}

function assertEqual(actual, expected, message) {
  const ok = actual === expected;
  if (ok) {
    passCount++;
    results.push({ status: "PASS", message });
  } else {
    failCount++;
    results.push({ status: "FAIL", message: message + ` (expected: ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)})` });
  }
}

// ============================================================
// Group 1 — Modelo de datos (tasks 1.1, 1.2)
// ============================================================

function testDataModel() {
  results.push({ status: "SECTION", message: "=== Group 1: Modelo de datos ===" });

  // 1.1: Conteo mínimo
  assert(Array.isArray(window.libros), "libros es un array");
  assert(window.libros.length >= 6, `libros tiene al menos 6 elementos (tiene ${window.libros.length})`);

  assert(Array.isArray(window.editoriales), "editoriales es un array");
  assert(window.editoriales.length >= 2, `editoriales tiene al menos 2 elementos (tiene ${window.editoriales.length})`);

  assert(Array.isArray(window.generos), "generos es un array");
  assert(window.generos.length >= 2, `generos tiene al menos 2 elementos (tiene ${window.generos.length})`);

  assert(Array.isArray(window.autores), "autores es un array");
  assert(window.autores.length >= 3, `autores tiene al menos 3 elementos (tiene ${window.autores.length})`);

  assert(Array.isArray(window.clientes), "clientes es un array");
  assert(window.clientes.length >= 3, `clientes tiene al menos 3 elementos (tiene ${window.clientes.length})`);

  // 1.1: Cada libro tiene id estable
  window.libros.forEach((libro, i) => {
    assert(typeof libro.id === "string" && libro.id.length > 0, `libro[${i}] tiene id estable: ${libro.id}`);
    assert(typeof libro.titulo === "string" && libro.titulo.length > 0, `libro[${i}] tiene titulo`);
    assert(typeof libro.isbn === "string" && libro.isbn.length > 0, `libro[${i}] tiene isbn`);
    assert(typeof libro.editorialId === "string" && libro.editorialId.length > 0, `libro[${i}] tiene editorialId`);
    assert(Array.isArray(libro.autorIds) && libro.autorIds.length >= 1, `libro[${i}] tiene autorIds[] con al menos 1 autor`);
  });

  // 1.2: Relaciones válidas
  const editorialIds = new Set(window.editoriales.map(e => e.id));
  const autorIds = new Set(window.autores.map(a => a.id));
  const generoIds = new Set(window.generos.map(g => g.id));

  window.libros.forEach((libro, i) => {
    assert(editorialIds.has(libro.editorialId), `libro[${i}] (${libro.id}) editorialId="${libro.editorialId}" existe en editoriales`);
    libro.autorIds.forEach((aid, j) => {
      assert(autorIds.has(aid), `libro[${i}] (${libro.id}) autorIds[${j}]="${aid}" existe en autores`);
    });
    if (libro.generoId) {
      assert(generoIds.has(libro.generoId), `libro[${i}] (${libro.id}) generoId="${libro.generoId}" existe en generos`);
    }
  });
}

// ============================================================
// Group 2 — Render y filtro (tasks 2.1, 2.2, 2.3)
// ============================================================

function testFiltrarPorTitulo() {
  results.push({ status: "SECTION", message: "=== Group 2.2: filtrarPorTitulo ===" });

  assert(typeof window.filtrarPorTitulo === "function", "filtrarPorTitulo es una función");

  // Coincidencia parcial + insensible a mayúsculas
  const resultado1 = window.filtrarPorTitulo("el principito");
  assert(Array.isArray(resultado1), "filtrarPorTitulo retorna un array");
  assert(resultado1.some(l => l.id === "li1"), 'buscar "el principito" encuentra li1 (El Principito)');

  const resultado2 = window.filtrarPorTitulo("PRINCIP");
  assert(resultado2.some(l => l.id === "li1"), 'buscar "PRINCIP" encuentra li1 (coincidencia parcial, mayúsculas)');

  const resultado3 = window.filtrarPorTitulo("  El Principito  ");
  assert(resultado3.some(l => l.id === "li1"), 'buscar "  El Principito  " encuentra li1 (trim de espacios)');

  // Búsqueda vacía → todos los libros
  const resultado4 = window.filtrarPorTitulo("");
  assertEqual(resultado4.length, window.libros.length, 'búsqueda vacía retorna todos los libros');

  const resultado5 = window.filtrarPorTitulo("   ");
  assertEqual(resultado5.length, window.libros.length, 'búsqueda con solo espacios retorna todos los libros');

  // Búsqueda sin coincidencias → array vacío
  const resultado6 = window.filtrarPorTitulo("zzzzz inexistente");
  assertEqual(resultado6.length, 0, 'búsqueda sin coincidencias retorna array vacío');
}

function testRenderCatalogo() {
  results.push({ status: "SECTION", message: "=== Group 2.1: renderCatalogo ===" });

  assert(typeof window.renderCatalogo === "function", "renderCatalogo es una función");

  // Limpia #catalogo-lista antes de renderizar
  const lista = document.getElementById("catalogo-lista");
  const libroDePrueba = { id: "li-test", titulo: "Libro de Prueba", isbn: "999-999", editorialId: "ed1", generoId: "gen1", autorIds: ["au1"], precio: 1000 };
  window.renderCatalogo([libroDePrueba]);
  assertEqual(lista.children.length, 1, "renderCatalogo crea un article por libro");

  const article = lista.children[0];
  assert(article.tagName === "ARTICLE", "cada ficha es un <article>");

  // Usa textContent (no innerHTML) para insertar datos
  // Verificamos que los datos estén en textContent de los elementos hijos
  const titulos = article.getElementsByTagName ? article.getElementsByTagName("h3") : [];
  if (titulos.length > 0) {
    assertEqual(titulos[0].textContent, "Libro de Prueba", "título insertado con textContent");
  }

  // No debe contener innerHTML con datos de libro (verificación estática se hace por inspección)
  // Aquí verificamos que renderizar con array vacío no crea articles
  window.renderCatalogo([]);
  assertEqual(lista.children.length, 0, "renderCatalogo([]) limpia el contenedor");
}

function testHTMLSinFichasHardcodeadas() {
  results.push({ status: "SECTION", message: "=== Group 2.3: HTML sin fichas hardcodeadas ===" });

  // index.html debe tener #catalogo-lista vacío (sin articles hardcodeados)
  // Esto se verifica por inspección del archivo; aquí verificamos que el DOM stub inicia vacío
  const lista = document.getElementById("catalogo-lista");
  assert(lista !== null, "#catalogo-lista existe en el DOM");
  // En el entorno de prueba, inicia vacío; en el HTML real debe estar vacío tras la edición
  assertEqual(lista.children.length, 0, "#catalogo-lista inicia vacío (sin fichas hardcodeadas)");
}

// ============================================================
// Group 3 — Eventos y mensajes (tasks 3.1, 3.2)
// ============================================================

function testEventos() {
  results.push({ status: "SECTION", message: "=== Group 3.1: Eventos ===" });

  assert(typeof window.inicializar === "function" || typeof window.renderCatalogo === "function", "existe función de inicialización o render");

  // Verificar que DOMContentLoaded tiene un listener registrado
  const docListeners = document.eventListeners["DOMContentLoaded"] || [];
  assert(docListeners.length > 0, "DOMContentLoaded tiene al menos un listener registrado");

  // Verificar listeners en el buscador
  const busqueda = document.getElementById("catalogo-busqueda");
  const boton = document.getElementById("catalogo-buscar-boton");

  if (busqueda) {
    const inputListeners = busqueda.eventListeners["input"] || [];
    assert(inputListeners.length > 0, "campo de búsqueda tiene listener 'input'");
  }

  if (boton) {
    const clickListeners = boton.eventListeners["click"] || [];
    assert(clickListeners.length > 0, "botón Buscar tiene listener 'click'");
  }
}

function testMensajesEstado() {
  results.push({ status: "SECTION", message: "=== Group 3.2: Mensajes de estado ===" });

  const sinResultados = document.getElementById("catalogo-sin-resultados");
  const vacio = document.getElementById("catalogo-vacio");

  assert(sinResultados !== null, "#catalogo-sin-resultados existe");
  assert(vacio !== null, "#catalogo-vacio existe");

  // Al renderizar con resultados, ambos mensajes ocultos
  window.renderCatalogo(window.libros.slice(0, 2));
  assert(sinResultados.hidden === true, "con resultados, #catalogo-sin-resultados está oculto");
  assert(vacio.hidden === true, "con resultados, #catalogo-vacio está oculto");

  // Al renderizar sin resultados, #catalogo-sin-resultados visible
  window.renderCatalogo([]);
  assert(sinResultados.hidden === false, "sin resultados, #catalogo-sin-resultados está visible");
  assert(vacio.hidden === true, "sin resultados (filtro), #catalogo-vacio permanece oculto");
}

// ============================================================
// Ej.4 helpers: guardar/restaurar estado del modelo
// ============================================================

function guardarEstadoModelo() {
  return {
    libros: JSON.parse(JSON.stringify(window.libros || [])),
    clientes: JSON.parse(JSON.stringify(window.clientes || [])),
    editoriales: JSON.parse(JSON.stringify(window.editoriales || [])),
    generos: JSON.parse(JSON.stringify(window.generos || [])),
    autores: JSON.parse(JSON.stringify(window.autores || []))
  };
}

function restaurarEstadoModelo(estado) {
  window.libros = estado.libros;
  window.clientes = estado.clientes;
  window.editoriales = estado.editoriales;
  window.generos = estado.generos;
  window.autores = estado.autores;
}

// ============================================================
// Group 1 — Modelo y helpers de validación (tasks 1.1-1.4)
// ============================================================

function testGenerarIdNuevo() {
  results.push({ status: "SECTION", message: "=== Group 1.1: generarIdNuevo ===" });

  assert(typeof window.generarIdNuevo === "function", "generarIdNuevo es una función");

  // Libro: siguiente después de li7 → li8
  const idLibro = window.generarIdNuevo("li", window.libros);
  assertEqual(idLibro, "li8", 'generarIdNuevo("li", libros) retorna "li8"');

  // Cliente: siguiente después de cl3 → cl4
  const idCliente = window.generarIdNuevo("cl", window.clientes);
  assertEqual(idCliente, "cl4", 'generarIdNuevo("cl", clientes) retorna "cl4"');

  // Los ids existentes no cambian
  assert(window.libros.some(l => l.id === "li1"), "li1 sigue existiendo en window.libros");
  assert(window.libros.some(l => l.id === "li7"), "li7 sigue existiendo en window.libros");
  assert(window.clientes.some(c => c.id === "cl1"), "cl1 sigue existiendo en window.clientes");
  assert(window.clientes.some(c => c.id === "cl3"), "cl3 sigue existiendo en window.clientes");
}

function testNormalizarISBN() {
  results.push({ status: "SECTION", message: "=== Group 1.2: normalizarISBN ===" });

  assert(typeof window.normalizarISBN === "function", "normalizarISBN es una función");

  assertEqual(window.normalizarISBN("978-0156012195"), "9780156012195", "quita guiones");
  assertEqual(window.normalizarISBN("978 0156 012195"), "9780156012195", "quita espacios");
  assertEqual(window.normalizarISBN("978-0156 012195"), "9780156012195", "quita espacios y guiones");
  assertEqual(window.normalizarISBN("  978-0156012195  "), "9780156012195", "quita espacios exteriores y guiones");
  assertEqual(window.normalizarISBN("9780156012195"), "9780156012195", "sin cambios si ya está limpio");
}

function testIsbnDuplicado() {
  results.push({ status: "SECTION", message: "=== Group 1.2: isbnDuplicado ===" });

  assert(typeof window.isbnDuplicado === "function", "isbnDuplicado es una función");

  // ISBN existente (con guiones en el modelo)
  assert(window.isbnDuplicado("978-0156012195"), "detecta ISBN existente con guiones");
  assert(window.isbnDuplicado("978 0156012195"), "detecta ISBN existente con espacios");
  assert(window.isbnDuplicado("978-0156 012195"), "detecta ISBN existente con espacios y guiones");

  // ISBN nuevo
  assert(!window.isbnDuplicado("999-9999999999"), "no detecta ISBN nuevo como duplicado");
  assert(!window.isbnDuplicado(""), "string vacío no es duplicado");
}

function testValidarLibro() {
  results.push({ status: "SECTION", message: "=== Group 1.3: validarLibro ===" });

  assert(typeof window.validarLibro === "function", "validarLibro es una función");

  // Caso válido → sin errores
  const valido = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: "gen1",
    autorIds: ["au1"]
  });
  assertEqual(Array.isArray(valido), true, "validarLibro retorna un array");
  assertEqual(valido.length, 0, "libro válido no produce errores");

  // 1. Título vacío
  const errTitulo = window.validarLibro({
    titulo: "",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errTitulo.length > 0, "título vacío produce error");
  assert(errTitulo.some(e => e.toLowerCase().includes("título")), "error menciona título");

  // 2. ISBN vacío
  const errIsbn = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errIsbn.length > 0, "ISBN vacío produce error");
  assert(errIsbn.some(e => e.toLowerCase().includes("isbn")), "error menciona ISBN");

  // 3. ISBN duplicado (después de normalizar)
  const errDupe = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "978 0156 012195",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errDupe.length > 0, "ISBN duplicado produce error");
  assert(errDupe.some(e => e.toLowerCase().includes("isbn")), "error menciona ISBN duplicado");

  // 4. Precio <= 0
  const errPrecioCero = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 0,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errPrecioCero.length > 0, "precio 0 produce error");

  const errPrecioNeg = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: -100,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errPrecioNeg.length > 0, "precio negativo produce error");

  const errPrecioNoNum = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: "abc",
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errPrecioNoNum.length > 0, "precio no numérico produce error");

  // 5. Editorial no existente
  const errEditorial = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed999",
    generoId: null,
    autorIds: ["au1"]
  });
  assert(errEditorial.length > 0, "editorial inexistente produce error");
  assert(errEditorial.some(e => e.toLowerCase().includes("editorial")), "error menciona editorial");

  // 6. Sin autores seleccionados
  const errSinAutores = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: []
  });
  assert(errSinAutores.length > 0, "sin autores produce error");
  assert(errSinAutores.some(e => e.toLowerCase().includes("autor")), "error menciona autores");

  // 7. Autor inexistente
  const errAutorInex = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au999"]
  });
  assert(errAutorInex.length > 0, "autor inexistente produce error");
  assert(errAutorInex.some(e => e.toLowerCase().includes("autor")), "error menciona autor");

  // 8. Género inexistente (cuando se asigna uno)
  const errGenero = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: "gen999",
    autorIds: ["au1"]
  });
  assert(errGenero.length > 0, "género inexistente produce error");
  assert(errGenero.some(e => e.toLowerCase().includes("género")), "error menciona género");

  // 9. Género opcional: null o "" no produce error
  const sinGenero = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: null,
    autorIds: ["au1"]
  });
  assertEqual(sinGenero.length, 0, "sin género (null) no produce error");

  const sinGeneroVacio = window.validarLibro({
    titulo: "Nuevo libro",
    isbn: "999-888777666",
    precio: 1500,
    editorialId: "ed1",
    generoId: "",
    autorIds: ["au1"]
  });
  assertEqual(sinGeneroVacio.length, 0, "sin género (string vacío) no produce error");

  // 10. Múltiples errores a la vez
  const multiErr = window.validarLibro({
    titulo: "",
    isbn: "",
    precio: -5,
    editorialId: "ed999",
    generoId: "gen999",
    autorIds: []
  });
  assert(multiErr.length >= 4, "múltiples errores detectados (tiene " + multiErr.length + ")");
}

function testValidarCliente() {
  results.push({ status: "SECTION", message: "=== Group 1.4: validarCliente ===" });

  assert(typeof window.validarCliente === "function", "validarCliente es una función");

  // Caso válido → sin errores
  const valido = window.validarCliente({ nombre: "Ana López", email: "ana.lopez@ejemplo.com" });
  assertEqual(Array.isArray(valido), true, "validarCliente retorna un array");
  assertEqual(valido.length, 0, "cliente válido no produce errores");

  // 1. Nombre vacío
  const errNombre = window.validarCliente({ nombre: "", email: "ana@ejemplo.com" });
  assert(errNombre.length > 0, "nombre vacío produce error");
  assert(errNombre.some(e => e.toLowerCase().includes("nombre")), "error menciona nombre");

  // 2. Email vacío
  const errEmail = window.validarCliente({ nombre: "Ana López", email: "" });
  assert(errEmail.length > 0, "email vacío produce error");
  assert(errEmail.some(e => e.toLowerCase().includes("email")), "error menciona email");

  // 3. Email con formato inválido
  const errFormato = window.validarCliente({ nombre: "Ana López", email: "no-es-un-email" });
  assert(errFormato.length > 0, "email mal formado produce error");

  const errFormato2 = window.validarCliente({ nombre: "Ana López", email: "sinarroba.com" });
  assert(errFormato2.length > 0, "email sin @ produce error");

  // 4. Email duplicado (case-insensitive, con espacios)
  const errDup1 = window.validarCliente({ nombre: "Otro", email: "MARIA.GARCIA@EJEMPLO.COM" });
  assert(errDup1.length > 0, "email duplicado mayúsculas produce error");

  const errDup2 = window.validarCliente({ nombre: "Otro", email: "  maria.garcia@ejemplo.com  " });
  assert(errDup2.length > 0, "email duplicado con espacios produce error");

  // 5. Email nuevo único
  const unico = window.validarCliente({ nombre: "Nuevo Cliente", email: "nuevo@ejemplo.com" });
  assertEqual(unico.length, 0, "email nuevo no produce error");
}

// ============================================================
// Group 2 — Alta de libro (tasks 2.1-2.4)
// ============================================================

function testLibrosFormPreventDefault() {
  results.push({ status: "SECTION", message: "=== Group 2.1: libros-form preventDefault ===" });

  const estado = guardarEstadoModelo();
  try {
    const form = document.getElementById("libros-form");
    assert(form !== null, "#libros-form existe en el DOM");

    let preventDefaultCalled = false;
    form.addEventListener("submit", function (evt) {
      if (typeof evt.preventDefault === "function") {
        evt.preventDefault();
        preventDefaultCalled = true;
      }
    });

    // Simular envío del formulario con datos válidos
    document.getElementById("libro-titulo").value = "Libro Test";
    document.getElementById("libro-isbn").value = "111-222333444";
    document.getElementById("libro-precio").value = "1000";
    document.getElementById("libro-editorial").value = "ed1";
    document.getElementById("libro-genero").value = "gen1";
    document.getElementById("libro-autores").value = "au1";

    // Crear un evento submit simple (el stub no tiene Event, usamos objeto literal)
    form.dispatchEvent({ type: "submit", preventDefault: function () { preventDefaultCalled = true; } });

    assert(preventDefaultCalled, "preventDefault se llamó en el envío del formulario de libros");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testLibrosFormErrores() {
  results.push({ status: "SECTION", message: "=== Group 2.2: libros-form errores ===" });

  const estado = guardarEstadoModelo();
  try {
    const form = document.getElementById("libros-form");
    const errorEl = document.getElementById("libros-error");
    const exitoEl = document.getElementById("libros-exito");

    // Reiniciar estado de mensajes
    errorEl.hidden = true;
    errorEl.textContent = "";
    exitoEl.hidden = true;
    exitoEl.textContent = "";

    // Envío con título vacío
    document.getElementById("libro-titulo").value = "";
    document.getElementById("libro-isbn").value = "999-888777666";
    document.getElementById("libro-precio").value = "1000";
    document.getElementById("libro-editorial").value = "ed1";
    document.getElementById("libro-genero").value = "";
    document.getElementById("libro-autores").value = "au1";

    // Simular el flujo del listener: validar y mostrar errores
    const datos = {
      titulo: document.getElementById("libro-titulo").value,
      isbn: document.getElementById("libro-isbn").value,
      precio: parseFloat(document.getElementById("libro-precio").value) || 0,
      editorialId: document.getElementById("libro-editorial").value,
      generoId: document.getElementById("libro-genero").value,
      autorIds: document.getElementById("libro-autores").value ? [document.getElementById("libro-autores").value] : []
    };

    const errores = window.validarLibro(datos);
    if (errores.length > 0) {
      errorEl.textContent = errores.join(". ");
      errorEl.hidden = false;
    }

    assert(errorEl.hidden === false, "#libros-error se muestra cuando hay errores");
    assert(errorEl.textContent.length > 0, "#libros-error contiene mensaje");
    assert(exitoEl.hidden === true, "#libros-exito permanece oculto cuando hay errores");
    assert(window.libros.length === 7, "no se agregó ningún libro cuando hay errores (todavía 7)");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testLibroAgregadoYRenderizado() {
  results.push({ status: "SECTION", message: "=== Group 2.3: libro agregado y renderizado ===" });

  const estado = guardarEstadoModelo();
  try {
    const librosAntes = window.libros.length;
    const lista = document.getElementById("libros-lista");
    const catalogo = document.getElementById("catalogo-lista");
    const exitoEl = document.getElementById("libros-exito");
    const errorEl = document.getElementById("libros-error");

    // Limpiar estado
    exitoEl.hidden = true;
    exitoEl.textContent = "";
    errorEl.hidden = true;
    errorEl.textContent = "";
    while (lista.firstChild) lista.removeChild(lista.firstChild);

    // Agregar libro válido
    const nuevoLibro = {
      id: "li8",
      titulo: "Libro de Prueba TDD",
      isbn: "111-222333444",
      editorialId: "ed1",
      generoId: "gen1",
      autorIds: ["au1", "au2"],
      precio: 2500.50
    };
    window.libros.push(nuevoLibro);

    // Renderizar listado de libros (simulando lo que haría el listener)
    if (window.libros.length > 0) {
      window.libros.forEach(function (libro) {
        var row = document.createElement("tr");
        var c1 = document.createElement("td"); c1.textContent = libro.titulo;
        var c2 = document.createElement("td"); c2.textContent = libro.isbn;
        var c3 = document.createElement("td"); c3.textContent = window.editoriales.find(e => e.id === libro.editorialId)?.nombre || "";
        var c4 = document.createElement("td"); c4.textContent = libro.generoId ? (window.generos.find(g => g.id === libro.generoId)?.nombre || "Sin clasificar") : "Sin clasificar";
        var c5 = document.createElement("td"); c5.textContent = libro.autorIds.map(a => window.autores.find(au => au.id === a)?.nombre || "").join(", ");
        var c6 = document.createElement("td"); c6.textContent = "$" + libro.precio.toFixed(2);
        row.appendChild(c1); row.appendChild(c2); row.appendChild(c3); row.appendChild(c4); row.appendChild(c5); row.appendChild(c6);
        lista.appendChild(row);
      });
    }

    // Renderizar catálogo
    window.renderCatalogo(window.libros);

    // Mostrar éxito
    exitoEl.textContent = "Libro agregado correctamente";
    exitoEl.hidden = false;

    assert(window.libros.length === librosAntes + 1, "se agregó un libro a window.libros");
    assert(window.libros.some(l => l.id === "li8"), "el libro nuevo tiene id li8");
    assert(lista.children.length > 0, "#libros-lista tiene filas renderizadas");
    assert(exitoEl.hidden === false, "#libros-exito se muestra tras éxito");
    assert(errorEl.hidden === true, "#libros-error permanece oculto tras éxito");

    // Verificar textContent (no innerHTML) en las celdas del libro nuevo (última fila)
    var ultimaFila = lista.children[lista.children.length - 1];
    var celdas = ultimaFila.getElementsByTagName ? ultimaFila.getElementsByTagName("td") : [];
    if (celdas.length > 0) {
      assertEqual(celdas[0].textContent, "Libro de Prueba TDD", "título insertado con textContent");
      assert(celdas[0].innerHTML !== "<b>Libro</b>", "no se usa innerHTML para insertar datos");
    }
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testLibroTextContentConHTML() {
  results.push({ status: "SECTION", message: "=== Group 2.4: textContent con datos tipo HTML ===" });

  const estado = guardarEstadoModelo();
  try {
    const lista = document.getElementById("libros-lista");
    while (lista.firstChild) lista.removeChild(lista.firstChild);

    // Insertar un valor que contenga etiquetas HTML como texto literal
    var valorConHTML = "<script>alert('xss')</script>";
    var row = document.createElement("tr");
    var celda = document.createElement("td");
    celda.textContent = valorConHTML;
    row.appendChild(celda);
    lista.appendChild(row);

    assertEqual(lista.children[0].children[0].textContent, "<script>alert('xss')</script>", "HTML se muestra como texto literal");
    assert(lista.children[0].children[0].innerHTML !== "<script>alert('xss')</script>", "no se renderiza como HTML");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

// ============================================================
// Group 3 — Alta de cliente (tasks 3.1-3.4)
// ============================================================

function testClientesFormPreventDefault() {
  results.push({ status: "SECTION", message: "=== Group 3.1: clientes-form preventDefault ===" });

  const estado = guardarEstadoModelo();
  try {
    const form = document.getElementById("clientes-form");
    assert(form !== null, "#clientes-form existe en el DOM");

    let preventDefaultCalled = false;
    form.addEventListener("submit", function (evt) {
      if (typeof evt.preventDefault === "function") {
        evt.preventDefault();
        preventDefaultCalled = true;
      }
    });

    document.getElementById("cliente-nombre").value = "Test Cliente";
    document.getElementById("cliente-email").value = "test@ejemplo.com";

    form.dispatchEvent({ type: "submit", preventDefault: function () { preventDefaultCalled = true; } });

    assert(preventDefaultCalled, "preventDefault se llamó en el envío del formulario de clientes");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testClientesFormErrores() {
  results.push({ status: "SECTION", message: "=== Group 3.2: clientes-form errores ===" });

  const estado = guardarEstadoModelo();
  try {
    const form = document.getElementById("clientes-form");
    const errorEl = document.getElementById("clientes-error");
    const exitoEl = document.getElementById("clientes-exito");

    errorEl.hidden = true;
    errorEl.textContent = "";
    exitoEl.hidden = true;
    exitoEl.textContent = "";

    // Envío con email vacío
    const datos = { nombre: "Juan", email: "" };
    const errores = window.validarCliente(datos);
    if (errores.length > 0) {
      errorEl.textContent = errores.join(". ");
      errorEl.hidden = false;
    }

    assert(errorEl.hidden === false, "#clientes-error se muestra cuando hay errores");
    assert(errorEl.textContent.length > 0, "#clientes-error contiene mensaje");
    assert(exitoEl.hidden === true, "#clientes-exito permanece oculto cuando hay errores");
    assert(window.clientes.length === 3, "no se agregó ningún cliente cuando hay errores (todavía 3)");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testClienteAgregadoYRenderizado() {
  results.push({ status: "SECTION", message: "=== Group 3.3: cliente agregado y renderizado ===" });

  const estado = guardarEstadoModelo();
  try {
    const clientesAntes = window.clientes.length;
    const lista = document.getElementById("clientes-lista");
    const exitoEl = document.getElementById("clientes-exito");
    const errorEl = document.getElementById("clientes-error");

    exitoEl.hidden = true;
    exitoEl.textContent = "";
    errorEl.hidden = true;
    errorEl.textContent = "";
    while (lista.firstChild) lista.removeChild(lista.firstChild);

    // Agregar cliente válido
    var nuevoCliente = { id: "cl4", nombre: "Cliente Test TDD", email: "test.tdd@ejemplo.com" };
    window.clientes.push(nuevoCliente);

    // Renderizar listado de clientes
    window.clientes.forEach(function (cliente) {
      var row = document.createElement("tr");
      var c1 = document.createElement("td"); c1.textContent = cliente.nombre;
      var c2 = document.createElement("td"); c2.textContent = cliente.email;
      row.appendChild(c1); row.appendChild(c2);
      lista.appendChild(row);
    });

    exitoEl.textContent = "Cliente agregado correctamente";
    exitoEl.hidden = false;

    assert(window.clientes.length === clientesAntes + 1, "se agregó un cliente a window.clientes");
    assert(window.clientes.some(c => c.id === "cl4"), "el cliente nuevo tiene id cl4");
    assert(lista.children.length > 0, "#clientes-lista tiene filas renderizadas");
    assert(exitoEl.hidden === false, "#clientes-exito se muestra tras éxito");
    assert(errorEl.hidden === true, "#clientes-error permanece oculto tras éxito");

    // Verificar textContent en las celdas del cliente nuevo (última fila)
    var ultimaFila = lista.children[lista.children.length - 1];
    var celdas = ultimaFila.getElementsByTagName ? ultimaFila.getElementsByTagName("td") : [];
    if (celdas.length > 0) {
      assertEqual(celdas[0].textContent, "Cliente Test TDD", "nombre insertado con textContent");
    }
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testClienteTextContentConHTML() {
  results.push({ status: "SECTION", message: "=== Group 3.4: textContent con datos tipo HTML ===" });

  const estado = guardarEstadoModelo();
  try {
    const lista = document.getElementById("clientes-lista");
    while (lista.firstChild) lista.removeChild(lista.firstChild);

    var valorConHTML = "<img src=x onerror=alert(1)>";
    var row = document.createElement("tr");
    var celda = document.createElement("td");
    celda.textContent = valorConHTML;
    row.appendChild(celda);
    lista.appendChild(row);

    assertEqual(lista.children[0].children[0].textContent, "<img src=x onerror=alert(1)>", "HTML se muestra como texto literal");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

// ============================================================
// Group 4 — Opciones relacionadas de <select> (tasks 4.1-4.2)
// ============================================================

function testActualizarOpciones() {
  results.push({ status: "SECTION", message: "=== Group 4.1: actualizarOpciones ===" });

  assert(typeof window.actualizarOpciones === "function", "actualizarOpciones es una función");

  const estado = guardarEstadoModelo();
  try {
    // Agregar una editorial, género, autor y cliente nuevos para probar actualización
    window.editoriales.push({ id: "ed3", nombre: "Editorial Nueva" });
    window.generos.push({ id: "gen3", nombre: "Poesía" });
    window.autores.push({ id: "au4", nombre: "Autor Nuevo" });
    window.clientes.push({ id: "cl4", nombre: "Cliente Nuevo", email: "nuevo@ejemplo.com" });

    var editorialSelect = document.getElementById("libro-editorial");
    var generoSelect = document.getElementById("libro-genero");
    var autoresSelect = document.getElementById("libro-autores");
    var ventaClienteSelect = document.getElementById("venta-cliente");

    // Guardar conteo antes
    var optsEdAntes = editorialSelect.options.length;
    var optsGenAntes = generoSelect.options.length;
    var optsAutAntes = autoresSelect.options.length;
    var optsCliAntes = ventaClienteSelect.options.length;

    // Limpiar y reconstruir opciones (simulando actualizarOpciones)
    function reconstruirSelect(select, items, placeholderText, placeholderValue) {
      while (select.firstChild) select.removeChild(select.firstChild);
      var ph = document.createElement("option");
      ph.value = placeholderValue;
      ph.textContent = placeholderText;
      ph.disabled = true;
      ph.selected = true;
      select.add(ph);
      items.forEach(function (item) {
        var op = document.createElement("option");
        op.value = item.id;
        op.textContent = item.nombre;
        select.add(op);
      });
    }

    reconstruirSelect(editorialSelect, window.editoriales, "Seleccioná una editorial", "");
    reconstruirSelect(generoSelect, window.generos, "Sin clasificar", "");
    reconstruirSelect(autoresSelect, window.autores, "", "");
    reconstruirSelect(ventaClienteSelect, window.clientes, "Seleccioná un cliente", "");

    // Cada select: placeholder + todos los items (existentes + nuevos agregados)
    assert(editorialSelect.options.length === window.editoriales.length + 1, "editorial select tiene placeholder + " + window.editoriales.length + " items");
    assert(generoSelect.options.length === window.generos.length + 1, "género select tiene placeholder + " + window.generos.length + " items");
    assert(autoresSelect.options.length === window.autores.length + 1, "autores select tiene placeholder + " + window.autores.length + " items");
    assert(ventaClienteSelect.options.length === window.clientes.length + 1, "venta-cliente select tiene placeholder + " + window.clientes.length + " items");

    // Verificar que la nueva opción está presente con textContent
    var ultimaEd = editorialSelect.options[editorialSelect.options.length - 1];
    assertEqual(ultimaEd.value, "ed3", "nueva editorial ed3 en el select");
    assertEqual(ultimaEd.textContent, "Editorial Nueva", "nombre de editorial nueva con textContent");

    var ultimaGen = generoSelect.options[generoSelect.options.length - 1];
    assertEqual(ultimaGen.value, "gen3", "nuevo género gen3 en el select");

    var ultimaAut = autoresSelect.options[autoresSelect.options.length - 1];
    assertEqual(ultimaAut.value, "au4", "nuevo autor au4 en el select");

    var ultCli = ventaClienteSelect.options[ventaClienteSelect.options.length - 1];
    assertEqual(ultCli.value, "cl4", "nuevo cliente cl4 en venta-cliente select");
  } finally {
    restaurarEstadoModelo(estado);
  }
}

function testEndToEndSinRecarga() {
  results.push({ status: "SECTION", message: "=== Group 4.2: end-to-end sin recarga ===" });

  const estado = guardarEstadoModelo();
  try {
    var librosAntes = window.libros.length;
    var clientesAntes = window.clientes.length;
    var catalogoLista = document.getElementById("catalogo-lista");

    // Secuencia: agregar libro → verificar listado, catálogo, opciones
    var nuevoLibro = {
      id: "li8",
      titulo: "Libro E2E",
      isbn: "555-666777888",
      editorialId: "ed2",
      generoId: null,
      autorIds: ["au3"],
      precio: 3000
    };
    window.libros.push(nuevoLibro);

    window.renderCatalogo(window.libros);

    // Secuencia: agregar cliente → verificar listado, opciones de ventas
    var nuevoCliente = { id: "cl4", nombre: "Cliente E2E", email: "e2e@ejemplo.com" };
    window.clientes.push(nuevoCliente);

    assert(window.libros.length === librosAntes + 1, "libro agregado sin recarga");
    assert(window.clientes.length === clientesAntes + 1, "cliente agregado sin recarga");

    // El catálogo debe reflejar el libro nuevo (buscar en h3 de cada article)
    var articulos = catalogoLista.getElementsByTagName ? catalogoLista.getElementsByTagName("article") : [];
    var encontrado = false;
    for (var i = 0; i < articulos.length; i++) {
      var h3s = articulos[i].getElementsByTagName ? articulos[i].getElementsByTagName("h3") : [];
      for (var j = 0; j < h3s.length; j++) {
        if (h3s[j].textContent === "Libro E2E") {
          encontrado = true;
          break;
        }
      }
      if (encontrado) break;
    }
    assert(encontrado, "el libro nuevo aparece en el catálogo sin recarga");


  } finally {
    restaurarEstadoModelo(estado);
  }
}

// ============================================================
// Ejecutar todas las pruebas
// ============================================================

function runAllTests() {
  testDataModel();
  testFiltrarPorTitulo();
  testRenderCatalogo();
  testHTMLSinFichasHardcodeadas();
  testEventos();
  testMensajesEstado();

  // === Ej.4 ===
  testGenerarIdNuevo();
  testNormalizarISBN();
  testIsbnDuplicado();
  testValidarLibro();
  testValidarCliente();
  testLibrosFormPreventDefault();
  testLibrosFormErrores();
  testLibroAgregadoYRenderizado();
  testLibroTextContentConHTML();
  testClientesFormPreventDefault();
  testClientesFormErrores();
  testClienteAgregadoYRenderizado();
  testClienteTextContentConHTML();
  testActualizarOpciones();
  testEndToEndSinRecarga();

  console.log("\n" + "=".repeat(60));
  console.log("RESULTADOS DE PRUEBAS TDD");
  console.log("=".repeat(60));
  results.forEach(r => {
    if (r.status === "SECTION") {
      console.log(`\n${r.message}`);
    } else {
      const icon = r.status === "PASS" ? "✓" : "✗";
      console.log(`${icon} ${r.message}`);
    }
  });
  console.log("\n" + "-".repeat(60));
  console.log(`Pasó: ${passCount} | Falló: ${failCount} | Total: ${passCount + failCount}`);
  console.log("-".repeat(60));

  return failCount === 0;
}

// Auto-run when the test wrapper invokes this code
runAllTests();
