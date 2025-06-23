<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
    <div class="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full border border-purple-200">
      <h2 class="text-2xl font-bold text-center text-purple-600 mb-4">🌈 Welcome Back!</h2>
      <p class="text-center text-gray-500 mb-6">Log in to keep your pet happy!</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-3 border border-purple-300 rounded-xl bg-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 border border-purple-300 rounded-xl bg-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <button type="submit"
          class="w-full py-3 bg-purple-400 text-white font-semibold rounded-xl hover:bg-purple-500 transition">Login 🧸</button>
      </form>

      <p class="text-center text-sm mt-4 text-purple-500">
        New here?
        <RouterLink to="/register" class="underline hover:text-purple-600">Create an account</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Logging in:', email.value, password.value)
}
</script>
