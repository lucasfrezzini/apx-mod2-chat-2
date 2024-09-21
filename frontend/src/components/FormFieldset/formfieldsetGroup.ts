import { Router } from "@vaadin/router";
import state from "../../state/state";

class FormFieldsetGroup extends HTMLElement {
  button!: HTMLButtonElement;
  count: number = 0;
  config: any;
  static get styleBase() {
    return /*css*/ `
    fieldset,
    select,
    button,
    input {
      border: none;
      width: 100%;
    }

    input,
    select,
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
    }
    input,
    select {
      margin-bottom: 10px;
    }
    button {
      background-color: var(--color-blue);
      border: var(--color-blue);
      font-weight: bold;
      cursor: pointer;
    }
    .hidden {display: none}
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = JSON.parse(this.getAttribute("config")!);
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <style>${FormFieldsetGroup.styleBase}</style>
    <form action="" method="">
      ${this.config
        .map((config: any) => {
          return /*html*/ `
        <fieldset id="${config.ph}">
          ${
            this.hasAttribute("showLabel")
              ? /*html*/ `
                <label 
                  for="name" ${config.disabled ? `class="hidden"` : ""}>
                  ${config.label}
                </label><br>`
              : ""
          }
          ${
            !config.select
              ? /*html*/ `
              <input 
                type="text"
                id="${config.ph}" 
                name="${config.ph}" 
                placeholder="${config.ph}"
                ${config.disabled ? `class="hidden"` : ""}
                ${
                  !this.hasAttribute("showLabel")
                    ? `aria-label="${this.getAttribute("label")}"`
                    : ""
                }
              >
              `
              : /*html*/ `
              <select name="${config.ph}">
                <option value="new" selected>Nuevo Room</option>
                <option value="exist" >Tengo un ID</option>
              </select>
              `
          }
          
        </fieldset>
        `;
        })
        .join("")}
      <button >${this.getAttribute("button")}</button>
    </form>
    `;
  }

  async sendMessage(message: string) {
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        username: state.getUser().replaceAll(" ", "").toLowerCase(),
        name: state.getUser(),
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

  handleSelect(e: Event) {
    e.preventDefault();
    const roomIDLabel = this.shadowRoot!.querySelector("#roomID > label");
    const roomIDInput = this.shadowRoot!.querySelector("#roomID > input");
    roomIDLabel?.classList.toggle("hidden");
    roomIDInput?.classList.toggle("hidden");
  }

  connectedCallback() {
    this.render();

    const form = this.shadowRoot!.querySelector("form");
    form!.addEventListener("submit", this.handleSubmit.bind(this));
    const select = this.shadowRoot!.querySelector("select");
    select!.addEventListener("change", this.handleSelect.bind(this));
  }
}

customElements.define("form-fieldset-group", FormFieldsetGroup);
