import type { UserState } from './types'

const state = ():UserState => {
  return {
    user: null,
    loading: false
  }
}

export default state;