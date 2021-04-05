<template>
  <q-layout view="hhh Lpr fFf">
    <div>
      <q-header reveal elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>
            Title
          </q-toolbar-title>

          <q-btn dense flat round icon="menu" @click="right = !right" />
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="left" side="left">
        <!-- drawer content -->
        aha Take on Me aha Take on Me aha Take on Me aha Take on Me
      </q-drawer>

      <q-drawer show-if-above v-model="right" side="right">
        <!-- drawer content -->
        Nice Mate! great
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
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
