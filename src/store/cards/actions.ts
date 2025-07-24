import api from '../../api/axios'
import type { Card } from './types'

const actions = {
  async fetchCardsList(this: any, page: number, rpp: number) {
    this.loading = true
    try {
      const { data } = await api.get('/cards', {
        params: { page, rpp }
      })
      this.cards = data.list as Card[]
      this.page = data.page
      this.hasMore = data.more
    } catch (error) {
      console.error('Erro ao buscar cartas', error)
      throw error
    } finally {
      this.loading = false
    }
  }
}

export default { ...actions }
