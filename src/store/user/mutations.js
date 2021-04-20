export function userRequest (state, payload) {
  state.loading = true
}

export function userError (state, payload) { 
  state.loading = false
  state.error = payload.error
}

export function me (state, payload) {
  state.loading = false
  state.user = payload.user
}

export function login (state, payload) {
  state.loading = false
  state.user = payload.data.user
}
