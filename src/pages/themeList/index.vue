<template>
  <view class="theme-list-wrapper">
    <view
      class="theme-list-item"
      v-for="(item, index) in themeList"
      :key="index"
      @click="selectTheme(item.themeName)"
    >
      <view>{{ item.themeName }}</view>
      <view class="theme-list-item-right">{{ item.artNum }}动态</view>
    </view>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  data() {
    return {
      themeList: [],
    };
  },
  onShow(options) {
    this.getThemeList();
  },
  methods: {
    async getThemeList() {
      const data = await request({
        url: "/theme/list",
        method: "GET",
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "获取话题列表失败！",
        });
      }

      this.themeList = data.data.data;
    },
    selectTheme(name) {
      uni.navigateBack({ delta: 1 });

      uni.$emit("selectedTheme", { theme: name });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page {
  height: 100%;
  background-color: #fff;
}

.theme-list-wrapper {
  .theme-list-item {
    display: flex;
    justify-content: space-between;
    padding: 0 30rpx;
    line-height: 120rpx;
    border-bottom: $border-line;

    .theme-list-item-right {
      font-size: 28rpx;
      color: #909090;
    }
  }
}
</style>
