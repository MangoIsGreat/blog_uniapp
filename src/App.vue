<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "cl-uni/index.scss";

// 引入iconfont
@import "@/static/iconfont/iconfont.css";

// header组件样式
@import "@/static/css/components/search/index.scss";

// 公共样式
@import "@/static/css/common/base.scss";

// 自定义组件样式
@import "@/static/css/common/editCom.scss";
</style>
