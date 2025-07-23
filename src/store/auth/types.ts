export type User = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  token: string | null
  user: User | null
}

export type AuthResponse = {
  token: string
  user: User
}