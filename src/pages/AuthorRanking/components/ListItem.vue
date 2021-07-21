<template>
  <view class="list-item-wrapper">
    <view class="avatar">
      <cl-avatar
        src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
      ></cl-avatar>
    </view>
    <view class="author-content">
      <view class="author-content-line">
        <view class="author-content-line-author">
          <view class="content-line-author-name">钉钉前端团队</view>
          <view class="content-line-author-job">前端工程师</view>
        </view>
        <cl-button type="success" plain round>+ 关注</cl-button>
      </view>
      <view class="author-content-zan">获得 4198 赞 · 55589 阅读</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    imageError(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.list-item-wrapper {
  display: flex;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    margin-right: 16rpx;
    border-radius: 50%;
  }

  .author-content {
    .author-content-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-content-line-author {
        .content-line-author-name {
          @include setBigTitle();
        }

        .content-line-author-job {
          @include setSmallTitle();
        }
      }
    }

    .author-content-zan {
      @include setSmallTitle();
    }
  }
}
</style>
