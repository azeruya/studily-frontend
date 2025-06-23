<template>
  <div class="min-h-screen flex bg-pink-50 p-6 max-w-7xl mx-auto flex flex-col gap-6">

    <h1 class="pixel-title mb-6 text-center text-pink-600">🐾 Your Pets</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="pet in pets"
        :key="pet.id"
        class="pixel-card flex flex-col items-center p-6 rounded-2xl cursor-pointer hover:bg-pink-200 transition"
        :class="{ 'opacity-50 grayscale': !pet.unlocked }"
        @click="selectPet(pet.id)"
      >
        <img
          :src="pet.image"
          :alt="pet.name"
          class="w-40 h-40 object-contain drop-shadow-lg pixel animate-float mb-4"
        />
        <div class="text-3xl mb-2">{{ pet.icon }}</div>
        <p class="text-lg font-bold text-pink-700">{{ pet.name }}</p>
        <p v-if="pet.id === currentPetId" class="mt-2 text-sm text-green-600 font-semibold">Equipped</p>
        <p v-else-if="pet.unlocked" class="mt-2 text-sm text-pink-600 font-semibold">Click to Equip</p>
        <p v-else class="mt-2 text-sm text-gray-500 italic">Locked</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PetsPage',
  data() {
    return {
      pets: [
        { id: 1, name: 'Axolotl', icon: '🐱', image: '/src/assets/pets/pinky.png', unlocked: true },
        { id: 2, name: 'Penguin', icon: '🐶', image: '/src/assets/pets/penguin.png', unlocked: true },
        { id: 3, name: 'Yeti', icon: '🐦', image: '/src/assets/pets/yeti.png', unlocked: false }, 
        { id: 3, name: 'Fox', icon: '🐦', image: '/src/assets/pets/fox.png', unlocked: false }, 
        { id: 3, name: 'Chinchilla', icon: '🐦', image: '/src/assets/pets/chinchilla.png', unlocked: false }, 
      ],
      currentPetId: 1,
    }
  },
  methods: {
    selectPet(petId) {
      const pet = this.pets.find(p => p.id === petId)
      if (!pet || !pet.unlocked) return

      this.currentPetId = petId
      this.$root.showNotification(`Equipped ${pet.name}!`)
    }
  }
}
</script>

<style scoped>
.pixel-card {
  background-color: white;
  box-shadow: 0 0 10px rgba(219, 39, 119, 0.25);
  border-radius: 1rem;
  user-select: none;
}

.pixel-card:hover {
  box-shadow: 0 0 15px rgba(219, 39, 119, 0.5);
}

.pixel-title {
  font-family: 'Pixel Emulator', monospace;
  font-weight: bold;
  font-size: 1.5rem;
  color: #db2777; /* pink-600 */
}
</style>
