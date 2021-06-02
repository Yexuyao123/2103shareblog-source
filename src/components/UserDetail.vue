<template>
  <div class="user-detail">
    <template v-if="haveGetUserData">
      <div class="user-detail">
        <div class="about-user clearfix">
          <div class="author-picture">
            <img
              :src="userDetail['avatar']"
              alt="作者头像"
              :title="userDetail['username']"
            />
          </div>
          <div class="author-name-and-recent-create">
            <h3 class="author-name">{{ userDetail["username"] }}</h3>
            <span class="create-time"
              >注册于：{{ creatTime(userDetail["createdAt"]) + " " }}</span
            >
            <span>|</span>
            <span class="create-time">
              最后发表：{{ creatTime(userDetail["updatedAt"]) }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { countDayTime } from "@/helpers/until.js";

export default {
  name: "UserDetail",
  props: { userDetail: { type: Object } },
  data() {
    return {
      haveGetUserData: null,
    };
  },
  created() {
    this.haveGetUserData = false;
    this.checkGetData();
  },
  methods: {
    checkGetData() {
      if (this.userDetail) {
        this.haveGetUserData = true;
      }
    },
    creatTime(time) {
      return countDayTime(time);
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";
.user-detail {
  .user-detail {
    .about-user {
      display: flex;
      border-bottom: 1px solid #e5e8ea;
      padding-bottom: 10px;
      .author-picture {
        float: left;
        img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
          box-sizing: border-box;
          border: #e5e8ea 1px solid;
          margin-right: 20px;
        }
      }
      .author-name-and-recent-create {
        float: left;
        .author-name {
          color: #404040;
          font-size: 20px;
          padding: 10px;
        }
        span {
          color: #969696;
          font-size: 14px;
        }
        .create-time {
          padding: 10px;
        }
      }
    }
  }
}
</style>
