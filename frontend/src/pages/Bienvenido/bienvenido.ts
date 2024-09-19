class PageBienvenida extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <h1>Bienvenidx</h1>
    <!-- TODO Componente FormFieldset -->
    <form-fieldset
      label="Tu nombre"
      showLabel
      placeholder="Ingrese su nombre"
      button="Comenzar"
    ></form-fieldset>
    `;
  }
}

customElements.define("page-bienvenida", PageBienvenida);
