<template>
  <view class="userInfo">
    <view class="bgImg"></view>
    <view class="goBack">
      <view>
        <view @Click="goback">
          <i class="icon iconfont icon-xiangyou"></i>
        </view>
        <view align="end">
          <i class="icon iconfont icon-fenxiang"></i>
        </view>
      </view>
    </view>
    <view
      :style="{
        backgroundImage:
          'url(https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)',
      }"
      class="avatar"
    ></view>
    <view class="detailInfo">
      <view class="nameLine">
        <view>
          <view class="name">橘猫很方</view>
          <view class="job">前端开发工程师</view>
        </view>
        <view align="end">
          <cl-button size="small" type="primary" plain>编辑</cl-button>
        </view>
      </view>
      <view class="desc">你会变强的！</view>
      <view class="fansBox">
        <view class="item like">
          <view class="num">25</view>
          <view class="word">关注</view>
        </view>
        <view class="item fans">
          <view class="num">25</view>
          <view class="word">关注者</view>
        </view>
        <view class="item value">
          <view class="num">1</view>
          <view class="word">活跃值</view>
        </view>
      </view>
    </view>
    <view class="listWrapper"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    goback() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.userInfo {
  position: relative;

  .bgImg {
    height: 200rpx;
    background-repeat: no-repeat;
    background-position: center 6%;
    background-size: cover;
    background-image: url("../../static/img/bg.jpg");
  }

  .goBack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90rpx;
    padding: 0 30rpx;
    box-sizing: border-box;

    .icon {
      font-size: 42rpx;
      font-weight: 700;
      color: #8f918f;
    }
  }

  .avatar {
    position: absolute;
    top: 112rpx;
    left: 28rpx;
    border: 4rpx solid #fff;
    @include setBgImg(160rpx, 160rpx, 50%);
  }

  .detailInfo {
    background-color: #fff;
    padding: 120rpx 24rpx 30rpx;

    .nameLine {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24rpx;

      .name {
        @include setBigTitle(32rpx, #000408, 48rpx, 700);
      }

      .job {
        @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
      }
    }

    .desc {
      @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
      margin-bottom: 40rpx;
    }

    .fansBox {
      display: flex;

      .item {
        padding: 0 60rpx;

        .num {
          text-align: center;
          @include setBigTitle(32rpx, #000408, 48rpx, 700);
        }

        .word {
          @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
        }
      }
    }
  }
}
</style>
