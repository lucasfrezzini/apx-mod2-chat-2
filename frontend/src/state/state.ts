const state = {
  data: {
    user: {
      username: "",
      email: "",
      name: "",
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
  setUser: (user: { username: string; email: string; name: string }) => {
    const currentState = state;
    currentState.data.user = user;
    currentState.listeners();
  },
  setNewMessages: (messages: any) => {
    const currentState = state;
    currentState.data.messages = messages;
  },
  getMessages: () => {
    const currentState = state;
    return currentState.data.messages;
  },
  // TODO: init() connect to rtdb
};

export default state;
