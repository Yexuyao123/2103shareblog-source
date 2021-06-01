<template>
  <div id="register" class="flex-center" ref="register">
    <RegisterBlock msg="Register"></RegisterBlock>
  </div>
</template>

<script>
import RegisterBlock from "@/components/LoginAndRegister.vue";

export default {
  name: "Register",
  components: { RegisterBlock },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#register {
}
</style>
