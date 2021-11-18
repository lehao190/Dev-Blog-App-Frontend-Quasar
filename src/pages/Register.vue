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
            >Có tài khoản?
            <router-link class="text-blue" :to="{ name: 'login' }"
              >Vào Đăng Nhập</router-link
            ></span
          >
        </div>

        <!-- Local Auth Login -->
        <div class="q-py-sm">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="username"
              color="blue"
              dense
              label="Name"
              type="text"
            />

            <q-input
              v-model="email"
              color="blue"
              dense
              label="Email"
              type="text"
            />

            <q-input
              v-model="password"
              color="blue"
              dense
              label="Password"
              type="password"
            />

            <q-input
              v-model="rePassword"
              color="blue"
              dense
              label="Re-Password"
              type="password"
            />

            <q-file v-model="user_avatar" dense color="blue" label="Avatar">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <q-btn
              type="submit"
              class="normal-hover full-width q-py-xs text-weight-bold text-subtitle2 q-mt-lg"
              color="secondary"
              label="Đăng Ký"
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
      username: '',
      email: '',
      password: '',
      rePassword: '',
      user_avatar: null
    };
  },
  methods: {
    ...mapActions('user', ['register']),

    async onSubmit() {
      this.$q.loading.show();

      this.register({
        username: this.username,
        email: this.email,
        password: this.password,
        rePassword: this.rePassword,
        user_avatar: this.user_avatar
      })
        // .then(() => {
        //   if (this.$store.getters['user/getAuthenticated']) {
        //     this.$router.push('/')
        //   }
        // })
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

            if (e.data.errors.user) {
              this.$q.notify({
                type: 'negative',
                textColor: 'white',
                message: e.data.errors.user
              });
            }

            if (e.data.errors.username) {
              this.$q.notify({
                type: 'negative',
                textColor: 'white',
                message: e.data.errors.username
              });
            }

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

            if (e.data.errors.confirmPassword) {
              this.$q.notify({
                type: 'negative',
                textColor: 'white',
                message: e.data.errors.confirmPassword
              });
            }
          } else if (e.data.fileError) {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              textColor: 'white',
              message: e.data.fileError
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
