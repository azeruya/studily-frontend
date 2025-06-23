<template>
  <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center border-l-4 border-pink-400">
    <p class="italic text-purple-600 mb-2">"{{ quote.text }}"</p>
    <p class="text-sm text-gray-600 font-medium">- {{ quote.author }}</p>
  </div>
</template>

<script>
export default {
  name: 'MotivationalQuote',
  props: {
    quote: {
      type: Object,
      required: true
    }
  }
}
</script>