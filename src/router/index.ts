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