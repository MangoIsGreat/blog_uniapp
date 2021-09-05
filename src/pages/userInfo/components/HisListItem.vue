<template>
  <view class="his-list-item-wrapper" @click="toNewPage">
    <view class="list-item-tit" v-if="listData.type === 100"
      >{{ listData.User && listData.User.nickname }}&nbsp;发布了文章</view
    >
    <view class="list-item-tit" v-if="listData.type === 200"
      >{{
        listData.userInfo && listData.userInfo.nickname
      }}&nbsp;发布了动态</view
    >
    <view class="list-item-tit" v-if="listData.type === 300"
      >{{ listData.User && listData.User.nickname }}&nbsp;发布了资讯</view
    >
    <view class="list-item-tit" v-if="listData.type === 400"
      >{{ listData.User && listData.User.nickname }}&nbsp;赞了这篇文章</view
    >
    <view class="list-item-tit" v-if="listData.type === 500"
      >{{ listData.User && listData.User.nickname }}&nbsp;赞了动态</view
    >
    <view class="list-item-tit" v-if="listData.type === 600"
      >{{ listData.User && listData.User.nickname }}&nbsp;赞了资讯</view
    >
    <view class="list-item-wrapper" v-if="listData.type === 400">
      <view class="list-item-wrapper-title">{{
        listData.Blog && listData.Blog.title
      }}</view>
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
            {{ listData.Blog && listData.Blog.description }}
          </view>
        </view>
        <view
          v-if="listData.Blog && listData.Blog.titlePic"
          class="item-wrapper-content-pic"
          :style="{
            backgroundImage: `url(${listData.Blog && listData.Blog.titlePic})`,
          }"
        ></view>
      </view>
      <view class="bottom-line">
        {{ listData.Blog && listData.Blog.blogReadNum }}&nbsp;阅读&nbsp;&nbsp;{{
          listData.Blog && listData.Blog.blogLikeNum
        }}&nbsp;赞&nbsp;&nbsp;{{
          listData.Blog && listData.Blog.commentNum
        }}评论
      </view>
    </view>
    <view class="list-item-wrapper" v-if="listData.type === 100">
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
        <text
          >{{ listData.blogReadNum }}&nbsp;阅读&nbsp;·&nbsp;{{
            listData.blogLikeNum
          }}&nbsp;赞&nbsp;·&nbsp;{{ listData.commentNum }}评论</text
        >
        <text class="lang-type">{{
          listData.Tag && listData.Tag.tagName
        }}</text>
      </view>
    </view>
    <view class="list-item-wrapper" v-if="listData.type === 300">
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
        <text>
          {{ listData.newsReadNum }}&nbsp;阅读&nbsp;·&nbsp;{{
            listData.newsLikeNum
          }}&nbsp;赞
        </text>
        <text class="lang-type">{{
          listData.NewsType && listData.NewsType.tagName
        }}</text>
      </view>
    </view>
    <view class="list-item-wrapper" v-if="listData.type === 600">
      <view class="list-item-wrapper-title">{{
        listData.News && listData.News.title
      }}</view>
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
            {{ listData.News && listData.News.description }}
          </view>
        </view>
        <view
          v-if="listData.News && listData.News.titlePic"
          class="item-wrapper-content-pic"
          :style="{
            backgroundImage: `url(${listData.News && listData.News.titlePic})`,
          }"
        ></view>
      </view>
      <view class="bottom-line">
        <text>
          {{
            listData.News && listData.News.newsReadNum
          }}&nbsp;阅读&nbsp;·&nbsp;{{
            listData.News && listData.News.newsLikeNum
          }}&nbsp;赞
        </text>
      </view>
    </view>
    <view
      v-if="listData.type === 500"
      class="list-item-wrapper interaction-listItem-wrapper"
    >
      <view class="list-row-top">
        <view class="list-row-header">
          <view class="list-row-header-content">
            <view class="list-row-header-content-tit">{{
              listData.User && listData.User.nickname
            }}</view>
            <view class="list-row-header-content-desc">
              {{ listData.User && listData.User.profession }}&nbsp;&nbsp;{{
                listData.created_at | relativeTime
              }}
            </view>
          </view>
        </view>
        <view class="list-row-content">
          <text
            v-if="listData.Dynamic && listData.Dynamic.theme"
            class="tag-type"
            >#{{ listData.Dynamic && listData.Dynamic.theme }}#</text
          >&nbsp;{{ listData.Dynamic && listData.Dynamic.content }}
        </view>
        <view
          class="list-row-pic"
          v-if="listData.Dynamic && listData.Dynamic.picUrl"
        >
          <!-- <image
            v-for="(item, index) in listData.Dynamic.picUrl"
            :key="index"
            class="list-row-pic-item"
            mode="center"
            :src="item"
          ></image> -->
          <view
            v-for="(item, index) in listData.Dynamic.picUrl"
            :key="index"
            class="list-row-pic-item"
            :style="{ backgroundImage: `url(${item})` }"
          ></view>
        </view>
      </view>
    </view>
    <view
      v-if="listData.type === 200"
      class="list-item-wrapper interaction-listItem-wrapper"
    >
      <view class="list-row-top">
        <view class="list-row-header">
          <view class="list-row-header-content">
            <view class="list-row-header-content-tit">{{
              listData.userInfo && listData.userInfo.nickname
            }}</view>
            <view class="list-row-header-content-desc">
              {{
                listData.userInfo && listData.userInfo.profession
              }}&nbsp;·&nbsp;{{ listData.created_at | relativeTime }}
            </view>
          </view>
        </view>
        <view class="list-row-content">
          <text v-if="listData.theme" class="tag-type"
            >#{{ listData.theme }}#</text
          >&nbsp;{{ listData.content }}
        </view>
        <view class="list-row-pic" v-if="listData.picUrl">
          <!-- <image
            v-for="(item, index) in listData.picUrl"
            :key="index"
            class="list-row-pic-item"
            mode="center"
            :src="item"
          ></image> -->
          <view
            v-for="(item, index) in listData.picUrl"
            :key="index"
            class="list-row-pic-item"
            :style="{ backgroundImage: `url(${item})` }"
          ></view>
        </view>
      </view>
    </view>
    <view
      v-if="listData.type === 700"
      class="list-item-wrapper interaction-listItem-wrapper"
    >
      <view class="list-row-top" style="paddingBottom: 0">
        <view class="list-row-header">
          <view class="list-row-header-content">
            <view style="display: flex; fontSize: 28rpx;">
              <view class="list-row-header-content-tit">{{
                listData.attention && listData.attention.nickname
              }}</view>
              &nbsp;关注了&nbsp;<view class="list-row-header-content-tit">{{
                listData.beAttention && listData.beAttention.nickname
              }}</view>
            </view>
            <view class="list-row-header-content-desc">
              {{
                listData.attention && listData.attention.profession
              }}&nbsp;·&nbsp;{{ listData.created_at | relativeTime }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    listData: Object,
  },
  methods: {
    toNewPage() {
      const listData = this.listData;
      let path = "";

      if (listData.type === 700) return;

      switch (listData.type) {
        case 100:
          path = `/pages/articlePage/index?id=${listData.id}`;
          break;
        case 200:
          path = `/pages/interactionPage/index?id=${listData.id}`;
          break;
        case 300:
          path = `/pages/newsPage/index?id=${listData.id}`;
          break;
        case 400:
          path = `/pages/articlePage/index?id=${listData.blog}`;
          break;
        case 500:
          path = `/pages/interactionPage/index?id=${listData.dynamic}`;
          break;
        case 600:
          path = `/pages/interactionPage/index?id=${listData.newsId}`;
          break;
        default:
          break;
      }

      uni.navigateTo({ url: path });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.his-list-item-wrapper {
  margin-bottom: 16rpx;
  background-color: #fff;

  .list-item-tit {
    font-size: 26rpx;
    color: $article-desc-color;
    line-height: 70rpx;
    padding: 0 30rpx;
    border-bottom: $border-line;
  }
}

.list-item-wrapper {
  padding: 30rpx;
  box-sizing: border-box;

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

    .lang-type {
      padding: 8rpx;
      background-color: #f4f5f5;
      border-radius: 8rpx;
    }
  }
}

.interaction-listItem-wrapper {
  margin-bottom: 16rpx;
  background-color: #fff;

  .list-row-top {
    box-sizing: border-box;
    padding: 18rpx;

    .list-row-header {
      display: flex;
      margin-bottom: 20rpx;

      .avatar {
        @include setAvatar(80rpx, 80rpx);
      }

      .list-row-header-content {
        .list-row-header-content-tit {
          @include setBigTitle(28rpx);
          margin-bottom: 6rpx;
        }

        .list-row-header-content-desc {
          @include setSmallTitle();
        }
      }
    }

    .list-row-content {
      margin-bottom: 24rpx;
      @include setArticleInfo();

      .tag-type {
        color: $primary-color;
        // font-size: 28rpx;
      }
    }

    .list-row-pic {
      display: flex;
      justify-content: space-around;
      margin-bottom: 24rpx;

      .list-row-pic-item {
        // width: 220rpx;
        // height: 220rpx;
        @include setBgImg2(220rpx, 220rpx);
      }
    }
  }

  .list-row-bottom {
    display: flex;

    .iconfont {
      flex: 1;
      line-height: 74rpx;
      text-align: center;
      font-size: 28rpx;
      color: #6e8194;
    }
  }
}
</style>
