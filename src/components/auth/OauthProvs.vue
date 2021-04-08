<template>
  <div>
    <h5 class="text-h5 text-weight-bold text-center">
      Welcome to Dev Blogger Community
    </h5>

    <p class="text-center">
      <b class="text-secondary">Cộng Đồng Dev Blogger</b> là cộng đồng gồm có
      589,000 các developer tài năng
    </p>

    <!-- Login with Oauth Providers -->
    <div class="q-py-sm q-gutter-sm">
      <!-- Github -->
      <q-btn
        type="a"
        to="/github"
        class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2"
        color="black"
        label="Đăng nhập bằng GitHub"
        icon="fab fa-github"
        no-caps
      />

      <!-- Google -->
      <q-btn
        type="a"
        to="/google"
        class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2"
        color="red"
        label="Đăng nhập bằng Google"
        icon="fab fa-google"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {}
</script>
