<template>
  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <q-card class="my-card">
      <div class="bg-grey-6" style="height: 15px;"></div>

      <q-card-section class="bg-primary text-black relative-position">
        <div class="text-subtitle1 text-weight-bold">
          {{ tag.tag_name }}
        </div>
        <div class="text-subtitle2 q-my-sm">
          Đây là thẻ <span class="text-weight-bold">{{ tag.tag_name }}</span
          >. Bạn có thể theo dõi các bài viết có kèm với thẻ này thông qua trang
          chủ
        </div>

        <q-btn
          @click="onFollowTag"
          class="text-weight-bold"
          :label="this.isFollowed ? 'Bỏ theo dõi' : 'Theo dõi'"
          color="grey-4"
          text-color="dark"
          size="14px"
          no-caps
          unelevated
        />
      </q-card-section>

      <q-icon
        class="absolute-bottom-right"
        :name="tag.tag_icon"
        size="60px"
        style="right: 15px;"
      />
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  props: ['tag', 'isAuthUser'],

  watch: {
    isAuthUser() {
      this.isFollowed = this.tag.followed;
    }
  },

  data() {
    return {
      isFollowed: false
    };
  },

  computed: {
    ...mapGetters('user', ['getUser'])
  },

  methods: {
    ...mapActions('tags', ['followTag']),
    ...mapActions('user', ['refresh']),

    onFollowTag() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      if (this.getUser.authenticated) {
        this.followTag({
          isFollowed: this.isFollowed,
          tagId: this.tag.id,
          userId: this.getUser.user.id,
          token
        })
          .then(() => {
            if (this.isFollowed) {
              this.isFollowed = false;
            } else {
              this.isFollowed = true;
            }

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
                message: 'Đã xảy ra lỗi hệ thống!!!'
              });
            }
          });
      } else {
        this.$q.loading.hide();

        this.$router.push('/login');
      }
    }
  }
};
</script>
