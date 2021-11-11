import { api } from 'boot/axios';
import { handle } from '../../utils/handle_promise';
import {
  TAGS_FAILURE,
  TAGS_REQUEST,
  TAGS_SUCCESS
} from '../mutation-types/tagsConstants';

// Get All Tags
export async function getAllTags({ commit }) {
  commit({
    type: TAGS_REQUEST
  });

  const [tagsData, tagsError] = await handle(api.get('/tags'));

  if (tagsError) {
    commit({
      type: TAGS_FAILURE,
      error: tagsError.response
    });

    throw tagsError.response;
  }

  const { data } = tagsData;

  commit({
    type: TAGS_SUCCESS,
    tags: data
  });
}

// Get Tag
export async function getTag({ commit }, payload) {
  const { tagId, token } = payload;

  commit({
    type: TAGS_REQUEST
  });

  const [tagsData, tagsError] = await handle(
    api.get(`/tags/${tagId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (tagsError) {
    commit({
      type: TAGS_FAILURE,
      error: tagsError.response
    });

    throw tagsError.response;
  }

  const { data } = tagsData;

  commit({
    type: TAGS_SUCCESS,
    tag: data
  });
}

// Create Tag
export async function createTag({ commit }, payload) {
  const { tagName, tagIcon, token } = payload;

  commit({
    type: TAGS_REQUEST
  });

  const [tagsData, tagsError] = await handle(
    api.post(
      '/tags',
      {
        tag_name: tagName,
        tag_icon: tagIcon
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (tagsError) {
    commit({
      type: TAGS_FAILURE,
      error: tagsError.response
    });

    throw tagsError.response;
  }

  const { data } = tagsData;

  commit({
    type: TAGS_SUCCESS,
    tags: data
  });
}

// Edit Tag
export async function editTag({ commit }, payload) {
  const { tagId, tagName, tagIcon, token } = payload;

  commit({
    type: TAGS_REQUEST
  });

  const [tagsData, tagsError] = await handle(
    api.patch(
      `/tags/${tagId}`,
      {
        tag_name: tagName,
        tag_icon: tagIcon
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (tagsError) {
    commit({
      type: TAGS_FAILURE,
      error: tagsError.response
    });

    throw tagsError.response;
  }

  const { data } = tagsData;

  commit({
    type: TAGS_SUCCESS,
    tags: data
  });
}

// Delete one or multiple tags
export async function deleteTags({ commit }, payload) {
  const { tags, token } = payload;

  commit({
    type: TAGS_REQUEST
  });

  let tagURL = '/tags';

  if (tags.length === 1) {
    tagURL = tagURL + `/${tags[0].id}`;
  }

  if (tags.length > 1) {
    for (let i = 0; i < tags.length; i++) {
      if (i === 0) {
        tagURL = tagURL + `?id[$in]=${tags[i].id}`;
      } else {
        tagURL = tagURL + `&id[$in]=${tags[i].id}`;
      }
    }
  }

  const [tagsData, tagsError] = await handle(
    api.delete(`${tagURL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (tagsError) {
    commit({
      type: TAGS_FAILURE,
      error: tagsError.response
    });

    throw tagsError.response;
  }

  const { data } = tagsData;

  commit({
    type: TAGS_SUCCESS,
    tags: data,
    method: 'delete'
  });
}

// Follow Tags
export async function followTag({ commit }, payload) {
  const { isFollowed, tagId, userId, token } = payload;

  commit({
    type: TAGS_REQUEST
  });

  if (!isFollowed) {
    const [tagData, tagError] = await handle(
      api.post(
        '/tags-users',
        {
          userId,
          tagsId: tagId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    );

    if (tagError) {
      commit({
        type: TAGS_FAILURE,
        error: tagError.response
      });

      throw tagError.response;
    }

    const { data } = tagData;

    commit({
      type: TAGS_SUCCESS,
      tag: data
    });
  } else {
    const [tagData, tagError] = await handle(
      api.delete(`/tags-users?userId=${userId}&tagsId=${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    if (tagError) {
      commit({
        type: TAGS_FAILURE,
        error: tagError.response
      });

      throw tagError.response;
    }

    const { data } = tagData;

    commit({
      type: TAGS_SUCCESS,
      tag: data
    });
  }
}

// authenticated user followed tags
export async function getAuthUserFollowedTags({ commit }, payload) {
  const { userId, token, tags } = payload;

  commit({
    type: TAGS_REQUEST
  });

  const [followedTagsData, followTagsError] = await handle(
    api.get(`/tags-users?userId=${userId}&noTagsJoin=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (followTagsError) {
    commit({
      type: TAGS_FAILURE,
      error: followTagsError.response
    });

    throw followTagsError.response;
  }

  const {
    data: { data }
  } = followedTagsData;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < tags.length; j++) {
      if (tags[j].id === data[i].tagsId) {
        tags[j].followed = true;
      }
    }
  }

  commit({
    type: TAGS_SUCCESS,
    tags: {
      data: [...tags]
    }
  });
}
