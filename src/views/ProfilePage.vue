<template>
  <div class="min-h-screen flex bg-pink-50">
    <!-- Sidebar space (leave empty so content doesn't overlap) -->
    <div class="w-20"></div>

    <!-- Profile Content -->
    <div class="flex-1 p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div class="pixel-card p-6 flex flex-col items-center text-center">
        <img
          :src="user.avatar"
          alt="Profile Avatar"
          class="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-xl mb-4"
        />
        <h2 class="text-2xl font-bold text-pink-600 drop-shadow-glow">{{ user.username }}</h2>
        <p class="text-gray-600">{{ user.role }}</p>
      </div>

      <div class="pixel-card p-6">
        <h3 class="pixel-title mb-4">📝 Profile Information</h3>
        <form class="space-y-4">
          <div>
            <label class="block text-pink-700 font-medium">Name</label>
            <input
              type="text"
              v-model="user.name"
              class="pixel-input w-full"
            />
          </div>

          <div>
            <label class="block text-pink-700 font-medium">Email</label>
            <input
              type="email"
              v-model="user.email"
              class="pixel-input w-full"
            />
          </div>

          <div class="text-right mt-6">
            <button
              type="button"
              @click="updateProfile"
              class="pixel-btn px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 rounded-xl transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {
        username: 'study_bunny',
        name: 'Fathiya Azelya',
        email: 'fathiya@example.com',
        role: 'Student',
        avatar: '/src/assets/pets/pinky.png' // you can change this to any pet image
      }
    }
  },
  methods: {
    updateProfile() {
      this.$root.showNotification('Profile updated!')
      // You can later hook this to an API or storage
    }
  }
}
</script>

<style scoped>
.pixel-input {
  border: 2px solid #fbcfe8;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #fff0f6;
  transition: border 0.3s;
}
.pixel-input:focus {
  outline: none;
  border-color: #ec4899;
}
</style>
