<template>
  <view class="list-item-wrapper">
    <view class="avatar">
      <cl-avatar :src="listData.avatar"></cl-avatar>
    </view>
    <view class="author-content">
      <view class="author-content-line">
        <view class="author-content-line-author">
          <view class="content-line-author-name">{{ listData.nickname }}</view>
          <view class="content-line-author-job">{{ listData.profession }}</view>
        </view>
        <cl-button type="success" plain round @click="follow(listData.id)">
          <text class="attention" v-if="listData.isAttention">已关注</text>
          <text v-else>+ 关注</text>
        </cl-button>
      </view>
      <view class="author-content-zan"
        >获得 {{ listData.blogLikeNum }} 赞 ·
        {{ listData.blogReadNum }} 阅读</view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: ["listData"],
  methods: {
    follow(id) {
      this.$emit("follow", id);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.list-item-wrapper {
  display: flex;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #fff;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    margin-right: 16rpx;
    border-radius: 50%;
  }

  .author-content {
    flex: 1;

    .author-content-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-content-line-author {
        .content-line-author-name {
          margin-bottom: 8rpx;
          @include setBigTitle();
        }

        .content-line-author-job {
          margin-bottom: 10rpx;
          @include setSmallTitle();
        }
      }

      .attention {
        color: #bbb;
      }
    }

    .author-content-zan {
      @include setSmallTitle();
    }
  }
}
</style>
