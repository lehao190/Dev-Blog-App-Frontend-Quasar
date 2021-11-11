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
  // state.authenticated = false
  // state.user = {}
}

export function USER_CREDENTIALS_SUCCESS (state, payload) {
  state.loading = false
  state.error = {}

  if (payload.users) {
    if (payload.method === 'delete') {
      if (!payload.users.length) {
        payload.users = [payload.users];
      }

      payload.users.filter(function(removedUser) {
        state.users = state.users.filter(function(user) {
          return user.id !== removedUser.id;
        });
      });

      return state.users;
    }

    state.users = payload.users.data;
  } 
  else if (payload.postUser) {
    state.postUser = payload.postUser
  }
  else if (payload.editUser) {
    state.editUser = payload.editUser
  }
  else {
    state.user = payload.user;
    state.authenticated = true
  }
}
