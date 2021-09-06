<template>
  <view class="userInfo">
    <view class="bgImg"></view>
    <view class="goBack" :style="{ top: statusBarHeight * 2 + 20 + 'rpx' }">
      <view @click="goback">
        <i class="icon iconfont icon-xiangzuo"></i>
      </view>
      <view @click="toggleShare(true)">
        <i class="icon iconfont icon-fenxiang"></i>
      </view>
    </view>
    <view
      :style="{
        backgroundImage: `url(${userInfo.avatar})`,
      }"
      class="avatar"
    ></view>
    <view class="detailInfo">
      <view class="nameLine">
        <view>
          <view class="name">{{ userInfo.nickname }}</view>
          <view class="job">{{ userInfo.profession }}</view>
        </view>
        <view align="end">
          <cl-button
            @click="toEditPage(userInfo.id)"
            v-if="userInfo.isSelf"
            size="small"
            type="primary"
            plain
            >编辑</cl-button
          >
          <cl-button
            @click="followUser(userInfo.id)"
            v-else
            size="small"
            type="primary"
            plain
          >
            <text v-if="!userInfo.isAttention">+ 关注</text>
            <text v-else>已关注</text>
          </cl-button>
        </view>
      </view>
      <view class="desc">{{ userInfo.signature }}</view>
      <view class="fansBox">
        <view class="item like">
          <view class="num">{{ userInfo.idolNum }}</view>
          <view class="word">关注</view>
        </view>
        <view class="item fans">
          <view class="num">{{ userInfo.fansNum }}</view>
          <view class="word">关注者</view>
        </view>
        <view class="item value">
          <view class="num">{{ userInfo.blogLikeNum }}</view>
          <view class="word">获赞</view>
        </view>
        <view class="item value">
          <view class="num">{{ userInfo.blogReadNum }}</view>
          <view class="word">被阅读</view>
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
                  <HisListItem v-if="item.value === 1" :listData="item2" />
                  <ListItem v-if="item.value === 2" :listData="item2" />
                  <DynListItem
                    v-if="item.value === 3"
                    :infoData="item2"
                    @likeDyn="likeDyn"
                    @share="toggleShare"
                  />
                </view>

                <More :userInfo="userInfo" v-if="current === 3" />

                <cl-loadmore
                  v-if="item.loading"
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
import ListItem from "./components/ListItem.vue";
import DynListItem from "./components/DynListItem.vue";
import HisListItem from "./components/HisListItem.vue";
import More from "./components/More.vue";
import Share from "@/components/Share/index.vue";

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
      isRefresh: false, // 是否开启下拉刷新
      statusBarHeight: 0, // 状态栏高度
      isShare: false, // 是否分享
      uid: "", // 用户id
      userInfo: {}, // 用户信息
    };
  },
  components: {
    ListItem,
    DynListItem,
    HisListItem,
    More,
    Share,
  },
  onLoad(options) {
    // 获取uid
    this.uid = options.id;

    // 获取状态栏高度
    this.getStatusBarHeight();
  },
  onShow() {
    // 获取用户信息
    this.getUserInfo();

    this.refresh();
  },
  methods: {
    toEditPage(id) {
      uni.navigateTo({
        url: `/pages/editUserInfo/index?id=${id}`,
      });
    },

    // 关注当前用户
    async followUser(id) {
      const data = await request({
        url: "/fans/follow",
        method: "POST",
        data: {
          leader: id,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "用户信息请求失败！",
        });
      }

      if (data.data.data === "ok") {
        this.userInfo.isAttention = true;

        this.userInfo.fansNum++;
      } else if (data.data.data === "cancel") {
        this.userInfo.isAttention = false;

        this.userInfo.fansNum--;
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const data = await request({
        url: "/author/userinfo",
        method: "GET",
        data: {
          uid: this.uid,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "用户信息请求失败！",
        });
      }

      this.userInfo = data.data.data;
    },
    toggleShare(value) {
      this.isShare = value;
    },
    getStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
    },
    goback() {
      uni.navigateBack();
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

      if (this.current === 3) return;

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
      if (this.current === 3) return;

      let path = "";
      const item = this.list[this.current];

      let data = {
        ...item.pagination,
        ...params,
        uid: this.uid,
      };

      switch (item.value) {
        case 2:
          data.type = "new";
          path = "/author/artlist"; // 文章列表 - 新
          break;
        case 3:
          path = "/author/dynlist"; // 动态列表
          break;
        case 1:
          path = "/author/dynamic"; // 作者动态记录
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
@import "@/static/css/common/common.scss";

.userInfo {
  position: relative;
  height: 100vh;

  .bgImg {
    height: 300rpx;
    background-repeat: no-repeat;
    background-position: center 6%;
    background-size: cover;
    background-image: url("../../static/img/bg.jpg");
  }

  .goBack {
    display: flex;
    justify-content: space-between;
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
      color: #283243;
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
        padding: 0 50rpx;

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
      height: 844rpx;
      background-color: #f7f7f7;

      .scroll-view-wrapper {
        // height: 100%;
        height: calc(100% + 80rpx);
      }
    }
  }
}
</style>
