<template>
  <div id="edit">
    <template v-if="haveGetMsg">
      <BlogEdit from="edit" :blogId="blogId"></BlogEdit>
    </template>
  </div>
</template>

<script>
import BlogEdit from "@/components/BlogEdit.vue";

export default {
  name: "Edit",
  components: { BlogEdit },
  data() {
    return {
      blogId: null,
      haveGetMsg: false,
    };
  },
  created() {
    this.blogId = this.$route.params.blogId;
    this.haveGetMsg = true;
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
#edit {
  width: 100%;
  height: 100%;
}
</style>
