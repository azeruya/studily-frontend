import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PetsPage from '@/views/PetsPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import AnalyticsPage from '@/views/AnalyticsPage.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/pets', component: PetsPage },
  { path: '/profile', component: ProfilePage },
  { path: '/analytics', component: AnalyticsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
