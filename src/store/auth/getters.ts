import type { AuthState } from './types'

const getters = {
  isAuthenticated: (state: AuthState): boolean => {
    return !!state.token
  },
  getUser: (state: AuthState) => state.user
}

export default {...getters}