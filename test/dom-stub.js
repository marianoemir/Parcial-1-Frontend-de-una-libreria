// Minimal DOM stub for unit testing vanilla JS in Node.js
class ElementStub {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.id = "";
    this.className = "";
    this.innerHTML = "";
    this.textContent = "";
    this.hidden = false;
    this.children = [];
    this.attributes = {};
    this.eventListeners = {};
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  appendChild(child) {
    this.children.push(child);
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
    return child;
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
    return [];
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
