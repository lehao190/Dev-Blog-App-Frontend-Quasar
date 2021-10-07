export default function() {
  return {
    loading: true,
    error: {},
    posts: [
      {
        id: '',
        title: '',
        post_image: '',
        count_likes: 0,
        count_comments: 0,
        tags: [],
        saved: false,
        created_at: '',
        user: {
          username: '',
          user_avatar: ''
        }
      }
    ],
    post: {
      id: '',
      title: '',
      post_image: '',
      count_likes: 0,
      count_comments: 0,
      tags: [],
      saved: false,
      liked: false,
      created_at: '',
      user: {
        username: '',
        user_avatar: ''
      },
      comments: [
        {
          username: '',
          created_at: '',
          comment_text: ''
        }
      ]
    }
  };
}
