<template>
  <view class="list-item-wrapper">
    <view class="list-item-wrapper-title">{{
      listData.Blog && listData.Blog.title
    }}</view>
    <view class="list-item-wrapper-content">
      <view class="item-wrapper-content-article">
        <view class="author-line">
          <text class="author-line-name">{{
            listData.Blog && listData.Blog.User && listData.Blog.User.nickname
          }}</text>
          <text class="author-line-time">{{
            listData.created_at | relativeTime
          }}</text>
        </view>
        <view class="article">
          {{ listData.Blog && listData.Blog.description }}
        </view>
      </view>
      <!-- <image
        v-if="listData.Blog && listData.Blog.titlePic"
        class="item-wrapper-content-pic"
        mode="center"
        :src="listData.Blog && listData.Blog.titlePic"
      ></image> -->
      <view
        v-if="listData.Blog && listData.Blog.titlePic"
        class="item-wrapper-content-pic"
        :style="{ backgroundImage: `url(${listData.Blog && listData.Blog.titlePic})` }"
      ></view>
    </view>
    <view class="bottom-line">
      <view class="operate">
        {{
          listData.Blog && listData.Blog.blogReadNum
        }}&nbsp;阅读&nbsp;·&nbsp;{{
          listData.Blog && listData.Blog.blogLikeNum
        }}&nbsp;赞&nbsp;·&nbsp;{{
          listData.Blog && listData.Blog.commentNum
        }}&nbsp;评论
      </view>
      <text class="lang-type">{{
        listData.Blog && listData.Blog.Tag && listData.Blog.Tag.tagName
      }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: ["listData"],
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
