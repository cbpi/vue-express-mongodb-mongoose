import Vue from 'vue'
import Router from 'vue-router'
import Homeeleme from '../pages/eleme'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeeleme',
      component: Homeeleme
    }
  ]
})
