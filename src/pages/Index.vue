<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="row q-col-gutter-md">
      <!-- Left sidebar -->
      <aside class="col-3 gt-sm">
        <!-- Intro Section -->
        <IntroSec />

        <!-- User's Navigation Bar -->
        <UserNav />

        <!-- User's Navigation Tags -->
        <UserNavTag />
      </aside>

      <!-- Users's Posts -->
      <div class="col q-gutter-sm">
        <!-- <div class="text-weight-bold text-h6">Posts</div> -->

        <div v-if="getUser.authenticated">
          <q-btn-toggle
            v-model="isFollowedTags"
            @click="changePostData"
            color="grey-2"
            unelevated
            text-color="black"
            toggle-color="secondary"
            :options="[
              { label: 'Mới nhất', value: 'latest' },
              { label: 'Theo thẻ', value: 'follwedTags' }
            ]"
          />
        </div>

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
      <aside class="col-3 gt-md">
        <!-- User's Pinned Posts -->
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Bài viết đã lưu</div>
          </q-card-section>

          <PinnedPost />

          <PinnedPost />
        </q-card>
      </aside>
    </div>
  </q-page>
</template>

<script>
import IntroSec from '../components/home_page/IntroSec';
import UserNav from '../components/home_page/UserNav';
import UserNavTag from '../components/home_page/UserNavTag';
import PinnedPost from '../components/home_page/PinnedPost';
import Post from '../components/home_page/Post';

import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  name: 'PageIndex',

  components: {
    IntroSec,
    UserNav,
    UserNavTag,
    PinnedPost,
    Post
  },

  data() {
    return {
      posts: [],
      isFollowedTags: 'latest'
    };
  },
  computed: {
    ...mapGetters('posts', ['getPosts']),
    ...mapGetters('user', ['getUser'])
  },

  mounted() {
    if (this.getUser.authenticated) {
      const token = LocalStorage.getItem('accessToken');

      // Get all user follwed tags posts
      this.requestAllFollowedTagsPosts({
        token,
        userId: this.getUser.user.id
      })
        .then(() => {
          this.isFollowedTags = 'follwedTags';
          this.posts = this.getPosts.posts;
        })
        .catch(e => {
          console.log('error posts: ', e);
        });
    } else {
      // Get all latest posts
      this.requestAllPosts()
        .then(() => {
          this.isFollowedTags = 'latest';
          this.posts = this.getPosts.posts;
        })
        .catch(e => {
          console.log('error posts: ', e);
        });
    }
  },

  methods: {
    ...mapActions('posts', ['requestAllPosts', 'requestAllFollowedTagsPosts']),

    changePostData() {
      if (this.getUser.authenticated && this.isFollowedTags === "follwedTags") {
        const token = LocalStorage.getItem('accessToken');

        // Get all user follwed tags posts
        this.requestAllFollowedTagsPosts({
          token,
          userId: this.getUser.user.id
        })
          .then(() => {
            this.isFollowedTags = 'follwedTags';
            this.posts = this.getPosts.posts;
          })
          .catch(e => {
            console.log('error posts: ', e);
          });
      } else {
        // Get all latest posts
        this.requestAllPosts()
          .then(() => {
            this.isFollowedTags = 'latest';
            this.posts = this.getPosts.posts;
          })
          .catch(e => {
            console.log('error posts: ', e);
          });
      }
    }
  }
};
</script>
