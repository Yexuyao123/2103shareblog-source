<template>
  <div id="blogEdit">
    <div class="createTitle">
      <h1>创建文章</h1>
    </div>
    <div class="articleTitle">
      <h3>文章标题</h3>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="请输入文章标题,至少10个字符，且不超过100个字符"
      v-model="blogOpt.title"
      :maxlength="100"
      :minlength="30"
      show-word-limit
      @blur="checkInputContent(checkTitle, Error)"
      @focus="Error.title = false"
      :class="{ 'input-error': Error.title }"
    >
    </el-input>
    <div class="articleDescribe">
      <h3>内容简介</h3>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 5 }"
      placeholder="请输入文章简介,不少于30个字符"
      v-model="blogOpt.description"
      :maxlength="100"
      :minlength="30"
      show-word-limit
      @blur="checkInputContent(checkDescribe, Error)"
      @focus="Error.describe = false"
      :class="{ 'input-error': Error.describe }"
    >
    </el-input>
    <div class="articleContent">
      <h3>文章内容</h3>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 500 }"
      placeholder="请输入文章内容,不少于200个字符，且不超过1000个字符"
      v-model="blogOpt.content"
      :maxlength="1000"
      :minlength="200"
      show-word-limit
      @blur="checkInputContent(checkContent, Error)"
      @focus="Error.content = false"
      :class="{ 'input-error': Error.content }"
    >
    </el-input>
    <div class="switch">
      <span class="text-describe">是否展示到首页：</span>
      <span>
        <el-switch
          v-model="ifShow"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text=""
          :active-text="showInfo"
        >
        </el-switch>
      </span>
    </div>
    <div class="submit-button">
      <el-button size="middle" @click="submitArticle">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import { createBlog, updateBlog } from "@/api/blog.js";
import { getDetail } from "@/api/blog.js";
import {
  checkBlogTitle,
  checkBlogDescribe,
  checkBlogContent,
  loading,
} from "@/helpers/until.js";

export default {
  name: "BlogEdit",
  props: {
    from: { type: String },
    blogId: { type: Number || String || undefined },
  },
  components: {},
  data() {
    return {
      haveGetBlogMsg: null,
      blogOpt: {
        title: "",
        description: "",
        content: "",
        atIndex: this.ifShow,
      },
      ifShow: true,
      Error: {
        title: false,
        describe: false,
        content: false,
      },
    };
  },
  created() {
    if (this.from === "create") {
      this.haveGetBlogMsg = true;
    }
    if (this.from === "edit") {
      // console.log(this.blogId);
      this.getDetailData(this.blogId);
    }
  },
  computed: {
    showInfo() {
      return this.ifShow ? "是" : "否";
    },
    checkTitle() {
      return checkBlogTitle(this.blogOpt.title) || "";
    },
    checkDescribe() {
      return checkBlogDescribe(this.blogOpt.description) || "";
    },
    checkContent() {
      return checkBlogContent(this.blogOpt.content) || "";
    },
  },
  methods: {
    getDetailData(blogId) {
      const { close } = loading();
      getDetail(blogId)
        .then(
          (res) => {
            if (res.msg === "获取成功") {
              this.blogOpt.title = res.data.title;
              this.blogOpt.description = res.data.description;
              this.blogOpt.content = res.data.content;
            }
          },
          () => {}
        )
        .finally(() => {
          this.haveGetBlogMsg = true;
          close();
        });
    },
    submitEditBlog(options) {
      updateBlog({ blogId: this.blogId }, options).then(
        (res) => {
          if (res.status === "fail" && res.msg) {
            this.$message({ type: "error", message: res.msg, duration: 5000 });
          } else if (res.status === "ok" && res.msg) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5000,
            });
            this.$router.push({
              name: "Detail",
              params: { blogId: res.data["id"] },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    submitCreateBlog(options) {
      createBlog(options).then(
        (res) => {
          if (res.status === "fail" && res.msg) {
            this.$message({ type: "error", message: res.msg, duration: 5000 });
            if (/简介/.test(res.msg)) this.Error.describe = true;
            if (/内容/.test(res.msg)) this.Error.content = true;
            if (/标题/.test(res.msg)) this.Error.title = true;
          } else if (res.status === "ok" && res.msg) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5000,
            });
            this.$router.push({
              name: "Detail",
              params: { blogId: res.data["id"] },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    submitArticle() {
      if (!this.checkTitle && !this.checkDescribe && !this.checkContent) {
        if (this.from === "create") this.submitCreateBlog(this.blogOpt);
        if (this.from === "edit") this.submitEditBlog(this.blogOpt);
      }
    },
    checkInputContent(inputMsg, err) {
      if (inputMsg) {
        this.$message({ type: "error", message: inputMsg, duration: 5000 });
        if (/内容简要/.test(inputMsg)) err.describe = true;
        if (/博客内容/.test(inputMsg)) err.content = true;
        if (/博客标题/.test(inputMsg)) err.title = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
#blogEdit {
  width: 100%;
  height: 100%;
  margin: 5px 0;
  padding: 15px;
  background-color: $detailBlockBg;
  border-radius: 5px;
  box-sizing: border-box;
  border: #e5e8ea 1px solid;
  .createTitle {
    h1 {
      color: #333333;
      font-size: 28px;
      text-align: center;
      margin: 20px 0;
    }
  }
  div {
    h3 {
      color: #333333;
      margin: 20px 0 10px;
    }
  }
  .switch {
    .text-describe {
      margin-right: 5px;
    }
    span {
      font-size: $smallSize;
      color: #303133;
      line-height: 50px;
    }
  }
  .submit-button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .el-button {
      border-radius: 5px;
      color: $green !important;
    }
    .el-button:hover,
    .el-button:focus {
      color: $white !important;
      background-color: $green !important;
      border-color: $white !important;
    }
    .el-button:active {
      color: $green !important;
      border-color: $green !important;
    }
  }
  .input-error {
    box-sizing: border-box;
    border: 1px $red solid;
    border-radius: 3px;
  }
}
</style>
