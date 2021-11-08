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
      <q-btn color="secondary" class="full-width text-bold" label="Lưu Hồ Sơ" />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  mounted() {
    const token = LocalStorage.getItem('accessToken');
    const hashURL = window.location.hash.split('/users/edit/');

    this.requestEditUser({
      token,
      userId: hashURL[1]
    })
      .then(() => {
        // console.log('edit user aha: ', this.getEditUser.editUser)

        this.username = this.getEditUser.editUser.username
        this.userAvatar = this.getEditUser.editUser.user_avatar
      })
      .catch(e => {
        console.log('error get user edit: ', e);
      });
  },

  data() {
    return {
      username: '',
      userAvatar: '',
      uploadImage: null
    };
  },

  computed: {
    ...mapGetters('user', ['getEditUser', 'getUser'])
  },

  methods: {
    ...mapActions('user', ['requestEditUser'])
  }
};
</script>
