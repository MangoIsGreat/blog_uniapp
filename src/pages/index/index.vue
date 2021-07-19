<template>
  <view class="home-content">
    <!-- 搜索框 -->
    <search />
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
                <view
                  v-for="(item2, index2) in item.data"
                  :key="index2"
                  class="scroll-view-item"
                >
                  <ListItem />
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
  </view>
</template>

<script>
import Search from "@/components/Search/index.vue";
import ListItem from "./components/ListItem.vue";

export default {
  name: "home",
  data() {
    const labels = [
      {
        label: "热门",
        value: 1,
        loaded: true,
      },
      {
        label: "猜你喜欢",
        value: 2,
      },
      {
        label: "女装",
        value: 3,
      },
      {
        label: "美妆个护",
        value: 4,
      },
      {
        label: "食品",
        value: 5,
      },
      {
        label: "母婴",
        value: 6,
      },
      {
        label: "数码家电",
        value: 7,
      },
      {
        label: "家居家装",
        value: 8,
      },
      {
        label: "内衣",
        value: 9,
      },
    ];

    const list = labels.map((e) => {
      return {
        ...e,
        status: e.value,
        data: [],
        finished: false,
        loading: false,
        pagination: {
          page: 1,
          size: 20,
        },
      };
    });

    return {
      current: 0,
      labels,
      list,
      loading: true,
      isRefresh: true, // 是否开启下拉刷新
    };
  },
  components: {
    Search,
    ListItem,
  },
  onLoad() {
    this.refresh();
  },
  methods: {
    // refresherrefresh() {
    //   this.isRefresh = true;
    // },

    // refresherrestore() {
    //   this.isRefresh = false;
    // },

    // refresherabort() {
    //   this.isRefresh = false;
    // },

    onDown() {
      // this.isRefresh = true;
      // setTimeout(() => {
      //   this.isRefresh = false;
      // }, 1500);

      console.log("====>");
      console.log("down");
      this.refresh({
        page: 1,
      }).done(() => {
        this.$refs[`scroller-${this.current}`][0].end();
      });
    },

    onUp() {
      console.log("====>");
      console.log("up");
      const { pagination, finished } = this.list[this.current];

      if (!finished) {
        this.refresh({
          page: pagination.page + 1,
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
          page: 1,
        });
      }, 500);
    },

    refresh(params = {}) {
      const item = this.list[this.current];

      let data = {
        ...item.pagination,
        status: item.status,
        sort: "desc",
        order: "createTime",
        ...params,
      };

      return new Promise((resolve) => {
        item.loading = true;

        console.log("Refresh");

        setTimeout(() => {
          item.data = new Array(data.page == 1 ? 12 : data.page * 12).fill(1);
          item.pagination.page = data.page;
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
      }
    }
  }
}
</style>
