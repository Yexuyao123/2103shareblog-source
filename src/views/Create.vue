<template>
  <div id="create">
    <BlogEdit from="create"></BlogEdit>
  </div>
</template>

<script>
import BlogEdit from "@/components/BlogEdit.vue";

export default {
  name: "Create",
  components: { BlogEdit },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
#create {
  width: 100%;
  height: 100%;
}
</style>
