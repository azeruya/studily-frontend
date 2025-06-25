<template>
  <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-pink-500">
    <svg class="animate-spin h-12 w-12 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <p class="text-lg">Loading your study page...</p>
  </div>
  <div v-else class="min-h-screen flex bg-pink-50 p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

    <!-- Left Column -->
    <div
      class="flex-1 flex items-center justify-center bg-cover bg-center rounded-2xl relative"
      :style="{ backgroundImage: `url(/bg/pink_cloud.JPG)` }"
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
        <!-- Add Task Input -->
        <form @submit.prevent="addTask" class="flex items-center gap-2 mb-4">
        <input
            v-model="newTaskText"
            type="text"
            placeholder="New task..."
            class="flex-1 px-3 py-2 border border-pink-300 rounded-lg focus:outline-none"
        />
        <button
            type="submit"
            class="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
        >
            ➕
        </button>
        </form>
        <ul class="space-y-2">
  <li
    v-for="task in tasks"
    :key="task.id"
    class="task-item flex items-center justify-between"
  >
    <label class="flex items-center gap-2">
      <input 
        type="checkbox" 
        v-model="task.completed" 
        @change="toggleComplete(task)"
        class="pixel-checkbox"
      />
      <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.text }}</span>
    </label>
    <button
      @click="deleteTask(task.id)"
      class="text-red-500 hover:text-red-700 text-xl"
      title="Delete task"
    >
      🗑️
    </button>
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
</template>

<script>
import axios from 'axios'
import TimerComponent from '../components/TimerComponent.vue'

export default {
  name: 'StudyView',
  components: { TimerComponent },
  data() {
  return {
    loading: true,
    newTaskText: '',
    timeLeft: 25 * 60,
    isRunning: false,
    currentSession: 'pomodoro',
    timerInterval: null,
    pomodoroStartTime: null, // ✅ this goes inside the returned object
    tasks: [],
    pets: [
    ],
    currentPetId: 1,
    sessionTypes: [
      { type: 'pomodoro', name: 'Study', duration: 25 * 60 },
      { type: 'shortBreak', name: 'Short Break', duration: 5 * 60 },
      { type: 'longBreak', name: 'Long Break', duration: 15 * 60 }
    ]
  }
},
  computed: {
    currentPet() {
  return this.pets.find(pet => pet.id === this.currentPetId) || { name: 'No Pet', image: '/src/assets/pets/default.png' }
},
currentPetImage() {
  return this.currentPet.image || '/src/assets/pets/default.png'
}
,
    progressPercentage() {
      const duration = this.sessionTypes.find(s => s.type === this.currentSession).duration
      return ((duration - this.timeLeft) / duration) * 100
    }
  },
  mounted() {
  this.init()
},

  methods: {
  async init() {
    this.loading = true
    await Promise.all([
      this.fetchTasks(),
      this.fetchEquippedPet()
    ])
    this.loading = false
  },
    async fetchTasks() {
  const token = localStorage.getItem('token')
  console.log('Fetching tasks with token:', token)

  if (!token) {
    console.warn('No token found!')
    return
  }

  try {
    const response = await axios.get('https://studily-backend.onrender.com/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Fetched tasks:', response.data)

    this.tasks = response.data.data.map(task => ({
      id: task.id,
      text: task.title,
      completed: task.is_completed,
      completed_at: task.completed_at
    }))
  } catch (err) {
    console.error('Failed to fetch tasks:', err.response?.data || err.message)
  }
  this.loading = false

},
async fetchEquippedPet() {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get('https://studily-backend.onrender.com/characters/equipped', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data && response.data.data) {
      const pet = response.data.data
      this.pets = [
        {
          id: pet.id,
          name: pet.name,
          image: `/${pet.image_url.replace(/^public\//, '')}`
        }
      ]
      this.currentPetId = pet.id
    } else {
      console.warn('No equipped pet found, using fallback.')
      this.pets = [
        {
          id: 0,
          name: 'No Pet',
          image: '/src/assets/pets/default.png'
        }
      ]
      this.currentPetId = 0
    }
  } catch (err) {
    console.error('Failed to fetch equipped pet:', err)
    this.pets = [
      {
        id: 0,
        name: 'No Pet',
        image: '/src/assets/pets/default.png'
      }
    ]
    this.currentPetId = 0
  }
  this.loading = false

},

    async addTask() {
      const token = localStorage.getItem('token')
      if (!this.newTaskText.trim()) return

      try {
        const res = await axios.post(
          'https://studily-backend.onrender.com/tasks',
          { title: this.newTaskText },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.tasks.push({
          id: res.data.data.task_id,
          text: this.newTaskText,
          completed: false
        })
        this.newTaskText = ''
        this.$root.showNotification('Task added!')
      } catch (err) {
        console.error('Failed to add task:', err)
        this.$root.showNotification('Failed to add task.')
      }
    },

    async toggleComplete(task) {
      const token = localStorage.getItem('token')
      try {
        await axios.put(
          `https://studily-backend.onrender.com/tasks/${task.id}`,
          { is_completed: task.completed },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.$root.showNotification('Task updated!')
      } catch (err) {
        console.error('Failed to update task:', err)
        this.$root.showNotification('Update failed.')
      }
    },

    async deleteTask(taskId) {
      const token = localStorage.getItem('token')
      try {
        await axios.delete(`https://studily-backend.onrender.com/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        this.$root.showNotification('Task deleted!')
      } catch (err) {
        console.error('Failed to delete task:', err)
        this.$root.showNotification('Delete failed.')
      }
    },

    toggleTimer() {
      this.isRunning ? this.pauseTimer() : this.startTimer()
    },
    startTimer() {
  this.isRunning = true
  this.pomodoroStartTime = new Date().toISOString()
  this.timerInterval = setInterval(() => {
    if (this.timeLeft > 0) {
      this.timeLeft--
    } else {
      this.completeSession()
    }
  }, 1000)
}
,
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
    async completeSession() {
  this.pauseTimer()
  this.$root.showNotification('Session complete!')

  const token = localStorage.getItem('token')
  const now = new Date()
  const endTime = now.toISOString()

  try {
    // 1. Log study
    const res = await axios.post('https://studily-backend.onrender.com/study/log', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log('Study logged:', res.data)

    // Optional 2. Log Pomodoro session
    await axios.post('https://studily-backend.onrender.com/pomodoro/session', {
      start_time: this.pomodoroStartTime,
      end_time: endTime,
      is_completed: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log('Pomodoro session logged')
  } catch (err) {
    console.error('Failed to log session:', err.response?.data || err.message)
  }

  this.switchSession(this.currentSession === 'pomodoro' ? 'shortBreak' : 'pomodoro')
}

  }
}
</script>