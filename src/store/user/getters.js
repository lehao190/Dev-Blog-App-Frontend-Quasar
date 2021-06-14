// Get current authenticated user
export function getUser (state) {
  return {
    user: state.user,
    authenticated: state.authenticated
  }
}

export function getAuthenticated(state) {
  return state.authenticated
}

export function getUserError (state) {
  return state.error
}
