<template>
  <div id="home">
    <BlogList v-if="hasGetPage" class="main" :page="page"></BlogList>
  </div>
</template>

<script>
import BlogList from "@/components/BlogList.vue";

export default {
  name: "Home",
  components: { BlogList },
  data() {
    return {
      isLogin: null,
      page: 3,
      hasGetPage: false,
    };
  },
  methods: {},
  created() {
    this.isLogin = this.$store.getters.isLogin;
    this.page = +this.$store.getters.homeShowBlogPage;
    this.hasGetPage = true;
  },
};
</script>

<style lang="scss" scoped>
#home {
  .main {
    width: 100%;
  }
}
</style>
