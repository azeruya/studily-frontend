<template>
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div class="lg:col-span-2">
      <TimerComponent 
        :current-pet="currentPet"
        :time-left="timeLeft"
        :is-running="isRunning"
        :current-session="currentSession"
        :session-types="sessionTypes"
        :progress-percentage="progressPercentage"
        @toggle-timer="toggleTimer"
        @reset-timer="resetTimer"
        @skip-session="skipSession"
        @switch-session="switchSession"
        @pet-interaction="petCharacter"
      />
    </div>
    
    <div class="space-y-6">
      <StatsCard :stats="stats" />
      <PetCollection 
        :pets="pets" 
        :current-pet-id="currentPetId"
        @select-pet="selectPet"
      />
      <MotivationalQuote :quote="currentQuote" />
    </div>
  </div>
</template>

<script>
import TimerComponent from '../components/TimerComponent.vue'
import StatsCard from '../components/StatsCard.vue'
import PetCollection from '../components/PetCollection.vue'
import MotivationalQuote from '../components/MotivationalQuote.vue'

export default {
  name: 'StudyView',
  components: {
    TimerComponent,
    StatsCard,
    PetCollection,
    MotivationalQuote
  },
  data() {
    return {
      // Timer state
      timeLeft: 25 * 60,
      isRunning: false,
      currentSession: 'pomodoro',
      timerInterval: null,
      
      // Session types
      sessionTypes: [
        { type: 'pomodoro', name: 'Study', duration: 25 * 60 },
        { type: 'shortBreak', name: 'Short Break', duration: 5 * 60 },
        { type: 'longBreak', name: 'Long Break', duration: 15 * 60 }
      ],
      
      // Stats
      stats: {
        streak: 7,
        sessionsToday: 4,
        studyTimeToday: 100,
        totalSessions: 85
      },
      
      // Pet collection
      pets: [
        { id: 1, name: 'Fluffy', icon: '🐱', unlocked: true, unlockRequirement: 0 },
        { id: 2, name: 'Buddy', icon: '🐶', unlocked: true, unlockRequirement: 3 },
        { id: 3, name: 'Nibbles', icon: '🐰', unlocked: false, unlockRequirement: 10 },
        { id: 4, name: 'Squeaky', icon: '🐹', unlocked: false, unlockRequirement: 20 },
        { id: 5, name: 'Shelly', icon: '🐢', unlocked: false, unlockRequirement: 30 },
        { id: 6, name: 'Chirpy', icon: '🐦', unlocked: false, unlockRequirement: 50 }
      ],
      
      currentPetId: 1,
      
      // Motivational quotes
      quotes: [
        { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
        { text: "Study hard what interests you the most in the most undisciplined way.", author: "Richard Feynman" }
      ]
    }
  },
  
  computed: {
    currentPet() {
      return this.pets.find(pet => pet.id === this.currentPetId) || this.pets[0]
    },
    
    progressPercentage() {
      const currentDuration = this.sessionTypes.find(s => s.type === this.currentSession).duration
      return ((currentDuration - this.timeLeft) / currentDuration) * 100
    },
    
    currentQuote() {
      return this.quotes[Math.floor(Math.random() * this.quotes.length)]
    }
  },
  
  methods: {
    toggleTimer() {
      if (this.isRunning) {
        this.pauseTimer()
      } else {
        this.startTimer()
      }
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
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
      }
    },
    
    resetTimer() {
      this.pauseTimer()
      const currentSessionType = this.sessionTypes.find(s => s.type === this.currentSession)
      this.timeLeft = currentSessionType.duration
    },
    
    switchSession(sessionType) {
      this.pauseTimer()
      this.currentSession = sessionType
      const sessionData = this.sessionTypes.find(s => s.type === sessionType)
      this.timeLeft = sessionData.duration
    },
    
    skipSession() {
      this.pauseTimer()
      this.completeSession()
    },
    
    completeSession() {
      this.pauseTimer()
      
      if (this.currentSession === 'pomodoro') {
        this.stats.sessionsToday++
        this.stats.totalSessions++
        this.stats.studyTimeToday += 25
        this.checkPetUnlocks()
      }
      
      this.$root.showNotification('Session completed! Great work! 🎉')
      
      if (this.currentSession === 'pomodoro') {
        this.switchSession(this.stats.sessionsToday % 4 === 0 ? 'longBreak' : 'shortBreak')
      } else {
        this.switchSession('pomodoro')
      }
    },
    
    petCharacter() {
      this.$root.showNotification(`${this.currentPet.name} is cheering you on! 🎉`)
    },
    
    selectPet(pet) {
      if (pet.unlocked) {
        this.currentPetId = pet.id
        this.$root.showNotification(`${pet.name} is now your study buddy! 🐾`)
      } else {
        this.$root.showNotification(`Reach a ${pet.unlockRequirement} day streak to unlock ${pet.name}!`)
      }
    },
    
    checkPetUnlocks() {
      this.pets.forEach(pet => {
        if (!pet.unlocked && this.stats.streak >= pet.unlockRequirement) {
          pet.unlocked = true
          this.$root.showNotification(`🎉 New pet unlocked: ${pet.name}! ${pet.icon}`)
        }
      })
    }
  },
  
  mounted() {
    this.checkPetUnlocks()
  },
  
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  }
}
</script>