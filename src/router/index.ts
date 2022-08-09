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
    component: () => import('../components/MapDrill.vue'),
  },
  {
    path: '/slideVerify',
    meta: {
      name: '滑动校验'
    },
    component: () => import('../views/slideVerify/SlideVerify.vue'),
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