<template>
  <view class="interaction-content">
    <!-- Tabs选项卡 -->
    <cl-tabs
      color="#00c58e"
      class="tabs"
      v-model="current"
      :labels="labels"
      :border="false"
      :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
    >
      <!-- 自定义内容区域 -->
      <swiper
        class="container"
        :disable-touch="true"
        @change="onChangeSwiper"
        :current="current"
      >
        <swiper-item v-for="(item, index) in list" :key="index">
          <!-- 是否预加载 -->
          <template v-if="item.loaded || index == current">
            <!-- 列表 -->
            <scroll-view
              class="scroll-view-wrapper"
              :scroll-y="true"
              :refresher-enabled="isRefresh"
              refresher-default-style="black"
              :upper-threshold="100"
              :lower-threshold="100"
              @scrolltoupper="onDown"
              @scrolltolower="onUp"
            >
              <cl-loading-mask :loading="loading" text="加载中">
                <!-- 推荐 -->
                <ScrollX v-if="current === 0" :hotList="hotList" />

                <view
                  @click="toInteractionPage(item2.id)"
                  v-for="(item2, index2) in item.data"
                  :key="index2"
                  class="scroll-view-item"
                >
                  <ListItem
                    @likeDyn="likeDyn"
                    :infoData="item2"
                    @share="toggleShare"
                  />
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
    <!-- 互动页快捷交流按钮 -->
    <view class="chat" @click="publishIdea">
      <text class="iconfont icon-pinglun1"></text>
    </view>
    <!-- 分享 -->
    <Share :visible="isShare" @share="toggleShare" />
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import ScrollX from "./components/ScrollX.vue";
import Share from "@/components/Share/index.vue";
import request from "@/http/request";

export default {
  name: "interaction",
  data() {
    return {
      hotList: [], // 热门留言
      isRefresh: true, // 能否下拉刷新
      current: 0,
      labels: [],
      list: [],
      loading: true,
      statusBarHeight: 0, // 状态栏高度
      isShare: false, // 是否分享
    };
  },
  components: {
    ListItem,
    ScrollX,
    Share,
  },
  onShow() {
    // 获取状态栏高度
    this.getStatusBarHeight();

    // 获取labels数据
    this.getLabels();

    // 获取热门推荐数据
    this.getHotList();
  },
  methods: {
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
    // 获取labels数据
    async getLabels() {
      const data = await request({
        url: "/theme/list",
        method: "GET",
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "标签类型数据请求失败！",
        });
      }

      data.data.data.forEach((item) => {
        item.label = item.themeName;
        item.value = item.id;
      });

      this.labels = data.data.data;

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
    // 获取热门推荐数据
    async getHotList() {
      if (this.current !== 0) return;

      const favList = await request({
        url: "/dynamic/favlist",
        method: "GET",
      });

      if (favList.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "精选留言获取失败!",
        });
      }

      favList.data.data.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      this.hotList = favList.data.data;
    },
    toggleShare(value) {
      this.isShare = value;
    },
    publishIdea() {
      uni.navigateTo({
        url: "/pages/publishIdea/index",
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
    toInteractionPage(id) {
      uni.navigateTo({
        url: `/pages/interactionPage/index?id=${id}`,
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
        theme: item.themeName,
        type: "",
      };

      const list = await request({
        url: "/dynamic/list",
        method: "GET",
        data,
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      list.data.data.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      return new Promise((resolve) => {
        item.loading = true;

        setTimeout(() => {
          data.pageIndex == 1
            ? (item.data = list.data.data)
            : item.data.push(...list.data.data);
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
@import "@/static/css/common/common.scss";

page {
  // #ifdef H5
  height: 100%;
  // #endif

  // #ifndef H5
  height: 100vh;
  // #endif
}

.interaction-content {
  height: 100%;
  overflow: hidden;

  .tabs {
    margin-bottom: 16rpx;

    .container {
      height: 100%;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        height: calc(100% - 80rpx);
      }
    }
  }

  .chat {
    position: fixed;
    right: 30rpx;
    bottom: 80rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: $primary-color;
    text-align: center;

    .icon-pinglun1 {
      color: #fff;
      line-height: 100rpx;
      text-align: center;
      font-size: 40rpx;
    }
  }
}
</style>
