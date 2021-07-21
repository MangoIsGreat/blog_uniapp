<template>
  <view class="scroll-x">
    <view class="swiper-box">
      <view class="swiper-innerBox">
        <view
          @click="toDetailPage"
          class="swiper-item"
          v-for="(item, index) in publicInfoData"
          :key="index"
        >
          <view class="swiper-item-innerBox">
            <view class="content">
              <view class="title">
                <text class="tag">热</text>
                【毕业季活动-你好，社会人开奖贴】你好，社会人你好，社会人你好，社会人你好，社会人
              </view>
              <view class="line">
                沸点小助手&nbsp;·&nbsp;点赞2&nbsp;·&nbsp;评论26
              </view>
            </view>
            <view
              class="pic"
              :style="{
                backgroundImage:
                  'url(https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/280f473c5c98480fb126994efbc882ba~tplv-k3u1fbpfcp-watermark.image)',
              }"
            ></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ScrollX",
  data() {
    return {
      publicInfoData: [1, 1, 1],
    };
  },
  methods: {
    toDetailPage() {
      uni.navigateTo({ url: "/pages/interactionPage/index" });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.scroll-x {
  width: 100%;
  // height: 2320rpx;
  padding: 16rpx;
  box-sizing: border-box;

  .swiper-box {
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .swiper-innerBox {
      width: 2056rpx;
      height: 100%;

      .swiper-item {
        display: inline-block;
        padding: 30rpx;
        box-sizing: border-box;
        height: 200rpx;
        width: 664rpx;
        margin-right: 16rpx;
        background-color: #fff;

        .swiper-item-innerBox {
          display: flex;
          width: 100%;
          height: 100%;

          .content {
            flex: 1;
            padding-right: 20rpx;

            .title {
              @include setBigTitle(28rpx);
              @include ellipsis2();
              margin-bottom: 6rpx;

              .tag {
                @include setSmallTitle(#fff);
                background-color: #dd473f;
                padding: 0 4rpx;
                margin-right: 10rpx;
                text-align: center;
              }
            }

            .line {
              @include setSmallTitle();
            }
          }

          .pic {
            @include setBgImg(126rpx, 126rpx);
          }
        }
      }
    }
  }
}
</style>
