<template>
  <view>
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="success"></uni-badge>
    <uni-badge text="3" type="primary"></uni-badge>
	<uni-load-more iconType="snow"></uni-load-more>
  </view>
</template>

<script>
import { uniBadge } from "@dcloudio/uni-ui";
export default {
  data() {
    return {};
  },
  components: { uniBadge },
};
</script>

<style lang="scss"></style>
