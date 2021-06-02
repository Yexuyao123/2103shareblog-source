<template>
  <div id="footer">
    <span class="not-select"
      >Copyright © 2020 - 2021 by 叶旭瑶 . All Rights Reserved </span
    >|
    <span class="not-select"> 技术支持：xiedaimala.com</span>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    // msg: String,
  },
};
</script>

<style lang="scss">
@import "../CSS/base.scss";

#footer {
  width: 100vw;
  //height: 60px;
  background-color: rgb(216, 216, 216);
  color: rgb(108, 113, 120);
  text-align: center;
  padding: 20px 0;
  span {
    font-size: $smallSize;
    line-height: 1.5;
  }
}
</style>
