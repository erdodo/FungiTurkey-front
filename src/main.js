import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.headers.common["token"] = 0; //localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://erdodo.serveftp.com/Simple/api/";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

let app = createApp(App);
app.config.globalProperties.ImgBase = "http://erdodo.serveftp.com/Simple/uploads/";
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
