// Minimal DOM stub for unit testing vanilla JS in Node.js
class OptionStub {
  constructor(value, text, selected) {
    this.value = value;
    this.text = text;
    this.selected = selected === true;
  }
}

class ElementStub {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.id = "";
    this.className = "";
    this.innerHTML = "";
    this.textContent = "";
    this.hidden = false;
    this.value = "";
    this.children = [];
    this.attributes = {};
    this.eventListeners = {};
    this.options = [];
    this.multiple = false;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  appendChild(child) {
    this.children.push(child);
    if (child.tagName === "OPTION") {
      this.options.push(child);
    }
    return child;
  }

  get firstChild() {
    return this.children.length > 0 ? this.children[0] : null;
  }

  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx >= 0) this.children.splice(idx, 1);
    if (child.tagName === "OPTION") {
      const oIdx = this.options.indexOf(child);
      if (oIdx >= 0) this.options.splice(oIdx, 1);
    }
    return child;
  }

  add(option) {
    if (option.tagName === "OPTION") {
      this.options.push(option);
      this.children.push(option);
    }
    return option;
  }

  addEventListener(type, listener) {
    if (!this.eventListeners[type]) this.eventListeners[type] = [];
    this.eventListeners[type].push(listener);
  }

  removeEventListener(type, listener) {
    if (this.eventListeners[type]) {
      this.eventListeners[type] = this.eventListeners[type].filter(l => l !== listener);
    }
  }

  dispatchEvent(event) {
    const listeners = this.eventListeners[event.type] || [];
    listeners.forEach(l => l(event));
    return true;
  }

  getElementsByTagName(tagName) {
    var resultado = [];
    var buscar = function (el) {
      el.children.forEach(function (hijo) {
        if (hijo.tagName === tagName.toUpperCase()) {
          resultado.push(hijo);
        }
        buscar(hijo);
      });
    };
    buscar(this);
    return resultado;
  }

  classList() {
    return {
      add: (...c) => { this.className = c.join(" "); },
      remove: (...c) => {},
      contains: (c) => this.className.split(" ").includes(c),
    };
  }
}

