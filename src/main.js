import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.headers.common["token"] = store.getters.getToken;
axios.defaults.headers.common["Content-Type"] = "application/json";
//axios.defaults.baseURL = "http://erdodo.serveftp.com/fungitu2_Simple/api/";
//axios.defaults.baseURL = "http://localhost:8888/api/";
axios.defaults.baseURL = "https://api.fungiturkey.org/api/";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

let app = createApp(App);
//app.config.globalProperties.ImgBase = "http://erdodo.serveftp.com/fungitu2_Simple/uploads/";
//app.config.globalProperties.ImgBase = "http://localhost:8888/uploads/";
app.config.globalProperties.ImgBase = "https://api.fungiturkey.org/uploads/";
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
