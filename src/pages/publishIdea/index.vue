<template>
  <view class="publish-idea-wrapper">
    <view
      class="nav-bar-body"
      :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
    >
      <text @click="goBack" class="iconfont icon-xiangzuo"></text>
      <text class="title">发布动态</text>
      <text class="publish" @click="publish">发布</text>
    </view>
    <!-- 输入框 -->
    <cl-textarea
      ref="input"
      v-model="value"
      :style="{ border: 'none', marginBottom: '20rpx' }"
      placeholder="告诉你一个秘密，发布动态不能少于5个字哦，另外添加合适的话题会被更多的人看见~"
    ></cl-textarea>
    <!-- 上传图片 -->
    <!-- <cl-upload
      :style="{ marginBottom: '20rpx' }"
      v-model="urls"
      multiple
      :limit="3"
      :action="uploadURL"
      name="file"
      :data="{ type: 'circle' }"
    ></cl-upload> -->
    <view @click="uploadImg" class="upload-pic">
      <text class="iconfont icon-jiahao"></text>
    </view>
    <!-- 添加话题 -->
    <cl-button @click="addTheme" class="publish-btn" type="success" plain round>
      <text v-if="selected">{{ selected }}</text>
      <text v-else
        >添加话题<text class="iconfont icon-xiangyou iconfont-xiangyou"></text
      ></text>
    </cl-button>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";
import baseUrl from "@/http/url";

export default {
  data() {
    return {
      uploadURL: baseUrl + "/upload",
      value: "",
      urls: null,
      statusBarHeight: 0,
      selected: "", // 选中的话题
      imglist: [], // 选中的图片数组
    };
  },
  onLoad(options) {
    // 获取手机顶部navbar高度
    this.getNavHeight();

    // 获取选中的话题
    uni.$on("selectedTheme", (res) => {
      this.selected = res.theme;
    });
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.input.focus = true;
    });
  },
  methods: {
    // 获取手机顶部navbar高度
    getNavHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
    },
    goBack() {
      uni.switchTab({ url: "/pages/interaction/index" });
    },
    async publish() {
      if (!this.selected) {
        return this.$refs["toast"].open({
          message: "请添加话题！",
        });
      }

      const data = await request({
        url: "/dynamic/create",
        method: "POST",
        data: {
          theme: this.selected,
          content: this.value,
          picUrl: "",
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "发布失败！",
        });
      }

      uni.switchTab({ url: "/pages/interaction/index" });
    },
    addTheme() {
      uni.navigateTo({
        url: "/pages/themeList/index",
      });
    },
    uploadImg() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        success: function(res) {
          this.imglist = res.tempFilePaths;

          uni.uploadFile({
            url: this.uploadURL,
            filePath: res.tempFilePaths[0],
            name: "file",
            formData: {
              type: "circle",
            },

            success: (resp) => {
              console.log(99, resp);

              // success++;
              // imgurln = imgurln.concat(app.globalData.url + resp.data);
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page {
  height: 100%;
}

.publish-idea-wrapper {
  height: 100%;
  padding: 0 16rpx;
  box-sizing: border-box;
  background-color: #fff;

  .nav-bar-body {
    width: 100%;
    padding: 12rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #f9f9f9;

    .icon-xiangzuo,
    .publish {
      width: 80rpx;
      line-height: 56rpx;
      font-weight: 700;
      color: $primary-color;
    }

    .title {
      flex: 1;
      color: $title-color;
      font-weight: 700;
      text-align: center;
    }
  }

  .upload-pic {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
    border: 2px dotted #dedfe6;
    border-radius: 10rpx;
    text-align: center;

    .icon-jiahao {
      line-height: 200rpx;
      font-size: 40rpx;
    }
  }

  .publish-btn {
    color: #67c23a;
  }

  .iconfont-xiangyou {
    color: #67c23a;
    font-size: 28rpx;
  }
}
</style>
