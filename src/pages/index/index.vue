<template>
  <view class="home-content">
    <!-- 搜索框 -->
    <search @openTagPage="openTagPage" />
    <!-- Tabs选项卡 -->
    <cl-tabs
      color="#00c58e"
      class="tabs"
      v-model="current"
      :labels="labels"
      :border="false"
    >
      <!-- 自定义内容区域 -->
      <swiper class="container" @change="onChangeSwiper" :current="current">
        <swiper-item v-for="(item, index) in list" :key="index">
          <!-- 是否预加载 -->
          <template v-if="item.loaded || index == current">
            <scroll-view
              class="scroll-view-wrapper"
              :scroll-y="true"
              :refresher-enabled="isRefresh"
              refresher-default-style="black"
              :upper-threshold="150"
              :lower-threshold="150"
              @scrolltoupper="onDown"
              @scrolltolower="onUp"
            >
              <cl-loading-mask :loading="loading" text="加载中">
                <!-- 热门推荐 -->
                <HeaderList :hotList="hotList" v-if="current === 0" />

                <view
                  v-for="(item2, index2) in item.data"
                  :key="index2"
                  class="scroll-view-item"
                  @click="toArtPage(item2.id)"
                >
                  <ListItem @likeBlog="likeBlog" :listData="item2" />
                </view>

                <cl-loadmore
                  :loading="item.loading"
                  :finish="item.finished"
                  :divider="false"
                ></cl-loadmore>
              </cl-loading-mask>
            </scroll-view>
          </template>
        </swiper-item>
      </swiper>
    </cl-tabs>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import Search from "@/components/Search/index.vue";
import ListItem from "./components/ListItem.vue";
import HeaderList from "./components/HeaderList.vue";
import request from "@/http/request";

export default {
  name: "home",
  data() {
    return {
      current: 0,
      labels: [],
      list: [],
      loading: true,
      isRefresh: true, // 是否开启下拉刷新
      hotList: [], // 热门推荐数据
    };
  },
  components: {
    Search,
    ListItem,
    HeaderList,
  },
  onShow() {
    // 获取labels数据
    this.getLabels();
  },
  methods: {
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
        this.list[this.current].data.forEach((item) => {
          if (item.id === id) {
            item.isLike = true;
            item.blogLikeNum++;
          }
        });
      } else if (data.data.data === "cancel") {
        this.list[this.current].data.forEach((item) => {
          if (item.id === id) {
            item.isLike = false;
            item.blogLikeNum--;
          }
        });
      }
    },
    // 获取热门推荐数据
    async getHotList() {
      if (this.current !== 0) return;

      const item = this.list[this.current];

      let data = {
        pageIndex: 1,
        pageSize: 3,
        tag: item.status,
        rankingType: "hot",
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

      this.hotList = list.data.data.rows;
    },
    // 获取labels数据
    async getLabels() {
      const data = await request({
        url: "/tag/list",
        method: "GET",
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "标签类型数据请求失败！",
        });
      }

      data.data.data.rows.forEach((item) => {
        item.label = item.tag_name;
        item.value = item.tag_type;
      });

      this.labels = data.data.data.rows;

      const list = this.labels.map((e) => {
        return {
          ...e,
          status: e.value,
          data: [],
          finished: false,
          loading: false,
          pagination: {
            pageIndex: 1,
            pageSize: 20,
          },
        };
      });

      this.list = list;

      this.refresh();

      // 获取热门推荐数据
      this.getHotList();
    },
    openTagPage() {
      uni.navigateTo({
        url: "/pages/tagManagement/index",
      });
    },

    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
    },

    onDown() {
      this.refresh({
        pageIndex: 1,
      }).done(() => {
        this.$refs[`scroller-${this.current}`][0].end();
      });
    },

    onUp() {
      const { pagination, finished } = this.list[this.current];

      if (!finished) {
        this.refresh({
          pageIndex: pagination.pageIndex + 1,
        });
      }
    },

    onChangeSwiper(e) {
      this.current = e.detail.current;

      if (!this.list[this.current].loaded) {
        this.loading = true;
        this.list[this.current].loaded = true;
      }

      setTimeout(() => {
        this.refresh({
          pageIndex: 1,
        });
      }, 500);
    },

    async refresh(params = {}) {
      const item = this.list[this.current];

      let data = {
        ...item.pagination,
        ...params,
        tag: item.status,
        rankingType: "new",
      };

      const list = await request({
        url: "/blog/list",
        method: "GET",
        data,
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      return new Promise((resolve) => {
        item.loading = true;

        setTimeout(() => {
          data.pageIndex == 1
            ? (item.data = list.data.data.rows)
            : item.data.push(...list.data.data.rows);
          item.pagination.pageIndex = data.pageIndex;
          item.finished = false;
          item.loading = false;
          this.loading = false;
          resolve();
        }, 500);
      });
    },
  },
};
</script>

<style lang="scss">
page {
  // #ifdef H5
  height: 100%;
  // #endif

  // #ifndef H5
  height: 100vh;
  // #endif
}

.home-content {
  height: 100%;
  overflow: hidden;

  .tabs {
    margin-bottom: 16rpx;

    .container {
      height: 100%;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        height: calc(100% - 140rpx);
        padding-top: 16rpx;
      }
    }
  }
}
</style>
