<template>
  <div class="user-blog-list">
    <template v-if="haveGetUserBlog">
      <template v-if="successGot">
        <ul class="blog-list">
          <li
            class="list-item clearfix"
            v-for="item in userBlogDetail"
            :key="getSymbol(item.id)"
          >
            <BlogItem :itemDetail="item"></BlogItem>
          </li>
        </ul>
      </template>
      <template v-if="!successGot">
        <div class="user-detail">
          <h1>这个家伙有点懒，尚未发表文章……</h1>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { getBlogsByUserId } from "@/api/blog.js";
import { translateTime, getSymbol, loading } from "@/helpers/until.js";
import BlogItem from "@/components/BlogItem.vue";

export default {
  name: "UserBlogList",
  components: { BlogItem },
  props: { userId: { type: String } },
  data() {
    return {
      haveGetUserBlog: null,
      userBlogDetail: null,
      successGot: null,
    };
  },
  created() {
    this.haveGetUserBlog = false;
    this.getUserData(this.userId);
  },
  methods: {
    getUserData(userId) {
      const { close } = loading();
      getBlogsByUserId(userId)
        .then(
          (res) => {
            if (res.msg === "获取成功") {
              this.userBlogDetail = res.data;
              this.successGot = this.userBlogDetail.length > 0;
            } else {
              this.successGot = false;
            }
          },
          () => {
            this.successGot = false;
          }
        )
        .finally(() => {
          this.haveGetUserBlog = true;
          close();
        });
    },
    getSymbol,
    creatTime(time) {
      return translateTime(time);
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";
.user-blog-list {
  .blog-list {
    .list-item {
      border-bottom: 1px solid #e5e8ea;
    }
  }
  .user-detail {
    line-height: 64px;
    font-size: $largeSize;
    font-weight: bold;
    padding: 0 5px;
    word-break: break-word;
    text-align: justify;
  }
}
</style>
