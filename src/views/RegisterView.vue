<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
    <div class="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full border border-pink-200">
      <h2 class="text-2xl font-bold text-center text-pink-600 mb-4">✨ Create Your Study Account ✨</h2>
      <p class="text-center text-gray-500 mb-6">Let’s unlock some cute pets together!</p>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="username" type="text" placeholder="Username"
          class="w-full p-3 border border-pink-300 rounded-xl bg-pink-100 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-3 border border-pink-300 rounded-xl bg-pink-100 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 border border-pink-300 rounded-xl bg-pink-100 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <button type="submit"
          class="w-full py-3 bg-pink-400 text-white font-semibold rounded-xl hover:bg-pink-500 transition">Register 🐣</button>
      </form>

      <p class="text-center text-sm mt-4 text-pink-500">
        Already have an account?
        <RouterLink to="/login" class="underline hover:text-pink-600">Login here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

function handleRegister() {
  console.log('Registering:', username.value, email.value, password.value)
}
</script>
