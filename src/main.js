import Vue from 'vue'
import App from './App'
import ClUni from "cl-uni"

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(ClUni, {
	// 进入业务单页时，页面栈只有一个，自定义导航左侧返回按钮跳转的路径
	homePage: "/"
});

const app = new Vue({
  ...App
})
app.$mount()
