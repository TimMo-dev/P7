import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from './TasksPage.vue';
import SolutionPage from './SolutionPage.vue';
import TestPage from './TestPage.vue';

const routes = [
  { path: '/home', component: TasksPage },
  { path: '/solution', component: SolutionPage },
  { path: '/test', component: TestPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;