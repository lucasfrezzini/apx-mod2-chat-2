import { database } from "../../db/database";
import { ref, onValue } from "firebase/database";
import state from "../../state/state";

// const mensajesRef = ref(database, "chat/");
// onValue(mensajesRef, (snapshot) => {
//   const datos = snapshot.val();
//   console.log(datos); // Actualiza tu interfaz de usuario aquí
// });

class Messages extends HTMLElement {
  static get styleBase() {
    return /*css*/ `
    section#messages {
      height:calc(100vh - 282px);
      display: flex;
      flex-direction: column;
      gap:10px;
      padding-right: 10px;
      overflow-y: scroll;
    }

    .message {
      display: flex; 
      flex-direction: column;
    }

    .message-right {
      align-items: end;
    }

    .message h6{
      color: var(--color-gray);
      margin: 0px 0 2px 5px;
    }
    .message p {
      display: inline-block;
      background-color: var(--color-gray);
      margin: 0;
      padding:5px 10px;
      border-radius: 5px;
      max-width: 85%;
      width: fit-content;
      word-wrap: break-word;
    }
    
    .message-right p {
      background-color: var(--color-green);
    }
    `;
  }
  usernameAdmin: string = state.getUser().replaceAll(" ", "").toLowerCase();
  messages: Array<any> = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  initFirebase() {
    // Inicializa Firebase y escucha los cambios
    const dbRef = ref(database, "chatroom/chat");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      this.updateMessages(data);
    });
  }

  updateMessages(data: Array<any>) {
    this.messages = Object.values(data || {});
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <style>${Messages.styleBase}</style>
    <section id="messages">
      ${this.messages
        .map((msg) => {
          if (!msg) {
            return "";
          }
          if (msg.username === this.usernameAdmin) {
            return /*html*/ `
            <div class="message message-right">
              <h6 hidden>${msg.username}</h6>
              <p>${msg.message}</p>
            </div>`;
          } else {
            return /*html*/ `
            <div class="message message-left">
              <h6>${msg.name}</h6>
              <p>${msg.message}</p>
            </div>`;
          }
        })
        .join("")}
    </section>
    `;
  }

  connectedCallback() {
    this.initFirebase();
  }
}

customElements.define("messages-el", Messages);
