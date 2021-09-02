<template>
  <view class="find-wrapper">
    <!-- 搜索框 -->
    <Search @openTagPage="openTagPage" @search="search" />
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
      <cl-loading-mask :loading="loading" text="加载中">
        <HeaderList />

        <view
          @click="toArtPage(item.id)"
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <ListItem @likeBlog="likeBlog" :listData="item" />
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
import Search from "@/components/Search/index.vue";
import ListItem from "./components/ListItem.vue";
import HeaderList from "./components/HeaderList.vue";
import request from "@/http/request";

export default {
  name: "find",
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
      pageIndex: 1,
      pageSize: 20,
    };
  },

  components: {
    Search,
    ListItem,
    HeaderList,
  },

  onLoad() {
    this.onDown();
  },

  methods: {
    // 搜索
    async search(value) {
      uni.navigateTo({
        url: `/pages/SearchPage/index?value=${value}`,
      });
    },
    // 点赞博客
    async likeBlog(id) {
      const data = await request({
        url: "/blike/like",
        method: "POST",
        data: {
          blog: id,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "点赞失败！",
        });
      }

      if (data.data.data === "ok") {
        this.list.forEach((item) => {
          if (item.id === id) {
            item.isLike = true;
            item.blogLikeNum++;
          }
        });
      } else if (data.data.data === "cancel") {
        this.list.forEach((item) => {
          if (item.id === id) {
            item.isLike = false;
            item.blogLikeNum--;
          }
        });
      }
    },
    // 获取热门推荐博客
    async getHotBlogList() {
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        tag: 10000,
        rankingType: "new",
      };

      const list = await request({
        url: "/blog/list",
        method: "GET",
        data,
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "热门推荐数据请求失败！",
        });
      }

      this.pageIndex++;

      return list.data.data.rows;
    },

    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
    },

    openTagPage() {
      uni.navigateTo({
        url: "/pages/tagManagement/index",
      });
    },

    async onUp() {
      this.loading = true;
      this.isFinish = false;

      const listData = await this.getHotBlogList();
      this.list.push(...listData);
      this.loading = false;
      this.isFinish = true;
    },

    async onDown() {
      this.pageIndex = 1;

      const listData = await this.getHotBlogList();
      this.list = listData;
      this.pageLoading = false;
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
    height: calc(100% - 140rpx);
  }

  .item {
    margin: 20rpx;
  }
}
</style>
