<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <q-input
      @keyup.enter="searchingPosts"
      v-model="search"
      class="lt-md q-mb-md q-mr-sm"
      filled
      dense
      placeholder="Tìm kiếm..."
    />

    <div class="row q-col-gutter-md">
      <!-- Left sidebar -->
      <aside class="col-3 gt-sm"></aside>

      <!-- Users's Posts -->
      <div class="col q-gutter-sm">
        <!-- Post Section -->
        <section>
          <Post
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :isFollowedTags="isFollowedTags"
          />
        </section>
      </div>

      <!-- Right sidebar -->
      <aside class="col-3 gt-md"></aside>
    </div>
  </q-page>
</template>

<script>
import Post from '../components/home_page/Post';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Post
  },

  data() {
    return {
      posts: [],
      isFollowedTags: 'latest',
      search: ''
    };
  },

  computed: {
    ...mapGetters('posts', ['getPosts'])
  },

  mounted() {
    if (this.$route.query.title) {
      this.$q.loading.show();

      this.searchPosts({
        title: this.$route.query.title
      })
        .then(() => {
          this.isFollowedTags = 'latest';
          this.posts = this.getPosts.posts;

          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        });
    }
  },

  watch: {
    $route() {
      // react to route changes...
      if (this.$route.query.title) {
        this.$q.loading.show();

        this.searchPosts({
          title: this.$route.query.title
        })
          .then(() => {
            this.isFollowedTags = 'latest';
            this.posts = this.getPosts.posts;

            this.$q.loading.hide();
          })
          .catch(e => {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              message: 'Đã xảy ra lỗi khi tải nội dung!!!'
            });
          });
      }
    }
  },

  methods: {
    ...mapActions('posts', ['requestAllPosts', 'searchPosts']),

    searchingPosts() {
      this.$q.loading.show();

      this.searchPosts({
        title: this.search
      })
        .then(() => {
          this.isFollowedTags = 'latest';
          this.posts = this.getPosts.posts;

          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        });
    }
  }
};
</script>

<style></style>
