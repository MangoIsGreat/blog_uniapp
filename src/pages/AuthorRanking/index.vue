<template>
  <view class="author-ranking-wrapper">
    <cl-scroller ref="scroller" @up="onUp" @down="onDown">
      <view
        @click="toUserInfo"
        class="item"
        v-for="(item, index) in list"
        :key="index"
      >
        <ListItem :listData="item" @follow="follow" />
      </view>

      <cl-loadmore
        v-if="list.length > 0"
        :loading="loading"
        :divider="false"
      ></cl-loadmore>
    </cl-scroller>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import request from "@/http/request";

export default {
  name: "home",
  data() {
    return {
      list: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      countNum: 0, // 总数据长度
    };
  },
  components: {
    ListItem,
  },
  onShow() {
    this.getAuthorList();
  },
  methods: {
    toUserInfo() {
      uni.navigateTo({
        url: "/pages/userInfo/index",
      });
    },

    async follow(id) {
      const data = await request({
        url: "/fans/follow",
        method: "POST",
        data: {
          leader: id,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "关注失败！",
        });
      }

      if (data.data.data === "ok") {
        this.list.forEach((item) => {
          if (item.id === id) {
            item.isAttention = true;
          }
        });
      } else if (data.data.data === "cancel") {
        this.list.forEach((item) => {
          if (item.id === id) {
            item.isAttention = false;
          }
        });
      }
    },

    onUp() {
      this.loading = true;

      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        return;
      }

      this.getAuthorList();
    },

    async onDown() {
      console.log(47, this.pageIndex);
      console.log(89, Math.ceil(this.countNum / this.pageSize));
      // 当前页大于总页数时停止请求数据：
      // if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // this.getAuthorList();
    },
    async getAuthorList() {
      const list = await request({
        url: "/author/ranking",
        method: "GET",
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });

      if (list.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "列表数据请求失败！",
        });
      }

      this.list.push(...list.data.data.rows);
      this.$refs["scroller"].end();

      this.countNum = listData.data.data.count;

      this.loading = false;

      this.pageIndex++;
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page {
  // #ifdef H5
  height: 100%;
  // #endif

  // #ifndef H5
  height: 100vh;
  // #endif
}

.author-ranking-wrapper {
  height: 100%;
  overflow: hidden;

  .cl-scroller__wrap {
    padding-bottom: 0;
  }

  .cl-divider__text {
    background-color: $global-bg-color !important;
  }
}
</style>
