import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    profile: "",
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
      localStorage.setItem("token", data);
    },
    setProfile(state, data) {
      state.profile = data;
      localStorage.setItem("profile", data);
    },
  },
  actions: {},
  getters: {
    getToken(state) {
      state.token = localStorage.getItem("token");
      return state.token;
    },
    getProfile(state) {
      state.profile = JSON.parse(localStorage.getItem("profile"));
      return state.profile;
    },
  },
});
