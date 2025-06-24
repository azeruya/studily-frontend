<template>
  <div class="min-h-screen flex bg-pink-50 p-6 max-w-7xl mx-auto flex-col gap-6">
    <h1 class="pixel-title mb-6 text-center text-pink-600">🐾 Your Pets</h1>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-pink-500">
    <svg class="animate-spin h-12 w-12 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <p class="text-lg">Loading your pets...</p>
  </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
import axios from 'axios'

export default {
  name: 'PetsPage',
  data() {
    return {
      pets: [],
      currentPetId: null,
      loading: true
    }
  },
  async mounted() {
    await this.fetchPets()
  },
  methods: {
    async fetchPets() {
      const token = localStorage.getItem('token')
      this.loading = true
      try {
        const [allRes, unlockedRes, equippedRes] = await Promise.all([
          axios.get('https://studily-backend.onrender.com/characters/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://studily-backend.onrender.com/characters/unlocked', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://studily-backend.onrender.com/characters/equipped', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        const unlockedIds = unlockedRes.data.data.map(c => c.id)
        const equippedId = equippedRes.data.data?.id

        this.pets = allRes.data.data.map(pet => ({
          id: pet.id,
          name: pet.name,
          image: `/${pet.image_url.replace(/^public\//, '')}`,
          unlocked: unlockedIds.includes(pet.id),
        }))

        this.currentPetId = equippedId
      } catch (err) {
        console.error('Failed to load pets:', err)
        this.$root.showNotification('Failed to load pets')
      }
      this.loading = false
    },

    async selectPet(petId) {
      const token = localStorage.getItem('token')
      const pet = this.pets.find(p => p.id === petId)
      if (!pet || !pet.unlocked) return

      try {
        await axios.post(`https://studily-backend.onrender.com/characters/equip/${petId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.currentPetId = petId
        this.$root.showNotification(`Equipped ${pet.name}!`)
      } catch (err) {
        console.error('Failed to equip pet:', err)
        this.$root.showNotification('Failed to equip pet.')
      }
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
