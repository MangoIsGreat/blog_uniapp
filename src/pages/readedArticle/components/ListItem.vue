<template>
  <view class="list-item-wrapper">
    <view class="list-item-wrapper-title">{{ listData.title }}</view>
    <view class="list-item-wrapper-content">
      <view class="item-wrapper-content-article">
        <view class="author-line">
          <text class="author-line-name">{{
            listData.User && listData.User.nickname
          }}</text>
          <text class="author-line-time">{{
            listData.created_at | relativeTime
          }}</text>
        </view>
        <view class="article">
          {{ listData.description }}
        </view>
      </view>
      <view
        v-if="listData.titlePic"
        class="item-wrapper-content-pic"
        :style="{ backgroundImage: `url(${listData.titlePic})` }"
      ></view>
    </view>
    <view class="bottom-line">
      <view class="operate">
        {{ listData.blogReadNum }}阅读&nbsp;·&nbsp;{{
          listData.blogLikeNum
        }}赞&nbsp;·&nbsp;{{ listData.commentNum }}&nbsp;评论
      </view>
      <text class="lang-type">{{ listData.Tag && listData.Tag.tagName }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    listData: Object,
  },
  methods: {},
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
      @include setBgImg2(168rpx, 128rpx);
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
