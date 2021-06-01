<template>
  <div id="nav" v-if="userMsg">
    <div class="main clearfix">
      <router-link :to="{ name: 'Home' }">
        <h1 class="flex-center">LET'S SHARE</h1>
      </router-link>
      <span class="user-img flex-center">
        <ElMenu>
          <img class="active-avatar" :src="userMsg" alt="" />
        </ElMenu>
      </span>
      <router-link :to="{ name: 'Create' }">
        <span class="add-article flex-center">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shuxie"></use>
          </svg>
          <span>写博客</span>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import "../helpers/font_2476494_41gi9ioesqm.js";
import ElMenu from "@/components/ElMenu.vue";

export default {
  name: "Nav",
  components: { ElMenu },
  props: {
    userMsg: String,
  },
  data() {
    return {
      avatarIsActive: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#nav {
  width: 100vw;
  height: 70px;
  background-color: $green;
  color: white;
  text-align: center;
  display: grid;
  grid-template-columns: 12% 1fr 12%;
  grid-template-areas: ". main .";
  .main {
    grid-area: main;
    h1 {
      font-size: 45px;
      float: left;
      height: 100%;
    }
    .add-article {
      font-size: 25px;
      float: right;
      height: 100%;
      .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: white;
        overflow: hidden;
        padding-right: 5px;
      }
      span {
        padding-right: 12px;
        font-size: 20px;
      }
    }
    .user-img {
      float: right;
      height: 100%;
      img {
        height: 40px;
        width: 40px;
        box-sizing: border-box;
        border-radius: 20px;
        border: #999999 1px solid;
        margin-left: 10px;
      }
    }
  }
}
</style>
