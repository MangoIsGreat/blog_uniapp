<template>
  <view class="tag-management-content">
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
                  <cl-list-item
                    @click="toPage('/pages/collectionArtList/index')"
                    class="scroll-view-item-list"
                    justify="start"
                  >
                    <view class="left">
                      <cl-avatar
                        class="avatar"
                        src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
                      ></cl-avatar>
                      <view class="cs-block">
                        <view class="name">前端</view>
                        <view class="desc">152人已关注 · 42篇文章</view>
                      </view>
                    </view>

                    <text slot="append">
                      <cl-button class="like-btn" round>+关注</cl-button>
                    </text>
                  </cl-list-item>
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
export default {
  name: "tag-management",
  data() {
    const labels = [
      {
        label: "全部标签",
        value: 1,
        loaded: true,
      },
      {
        label: "已关注标签",
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
@import "@/static/css/common/common.scss";

page {
  // #ifdef H5
  height: 100%;
  // #endif

  // #ifndef H5
  height: 100vh;
  // #endif
}

.tag-management-content {
  height: 100%;
  overflow: hidden;

  .tabs {
    margin-bottom: 16rpx;

    .container {
      height: 100%;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        height: 100%;

        .scroll-view-item {
          border-bottom: $border-line;

          .scroll-view-item-list {
            padding: 20rpx 0;

            .like-btn {
              .cl-button__text {
                color: $primary-color;
              }
            }

            .left {
              display: flex;

              .avatar {
                margin-right: 18rpx;
              }
            }

            .cs-block {
              .name {
                margin-bottom: 8rpx;
                @include setSmallTitle($title-color, 36rpx, 28rpx);
                font-weight: 600;
              }

              .desc {
                color: $article-desc-color;
              }
            }
          }
        }
      }
    }
  }
}
</style>
