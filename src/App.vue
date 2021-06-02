<template>
  <div id="app">
    <template v-if="haveCheckLoginStatus">
      <header>
        <Header v-if="!isLogin"></Header>
        <Nav v-if="isLogin" :userMsg="userAvatar"></Nav>
      </header>
      <main>
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
    this.checkLogin();
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
          if (
            !this.isLogin &&
            this.$route.name !== "Login" &&
            this.$route.name !== "Register"
          ) {
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
      if (to.name !== from.name && from.name !== null) {
        this.haveCheckLoginStatus = false;
        this.checkLogin();
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
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 12vw 76vw 12vw;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 10px;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";
  header {
    grid-area: header;
  }
  main {
    box-sizing: border-box;
    max-width: 76vw;
    grid-area: main;
  }
  footer {
    grid-area: footer;
  }
}
</style>
