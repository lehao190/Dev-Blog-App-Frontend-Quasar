// Get All Posts
export function getPosts(state) {
  return {
    posts: state.posts
  };
}

// Get Post
export function getOnePost(state) {
  return {
    post: state.post
  };
}

// Get error message
export function postError(state) {
  return state.error;
}
