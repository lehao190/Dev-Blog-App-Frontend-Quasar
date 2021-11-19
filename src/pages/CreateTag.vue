<template>
  <q-page class="edit-wrapper q-px-sm q-py-xl">
    <div class="text-center text-h4 text-weight-bold text-secondary q-mb-md">
      Tạo Thẻ
    </div>

    <!-- Edit Profile Section -->
    <div class="bg-white rounded-borders q-pa-md">
      <div class="q-gutter-y-lg">
        <!-- Tag's Name -->
        <div>
          <div class="q-mb-sm">Tên thẻ</div>
          <q-input filled v-model="tagName" />
        </div>

        <!-- Tag's Icon -->
        <div>
          <div class="q-mb-sm">Icon</div>
          <q-input filled v-model="tagIcon" />
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <q-btn
        color="secondary"
        class="full-width text-bold"
        label="Tạo"
        @click="onClick"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  mounted() {
    if (this.getUser.authenticated === false) {
      return this.$router.push('/login');
    } else if (this.getUser.user && this.getUser.user.admin === false) {
      return this.$router.push('/');
    }
  },

  data() {
    return {
      tagName: '',
      tagIcon: ''
    };
  },

  computed: {
    ...mapGetters('user', ['getUser'])
  },

  methods: {
    ...mapActions('tags', ['createTag']),
    ...mapActions('user', ['refresh']),

    // Create Tag
    onClick() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      this.createTag({
        token,
        tagName: this.tagName,
        tagIcon: this.tagIcon
      })
        .then(() => {
          this.$q.loading.hide();

          this.$router.push('/dashboard');

          this.$q.notify({
            type: 'positive',
            message: 'Tạo thành công!!!'
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
          } else if (e.data.name === 'BadRequest') {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'negative',
              message: e.data.errors.tag_name
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
