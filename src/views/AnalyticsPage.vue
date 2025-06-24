<template>
  <div class="min-h-screen flex bg-pink-50 relative">
    <!-- Sidebar space -->
    <div class="w-20"></div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
      <div class="w-16 h-16 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Analytics Content -->
    <div class="flex-1 p-6 max-w-6xl mx-auto flex flex-col gap-6" v-if="!isLoading">
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
import axios from 'axios'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isoWeek)
dayjs.extend(isBetween)

export default {
  name: 'AnalyticsPage',
  data() {
    return {
      isLoading: true, // 👈 Spinner state
      stats: {
        totalSessions: 0,
        totalMinutes: 0,
        streak: 0
      },
      weekly: [],
      mostActiveTask: {
        name: '',
        minutes: 0
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    try {
      const [sessionsRes, userRes] = await Promise.all([
        axios.get('https://studily-backend.onrender.com/pomodoro/sessions', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://studily-backend.onrender.com/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      const sessions = sessionsRes.data.data
      const user = userRes.data.data

      const now = dayjs()
      const startOfWeek = now.startOf('week')
      const endOfWeek = now.endOf('week')

      const weeklyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const weeklyMap = [0, 0, 0, 0, 0, 0, 0]
      let totalMinutes = 0

      sessions.forEach(session => {
        const start = dayjs(session.start_time)
        const end = dayjs(session.end_time)
        const duration = end.diff(start, 'minute')
        const studyDate = dayjs(session.study_date)

        console.log(
          'Session date:', session.study_date,
          '| Parsed:', studyDate.format(),
          '| Between startOfWeek and endOfWeek?',
          studyDate.isBetween(startOfWeek, endOfWeek, null, '[]')
        )

        if (studyDate.isBetween(startOfWeek, endOfWeek, null, '[]')) {
          const dayIndex = studyDate.day()
          weeklyMap[dayIndex] += duration
        }

        totalMinutes += duration
      })

      this.weekly = weeklyLabels.map((label, i) => ({
        label,
        minutes: weeklyMap[i]
      }))

      const mostActive = this.weekly.reduce((a, b) => (b.minutes > a.minutes ? b : a), { label: '', minutes: 0 })
      this.mostActiveTask = {
        name: mostActive.label,
        minutes: mostActive.minutes
      }

      this.stats = {
        totalSessions: sessions.length,
        totalMinutes,
        streak: user.current_streak
      }

    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      this.$root.showNotification('Failed to load analytics data.')
    } finally {
      this.isLoading = false // ✅ Hide spinner
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
