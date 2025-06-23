<template>
  <div class="min-h-screen flex bg-pink-50">
    <!-- Sidebar space -->
    <div class="w-20"></div>

    <!-- Analytics Content -->
    <div class="flex-1 p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <div class="pixel-card p-6">
        <h2 class="pixel-title mb-4">📊 Study Summary</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-pink-100 rounded-xl p-4 text-center shadow">
            <p class="text-lg font-semibold text-pink-700">Total Sessions</p>
            <p class="text-3xl font-bold text-pink-600">{{ stats.totalSessions }}</p>
          </div>
          <div class="bg-purple-100 rounded-xl p-4 text-center shadow">
            <p class="text-lg font-semibold text-purple-700">Total Time</p>
            <p class="text-3xl font-bold text-purple-600">{{ formatMinutes(stats.totalMinutes) }}</p>
          </div>
          <div class="bg-blue-100 rounded-xl p-4 text-center shadow">
            <p class="text-lg font-semibold text-blue-700">Streak</p>
            <p class="text-3xl font-bold text-blue-600">{{ stats.streak }} 🔥</p>
          </div>
        </div>
      </div>

      <div class="pixel-card p-6">
        <h2 class="pixel-title mb-4">📅 Weekly Progress</h2>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="(day, index) in weekly"
            :key="index"
            class="text-center p-3 rounded-xl"
            :class="{
              'bg-pink-300 text-white': day.minutes > 0,
              'bg-pink-100 text-pink-600': day.minutes === 0
            }"
          >
            <p class="font-bold text-lg">{{ day.label }}</p>
            <p class="text-sm">{{ formatMinutes(day.minutes) }}</p>
          </div>
        </div>
      </div>

      <div class="pixel-card p-6">
        <h2 class="pixel-title mb-4">🌟 Most Active Task</h2>
        <div class="bg-yellow-100 p-4 rounded-xl shadow text-center">
          <p class="text-xl font-semibold text-yellow-700">{{ mostActiveTask.name }}</p>
          <p class="text-sm text-yellow-600 mt-1">Spent: {{ formatMinutes(mostActiveTask.minutes) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsPage',
  data() {
    return {
      stats: {
        totalSessions: 35,
        totalMinutes: 875,
        streak: 5
      },
      weekly: [
        { label: 'Mon', minutes: 60 },
        { label: 'Tue', minutes: 120 },
        { label: 'Wed', minutes: 90 },
        { label: 'Thu', minutes: 30 },
        { label: 'Fri', minutes: 0 },
        { label: 'Sat', minutes: 45 },
        { label: 'Sun', minutes: 0 }
      ],
      mostActiveTask: {
        name: 'Vue Homework',
        minutes: 240
      }
    }
  },
  methods: {
    formatMinutes(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours > 0 ? hours + 'h ' : ''}${mins}m`
    }
  }
}
</script>
