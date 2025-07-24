import type { Card } from './types'

const state = () => {
  return {
    cards: [] as Card[],
    page: 1,
    rpp: 12,
    hasMore: false,
    loading: false
  }
}

export default state;