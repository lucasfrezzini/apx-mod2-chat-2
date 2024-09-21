const state = {
  data: {
    user: {
      admin: "",
      email: "",
      nombre: "",
    },
    roomIDshort: "",
    roomIDlong: "",
    mainRoom: true,
    messages: [""],
    listeners: [() => {}],
  },
  listeners: () => {
    const currentState = state;
    currentState.data.listeners.forEach((cb) => {
      cb();
    });
  },
  setListener: (cb: () => {}) => {
    const currentState = state;
    currentState.data.listeners.push(cb);
  },
  getUser: () => {
    const currentState = state;
    return currentState.data.user;
  },
  setUser: (user: { admin: string; email: string; nombre: string }) => {
    const currentState = state;
    currentState.data.user = user;
    currentState.listeners();
  },
  setNewMessage: (message: any) => {
    const currentState = state;
    // ! REFACTOR: Array of never initialization (if statement)
    if ((currentState.data.messages[0] = "")) currentState.data.messages = [];
    currentState.data.messages.push(message);
  },
  getMessages: () => {
    const currentState = state;
    return currentState.data.messages;
  },
  // TODO: init() connect to rtdb
};

export default state;
