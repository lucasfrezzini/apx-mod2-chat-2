class PageChat extends HTMLElement {
  static get styleBase() {
    return /*css*/ `
    main {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 60px);
    }

    messages-el {
      flex-grow: 1;
      margin-bottom: 30px;
    }

    form-fieldset {
      margin-bottom: 30px;
    }
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  button!: HTMLButtonElement;

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <style>${PageChat.styleBase}</style>
    <main>
      <h1>Chat</h1>
      <messages-el></messages-el>
      <!-- TODO Componente FormFieldset -->
      <form-fieldset
        action="send"
        label="Escribe tu mensaje"
        placeholder="Escribe tu mensaje"
        button="Enviar mensaje"
      ></form-fieldset>
    </main>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("page-chat", PageChat);
