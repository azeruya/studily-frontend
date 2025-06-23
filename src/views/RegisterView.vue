<template>
  <div class="min-h-screen flex items-center justify-center bg-purple-50">
    <div class="pixel-card w-full max-w-md p-8 shadow-xl">
      <h2 class="pixel-title text-center mb-6">📝 Register</h2>
      <form @submit.prevent="register">
        <p class="text-red-500 mt-3 text-center" v-if="error">{{ error }}</p>
        <div class="mb-4">
          <label class="block text-purple-600 font-semibold mb-1">Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full p-3 rounded-xl border border-purple-300 focus:outline-purple-400"
          />
        </div>
        <div class="mb-4">
          <label class="block text-purple-600 font-semibold mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-3 rounded-xl border border-purple-300 focus:outline-purple-400"
          />
        </div>
        <div class="mb-6">
          <label class="block text-purple-600 font-semibold mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 rounded-xl border border-purple-300 focus:outline-purple-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          Register
        </button>
      </form>
      <p class="text-center mt-4 text-sm text-purple-600">
        Already have an account?
        <router-link to="/login" class="underline hover:text-purple-800">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        await authService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })

        this.$router.push('/login')
        this.$root.showNotification('Account created! Please log in.')
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed.'
      }
    }
  }
}
</script>

