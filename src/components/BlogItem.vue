<template>
  <div class="blog-item">
    <template v-if="haveGetUserBlog">
      <div class="public-time float-left">
        <div class="created-day">
          {{ creatTime(item["createdAt"]).day }}
        </div>
        <div class="created-month">
          {{ creatTime(item["createdAt"]).month }}月
        </div>
        <div class="created-year">
          {{ creatTime(item["createdAt"]).year }}
        </div>
      </div>
      <div class="blog-detail float-left">
        <div class="article-title ellipsis-1">
          <router-link :to="{ name: 'Detail', params: { blogId: item['id'] } }">
            <span>{{ item.title }}</span>
          </router-link>
        </div>
        <div class="article-description ellipsis-3">
          <span>{{ item.description }}</span>
        </div>
        <div class="edit-able" v-if="editAble">
          <router-link :to="{ name: 'Edit', params: { blogId: item['id'] } }">
            <span>编辑</span>
          </router-link>
          <span @click="dialogVisible = true">删除</span>
        </div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30vw"
        :before-close="handleClose"
      >
        <span>是否确定删除此文章</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="deleteCurrentBlog({ blogId: item['id'] })"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { translateTime } from "@/helpers/until.js";
import { deleteBlog } from "@/api/blog.js";
import store from "@/store";

export default {
  name: "BlogItem",
  props: { itemDetail: { type: Object } },
  data() {
    return {
      haveGetUserBlog: null,
      item: null,
      editAble: null,
      dialogVisible: false,
    };
  },
  created() {
    this.haveGetUserBlog = false;
    this.editAble = this.$route.name === "My";
    this.getItem();
  },
  methods: {
    creatTime(time) {
      return translateTime(time);
    },
    getItem() {
      this.item = this.itemDetail;
      this.haveGetUserBlog = true;
    },
    deleteCurrentBlog(blogIdObj) {
      console.log(this.dialogVisible);
      this.dialogVisible = false;
      deleteBlog(blogIdObj).then(
        (res) => {
          if (res.status === "fail" && res.msg) {
            this.$message({ type: "error", message: res.msg, duration: 5000 });
          } else if (res.status === "ok" && res.msg) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5000,
            });
            if (this.$route.name === "My") {
              location.reload();
            } else {
              this.$router.push({
                path: "/my/" + store.getters.userName,
              });
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";
.blog-item {
  width: 100%;
  display: flex;
  padding: 10px 0;
  .public-time {
    color: #999999;
    margin: 0 15px;
    .created-day {
      font-size: 40px;
      line-height: 64px;
      text-align: center;
    }
    .created-month {
      font-size: $smallSize;
      line-height: 1.6;
      text-align: center;
    }
    .created-year {
      font-size: $smallSize;
      line-height: 1.6;
      text-align: center;
    }
  }
  .blog-detail {
    color: #333333;
    margin-right: 15px;
    padding: 0 5px;
    .article-title {
      line-height: 64px;
      font-size: $largeSize;
      font-weight: bold;
      word-break: break-word;
      text-align: justify;
    }
    .article-title:hover {
      color: $green;
      text-decoration: underline;
    }
    .article-description {
      line-height: 1.4;
      font-size: $smallSize;
      margin-bottom: 15px;
      word-break: break-word;
      text-align: justify;
    }
    .edit-able {
      span {
        line-height: 1.4;
        font-size: $smallSize;
        padding: 0 8px 10px 0;
        color: $green;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
