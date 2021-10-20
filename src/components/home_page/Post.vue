<template>
  <q-card class="my-card q-mb-md" flat bordered>
    <q-img
      v-if="post.post_image"
      :src="post.post_image"
      height="260px"
      alt="My image"
    />

    <q-card-section>
      <div class="relative-position q-gutter-sm">
        <!-- User's Avatar -->
        <router-link to="user">
          <q-avatar size="lg">
            <img :src="post.user_profile.user_avatar" />
          </q-avatar>
        </router-link>

        <!-- User's Post creation date -->
        <span class="absolute text-caption">
          <div>
            <router-link class="text-grey-8" to="about">{{
              post.user_profile.username
            }}</router-link>
          </div>
          <div>
            <router-link class="text-grey-8" to="date">{{
              post.created_at
            }}</router-link>
          </div>
        </span>
      </div>

      <!-- User's Post Title -->
      <div class="q-pl-xl">
        <router-link to="posts/a"
          ><div class="text-h5 q-mt-sm q-mb-xs user-post-text">
            {{ post.title }}
          </div></router-link
        >
        <div class="text-caption text-grey q-gutter-sm">
          <span v-for="tag in post.tags" :key="tag">
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
          :label="post.count_likes + ' Thích'"
          color="primary"
          text-color="negative"
          icon="fas fa-heart"
          size="12px"
          no-caps
          unelevated
        />

        <q-btn
          :label="post.comments.length + ' Bình luận'"
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
  props: ['post']
};
</script>
