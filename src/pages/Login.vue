<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <q-card class="my-card login-wrapper" flat>
      <q-card-section class="q-px-lg q-py-lg q-gutter-sm">
        <!-- Oauth Login -->
        <OauthProvs />

        <div class="q-py-md relative-position" @click="getUsers">
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
import { mapActions } from 'vuex'
import OauthProvs from '../components/auth/OauthProvs.vue'
import { api } from 'boot/axios'

export default {
  components: {
    OauthProvs
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async onSubmit () {
      this.login({
        email: this.email,
        password: this.password
      })
    },

    // Refresh token incomplete
    async refresh () {
      try {
        const { data } = await api.post('/refresh_tokens', {
          accessToken: this.$q.localStorage.getItem('accessToken')
        })

        this.$q.localStorage.set('accessToken', data.accessToken)

        console.log('new access token: ', data)
      } catch (error) {
        this.$q.localStorage.clear()

        this.$store.commit({
          type: 'user/USER_CREDENTIALS_RESET'
        })
      }
    },

    async getUsers () {
      // try {
      //   const { data } = await api.get('/users', {
      //     headers: {
      //       Authorization:
      //         'Bearer ' + this.$q.localStorage.getItem('accessToken')
      //     }
      //   })

      //   console.log('users data: ', data)
      // } catch (error) {
      //   console.log(error.message)

      //   this.refresh()
      // }
      

      // this.$socket.emit('aha', { name: 'Take me on mate hahaha!!!' })

      // const { data } = await this.$axios.post('http://172.28.103.241:3030/authentication', {
      //   strategy: 'local',
      //   email: 'test@yahoo.com',
      //   password: 'test'
      // })

      // this.data = data

      // this.$socket.on('aha2', (data) => {
      //   if (data) {
      //     const audio = new Audio(require('../audio/tmobile.mp3'))
      //     audio.play()
      //   }
      // })

      // this.$q.notify({
      //   type: 'positive',
      //   message: `This is a "positive" type notification.`
      // })
    }
  }
}
</script>
