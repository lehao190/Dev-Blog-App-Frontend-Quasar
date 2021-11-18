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
        <!-- <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Bài viết đã lưu</div>
          </q-card-section>

          <PinnedPost />

          <PinnedPost />
        </q-card> -->
      </aside>
    </div>
  </q-page>
</template>

<script>
import IntroSec from '../components/home_page/IntroSec';
import UserNav from '../components/home_page/UserNav';
import UserNavTag from '../components/home_page/UserNavTag';
// import PinnedPost from '../components/home_page/PinnedPost';
import Post from '../components/home_page/Post';

import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  name: 'PageIndex',

  components: {
    IntroSec,
    UserNav,
    UserNavTag,
    // PinnedPost,
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
    this.$q.loading.show()

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

          this.$q.loading.hide()
        })
        .catch(e => {
          if (e.data.data.name === 'TokenExpiredError') {
            this.refresh()
              .then(() => {
                this.$q.loading.hide()

                this.$q.notify({
                  type: 'warning',
                  textColor: 'white',
                  message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                });
              })
              .catch(() => {
                this.$q.loading.hide()

                this.$q.notify({
                  type: 'negative',
                  message: 'Bạn đã hết thời hạn đăng nhập!!!'
                });

                this.$router.push('/login');
              });
          } else {
            this.$q.loading.hide()

            this.$q.notify({
              type: 'negative',
              message: 'Đã xảy ra lỗi khi tải nội dung!!!'
            });
          }
        });
    } else {
      // Get all latest posts
      this.requestAllPosts()
        .then(() => {
          this.isFollowedTags = 'latest';
          this.posts = this.getPosts.posts;

          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        });
    }
  },

  methods: {
    ...mapActions('posts', ['requestAllPosts', 'requestAllFollowedTagsPosts']),
    ...mapActions('user', ['refresh']),

    changePostData() {
      this.$q.loading.show()

      if (this.getUser.authenticated && this.isFollowedTags === 'follwedTags') {
        const token = LocalStorage.getItem('accessToken');

        // Get all user follwed tags posts
        this.requestAllFollowedTagsPosts({
          token,
          userId: this.getUser.user.id
        })
          .then(() => {
            this.isFollowedTags = 'follwedTags';
            this.posts = this.getPosts.posts;

            this.$q.loading.hide()
          })
          .catch(e => {
            if (e.data.data.name === 'TokenExpiredError') {
              this.refresh()
                .then(() => {
                  this.$q.loading.hide()

                  this.$q.notify({
                    type: 'warning',
                    textColor: 'white',
                    message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                  });
                })
                .catch(() => {
                  this.$q.loading.hide()

                  this.$q.notify({
                    type: 'negative',
                    message: 'Bạn đã hết thời hạn đăng nhập!!!'
                  });

                  this.$router.push('/login');
                });
            } else {
              this.$q.loading.hide()

              this.$q.notify({
                type: 'negative',
                message: 'Đã xảy ra lỗi khi tải nội dung!!!'
              });
            }
          });
      } else {
        // Get all latest posts
        this.requestAllPosts()
          .then(() => {
            this.isFollowedTags = 'latest';
            this.posts = this.getPosts.posts;

            this.$q.loading.hide()
          })
          .catch(() => {
            this.$q.loading.hide()
            
            this.$q.notify({
              type: 'negative',
              message: 'Đã xảy ra lỗi khi tải nội dung!!!'
            });
          });
      }
    }
  }
};
</script>
