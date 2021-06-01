<template>
  <div id="user">
    <template v-if="haveGetUserMsg">
      <UserDetail :userDetail="userDetail"></UserDetail>
    </template>
    <template v-if="userId">
      <UserBlogList :userId="userId"></UserBlogList>
    </template>
  </div>
</template>

<script>
import { getDetail } from "@/api/blog.js";
import UserDetail from "@/components/UserDetail.vue";
import UserBlogList from "@/components/UserBlogList.vue";
import { loading } from "@/helpers/until.js";

export default {
  name: "User",
  components: { UserDetail, UserBlogList },
  data() {
    return {
      userId: null,
      userDetail: {
        avatar: null,
        username: null,
        createdAt: null,
        updatedAt: null,
      },
      haveGetUserMsg: false,
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.getDetailData(this.$route.query.blogId);
  },
  methods: {
    getDetailData(blogId) {
      const { close } = loading();
      getDetail(blogId)
        .then(
          (res) => {
            if (res.msg === "获取成功") {
              this.userDetail = { ...res.data.user };
            }
          },
          () => {}
        )
        .finally(() => {
          this.haveGetUserMsg = true;
          close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
#user {
  width: 100%;
  height: 100%;
  margin: 5px 0;
  padding: 15px;
  background-color: $detailBlockBg;
  border-radius: 5px;
  box-sizing: border-box;
  border: #e5e8ea 1px solid;
}
</style>
