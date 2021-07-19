<template>
  <view class="search-wrapper">
    <view class="serach-box">
      <cl-search
        :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
        class="search-wrapper-input"
        :show-search-button="false"
        placeholder="搜索得到"
        @focus="focus"
		@blur="blur"
      ></cl-search>
      <view class="tag">
        <i class="iconfont icon-shezhi"></i>
        <text>标签</text>
      </view>
    </view>
    <view class="top-box"></view>
  </view>
</template>

<script>
export default {
  name: "Search",
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
    focus() {
      console.log("focus");
    },
    blur() {
      console.log("blur");
    },
  },
};
</script>

<style lang="scss">
.search-wrapper {
  width: 100%;
  position: relative;
  background-color: #f9f9f9;

  .serach-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    .search-wrapper-input {
      flex: 1;
      background-color: #f9f9f9;
    }

    .tag {
      box-sizing: border-box;
      padding-left: 22rpx;
      // #ifdef APP-PLUS
      padding-top: 38rpx;
      // #endif
      width: 148rpx;
      display: flex;
      align-items: center;
      color: #abb3bd;
      font-size: 32rpx;

      .icon-shezhi {
        margin-right: 6rpx;
      }
    }
  }

  .top-box {
    height: 88rpx;
    // #ifndef H5
   height: 140rpx;
    // #endif
  }
}
</style>
