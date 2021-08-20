<template>
  <view class="publish-comment-wrapper">
    <view
      class="nav-bar-body"
      :style="{ paddingTop: statusBarHeight * 2 + 10 + 'rpx' }"
    >
      <text @click="goBack" class="iconfont icon-xiangzuo"></text>
      <text class="title">评论</text>
      <text class="publish" @click="publish">发送</text>
    </view>
    <cl-textarea
      ref="input"
      :style="{ border: 'none' }"
      v-model="value"
      placeholder="输入评论..."
      :focus="true"
    ></cl-textarea>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  data() {
    return {
      value: "",
      statusBarHeight: 0,
      id: "", // 动态id、博客id
      type: "", // 评论类型
      commentId: "", // 评论id
      targetId: "", // 要评论的"评论"id
    };
  },
  onLoad(options) {
    // 获取手机顶部navbar高度
    this.getNavHeight();

    // 获取评论类型
    this.type = options.type;
    // 获取评论/博客Id
    this.id = options.id;
    // 评论id
    this.commentId = options.cId;
    // 要回复的目标评论Id
    this.targetId = options.toId;
  },
  methods: {
    // 评论博客
    async publish() {
      switch (this.type) {
        case "blogComment":
          this.makeBlogComment();
          break;
        case "replyToComment":
          this.makeReplyToComment();
          break;
        case "replyToDynComment":
          this.makeReplyToDynComment();
          break;
        case "dynComment":
          this.makeDynComment();
          break;
        default:
          break;
      }
    },
    // 评论博客
    async makeBlogComment() {
      const data = await request({
        url: "/bcomment/comment",
        method: "POST",
        data: { blog: this.id, content: this.value },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "评论失败！",
        });
      }

      // 评论成功返回上一页
      uni.navigateBack();
    },
    // 评论动态
    async makeDynComment() {
      const data = await request({
        url: "/dcomment/comment",
        method: "POST",
        data: { dynamic: this.id, content: this.value },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "评论失败！",
        });
      }

      // 评论成功返回上一页
      uni.navigateBack();
    },
    // 评论博客评论
    async makeReplyToComment() {
      const data = await request({
        url: "/bcomment/reply",
        method: "POST",
        data: {
          blog: this.id, // 博客id
          content: this.value, // 评论内容
          comment: this.commentId, // 评论id
          toUid: this.targetId, // 要回复的"评论"&"评论回复"的id
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "评论失败！",
        });
      }

      // 评论成功返回上一页
      uni.navigateBack();
    },
    // 评论动态评论
    async makeReplyToDynComment() {
      const data = await request({
        url: "/dcomment/reply",
        method: "POST",
        data: {
          dynamicId: this.id, // 博客id
          content: this.value, // 评论内容
          commentId: this.commentId, // 评论id
          toUid: this.targetId, // 要回复的"评论"&"评论回复"的id
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "评论失败！",
        });
      }

      // 评论成功返回上一页
      uni.navigateBack();
    },
    // 获取手机顶部navbar高度
    getNavHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
    },
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page,
.publish-comment-wrapper {
  height: 100%;
  background-color: #fff;

  .nav-bar-body {
    width: 100%;
    padding: 12rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #f9f9f9;

    .icon-xiangzuo,
    .publish {
      width: 80rpx;
      line-height: 56rpx;
      font-weight: 700;
      color: $primary-color;
    }

    .title {
      flex: 1;
      color: $title-color;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
