<template>
  <view class="news-content">
    <!-- Tabs选项卡 -->
    <cl-tabs
      color="#00c58e"
      class="tabs"
      v-model="current"
      :labels="labels"
      :border="false"
      :style="{
        paddingTop: statusBarHeight * 2 + 10 + 'rpx',
      }"
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
                <view
                  @click="toArtPage(item2.id)"
                  v-for="(item2, index2) in item.data"
                  :key="index2"
                  class="scroll-view-item"
                >
                  <ListItem :listData="item2" />
                </view>

                <cl-loadmore
                  v-if="item.data.length > 0"
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
import request from "@/http/request";
import ListItem from "./components/ListItem.vue";

export default {
  name: "news",
  data() {
    return {
      current: 0,
      labels: [],
      list: [],
      loading: true,
      isRefresh: true, // 是否开启下拉刷新
    };
  },
  components: {
    ListItem,
  },
  onLoad() {
    // 获取状态栏高度
    this.getStatusBarHeight();

    // 获取labels数据
    this.getLabels();
  },
  methods: {
    // 获取labels数据
    async getLabels() {
      const data = await request({
        url: "/newstype/list",
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
    },
    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/newsPage/index?id=${id}`,
      });
    },
    getStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
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
        url: "/news/list",
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

.news-content {
  height: 100%;
  overflow: hidden;

  .tabs {
    margin-bottom: 16rpx;

    .container {
      height: 100%;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        height: calc(100% - 80rpx);
        padding-top: 16rpx;
      }
    }
  }
}
</style>
