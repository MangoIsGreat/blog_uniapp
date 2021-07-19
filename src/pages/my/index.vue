<template>
  <view class="my-content">
    <cl-list-item class="avatar-item" justify="start" @click="toPage('/pages/userInfo/index')">
      <view class="cs-block">
        <cl-avatar
        class="avatar"
          src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
        ></cl-avatar>
        <view class="author">
          <view class="name">橘猫很方</view>
          <view class="job">前端开发工程师</view>
        </view>
      </view>

      <view class="append" slot="append">
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </cl-list-item>
    <cl-list-item class="list-item" label="消息中心">
        <view slot="icon">
            <text class="iconfont icon-xiaoxi"></text>
        </view>
    </cl-list-item>
    <cl-list-item class="list-item" label="我赞过的">
        <view slot="icon">
            <text class="iconfont icon-dianzan1"></text>
        </view>
        <text slot="append" class="right">176篇</text>
    </cl-list-item>
    <cl-list-item class="list-item" label="收藏集">
        <view slot="icon">
            <text class="iconfont icon-dianzan1"></text>
        </view>
        <text slot="append" class="right">20个</text>
    </cl-list-item>
    <cl-list-item class="list-item" label="阅读过的文章">
        <view slot="icon">
            <text class="iconfont icon-yanjing"></text>
        </view>
        <text slot="append" class="right">633篇</text>
    </cl-list-item>
    <cl-list-item class="list-item" label="标签管理">
        <view slot="icon">
            <text class="iconfont icon-biaoqian"></text>
        </view>
        <text slot="append" class="right">12个</text>
    </cl-list-item>
    <cl-list-item class="list-item-config" label="设置">
        <view slot="icon">
            <text class="iconfont icon-shezhi"></text>
        </view>
    </cl-list-item>
  </view>
</template>

<script>
export default {
  name: "my",
  methods: {
      toPage(path) {
        uni.navigateTo({
            url: path,
            success: res => {},fail: () => {},complete: () => {}
        });
      }
  }
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.my-content {
    .avatar-item {
        margin: 40rpx 0;

        .cs-block {
            display: flex;
            padding: 36rpx;
            box-sizing: border-box;
    
            .avatar {
                margin-right: 20rpx;
            }
    
            .author {
                .name {
                    @include setBigTitle(36rpx, $title-color, 44rpx, 500);
                    margin-bottom: 16rpx;
                }
    
                .job {
                    @include setSmallTitle();
                }
            }
        }
    }

    .list-item {
        border-bottom: $border-line;

        .iconfont {
            font-size: 36rpx;
        }

        .icon-xiaoxi {
            color: #3274F6;
        }

        .icon-dianzan1 {
            color: #66C439;
        }

        .icon-yanjing,.icon-biaoqian {
            color: #ACB4BE;
        }
        
        .right {
            color: $article-desc-color;
        }
    }

    .list-item-config {
        margin-top: 40rpx;

        .iconfont {
            font-size: 36rpx;
            color: #ACB4BE;
        }
    }
}
</style>
