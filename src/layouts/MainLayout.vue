<template>
  <q-layout view="hhh Lpr fFf" class="bg-accent">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="main-wrapper text-black">
        <q-toolbar-title class="q-py-sm q-gutter-md">
          <!-- Display on lesser than medium size only -->
          <q-btn class="lt-md" dense flat round icon="menu" @click="left = !left" />

          <q-avatar
            class="bg-black text-white"
            icon="fab fa-blogger"
            size="46px"
            square
          />
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
          <!-- Display on greater than medium size only -->
          <q-btn
            class="text-weight-bold gt-sm"
            flat
            type="a"
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
            label="Tạo Tài Khoản"
            text-color="primary"
            no-caps
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- left sidebar when in mobile mode -->
    <q-drawer v-model="left" side="left">
      <!-- drawer content -->
      <IntroSec/>
      <UserNav/>
    </q-drawer>
    <!-- Main content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import IntroSec from '../components/home_page/IntroSec'
import UserNav from '../components/home_page/UserNav'

export default {
  components: {
    IntroSec,
    UserNav
  },
  data () {
    return {
      left: false
    }
  }
}
</script>
