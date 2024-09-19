import { Router } from "@vaadin/router";

const outlet = document.getElementById("outlet");
const router = new Router(outlet);
router.setRoutes([
  { path: "/", component: "page-bienvenida" },
  { path: "/chat", component: "page-chat" },
  // { path: "/users/:user", component: "x-user-profile" },
]);
