<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <q-card class="my-card login-wrapper" flat>
      <q-card-section class="q-px-lg q-py-lg q-gutter-sm">
        <h5 class="text-h5 text-weight-bold text-center">
          Welcome to Dev Blogger Community
        </h5>

        <p class="text-center">
          <b class="text-secondary">Cộng Đồng Dev Blogger</b> là cộng đồng gồm
          có 589,000 các developer tài năng
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

        <div class="q-py-md relative-position">
          <q-separator />
          <span class="text-body text-grey-8 bg-primary absolute-center text-center">Có tài khoản? Tiếp tục đăng nhập</span>
        </div>

        <!-- Local Auth Login -->
        <div class="q-py-sm">
          <q-input color="blue" label="Email" type="text" />

          <q-input color="blue" label="Password" type="password" />

          <q-btn
            type="submit"
            class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2 q-mt-lg"
            color="secondary"
            label="Đăng Nhập"
            no-caps
          />
        </div>

        <!-- Reset Password -->
        <div class="text-center q-py-lg">
          <router-link class="text-blue" to="/resetpassword"
            >Tôi đã quên mật khẩu</router-link
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {}
</script>

<style></style>
