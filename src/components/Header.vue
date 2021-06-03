<template>
  <div id="header">
    <h1 class="not-select">LET'S SHARE</h1>
    <span class="not-select">精品博客汇聚</span>
    <div class="button">
      <el-button size="small" @click="changeView('Login', 'login')"
        >立即登录</el-button
      >
      <el-button size="small" @click="changeView('Register', 'register')"
        >注册账号</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      currentView: "",
    };
  },
  methods: {
    changeView(name, route) {
      this.currentView = this.$route.meta.currentView || "";
      if (this.currentView !== name) {
        this.$router.push("/" + route);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#header {
  width: 100%;
  height: 320px;
  background-color: $green;
  color: white;
  text-align: center;
  h1 {
    font-size: 60px;
    padding: 70px 0 50px;
  }
  span {
    font-size: $largeSize;
    font-weight: 500;
  }
  .button {
    margin-top: 30px;
    .head-el-button {
      margin: 0 10px;
      border-radius: 5px;
      color: $green !important;
      span {
        font-size: 18px !important;
        //font-weight: bold;
      }
    }
    .el-button:hover,
    .el-button:focus {
      color: $white !important;
      background-color: $green !important;
      border-color: $white !important;
    }
    .el-button:active {
      color: $green !important;
      border-color: $green !important;
    }
  }
}
</style>
