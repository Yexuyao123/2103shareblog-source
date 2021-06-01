<template>
  <div id="my">
    <template v-if="haveGetMyMsg">
      <UserDetail :userDetail="myDetail"></UserDetail>
    </template>
    <template v-if="isLogin">
      <!--      todo:所有的list都完善下总页数-->
      <UserBlogList :userId="myId"></UserBlogList>
    </template>
  </div>
</template>

<script>
import UserDetail from "@/components/UserDetail.vue";
import UserBlogList from "@/components/UserBlogList.vue";
import { getInfo } from "@/api/auth.js";

export default {
  name: "My",
  components: { UserDetail, UserBlogList },
  data() {
    return {
      isLogin: null,
      myId: null,
      myDetail: {
        avatar: null,
        username: null,
        createdAt: null,
        updatedAt: null,
      },
      haveGetMyMsg: false,
    };
  },
  created() {
    this.isLogin = null;
    this.haveGetMyMsg = false;
    this.checkLogin();
    this.haveGetMyMsg = true;
  },
  methods: {
    checkLogin() {
      getInfo().then(
        (res) => {
          this.isLogin = !!res.isLogin;
          if (this.isLogin) {
            this.myId = res.data["id"].toString();
            this.myDetail = { ...res.data };
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
#my {
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
