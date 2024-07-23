import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ErrorView from '../views/ErrorView.vue'
import MapView from '../views/MapView.vue'
import QuestView from '../views/QuestView.vue'
import StartView from '../views/StartView.vue'
import SuccessView from '../views/SuccessView.vue'
import VRView from '../views/VRView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/start',
    name: 'start',
    component: StartView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/vr',
    name: 'vr',
    component: VRView
  },
  {
    path: '/quest/:id',
    name: 'quest',
    component: QuestView
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
