import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

let app = createApp(App);
const mode = ""; //"test";
if (mode == "test") {
  let api = "https://api2.fungiturkey.org/";
  app.config.globalProperties.fungi = "fungitu2_test_fungiturkey";
  app.config.globalProperties.simple = "fungitu2_test_Simple";
  app.config.globalProperties.ImgBase = api + "uploads/";
  app.config.globalProperties.api = api;
} else {
  let api = "https://api.fungiturkey.org/";
  app.config.globalProperties.fungi = "fungitu2_fungiturkey";
  app.config.globalProperties.simple = "fungitu2_Simple";
  app.config.globalProperties.ImgBase = api + "uploads/";
  app.config.globalProperties.api = api;
}

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
