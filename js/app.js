// ============================================================
// js/app.js — Ejercicio 3: Catálogo con datos locales y filtro
// ============================================================

// --- Modelo de datos (identificadores estables) ---

window.editoriales = [
  { id: "ed1", nombre: "Editorial Ejemplo Uno" },
  { id: "ed2", nombre: "Editorial Ejemplo Dos" }
];

window.generos = [
  { id: "gen1", nombre: "Fábula" },
  { id: "gen2", nombre: "Cuento" }
];

window.autores = [
  { id: "au1", nombre: "Antoine de Saint-Exupéry" },
  { id: "au2", nombre: "Autora Ejemplo" },
  { id: "au3", nombre: "Autor Ejemplo Tres" }
];

window.clientes = [
  { id: "cl1", nombre: "María García" },
  { id: "cl2", nombre: "Juan Pérez" },
  { id: "cl3", nombre: "Cliente Ejemplo Tres" }
];

window.libros = [
  {
    id: "li1",
    titulo: "El Principito",
    isbn: "978-0156012195",
    editorialId: "ed1",
    generoId: "gen1",
    autorIds: ["au1"],
    precio: 5000.00
  },
  {
    id: "li2",
    titulo: "Cuentos reunidos",
    isbn: "978-0000000002",
    editorialId: "ed2",
    generoId: "gen2",
    autorIds: ["au2"],
    precio: 3200.50
  },
  {
    id: "li3",
    titulo: "Cien años de soledad",
    isbn: "978-8437604947",
    editorialId: "ed1",
    generoId: "gen1",
    autorIds: ["au3"],
    precio: 7500.00
  },
  {
    id: "li4",
    titulo: "Rayuela",
    isbn: "978-9500732959",
    editorialId: "ed2",
    generoId: null,
    autorIds: ["au1", "au3"],
    precio: 6800.00
  },
  {
    id: "li5",
    titulo: "El aleph",
    isbn: "978-9500733444",
    editorialId: "ed1",
    generoId: "gen2",
    autorIds: ["au1", "au2"],
    precio: 4200.00
  },
  {
    id: "li6",
    titulo: "Don Quijote",
    isbn: "978-8420637665",
    editorialId: "ed2",
    generoId: "gen1",
    autorIds: ["au3"],
    precio: 8900.00
  },
  {
    id: "li7",
    titulo: "La ciudad y los perros",
    isbn: "978-8420644748",
    editorialId: "ed1",
    generoId: "gen2",
    autorIds: ["au2"],
    precio: 5500.00
  }
];

// --- Filtro por título ---

window.filtrarPorTitulo = function (texto) {
  var termino = texto.trim().toLowerCase();
  if (termino === "") {
    return window.libros.slice();
  }
  return window.libros.filter(function (libro) {
    return libro.titulo.toLowerCase().includes(termino);
  });
};

// --- Render del catálogo ---

function nombreEditorial(editorialId) {
  var e = window.editoriales.find(function (ed) { return ed.id === editorialId; });
  return e ? e.nombre : "";
}

function nombreGenero(generoId) {
  if (!generoId) return "Sin clasificar";
  var g = window.generos.find(function (ge) { return ge.id === generoId; });
  return g ? g.nombre : "Sin clasificar";
}

function nombresAutores(autorIds) {
  return autorIds.map(function (aid) {
    var a = window.autores.find(function (au) { return au.id === aid; });
    return a ? a.nombre : "";
  }).join(", ");
}

window.renderCatalogo = function (librosAFiltrar) {
  var lista = document.getElementById("catalogo-lista");
  // Limpiar contenedor
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Mensajes de estado
  var sinResultados = document.getElementById("catalogo-sin-resultados");
  var vacio = document.getElementById("catalogo-vacio");

  if (librosAFiltrar.length === 0) {
    if (sinResultados) sinResultados.hidden = false;
    if (vacio) vacio.hidden = true;
  } else {
    if (sinResultados) sinResultados.hidden = true;
    if (vacio) vacio.hidden = true;
  }

  librosAFiltrar.forEach(function (libro) {
    var article = document.createElement("article");
    article.className = "tarjeta";

    var h3 = document.createElement("h3");
    h3.textContent = libro.titulo;
    article.appendChild(h3);

    var pIsbn = document.createElement("p");
    pIsbn.textContent = "ISBN: " + libro.isbn;
    article.appendChild(pIsbn);

    var pEditorial = document.createElement("p");
    pEditorial.textContent = "Editorial: " + nombreEditorial(libro.editorialId);
    article.appendChild(pEditorial);

    var pGenero = document.createElement("p");
    pGenero.textContent = "Género: " + nombreGenero(libro.generoId);
    article.appendChild(pGenero);

    var pAutores = document.createElement("p");
    pAutores.textContent = "Autores: " + nombresAutores(libro.autorIds);
    article.appendChild(pAutores);

    var pPrecio = document.createElement("p");
    pPrecio.textContent = "Precio: $" + libro.precio.toFixed(2);
    article.appendChild(pPrecio);

    lista.appendChild(article);
  });
};

// --- Eventos del buscador ---

function ejecutarBusqueda() {
  var campo = document.getElementById("catalogo-busqueda");
  var texto = campo ? campo.value : "";
  var filtrados = window.filtrarPorTitulo(texto);
  window.renderCatalogo(filtrados);
}

window.inicializar = function () {
  window.renderCatalogo(window.libros);

  var boton = document.getElementById("catalogo-buscar-boton");
  var campo = document.getElementById("catalogo-busqueda");

  if (boton) {
    boton.addEventListener("click", ejecutarBusqueda);
  }
  if (campo) {
    campo.addEventListener("input", ejecutarBusqueda);
  }
};

document.addEventListener("DOMContentLoaded", window.inicializar);

// ============================================================
// (Todas las tareas implementadas)
// ============================================================
