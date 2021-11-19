<template>
  <q-page class="edit-wrapper q-px-sm q-py-xl">
    <div class="text-center text-h4 text-weight-bold text-secondary q-mb-md">
      Chỉnh Sửa Hồ Sơ
    </div>

    <!-- Edit Profile Section -->
    <div class="bg-white rounded-borders q-pa-md">
      <div class="q-gutter-y-lg">
        <div class="text-h6 text-weight-bold">
          User
        </div>

        <!-- User's Name -->
        <div>
          <div class="q-mb-sm">Họ Tên</div>
          <q-input filled v-model="username" />
        </div>

        <!-- User's Email -->
        <!-- <div>
          <div class="q-mb-sm">Email</div>
          <q-input filled v-model="email" />
        </div> -->

        <!-- User's Avatar -->
        <div class="row q-gutter-x-xs">
          <div class="col-12 q-mb-sm">Hình Đại Diện</div>

          <q-avatar v-if="userAvatar" size="55px">
            <img :src="userAvatar" />
          </q-avatar>

          <q-file class="col" filled v-model="uploadImage" />
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <q-btn
        @click="onEditUser"
        color="secondary"
        class="full-width text-bold"
        label="Lưu Hồ Sơ"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  mounted() {
    this.$q.loading.show();

    const token = LocalStorage.getItem('accessToken');
    const hashURL = window.location.hash.split('/users/edit/');

    this.requestEditUser({
      token,
      userId: hashURL[1]
    })
      .then(() => {
        this.userId = this.getEditUser.editUser.id;
        this.username = this.getEditUser.editUser.username;
        this.userAvatar = this.getEditUser.editUser.user_avatar;

        this.$q.loading.hide();
      })
      .catch(e => {
        if (e.data.data.name === 'TokenExpiredError') {
          this.refresh()
            .then(() => {
              this.$q.loading.hide();

              this.$q.notify({
                type: 'warning',
                textColor: 'white',
                message: 'Bạn vui lòng thực hiện lại thao tác!!!'
              });
            })
            .catch(() => {
              this.$q.loading.hide();

              this.$q.notify({
                type: 'negative',
                message: 'Bạn đã hết thời hạn đăng nhập!!!'
              });

              this.$router.push('/login');
            });
        } else {
          this.$q.loading.hide();

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        }
      });
  },

  data() {
    return {
      userId: '',
      username: '',
      userAvatar: '',
      firebaseImage: false,
      uploadImage: null
    };
  },

  computed: {
    ...mapGetters('user', ['getEditUser', 'getUser'])
  },

  methods: {
    ...mapActions('user', ['requestEditUser', 'editUser', 'refresh']),

    onEditUser() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      let hashAvatar;

      if (this.userAvatar) {
        hashAvatar = this.userAvatar.split('dev-blogger-app.appspot.com/o/');

        if (hashAvatar[0] === 'https://firebasestorage.googleapis.com/v0/b/') {
          hashAvatar = hashAvatar[1].split('?alt');

          hashAvatar = hashAvatar[0];
          this.firebaseImage = true;
        } else {
          hashAvatar = hashAvatar[0];
          this.firebaseImage = false;
        }
      }

      this.editUser({
        userId: this.userId,
        username: this.username,
        userAvatar: hashAvatar,
        uploadImage: this.uploadImage,
        firebaseImage: this.firebaseImage,
        token
      })
        .then(() => {
          this.$q.loading.hide();

          this.$router.push(`/users/${this.userId}`);

          this.$q.notify({
            type: 'positive',
            message: 'Sửa thành công!!!'
          });
        })
        .catch(e => {
          if (e.data.data.name === 'TokenExpiredError') {
            this.refresh()
              .then(() => {
                this.$q.loading.hide();

                this.$q.notify({
                  type: 'warning',
                  textColor: 'white',
                  message: 'Bạn vui lòng thực hiện lại thao tác!!!'
                });
              })
              .catch(() => {
                this.$q.loading.hide();

                this.$q.notify({
                  type: 'negative',
                  message: 'Bạn đã hết thời hạn đăng nhập!!!'
                });

                this.$router.push('/login');
              });
          } else {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              message: 'Đã xảy ra lỗi!!!'
            });
          }
        });
    }
  }
};
</script>
