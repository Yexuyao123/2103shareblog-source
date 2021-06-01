<template>
  <div id="app">
    <template v-if="haveCheckLoginStatus">
      <header>
        <Header v-if="!isLogin"></Header>
        <Nav v-if="isLogin" :userMsg="userAvatar"></Nav>
      </header>
      <main class="flex-top-center">
        <router-view />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </template>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import { getInfo } from "@/api/auth.js";
import { loading } from "@/helpers/until.js";

export default {
  name: "Home",
  components: { Header, Nav, Footer },
  data() {
    return {
      isLogin: null,
      haveCheckLoginStatus: false,
      userName: null,
      userAvatar: "",
    };
  },
  created() {
    this.isLogin = null;
    this.haveCheckLoginStatus = false;
    this.userName = null;
    this.userAvatar = "";
    this.checkLogin();
    // console.log("created时验证完成");
  },
  methods: {
    checkLogin() {
      const { close } = loading();
      getInfo()
        .then(
          (res) => {
            this.isLogin = !!res.isLogin;
            this.userName = this.isLogin ? res.data.username : null;
            this.userAvatar = this.isLogin ? res.data["avatar"] : "";
          },
          (err) => {
            console.log(err);
          }
        )
        .catch(() => {})
        .finally(() => {
          this.haveCheckLoginStatus = true;
          if (!this.isLogin) {
            const tip =
              this.$route.name === "Register" ? "注册账号" : "请先登录";
            this.$message({ type: "error", message: tip, duration: 5000 });
          }
          close();
        });
    },
  },
  watch: {
    $route(to, from) {
      // console.log(from);
      if (to.name !== from.name && from.name !== null) {
        //确保不是第一次进来，from=null
        // console.log("路由变化了;");
        this.haveCheckLoginStatus = false;
        // this.isLogin = false;
        // this.userName = null;
        // this.userAvatar = "";
        this.checkLogin();
        // console.log("路由变化验证完成");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./src/css/common.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 12% 76% 12%;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 10px;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";
  header {
    grid-area: header;
    //position: fixed;
    //margin-bottom: 5px;
  }
  main {
    grid-area: main;
    //box-sizing: border-box;
    //border: #6f42c1 1px solid;
  }
  footer {
    grid-area: footer;
  }
}
</style>
