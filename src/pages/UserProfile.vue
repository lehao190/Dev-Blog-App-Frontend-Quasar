<template>
  <q-page class="user-profile-wrapper q-px-sm q-py-xl">
    <!-- User's Profile -->
    <div class="bg-white q-mt-xl q-pb-lg rounded-borders relative-position">
      <!-- User's image when greater than small device -->
      <q-avatar style="top: 0px" class="gt-sm absolute-center" size="130px">
        <img :src="postUser.user_avatar" />
      </q-avatar>

      <!-- User's image when greater than small device -->
      <q-avatar
        style="top: -50px; left: 20px;"
        class="lt-md absolute-top-left"
        size="90px"
      >
        <img :src="postUser.user_avatar" />
      </q-avatar>

      <!-- Edit User's Profile -->
      <div class="q-pt-lg q-px-lg q-pb-lg text-right">
        <q-btn v-if="getUser.authenticated && getUser.user.id === postUser.id" class="text-bold" color="secondary" no-caps>
          <router-link class="full-width text-white" :to="'/users/edit/' + postUser.id">Sửa Hồ Sơ</router-link>
        </q-btn>
      </div>

      <!-- User's Info -->
      <div class="q-pt-xl text-center q-gutter-md">
        <div class="text-h4">{{ postUser.username }}</div>

        <!-- <div>
          <q-avatar
            rounded
            size="md"
            color="white"
            text-color="dark"
            icon="fas fa-user"
          />
          lehao190
        </div> -->

        <div>
          <q-avatar
            rounded
            size="md"
            color="white"
            text-color="dark"
            icon="fas fa-birthday-cake"
          />
          Tham gia vào {{ postUser.created_at }}
        </div>
      </div>
    </div>

    <!-- User's Post Record -->
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-12 lt-md">
        <div class="bg-grey-1 q-pa-md">
          <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-scroll"
            />
            {{ posts.length }} bài viết
          </div>

          <!-- <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-tags"
            />
            theo 0 thẻ
          </div> -->
        </div>
      </div>

      <!-- Display when greater than small size -->
      <div class="col-3 gt-sm">
        <div class="bg-grey-1 q-pa-md">
          <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-scroll"
            />
            {{ posts.length }} bài viết
          </div>

          <!-- <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-tags"
            />
            theo 0 thẻ
          </div> -->
        </div>
      </div>

      <!-- Posts -->
      <div class="col">
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import Post from '../components/home_page/Post.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      showMore: true,
      posts: [],
      postUser: {}
    };
  },

  components: {
    Post
  },

  mounted() {
    const hashURL = window.location.hash.split('/users/');

    this.requestAllUserPosts({
      userId: hashURL[1]
    })
      .then(() => {
        this.posts = this.getPosts.posts;
      })
      .catch(e => {
        console.log('error get user posts: ', e);
      });

    this.requestUser({
      userId: hashURL[1]
    })
      .then(() => {
        this.postUser = this.getPostUser.postUser
      })
      .catch(e => {
        console.log('error get user posts: ', e);
      });
  },

  computed: {
    ...mapGetters('posts', ['getPosts']),
    ...mapGetters('user', ['getPostUser', 'getUser'])
  },

  methods: {
    ...mapActions('posts', ['requestAllUserPosts']),
    ...mapActions('user', ['requestUser'])
  }
};
</script>
