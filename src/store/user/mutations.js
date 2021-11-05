export function USER_CREDENTIALS_RESET (state, payload) {
  state.loading = false
  state.user = {}
  state.authenticated = false
  state.error = {}
}

export function USER_CREDENTIALS_REQUEST (state, payload) {
  state.loading = true
}

export function USER_CREDENTIALS_FAILURE (state, payload) { 
  state.loading = false
  state.error = payload.error
  state.authenticated = false
  state.user = {}
}

export function USER_CREDENTIALS_SUCCESS (state, payload) {
  state.loading = false
  state.error = {}
  // state.user = payload.user
  state.authenticated = true

  if (payload.users) {
    state.users = payload.users;
  } else {
    state.user = payload.user;
  }
}
