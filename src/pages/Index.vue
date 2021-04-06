<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="row q-col-gutter-md">
      <!-- Left sidebar -->
      <aside class="col-3">
        <!-- Intro Section -->
        <IntroSec />

        <!-- User's Navigation Bar -->
        <UserNav />

        <!-- User's Navigation Tags -->
        <UserNavTags />
      </aside>

      <!-- Users's Posts -->
      <div class="col q-gutter-sm">
        <div class="text-weight-bold text-h6">Posts</div>

        <!-- Post Section -->
        <section>
          <q-card class="my-card" flat bordered>
            <q-img :src="imgURL" :img-class="{ 'post-image': true }" />

            <q-card-section>
              <div class="relative-position q-gutter-sm">
                <!-- User's Avatar -->
                <router-link to="user"
                  ><q-avatar size="lg">
                    <img
                      src="https://cdn.quasar.dev/img/avatar.png"
                    /> </q-avatar
                ></router-link>

                <!-- User's Post creation date -->
                <span class="absolute text-caption">
                  <div>
                    <router-link class="text-grey-8" to="about"
                      >Lê Minh Hào</router-link
                    >
                  </div>
                  <div>
                    <router-link class="text-grey-8" to="date"
                      >16/4/2020</router-link
                    >
                  </div>
                </span>
              </div>

              <!-- User's Post Title -->
              <div class="q-pl-xl">
                <router-link to="post"
                  ><div class="text-h5 q-mt-sm q-mb-xs user-post-text">
                    Top 16 Browser Extensions For Increased Developer
                    Productivity
                  </div></router-link
                >
                <div class="text-caption text-grey q-gutter-sm">
                  <router-link to="javascript"><span class="user-post-text">#javascript</span></router-link>
                  <router-link to="Node"><span class="user-post-text">#Nodejs</span></router-link>
                  <router-link to="javascript"><span class="user-post-text">#javascript</span></router-link>
                  <router-link to="Node"><span class="user-post-text">#Nodejs</span></router-link>
                </div>
              </div>
            </q-card-section>

            <!-- Actions -->
            <div class="q-pl-xl">
              <q-card-actions>
                <q-btn flat color="dark" label="Share" />
                <q-btn flat color="secondary" label="Book" />

                <q-space />

                <q-btn color="black" round flat dense label="aha" />
              </q-card-actions>
            </div>
          </q-card>
        </section>
      </div>

      <!-- Right sidebar -->
      <aside class="col-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus quam
        dolor officia fuga laudantium omnis ut atque magnam beatae? Ducimus
        reiciendis quas voluptate eveniet aliquam, laboriosam dolores dolore
        praesentium blanditiis!
      </aside>
    </div>
  </q-page>
</template>

<script>
import IntroSec from '../components/home_page/IntroSec'
import UserNav from '../components/home_page/UserNav'
import UserNavTags from '../components/home_page/UserNavTags'

export default {
  name: 'PageIndex',
  components: {
    IntroSec,
    UserNav,
    UserNavTags
  },
  data () {
    return {
      imgURL:
        'https://res.cloudinary.com/practicaldev/image/fetch/s--1iRZ0zp5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qguojwfs9v19sxwlvq50.png'
    }
  }
}
</script>
