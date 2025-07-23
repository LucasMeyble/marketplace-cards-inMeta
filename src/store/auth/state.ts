import type { AuthState } from "./types";

const state = (): AuthState => {
  return {
    token: null,
    user: null,
  }
}

export default state;