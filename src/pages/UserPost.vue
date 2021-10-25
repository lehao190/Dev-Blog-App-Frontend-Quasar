<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="row q-gutter-md">
      <!-- Likes, Saved Posts -->
      <div class="col-1 gt-xs relative-position">
        <!-- Likes -->
        <div
          class="fixed text-center icon-buttons"
          style="top: 130px; margin-left: 25px;"
        >
          <q-btn
            @click="onLike"
            round
            size="22px"
            unelevated
            :color="1 === 1 ? 'accent' : 'red'"
            :text-color="!this.authUserLiked ? 'grey' : 'red'"
            icon="favorite"
          />
          <div class="absolute-bottom">{{ likes }}</div>
        </div>

        <!-- Saved Posts -->
        <div
          class="fixed text-center icon-buttons"
          style="top: 200px; margin-left: 25px;"
        >
          <q-btn
            round
            size="22px"
            unelevated
            :color="1 === 1 ? 'accent' : 'blue'"
            :text-color="1 === 1 ? 'secondary' : 'blue'"
            icon="bookmark"
          />
          <div class="absolute-bottom text-secondary">{{ saves }}</div>
        </div>
      </div>

      <!-- Markdown Post Content Section -->
      <div class="col bg-white rounded-borders">
        <!-- Cover Image -->
        <q-img
          style="height: 338px;"
          v-if="postImage"
          :src="postImage"
          alt="My image"
        />

        <!-- Post body -->
        <div class="q-py-lg q-px-xl">
          <div class="row items-center">
            <!-- Avatar -->
            <div>
              <router-link :to="'/users/' + this.userId">
                <q-avatar size="54px">
                  <img :src="userAvatar" />
                </q-avatar>
              </router-link>
            </div>

            <!-- User -->
            <div class="q-ml-sm">
              <div class="text-subtitle1 text-bold">
                <router-link :to="'/users/' + this.userId">
                  {{ username }}
                </router-link>
              </div>

              <div class="text-caption text-weight-thin">
                Đăng vào {{ createdAt }}
              </div>
            </div>
          </div>

          <!-- Title, Tags -->
          <div class="q-my-lg">
            <!-- Title -->
            <div class="text-h3 text-bold">
              {{ title }}
            </div>

            <!-- Tags -->
            <div class="q-mt-sm q-gutter-x-sm text-caption">
              <!-- <span>#react</span>
              <span>#javascript</span>
              <span>#html</span> -->

              <span v-for="tag in this.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

          <!-- Text Markdown Body -->
          <div class="markdown-body">
            <vue-markdown :source="body" />
          </div>
        </div>

        <q-separator class="q-mb-lg" />

        <!-- Comments Section -->
        <div class="q-mb-md q-mx-xl">
          <div class="text-h6 text-bold q-pb-md">
            Bình Luận
          </div>

          <!-- Users Comments -->
          <div class="row items-start q-mb-md">
            <!-- Avatar -->
            <div>
              <q-avatar size="lg">
                <img
                  :src="
                    getUser.user.user_avatar ||
                      'https://cdn.quasar.dev/img/avatar.png'
                  "
                />
              </q-avatar>
            </div>

            <!-- Authenticated User's Input -->
            <div class="q-ml-sm col">
              <q-input outlined autogrow color="secondary" />
              <div class="q-mt-sm">
                <q-btn
                  class="text-bold"
                  color="secondary"
                  label="Đăng"
                  no-caps
                  unelevated
                />
              </div>
            </div>
          </div>

          <!-- Users Comments -->
          <div class="row items-start">
            <!-- Avatar -->
            <div>
              <q-avatar size="lg">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </div>

            <!-- User's Input -->
            <div class="q-ml-sm col">
              <q-card class="my-card bg-white no-shadow" bordered>
                <q-card-section>
                  <div class="text-subtitle1 text-bold">Lê Minh Hào</div>
                  <div class="text-subtitle2">Đăng vào 19/11/2021</div>
                </q-card-section>

                <q-card-section>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima corrupti sequi inventore veritatis maxime minus labore
                  ducimus, ipsum rem. Sunt, voluptatem. Aliquam deleniti quasi
                  in praesentium. Modi molestias assumenda alias.
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- User's Info section -->
      <div class="col-3 gt-sm">
        <div
          id="user-section"
          class="bg-grey-1 rounded-borders fixed q-pa-md"
          style="top: 86px; margin-left: 0px; width: 320px;"
        >
          <q-avatar>
            <img :src="userAvatar" />
          </q-avatar>

          <span class="q-ml-sm text-body1 text-weight-bold">{{
            username
          }}</span>

          <div class="q-mt-sm text-body2 text-weight-medium">
            Tham gia vào
          </div>
          <div class="">
            <q-avatar
              rounded
              size="md"
              color="gray-1"
              text-color="dark"
              icon="fas fa-birthday-cake"
            />
            {{ userBirthday }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

import VueMarkdown from 'vue-markdown';

export default {
  mounted() {
    const hashURL = window.location.hash.split('/posts/');

    this.getPost({
      postId: hashURL[1]
    })
      .then(() => {
        const token = LocalStorage.getItem('accessToken');

        const { post } = this.getOnePost;

        this.postId = post.id;
        this.title = post.title;
        this.body = post.body;
        this.createdAt = post.created_at;
        this.postImage = post.post_image;
        this.tags = post.tags;
        this.userId = post.userId;
        this.username = post.user_profile.username;
        this.userBirthday = post.user_profile.created_at;
        this.userAvatar = post.user_profile.user_avatar;
        this.likes = post.count_likes;
        this.saves = 0;

        if (this.getUser.authenticated) {
          this.getAuthUserLikePost({
            post: this.getOnePost.post,
            userId: this.getUser.user.id,
            postId: this.postId,
            token
          })
            .then(() => {
              this.authUserLiked = this.getOnePost.post.authUserLiked;
            })
            .catch(e => {
              console.log('error from likedPost: ', e);
            });
        }
      })
      .catch(e => {
        console.log('error post: ', e);
      });
  },

  data() {
    return {
      postId: '',
      title: '',
      body: '',
      createdAt: '',
      postImage: '',
      tags: [],
      userId: '',
      username: '',
      userBirthday: '',
      userAvatar: '',
      likes: 0,
      authUserLiked: false,
      saves: 0,
      authUserSaved: false,

      imgURL:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--1iRZ0zp5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qguojwfs9v19sxwlvq50.png',
      imgURL2:
        'https://i.pinimg.com/originals/7f/d0/22/7fd022bd8d6c1a98cc539095b750ace7.jpg',
      imgURL3:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--xklWbgTW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lfralq4h4hu41p6uys3i.jpeg'
    };
  },

  computed: {
    ...mapGetters('posts', ['getOnePost']),
    ...mapGetters('user', ['getUser'])
  },

  components: {
    VueMarkdown
  },

  methods: {
    ...mapActions('posts', ['getPost', 'likePost', 'getAuthUserLikePost']),

    // Like Post
    onLike() {
      const token = LocalStorage.getItem('accessToken');

      if (this.getUser.authenticated) {
        this.likePost({
          token,
          postId: this.postId,
          userId: this.getUser.user.id,
          likes: this.likes,
          post: this.getOnePost.post
        })
          .then(() => {
            // this.likes += 1;
            // this.authUserLiked = true;

            this.likes = this.getOnePost.post.count_likes;
            this.authUserLiked = this.getOnePost.post.authUserLiked;
          })
          .catch(e => {
            console.log('Error: ', e);

            this.$q.notify({
              type: 'negative',
              message: 'ERROR MATE!!!'
            });
          });
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1284px) {
  #user-section {
    width: 25% !important;
  }
}

@media only screen and (max-width: 914px) {
  .icon-buttons {
    margin-left: 0px !important;
  }
}
</style>
