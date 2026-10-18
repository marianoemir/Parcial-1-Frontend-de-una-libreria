// Test runner for ej3-catalogo-js-filtro
// Carga dom-stub, luego app.js, luego tests.js, y ejecuta todas las pruebas

require("C:/Users/andre/Documents/GitHub/Parcial-1-Frontend-de-una-libreria/test/dom-stub.js");

// En Node.js, `window` no existe por defecto. Lo apuntamos a globalThis para que
// app.js pueda usar window.libros, window.filtrarPorTitulo, etc. (igual que en el navegador).
global.window = globalThis;

const fs = require("fs");

// Leer y ejecutar app.js en el contexto global (con document y window disponibles)
const appCode = fs.readFileSync("C:/Users/andre/Documents/GitHub/Parcial-1-Frontend-de-una-libreria/js/app.js", "utf8");
const appWrapper = new Function("document", "Element", "window", appCode);
appWrapper(document, Element, window);

// Simular DOMContentLoaded para que inicializar() registre los listeners del buscador
if (typeof window.inicializar === "function") {
  window.inicializar();
}

// Los tests definen funciones en el scope global
const testCode = fs.readFileSync("C:/Users/andre/Documents/GitHub/Parcial-1-Frontend-de-una-libreria/test/tests.js", "utf8");
const testWrapper = new Function("document", "Element", "console", "window", testCode);
testWrapper(document, Element, console, window);

// Ejecutar todas las pruebas
const allPassed = global.runAllTests ? global.runAllTests() : false;

process.exit(allPassed ? 0 : 1);
