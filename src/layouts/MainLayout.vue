<template>
  <q-layout view="hhh Lpr fFf" class="bg-accent">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="main-wrapper text-black">
        <q-toolbar-title class="q-py-sm q-gutter-md">
          <q-avatar
            class="bg-black text-white"
            icon="fab fa-blogger"
            size="46px"
            square
          />
          <!-- Searching for posts -->
          <q-input
            class="absolute"
            style="width: 400px; display: inline-block; top: -5px;"
            filled
            dense
            placeholder="Tìm kiếm..."
          />
        </q-toolbar-title>
        <div class="q-gutter-md">
          <q-btn
            class="text-weight-bold"
            flat
            type="a"
            label="Đăng Nhập"
            text-color="blue-8"
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
      aha Take on Me aha Take on Me aha Take on Me aha Take on Me aha Take on Me
      aha Take on Me aha Take on Me aha Take on Me
    </q-drawer>

    <!-- right sidebar when in mobile mode -->
    <q-drawer v-model="right" side="right">
      <!-- drawer content -->
      Nice Mate! great Nice Mate! great Nice Mate! great Nice Mate! great Nice
      Mate! great Nice Mate! great
    </q-drawer>

    <!-- Main content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>
