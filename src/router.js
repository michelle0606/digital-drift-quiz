import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },

    {
      path: '/home',
      name: 'LandingPage',
      component: () => import('./views/LandingPage.vue'),
    },
  ],
})

export default router
