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
      name: 'project',
      component: () => import('./views/Project.vue'),
    },
    {
      path: '/challenge/:slug(.*)?',
      name: 'challenge',
      component: () => import('./views/Challenge.vue'),
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import('./views/dashBoard/DashBoard.vue'),
      meta: {
        isDashBoard: true,
      }
    },
    {
      path: '/dashboard/challengeEdit/:slug(.*)?',
      name: 'challengeEdit',
      component: () => import('./views/dashBoard/ChallengeEdit.vue'),
      meta: {
        isDashBoard: true,
      }
    },
  ],
  scrollBehavior(to) {
    return to.hash ? {
      el: to.hash,
      top: 85, // offset to avoid navigation bar
      behavior: 'smooth',
    } : { top: 0 };
  },
});
