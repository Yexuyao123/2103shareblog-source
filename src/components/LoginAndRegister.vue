<template>
  <div id="loginBlock">
    <div class="login-title flex-center font-size-l">
      <span>{{ showInfo.title }}</span>
    </div>
    <span class="name flex-center font-size-m">用户名</span>
    <el-input
      class="name-input flex-center font-size-l"
      placeholder="请输入用户名"
      :maxlength="15"
      :minlength="1"
      :show-word-limit="true"
      v-model="userName.username"
      clearable
      @blur="checkInputContent(checkName, userName)"
      @focus="userName.error = false"
      :class="{ 'input-error': userName.error }"
      @keyup.enter.native="showInfo.method"
    >
    </el-input>
    <span class="password flex-center font-size-m">密码</span>
    <el-input
      class="password-input flex-center"
      placeholder="请输入密码"
      :maxlength="16"
      :minlength="6"
      :show-word-limit="true"
      v-model="userPassword.password"
      show-password
      @blur="checkInputContent(checkPassword, userPassword)"
      @focus="userPassword.error = false"
      :class="{ 'input-error': userPassword.error }"
      @keyup.enter.native="showInfo.method"
    ></el-input>
    <div class="login-button flex-center">
      <el-button
        class="login-el-button"
        size="medium"
        @click="showInfo.method"
        >{{ showInfo.action }}</el-button
      >
    </div>
    <div v-if="showInfo.status === 'Login'" class="login-tip flex-center">
      <span class="font-size-s gray">没有账号？</span>
      <router-link class="font-size-s green" to="/register"
        >注册新用户</router-link
      >
    </div>
    <div v-if="showInfo.status === 'Register'" class="login-tip flex-center">
      <span class="font-size-s gray">已有账号？</span>
      <router-link class="font-size-s green" to="/login">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/auth.js";
import { checkUsername, checkUserPassword } from "@/helpers/until.js";
// 事件名称	说明	回调参数
// blur	在 Input 失去焦点时触发	(event: Event)
// focus	在 Input 获得焦点时触发	(event: Event)
// change	仅在输入框失去焦点或用户按下回车时触发	(value: string | number)
// input	在 Input 值改变时触发	(value: string | number)
// clear	在点击由 clearable 属性生成的清空按钮时触发
export default {
  name: "LoginBlock",
  props: { msg: { type: String } },
  data() {
    return {
      userName: {
        username: "",
        error: false,
      },
      userPassword: {
        password: "",
        error: false,
      },
      showInfo: {
        status: null,
        title: null,
        action: null,
        method: null,
      },
    };
  },
  created() {
    if (this.msg === "Login")
      this.showInfo = {
        status: "Login",
        title: "账号密码登录",
        action: "立即登录",
        method: this.loginAccount,
      };
    if (this.msg === "Register")
      this.showInfo = {
        status: "Register",
        title: "注册账号",
        action: "立即注册",
        method: this.registerCount,
      };
  },
  computed: {
    checkName() {
      return checkUsername(this.userName.username) || "";
    },
    checkPassword() {
      return checkUserPassword(this.userPassword.password) || "";
    },
  },
  methods: {
    loginAccount() {
      if (!this.checkName && !this.checkPassword) {
        login({
          username: this.userName.username,
          password: this.userPassword.password,
        })
          .then((res) => {
            if (res.status === "ok") {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5000,
              });
              location.reload();
            } else if (res.status === "fail") {
              this.$message({
                type: "error",
                message: res.msg,
                duration: 5000,
              });
              if (/用户/.test(res.msg)) this.userName.error = true;
              if (/密码/.test(res.msg)) this.userPassword.error = true;
            }
          })
          .catch(() => {});
      }
    },
    registerCount() {
      if (!this.checkName && !this.checkPassword) {
        register({
          username: this.userName.username,
          password: this.userPassword.password,
        })
          .then((res) => {
            if (res.status === "ok") {
              this.$router.push("/");
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5000,
              });
            } else if (res.status === "fail") {
              this.$message({
                type: "error",
                message: res.msg,
                duration: 5000,
              });
              if (/用户/.test(res.msg)) this.userName.error = true;
              if (/密码/.test(res.msg)) this.userPassword.error = true;
            }
          })
          .catch(() => {});
      }
    },
    checkInputContent(inputMsg, msg) {
      if (inputMsg) {
        this.$message({ type: "error", message: inputMsg, duration: 5000 });
        msg.error = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#loginBlock {
  width: 550px;
  padding: 20px;
  margin-top: 20px;
  background-color: $white;
  color: black;
  border: $shadowGray 1px solid;
  border-radius: 5px;
  display: grid;
  grid: auto auto auto auto auto/12% 1fr;
  grid-gap: 20px;
  .login-title {
    grid-column: 1 / span 2;
    grid-row: 1/2;
    padding: 10px 0;
  }
  .name {
    grid-column: 1/2;
    grid-row: 2/3;
  }
  .el-input {
    background-color: $white;
  }
  .name-input {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .password {
    grid-column: 1/2;
    grid-row: 3/4;
  }
  .password-input {
    grid-column: 2/3;
    grid-row: 3/4;
  }
  .login-button {
    grid-column: 1 / span 2;
    grid-row: 4/5;
    .login-el-button {
      margin: 5px 10px;
      border-radius: 5px;
      color: $green !important;
    }
    .login-el-button:hover {
      color: $white !important;
      background-color: $green;
      //font-weight: bold;
    }
  }
  .login-tip {
    grid-column: 1 / span 2;
    grid-row: 5/6;
  }
}
</style>
