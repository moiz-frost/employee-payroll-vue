import Vue from 'vue'
import Router from 'vue-router'
import ViewData from '@/components/ViewData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ViewData',
      component: ViewData
    }
  ]
})
