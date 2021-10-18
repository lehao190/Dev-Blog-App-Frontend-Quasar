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
      // console.log('payload: ', payload.tags);
      // console.log('items: ', state.tags);

      if (!payload.tags.length) {
        payload.tags = [payload.tags]
      }

      payload.tags.filter(function(removedTag) {
        state.tags = state.tags.filter(function(tag) {
          return tag.id !== removedTag.id;
        });
      });

      // console.log('removed tags: ', state.tags)

      return state.tags
    }

    state.tags = payload.tags.data;
  } else {
    state.tag = payload.tag;
  }
}
