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
    if (payload.method === 'delete') {
      if (!payload.posts.length) {
        payload.posts = [payload.posts];
      }

      payload.posts.filter(function(removedPost) {
        state.posts = state.posts.filter(function(post) {
          return post.id !== removedPost.id;
        });
      });

      return state.posts;
    }

    state.posts = payload.posts.data;
  } else {
    state.post = payload.post;
  }
}
