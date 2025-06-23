<template>
  <div class="glassmorphism rounded-2xl p-6">
    <h3 class="text-xl font-semibold text-purple-600 mb-4 text-center">
      🔥 Study Stats
    </h3>
    
    <div class="text-center mb-6">
      <div class="text-4xl font-bold text-red-500 mb-2">{{ stats.streak }}</div>
      <p class="text-gray-600 text-sm">Day Streak!</p>
    </div>
    
    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600">Today's Sessions:</span>
        <span class="font-semibold text-purple-600">{{ stats.sessionsToday }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Study Time:</span>
        <span class="font-semibold text-purple-600">{{ stats.studyTimeToday }}m</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Total Sessions:</span>
        <span class="font-semibold text-purple-600">{{ stats.totalSessions }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>