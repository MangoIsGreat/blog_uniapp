<template>
  <view class="find-wrapper">
    <!-- 列表 -->
    <scroll-view
      class="scroll-view-wrapper"
      :scroll-y="true"
      :refresher-enabled="false"
      refresher-default-style="black"
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
      isFinish: true,
      pageLoading: true,
      searchValue: "", // 搜索值
    };
  },

  components: {
    ListItem,
  },

  onLoad(options) {
    this.searchValue = options.value;

    this.search();
  },

  methods: {
    async search() {
      const list = await request({
        url: "/blog/search",
        method: "GET",
        data: {
          content: this.searchValue,
          tag: 10000,
        },
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "搜索失败！",
        });
      }

      setTimeout(() => {
        this.list = list.data.data.rows;
        this.pageLoading = false;
      }, 500);
    },
    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
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
    height: 100%;
  }

  .item {
    margin: 20rpx;
  }
}
</style>
