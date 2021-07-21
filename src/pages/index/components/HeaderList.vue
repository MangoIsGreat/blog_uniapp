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
      <view>
        <text>文章榜</text>
        <text class="iconfont icon-xiangyou"></text>
      </view>
    </view>
    <view
      @click="toArtPage"
      v-for="(item, index) in hotListData"
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
          拖拽竟然还能这样玩拖拽竟然还能这样玩拖拽竟然还能这样玩
        </view>
        <view
          :style="{
            fontSize: '24rpx',
            color: '#A0A6AE',
            lineHeight: '48rpx',
          }"
        >
          41&nbsp;赞&nbsp;·&nbsp;30&nbsp;评论&nbsp;·&nbsp;yck
        </view>
      </view>
      <view
        :style="{
          width: '130rpx',
          height: '130rpx',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b43e630c545e47d186085fbcb0576e78~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp)',
        }"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "home-headerList",
  data() {
    return {
      hotListData: [1, 1, 1],
    };
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
  },
};
</script>

<style></style>
