import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage').default
    },
    {
      path: '/MainPage/Settings',
      name: 'settings',
      component: require('@/components/MainPage/Settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
