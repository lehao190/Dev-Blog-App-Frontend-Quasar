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
            round
            size="22px"
            unelevated
            :color="1 === 1 ? 'accent' : 'blue'"
            :text-color="1 === 1 ? 'grey' : 'blue'"
            icon="favorite"
          />
          <div class="absolute-bottom">39</div>
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
          <div class="absolute-bottom text-secondary">4</div>
        </div>
      </div>

      <!-- Markdown Post Content Section -->
      <div class="col bg-white rounded-borders">
        <!-- Cover Image -->
        <q-img style="height: 338px;" :src="imgURL" alt="My image" />

        <!-- Post body -->
        <div class="q-py-lg q-px-xl">
          <div class="row items-center">
            <!-- Avatar -->
            <div>
              <q-avatar size="54px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </div>

            <!-- User -->
            <div class="q-ml-sm">
              <div class="text-subtitle1 text-bold">Lê Minh Hào</div>
              <div class="text-caption text-weight-thin">
                Đăng vào 10/9/2021
              </div>
            </div>
          </div>

          <!-- Title, Tags -->
          <div class="q-my-lg">
            <!-- Title -->
            <div class="text-h3 text-bold">
              Passing Data with React Router using Link
            </div>

            <!-- Tags -->
            <div class="q-mt-sm q-gutter-x-sm text-caption">
              <span>#react</span>
              <span>#javascript</span>
              <span>#html</span>
            </div>
          </div>

          <!-- Text Markdown Body -->
          <div>
            If you've used React Router on many projects, definitely you've
            asked How i can pass some data or state to other components through
            a link tag?. So 1st of all we'll discuss how we can pass data
            between components in React.
            
            <vue-markdown :source="text" />
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
                <img src="https://cdn.quasar.dev/img/avatar.png" />
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
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <span class="q-ml-sm text-body1 text-weight-bold">Lê Minh Hào</span>

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
            3/9/2021
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  // mounted() {
  //   this.$store
  //     .dispatch({
  //       type: 'posts/requestAllPosts'
  //     })
  //     .then(() => {
  //       const posts = this.$store.getters['posts/getPosts'];
  //       console.log('this is your POSTS: ', posts.posts);

  //       this.text = posts.posts.data[1].body
  //       console.log('text: ', this.text)
  //     });
  // },
  data() {
    return {
      text: '',
      imgURL:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--1iRZ0zp5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qguojwfs9v19sxwlvq50.png',
      imgURL2:
        'https://i.pinimg.com/originals/7f/d0/22/7fd022bd8d6c1a98cc539095b750ace7.jpg',
      imgURL3:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--xklWbgTW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lfralq4h4hu41p6uys3i.jpeg'
    };
  },
  components: {
    VueMarkdown
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
