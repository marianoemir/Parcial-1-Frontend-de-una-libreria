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
  { id: "cl1", nombre: "María García", email: "maria.garcia@ejemplo.com" },
  { id: "cl2", nombre: "Juan Pérez", email: "juan.perez@ejemplo.com" },
  { id: "cl3", nombre: "Cliente Ejemplo Tres", email: "cliente3@ejemplo.com" }
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

// Listener directo para el botón de búsqueda (se asigna al cargar el script)
var btnBuscar = document.getElementById("catalogo-buscar-boton");
if (btnBuscar) {
  btnBuscar.onclick = function (evt) {
    evt.preventDefault();
    ejecutarBusqueda();
  };
}

window.inicializar = function () {
  window.renderCatalogo(window.libros);

  var campo = document.getElementById("catalogo-busqueda");
  if (campo) {
    campo.addEventListener("input", ejecutarBusqueda);
  }
};

document.addEventListener("DOMContentLoaded", window.inicializar);

// ============================================================
// Ej.4: Generador de ids estables
// ============================================================

window.generarIdNuevo = function (prefix, arr) {
  var max = 0;
  arr.forEach(function (item) {
    var m = item.id.match(new RegExp("^" + prefix + "(\\d+)$"));
    if (m) {
      var n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  });
  return prefix + (max + 1);
};

// ============================================================
// Ej.4: Normalización de ISBN y duplicado
// ============================================================

window.normalizarISBN = function (isbn) {
  return String(isbn || "").replace(/[\s-]/g, "");
};

window.isbnDuplicado = function (isbn) {
  var normalizado = window.normalizarISBN(isbn);
  if (normalizado === "") return false;
  return window.libros.some(function (libro) {
    return window.normalizarISBN(libro.isbn) === normalizado;
  });
};

// ============================================================
// Ej.4: validarLibro(datos) — función pura, devuelve lista de errores
// ============================================================

window.validarLibro = function (datos) {
  var errores = [];

  if (!datos.titulo || String(datos.titulo).trim() === "") {
    errores.push("El título es obligatorio");
  }

  if (!datos.isbn || String(datos.isbn).trim() === "") {
    errores.push("El ISBN es obligatorio");
  } else if (window.isbnDuplicado(datos.isbn)) {
    errores.push("El ISBN ya existe");
  }

  var precio = parseFloat(datos.precio);
  if (isNaN(precio) || precio <= 0) {
    errores.push("El precio debe ser numérico y mayor a cero");
  }

  var editorialExiste = window.editoriales.some(function (ed) { return ed.id === datos.editorialId; });
  if (!editorialExiste) {
    errores.push("La editorial seleccionada no existe");
  }

  if (!datos.autorIds || datos.autorIds.length === 0) {
    errores.push("Seleccioná al menos un autor");
  } else {
    datos.autorIds.forEach(function (aid) {
      var autorExiste = window.autores.some(function (au) { return au.id === aid; });
      if (!autorExiste) {
        errores.push("El autor " + aid + " no existe");
      }
    });
  }

  if (datos.generoId && String(datos.generoId).trim() !== "") {
    var generoExiste = window.generos.some(function (ge) { return ge.id === datos.generoId; });
    if (!generoExiste) {
      errores.push("El género seleccionado no existe");
    }
  }

  return errores;
};

// ============================================================
// Ej.4: validarCliente(datos) — función pura, devuelve lista de errores
// ============================================================

window.validarCliente = function (datos) {
  var errores = [];

  if (!datos.nombre || String(datos.nombre).trim() === "") {
    errores.push("El nombre completo es obligatorio");
  }

  if (!datos.email || String(datos.email).trim() === "") {
    errores.push("El email es obligatorio");
  } else {
    var emailTrim = String(datos.email).trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      errores.push("El email no tiene un formato válido");
    } else {
      var emailLower = emailTrim.toLowerCase();
      var duplicado = window.clientes.some(function (c) {
        return String(c.email || "").trim().toLowerCase() === emailLower;
      });
      if (duplicado) {
        errores.push("El email ya está registrado");
      }
    }
  }

  return errores;
};

// ============================================================
// Ej.4: Render de listado de libros
// ============================================================

function renderLibrosTabla() {
  var lista = document.getElementById("libros-lista");
  var vacio = document.getElementById("libros-vacio");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  if (window.libros.length === 0) {
    if (vacio) vacio.hidden = false;
    return;
  }
  if (vacio) vacio.hidden = true;

  window.libros.forEach(function (libro) {
    var row = document.createElement("tr");

    var c1 = document.createElement("td");
    c1.textContent = libro.titulo;
    row.appendChild(c1);

    var c2 = document.createElement("td");
    c2.textContent = libro.isbn;
    row.appendChild(c2);

    var c3 = document.createElement("td");
    var ed = window.editoriales.find(function (e) { return e.id === libro.editorialId; });
    c3.textContent = ed ? ed.nombre : "";
    row.appendChild(c3);

    var c4 = document.createElement("td");
    c4.textContent = libro.generoId ? nombreGenero(libro.generoId) : "Sin clasificar";
    row.appendChild(c4);

    var c5 = document.createElement("td");
    c5.textContent = nombresAutores(libro.autorIds);
    row.appendChild(c5);

    var c6 = document.createElement("td");
    c6.textContent = "$" + libro.precio.toFixed(2);
    row.appendChild(c6);

    lista.appendChild(row);
  });
}

// ============================================================
// Ej.4: Render de listado de clientes
// ============================================================

