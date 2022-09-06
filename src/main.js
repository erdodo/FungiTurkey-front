import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
