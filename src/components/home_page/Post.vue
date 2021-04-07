<template>
  <q-card class="my-card q-mb-md" flat bordered>
    <q-img :src="imgURL3" alt="My image" />

    <q-card-section>
      <div class="relative-position q-gutter-sm">
        <!-- User's Avatar -->
        <router-link to="user"
          ><q-avatar size="lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" /> </q-avatar
        ></router-link>

        <!-- User's Post creation date -->
        <span class="absolute text-caption">
          <div>
            <router-link class="text-grey-8" to="about"
              >Lê Minh Hào</router-link
            >
          </div>
          <div>
            <router-link class="text-grey-8" to="date">16/4/2020</router-link>
          </div>
        </span>
      </div>

      <!-- User's Post Title -->
      <div class="q-pl-xl">
        <router-link to="post"
          ><div class="text-h5 q-mt-sm q-mb-xs user-post-text">
            Top 16 Browser Extensions For Increased Developer Productivity
          </div></router-link
        >
        <div class="text-caption text-grey q-gutter-sm">
          <router-link to="javascript"
            ><span class="user-post-text">#javascript</span></router-link
          >
          <router-link to="Node"
            ><span class="user-post-text">#Nodejs</span></router-link
          >
          <router-link to="javascript"
            ><span class="user-post-text">#javascript</span></router-link
          >
          <router-link to="Node"
            ><span class="user-post-text">#Nodejs</span></router-link
          >
        </div>
      </div>
    </q-card-section>

    <!-- Actions -->
    <div class="q-pl-xl">
      <q-card-actions>
        <q-btn
          label="458 likes"
          color="primary"
          text-color="negative"
          icon="fas fa-heart"
          size="12px"
          no-caps
          unelevated
        />

        <q-btn
          label="458 likes"
          color="primary"
          text-color="secondary"
          icon="fas fa-comment"
          size="12px"
          no-caps
          unelevated
        />

        <q-space />

        <q-btn
          label="Save"
          color="grey-4"
          text-color="dark"
          size="12px"
          no-caps
          unelevated
        />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      imgURL:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--1iRZ0zp5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qguojwfs9v19sxwlvq50.png',
      imgURL2:
        'https://i.pinimg.com/originals/7f/d0/22/7fd022bd8d6c1a98cc539095b750ace7.jpg',
      imgURL3:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--xklWbgTW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lfralq4h4hu41p6uys3i.jpeg'
    }
  }
}
</script>
