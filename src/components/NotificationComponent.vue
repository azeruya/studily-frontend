<template>
  <Transition name="slide">
    <div 
      v-if="show"
      class="fixed top-5 right-5 bg-gradient-to-r from-green-400 to-emerald-500 text-green-900 px-6 py-4 rounded-xl shadow-2xl z-50 max-w-sm"
    >
      {{ message }}
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'NotificationComponent',
  props: {
    show: Boolean,
    message: String
  },
  emits: ['close']
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>