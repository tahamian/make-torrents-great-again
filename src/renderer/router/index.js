import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/TorrentsPage').default
    },
    {
      path: '/TorrentsPage/AddTorrent',
      name: 'add',
      component: require('@/components/TorrentsPage/AddTorrent').default
    },
    {
      path: '/TorrentsPage/CreateTorrent',
      name: 'create',
      component: require('@/components/TorrentsPage/CreateTorrent').default
    },
    {
      path: '/TorrentsPage/Settings',
      name: 'settings',
      component: require('@/components/TorrentsPage/Settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
