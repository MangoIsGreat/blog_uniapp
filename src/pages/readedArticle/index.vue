<template>
  <view class="find-wrapper">
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
          @click="toArtPage(item.id)"
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <ListItem :listData="item" />
        </view>

        <cl-loadmore
          v-if="loading"
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
      uid: "", // 用户id
      pageIndex: 1,
      pageSize: 20,
    };
  },

  components: {
    ListItem,
  },

  onLoad(options) {
    this.uid = options.id;
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

      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };

      const list = await request({
        url: "/readhistory/list",
        method: "GET",
        data,
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list.push(...list.data.data);
        this.loading = false;
        this.isFinish = true;
        this.pageIndex++;
      }, 500);
    },

    async onDown() {
      this.pageIndex = 1;

      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };

      const list = await request({
        url: "/readhistory/list",
        method: "GET",
        data,
      });

      console.log(777, list)

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      setTimeout(() => {
        this.list = list.data.data;
        this.pageLoading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">
page,
.find-wrapper {
  height: 100%;
  overflow: hidden;

  .scroll-view-wrapper {
    // height: 100%;
    height: calc(100% + 80rpx);
  }

  .item {
    margin: 20rpx;
  }
}
</style>
