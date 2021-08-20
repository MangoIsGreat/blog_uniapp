<template>
  <view>
    <cl-list-item
      @click="toPage('/pages/likeListPage/index')"
      class="list-item"
      label="赞过的"
    >
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item
      @click="toPage('/pages/collectionArtPage/index')"
      class="list-item"
      label="收藏集"
    >
      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
  </view>
</template>

<script>
export default {
  props: ["userInfo"],
  methods: {
    toPage(path) {
      uni.navigateTo({
        url: `${path}?id=${this.userInfo.id}`,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.list-item {
  border-bottom: $border-line;
}
</style>
