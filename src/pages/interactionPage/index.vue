<template>
  <view class="interaction-detail-wrapper">
    <view class="list-row-top">
      <view class="list-row-header">
        <image
          class="avatar"
          mode="center"
          :src="dynInfo.User && dynInfo.User.avatar"
        ></image>
        <view class="list-row-header-content">
          <view class="list-row-header-content-tit">{{
            dynInfo.User && dynInfo.User.nickname
          }}</view>
          <view class="list-row-header-content-desc">
            {{ dynInfo.User && dynInfo.User.profession }}&nbsp;·&nbsp;{{
              dynInfo.created_at | relativeTime
            }}
          </view>
        </view>
      </view>
      <view class="list-row-content">
        <text v-if="dynInfo.theme" class="tag-type">#{{ dynInfo.theme }}#</text
        >{{ dynInfo.content }}
      </view>
      <view class="list-row-pic" v-if="dynInfo.picUrl">
        <image
          v-for="(item, index) in dynInfo.picUrl"
          :key="index"
          class="list-row-pic-item"
          mode="center"
          :src="item"
        ></image>
      </view>
    </view>
    <!-- 评论区部分 -->
    <view class="content-comment" v-if="commentsList.length > 0">
      <view
        class="comment-item"
        v-for="(item, index) in commentsList"
        :key="index"
      >
        <view class="avatar" @click="toAuthorPage">
          <cl-avatar :src="item.userInfo && item.userInfo.avatar"></cl-avatar>
        </view>
        <view class="comment-item-content">
          <view class="head">
            <view class="head-left">
              <view class="name">{{
                item.userInfo && item.userInfo.nickname
              }}</view>
              <view class="time"
                >{{ item.userInfo && item.userInfo.profession }}&nbsp;·&nbsp;{{
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
                >{{ item.likeNum ? item.likeNum : "" }}</text
              >
              <text
                class="iconfont icon-pinglun"
                @click="
                  chat(dynInfo.id, item.id, item.userInfo && item.userInfo.id)
                "
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
              @click="replyToReply(dynInfo.id, item.id, item2)"
            >
              <text @click.stop="toAuthorPage" class="reply-item-name"
                >{{ item2.from.nickname
                }}<text
                  v-if="
                    item.userInfo &&
                      item2.from &&
                      item.userInfo.id === item2.from.id
                  "
                  >(作者)</text
                ></text
              >回复<text @click.stop="toAuthorPage" class="reply-item-name"
                >{{ item2.to.nickname }}：</text
              >
              <text>{{ item2.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论组件 -->
    <Comment @makeLike="makeLike" :infoData="dynInfo" type="dynComment" />
  </view>
</template>

<script>
import Comment from "@/components/Comment/index.vue";
import request from "@/http/request";

export default {
  name: "interaction-detail",
  data() {
    return {
      commentsList: [],
      dynId: "", // dynamicId
      dynInfo: {}, // 动态信息
    };
  },
  components: {
    Comment,
  },
  onLoad(options) {
    this.dynId = options.id;
  },
  onShow() {
    // 获取动态详情
    this.getDynInfo();

    // 获取动态评论数据
    this.getDynCommenData();
  },
  methods: {
    // 获取动态评论数据
    async getDynCommenData() {
      const data = await request({
        url: "/dcomment/list",
        method: "GET",
        data: {
          dynamicId: this.dynId,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "获取动态评论数据失败！",
        });
      }

      this.commentsList = data.data.data; // 评论列表
    },
    // 获取动态详情
    async getDynInfo() {
      const data = await request({
        url: "/dynamic/dynamic",
        method: "GET",
        data: {
          id: this.dynId,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "获取动态信息失败！",
        });
      }

      if (data.data.data.picUrl) {
        data.data.data.picUrl = JSON.parse(data.data.data.picUrl);
      }

      this.dynInfo = data.data.data;
    },

    // 点赞动态
    async makeLike() {
      const data = await request({
        url: "/dlike/like",
        method: "POST",
        data: { dynamicId: this.dynId },
      });

      if (data.data.error_code === 0) {
        if (data.data.data === "ok") {
          this.dynInfo.isLike = true;
          this.dynInfo.likeNum += 1;
        } else if (data.data.data === "cancel") {
          this.dynInfo.isLike = false;
          this.dynInfo.likeNum -= 1;
        }
      } else {
        this.$refs["toast"].open({
          message: "点赞失败！",
        });
      }
    },

    // 点赞评论
    async likeComment(id) {
      const data = await request({
        url: "/cDlike/like",
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

    // 评论"评论"
    chat(dynInfo, commentId, toCommentId) {
      uni.navigateTo({
        url: `/pages/publishComment/index?id=${dynInfo}&type=replyToDynComment&cId=${commentId}&toId=${toCommentId}`,
      });
    },

    // 回复评论
    replyToReply(id, commentId, toCommentId) {
      uni.navigateTo({
        url: `/pages/publishComment/index?id=${id}&type=replyToDynComment&cId=${commentId}&toId=${toCommentId.from.id}`,
      });
    },

    toAuthorPage(id) {
      uni.navigateTo({
        url: `/pages/articlePage/index?id=${id}`,
      });
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
  // background-color: #f9f9f9;

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

      .tag-type {
        color: $primary-color;
        font-size: 28rpx;
      }
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
