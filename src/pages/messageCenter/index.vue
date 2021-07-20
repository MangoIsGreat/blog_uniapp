<template>
  <view class="message-center-wrapper">
    <cl-list-item
      @click="toPage('/pages/commentInfo/index')"
      class="list-item list-item-1"
      label="评论"
    >
      <view slot="icon">
        <text class="iconfont icon-pinglun"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="toPage('/pages/dianzanInfo/index')"
      class="list-item"
      label="点赞"
    >
      <view slot="icon">
        <text class="iconfont icon-dianzan1"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="toPage('/pages/attentionInfo/index')"
      class="list-item"
      label="关注"
    >
      <view slot="icon">
        <text class="iconfont icon-wode"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="toPage('/pages/sysInfo/index')"
      class="list-item list-item-sys"
      label="系统消息"
    >
      <view slot="icon">
        <text class="iconfont icon-xiaoxi"></text>
      </view>
    </cl-list-item>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPage(path) {
      uni.navigateTo({
        url: path,
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.message-center-wrapper {
  .list-item-1 {
    margin-top: 30rpx;
  }

  .list-item {
    border-bottom: $border-line;

    .cl-list-item__label {
      font-size: 30rpx;
    }

    .iconfont {
      font-size: 36rpx;
    }

    .icon-pinglun {
      color: #f5c060;
    }

    .icon-dianzan1 {
      color: #66c439;
    }

    .icon-wode,
    .icon-xiaoxi {
      color: #3274f6;
    }
  }

  .list-item-sys {
    margin-top: 30rpx;
  }
}
</style>
