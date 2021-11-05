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
          <!-- <q-btn
            v-if="true"
            class="text-weight-bold"
            color="secondary"
            type="a"
            :label="this.getUser.user.email"
            text-color="primary"
            no-caps
          /> -->

          <!-- Display on greater than medium size only -->
          <q-btn
            v-if="this.authenticated === false"
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
            v-if="this.authenticated === false"
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
            v-if="this.authenticated"
            class="text-weight-bold"
            color="secondary"
            text-color="primary"
            no-caps
          > 
            <router-link class="full-width text-white" to="/create_post">Tạo bài viết</router-link>
          </q-btn>

          <!-- User's Settings -->
          <q-btn-dropdown
            v-if="this.authenticated"
            color="primary"
            size="xl"
            no-icon-animation
            unelevated
            :dropdown-icon="'img:' + this.getUser.user.user_avatar"
            style="border-radius: 50%; width: 40px; height: 40px;  overflow: hidden;"
            padding="0px"
          >
            <q-list style="width: 260px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ getUser.user.username }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label><router-link class="full-width" to="/dashboard">Dashboard</router-link></q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Danh sách bài viết</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Cài đặt</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-separator />
              
              <!-- Logout -->
              <q-item clickable v-close-popup>
                <q-item-section @click="onLogout">
                  <q-item-label>Đăng xuất</q-item-label>
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
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters('user', ['getUser', 'getUserError']),
    authenticated: function () {
      return this.getUser.authenticated
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    
    onLogout () {
      this.logout()
    }
  }
}
</script>
