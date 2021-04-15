export function me (state, payload) {
  state.user = payload.data
}

export function login (state, payload) {
  state.user = payload.data.user
}
