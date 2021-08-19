<template>
  <view class="login-wrapper">
    <view class="login-wrapper-account">
      <cl-input
        class="login-wrapper-input"
        placeholder="请输入账号"
        :border="false"
        clearable
        v-model="account"
      >
      </cl-input>
    </view>
    <view class="login-wrapper-password">
      <cl-input
        class="login-wrapper-input"
        placeholder="请输入密码"
        :border="false"
        clearable
        password
        v-model="password"
      ></cl-input>
    </view>
    <view class="login-wrapper-btn">
      <cl-button @click="login" class="login-wrapper-btn-t" type="success"
        >登录</cl-button
      >
    </view>
    <view class="login-wrapper-register">
      <text @click="register" class="login-wrapper-register-txt"
        >没有账号？点击注册</text
      >
    </view>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  data() {
    return {
      account: "", // 账号
      password: "", // 密码
    };
  },
  methods: {
    register() {
      uni.navigateTo({
        url: "/pages/register/index",
      });
    },
    async login() {
      const data = await request({
        url: "/user/login",
        method: "POST",
        data: {
          account: this.account,
          secret: this.password,
          type: 101, // email账号类型登录
        },
      });

      if (data.data.error_code === 0) {
        console.log("成功过");
        // 缓存token至本地
        uni.setStorageSync("user_token", data.data.token);
        // 缓存用户信息至本地
        uni.setStorageSync("user_info", data.data.data);
        // 返回首页
        uni.switchTab({
          url: "/pages/index/index",
        });
      } else {
        this.$refs["toast"].open({
          message: "登录失败！",
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.login-wrapper {
  padding: 100rpx 50rpx;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100vh;
  background-color: #fff;

  .login-wrapper-account,
  .login-wrapper-password {
    padding: 40rpx 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .login-wrapper-input {
      border-bottom: 1px solid #ccc;
    }
  }

  .login-wrapper-password {
    margin-bottom: 40rpx;
  }

  .login-wrapper-btn {
    display: flex;
    margin-bottom: 10rpx;

    .login-wrapper-btn-t {
      flex: 1;
      height: 80rpx;
    }
  }

  .login-wrapper-register {
    text-align: center;

    .login-wrapper-register-txt {
      font-size: 26rpx;
      color: #67c23a;
    }
  }
}
</style>
