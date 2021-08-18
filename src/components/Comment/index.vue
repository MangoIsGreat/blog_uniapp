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
      <text
        @click="likeBlog"
        :class="[
          'iconfont',
          infoData.isLike ? 'icon-dianzan_' : 'icon-dianzan',
        ]"
        :style="{ color: infoData.isLike ? '#00c58e' : '#96909c' }"
      ></text>
      <text class="iconfont">{{
        infoData.blogLikeNum || infoData.likeNum
      }}</text>
    </view>
    <view class="pinglun operate-item">
      <text class="iconfont icon-pinglun"></text>
      <text class="iconfont">{{
        infoData.commentNum || infoData.commNum
      }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "comment",
  props: ["infoData", "type"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    publish() {
      uni.navigateTo({
        url: `/pages/publishComment/index?id=${this.infoData.id}&type=${this.type}`,
      });
    },
    // 点赞博客
    likeBlog() {
      this.$emit("makeLike");
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
