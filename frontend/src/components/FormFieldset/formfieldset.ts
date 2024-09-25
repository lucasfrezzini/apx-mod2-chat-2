import { Router } from "@vaadin/router";
import state from "../../state/state";

class FormFieldset extends HTMLElement {
  button!: HTMLButtonElement;
  count: number = 0;
  static get styleBase() {
    return /*css*/ `
    fieldset,
    button,
    input {
      border: none;
      width: 100%;
    }

    input,
    button {
      padding: 10px 10px;
      border-radius: 5px;
      border: 2px solid black;
    }
    fieldset {
      border: none;
      margin: 0;
      padding:0;
    }
    label {
      font-weight: bold;
    }
    input {
      width: calc(100% - 24px);
      margin-bottom: 10px;
    }
    button {
      background-color: var(--color-blue);
      border: var(--color-blue);
      font-weight: bold;
      cursor: pointer;
    }
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <style>${FormFieldset.styleBase}</style>
    <form action="" method="">
      <fieldset>
        ${
          this.hasAttribute("showLabel")
            ? `<label for="name" >${this.getAttribute("label")}</label><br>`
            : ""
        }
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="${this.getAttribute("placeholder")}"
          ${
            !this.hasAttribute("showLabel")
              ? `aria-label="${this.getAttribute("label")}"`
              : ""
          }
          >
      </fieldset>
      <button >${this.getAttribute("button")}</button>
    </form>
    `;
  }

  async sendMessage(message: string) {
    const { username, name, email } = state.getUser();
    const user = {
      username: username.replaceAll(" ", "").toLowerCase(),
      name,
      email,
    };
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        ...user,
      }),
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const formData = this.shadowRoot!.querySelector("input")!.value;
    this.shadowRoot!.querySelector("input")!.value = "";

    if (this.getAttribute("action") === "send") {
      this.sendMessage(formData);
    } else {
      state.setUser(formData);
      Router.go("/chat");
    }
  }

  connectedCallback() {
    this.render();

    const form = this.shadowRoot!.querySelector("form");
    form!.addEventListener("submit", this.handleSubmit.bind(this));
  }
}

customElements.define("form-fieldset", FormFieldset);
