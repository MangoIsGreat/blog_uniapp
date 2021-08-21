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
          <cl-button
            type="success"
            plain
            round
            v-if="blogInfo.User && !blogInfo.User.isSelf"
            @click="follow(blogInfo.User && blogInfo.User.id)"
          >
            <text v-if="blogInfo.User && !blogInfo.User.isAttention"
              >+&nbsp;关注</text
            >
            <text v-if="blogInfo.User && blogInfo.User.isAttention"
              >已关注</text
            >
          </cl-button>
        </view>
        <view class="content-article-title">
          <view class="article-titke">{{ blogInfo.title }}</view>
          <image
            v-if="blogInfo.titlePic"
            class="main-pic"
            :src="blogInfo.titlePic"
          ></image>
        </view>
        <view class="content-article-body" v-html="mdContent"></view>
        <view class="content-article-footer">
          <view class="tag">
            <text class="tag-item">{{
              blogInfo.Tag && blogInfo.Tag.tagName
            }}</text>
          </view>
          <view class="zan"
            >赞&nbsp;{{ blogInfo.blogLikeNum }}&nbsp;·&nbsp;阅读&nbsp;{{
              blogInfo.blogReadNum
            }}</view
          >
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
            >{{ item.blogLikeNum }}&nbsp;赞&nbsp;·&nbsp;{{
              item.commentNum
            }}评论&nbsp;·&nbsp;{{ item.User && item.User.nickname }}</view
          >
        </view>
      </view>
      <view class="content-comment">
        <view
          class="comment-item"
          v-for="(item, index) in commentsList"
          :key="index"
        >
          <view
            class="avatar"
            @click="toAuthorPage(item.comment && item.comment.id)"
          >
            <cl-avatar :src="item.comment && item.comment.avatar"></cl-avatar>
          </view>
          <view class="comment-item-content">
            <view class="head">
              <view class="head-left">
                <view class="name">{{
                  item.comment && item.comment.nickname
                }}</view>
                <view class="time"
                  >{{ item.comment && item.comment.profession }}&nbsp;·&nbsp;{{
                    item.created_at | relativeTime
                  }}</view
                >
              </view>
              <view class="head-right">
                <text
                  @click="likeComment(item.id)"
                  :class="[
                    'iconfont',
                    item.isLike ? 'icon-dianzan_' : 'icon-dianzan',
                  ]"
                  :style="{ color: item.isLike ? '#00c58e' : '#96909c' }"
                  >&nbsp;{{ item.likeNum ? item.likeNum : "" }}</text
                >
                <text
                  @click="
                    chat(blogInfo.id, item.id, item.comment && item.comment.id)
                  "
                  class="iconfont icon-pinglun"
                ></text>
              </view>
            </view>
            <view class="body">
              {{ item.content }}
            </view>
            <view class="reply" v-if="item.child.length">
              <view
                class="reply-item"
                v-for="(item2, index2) in item.child"
                :key="index2"
                @click="replyToReply(blogInfo.id, item.id, item2)"
              >
                <text
                  @click.stop="toAuthorPage(item2.from && item2.from.id)"
                  class="reply-item-name"
                  >{{ item2.from.nickname
                  }}<text
                    v-if="
                      item.userInfo &&
                        item2.from &&
                        item.userInfo.id === item2.from.id
                    "
                    >(作者)</text
                  ></text
                >回复<text
                  @click.stop="toAuthorPage(item2.to && item2.to.id)"
                  class="reply-item-name"
                  >{{ item2.to.nickname }}：</text
                >
                <text>{{ item2.content }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 评论组件 -->
      <Comment @makeLike="makeLike" :infoData="blogInfo" type="blogComment" />
    </view>
    <!-- 底部弹框 -->
    <Share @share="toggleShare" :visible="isShare" />
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import NavBar from "@/components/NavBar/index.vue";
import Comment from "@/components/Comment/index.vue";
import Share from "@/components/Share/index.vue";
import request from "@/http/request";
import marked from "marked";

export default {
  data() {
    return {
      blogInfo: {}, // 博客详情
      moreArtList: [],
      commentsList: [],
      isShare: false, // 是否分享
      blogId: "", // 博客id
      mdContent: "", // 博客内容
    };
  },
  components: {
    NavBar,
    Comment,
    Share,
  },
  onLoad(options) {
    this.blogId = options.id;
  },
  onShow() {
    // 获取博客信息
    this.getBlogInfo();

    // 获取相关文章
    this.getMoreArt();

    // 获取评论列表
    this.getCommentList();
  },
  methods: {
    async getBlogInfo() {
      let data = {
        id: this.blogId,
      };

      const blog = await request({
        url: "/blog/article",
        method: "GET",
        data,
      });

      if (blog.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "博客数据请求失败！",
        });
      }

      this.mdContent = marked(blog.data.data.content || "");

      this.blogInfo = blog.data.data;
    },
    async getMoreArt() {
      let data = {
        id: this.blogId,
      };

      const moreData = await request({
        url: "/blog/hot",
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
    async getCommentList() {
      let data = {
        blog: this.blogId,
      };

      const commentList = await request({
        url: "/bcomment/list",
        method: "GET",
        data,
      });

      if (commentList.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "获取评论列表失败！",
        });
      }

      this.commentsList = commentList.data.data;
    },
    // 点赞博客
    async makeLike() {
      const data = await request({
        url: "/blike/like",
        method: "POST",
        data: { blog: this.blogId },
      });

      if (data.data.error_code === 0) {
        if (data.data.data === "ok") {
          this.blogInfo.isLike = true;
          this.blogInfo.blogLikeNum += 1;
        } else if (data.data.data === "cancel") {
          this.blogInfo.isLike = false;
          this.blogInfo.blogLikeNum -= 1;
        }
      } else {
        this.$refs["toast"].open({
          message: "点赞失败！",
        });
      }
    },
    // 关注作者
    async follow(id) {
      const data = await request({
        url: "/fans/follow",
        method: "POST",
        data: { leader: id },
      });

      if (data.data.error_code === 0) {
        if (data.data.data.data === "ok") {
          this.blogInfo.User.isAttention = true;
        } else if (data.data.data.data === "cancel") {
          this.blogInfo.User.isAttention = false;
        }
      } else {
        this.$refs["toast"].open({
          message: "关注失败！",
        });
      }
    },
    // 点赞评论
    async likeComment(id) {
      const data = await request({
        url: "/clike/like",
        method: "POST",
        data: { commentId: id },
      });

      if (data.data.error_code === 0) {
        if (data.data.data === "ok") {
          this.commentsList.forEach((item) => {
            if (item.id === id) {
              item.isLike = true;
              item.likeNum++;
            }
          });
        } else if (data.data.data === "cancel") {
          this.commentsList.forEach((item) => {
            if (item.id === id) {
              item.isLike = false;
              item.likeNum--;
            }
          });
        }
      } else {
        this.$refs["toast"].open({
          message: "点赞失败！",
        });
      }
    },
    toPage(id) {
      uni.navigateTo({ url: `/pages/articlePage/index?id=${id}` });
    },
    toAuthorPage(id) {
      uni.navigateTo({ url: `/pages/userInfo/index?id=${id}` });
    },
    chat(blogId, commentId, toCommentId) {
      uni.navigateTo({
        url: `/pages/publishComment/index?id=${blogId}&type=replyToComment&cId=${commentId}&toId=${toCommentId}`,
      });
    },
    replyToReply(blogId, commentId, toCommentId) {
      uni.navigateTo({
        url: `/pages/publishComment/index?id=${blogId}&type=replyToComment&cId=${commentId}&toId=${toCommentId.from.id}`,
      });
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

              .iconfont {
                color: #96909c;
                transition: all 0.2s;
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
