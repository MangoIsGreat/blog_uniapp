<template>
  <view class="tag-management-content">
    <!-- Tabs选项卡 -->
    <cl-tabs
      color="#00c58e"
      class="tabs"
      v-model="current"
      :labels="labels"
      :border="false"
    >
      <div class="scroll-view-wrapper">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="scroll-view-item"
        >
          <cl-list-item
            @click="toPage(item.tag_type)"
            class="scroll-view-item-list"
            justify="start"
            v-if="![10000, 10001].includes(item.tag_type)"
          >
            <view class="left">
              <view class="cs-block">
                <view class="name">{{ item.tag_name }}</view>
              </view>
            </view>

            <view slot="append">
              <cl-button disabled class="like-btn" round>已关注</cl-button>
            </view>
          </cl-list-item>
        </view>
      </div>
    </cl-tabs>
    <cl-toast ref="toast"></cl-toast>
  </view>
</template>

<script>
import request from "@/http/request";

export default {
  name: "tag-management",
  data() {
    const labels = [
      {
        label: "全部标签",
        value: 1,
        loaded: true,
      },
      {
        label: "已关注标签",
        value: 2,
      },
    ];

    return {
      current: 0,
      labels,
      list: [],
    };
  },

  onShow() {
    this.getLabels();
  },

  methods: {
    toPage(id) {
      uni.navigateTo({ url: `/pages/tagArtList/index?id=${id}` });
    },

    // 获取labels数据
    async getLabels() {
      const data = await request({
        url: "/tag/list",
        method: "GET",
      });

      if (data.data.error_code !== 0) {
        return this.$refs["toast"].open({
          message: "标签类型数据请求失败！",
        });
      }

      this.list = data.data.data.rows;
    },
  },
};
</script>

<style lang="scss">
@import "@/static/css/common/common.scss";

page {
  // #ifdef H5
  height: 100%;
  // #endif

  // #ifndef H5
  height: 100vh;
  // #endif
}

.tag-management-content {
  height: 100%;
  overflow: hidden;

  .tabs {
    margin-bottom: 16rpx;

    .scroll-view-wrapper {
      .scroll-view-item {
        padding: 0 4rpx;
        box-sizing: border-box;
        border-bottom: $border-line;

        .scroll-view-item-list {
          padding: 20rpx 0;

          .left {
            display: flex;

            .avatar {
              margin-right: 18rpx;
            }
          }

          .cs-block {
            .name {
              margin-bottom: 8rpx;
              @include setSmallTitle($title-color, 36rpx, 28rpx);
              font-size: 30rpx;
              font-weight: 600;
            }

            .desc {
              color: $article-desc-color;
            }
          }
        }
      }
    }
  }
}
</style>
