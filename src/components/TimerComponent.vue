<template>
<div class="pixel-card-timer w-full max-w-md mx-auto rounded-2xl p-6 md:p-10 text-center shadow-xl relative overflow-hidden">
  
  <!-- Top Window Bar -->
  <div class="flex items-center justify-start gap-2 mb-4">
    <span class="w-3 h-3 rounded-full bg-red-400"></span>
    <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
    <span class="w-3 h-3 rounded-full bg-green-400"></span>
  </div>

  <!-- Session Selector -->
  <SessionSelector 
    :session-types="sessionTypes"
    :current-session="currentSession"
    @switch-session="$emit('switch-session', $event)"
  />

  <!-- Timer Text -->
  <div class="text-6xl md:text-7xl font-bold text-white font-mono my-10 drop-shadow-glow">
    {{ formatTime(timeLeft) }}
  </div>

  <!-- Progress Bar -->
  <ProgressBar :percentage="progressPercentage" />

  <!-- Buttons -->
  <div class="flex flex-wrap gap-4 justify-center mt-8">
    <button 
      v-if="!isRunning"
      class="btn-start"
      @click="$emit('toggle-timer')"
    >
      ▶ Start
    </button>
    <button 
      v-if="isRunning"
      class="btn-pause"
      @click="$emit('toggle-timer')"
    >
      ⏸ Pause
    </button>
    <button 
      class="btn-reset"
      @click="$emit('reset-timer')"
    >
      Reset
    </button>
    <button 
      class="btn-skip"
      @click="$emit('skip-session')"
    >
      ⏭ Skip
    </button>
  </div>
</div>

</template>

<script>
import SessionSelector from './SessionSelector.vue'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'TimerComponent',
  components: {
    SessionSelector,
    ProgressBar
  },
  props: {
    timeLeft: Number,
    isRunning: Boolean,
    currentSession: String,
    sessionTypes: Array,
    progressPercentage: Number
  },
  emits: ['toggle-timer', 'reset-timer', 'skip-session', 'switch-session'],
  methods: {
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
  }
}
</script>
