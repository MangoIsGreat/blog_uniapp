<template>
  <view class="news-content">
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
                <view v-if="current == 0">
                  <view
                    @click="toArtPage(item2.id)"
                    v-for="(item2, index2) in item.data"
                    :key="index2"
                    class="scroll-view-item"
                  >
                    <ArtListItem @likeBlog="likeBlog" :listData="item2" />
                  </view>
                </view>
                <view v-if="current == 1">
                  <view
                    v-for="(item2, index2) in item.data"
                    :key="index2"
                    class="scroll-view-item"
                    @click="toActPage(item2.id)"
                  >
                    <ActListItem
                      :infoData="item2"
                      @likeDyn="likeDyn"
                      @share="toggleShare"
                    />
                  </view>
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
    <!-- 分享 -->
    <Share :visible="isShare" @share="toggleShare" />
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";
import Share from "@/components/Share/index.vue";
import ArtListItem from "./components/ArtListItem.vue";
import ActListItem from "./components/ActListItem.vue";

export default {
  name: "likeListPage",
  data() {
    const labels = [
      {
        label: "文章",
        value: 1,
        loaded: true,
      },
      {
        label: "动态",
        value: 2,
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
          pageIndex: 1,
          pageSize: 20,
        },
      };
    });

    return {
      current: 0,
      labels,
      list,
      loading: true,
      isRefresh: true, // 是否开启下拉刷新
      uid: "", // 用户id
      isShare: false, // 是否分享
    };
  },
  components: {
    ArtListItem,
    ActListItem,
    Share,
  },
  onLoad(options) {
    this.uid = options.id;

    this.refresh();
  },
  methods: {
    toArtPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
    },
    toActPage(id) {
      uni.navigateTo({
        url: `/pages/interactionPage/index?id=${id}`,
      });
    },
    toggleShare(value) {
      this.isShare = value;
    },
    // 点赞动态
    async likeDyn(id) {
      const data = await request({
        url: "/dlike/like",
        method: "POST",
        data: {
          dynamicId: id,
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
            item.likeNum++;
          }
        });
      } else if (data.data.data === "cancel") {
        this.list[this.current].data.forEach((item) => {
          if (item.id === id) {
            item.isLike = false;
            item.likeNum--;
          }
        });
      }
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
        pageIndex: 1,
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
      let path = "";
      const item = this.list[this.current];

      let data = {
        ...item.pagination,
        ...params,
        uid: this.uid,
      };

      switch (item.status) {
        case 1:
          path = "/author/likeBlog";
          break;
        case 2:
          path = "/author/likeDyn";
          break;
        default:
          break;
      }

      const listData = await request({
        url: path,
        method: "GET",
        data,
      });

      if (listData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      listData.data.data.list.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      return new Promise((resolve) => {
        item.loading = true;

        setTimeout(() => {
          data.pageIndex == 1
            ? (item.data = listData.data.data.list)
            : item.data.push(...listData.data.data.list);
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
        height: 100%;
      }
    }
  }
}
</style>
