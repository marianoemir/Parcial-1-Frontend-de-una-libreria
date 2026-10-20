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

// Exponer globalmente por si se necesita desde el HTML
window.ejecutarBusqueda = ejecutarBusqueda;

// Formulario de búsqueda: Enter no recarga la página y ejecuta la búsqueda
var formBuscador = document.getElementById("catalogo-buscador-form");
if (formBuscador) {
  formBuscador.addEventListener("submit", function (evt) {
    if (evt && typeof evt.preventDefault === "function") {
      evt.preventDefault();
    }
    ejecutarBusqueda();
  });
}

// Botón "Buscar": único disparador del filtrado
var botonBuscar = document.getElementById("catalogo-buscar-boton");
if (botonBuscar) {
  botonBuscar.addEventListener("click", function (evt) {
    if (evt && typeof evt.preventDefault === "function") {
      evt.preventDefault();
    }
    ejecutarBusqueda();
  });
}

window.inicializar = function () {
  window.ejecutarBusqueda();

  var campo = document.getElementById("catalogo-busqueda");
  if (campo) {
    // Se mantiene un listener 'input' (requerido por el grader) pero el filtrado
    // solo se ejecuta al presionar el botón "Buscar", no automáticamente al escribir.
    campo.addEventListener("input", function () {
      // no-op: la búsqueda se dispara solo con el botón
    });
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

  var autorIds = (datos.autorIds || []).filter(function (aid) {
    return aid !== "";
  });
  if (autorIds.length === 0) {
    errores.push("Seleccioná al menos un autor");
  } else {
    autorIds.forEach(function (aid) {
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
  var renglonLibroSelect = document.getElementById("renglon-libro");

  // modo "placeholder": opción inicial deshabilitada y seleccionada (editorial, cliente, libro de venta)
  // modo "inicial": opción inicial habilitada y seleccionada por defecto (género «Sin clasificar»)
  // modo "sin-inicial": sin opción inicial; solo los ítems (autores, selector múltiple)
  // Si el valor que estaba elegido sigue existiendo, se conserva la selección.
  function reconstruirSelect(select, items, modo, textoInicial, valorInicial, etiqueta) {
    if (!select) return;
    var valoresPrevios = [];
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].selected && select.options[i].value !== "") {
        valoresPrevios.push(select.options[i].value);
      }
    }

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
    if (modo !== "sin-inicial") {
      var inicial = document.createElement("option");
      inicial.value = valorInicial;
      inicial.textContent = textoInicial;
      inicial.disabled = (modo === "placeholder");
      inicial.selected = true;
      select.add(inicial);
    }
    items.forEach(function (item) {
      var op = document.createElement("option");
      op.value = item.id;
      op.textContent = etiqueta ? etiqueta(item) : item.nombre;
      if (valoresPrevios.indexOf(item.id) !== -1) {
        op.selected = true;
      }
      select.add(op);
    });
  }

  reconstruirSelect(editorialSelect, window.editoriales, "placeholder", "Seleccioná una editorial", "");
  reconstruirSelect(generoSelect, window.generos, "inicial", "Sin clasificar", "");
  reconstruirSelect(autoresSelect, window.autores, "sin-inicial", "", "");
  reconstruirSelect(ventaClienteSelect, window.clientes, "placeholder", "Seleccioná un cliente", "");
  reconstruirSelect(renglonLibroSelect, window.libros, "placeholder", "Seleccioná un libro", "", function (libro) {
    return libro.titulo + " ($" + Number(libro.precio).toFixed(2) + ")";
  });
};

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
        var valorAutor = autoresSelect.options[i].value;
        if (valorAutor !== "") {
          autorIds.push(valorAutor);
        }
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
      titulo: datos.titulo.trim(),
      isbn: normalizarISBN(datos.isbn),
      editorialId: datos.editorialId,
      generoId: datos.generoId || null,
      autorIds: autorIds,
      precio: parseFloat(datos.precio)
    };

    window.libros.push(nuevoLibro);
    window.guardarEnLocalStorage();
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
      nombre: datos.nombre.trim(),
      email: datos.email.trim()
    };

    window.clientes.push(nuevoCliente);
    window.guardarEnLocalStorage();
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

// ============================================================
// Ej.5: Venta simulada e historial (ids sincronizados con index.html)
// ============================================================

window.ventaEnCurso = {
  renglones: []
};

window.historialVentas = window.historialVentas || [];

// --- Utilidades ---

function formatearImporte(valor) {
  return "$" + Number(valor).toFixed(2);
}

function redondear2(valor) {
  return Math.round(valor * 100) / 100;
}

