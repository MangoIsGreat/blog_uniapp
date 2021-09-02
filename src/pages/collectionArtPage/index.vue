<template>
  <view class="collection-wrapper">
    <!-- 列表 -->
    <scroll-view
      class="scroll-view-wrapper"
      :scroll-y="true"
      :refresher-enabled="false"
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
            @click="toPage(item.id)"
            class="scroll-view-item-list"
            justify="start"
          >
            <view class="cs-block">
              <view class="name">{{ item.type }}</view>
              <view class="desc">({{ item.number }}篇)</view>
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
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  name: "collection",
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
      uid: "", // 用户id
      pageSize: 20,
      pageIndex: 1,
    };
  },

  onLoad(options) {
    this.uid = options.id;
  },

  onShow() {
    this.onDown();
  },

  methods: {
    toPage(id) {
      uni.navigateTo({
        url: `/pages/collectionArtList/index?id=${id}`,
      });
    },
    async onUp() {
      this.loading = true;
      this.isFinish = false;

      const data = {
        uid: this.uid,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };

      const listData = await request({
        url: "/author/collection",
        method: "GET",
        data,
      });

      if (listData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list.push(...listData.data.data.list);
        this.loading = false;
        this.isFinish = true;
        this.pageIndex++;
      }, 1000);
    },

    async onDown() {
      const data = {
        uid: this.uid,
        pageIndex: 1,
        pageSize: this.pageSize,
      };

      const listData = await request({
        url: "/author/collection",
        method: "GET",
        data,
      });

      if (listData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list = listData.data.data.list;
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
          display: flex;
          .name {
            font-size: 54rpx;
            font-weight: 700;
            margin-bottom: 8rpx;
            @include setSmallTitle($title-color, 36rpx, 28rpx);
          }

          .desc {
            margin-left: 10rpx;
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
