<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-5 relative overflow-hidden">
    <!-- Background floating shapes -->
    <FloatingShapes />

    

    <!-- Main view -->
    <div class="z-10 relative">
      <StudyView />
    </div>

   
  </div>
</template>

<script>
import StudyView from './views/StudyView.vue'
import FloatingShapes from './components/FloatingShapes.vue'
import NotificationComponent from './components/NotificationComponent.vue'

export default {
  name: 'App',
  components: {
    StudyView,
    FloatingShapes,
    NotificationComponent
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
  }
}
</script>

<style scoped>
/* Soft glowing title */
.drop-shadow-glow {
  text-shadow: 0 0 8px rgba(255, 192, 203, 0.6), 0 0 15px rgba(255, 182, 193, 0.4);
}

/* Cute slow bounce animation */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}
</style>
