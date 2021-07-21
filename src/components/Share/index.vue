<template>
  <cl-popup
    class="share-wrapper"
    ref="popup"
    @close="close"
    :visible.sync="isVisible"
    size="300rpx"
    direction="bottom"
  >
    <view class="share-box">
      <view class="share-box-item">
        <view class="iconfont icon-lianjie"></view>
        <view class="text">复制链接</view>
      </view>
      <view class="share-box-item">
        <view class="iconfont icon-haibaofenxiang"></view>
        <view class="text">分享二维码</view>
      </view>
      <view class="share-box-item">
        <view class="iconfont icon-shenglvehao"></view>
        <view class="text">更多</view>
      </view>
    </view>
    <view @click="close" class="cancel">取消</view>
  </cl-popup>
</template>

<script>
export default {
  name: "share-component",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  watch: {
    visible: function() {
      this.isVisible = this.visible;
    },
  },
  created() {
    this.isVisible = this.visible;
  },
  methods: {
    close() {
      this.$emit("share", false);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.share-wrapper {
  padding: 60rpx 50rpx;
  box-sizing: border-box;

  .share-box {
    display: flex;
    padding-bottom: 30rpx;
    border-bottom: $border-line;

    .share-box-item {
      margin-right: 40rpx;

      .iconfont {
        width: 90rpx;
        height: 90rpx;
        margin-bottom: 12rpx;
        border-radius: 50%;
        background-color: #f1f1f1;
        font-size: 40rpx;
        line-height: 90rpx;
        text-align: center;
      }

      .text {
        @include setSmallTitle();
        text-align: center;
      }
    }
  }

  .cancel {
    height: 80rpx;
    @include setSmallTitle($article-desc-color, 80rpx, 32rpx);
    text-align: center;
  }
}
</style>
