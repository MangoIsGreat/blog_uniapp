<template>
  <view>
    <view class="top"></view>
    <scroll-view class="scroll-view_H" scroll-x="true">
      <view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
      <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
      <view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.top {
  height: 30px;
  width: 100%;
}

.scroll-view_H {
  width: 2000px;
  height: 80px;
  background-color: pink;
  display: flex;

  .scroll-view-item_H {
    width: 200px;
    height: 100%;
    background-color: skyblue;
    margin-right: 20px;
  }
}
</style>
