// Get current authenticated user
export function getUser (state) {
  return {
    user: state.user,
    authenticated: state.authenticated
  }
}

// Get all users
export function getUsers (state) {
  return {
    users: state.users
  }
}

export function getAuthenticated(state) {
  return state.authenticated
}

export function getUserError (state) {
  return state.error
}
