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
    <cl-list-item
      @click="edit(userinfo.nickname, 'nickname')"
      class="list-item"
      label="用户名"
    >
      <view class="append" slot="append">
        <text>{{ userinfo.nickname }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="edit(userinfo.profession, 'profession')"
      class="list-item"
      label="职位"
    >
      <view class="append" slot="append">
        <text>{{ userinfo.profession }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="edit(userinfo.signature, 'signature')"
      class="list-item"
      label="签名"
    >
      <view class="append" slot="append">
        <text>{{ userinfo.signature }}</text>
      </view>
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item @click="save" justify="center" class="list-item-config">
      <text class="logout">保存</text>
    </cl-list-item>
    <cl-popup :visible.sync="visible" direction="bottom">
      <cl-textarea
        ref="input"
        class="edit-textarea"
        v-model="value"
        :maxlength="20"
        :focus="true"
      ></cl-textarea>
      <view class="edit-box">
        <view class="edit-box-btn">
          <cl-button @click="makeSure" type="primary" round>确认</cl-button>
        </view>
      </view>
    </cl-popup>
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
      visible: false, // 是否展示编辑框
      value: "", // 编辑框内容
      textLength: 20, // 文本长度
      checkedType: "", // 选中的输入类型
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

    async save() {
      const data = await request({
        url: "/author/updateUserInfo",
        method: "POST",
        data: {
          uid: this.uid,
          nickname: this.userinfo.nickname,
          profession: this.userinfo.profession,
          signature: this.userinfo.signature,
          avatar: this.userinfo.avatar,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "用户信息获取失败！",
        });
      }

      this.$refs["toast"].open({
        message: "用户信息修改成功！",
      });

      this.getUserInfo();
    },

    edit(value, type) {
      this.visible = true;

      this.value = value;

      this.checkedType = type;
    },

    makeSure() {
      this.userinfo[this.checkedType] = this.value;

      this.visible = false;
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

  .edit-textarea {
    border: none;
    background-color: #efefef;
  }

  .edit-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 20rpx;

    .edit-box-btn {
      display: flex;
      align-items: center;

      .edit-box-btn-text {
        margin-right: 10rpx;
        font-size: 24rpx;
      }
    }
  }
}
</style>
