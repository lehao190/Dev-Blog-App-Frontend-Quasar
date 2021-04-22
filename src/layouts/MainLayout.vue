<template>
  <q-layout view="hhh Lpr fFf" class="bg-accent">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="main-wrapper text-black">
        <q-toolbar-title class="q-py-sm q-gutter-md">
          <!-- Display on lesser than medium size only -->
          <q-btn
            class="lt-md"
            dense
            flat
            round
            icon="menu"
            @click="left = !left"
          />

          <router-link to="/">
            <q-avatar
              class="bg-black text-white"
              icon="fab fa-blogger"
              size="46px"
              square
            />
          </router-link>
          <!-- Searching for posts -->
          <q-input
            class="absolute gt-sm"
            style="width: 400px; display: inline-block; top: -5px;"
            filled
            dense
            placeholder="Tìm kiếm..."
          />
        </q-toolbar-title>

        <!-- Login/Signup -->
        <div class="q-gutter-md">
          <q-btn
            v-if="true"
            class="text-weight-bold"
            color="secondary"
            type="a"
            :label="this.getUser.email"
            text-color="primary"
            no-caps
          />

          <!-- Display on greater than medium size only -->
          <q-btn
            class="text-weight-bold gt-sm"
            flat
            type="a"
            :to="{ name: 'login' }"
            label="Đăng Nhập"
            text-color="blue-8"
            no-caps
          />

          <!-- Display on lesser than medium size only -->
          <q-btn
            class="text-weight-bold lt-md"
            flat
            type="a"
            to="/search"
            icon="fas fa-search"
            text-color="dark"
            no-caps
          />

          <q-btn
            class="text-weight-bold"
            color="secondary"
            type="a"
            :to="{ name: 'register' }"
            label="Tạo Tài Khoản"
            text-color="primary"
            no-caps
          />

          <!-- Create Post -->
          <q-btn
            v-if="false"
            class="text-weight-bold"
            color="secondary"
            type="a"
            label="Tạo Bài Viết"
            text-color="primary"
            no-caps
          />

          <!-- User's Settings -->
          <q-btn-dropdown
            v-if="false"
            color="primary"
            size="xl"
            no-icon-animation
            unelevated
            dropdown-icon="img:https://res.cloudinary.com/practicaldev/image/fetch/s--IEXABiQR--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/601437/d70135df-3eab-4642-9ea6-b5ee2a489d6c.png"
            style="border-radius: 50%; width: 40px; height: 40px;  overflow: hidden;"
            padding="0px"
          >
            <q-list style="width: 260px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- left sidebar when in mobile mode -->
    <!-- IGNORE v-model="left" -->
    <q-drawer v-model="left" side="left">
      <!-- drawer content -->
      <IntroSec />
      <UserNav />
    </q-drawer>

    <!-- Main content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import IntroSec from '../components/home_page/IntroSec'
import UserNav from '../components/home_page/UserNav'

export default {
  name: 'MainLayout',
  components: {
    IntroSec,
    UserNav
  },
  data () {
    return {
      left: false
    }
  },
  computed: {
    ...mapGetters('user', ['getUser', 'getUserError'])
  }
}
</script>
