<template>
  <view class="publish-idea-wrapper">
    <!-- 输入框 -->
    <cl-textarea
      v-model="value"
      :style="{ border: 'none', marginBottom: '20rpx' }"
      placeholder="告诉你一个秘密，发布动态不能少于5个字哦，另外添加合适的话题会被更多的人看见~"
    ></cl-textarea>
    <!-- 上传图片 -->
    <cl-upload
      :style="{ marginBottom: '20rpx' }"
      v-model="urls"
      multiple
      :limit="3"
      action="/pro/admin/comm/upload"
    ></cl-upload>
    <!-- 添加话题 -->
    <cl-button type="success" plain round
      >添加话题<text class="iconfont icon-xiangyou"></text
    ></cl-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      urls: null,
    };
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
}

.publish-idea-wrapper {
  height: 100%;
  padding: 0 16rpx;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
