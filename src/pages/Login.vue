<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <q-card class="my-card login-wrapper" flat>
      <q-card-section class="q-px-lg q-py-lg q-gutter-sm">
        <!-- Oauth Login -->
        <OauthProvs />

        <div class="q-py-md relative-position">
          <q-separator />
          <span
            class="text-body text-grey-8 bg-primary absolute-center text-center"
            >Chưa có tài khoản?
            <router-link class="text-blue" :to="{ name: 'register' }"
              >Vào Đăng Ký</router-link
            ></span
          >
        </div>

        <!-- Local Auth Login -->
        <div class="q-py-sm">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="email"
              dense
              color="blue"
              label="Email"
              type="text"
            />

            <q-input
              v-model="password"
              dense
              color="blue"
              label="Password"
              type="password"
            />

            <q-btn
              type="submit"
              class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2 q-mt-lg"
              color="secondary"
              label="Đăng Nhập"
              no-caps
            />
          </q-form>
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
import { mapActions } from 'vuex';
import OauthProvs from '../components/auth/OauthProvs.vue';

export default {
  components: {
    OauthProvs
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions('user', ['login']),

    onSubmit() {
      this.$q.loading.show();

      this.login({
        email: this.email,
        password: this.password
      })
        .then(() => {
          if (this.$store.getters['user/getAuthenticated']) {
            this.$q.loading.hide();

            this.$router.push('/');
          } else {
            this.$q.loading.hide();
          }
        })
        .catch(e => {
          if (e.data.name === 'BadRequest') {
            this.$q.loading.hide();

            if (e.data.errors.email) {
              this.$q.notify({
                type: 'negative',
                textColor: 'white',
                message: e.data.errors.email
              });
            }

            if (e.data.errors.password) {
              this.$q.notify({
                type: 'negative',
                textColor: 'white',
                message: e.data.errors.password
              });
            }
          } else if (e.data.name === 'NotAuthenticated') {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              textColor: 'white',
              message: e.data.message
            });
          } else {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              textColor: 'white',
              message: 'Đã xảy ra lỗi!!!'
            });
          }
        });
    }
  }
};
</script>
