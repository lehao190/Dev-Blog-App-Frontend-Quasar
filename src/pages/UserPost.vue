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
                  <img
                    :src="
                      userAvatar
                        ? userAvatar
                        : 'https://cdn.quasar.dev/img/boy-avatar.png'
                    "
                  />
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
                      'https://cdn.quasar.dev/img/boy-avatar.png'
                  "
                />
              </q-avatar>
            </div>

            <!-- Authenticated User's Input -->
            <div class="q-ml-sm col">
              <q-input
                v-model="commentText"
                outlined
                autogrow
                color="secondary"
              />

              <div class="q-mt-sm">
                <q-btn
                  @click="onComment"
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
          <div
            class="row items-start q-py-sm"
            v-for="comment in this.comments"
            :key="comment.id"
          >
            <!-- Avatar -->
            <div>
              <q-avatar size="lg">
                <img :src="comment.user_avatar" />
              </q-avatar>
            </div>

            <!-- User's Input -->
            <div class="q-ml-sm col">
              <q-card class="my-card bg-white no-shadow" bordered>
                <q-card-section>
                  <div class="text-subtitle1 text-bold">
                    {{ comment.username }}
                  </div>
                  <div class="text-subtitle2">
                    Đăng vào {{ comment.created_at }}
                  </div>
                </q-card-section>

                <q-card-section>
                  {{ comment.comment_text }}
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
            <img
              :src="
                userAvatar
                  ? userAvatar
                  : 'https://cdn.quasar.dev/img/boy-avatar.png'
              "
            />
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
    this.$q.loading.show();

    const hashURL = window.location.hash.split('/posts/');

    // Get post info
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

        // Get ALL Comments
        this.getAllComments({
          postId: this.postId,
          post: this.getOnePost.post
        })
          .then(() => {
            this.comments = this.getOnePost.post.comments;
          })
          .catch(() => {
            this.$q.notify({
              type: 'negative',
              message: 'Đã xảy ra lỗi khi tải nội dung!!!'
            });
          });

        // Check liked post for auth user
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
              if (e.data.data.name === 'TokenExpiredError') {
                this.refresh()
                  .then(() => {
                    this.$q.notify({
                      type: 'warning',
                      textColor: 'white',
                      message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                    });
                  })
                  .catch(() => {
                    this.$q.notify({
                      type: 'negative',
                      message: 'Bạn đã hết thời hạn đăng nhập!!!'
                    });

                    this.$router.push('/login');
                  });
              } else {
                this.$q.notify({
                  type: 'negative',
                  message: 'Đã xảy ra lỗi khi tải nội dung!!!'
                });
              }
            });
        }

        this.$q.loading.hide();
      })
      .catch(() => {
        this.$q.loading.hide();

        this.$q.notify({
          type: 'negative',
          message: 'Đã xảy ra lỗi khi tải nội dung!!!'
        });
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
      commentText: '',
      comments: []
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
    ...mapActions('posts', [
      'getPost',
      'likePost',
      'getAuthUserLikePost',
      'createComment',
      'getAllComments'
    ]),
    ...mapActions('user', ['refresh']),

    // Like Post
    onLike() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      if (this.getUser.authenticated) {
        this.likePost({
          token,
          authUserLiked: this.authUserLiked,
          postId: this.postId,
          userId: this.getUser.user.id,
          likes: this.likes,
          post: this.getOnePost.post
        })
          .then(() => {
            this.likes = this.getOnePost.post.count_likes;
            this.authUserLiked = this.getOnePost.post.authUserLiked;

            this.$q.loading.hide();
          })
          .catch(e => {
            if (e.data.data.name === 'TokenExpiredError') {
              this.refresh()
                .then(() => {
                  this.$q.loading.hide();

                  this.$q.notify({
                    type: 'warning',
                    textColor: 'white',
                    message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                  });
                })
                .catch(() => {
                  this.$q.loading.hide();

                  this.$q.notify({
                    type: 'negative',
                    message: 'Bạn đã hết thời hạn đăng nhập!!!'
                  });

                  this.$router.push('/login');
                });
            } else {
              this.$q.loading.hide();

              this.$q.notify({
                type: 'negative',
                message: 'Đã xảy ra lỗi khi tải nội dung!!!'
              });
            }
          });
      } else {
        this.$q.loading.hide();

        this.$router.push('/login');
      }
    },

    // Create Comment
    onComment() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      if (this.getUser.authenticated) {
        this.createComment({
          post: this.getOnePost.post,
          comments: this.comments,
          username: this.getUser.user.username,
          userAvatar: this.getUser.user.user_avatar,
          postId: this.postId,
          userId: this.getUser.user.id,
          commentText: this.commentText,
          token
        })
          .then(() => {
            this.commentText = '';
            this.comments = this.getOnePost.post.comments;

            this.$q.loading.hide();
          })
          .catch(e => {
            if (!e.data.name === 'BadRequest' && e.data.data.name === 'TokenExpiredError') {
              this.refresh()
                .then(() => {
                  this.$q.loading.hide();

                  this.$q.notify({
                    type: 'warning',
                    textColor: 'white',
                    message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                  });
                })
                .catch(() => {
                  this.$q.loading.hide();

                  this.$q.notify({
                    type: 'negative',
                    message: 'Bạn đã hết thời hạn đăng nhập!!!'
                  });

                  this.$router.push('/login');
                });
            } else {
              this.$q.loading.hide();

              this.$q.notify({
                type: 'negative',
                message: 'Đã xảy ra lỗi khi đăng bình luận!!!'
              });
            }
          });
      } else {
        this.$q.loading.hide();

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
