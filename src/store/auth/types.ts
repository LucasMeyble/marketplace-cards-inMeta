export type User = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  token: string | null
  user: User | null
  loading: boolean
}

export type AuthResponse = {
  token: string
  user: User
}
export interface RegisterPayload {
  name: string
  email: string
  password: string
}