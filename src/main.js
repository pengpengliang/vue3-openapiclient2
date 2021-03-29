/*
 * @Date: 2021-01-13 11:27:42
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import svgPlugin from "./plugins/svg";
import axios from "@/utils/http.js";
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import "element-plus/lib/theme-chalk/index.css";

if (!store.state.hasToken && location.pathname !== "/") {
  axios
    .get(
      "http://47.106.120.152:8080/apigateway/openapiservice/user/authenticatedCheck"
    )
    .then(() => {
      store.commit("changeToken", true);
    })
    .catch(error => {
      store.commit("changeToken", false);
      console.log(error);
    });
}
const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus,{ locale });
app.use(svgPlugin, {
  imports: []
});
app.mount("#app");
