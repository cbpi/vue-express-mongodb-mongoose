// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
// 引入element组件化框架
import ElementUI from 'element-ui'
// 引入样式文件
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap'
import '../node_modules/bulma/css/bulma.css'
import '../src/font/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 注册过滤器，过滤图片加载403问题
Vue.filter('loadimg', function (value) {
  if (value !== undefined) {
    let _u = value.substring(7)
    return 'https://images.weserv.nl/?url=' + _u
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
