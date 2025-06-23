<template>
  <div class="glassmorphism rounded-2xl p-6">
    <h3 class="text-xl font-semibold text-purple-600 mb-4 text-center">
      🐾 Pet Collection
    </h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div 
        v-for="pet in pets" 
        :key="pet.id"
        class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center border-2 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
        :class="getPetCardClass(pet)"
        @click="$emit('select-pet', pet)"
      >
        <div class="text-3xl mb-2">{{ pet.icon }}</div>
        <div class="text-sm font-medium">{{ pet.name }}</div>
        <div v-if="!pet.unlocked" class="text-xs text-gray-500 mt-1">
          {{ pet.unlockRequirement }} streak
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetCollection',
  props: {
    pets: Array,
    currentPetId: Number
  },
  emits: ['select-pet'],
  methods: {
    getPetCardClass(pet) {
      if (!pet.unlocked) {
        return 'opacity-50 grayscale border-gray-200'
      } else if (pet.id === this.currentPetId) {
        return 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
      } else {
        return 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50'
      }
    }
  }
}
</script>