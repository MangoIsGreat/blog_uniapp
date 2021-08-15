<template>
  <view class="login-wrapper">
    <view class="login-wrapper-account">
      <cl-input
        class="login-wrapper-input"
        placeholder="请输入昵称"
        :border="false"
        clearable
        v-model="nickname"
      >
      </cl-input>
    </view>
    <view class="login-wrapper-account">
      <cl-input
        class="login-wrapper-input"
        placeholder="请输入邮箱"
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
        v-model="password1"
      ></cl-input>
    </view>
    <view class="login-wrapper-password">
      <cl-input
        class="login-wrapper-input"
        placeholder="确认密码"
        :border="false"
        clearable
        password
        v-model="password2"
      ></cl-input>
    </view>
    <view class="login-wrapper-btn">
      <cl-button @click="register" class="login-wrapper-btn-t" type="success"
        >注册</cl-button
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
      nickname: "", // 昵称
      account: "", // 账号
      password1: "", // 密码
      password2: "", // 确认密码
    };
  },
  methods: {
    async register() {
      // 昵称只能为中文、字母或则数字
      const reg1 = /[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]+/;
      if (
        reg1.test(this.nickname) !== true &&
        this.nickname.length > 4 &&
        this.nickname.length < 32
      ) {
        return this.$refs["toast"].open({
          message: "昵称长度为4-32个字符且只能输入中文、字母、数字！",
        });
      }

      // 账号为“邮箱”格式
      const reg2 = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg2.test(this.account) !== true) {
        return this.$refs["toast"].open({
          message: "不是正确的Email格式！",
        });
      }

      // 密码长度为6到32,且包含字符、数字或_
      const reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
      if (!this.password1 || !this.password2) {
        return this.$refs["toast"].open({
          message: "密码不能为空！",
        });
      } else if (this.password1 !== this.password2) {
        return this.$refs["toast"].open({
          message: "两次密码输入不一致！",
        });
      } else if (reg3.test(this.password2) !== true) {
        return this.$refs["toast"].open({
          message: "密码长度为6到32,且包含字符、数字或_！",
        });
      }

      const data = await request({
        url: "/user/register",
        method: "POST",
        data: {
          email: this.account,
          password: this.password2,
          nickname: this.nickname,
        },
      });

      if (data.data.error_code === 0) {
        this.$refs["toast"].open({
          message: "恭喜您，注册成功！",
        });

        setTimeout(() => {
          // 返回上一页
          uni.navigateBack();
        }, 200);
      } else {
        this.$refs["toast"].open({
          message: "注册失败！",
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
