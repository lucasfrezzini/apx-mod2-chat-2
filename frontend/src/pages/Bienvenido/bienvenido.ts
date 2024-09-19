class PageBienvenida extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <h1>Bienvenidx</h1>
    <!-- TODO Componente FormFieldset -->
    <form-fieldset-group
      showLabel
      button="Comenzar",
      config='[{ "ph": "email", "label": "Tu email" }, { "ph": "nombre", "label": "Tu nombre" }, { "ph": "room", "label": "¿Ya tienes sala?", "select": true }, { "ph": "roomID", "label": "Room ID", "disabled": "true"}]'
    ></form-fieldset-group>
    `;
  }
}

customElements.define("page-bienvenida", PageBienvenida);
