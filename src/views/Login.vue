<template>
  <div id="login" class="flex-center">
    <LoginBlock msg="Login"></LoginBlock>
  </div>
</template>

<script>
import LoginBlock from "@/components/LoginAndRegister.vue";

export default {
  name: "Login",
  components: { LoginBlock },
  created() {
    if (this.$store.getters.isLogin) {
      //如果有从哪个页面来的信息，就回到该页面去
      this.$router.push(decodeURIComponent(this.$route.query.prevUrl || "/"));
    }
  },
};
</script>

<style lang="scss" scoped>
#login {
}
</style>
