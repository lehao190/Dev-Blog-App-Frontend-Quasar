<template>
  <q-card class="my-card q-mb-md" flat bordered>
    <q-img v-if="postImage" :src="postImage" height="260px" alt="My image" />

    <q-card-section>
      <div class="relative-position q-gutter-sm">
        <!-- User's Avatar -->
        <router-link :to="'/users/' + userId">
          <q-avatar size="lg">
            <img v-if="userAvatar" :src="userAvatar" />
          </q-avatar>
        </router-link>

        <!-- User's Post creation date -->
        <span class="absolute text-caption">
          <div>
            <router-link class="text-grey-8" :to="'/users/' + userId">{{
              username
            }}</router-link>
          </div>
          <div>
            <router-link class="text-grey-8" :to="'/posts/' + postId">{{
              createdAt
            }}</router-link>
          </div>
        </span>
      </div>

      <!-- User's Post Title -->
      <div class="q-pl-xl">
        <router-link :to="'/posts/' + postId"
          ><div class="text-h5 q-mt-sm q-mb-xs user-post-text">
            {{ title }}
          </div></router-link
        >
        <div class="text-caption text-grey q-gutter-sm">
          <span v-for="tag in tags" :key="tag">
            <router-link to="/tags">
              <span class="user-post-text">{{ tag }}</span>
            </router-link>
          </span>
        </div>
      </div>
    </q-card-section>

    <!-- Actions -->
    <div class="q-pl-xl">
      <q-card-actions>
        <q-btn
          :label="likes + ' Thích'"
          color="primary"
          text-color="negative"
          icon="fas fa-heart"
          size="12px"
          no-caps
          unelevated
        />

        <q-btn
          :label="comments + ' Bình luận'"
          color="primary"
          text-color="secondary"
          icon="fas fa-comment"
          size="12px"
          no-caps
          unelevated
        />

        <q-space />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ['post', 'isFollowedTags'],

  data() {
    return {
      userId: '',
      postId: '',
      title: '',
      postImage: '',
      userAvatar: '',
      username: '',
      createdAt: '',
      tags: [],
      likes: 0,
      comments: 0
    };
  },

  mounted() {
    if (this.isFollowedTags === 'latest') {
      this.userId = this.post.userId;
      this.postId = this.post.id;
      this.title = this.post.title;
      this.postImage = this.post.post_image;
      this.userAvatar = this.post.user_profile.user_avatar;
      this.username = this.post.user_profile.username;
      this.createdAt = this.post.created_at;
      this.tags = this.post.tags;
      this.likes = this.post.count_likes;
      this.comments = 0;
    } else {
      this.userId = this.post.userId;
      this.postId = this.post.id;
      this.title = this.post.title;
      this.postImage = this.post.post_image;
      this.userAvatar = this.post.user_avatar;
      this.username = this.post.username;
      this.createdAt = this.post.created_at;
      this.tags = this.post.tags;
      this.likes = this.post.count_likes;
      this.comments = 0;
    }
  }
};
</script>
