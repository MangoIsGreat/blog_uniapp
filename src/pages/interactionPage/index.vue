<template>
  <view class="interaction-detail-wrapper">
    <view class="list-row-top">
      <view class="list-row-header">
        <image
          class="avatar"
          mode="center"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77cd95ab46b5478eb8327a450f36e5c1~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
          @error="imageError"
        ></image>
        <view class="list-row-header-content">
          <view class="list-row-header-content-tit">进击的小将</view>
          <view class="list-row-header-content-desc">
            iOS菜鸡&nbsp;·&nbsp;57分钟前
          </view>
        </view>
      </view>
      <view class="list-row-content">
        今天的走势也符合之前的预期，两市又转换到了普跌行情，从日K线上看，仍然是横盘震荡格局，成交量继续萎缩，表明多空力量都比较谨慎。短期会在3550点附近横盘震荡，既不会持续大涨，也不会持续大跌，结构性行情还会持续，所以我觉得择股更重要！但是对于个股要放低收益预期，不然就是被套。
      </view>
      <view class="list-row-pic">
        <image
          v-for="(item, index) in imgList"
          :key="index"
          class="list-row-pic-item"
          mode="center"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77cd95ab46b5478eb8327a450f36e5c1~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
          @error="imageError"
        ></image>
      </view>
      <view class="tag-type">#下班打卡#</view>
    </view>
    <!-- 评论区部分 -->
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
</template>

<script>
import Comment from "@/components/Comment/index.vue";

export default {
  name: "interaction-detail",
  data() {
    return {
      imgList: [1, 1, 1],
      commentsList: [1, 1, 1, 1, 1],
    };
  },
  components: {
    Comment,
  },
  methods: {
    imageError(e) {
      console.log(e);
    },
    share() {
      this.$emit("share", true);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.interaction-detail-wrapper {
  margin-bottom: 16rpx;
  padding-bottom: 100rpx;
  box-sizing: border-box;
  background-color: #f9f9f9;

  .list-row-top {
    box-sizing: border-box;
    padding: 24rpx;
    border-bottom: $border-line;
    background-color: #fff;

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
    }

    .list-row-pic {
      display: flex;
      justify-content: space-around;
      margin-bottom: 24rpx;

      .list-row-pic-item {
        width: 220rpx;
        height: 220rpx;
      }
    }

    .tag-type {
      margin: 6rpx 0;
      color: $primary-color;
      font-size: 28rpx;
    }
  }

  .content-comment {
    box-sizing: border-box;
    margin-top: 16rpx;
    border-top: $border-line;
    background-color: #fff;

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
