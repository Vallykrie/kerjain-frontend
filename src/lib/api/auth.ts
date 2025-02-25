import axios from 'axios'
import { LoginInput, SignupInput } from '../validations/auth'

const api = axios.create({
  baseURL: '/api',
})

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },
  signup: async (data: SignupInput) => {
    const response = await api.post('/auth/signup', data)
    return response.data
  },
}