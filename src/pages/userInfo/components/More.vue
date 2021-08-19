<template>
  <view>
    <cl-list-item
      @click="toPage('/pages/likeListPage/index')"
      class="list-item"
      label="赞过的"
    >
      <text slot="append" class="right">176篇</text>
    </cl-list-item>
    <cl-list-item
      @click="toPage('/pages/collectionArtPage/index')"
      class="list-item"
      label="收藏集"
    >
      <text slot="append" class="right">20个</text>
    </cl-list-item>
  </view>
</template>

<script>
export default {
  methods: {
    toPage(path) {
      uni.navigateTo({
        url: path,
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
