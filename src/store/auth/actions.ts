import type { AuthResponse, User, RegisterPayload, AuthState } from './types'
import api from '../../api/axios'

const actions = {
  async login(this: AuthState, email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>('/login', { email, password })

      this.token = data.token
      this.user = data.user as User

      localStorage.setItem('token', data.token)
      return data
    } catch (err: any) {
      console.error('Erro ao fazer login:', err)
      throw err
    }
  },

  logout(this: AuthState) {
    this.token = null
    this.user = null
    localStorage.removeItem('token')
  },

  async register(this: AuthState, payload: RegisterPayload): Promise<void> {
    this.loading = true
    try {
      await api.post('/register', payload)
    } finally {
      this.loading = false
    }
  },
}

export default { ...actions }
