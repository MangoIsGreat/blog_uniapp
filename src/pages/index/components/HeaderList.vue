<template>
  <view
    :style="{
      backgroundColor: '#fff',
      borderBottom: '14rpx solid #EFF2F5',
    }"
  >
    <view
      :style="{
        display: 'flex',
        justifyContent: 'space-between',
        height: '80rpx',
        lineHeight: '80rpx',
        borderBottom: '2rpx solid #EBEEF2',
        paddingBottom: '2rpx',
        padding: '0 40rpx',
        boxSizing: 'border-box',
      }"
    >
      <view>
        <text
          :style="{ color: '#EB534C' }"
          class="iconfont icon-tubiaozhuanqu-05"
        ></text>
        <text>热门推荐</text>
      </view>
      <view @click="toPage">
        <text>文章榜</text>
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </view>
    <view
      @click="toArtPage"
      v-for="(item, index) in hotList"
      :key="index"
      :style="{
        display: 'flex',
        padding: '40rpx 40rpx',
        boxSizing: 'border-box',
        borderBottom: '2rpx solid #EBEEF2',
      }"
    >
      <view :style="{ flex: 1 }">
        <view
          :style="{
            width: 'calc(100vw - 240rpx)',
            fontSize: '32rpx',
            color: '#000206',
            lineHeight: '48rpx',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }"
        >
          {{ item.title }}
        </view>
        <view
          :style="{
            fontSize: '24rpx',
            color: '#A0A6AE',
            lineHeight: '48rpx',
          }"
        >
          {{ item.blogLikeNum }}&nbsp;赞&nbsp;·&nbsp;{{
            item.commentNum
          }}&nbsp;评论&nbsp;·&nbsp;{{ item.User.nickname }}
        </view>
      </view>
      <view
        v-if="item.titlePic"
        :style="{
          width: '130rpx',
          height: '130rpx',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${item.titlePic})`,
        }"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "home-headerList",
  props: {
    hotList: Array,
  },
  methods: {
    toArtPage() {
      uni.navigateTo({
        url: "/pages/articlePage/index",
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
    toPage() {
      uni.navigateTo({
        url: "/pages/ArtRanking/index",
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
};
</script>

<style></style>
