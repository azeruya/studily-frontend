<template>
  <div class="w-full h-3 bg-purple-200 rounded-full overflow-hidden my-6">
    <div 
      class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
      :style="{ width: percentage + '%' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>