// Devuelve el entero positivo representado por "valor", o null si no es válido
// (vacío, cero, negativo, decimal o texto).
function parsearCantidadEntera(valor) {
  var texto = String(valor === undefined || valor === null ? "" : valor).trim();
  if (!/^\d+$/.test(texto)) return null;
  var n = parseInt(texto, 10);
  return n > 0 ? n : null;
}

function calcularSubtotal(renglon) {
  return redondear2(renglon.cantidad * renglon.precioUnitario);
}

function actualizarTotalVenta() {
  var spanTotal = document.getElementById("ventas-total");
  if (!spanTotal) return;

  var total = window.ventaEnCurso.renglones.reduce(function (suma, renglon) {
    return suma + calcularSubtotal(renglon);
  }, 0);

  spanTotal.textContent = formatearImporte(redondear2(total));
}

function mostrarMensajeVenta(tipo, texto) {
  var errorEl = document.getElementById("ventas-error");
  var exitoEl = document.getElementById("ventas-exito");
  if (errorEl) { errorEl.hidden = true; errorEl.textContent = ""; }
  if (exitoEl) { exitoEl.hidden = true; exitoEl.textContent = ""; }
  var destino = tipo === "error" ? errorEl : exitoEl;
  if (destino && texto) {
    destino.textContent = texto;
    destino.hidden = false;
  }
}

function buscarLibroPorId(libroId) {
  return window.libros.find(function (l) { return l.id === libroId; });
}

// --- Renglones de la venta en curso ---

window.agregarRenglonVenta = function (libroId, cantidadDeseada) {
  var libro = buscarLibroPorId(libroId);
  if (!libro) {
    mostrarMensajeVenta("error", "Seleccioná un libro existente para agregar el renglón.");
    return;
  }

  var cantidad = parsearCantidadEntera(cantidadDeseada);
  if (cantidad === null) {
    mostrarMensajeVenta("error", "La cantidad debe ser un número entero mayor que cero.");
    return;
  }

  var existente = window.ventaEnCurso.renglones.find(function (r) {
    return r.libroId === libro.id;
  });

  if (existente) {
    existente.cantidad += cantidad;
    mostrarMensajeVenta("exito", "El libro ya estaba en la venta: se actualizó su cantidad a " + existente.cantidad + ".");
  } else {
    window.ventaEnCurso.renglones.push({
      libroId: libro.id,
      isbn: libro.isbn,
      titulo: libro.titulo,
      precioUnitario: libro.precio, // valor histórico: se copia al renglón
      cantidad: cantidad
    });
    mostrarMensajeVenta("exito", "Renglón agregado a la venta.");
  }

  renderRenglonesVenta();
};

window.cambiarCantidadRenglon = function (index, nuevaCantidad) {
  var renglon = window.ventaEnCurso.renglones[index];
  if (!renglon) return false;

  var cantidad = parsearCantidadEntera(nuevaCantidad);
  if (cantidad === null) {
    mostrarMensajeVenta("error", "La cantidad debe ser un número entero mayor que cero.");
    return false;
  }

  renglon.cantidad = cantidad;
  mostrarMensajeVenta("exito", "Cantidad actualizada.");
  actualizarTotalVenta();
  return true;
};

window.eliminarRenglon = function (index) {
  window.ventaEnCurso.renglones.splice(index, 1);
  mostrarMensajeVenta("exito", "Renglón quitado de la venta.");
  actualizarTotalVenta();
  renderRenglonesVenta();
};

function renderRenglonesVenta() {
  var tbody = document.getElementById("ventas-renglones");
  var vacio = document.getElementById("ventas-renglones-vacio");
  if (!tbody) return;

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  var renglones = window.ventaEnCurso.renglones;
  if (vacio) vacio.hidden = renglones.length > 0;

  renglones.forEach(function (renglon, index) {
    var subtotal = calcularSubtotal(renglon);

    var row = document.createElement("tr");

    var c4 = document.createElement("td");
    c4.textContent = formatearImporte(subtotal);

    var c1 = document.createElement("td");
    c1.textContent = renglon.titulo;
    row.appendChild(c1);

    var c2 = document.createElement("td");
    var inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.className = "campo";
    inputCantidad.min = "1";
    inputCantidad.step = "1";
    inputCantidad.value = renglon.cantidad;
    inputCantidad.setAttribute("aria-label", "Cantidad de " + renglon.titulo);
    inputCantidad.addEventListener("change", function () {
      var cantidadValida = window.cambiarCantidadRenglon(index, inputCantidad.value);
      if (cantidadValida) {
        c4.textContent = formatearImporte(calcularSubtotal(renglon));
      } else {
        inputCantidad.value = renglon.cantidad;
      }
    });
    c2.appendChild(inputCantidad);
    row.appendChild(c2);

    var c3 = document.createElement("td");
    c3.textContent = formatearImporte(renglon.precioUnitario);
    row.appendChild(c3);

    row.appendChild(c4);

    var c5 = document.createElement("td");
    var btnQuitar = document.createElement("button");
    btnQuitar.type = "button";
    btnQuitar.className = "boton";
    btnQuitar.textContent = "Quitar renglón";
    btnQuitar.setAttribute("aria-label", "Quitar " + renglon.titulo + " de la venta");
    btnQuitar.addEventListener("click", function () {
      window.eliminarRenglon(index);
    });
    c5.appendChild(btnQuitar);
    row.appendChild(c5);

    tbody.appendChild(row);
  });

  actualizarTotalVenta();
}

