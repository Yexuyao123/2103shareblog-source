<template>
  <div id="elMenu">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <slot></slot>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="toMy">我的主页</el-dropdown-item>
        <el-dropdown-item command="toCancel">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/api/auth.js";
import store from "@/store";

export default {
  name: "ElMenu",
  methods: {
    cancelLogin() {
      logout()
        .then((res) => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 5000,
          });
          if (res.status === "ok") {
            store.commit("saveLoginState", { isLogin: false });
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCommand(command) {
      if (command === "toCancel") {
        this.cancelLogin();
      } else if (command === "toMy") {
        this.$router.push({
          path: "/my/" + store.getters.userName,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#elMenu {
}
.el-dropdown-menu__item:not(.is-disabled):hover,
.el-dropdown-menu__item:focus {
  background-color: $shadowGreen !important;
  color: $green !important;
}
</style>
