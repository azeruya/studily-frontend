<template>
  <div class="glassmorphism rounded-3xl p-10 text-center">
    <PetDisplay 
      :pet="currentPet" 
      @pet-click="$emit('pet-interaction')"
    />
    
    <SessionSelector 
      :session-types="sessionTypes"
      :current-session="currentSession"
      @switch-session="$emit('switch-session', $event)"
    />
    
    <div class="text-6xl font-bold text-purple-600 my-8 font-mono">
      {{ formatTime(timeLeft) }}
    </div>
    
    <ProgressBar :percentage="progressPercentage" />
    
    <div class="flex gap-4 justify-center mt-8">
      <button 
        v-if="!isRunning"
        class="btn-primary"
        @click="$emit('toggle-timer')"
      >
        ▶️ Start
      </button>
      <button 
        v-if="isRunning"
        class="btn-secondary"
        @click="$emit('toggle-timer')"
      >
        ⏸️ Pause
      </button>
      <button 
        class="btn-secondary"
        @click="$emit('reset-timer')"
      >
        🔄 Reset
      </button>
      <button 
        class="btn-success"
        @click="$emit('skip-session')"
      >
        ⏭️ Skip
      </button>
    </div>
  </div>
</template>

<script>
import PetDisplay from './PetDisplay.vue'
import SessionSelector from './SessionSelector.vue'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'TimerComponent',
  components: {
    PetDisplay,
    SessionSelector,
    ProgressBar
  },
  props: {
    currentPet: Object,
    timeLeft: Number,
    isRunning: Boolean,
    currentSession: String,
    sessionTypes: Array,
    progressPercentage: Number
  },
  emits: ['toggle-timer', 'reset-timer', 'skip-session', 'switch-session', 'pet-interaction'],
  methods: {
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
  }
}
</script>