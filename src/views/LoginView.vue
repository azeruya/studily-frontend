<template>
  <div class="min-h-screen flex items-center justify-center bg-pink-50">
    <div class="pixel-card w-full max-w-md p-8 shadow-xl">
      <h2 class="pixel-title text-center mb-6">🔐 Login</h2>
      <form @submit.prevent="login">
        <p class="text-red-500 mt-3 text-center" v-if="error">{{ error }}</p>
        <div class="mb-4">
          <label class="block text-pink-600 font-semibold mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-3 rounded-xl border border-pink-300 focus:outline-pink-400"
          />
        </div>
        <div class="mb-6">
          <label class="block text-pink-600 font-semibold mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 rounded-xl border border-pink-300 focus:outline-pink-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          Login
        </button>
      </form>
      <p class="text-center mt-4 text-sm text-pink-600">
        Don’t have an account?
        <router-link to="/register" class="underline hover:text-pink-800">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        await authService.login({
          email: this.email,
          password: this.password
        })

        this.$router.push('/')
        this.$root.showNotification('Welcome back! 🎉')
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed.'
      }
    }
  }
}
</script>

