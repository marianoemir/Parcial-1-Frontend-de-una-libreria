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
// Ejecutar todas las pruebas
// ============================================================

function runAllTests() {
  testDataModel();
  testFiltrarPorTitulo();
  testRenderCatalogo();
  testHTMLSinFichasHardcodeadas();
  testEventos();
  testMensajesEstado();

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