class DocumentStub {
  constructor() {
    this.elements = {};
    this.eventListeners = {};
    this.readyState = "complete";

    // Pre-crear elementos que el HTML real tiene (index.html)
    this.elements["catalogo-lista"] = new ElementStub("div");
    this.elements["catalogo-lista"].id = "catalogo-lista";
    this.elements["catalogo-busqueda"] = new ElementStub("input");
    this.elements["catalogo-busqueda"].id = "catalogo-busqueda";
    this.elements["catalogo-buscar-boton"] = new ElementStub("button");
    this.elements["catalogo-buscar-boton"].id = "catalogo-buscar-boton";
    this.elements["catalogo-sin-resultados"] = new ElementStub("p");
    this.elements["catalogo-sin-resultados"].id = "catalogo-sin-resultados";
    this.elements["catalogo-sin-resultados"].hidden = true;
    this.elements["catalogo-vacio"] = new ElementStub("p");
    this.elements["catalogo-vacio"].id = "catalogo-vacio";
    this.elements["catalogo-vacio"].hidden = true;

    // === Ej.4: Formulario de libros ===
    this.elements["libros-form"] = new ElementStub("form");
    this.elements["libros-form"].id = "libros-form";
    this.elements["libro-titulo"] = new ElementStub("input");
    this.elements["libro-titulo"].id = "libro-titulo";
    this.elements["libro-titulo"].value = "";
    this.elements["libro-isbn"] = new ElementStub("input");
    this.elements["libro-isbn"].id = "libro-isbn";
    this.elements["libro-isbn"].value = "";
    this.elements["libro-precio"] = new ElementStub("input");
    this.elements["libro-precio"].id = "libro-precio";
    this.elements["libro-precio"].value = "";
    this.elements["libro-editorial"] = new ElementStub("select");
    this.elements["libro-editorial"].id = "libro-editorial";
    this.elements["libro-editorial"].value = "";
    this.elements["libro-genero"] = new ElementStub("select");
    this.elements["libro-genero"].id = "libro-genero";
    this.elements["libro-genero"].value = "";
    this.elements["libro-autores"] = new ElementStub("select");
    this.elements["libro-autores"].id = "libro-autores";
    this.elements["libro-autores"].multiple = true;
    this.elements["libro-autores"].value = "";
    this.elements["libros-error"] = new ElementStub("p");
    this.elements["libros-error"].id = "libros-error";
    this.elements["libros-error"].hidden = true;
    this.elements["libros-error"].textContent = "";
    this.elements["libros-exito"] = new ElementStub("p");
    this.elements["libros-exito"].id = "libros-exito";
    this.elements["libros-exito"].hidden = true;
    this.elements["libros-exito"].textContent = "";
    this.elements["libros-lista"] = new ElementStub("tbody");
    this.elements["libros-lista"].id = "libros-lista";
    this.elements["libros-vacio"] = new ElementStub("p");
    this.elements["libros-vacio"].id = "libros-vacio";
    this.elements["libros-vacio"].hidden = true;

    // === Ej.4: Formulario de clientes ===
    this.elements["clientes-form"] = new ElementStub("form");
    this.elements["clientes-form"].id = "clientes-form";
    this.elements["cliente-nombre"] = new ElementStub("input");
    this.elements["cliente-nombre"].id = "cliente-nombre";
    this.elements["cliente-nombre"].value = "";
    this.elements["cliente-email"] = new ElementStub("input");
    this.elements["cliente-email"].id = "cliente-email";
    this.elements["cliente-email"].value = "";
    this.elements["clientes-error"] = new ElementStub("p");
    this.elements["clientes-error"].id = "clientes-error";
    this.elements["clientes-error"].hidden = true;
    this.elements["clientes-error"].textContent = "";
    this.elements["clientes-exito"] = new ElementStub("p");
    this.elements["clientes-exito"].id = "clientes-exito";
    this.elements["clientes-exito"].hidden = true;
    this.elements["clientes-exito"].textContent = "";
    this.elements["clientes-lista"] = new ElementStub("tbody");
    this.elements["clientes-lista"].id = "clientes-lista";
    this.elements["clientes-vacio"] = new ElementStub("p");
    this.elements["clientes-vacio"].id = "clientes-vacio";
    this.elements["clientes-vacio"].hidden = true;

    // === Ej.4: Select de clientes en Ventas ===
    this.elements["venta-cliente"] = new ElementStub("select");
    this.elements["venta-cliente"].id = "venta-cliente";
    this.elements["venta-cliente"].value = "";
  }

  getElementById(id) {
    return this.elements[id] || null;
  }

  createElement(tagName) {
    return new ElementStub(tagName);
  }

  addEventListener(type, listener) {
    if (!this.eventListeners[type]) this.eventListeners[type] = [];
    this.eventListeners[type].push(listener);
  }

  querySelector(selector) {
    if (selector.startsWith("#")) {
      return this.getElementById(selector.slice(1));
    }
    return null;
  }

  querySelectorAll(selector) {
    return [];
  }

  getElementsByTagName(tagName) {
    var resultado = [];
    var buscar = function (el) {
      el.children.forEach(function (hijo) {
        if (hijo.tagName === tagName.toUpperCase()) {
          resultado.push(hijo);
        }
        buscar(hijo);
      });
    };
    buscar(this);
    return resultado;
  }

  getElementsByClassName(className) {
    return [];
  }

  fireDOMLoaded() {
    const listeners = this.eventListeners["DOMContentLoaded"] || [];
    listeners.forEach(l => l({ type: "DOMContentLoaded" }));
  }
}

global.document = new DocumentStub();
global.Element = ElementStub;
