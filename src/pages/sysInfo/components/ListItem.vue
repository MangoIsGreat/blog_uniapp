<template>
  <view class="list-item-wrapper">
    <cl-avatar
      class="avatar"
      src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
    ></cl-avatar>
    <view class="list-item-content">
      <view class="list-item-content-title">
        赞了你在文章列举几种常见的前端代理方案列举几种常见的前端代理方案里的评论
      </view>
      <view class="list-item-content-time">2月前</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    imageError(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.list-item-wrapper {
  display: flex;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-bottom: $border-line;

  .avatar {
    width: 80rpx;
    margin-right: 16rpx;
  }

  .list-item-content {
    flex: 1;

    .list-item-content-title {
      margin-bottom: 10rpx;
      @include setSmallTitle($article-desc-color, 40rpx, 28rpx);
    }

    .list-item-content-time {
      @include setSmallTitle($article-desc-color, 26rpx, 26rpx);
    }
  }
}
</style>
