<template>
  <q-page class="user-profile-wrapper q-px-sm q-py-xl">
    <!-- User's Profile -->
    <div class="bg-white q-mt-xl q-pb-lg rounded-borders relative-position">
      <!-- User's image when greater than small device -->
      <q-avatar style="top: 0px" class="gt-sm absolute-center" size="130px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>

      <!-- User's image when greater than small device -->
      <q-avatar
        style="top: -50px; left: 20px;"
        class="lt-md absolute-top-left"
        size="90px"
      >
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>

      <!-- Edit User's Profile -->
      <div class="q-pt-lg q-px-lg q-pb-lg text-right">
        <q-btn class="text-bold" color="secondary" no-caps label="Sửa Hồ Sơ" />
      </div>

      <!-- User's Info -->
      <div class="q-pt-xl text-center q-gutter-md">
        <div class="text-h4">Lê Minh Hào</div>

        <div>
          <q-avatar
            rounded
            size="md"
            color="white"
            text-color="dark"
            icon="fas fa-user"
          />
          lehao190
        </div>

        <div>
          <q-avatar
            rounded
            size="md"
            color="white"
            text-color="dark"
            icon="fas fa-birthday-cake"
          />
          Tham gia vào Mar 22, 2021
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
            0 bài viết
          </div>

          <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-tags"
            />
            theo 0 thẻ
          </div>
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
            0 bài viết
          </div>

          <div>
            <q-avatar
              rounded
              size="md"
              color="grey-1"
              text-color="dark"
              icon="fas fa-tags"
            />
            theo 0 thẻ
          </div>
        </div>
      </div>

      <!-- Posts -->
      <div class="col">
        <!-- <Post />
        <Post />
        <Post /> -->
      </div>
    </div>
  </q-page>
</template>

<script>
// import Post from '../components/home_page/Post.vue';

export default {
  data() {
    return {
      showMore: true
    };
  },
  components: {
    // Post
  }
};
</script>
