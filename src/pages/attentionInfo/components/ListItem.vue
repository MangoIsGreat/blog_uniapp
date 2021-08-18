<template>
  <view class="list-item-wrapper">
    <cl-avatar
      class="avatar"
      src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
    ></cl-avatar>
    <view class="list-item-content">
      <view class="list-item-content-title">
        <text class="name">稀土君</text>关注了你
      </view>
      <view class="list-item-content-job">安卓开发工程师</view>
      <view class="list-item-content-time">2月前</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {},
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

      .name {
        @include setSmallTitle($primary-color, 40rpx, 28rpx);
        font-weight: 600;
      }
    }

    .list-item-content-job {
      margin-bottom: 12rpx;
      @include setSmallTitle();
    }

    .list-item-content-time {
      @include setSmallTitle();
    }
  }
}
</style>
