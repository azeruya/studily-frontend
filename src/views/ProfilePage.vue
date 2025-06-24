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
        <h2 class="text-2xl font-bold text-pink-600 drop-shadow-glow">{{ user.name }}</h2>
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
import axios from 'axios'

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {
        name: '',
        email: '',
        avatar: '',       // from equipped_character.image_url
        current_streak: 0 // optional, show on UI
      },
      loading: true
    }
  },
  async mounted() {
    await this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get('https://studily-backend.onrender.com/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = res.data.data
        this.user = {
          name: data.name,
          email: data.email,
          avatar: `/${data.equipped_character?.image_url?.replace(/^public\//, '') || 'pets/default.png'}`,
          current_streak: data.current_streak || 0
        }

        this.loading = false
      } catch (err) {
        console.error('Failed to load profile:', err)
        this.$root.showNotification('Failed to load profile')
      }
    },

    async updateProfile() {
      const token = localStorage.getItem('token')
      try {
        await axios.put('https://studily-backend.onrender.com/users/me', {
          name: this.user.name,
          email: this.user.email
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.$root.showNotification('Profile updated!')
      } catch (err) {
        console.error('Failed to update profile:', err)
        this.$root.showNotification('Failed to update profile')
      }
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
