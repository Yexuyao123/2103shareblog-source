<template>
  <div id="header">
    <h1>LET'S SHARE</h1>
    <span>精品博客汇聚</span>
    <div class="button">
      <el-button size="small" @click="changeViewToLogin">立即登录</el-button>
      <el-button size="small" @click="changeViewToCreate">注册账号</el-button>
    </div>
  </div>
</template>

<script>
// import { register } from "@/api/auth.js";

export default {
  name: "Header",
  data() {
    return {
      currentView: "",
    };
  },
  methods: {
    changeViewToLogin() {
      this.currentView = this.$route.meta.currentView || "";
      if (this.currentView !== "Login") {
        this.$router.push("/login");
      }
    },
    changeViewToCreate() {
      this.currentView = this.$route.meta.currentView || "";
      if (this.currentView !== "Register") {
        this.$router.push("/register");
      }
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#header {
  width: 100vw;
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
