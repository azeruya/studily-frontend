// src/services/AuthService.js
import axios from 'axios'
import config from '../config'

const AuthService = {
  async login(email, password) {
    const response = await axios.post(`${config.apiBaseUrl}/auth/login`, {
      email,
      password
    })
    return response.data
  },

  async register(name, email, password) {
    const response = await axios.post(`${config.apiBaseUrl}/auth/register`, {
      name,
      email,
      password
    })
    return response.data
  }
}

export default AuthService
