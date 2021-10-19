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
  const { title, body, coverImage, selectedOptions, userId, token } = payload
  
  const tags = []

  const formData = new FormData()
  formData.append('title', title)
  formData.append('body', body)
  formData.append('post_image', coverImage)
  formData.append('userId', userId)

  commit({
    type: POSTS_REQUEST
  });

  const [postData, postError] = await handle(
    api.post(
      '/posts',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (postError) {
    commit({
      type: POSTS_FAILURE,
      error: postError.response
    })

    throw postError.response
  }

  selectedOptions.forEach(option => {
    tags.push({
      tagId: option.id,
      postId: postData.data.id
    })
  })

  const [postTagData, postTagError] = await handle(
    api.post(
      '/tags-posts',
      tags,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (postTagError) {
    commit({
      type: POSTS_FAILURE,
      error: postTagError.response
    })

    throw postTagError.response
  }

  commit({
    type: POSTS_SUCCESS,
    post: postData
  })
}
