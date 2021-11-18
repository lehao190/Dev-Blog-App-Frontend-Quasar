<template>
  <nav class="q-py-lg">
    <q-list>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="fas fa-home" />
        </q-item-section>

        <q-item-section class="text-weight-bold">Trang chủ</q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: 'login' }">
        <q-item-section avatar>
          <q-avatar
            rounded
            color="purple"
            text-color="white"
            icon="fas fa-user-plus"
          />
        </q-item-section>

        <q-item-section class="text-weight-bold">Đăng nhập/ký</q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: 'tags' }">
        <q-item-section avatar>
          <q-avatar
            rounded
            color="secondary"
            text-color="white"
            icon="fas fa-tags"
          />
        </q-item-section>

        <q-item-section class="text-weight-bold">Thẻ</q-item-section>
      </q-item>

      <!-- <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar
            rounded
            color="info"
            text-color="white"
            icon="fas fa-bookmark"
          />
        </q-item-section>

        <q-item-section class="text-weight-bold"
          >Bài viết có đánh dấu</q-item-section
        >
      </q-item> -->
    </q-list>
  </nav>
</template>

<script>
export default {}
</script>
