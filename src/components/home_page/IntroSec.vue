<template>
  <q-card class="my-card">
    <q-card-section>
      <span class="text-subtitle1 text-weight-bold"
        ><b class="text-secondary">Cộng Đồng Dev Blogger</b> là cộng đồng gồm có
        589,000 các developer tài năng</span
      >
      <p>
        Đây là nơi mà mọi người cùng nhau chia sẽ kinh nghiệm, kỹ năng lập trình
      </p>
      <div class="q-gutter-sm">
        <div>
          <q-btn
            class="text-weight-bold full-width"
            flat
            type="a"
            :to="{ name: 'login' }"
            label="Đăng Nhập"
            text-color="blue-8"
            no-caps
          />
        </div>
        <div>
          <q-btn
            class="text-weight-bold full-width"
            color="secondary"
            type="a"
            :to="{ name: 'register' }"
            label="Tạo Tài Khoản"
            text-color="primary"
            no-caps
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {}
</script>

<style></style>
