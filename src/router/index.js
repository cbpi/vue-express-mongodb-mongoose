import Vue from 'vue'
import Router from 'vue-router'
import Homeeleme from '../pages/home'

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
