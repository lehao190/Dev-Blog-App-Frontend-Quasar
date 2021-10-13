import { api } from 'boot/axios';
import { handle } from '../../utils/handle_promise';
import {
  TAGS_FAILURE,
  TAGS_REQUEST,
  TAGS_RESET,
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