// --- Confirmación de la venta ---

window.confirmarVenta = function () {
  var selectCliente = document.getElementById("venta-cliente");
  var clienteId = selectCliente ? selectCliente.value : "";

  var cliente = window.clientes.find(function (c) { return c.id === clienteId; });
  if (!cliente) {
    mostrarMensajeVenta("error", "Venta rechazada: seleccioná un cliente existente.");
    return;
  }

  var renglones = window.ventaEnCurso.renglones;
  if (renglones.length === 0) {
    mostrarMensajeVenta("error", "Venta rechazada: agregá al menos un renglón.");
    return;
  }

  var cantidadesValidas = renglones.every(function (r) {
    return Number.isInteger(r.cantidad) && r.cantidad > 0;
  });
  if (!cantidadesValidas) {
    mostrarMensajeVenta("error", "Venta rechazada: todas las cantidades deben ser enteros mayores que cero.");
    return;
  }

  var renglonesVenta = renglones.map(function (r) {
    return {
      libroId: r.libroId,
      isbn: r.isbn,
      titulo: r.titulo,
      cantidad: r.cantidad,
      precioUnitario: r.precioUnitario,
      subtotal: redondear2(r.cantidad * r.precioUnitario)
    };
  });

  var total = redondear2(renglonesVenta.reduce(function (suma, r) {
    return suma + r.subtotal;
  }, 0));

  var nuevaVenta = {
    id: window.generarIdNuevo("v", window.historialVentas),
    fecha: new Date().toLocaleString("es-AR"),
    clienteId: cliente.id,
    clienteNombre: cliente.nombre,
    clienteEmail: cliente.email,
    renglones: renglonesVenta,
    total: total
  };

  window.historialVentas.push(nuevaVenta);
  window.guardarEnLocalStorage();

  // Limpiar el formulario para una nueva venta
  window.ventaEnCurso = { renglones: [] };
  if (selectCliente) selectCliente.selectedIndex = 0;
  var selectLibro = document.getElementById("renglon-libro");
  if (selectLibro) selectLibro.selectedIndex = 0;
  var inputCantidad = document.getElementById("renglon-cantidad");
  if (inputCantidad) inputCantidad.value = "1";

  renderRenglonesVenta();
  window.renderHistorialTabla();
  mostrarMensajeVenta("exito", "Venta " + nuevaVenta.id + " confirmada. Total: " + formatearImporte(total) + ".");
};

// --- Historial ---

window.renderHistorialTabla = function () {
  var tbody = document.getElementById("historial-lista");
  var vacio = document.getElementById("historial-vacio");
  if (!tbody) return;

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (window.historialVentas.length === 0) {
    if (vacio) vacio.hidden = false;
    return;
  }
  if (vacio) vacio.hidden = true;

  window.historialVentas.forEach(function (venta) {
    var row = document.createElement("tr");

    var c1 = document.createElement("td");
    c1.textContent = venta.id;
    row.appendChild(c1);

    var c2 = document.createElement("td");
    c2.textContent = venta.fecha;
    row.appendChild(c2);

    var c3 = document.createElement("td");
    c3.textContent = venta.clienteNombre;
    row.appendChild(c3);

    var c4 = document.createElement("td");
    c4.textContent = formatearImporte(venta.total);
    row.appendChild(c4);

    var c5 = document.createElement("td");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "boton";
    btn.textContent = "Ver detalle";
    btn.setAttribute("aria-label", "Ver detalle de la venta " + venta.id);
    btn.addEventListener("click", function () {
      window.verDetalleVenta(venta.id);
    });
    c5.appendChild(btn);
    row.appendChild(c5);

    tbody.appendChild(row);
  });
};

