<template>
  <view class="collection-list-wrapper">
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
          @click="toArtPage(item.Blog.id)"
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <ListItem :listData="item" />
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
import ListItem from "./components/ListItem.vue";

export default {
  name: "find",
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
      collectionId: "", // 收藏夹Id
      pageSize: 20,
      pageIndex: 1,
    };
  },

  components: {
    ListItem,
  },

  onLoad(options) {
    this.collectionId = options.id;
  },

  onShow() {
    this.onDown();
  },

  methods: {
    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
    },
    async onUp() {
      this.loading = true;
      this.isFinish = false;

      const data = {
        collectionId: this.collectionId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };

      const listData = await request({
        url: "/collect/blog/list",
        method: "GET",
        data,
      });

      if (listData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list.push(...listData.data.data);
        this.loading = false;
        this.isFinish = true;
        this.pageIndex++;
      }, 1000);
    },

    async onDown() {
      const data = {
        collectionId: this.collectionId,
        pageIndex: 1,
        pageSize: this.pageSize,
      };

      const listData = await request({
        url: "/collect/blog/list",
        method: "GET",
        data,
      });

      console.log(889, listData);

      if (listData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list = listData.data.data;
        this.pageLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
page,
.collection-list-wrapper {
  height: 100%;
  overflow: hidden;

  .scroll-view-wrapper {
    height: 100%;
  }

  .item {
    margin: 20rpx;
  }
}
</style>
