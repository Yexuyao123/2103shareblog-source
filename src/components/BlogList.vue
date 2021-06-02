<template>
  <div id="blog-list" v-if="blogItems">
    <div class="all-blog">
      <ul class="blog-list">
        <li
          class="blog-item"
          v-for="item in blogItems"
          :key="getSymbol(item.id)"
        >
          <div class="user-photo">
            <router-link
              :to="{
                path: '/user/' + item.user['id'],
                query: { userName: item.user['username'], blogId: item.id },
              }"
            >
              <img
                :src="item.user['avatar']"
                alt=""
                @error.once="noFind"
                :title="item.user['username']"
              />
            </router-link>
          </div>
          <div class="author-content">
            <div class="article-author">
              <span class="author-name">
                <router-link
                  :to="{
                    path: '/user/' + item.user['id'],
                    query: { userName: item.user['username'], blogId: item.id },
                  }"
                >
                  {{ item.user["username"] }}
                </router-link>
              </span>
              <span>
                <img :src="vipGif" alt="" />
              </span>
              <span class="public-time">{{
                countDayTime(item["updatedAt"])
              }}</span>
            </div>
            <div class="article-title ellipsis-1">
              <router-link
                :to="{
                  name: 'Detail',
                  params: {
                    blogId: item['id'],
                  },
                }"
              >
                <span>{{ item.title }}</span>
              </router-link>
            </div>
            <div class="article-description ellipsis-3">
              <span>{{ item.description }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="blog-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="20"
        :total="total"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  countDayTime,
  getSymbol,
  smoothlyToTop,
  loading,
} from "@/helpers/until.js";
import errorImgUrl from "@/assets/logo.png";
import vipGif from "@/assets/qzone-vip.gif";
import { getBlogs } from "@/api/blog.js";

export default {
  name: "BlogList",
  props: { page: { type: Number } },
  data() {
    return {
      blogItems: null,
      errorImg: errorImgUrl,
      vipGif,
      currentPage: this.$route.query.page || 1,
    };
  },
  created() {
    this.getBlogList(this.currentPage);
  },
  computed: {
    total() {
      return this.page * 20;
    },
  },
  methods: {
    getSymbol,
    countDayTime,
    getBlogList(currentPage) {
      const { close } = loading();
      getBlogs({ page: currentPage })
        .then((res) => {
          // console.log(res.data);
          this.blogItems = res.data;
          close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    noFind: function (e) {
      //这个监听函数如果用箭头函数this指向会丢失
      const img = e.target;
      img.src = this.errorImg;
    },
    changePage: function (e) {
      this.currentPage = e;
      this.getBlogList(this.currentPage);
      this.$router.push({
        name: "Home",
        query: { page: e },
      });
      smoothlyToTop();
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#blog-list {
  box-sizing: border-box;
  width: 100%;
  background-color: $white;
  border-radius: 3px;
  color: #333333;
  overflow: hidden;
  margin-bottom: 10px;
  .all-blog {
    box-sizing: border-box;
    width: 100%;
    .blog-list {
      box-sizing: border-box;
      width: 100%;
      .blog-item {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        border-bottom: 1px solid #33333320;
        display: flex;
        .user-photo {
          width: 72px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            box-sizing: border-box;
            border: 1px solid #33333320;
            margin: 5px 12px 5px 0;
          }
          img:hover {
            box-shadow: 0 -2px 10px #00000015;
          }
        }
        .author-content {
          flex: 1;
          box-sizing: border-box;
          width: 100%;
          .article-author {
            padding-bottom: 5px;
            .author-name {
              font-size: 14px;
              color: #26709a;
              padding: 0 5px;
            }
            .author-name:hover {
              color: $green;
              text-decoration: underline;
            }
            span {
              img {
                width: 14px;
                height: 12px;
              }
            }
            .public-time {
              font-size: 12px;
              color: #9b9b9b;
              padding: 5px 5px;
            }
          }
          .article-title {
            line-height: 1.4;
            font-size: $mediumSize;
            font-weight: bold;
            padding: 0 5px;
            margin-bottom: 8px;
            word-break: break-all;
          }
          .article-title:hover {
            color: $green;
            text-decoration: underline;
          }
          .article-description {
            //box-sizing: border-box;
            //border: #6f42c1 1px solid;
            line-height: 1.4;
            font-size: $smallSize;
            padding: 0 5px;
            margin-bottom: 5px;
            word-break: break-all;
          }
        }
      }
    }
  }
  .blog-pagination {
    margin-top: 20px;
    .el-pagination {
      .el-pager {
        li:not(.active):hover {
          color: $green;
        }
        li.active {
          background-color: $green;
        }
      }
    }
  }
}
</style>
