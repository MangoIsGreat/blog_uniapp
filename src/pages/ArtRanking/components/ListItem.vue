<template>
  <view class="list-item-wrapper">
    <view class="list-item-wrapper-title">{{ listData.title }}</view>
    <view class="list-item-wrapper-content">
      <view class="item-wrapper-content-article">
        <view class="author-line">
          <text class="author-line-name">{{ listData.User.nickname }}</text>
          <text class="author-line-time">1小时前</text>
        </view>
        <view class="article">
          {{ listData.description }}
        </view>
      </view>
      <image
        v-if="listData.titlePic"
        class="item-wrapper-content-pic"
        mode="center"
        :src="listData.titlePic"
        @error="imageError"
      ></image>
    </view>
    <view class="bottom-line">
      <view class="operate">
        <view class="operate-dianzan"
          ><text class="iconfont icon-yanjing"></text
          ><text>{{ listData.blogReadNum }}</text></view
        >
        <view class="operate-dianzan"
          ><text class="iconfont icon-dianzan"></text
          ><text>{{ listData.blogLikeNum }}</text></view
        >
        <view class="operate-pinglun"
          ><text class="iconfont icon-pinglun"></text
          ><text>{{ listData.commentNum }}</text></view
        >
      </view>
      <text class="lang-type">{{ listData.Tag.tagName }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    listData: Object,
  },
  methods: {
    imageError(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.list-item-wrapper {
  padding: 30rpx;
  box-sizing: border-box;
  margin-bottom: 16rpx;
  background-color: #fff;

  .list-item-wrapper-title {
    width: 100%;
    margin-bottom: 18rpx;
    @include setBigTitle();
    @include ellipsis();
  }

  .list-item-wrapper-content {
    display: flex;
    margin-bottom: 18rpx;

    .item-wrapper-content-article {
      flex: 1;
      padding-right: 30rpx;
      box-sizing: border-box;

      .author-line {
        margin-bottom: 8rpx;
        @include setSmallTitle();

        .author-line-name {
          padding-right: 18rpx;
          border-right: $border-line;
        }

        .author-line-time {
          padding: 0 18rpx;
        }
      }

      .article {
        @include ellipsis2();
        @include setArticleInfo();
      }
    }

    .item-wrapper-content-pic {
      width: 168rpx;
      height: 128rpx;
    }
  }

  .bottom-line {
    display: flex;
    justify-content: space-between;
    @include setSmallTitle();

    .operate {
      display: flex;
      .operate-dianzan {
        margin-right: 20rpx;
      }

      .iconfont {
        margin-right: 6rpx;
        color: #96909c;
      }
    }

    .lang-type {
      padding: 8rpx;
      background-color: #f4f5f5;
      border-radius: 8rpx;
    }
  }
}
</style>
