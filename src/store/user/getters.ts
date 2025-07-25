import type { UserState } from './types'

const getters = {
  getUser: (state: UserState) => state.user,
  getUserCards: (state: UserState) => state.user?.cards || [],
  isUserLoading: (state: UserState) => state.loading
}


export default {...getters}