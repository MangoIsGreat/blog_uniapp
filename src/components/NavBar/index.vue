<template>
  <view class="nav-bar-wrapper">
    <view
      class="nav-bar-body"
      :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
    >
      <text @click="goBack" class="iconfont icon-xiangzuo"></text>
      <text class="title">{{ title }}</text>
      <text @click="share" class="iconfont icon-shenglvehao"></text>
    </view>
    <view class="top-box"></view>
  </view>
</template>

<script>
export default {
  name: "navBar",
  props: {
    title: String,
  },
  data() {
    return {
      statusBarHeight: 0,
    };
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    share() {
      this.$emit("share", true);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.nav-bar-wrapper {
  width: 100%;
  position: relative;
  background-color: #f9f9f9;
  border-bottom: $border-line;
  z-index: 99999;

  .nav-bar-body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #f9f9f9;
    z-index: 99999;

    .icon-xiangzuo,
    .icon-shenglvehao {
      width: 40rpx;
      line-height: 56rpx;
      font-weight: 600;
    }

    .icon-xiangzuo {
      color: $primary-color;
    }

    .icon-shenglvehao {
      color: $article-desc-color;
    }

    .title {
      flex: 1;
      padding: 0 30rpx;
      box-sizing: border-box;
      @include ellipsis();
      text-align: center;
    }
  }
}

.top-box {
  height: 120rpx !important;
  // #ifndef H5
  height: 140rpx;
  // #endif
}
</style>