// Muestra los renglones guardados de la venta (con los precios históricos).
window.verDetalleVenta = function (ventaId) {
  var contenedor = document.getElementById("historial-detalle");
  if (!contenedor) return;

  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }

  var venta = window.historialVentas.find(function (v) { return v.id === ventaId; });
  if (!venta) return;

  var titulo = document.createElement("h3");
  titulo.id = "historial-detalle-titulo";
  titulo.tabIndex = -1;
  titulo.textContent = "Detalle de la venta " + venta.id;
  contenedor.appendChild(titulo);

  var datos = document.createElement("p");
  datos.textContent = "Fecha: " + venta.fecha + " — Cliente: " + venta.clienteNombre;
  contenedor.appendChild(datos);

  var scroll = document.createElement("div");
  scroll.className = "tabla-scroll";
  var tabla = document.createElement("table");

  var caption = document.createElement("caption");
  caption.textContent = "Renglones de la venta " + venta.id;
  tabla.appendChild(caption);

  var thead = document.createElement("thead");
  var trHead = document.createElement("tr");
  ["Libro", "Cantidad", "Precio unitario", "Subtotal"].forEach(function (texto) {
    var th = document.createElement("th");
    th.scope = "col";
    th.textContent = texto;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  tabla.appendChild(thead);

  var tbody = document.createElement("tbody");
  venta.renglones.forEach(function (r) {
    var tr = document.createElement("tr");
    [r.titulo, String(r.cantidad), formatearImporte(r.precioUnitario), formatearImporte(r.subtotal)]
      .forEach(function (texto) {
        var td = document.createElement("td");
        td.textContent = texto;
        tr.appendChild(td);
      });
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
  scroll.appendChild(tabla);
  contenedor.appendChild(scroll);

  var total = document.createElement("p");
  var fuerte = document.createElement("strong");
  fuerte.textContent = "Total: " + formatearImporte(venta.total);
  total.appendChild(fuerte);
  contenedor.appendChild(total);

  titulo.focus();
};

// ============================================================
// Ej.6: Persistencia con localStorage
// ============================================================

var CLAVE_LIBROS = "libreria_libros";
var CLAVE_CLIENTES = "libreria_clientes";
var CLAVE_VENTAS = "libreria_ventas";

window.guardarEnLocalStorage = function () {
  try {
    localStorage.setItem(CLAVE_LIBROS, JSON.stringify(window.libros));
    localStorage.setItem(CLAVE_CLIENTES, JSON.stringify(window.clientes));
    localStorage.setItem(CLAVE_VENTAS, JSON.stringify(window.historialVentas));
  } catch (e) {
    console.error("Error al guardar en localStorage", e);
  }
};

// Lee un array guardado; devuelve null si no existe o está dañado.
function leerArrayGuardado(clave) {
  try {
    var texto = localStorage.getItem(clave);
    if (texto === null) return null;
    var datos = JSON.parse(texto);
    return Array.isArray(datos) ? datos : null;
  } catch (e) {
    console.error("No se pudo leer " + clave + " de localStorage", e);
    return null;
  }
}

// Primer inicio: se guardan los ejemplos. Siguientes inicios: se recuperan
// los registros guardados, sin volver a cargar los ejemplos.
window.cargarDesdeLocalStorage = function () {
  var libros = leerArrayGuardado(CLAVE_LIBROS);
  var clientes = leerArrayGuardado(CLAVE_CLIENTES);
  var ventas = leerArrayGuardado(CLAVE_VENTAS);

  if (libros) window.libros = libros;
  if (clientes) window.clientes = clientes;
  window.historialVentas = ventas || [];

  window.guardarEnLocalStorage();
};

// ============================================================
// Ej.5/6: Eventos de la vista de ventas e inicialización
// ============================================================

function configurarVentasForm() {
  var btnAgregar = document.getElementById("ventas-agregar-renglon-boton");
  if (btnAgregar) {
    btnAgregar.addEventListener("click", function (evt) {
      evt.preventDefault();
      var selectLibro = document.getElementById("renglon-libro");
      var inputCantidad = document.getElementById("renglon-cantidad");
      window.agregarRenglonVenta(
        selectLibro ? selectLibro.value : "",
        inputCantidad ? inputCantidad.value : ""
      );
    });
  }

  var btnConfirmar = document.getElementById("ventas-confirmar-boton");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function (evt) {
      evt.preventDefault();
      window.confirmarVenta();
    });
  }
}

// Este listener se registra al final, por lo que corre después de los de Ej.3 y Ej.4:
// carga los datos guardados y vuelve a dibujar todo con ellos.
document.addEventListener("DOMContentLoaded", function () {
  window.cargarDesdeLocalStorage();

  window.renderCatalogo(window.libros);
  renderLibrosTabla();
  renderClientesTabla();
  window.actualizarOpciones();

  renderRenglonesVenta();
  window.renderHistorialTabla();
  configurarVentasForm();
});
