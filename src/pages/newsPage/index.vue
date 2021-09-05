<template>
  <view class="article-page-wrapper">
    <NavBar :title="blogInfo.title" @share="toggleShare" />
    <!-- 页面内容部分 -->
    <view class="content">
      <view class="content-article">
        <view class="content-article-author">
          <view class="content-article-author-name">
            <view
              @click="toAuthorPage(blogInfo.User && blogInfo.User.id)"
              class="avatar"
            >
              <cl-avatar
                :src="blogInfo.User && blogInfo.User.avatar"
              ></cl-avatar>
            </view>
            <view class="name-box">
              <view class="name">{{
                blogInfo.User && blogInfo.User.nickname
              }}</view>
              <view class="time">{{ blogInfo.created_at | relativeTime }}</view>
            </view>
          </view>
        </view>
        <view class="content-article-title">
          <view class="article-titke">{{ blogInfo.title }}</view>
          <image
            v-if="blogInfo.titlePic"
            class="main-pic"
            :src="blogInfo.titlePic"
          ></image>
        </view>
        <view class="content-article-body" v-html="compiledMarkdown"></view>
        <view class="content-article-footer">
          <view class="tag">
            <text class="tag-item">{{
              blogInfo.NewsType && blogInfo.NewsType.tagName
            }}</text>
          </view>
          <view class="zan">阅读&nbsp;{{ blogInfo.newsReadNum }}</view>
        </view>
      </view>
      <view class="content-more-art">
        <view class="tit">相关文章</view>
        <view
          @click="toPage(item.id)"
          class="more-art-item"
          v-for="(item, index) in moreArtList"
          :key="index"
        >
          <view class="title">{{ item.title }}</view>
          <view class="zan-num"
            >{{ item.User && item.User.nickname }}&nbsp;·&nbsp;{{
              item.newsReadNum
            }}阅读&nbsp;·&nbsp;{{ item.created_at | relativeTime }}</view
          >
        </view>
      </view>
    </view>
    <!-- 底部弹框 -->
    <Share @share="toggleShare" :visible="isShare" />
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import NavBar from "@/components/NavBar/index.vue";
import Share from "@/components/Share/index.vue";
import request from "@/http/request";
// import marked from "marked";

let marked = require("marked");
let hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  // sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

export default {
  data() {
    return {
      blogInfo: {}, // 博客详情
      moreArtList: [],
      commentsList: [],
      isShare: false, // 是否分享
      newsId: "", // 博客id
      mdContent: "", // 博客内容
    };
  },
  components: {
    NavBar,
    Share,
  },
  computed: {
    compiledMarkdown() {
      return marked(this.mdContent || "");
    },
  },
  onLoad(options) {
    this.newsId = options.id;
  },
  onShow() {
    // 获取博客信息
    this.getBlogInfo();

    // 获取相关文章
    this.getMoreArt();
  },
  methods: {
    async getBlogInfo() {
      let data = {
        id: this.newsId,
      };

      const blog = await request({
        url: "/news/article",
        method: "GET",
        data,
      });

      if (blog.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "博客数据请求失败！",
        });
      }

      // this.mdContent = marked(blog.data.data.content || "");
      this.mdContent = blog.data.data.content || "";

      this.blogInfo = blog.data.data;
    },
    async getMoreArt() {
      let data = {
        id: this.newsId,
        pageIndex: 1,
        pageSize: 6,
      };

      const moreData = await request({
        url: "/news/more",
        method: "GET",
        data,
      });

      if (moreData.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "更多博客数据请求失败！",
        });
      }

      this.moreArtList = moreData.data.data.rows;
    },
    toPage(id) {
      uni.navigateTo({ url: `/pages/newsPage/index?id=${id}` });
    },
    toAuthorPage(id) {
      uni.navigateTo({ url: `/pages/userInfo/index?id=${id}` });
    },
    toggleShare(value) {
      this.isShare = value;
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";
@import "highlight.js/styles/default.css";

page,
.article-page-wrapper {
  background-color: #fff;
  height: 100%;

  img {
    width: 100%;
  }

  pre {
    overflow-x: scroll;
  }

  .content {
    padding-bottom: 90rpx;

    .content-article {
      padding: 30rpx 0;

      .content-article-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;

        .content-article-author-name {
          display: flex;
          align-items: center;

          .avatar {
            margin-right: 20rpx;
          }

          .name-box {
            .name {
              @include setSmallTitle($title-color, 30rpx, 28rpx);
              margin-bottom: 8rpx;
            }

            .time {
              @include setSmallTitle();
            }
          }
        }
      }

      .content-article-title {
        padding: 0 30rpx;
        box-sizing: border-box;
        .article-titke {
          @include setBigTitle(34rpx, $title-color, 48rpx);
          margin-bottom: 20rpx;
        }

        .main-pic {
          width: 100%;
          margin-bottom: 30rpx;
        }
      }

      .content-article-body {
        @include setSmallTitle($article-info-color, 44rpx, 28rpx);
        margin-bottom: 30rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
      }

      .content-article-footer {
        border-bottom: $border-line;

        .tag {
          margin-left: 20rpx;
        }

        .tag-item {
          @include setSmallTitle($article-desc-color, 28rpx, 28rpx);
          padding: 10rpx 14rpx;
          margin-right: 10rpx;
          background-color: #eee;
          padding: 0 30rpx;
          box-sizing: border-box;
        }

        .zan {
          margin: 24rpx 0;
          @include setSmallTitle();
          padding: 0 30rpx;
          box-sizing: border-box;
        }
      }
    }

    .content-more-art {
      border-top: $border-line;
      margin-bottom: 16rpx;

      .tit {
        padding: 0 30rpx;
        box-sizing: border-box;
        @include setSmallTitle($title-color, 80rpx, 32rpx);
        border-bottom: $border-line;
      }

      .more-art-item {
        border-bottom: $border-line;
        padding: 30rpx;
        box-sizing: border-box;

        .title {
          @include setSmallTitle($title-color, 28rpx, 28rpx);
          margin-bottom: 18rpx;
        }

        .zan-num {
          @include setSmallTitle();
        }
      }
    }
  }
}
</style>
