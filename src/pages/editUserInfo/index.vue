<template>
  <view class="my-content">
    <cl-list-item class="avatar-item" justify="start">
      <view class="append">
        <text>头像</text>
      </view>

      <view class="cs-block" slot="append">
        <cl-avatar class="avatar" :src="userinfo.avatar"></cl-avatar>
      </view>
    </cl-list-item>
    <cl-list-item class="list-item" label="用户名">
      <view class="append" slot="append">
        <text>{{ userinfo.nickname }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item class="list-item" label="职位">
      <view class="append" slot="append">
        <text>{{ userinfo.profession }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item class="list-item" label="简介">
      <view class="append" slot="append">
        <text>{{ userinfo.signature }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item justify="center" class="list-item-config">
      <text class="logout">保存</text>
    </cl-list-item>
    <cl-action-sheet ref="action-sheet"></cl-action-sheet>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  data() {
    return {
      userinfo: {},
      uid: "", // 用户id
    };
  },
  onLoad(options) {
    this.uid = options.id;
  },

  onShow() {
    this.getUserInfo();
  },

  methods: {
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
          message: "用户信息获取失败！",
        });
      }

      this.userinfo = data.data.data;
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
  }

  .list-item-config {
    margin-top: 40rpx;

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
