export function TAGS_RESET(state) {
  state.loading = false;
  state.tags = [];
  state.error = {};
}

export function TAGS_REQUEST(state) {
  state.loading = true;
}

export function TAGS_FAILURE(state, payload) {
  state.loading = false;
  state.error = payload.error;
}

export function TAGS_SUCCESS(state, payload) {
  state.loading = false;
  state.error = {};

  if (payload.tags) {
    if (payload.method === 'delete') {
      if (!payload.tags.length) {
        payload.tags = [payload.tags]
      }

      payload.tags.filter(function(removedTag) {
        state.tags = state.tags.filter(function(tag) {
          return tag.id !== removedTag.id;
        });
      });
      
      return state.tags
    }

    state.tags = payload.tags.data;
  } else {
    state.tag = payload.tag;
  }
}
