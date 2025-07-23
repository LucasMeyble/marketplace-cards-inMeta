import type { AuthState } from './types'

const getters = {
  isAuthenticated: (state: AuthState): boolean => {
    return !!state.token
  }
}

export default {...getters}