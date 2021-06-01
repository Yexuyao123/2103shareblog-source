<template>
  <div id="detail">
    <template v-if="haveGetBlogData">
      <template v-if="successGot">
        <div class="blog-detail">
          <h1>{{ blogDetail.title }}</h1>
          <div class="about-blog clearfix">
            <div class="author-picture">
              <router-link
                :to="{
                  path: '/user/' + blogDetail.user['id'],
                  query: { userName: blogDetail.user['username'], blogId },
                }"
              >
                <img
                  :src="blogDetail.user['avatar']"
                  alt=""
                  @error.once="noFind"
                  :title="blogDetail.user['username']"
                />
              </router-link>
            </div>
            <div class="author-name-and-create-time">
              <h3 class="author-name">
                <router-link
                  :to="{
                    path: '/user/' + blogDetail.user['id'],
                    query: { userName: blogDetail.user['username'], blogId },
                  }"
                >
                  {{ blogDetail.user["username"] }}
                </router-link>
              </h3>
              <span class="create-time"
                >发表于：{{ creatTime(blogDetail["createdAt"]) }}</span
              >
            </div>
          </div>
          <div class="blog-content markdown-body" v-html="markdown"></div>
        </div>
      </template>
      <template v-if="!successGot">
        <div class="blog-detail">
          <h1>该博客不存在或已被删除……</h1>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { getDetail } from "@/api/blog.js";
import { translateTime, loading } from "@/helpers/until.js";
import vipGif from "@/assets/qzone-vip.gif";
import errorImgUrl from "@/assets/logo.png";
import marked from "marked";

export default {
  name: "Detail",
  components: {},
  data() {
    return {
      vipGif,
      errorImg: errorImgUrl,
      haveGetBlogData: null,
      blogId: null,
      blogDetail: null,
      successGot: null,
    };
  },
  created() {
    this.haveGetBlogData = false;
    this.blogId = this.$route.params.blogId;
    this.getDetailData(this.blogId);
  },
  computed: {
    markdown() {
      return marked(this.blogDetail.content);
    },
  },
  methods: {
    getDetailData(blogId) {
      const { close } = loading();
      getDetail(blogId)
        .then(
          (res) => {
            if (res.msg === "获取成功") {
              this.blogDetail = res.data;
              this.successGot = true;
            } else {
              this.successGot = false;
            }
          },
          () => {
            this.successGot = false;
          }
        )
        .finally(() => {
          this.haveGetBlogData = true;
          close();
        });
    },
    noFind: function (e) {
      //这个监听函数如果用箭头函数this指向会丢失
      const img = e.target;
      img.src = this.errorImg;
    },
    creatTime(time) {
      return translateTime(time).total;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
@import url("../assets/github-markdown.scss");
#detail {
  width: 100%;
  height: 100%;
  margin: 5px 0;
  .blog-detail {
    box-sizing: border-box;
    border: #e5e8ea 1px solid;
    height: 100%;
    grid-area: main;
    padding: 15px;
    background-color: $detailBlockBg;
    border-radius: 5px;
    h1 {
      color: #24292e;
      font-size: 35px;
      line-height: 50px;
      margin-bottom: 10px;
      word-break: break-word;
    }
    .about-blog {
      display: flex;
      border-bottom: 1px solid #e5e8ea;
      padding-bottom: 10px;
      .author-picture {
        float: left;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          box-sizing: border-box;
          border: #e5e8ea 1px solid;
          margin-right: 10px;
        }
        img:hover {
          box-shadow: 0 -2px 10px #00000015;
        }
      }
      .author-name-and-create-time {
        float: left;
        .author-name {
          color: #404040;
          font-size: 16px;
          padding-bottom: 6px;
        }
        .author-name:hover {
          color: $green;
          text-decoration: underline;
        }
        .create-time {
          color: #969696;
          font-size: 13px;
        }
      }
    }
    .blog-content {
      padding: 10px 0;
      word-break: break-all;
      text-align: justify;
    }
  }
}
</style>
