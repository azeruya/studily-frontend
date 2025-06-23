<template>
  <div class="mb-8">
    <div 
      class="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-6xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 bounce-animation"
      @click="handleClick"
    >
      {{ pet.icon }}
    </div>
    <div class="mt-4 text-2xl font-semibold text-purple-600">
      {{ pet.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetDisplay',
  props: {
    pet: {
      type: Object,
      required: true
    }
  },
  emits: ['pet-click'],
  methods: {
    handleClick() {
      // Add click animation
      this.$el.querySelector('.w-36').style.transform = 'scale(1.1) rotate(5deg)'
      setTimeout(() => {
        this.$el.querySelector('.w-36').style.transform = 'scale(1) rotate(0deg)'
      }, 200)
      
      this.$emit('pet-click')
    }
  }
}
</script>