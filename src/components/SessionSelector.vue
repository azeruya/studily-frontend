<template>
  <div class="flex justify-center gap-3 mb-6">
    <button 
      v-for="session in sessionTypes" 
      :key="session.type"
      class="px-4 py-2 border-2 border-purple-300 rounded-full font-medium transition-all duration-300"
      :class="currentSession === session.type 
        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-transparent' 
        : 'text-purple-600 hover:bg-purple-50'"
      @click="$emit('switch-session', session.type)"
    >
      {{ session.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SessionSelector',
  props: {
    sessionTypes: Array,
    currentSession: String
  },
  emits: ['switch-session']
}
</script>