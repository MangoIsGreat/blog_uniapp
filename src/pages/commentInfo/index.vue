<template>
  <view class="comment-info-wrapper">
    <scroll-view
      class="scroll-view-wrapper"
      :scroll-y="true"
      :refresher-enabled="false"
      refresher-default-style="black"
      :upper-threshold="100"
      :lower-threshold="100"
      @scrolltoupper="onDown"
      @scrolltolower="onUp"
    >
      <view v-for="(item, index) in list" :key="index" class="scroll-view-item">
        <ListItem />
      </view>

      <cl-loadmore
        v-if="loading"
        :loading="loading"
        background-color="#fff"
        :finish="isFinish"
        :divider="false"
      ></cl-loadmore>
    </scroll-view>
  </view>
</template>

<script>
import ListItem from "./components/ListItem.vue";

export default {
  data() {
    return {
      list: [],
      loading: false,
      isFinish: true,
      pageLoading: true,
    };
  },
  components: {
    ListItem,
  },
  onLoad() {
    this.onDown();
  },
  methods: {
    onUp() {
      this.loading = true;
      this.isFinish = false;

      setTimeout(() => {
        this.list.push(...new Array(20).fill(1));
        this.loading = false;
        this.isFinish = true;
      }, 1000);
    },

    onDown() {
      setTimeout(() => {
        this.list = new Array(20).fill(1);
        this.pageLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
page,
.comment-info-wrapper {
  height: 100%;
  overflow: hidden;

  .scroll-view-wrapper {
    height: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
    background-color: #fff;
  }

  .item {
    margin: 20rpx;
  }
}
</style>
