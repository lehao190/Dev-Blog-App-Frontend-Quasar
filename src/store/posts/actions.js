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

  const [postsData, postsError] = await handle(
    api.get('/posts?$sort[created_at]=-1')
  );

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });
  }

  const { data } = postsData;

  commit({
    type: POSTS_SUCCESS,
    posts: data.data
  });
}

// Get post
export async function getPost({ commit }, payload) {
  const { postId } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [postData, postError] = await handle(api.get(`/posts/${postId}`));

  if (postError) {
    commit({
      type: POSTS_FAILURE,
      error: postError.response
    });

    throw postError.response;
  }

  const { data } = postData;

  commit({
    type: POSTS_SUCCESS,
    post: data
  });
}

// Create Post
export async function createPost({ commit }, payload) {
  const { title, body, coverImage, selectedOptions, userId, token } = payload;

  const tags = [];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  formData.append('post_image', coverImage);
  formData.append('userId', userId);

  commit({
    type: POSTS_REQUEST
  });

  const [postData, postError] = await handle(
    api.post('/posts', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (postError) {
    commit({
      type: POSTS_FAILURE,
      error: postError.response
    });

    throw postError.response;
  }

  selectedOptions.forEach(option => {
    tags.push({
      tagId: option.id,
      postId: postData.data.id
    });
  });

  const [postTagData, postTagError] = await handle(
    api.post('/tags-posts', tags, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (postTagError) {
    commit({
      type: POSTS_FAILURE,
      error: postTagError.response
    });

    throw postTagError.response;
  }

  commit({
    type: POSTS_SUCCESS,
    post: postData
  });
}

// Like Post
export async function likePost({ commit, getters }, payload) {
  const { authUserLiked, postId, userId, token, likes, post } = payload;

  commit({
    type: POSTS_REQUEST
  });

  if (authUserLiked) {
    const [removeLikeData, removeLikeError] = await handle(
      api.delete(`/likes?userId=${userId}&postId=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    if (removeLikeError) {
      commit({
        type: POSTS_FAILURE,
        error: removeLikeError.response
      });

      throw removeLikeError.response;
    }

    const [patchLikePostData, patchLikePostError] = await handle(
      api.patch(
        `/posts/${postId}`,
        {
          count_likes: likes - 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    );

    if (patchLikePostError) {
      commit({
        type: POSTS_FAILURE,
        error: patchLikePostError.response
      });

      throw patchLikePostError.response;
    }

    commit({
      type: POSTS_SUCCESS,
      post: {
        ...post,
        count_likes: likes - 1,
        authUserLiked: false
      }
    });
  } else {
    const [postlikeData, postlikeError] = await handle(
      api.post(
        `/likes`,
        {
          postId,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    );

    if (postlikeError) {
      commit({
        type: POSTS_FAILURE,
        error: postlikeError.response
      });

      throw postlikeError.response;
    }

    commit({
      type: POSTS_SUCCESS,
      post: {
        ...post,
        count_likes: likes + 1,
        authUserLiked: true
      }
    });
  }
}

// authenticated user liked post
export async function getAuthUserLikePost({ commit }, payload) {
  const { userId, postId, token, post } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [postlikeData, postlikeError] = await handle(
    api.get(`/likes?userId=${userId}&postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (postlikeError) {
    commit({
      type: POSTS_FAILURE,
      error: postlikeError.response
    });

    throw postlikeError.response;
  }

  const {
    data: { data }
  } = postlikeData;

  if (data[0]) {
    commit({
      type: POSTS_SUCCESS,
      post: {
        ...post,
        authUserLiked: true
      }
    });
  } else {
    commit({
      type: POSTS_SUCCESS,
      post: {
        ...post,
        authUserLiked: false
      }
    });
  }
}

// get all comments for post
export async function getAllComments({ commit }, payload) {
  const { postId, post } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [commentData, commentError] = await handle(
    api.get(`/comments?postId=${postId}&$sort[created_at]=-1`)
  );

  if (commentError) {
    commit({
      type: POSTS_FAILURE,
      error: commentError.response
    });

    throw commentError.response;
  }

  const { data } = commentData;

  const comments = data.data;

  commit({
    type: POSTS_SUCCESS,
    post: {
      ...post,
      comments
    }
  });
}

// Create User Comment
export async function createComment({ commit }, payload) {
  const { comments, username, userAvatar, userId, postId, commentText, post, token } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [commentData, commentError] = await handle(
    api.post(
      '/comments',
      {
        userId,
        postId,
        comment_text: commentText
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  );

  if (commentError) {
    commit({
      type: POSTS_FAILURE,
      error: commentError.response
    });

    throw commentError.response;
  }

  const { data } = commentData;

  commit({
    type: POSTS_SUCCESS,
    post: {
      ...post,
      comments: [
        {
          username,
          user_avatar: userAvatar,
          created_at: data.created_at,
          comment_text: data.comment_text
        },
        ...comments
      ]
    }
  });
}
