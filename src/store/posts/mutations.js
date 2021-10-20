export function POSTS_RESET(state) {
  state.loading = false;
  state.posts = [];
  state.post = {};
  state.error = {};
}

export function POSTS_REQUEST(state) {
  state.loading = true;
}

export function POSTS_FAILURE(state, payload) {
  state.loading = false;
  state.error = payload.error;
}

export function POSTS_SUCCESS(state, payload) {
  state.loading = false;
  state.error = {};

  if (payload.posts) {
    state.posts = payload.posts;
  } else {
    state.post = payload.post;
  }
}
