<template>
  <view class="list-item-wrapper">
    <view class="list-item-wrapper-title"
      >一款阿里开源解析excel框架插件"easy-excel"一款阿里开源解析excel框架插件一款阿里开源解析excel框架插件</view
    >
    <view class="list-item-wrapper-content">
      <view class="item-wrapper-content-article">
        <view class="article">
          背景面试题:后台传给前端十万条数据,你作为前端如何渲染到页面上?
          回答者A：我有句话不知当讲不当讲,这什么鬼需求。 背景
          面试题:后台传给前端十万条数据,你作为前端如何渲染到页面上?
          回答者A：我有句话不知当讲不当讲,这什么鬼需求。
        </view>
        <view class="author-line">
          <text class="author-line-name">橘颂Java</text>
          <text class="author-line-time">1小时前</text>
          <text class="author-line-zan">0点赞·0评论</text>
        </view>
      </view>
      <image
        class="item-wrapper-content-pic"
        mode="center"
        src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77cd95ab46b5478eb8327a450f36e5c1~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
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

    .item-wrapper-content-article {
      flex: 1;
      padding-right: 30rpx;
      box-sizing: border-box;

      .author-line {
        margin-top: 16rpx;
        @include setSmallTitle();

        .author-line-name {
          padding-right: 18rpx;
          border-right: $border-line;
        }

        .author-line-time {
          padding: 0 18rpx;
          border-right: $border-line;
        }

        .author-line-zan {
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
