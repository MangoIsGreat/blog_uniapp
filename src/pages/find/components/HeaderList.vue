<template>
  <view class="header-content">
    <view class="content-type">
      <view
        @click="toast"
        v-for="(item, index) in headerData.activityType"
        :key="index"
        class="content-type-item"
      >
        <view class="item-body">
          <text :class="`iconfont ${item.icon}`"></text>
          <view class="name">{{ item.type }}</view>
        </view>
      </view>
    </view>
    <view class="ranking-list">
      <view class="line"></view>
      <view
        v-for="(item, index) in headerData.rankingType"
        class="ranking-list-item"
        :key="index"
        @click="toPage(item.path)"
      >
        <view class="content">
          <view class="title">
            <text :class="`iconfont ${item.icon}`"></text>
            <text>{{ item.type }}</text>
          </view>
          <view class="desc">每日更新</view>
        </view>
        <image
          class="pic"
          v-if="item.pic == 'pic1'"
          src="../../../static/img/ranking-list01.png"
        ></image>
        <image
          class="pic"
          v-else
          src="../../../static/img/ranking-list02.png"
        ></image>
      </view>
    </view>
    <view class="recommend-group">
      <view class="recommend-group-header">
        <view class="recommend-group-header-start">
          推荐大牛
        </view>
        <view class="recommend-group-header-end"></view>
      </view>
      <view class="recommend-group-body">
        <view class="recommend-group-body-innerBox">
          <image
            @click="toPage('/pages/userInfo/index', item.id)"
            v-for="(item, index) in groupList"
            :key="index"
            class="group-item"
            :src="item.avatar"
          ></image>
        </view>
      </view>
    </view>
    <view class="hot-recommend">
      <text class="iconfont icon-tubiaozhuanqu-05"></text>热门推荐
    </view>
    <!-- 提示 -->
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  data() {
    return {
      groupList: [], // 推荐技术大牛
      headerData: {
        activityType: [
          {
            type: "招聘",
            icon: "icon-lingdai",
          },
          {
            type: "话题",
            icon: "icon-huati",
          },
          {
            type: "字学",
            icon: "icon-pencil-draw-svgrepo-com",
          },
          {
            type: "活动",
            icon: "icon-gonggao",
          },
        ],
        rankingType: [
          {
            type: "文章榜",
            pic: "pic1",
            icon: "icon-bangdan",
            path: "/pages/ArtRanking/index",
          },
          {
            type: "作者榜",
            pic: "pic2",
            icon: "icon-huangguan",
            path: "/pages/AuthorRanking/index",
          },
        ],
      },
    };
  },
  created() {
    // 获取推荐大牛数据
    this.getRecommList();
  },
  methods: {
    async getRecommList() {
      const data = await request({
        url: "/author/ranking",
        method: "GET",
        data: {
          pageIndex: 1,
          pageSize: 6,
        },
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "获取推荐用户数据失败！",
        });
      }

      this.groupList = data.data.data.rows;
    },
    toPage(path, id) {
      uni.navigateTo({ url: `${path}?id=${id}` });
    },
    toast() {
      this.$refs["toast"].open({
        message: "需求正在开发中,敬请期待~",
        position: "middle",
      });
    },
    toAuthorPage(id) {
      uni.navigateTo({ url: `/pages/userInfo/index?id=${id}` });
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

.header-content {
  border-bottom: 14rpx solid #eff2f5;
  background-color: #eff2f5;

  .content-type {
    display: flex;
    justify-content: center;
    height: 184rpx;
    background-color: #fff;
    margin: 16rpx 0;

    .content-type-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .item-body {
        width: 60rpx;

        .iconfont {
          display: block;
          font-size: 60rpx;
          margin-bottom: 32rpx;
        }

        .icon-huati {
          color: #f09140;
        }

        .icon-gonggao {
          color: #f7ce45;
        }

        .icon-pencil-draw-svgrepo-com {
          color: #ce722c;
          font-size: 56rpx;
        }

        .icon-lingdai {
          color: #6097f2;
        }

        .name {
          @include setSmallTitle(#2d2f33, 24rpx);
        }
      }
    }
  }

  .ranking-list {
    display: flex;
    position: relative;
    height: 116rpx;
    margin-bottom: 16rpx;
    padding: 20rpx 0;
    box-sizing: border-box;
    background-color: #fff;

    .line {
      position: absolute;
      width: 2rpx;
      height: 76rpx;
      background-color: #ededed;
      left: 50%;
    }

    .ranking-list-item {
      flex: 1;
      display: flex;
      padding: 0 48rpx;
      box-sizing: border-box;

      .content {
        width: 128rpx;
        padding-right: 24rpx;
        text-align: right;

        .title {
          @include setBigTitle(28rpx, #000408, 40rpx, 600);

          .icon-bangdan {
            color: #e7bc29;
          }

          .icon-huangguan {
            color: #fae04d;
          }
        }

        .desc {
          @include setSmallTitle();
        }
      }

      .pic {
        @include setBgImg(130rpx, 76rpx);
      }
    }
  }

  .recommend-group {
    padding: 28rpx;
    margin-bottom: 16rpx;
    box-sizing: border-box;
    background-color: #fff;

    .recommend-group-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .recommend-group-header-start {
        @include setBigTitle(28rpx, #000408, 40rpx, 700);
      }

      .recommend-group-header-end {
        @include setBigTitle(28rpx, #00c58e, 40rpx, 500);
      }
    }

    .recommend-group-body {
      width: 724rpx;
      height: 208rpx;
      box-sizing: border-box;
      padding: 10rpx 0;
      overflow-x: auto;
      overflow-y: hidden;

      // 隐藏滚动条
      &::-webkit-scrollbar {
        display: none;
      }

      .recommend-group-body-innerBox {
        width: 1268rpx;
        height: 100%;

        .group-item {
          display: inline-block;
          height: 184rpx;
          width: 184rpx;
          border-radius: 10rpx;
          border: 2rpx solid #d0d0d0;
          margin-right: 20rpx;

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
  }

  .hot-recommend {
    display: flex;
    align-items: center;
    height: 80rpx;
    border-bottom: $border-line;
    padding-bottom: 20rpx;
    padding: 0 40rpx;
    box-sizing: border-box;
    background-color: #fff;

    .icon-tubiaozhuanqu-05 {
      color: #ea4e47;
    }
  }
}
</style>
