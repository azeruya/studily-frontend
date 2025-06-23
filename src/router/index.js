import { createRouter, createWebHistory } from 'vue-router'
import StudyView from '../views/StudyView.vue'
import PetsPage from '../views/PetsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import AnalyticsPage from '../views/AnalyticsPage.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  { path: '/', component: StudyView },  // <-- load StudyView on home '/'
  { path: '/pets', component: PetsPage },
  { path: '/profile', component: ProfilePage },
  { path: '/analytics', component: AnalyticsPage },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
