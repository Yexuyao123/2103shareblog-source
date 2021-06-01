import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementUI from "element-ui";
import {
  Dialog,
  Pagination,
  MenuItem,
  Input,
  Alert,
  Loading,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Message,
  Switch,
} from "element-ui";

import "@/assets/element-variables.scss";
// import "element-ui/lib/theme-chalk/index.css";

// Vue.use(ElementUI);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Loading);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Switch);

// Vue.use(Message);
// Message.install = function (Vue, options) {
//   Vue.prototype.$message = Message;
// };

Vue.prototype.$message = Message;

// 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
// 而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
// 此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。
// 大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
//false表示用于生产环境，vue不要给我提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
