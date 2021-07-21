<template>
  <view class="publish-comment-wrapper">
    <view
      class="nav-bar-body"
      :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
    >
      <text @click="goBack" class="iconfont icon-xiangzuo"></text>
      <text class="title">发评论</text>
      <text @click="publish" class="publish">发送</text>
    </view>
    <cl-textarea
      ref="input"
      :style="{ border: 'none' }"
      v-model="value"
      placeholder="输入评论..."
    ></cl-textarea>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      statusBarHeight: 0,
    };
  },
  onLoad() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  onReady() {
    this.$refs.input.focus = true;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
	publish() {
		
	}
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page,
.publish-comment-wrapper {
  height: 100%;
  background-color: #fff;

  .nav-bar-body {
    width: 100%;
    padding: 12rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #f9f9f9;

    .icon-xiangzuo,
    .publish {
      width: 80rpx;
      line-height: 56rpx;
      font-weight: 700;
	  color: $primary-color;
    }

    .title {
      flex: 1;
      color: $title-color;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
