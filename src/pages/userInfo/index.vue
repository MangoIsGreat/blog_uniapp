<template>
  <view class="userInfo">
    <view class="bgImg"></view>
    <view class="goBack">
      <view>
        <view @Click="goback">
          <i class="icon iconfont icon-xiangyou"></i>
        </view>
        <view align="end">
          <i class="icon iconfont icon-fenxiang"></i>
        </view>
      </view>
    </view>
    <view
      :style="{
        backgroundImage:
          'url(https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)',
      }"
      class="avatar"
    ></view>
    <view class="detailInfo">
      <view class="nameLine">
        <view>
          <view class="name">橘猫很方</view>
          <view class="job">前端开发工程师</view>
        </view>
        <view align="end">
          <cl-button size="small" type="primary" plain>编辑</cl-button>
        </view>
      </view>
      <view class="desc">你会变强的！</view>
      <view class="fansBox">
        <view class="item like">
          <view class="num">25</view>
          <view class="word">关注</view>
        </view>
        <view class="item fans">
          <view class="num">25</view>
          <view class="word">关注者</view>
        </view>
        <view class="item value">
          <view class="num">1</view>
          <view class="word">活跃值</view>
        </view>
      </view>
    </view>
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
import ListItem from "./components/ListItem.vue";

export default {
  data() {
    const labels = [
      {
        label: "动态",
        value: 1,
        loaded: true,
      },
      {
        label: "文章",
        value: 2,
      },
      {
        label: "互动",
        value: 3,
      },
      {
        label: "其他",
        value: 4,
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
    ListItem,
  },
  onLoad() {
    this.refresh();
  },
  methods: {
    goback() {
      uni.navigateBack();
    },
    onDown() {
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

.userInfo {
  position: relative;

  .bgImg {
    height: 300rpx;
    background-repeat: no-repeat;
    background-position: center 6%;
    background-size: cover;
    background-image: url("../../static/img/bg.jpg");
  }

  .goBack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90rpx;
    padding: 0 30rpx;
    box-sizing: border-box;

    .icon {
      font-size: 42rpx;
      font-weight: 700;
      color: #8f918f;
    }
  }

  .avatar {
    position: absolute;
    top: 216rpx;
    left: 28rpx;
    border: 4rpx solid #fff;
    @include setBgImg(160rpx, 160rpx, 50%);
  }

  .detailInfo {
    background-color: #fff;
    padding: 120rpx 24rpx 30rpx;

    .nameLine {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24rpx;

      .name {
        @include setBigTitle(32rpx, #000408, 48rpx, 700);
      }

      .job {
        @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
      }
    }

    .desc {
      @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
      margin-bottom: 40rpx;
    }

    .fansBox {
      display: flex;

      .item {
        padding: 0 60rpx;

        .num {
          text-align: center;
          @include setBigTitle(32rpx, #000408, 48rpx, 700);
        }

        .word {
          @include setSmallTitle(#aeb4bb, 48rpx, 28rpx);
        }
      }
    }
  }

  .tabs {
    margin-bottom: 16rpx;

    .container {
      height: 740rpx;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        height: 100%;
      }
    }
  }
}
</style>
