<template>
  <view class="comment-wrapper">
    <view class="publish" @click="publish">
      <cl-input
        placeholder="输入评论..."
        v-model="value"
        disabled
        :round="true"
      ></cl-input>
    </view>
    <view class="dianzan operate-item">
      <text class="iconfont icon-dianzan"></text>
      <text class="iconfont">67</text>
    </view>
    <view class="pinglun operate-item">
      <text class="iconfont icon-pinglun"></text>
      <text class="iconfont">67</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    publish() {
      uni.navigateTo({ url: "/pages/publishComment/index" });
    },
  },
};
</script>

<style lang="scss">
.comment-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10rpx 34rpx;
  box-sizing: border-box;
  background-color: #f9f9f9;

  .publish {
    flex: 1;
  }

  .operate-item {
    padding: 0 30rpx;

    .iconfont {
      margin-right: 8rpx;
    }
  }
}
</style>
