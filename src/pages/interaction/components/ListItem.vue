<template>
  <view class="interaction-listItem-wrapper">
    <view class="list-row-top">
      <view class="list-row-header">
        <image
          @click.stop="toAuthorPage(infoData.userInfo && infoData.userInfo.id)"
          class="avatar"
          mode="center"
          :src="infoData.userInfo && infoData.userInfo.avatar"
        ></image>
        <view class="list-row-header-content">
          <view class="list-row-header-content-tit">{{
            infoData.userInfo && infoData.userInfo.nickname
          }}</view>
          <view class="list-row-header-content-desc">
            {{
              infoData.userInfo && infoData.userInfo.profession
            }}&nbsp;·&nbsp;{{ infoData.created_at | relativeTime }}
          </view>
        </view>
      </view>
      <view class="list-row-content">
        <text v-if="infoData.theme" class="tag-type"
          >#{{ infoData.theme }}#</text
        >&nbsp;{{ infoData.content }}
      </view>
      <view class="list-row-pic" v-if="infoData.picUrl">
        <image
          @click.stop="show(infoData.picUrl, index)"
          v-for="(item, index) in infoData.picUrl"
          :key="index"
          class="list-row-pic-item"
          mode="center"
          :src="item"
        ></image>
      </view>
    </view>
    <view class="list-row-bottom">
      <text
        :class="[
          'iconfont',
          infoData.isLike ? 'icon-dianzan_' : 'icon-dianzan',
        ]"
        :style="{ color: infoData.isLike ? '#00c58e' : '#96909c' }"
        @click.stop="likeDyn(infoData.id)"
        >{{ infoData.likeNum ? infoData.likeNum : "点赞" }}</text
      >
      <text class="iconfont icon-pinglun"
        >&nbsp;{{ infoData.commNum ? infoData.commNum : "评论" }}</text
      >
      <text @click.stop="share" class="iconfont icon-fenxiang">分享</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "interaction-listItem",
  props: {
    infoData: Object,
  },
  methods: {
    show(urls, index) {
      uni.previewImage({
        urls: urls,
        current: index,
      });
    },
    share() {
      this.$emit("share", true);
    },
    likeDyn(id) {
      this.$emit("likeDyn", id);
    },
    toAuthorPage(id) {
      uni.navigateTo({ url: `/pages/userInfo/index?id=${id}` });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.interaction-listItem-wrapper {
  margin-bottom: 16rpx;
  background-color: #fff;

  .list-row-top {
    box-sizing: border-box;
    padding: 24rpx;
    border-bottom: $border-line;

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
        width: 220rpx;
        height: 220rpx;
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
