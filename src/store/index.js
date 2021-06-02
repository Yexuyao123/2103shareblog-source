import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const PAGES_WITHOUT_LOGIN = 3;
const PAGES_WITH_LOGIN = 5;

export default new Vuex.Store({
  state: {
    isLogin: null,
    userName: null,
  },
  mutations: {
    saveLoginState(state, param) {
      state.isLogin = param.isLogin;
      state.userName = param.username;
    },
  },
  getters: {
    homeShowBlogPage(state) {
      return state.isLogin ? PAGES_WITH_LOGIN : PAGES_WITHOUT_LOGIN;
    },
    isLogin(state) {
      return state.isLogin;
    },
    userName(state) {
      return state.userName;
    },
  },
  actions: {},
  modules: {},
});
