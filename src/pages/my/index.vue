<template>
  <view class="my-content">
    <!-- 已登录 -->
    <cl-list-item
      v-if="userinfo"
      class="avatar-item"
      justify="start"
      @click="toAuthorPage(userinfo.id)"
    >
      <view class="cs-block">
        <cl-avatar class="avatar" :src="userinfo.avatar"></cl-avatar>
        <view class="author">
          <view class="name">{{ userinfo.nickname }}</view>
          <view class="job">{{ userinfo.profession }}</view>
        </view>
      </view>

      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <!-- 未登录 -->
    <cl-list-item
      v-else
      class="avatar-item"
      justify="start"
      @click="toPage('/pages/login/index')"
    >
      <!-- 未登录 -->
      <view class="no-login">
        <cl-avatar class="avatar" :size="90" shape="circle"></cl-avatar>
        <view class="author">
          登录&nbsp;/&nbsp;注册
        </view>
      </view>

      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="
        toPage(userinfo ? '/pages/messageCenter/index' : '/pages/login/index')
      "
      class="list-item"
      label="消息中心"
    >
      <view slot="icon">
        <text class="iconfont icon-xiaoxi"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="
        toPage(userinfo ? '/pages/likeListPage/index' : '/pages/login/index')
      "
      class="list-item"
      label="我赞过的"
    >
      <view slot="icon">
        <text class="iconfont icon-dianzan1"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="
        toPage(
          userinfo ? '/pages/collectionArtPage/index' : '/pages/login/index'
        )
      "
      class="list-item"
      label="收藏集"
    >
      <view slot="icon">
        <text class="iconfont icon-xingxingmianxing"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="
        toPage(userinfo ? '/pages/readedArticle/index' : '/pages/login/index')
      "
      class="list-item"
      label="阅读过的文章"
    >
      <view slot="icon">
        <text class="iconfont icon-yanjing"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="
        toPage(userinfo ? '/pages/tagManagement/index' : '/pages/login/index')
      "
      class="list-item"
      label="标签管理"
    >
      <view slot="icon">
        <text class="iconfont icon-biaoqian"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      v-if="userinfo"
      @click="logOut"
      justify="center"
      class="list-item-config"
    >
      <text class="logout">退出账号</text>
    </cl-list-item>
    <cl-action-sheet ref="action-sheet"></cl-action-sheet>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      userinfo: null, // 用户信息
    };
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.userinfo = uni.getStorageSync("user_info");
    },
    toPage(path) {
      uni.navigateTo({
        url: `${path}?id=${this.userinfo.id}`,
      });
    },
    toAuthorPage(id) {
      uni.navigateTo({
        url: `/pages/userInfo/index?id=${id}`,
      });
    },
    logOut() {
      this.$refs["action-sheet"].open({
        list: [
          {
            label: "您确定要退出登录吗？",
            disabled: true,
            size: "26rpx",
          },
          {
            label: "退出登录",
          },
        ],
        callback: ({ action }) => {
          if (action === 1) {
            //   清除缓存token
            uni.removeStorageSync("user_token");
            //   清除缓存用户信息
            uni.removeStorageSync("user_info");

            // 重新获取信息
            this.getUserInfo();
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.my-content {
  .avatar-item {
    margin: 40rpx 0;

    .cs-block {
      display: flex;
      padding: 36rpx;
      box-sizing: border-box;

      .avatar {
        margin-right: 20rpx;
      }

      .author {
        .name {
          @include setBigTitle(36rpx, $title-color, 44rpx, 500);
          margin-bottom: 16rpx;
        }

        .job {
          @include setSmallTitle();
        }
      }
    }

    .no-login {
      display: flex;
      padding: 36rpx;
      box-sizing: border-box;
      align-items: center;

      .avatar {
        margin-right: 20rpx;
      }

      .author {
        font-size: 36rpx;
      }
    }
  }

  .list-item {
    border-bottom: $border-line;

    .iconfont {
      font-size: 36rpx;
    }

    .icon-xiaoxi {
      color: #3274f6;
    }

    .icon-dianzan1 {
      color: #66c439;
    }

    .icon-xingxingmianxing {
      color: #ffc347;
    }

    .icon-yanjing,
    .icon-biaoqian {
      color: #acb4be;
    }

    .right {
      color: $article-desc-color;
    }
  }

  .list-item-config {
    margin-top: 40rpx;
    @include setSmallTitle(#dd524d, 80rpx);

    .logout {
      font-size: 32rpx;
    }

    .iconfont {
      font-size: 36rpx;
      color: #acb4be;
    }
  }
}
</style>
