<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-5 relative overflow-hidden">
    <!-- Background floating shapes -->
    <FloatingShapes />

    <!-- Sidebar -->
    <nav
      class="flex flex-col items-center justify-between gap-6 py-6 px-2 bg-white/90 border border-pink-200 backdrop-blur-md shadow-2xl rounded-r-2xl fixed top-4 bottom-4 left-4 w-16 z-20"
      role="navigation"
    >
      <!-- Top Section -->
      <div class="flex flex-col items-center gap-6">
        <router-link to="/" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Home">
          ⏳
        </router-link>

        <router-link to="/pets" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Pets">
          🐾
        </router-link>

        <router-link to="/profile" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Profile">
          👤
        </router-link>

        <router-link to="/analytics" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Analytics">
          📊
        </router-link>
      </div>

      <!-- Bottom Logout Button -->
      <button
        @click="logout"
        class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-red-200 transition text-red-600"
        title="Logout"
      >
        🚪
      </button>
    </nav>

    <!-- Main Content -->
    <div class="z-10 relative ml-24">
      <router-view />
    </div>

    <!-- Notification -->
    <NotificationComponent v-if="showNotification" :message="notificationMessage" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import FloatingShapes from './components/FloatingShapes.vue'
import NotificationComponent from './components/NotificationComponent.vue'

export default {
  name: 'App',
  components: {
    FloatingShapes,
    NotificationComponent,
  },
  data() {
    return {
      showNotification: false,
      notificationMessage: ''
    }
  },
  mounted() {
    // Global notification handler
    this.$root.showNotification = (message) => {
      this.notificationMessage = message
      this.showNotification = true
      setTimeout(() => {
        this.showNotification = false
      }, 3000)
    }
  },
  methods: {
    logout() {
      // Optional: Clear localStorage/sessionStorage if you use it
      // localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
