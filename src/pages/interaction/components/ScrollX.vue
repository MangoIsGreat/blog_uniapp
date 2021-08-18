<template>
  <view class="scroll-x">
    <view class="swiper-box">
      <view class="swiper-innerBox">
        <view
          @click="toDetailPage(item.id)"
          class="swiper-item"
          v-for="(item, index) in hotList"
          :key="index"
        >
          <view class="swiper-item-innerBox">
            <view class="content">
              <view class="title">
                <text class="tag">热</text>
                {{ item.content }}
              </view>
              <view class="line">
                点赞{{ item.likeNum }}&nbsp;·&nbsp;评论{{ item.commNum }}
              </view>
            </view>
            <view
              class="pic"
              :style="{
                backgroundImage: `url(${item.picUrl[0]})`,
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
  props: {
    hotList: Array,
  },
  methods: {
    toDetailPage(id) {
      uni.navigateTo({ url: `/pages/interactionPage/index?id=${id}` });
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
