interface State {
  data: any;
  listeners: any;
  setUser: any;
  setNewMessage: any;
  getUser: any;
  getMessages: any;
}
const state: State = {
  data: {
    userAdmin: "",
  },
  getUser: () => {
    return state.data.userAdmin;
  },
  listeners: () => {},
  setUser: (username: string) => {
    state.data.userAdmin = username;
  },
  setNewMessage: () => {},
  getMessages: () => {},
};

export default state;
