// Get All Tags
export function getTags(state) {
  return {
    tags: state.tags
  };
}

// Get Tag
export function getOneTag(state) {
  return {
    tag: state.tag
  };
}

// Get error message
export function tagsError(state) {
  return state.error;
}
