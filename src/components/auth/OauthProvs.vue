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
        class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2"
        color="black"
        no-caps
      >
        <div class="row q-gutter-md justify-center items-center text-center">
          <q-icon name="fab fa-github" />
          <a class="text-white oauth-login" href="http://localhost:3030/oauth/github">Đăng nhập bằng GitHub</a>
        </div>
      </q-btn>

      <!-- Google -->
      <q-btn
        class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2"
        color="red"
        no-caps
      > 
        <div class="row q-gutter-md justify-center items-center text-center">
          <q-icon name="fab fa-google" />
          <a class="text-white oauth-login" href="http://localhost:3030/oauth/google">Đăng nhập bằng Google</a>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {}
</script>
