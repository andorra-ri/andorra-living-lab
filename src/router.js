import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/home/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/project/:slug(.*)?',
      name: 'news',
      component: () => import('./views/Project.vue'),
    },
  ],
});
