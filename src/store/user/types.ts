export interface UserCard {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  cards: UserCard[]
}

export interface UserState {
  user: User | null
  loading: boolean
}
