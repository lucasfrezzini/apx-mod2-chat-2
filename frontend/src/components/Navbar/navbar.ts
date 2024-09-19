class Navbar extends HTMLElement {
  static get styleBase() {
    return /*css*/ `
    nav {
      width: 100vw;
      height: 60px;
      background-color: var(--color-header);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }

    nav a {
      background-color: white;
      padding: 5px 10px;
      border-radius:  5px;
      color: black;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      transition: all .5s;
    }

    nav a:hover {
      background: #ddd;
    }
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <style>${Navbar.styleBase}</style>
    <nav>
      <!--<a href="/">Bienvenidx</a>
      <a href="/chat">Chat</a> -->
    </nav>
    `;
  }
}

customElements.define("navbar-menu", Navbar);
