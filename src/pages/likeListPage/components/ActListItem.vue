<template>
  <view class="interaction-listItem-wrapper">
    <view class="list-row-top">
      <view class="list-row-header">
        <image
          class="avatar"
          mode="center"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77cd95ab46b5478eb8327a450f36e5c1~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
          @error="imageError"
        ></image>
        <view class="list-row-header-content">
          <view class="list-row-header-content-tit">进击的小将</view>
          <view class="list-row-header-content-desc">
            iOS菜鸡&nbsp;·&nbsp;57分钟前
          </view>
        </view>
      </view>
      <view class="list-row-content">
        今天的走势也符合之前的预期，两市又转换到了普跌行情，从日K线上看，仍然是横盘震荡格局，成交量继续萎缩，表明多空力量都比较谨慎。短期会在3550点附近横盘震荡，既不会持续大涨，也不会持续大跌，结构性行情还会持续，所以我觉得择股更重要！但是对于个股要放低收益预期，不然就是被套。
      </view>
      <view class="list-row-pic">
        <image
          v-for="(item, index) in imgList"
          :key="index"
          class="list-row-pic-item"
          mode="center"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77cd95ab46b5478eb8327a450f36e5c1~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
          @error="imageError"
        ></image>
      </view>
    </view>
    <view class="list-row-bottom">
      <text class="iconfont icon-dianzan">3</text>
      <text class="iconfont icon-pinglun">评论</text>
      <text class="iconfont icon-fenxiang">分享</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "interaction-listItem",
  data() {
    return {
      imgList: [1, 1, 1],
    };
  },
  methods: {
    imageError(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.interaction-listItem-wrapper {
  margin-bottom: 16rpx;
  background-color: #fff;

  .list-row-top {
    box-sizing: border-box;
    padding: 24rpx;
    border-bottom: $border-line;

    .list-row-header {
      display: flex;
      margin-bottom: 20rpx;

      .avatar {
        @include setAvatar(80rpx, 80rpx);
      }

      .list-row-header-content {
        .list-row-header-content-tit {
          @include setBigTitle(28rpx);
          margin-bottom: 6rpx;
        }

        .list-row-header-content-desc {
          @include setSmallTitle();
        }
      }
    }

    .list-row-content {
      margin-bottom: 24rpx;
      @include setArticleInfo();
    }

    .list-row-pic {
      display: flex;
      justify-content: space-around;
      margin-bottom: 24rpx;

      .list-row-pic-item {
        width: 220rpx;
        height: 220rpx;
      }
    }
  }

  .list-row-bottom {
    display: flex;

    .iconfont {
      flex: 1;
      line-height: 74rpx;
      text-align: center;
      font-size: 28rpx;
      color: #6e8194;
    }

    .icon-dianzan {
      color: $primary-color;
    }
  }
}
</style>
