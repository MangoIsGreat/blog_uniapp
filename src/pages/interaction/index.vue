<template>
  <view>
    <view class="top"></view>
    <scroll-view
      :scroll-y="true"
      :refresher-enabled="true"
      refresher-default-style="black"
      class="scroll-Y"
      @scrolltoupper="scrolltoupper"
      @scrolltolower="scrolltolower"
    >
      <view v-for="(item, index) in list" :key="index" class="scroll-view-item">
        {{ index }}
      </view>
    </scroll-view>
    <view>{{ "up:" + up + " down:" + down }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
      up: "",
      down: "",
    };
  },
  methods: {
    scrolltoupper() {
      console.log("up");
      this.up = "up111";
    },
    scrolltolower() {
      console.log("down");
      this.down = "down222";
    },
  },
};
</script>

<style>
.top {
  height: 80rpx;
}

.scroll-Y {
  height: 1200rpx;
  background-color: skyblue;
}

.scroll-view-item {
  width: 100%;
  height: 100rpx;
  background-color: pink;
  margin-bottom: 30rpx;
}
</style>
