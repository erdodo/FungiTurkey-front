import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.headers.common["token"] = "001";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://localhost:8888/api/";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

let app = createApp(App);
app.config.globalProperties.ImgBase = "http://localhost:8888/uploads/";
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
