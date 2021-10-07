import { api } from 'boot/axios';
import { handle } from '../../utils/handle_promise';
import {
  POSTS_RESET,
  POSTS_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS
} from '../mutation-types/postsConstants';

// Request All Posts
export async function requestAllPosts({ commit }) {
  commit({
    type: POSTS_REQUEST
  });

  const [postsData, postsError] = await handle(api.get('/posts'));

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });
  }

  const { data } = postsData;

  commit({
    type: POSTS_SUCCESS,
    posts: data
  });
}

// Create Post
export async function createPost({ commit }, payload) {
  const { title, body, userId, token } = payload

  commit({
    type: POSTS_REQUEST
  });

  const [postData, postError] = await handle(
    api.post(
      '/posts',
      {
        title,
        body,
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (postError) {
    return commit({
      type: POSTS_FAILURE,
      error: postError.response
    })
  }

  commit({
    type: POSTS_SUCCESS,
    post: postData
  })
}
