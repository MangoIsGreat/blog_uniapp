<template>
  <view class="collection-wrapper">
    <!-- 列表 -->
    <scroll-view
      class="scroll-view-wrapper"
      :scroll-y="true"
      :refresher-enabled="true"
      refresher-default-style="black"
      :upper-threshold="100"
      :lower-threshold="100"
      @scrolltoupper="onDown"
      @scrolltolower="onUp"
    >
      <cl-loading-mask :loading="pageLoading" text="加载中">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <cl-list-item
            @click="toPage('/pages/collectionArtList/index')"
            class="scroll-view-item-list"
            justify="start"
          >
            <view class="cs-block">
              <view class="name">git</view>
              <view class="desc">1篇 · 0人关注 · 橘猫很方</view>
            </view>

            <text slot="append" class="cl-icon-arrow-right"></text>
          </cl-list-item>
        </view>

        <cl-loadmore
          v-if="list.length > 0"
          :loading="loading"
          background-color="#EFF2F5"
          :finish="isFinish"
          :divider="false"
        ></cl-loadmore>
      </cl-loading-mask>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "collection",
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
    };
  },

  onLoad() {
    this.onDown();
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
    onUp() {
      this.loading = true;
      this.isFinish = false;

      setTimeout(() => {
        this.list.push(...new Array(20).fill(1));
        this.loading = false;
        this.isFinish = true;
      }, 1000);
    },

    onDown() {
      setTimeout(() => {
        this.list = new Array(20).fill(1);
        this.pageLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page,
.collection-wrapper {
  height: 100%;
  overflow: hidden;

  .scroll-view-wrapper {
    height: 100%;

    .scroll-view-item {
      border-bottom: $border-line;

      .scroll-view-item-list {
        padding: 10rpx 0;

        .cs-block {
          .name {
            margin-bottom: 8rpx;
            @include setSmallTitle($title-color, 36rpx, 28rpx);
          }

          .desc {
            color: $article-desc-color;
          }
        }
      }
    }
  }

  .item {
    margin: 20rpx;
  }
}
</style>
