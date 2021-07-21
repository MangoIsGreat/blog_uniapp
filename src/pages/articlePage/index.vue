<template>
  <view class="article-page-wrapper">
    <NavBar @share="toggleShare" />
    <!-- 页面内容部分 -->
    <view class="content">
      <view class="content-article">
        <view class="content-article-author">
          <view class="content-article-author-name">
            <view @click="toAuthorPage" class="avatar">
              <cl-avatar
                src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
              ></cl-avatar>
            </view>
            <view class="name-box">
              <view class="name">政采云前端团队</view>
              <view class="time">3小时前</view>
            </view>
          </view>
          <cl-button type="success" plain round>+ 关注</cl-button>
        </view>
        <view class="content-article-title">
          <view class="article-titke"
            >如何搭建适合自己团队的构建部署平台如何搭建适合自己团队的构建部署平台</view
          >
          <image
            class="main-pic"
            src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/691e53c30b044855a94a97817f0c6f5f~tplv-k3u1fbpfcp-watermark.image"
            @error="imageError"
          ></image>
        </view>
        <view class="content-article-body">
          思维导图镇楼，先感谢大家对我上一篇文的积极点赞，助我完成KPI😄。
          上一篇中给大家讲了Stream的前半部分知识——包括对Stream的整体概览及Stream的创建和Stream的转换流操作，并对Stream一些内部优化点做了简明的说明。
          虽迟但到，今天就来继续给大家更Stream第二部分知识——终结操作，由于这部分的API内容繁多且复杂，所以我单开一篇给大家细细讲讲，我的文章很长，请大家忍耐一下。
          正式开始之前，我们先来说说聚合方法本身的特性(接下来我将用聚合方法代指终结操作中的方法)：
          聚合方法代表着整个流计算的最终结果，所以它的返回值都不是Stream。
          聚合方法返回值可能为空，比如filter没有匹配到的情况，JDK8中用Optional来规避NPE。
          聚合方法都会调用evaluate方法，这是一个内部方法，看源码的过程中可以用它来判定一个方法是不是聚合方法。
          ok，知晓了聚合方法的特性，我为了便于理解，又将聚合方法分为几大类聚合方法代表着整个流计算的最终结果，所以它的返回值都不是Stream。
          聚合方法返回值可能为空，比如filter没有匹配到的情况，JDK8中用Optional来规避NPE。
          聚合方法都会调用evaluate方法，这是一个内部方法，看源码的过程中可以用它来判定一个方法是不是聚合方法。
          ok，知晓了聚合方法的特性，我为了便于理解，又将聚合方法分为几大类
        </view>
        <view class="content-article-footer">
          <view class="tag">
            <text class="tag-item" v-for="(item, index) in tagList" :key="index"
              >前端</text
            >
          </view>
          <view class="zan">赞 96 · 阅读 2876</view>
        </view>
      </view>
      <view class="content-more-art">
        <view class="tit">相关文章</view>
        <view
          @click="toPage"
          class="more-art-item"
          v-for="(item, index) in moreArtList"
          :key="index"
        >
          <view class="title">我在工作中是如何使用git的</view>
          <view class="zan-num">2122 赞 · 167评论 · 政采云团队</view>
        </view>
      </view>
      <view class="content-comment">
        <view
          class="comment-item"
          v-for="(item, index) in commentsList"
          :key="index"
        >
          <view class="avatar" @click="toAuthorPage">
            <cl-avatar
              src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
            ></cl-avatar>
          </view>
          <view class="comment-item-content">
            <view class="head">
              <view class="head-left">
                <view class="name">橘猫哼方</view>
                <view class="time">前端开发 · 1小时前</view>
              </view>
              <view class="head-right">
                <text class="iconfont icon-dianzan"></text>
                <text @click="chat" class="iconfont icon-pinglun"></text>
              </view>
            </view>
            <view class="body">
              行文风格很像阿里行文风格很像阿里行文风格很像阿里行文风格很像阿里行文风格很像阿里
            </view>
            <view class="reply">
              <view
                class="reply-item"
                v-for="(item, index) in [1, 1]"
                :key="index"
              >
                <text @click="toAuthorPage" class="reply-item-name"
                  >手撕红黑树(作者)：</text
                >
                <text>这样回答这样回答这样回答这样回答这样回答这样回答</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 评论组件 -->
      <Comment />
    </view>
    <!-- 底部弹框 -->
    <Share @share="toggleShare" :visible="isShare" />
  </view>
</template>

<script>
import NavBar from "@/components/NavBar/index.vue";
import Comment from "@/components/Comment/index.vue";
import Share from "@/components/Share/index.vue";

export default {
  data() {
    return {
      tagList: [1, 1, 1],
      moreArtList: [1, 1, 1, 1, 1],
      commentsList: [1, 1, 1, 1, 1],
      isShare: false, // 是否分享
    };
  },
  components: {
    NavBar,
    Comment,
    Share,
  },
  methods: {
    imageError(e) {
      console.log(e);
    },
    toPage() {
      uni.navigateTo({ url: "/pages/articlePage/index" });
    },
    toAuthorPage() {
      uni.navigateTo({ url: "/pages/userInfo/index" });
    },
    chat() {
      uni.navigateTo({ url: "/pages/publishComment/index" });
    },
    toggleShare(value) {
      this.isShare = value;
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page,
.article-page-wrapper {
  background-color: #fff;
  height: 100%;

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

    .content-comment {
      box-sizing: border-box;
      border-top: $border-line;

      .comment-item {
        display: flex;
        border-bottom: $border-line;
        padding: 30rpx;
        box-sizing: border-box;

        .avatar {
          width: 80rpx;
          height: 80rpx;
          margin-right: 12rpx;
        }

        .comment-item-content {
          flex: 1;

          .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10rpx;

            .head-left {
              .name {
                @include setSmallTitle($primary-color, 28rpx, 28rpx);
                margin-bottom: 10rpx;
              }

              .time {
                @include setSmallTitle();
              }
            }

            .head-right {
              .icon-pinglun {
                margin-left: 60rpx;
              }
            }
          }

          .body {
            @include setSmallTitle($title-color, 38rpx, 28rpx);
            margin-bottom: 12rpx;
          }

          .reply {
            width: 100%;
            padding: 12rpx;
            box-sizing: border-box;
            background-color: #f1f1f1;

            .reply-item {
              @include setSmallTitle($title-color, 38rpx, 28rpx);
              margin-bottom: 8rpx;

              .reply-item-name {
                color: $primary-color;
              }
            }
          }
        }
      }
    }
  }
}
</style>
