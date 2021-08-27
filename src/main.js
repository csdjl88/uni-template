// #ifdef MP-WEIXIN
import uma from './uma';
// #endif
import Vue from "vue"
import App from "./App"
import store from "@/store/index.js";
import config from "@/api/config.js";
import service from "@/api/request.js";
import bootstrap from '@/common/bootstrap'
import uView from "uview-ui";
import pageLoading from '@/components/pageLoading/pageLoading'
import pageNav from '@/components/pageNav/pageNav'
import uploadImg from "@/api/uploadImg.js";
import {
  getPlatform,
  showToast,
  showSuccess,
  showError,
  showLoading,
  hideLoading,
  navTo,
} from './common/app'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.hostUrl = config.host;
Vue.prototype.$axios = service
Vue.prototype.$toast = showToast
Vue.prototype.$success = showSuccess
Vue.prototype.$error = showError
Vue.prototype.$loading = showLoading
Vue.prototype.$hideloading = hideLoading
Vue.prototype.$navTo = navTo
Vue.prototype.$uploadImg = uploadImg;
// 当前运行的终端
Vue.prototype.$platform = getPlatform()
Vue.prototype.$mes = "敬请期待"
Vue.prototype.$loadText = {
  loadmore: '轻轻上拉加载更多',
  loading: '努力加载中',
  nomore: '没有更多了'
}
// #ifndef MP-WEIXIN
// import './mock'
// #endif
Vue.use(uView);
// #ifdef MP-WEIXIN
// 小程序端友盟统计
Vue.use(uma);
// #endif
Vue.component("pageLoading", pageLoading);
Vue.component("pageNav", pageNav);
App.mpType = 'app'
const app = new Vue({
  ...App,
  store,
  created: bootstrap
})

app.$mount()
