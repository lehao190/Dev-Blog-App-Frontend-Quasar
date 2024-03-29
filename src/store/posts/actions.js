import { api } from 'boot/axios';
// import posts from '.';
import { handle } from '../../utils/handle_promise';
import { formatDate } from '../../utils/handle_date';
import {
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

    throw postsError.response;
  }

  const { data } = postsData;

  for (let i = 0; i < data.data.length; i++) {
    data.data[i].created_at = formatDate(data.data[i].created_at);
    data.data[i].updated_at = formatDate(data.data[i].updated_at);
  }

  commit({
    type: POSTS_SUCCESS,
    posts: data
  });
}

// Searching Posts
export async function searchPosts({ commit }, payload) {
  const { title } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [postsData, postsError] = await handle(
    api.get(`/posts?title[$like]=%${title}%`)
  );

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });

    throw postsError.response;
  }

  const { data } = postsData;

  commit({
    type: POSTS_SUCCESS,
    posts: data
  });
}

// Delete one or multiple posts
export async function deletePosts({ commit }, payload) {
  const { posts, token } = payload;

  commit({
    type: POSTS_REQUEST
  });

  let postURL = '/posts';

  if (posts.length === 1) {
    postURL = postURL + `/${posts[0].id}`;
  }

  if (posts.length > 1) {
    for (let i = 0; i < posts.length; i++) {
      if (i === 0) {
        postURL = postURL + `?id[$in]=${posts[i].id}`;
      } else {
        postURL = postURL + `&id[$in]=${posts[i].id}`;
      }
    }
  }

  const [postsData, postsError] = await handle(
    api.delete(`${postURL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });

    throw postsError.response;
  }

  const { data } = postsData;

  commit({
    type: POSTS_SUCCESS,
    posts: data,
    method: 'delete'
  });
}

// Request All Posts With UserId
export async function requestAllUserPosts({ commit }, payload) {
  const { userId } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [postsData, postsError] = await handle(
    api.get(`/posts?$sort[created_at]=-1&userId=${userId}`)
  );

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });

    throw postsError.response;
  }

  const { data } = postsData;

  for (let i = 0; i < data.data.length; i++) {
    data.data[i].created_at = formatDate(data.data[i].created_at);
    data.data[i].updated_at = formatDate(data.data[i].updated_at);
  }

  commit({
    type: POSTS_SUCCESS,
    posts: data
  });
}

// Request All Followed Tags Posts
export async function requestAllFollowedTagsPosts({ commit }, payload) {
  const { userId, token } = payload;

  commit({
    type: POSTS_REQUEST
  });

  const [postsData, postsError] = await handle(
    api.get(`/tags-users?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (postsError) {
    commit({
      type: POSTS_FAILURE,
      error: postsError.response
    });

    throw postsError.response;
  }

  const { data } = postsData;

  commit({
    type: POSTS_SUCCESS,
    posts: data
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

  for (let i = 0; i < comments.length; i++) {
    comments[i].created_at = formatDate(comments[i].created_at);
  }

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
  const {
    comments,
    username,
    userAvatar,
    userId,
    postId,
    commentText,
    post,
    token
  } = payload;

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
