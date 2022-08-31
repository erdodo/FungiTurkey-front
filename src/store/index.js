import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
      localStorage.setItem("token", data);
    },
  },
  actions: {},
  getters: {
    getToken(state) {
      state.token = localStorage.getItem("token");
      return state.token;
    },
  },
});