function renderClientesTabla() {
  var lista = document.getElementById("clientes-lista");
  var vacio = document.getElementById("clientes-vacio");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  if (window.clientes.length === 0) {
    if (vacio) vacio.hidden = false;
    return;
  }
  if (vacio) vacio.hidden = true;

  window.clientes.forEach(function (cliente) {
    var row = document.createElement("tr");

    var c1 = document.createElement("td");
    c1.textContent = cliente.nombre;
    row.appendChild(c1);

    var c2 = document.createElement("td");
    c2.textContent = cliente.email;
    row.appendChild(c2);

    lista.appendChild(row);
  });
}

// ============================================================
// Ej.4: Actualizar opciones de <select> relacionados
// ============================================================

window.actualizarOpciones = function () {
  var editorialSelect = document.getElementById("libro-editorial");
  var generoSelect = document.getElementById("libro-genero");
  var autoresSelect = document.getElementById("libro-autores");
  var ventaClienteSelect = document.getElementById("venta-cliente");

  function reconstruirSelect(select, items, placeholderText, placeholderValue) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
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
}

// ============================================================
// Ej.4: Listener de envío del formulario de libros
// ============================================================

function configurarLibrosForm() {
  var form = document.getElementById("libros-form");
  if (!form) return;

  function procesarAltaLibro() {
    var errorEl = document.getElementById("libros-error");
    var exitoEl = document.getElementById("libros-exito");

    errorEl.hidden = true;
    errorEl.textContent = "";
    exitoEl.hidden = true;
    exitoEl.textContent = "";

    var autoresSelect = document.getElementById("libro-autores");
    var autorIds = [];
    for (var i = 0; i < autoresSelect.options.length; i++) {
      if (autoresSelect.options[i].selected) {
        autorIds.push(autoresSelect.options[i].value);
      }
    }

    var datos = {
      titulo: document.getElementById("libro-titulo").value,
      isbn: document.getElementById("libro-isbn").value,
      precio: document.getElementById("libro-precio").value,
      editorialId: document.getElementById("libro-editorial").value,
      generoId: document.getElementById("libro-genero").value,
      autorIds: autorIds
    };

    var errores = validarLibro(datos);
    if (errores.length > 0) {
      errorEl.textContent = errores.join(". ");
      errorEl.hidden = false;
      return;
    }

    var nuevoLibro = {
      id: generarIdNuevo("li", window.libros),
      titulo: datos.titulo,
      isbn: normalizarISBN(datos.isbn),
      editorialId: datos.editorialId,
      generoId: datos.generoId || null,
      autorIds: autorIds,
      precio: parseFloat(datos.precio)
    };

    window.libros.push(nuevoLibro);
    renderLibrosTabla();
    window.renderCatalogo(window.libros);
    actualizarOpciones();

    exitoEl.textContent = "Libro agregado correctamente";
    exitoEl.hidden = false;
  }

  // Listener de submit del formulario (Enter en un campo también dispara submit)
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    procesarAltaLibro();
  });

  // Los botones del HTML son type="button" (no submit), así que conectamos
  // el click directamente para ejecutar la alta sin recargar la página.
  var btnLibros = document.getElementById("libros-agregar-boton");
  if (btnLibros) {
    btnLibros.addEventListener("click", function (evt) {
      evt.preventDefault();
      procesarAltaLibro();
    });
  }
}

// ============================================================
// Ej.4: Listener de envío del formulario de clientes
// ============================================================

function configurarClientesForm() {
  var form = document.getElementById("clientes-form");
  if (!form) return;

  function procesarAltaCliente() {
    var errorEl = document.getElementById("clientes-error");
    var exitoEl = document.getElementById("clientes-exito");

    errorEl.hidden = true;
    errorEl.textContent = "";
    exitoEl.hidden = true;
    exitoEl.textContent = "";

    var datos = {
      nombre: document.getElementById("cliente-nombre").value,
      email: document.getElementById("cliente-email").value
    };

    var errores = validarCliente(datos);
    if (errores.length > 0) {
      errorEl.textContent = errores.join(". ");
      errorEl.hidden = false;
      return;
    }

    var nuevoCliente = {
      id: generarIdNuevo("cl", window.clientes),
      nombre: datos.nombre,
      email: datos.email.trim()
    };

    window.clientes.push(nuevoCliente);
    renderClientesTabla();
    actualizarOpciones();

    exitoEl.textContent = "Cliente agregado correctamente";
    exitoEl.hidden = false;
  }

  // Listener de submit del formulario (Enter en un campo también dispara submit)
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    procesarAltaCliente();
  });

  // Los botones del HTML son type="button" (no submit), así que conectamos
  // el click directamente para ejecutar la alta sin recargar la página.
  var btnClientes = document.getElementById("clientes-agregar-boton");
  if (btnClientes) {
    btnClientes.addEventListener("click", function (evt) {
      evt.preventDefault();
      procesarAltaCliente();
    });
  }
}

// ============================================================
// Ej.4: Inicialización de formularios
// ============================================================

window.inicializarEj4 = function () {
  configurarLibrosForm();
  configurarClientesForm();
  renderLibrosTabla();
  renderClientesTabla();
  actualizarOpciones();
};

// Registrar inicializarEj4 como listener separado de DOMContentLoaded.
// Nota: no se redefine window.inicializar porque el listener de Ej.3 ya
// capturó la referencia de la función original; redefinirla no la
// actualizaría en el listener ya registrado.
document.addEventListener("DOMContentLoaded", window.inicializarEj4);

// ============================================================
// (Todas las tareas implementadas)
// ============================================================
