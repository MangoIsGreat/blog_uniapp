<template>
  <view class="find-wrapper">
    <!-- 搜索框 -->
    <Search @openTagPage="openTagPage" />
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
        <HeaderList />

        <view
          @click="toArtPage"
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <ListItem />
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
import Search from "@/components/Search/index.vue";
import ListItem from "./components/ListItem.vue";
import HeaderList from "./components/HeaderList.vue";

export default {
  name: "find",
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
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
    toArtPage() {
      uni.navigateTo({
        url: "/pages/articlePage/index",
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
    openTagPage() {
      uni.navigateTo({
        url: "/pages/tagManagement/index",
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
