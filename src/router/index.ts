import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/mapDrill',
  },
  {
    path: '/mapDrill',
    meta: {
      name: '地图下钻/上钻'
    },
    component: () => import('../views/mapDrill/MapDrill.vue'),
  },
  {
    path: '/slideVerify',
    meta: {
      name: '滑动校验'
    },
    component: () => import('../views/slideVerify/SlideVerify.vue'),
  },
  {
    path: '/3dEarth',
    meta: {
      name: '3dEarth'
    },
    component: () => import('../views/3dEarth/Index.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export {
  routes
};
export default router;