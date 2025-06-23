<template>
  <div class="min-h-screen flex bg-pink-50">

    <!-- Sidebar -->
    <nav
      class="flex flex-col items-center gap-6 py-6 px-2 bg-white/90 border border-pink-200 backdrop-blur-md shadow-2xl rounded-r-2xl fixed top-4 bottom-4 left-4 w-16"
      role="navigation"
    >
      <button class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Pets">
        🐾
      </button>

      <button class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Profile">
        👤
      </button>

      <button class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-pink-200 transition" title="Analytics">
        📊
      </button>
    </nav>

    <!-- Main Content (with margin to prevent overlap) -->
    <div class="flex-1 ml-24 p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

      <!-- Left Column -->
      <div
        class="flex-1 flex items-center justify-center bg-cover bg-center rounded-2xl relative"
        :style="{ backgroundImage: `url(/src/assets/bg/pink_cloud.JPG)` }"
      >
        <div class="max-w-md w-full">
          <TimerComponent 
            :time-left="timeLeft"
            :is-running="isRunning"
            :current-session="currentSession"
            :session-types="sessionTypes"
            :progress-percentage="progressPercentage"
            @toggle-timer="toggleTimer"
            @reset-timer="resetTimer"
            @skip-session="skipSession"
            @switch-session="switchSession"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex flex-1 flex-col gap-6">
        <div class="pixel-card flex-1 overflow-auto">
          <h2 class="pixel-title mb-4">📝 Tasks</h2>
          <ul class="space-y-2">
            <li v-for="task in tasks" :key="task.id" class="task-item">
              <input 
                type="checkbox" 
                v-model="task.completed" 
                class="pixel-checkbox" 
              />
              <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.text }}</span>
            </li>
          </ul>
        </div>

        <div class="pixel-card flex-1 text-center flex flex-col items-center justify-center">
          <h2 class="pixel-title mb-2">🐾 Equipped Pet</h2>
          <img 
            :src="currentPetImage" 
            :alt="currentPet.name"
            class="mx-auto w-48 h-48 object-contain drop-shadow-lg pixel animate-float"
          />
          <p class="text-lg font-bold text-pink-600 mt-2">{{ currentPet.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimerComponent from '../components/TimerComponent.vue'

export default {
  name: 'StudyView',
  components: { TimerComponent },
  data() {
    return {
      timeLeft: 25 * 60,
      isRunning: false,
      currentSession: 'pomodoro',
      timerInterval: null,
      sessionTypes: [
        { type: 'pomodoro', name: 'Study', duration: 25 * 60 },
        { type: 'shortBreak', name: 'Short Break', duration: 5 * 60 },
        { type: 'longBreak', name: 'Long Break', duration: 15 * 60 }
      ],
      tasks: [
        { id: 1, text: "Finish Vue homework", completed: false },
        { id: 2, text: "Read 1 chapter", completed: false },
        { id: 3, text: "Pet the cat", completed: true },
      ],
      pets: [
        { id: 1, name: 'Fluffy', icon: '🐱', image: '/src/assets/pets/pinky.png', unlocked: true },
        { id: 2, name: 'Buddy', icon: '🐶', image: '/src/assets/pets/buddy.png', unlocked: true }
      ],
      currentPetId: 1,
    }
  },
  computed: {
    currentPet() {
      return this.pets.find(pet => pet.id === this.currentPetId)
    },
    currentPetImage() {
      return this.currentPet?.image || ''
    },
    progressPercentage() {
      const duration = this.sessionTypes.find(s => s.type === this.currentSession).duration
      return ((duration - this.timeLeft) / duration) * 100
    }
  },
  methods: {
    toggleTimer() {
      this.isRunning ? this.pauseTimer() : this.startTimer()
    },
    startTimer() {
      this.isRunning = true
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.completeSession()
        }
      }, 1000)
    },
    pauseTimer() {
      this.isRunning = false
      clearInterval(this.timerInterval)
    },
    resetTimer() {
      this.pauseTimer()
      const session = this.sessionTypes.find(s => s.type === this.currentSession)
      this.timeLeft = session.duration
    },
    switchSession(type) {
      this.pauseTimer()
      this.currentSession = type
      this.timeLeft = this.sessionTypes.find(s => s.type === type).duration
    },
    skipSession() {
      this.pauseTimer()
      this.completeSession()
    },
    completeSession() {
      this.pauseTimer()
      this.$root.showNotification('Session complete!')
      this.switchSession(this.currentSession === 'pomodoro' ? 'shortBreak' : 'pomodoro')
    }
  }
}
</script>