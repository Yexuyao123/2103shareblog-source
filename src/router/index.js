import Vue from "vue";
import VueRouter from "vue-router";
import { cancelHttp } from "@/helpers/request.js";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      currentView: "Login",
      title: "账号登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: {
      currentView: "Register",
      title: "注册账号",
    },
  },
  {
    path: "/user/:userId",
    name: "User",
    component: () => import("@/views/User.vue"),
    //路由元信息
    meta: {
      mustLogin: true,
      title: "用户详情",
    },
  },
  {
    path: "/detail/:blogId",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),
    meta: {
      mustLogin: true,
      title: "博客详情",
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/Create.vue"),
    meta: {
      mustLogin: true,
      title: "创建博客",
    },
  },
  {
    path: "/edit/:blogId",
    name: "Edit",
    component: () => import("@/views/Edit.vue"),
    meta: {
      mustLogin: true,
      title: "编辑博客",
    },
  },
  {
    path: "/my/:myName",
    name: "My",
    component: () => import("@/views/My.vue"),
    meta: {
      mustLogin: true,
      title: "我的主页",
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title === "用户详情") {
    document.title = to.query.userName + "的主页" || "用户详情";
  } else {
    document.title = to.meta.title || "个人博客";
  }
  if (to.meta.mustLogin) {
    if (!store.getters.isLogin) {
      next({
        name: "Login",
        query: { prevUrl: encodeURIComponent(to.fullPath) },
      });
    } else {
      next();
    }
  }
  if (to.name !== from.name) {
    //切换页面前移除未完成请求
    cancelHttp();
    next();
  } else {
    next();
  }
});

export default router;
