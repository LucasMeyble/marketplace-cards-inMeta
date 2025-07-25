import api from '../../api/axios'
import type { UserState, User } from './types'

const actions = {
  async fetchUser(this: UserState) {
    this.loading = true
    try {
      const { data } = await api.get('/me')

      // Montar o objeto de acordo com o retorno
      const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        cards: data.cards.map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
          createdAt: c.createdAt
        }))
      }

      this.user = userData
    } catch (err) {
      console.error('Error fetching user:', err)
      this.user = null
    } finally {
      this.loading = false
    }
  }
}

export default { ...actions }
