<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <h5 class="text-h5 text-weight-bold">Tags</h5>

    <div class="row q-py-md q-col-gutter-lg">
      <!-- Display Tags -->
      <Tag
        v-for="tag in this.tags"
        :key="tag.id"
        :tag="tag"
        :isAuthUser="isAuthUser"
      />
    </div>
  </q-page>
</template>

<script>
import Tag from '../components/tags_page/Tag';

import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  components: {
    Tag
  },

  mounted() {
    this.$q.loading.show();

    this.getAllTags()
      .then(() => {
        this.tags = this.getTags.tags;

        if (this.getUser.authenticated) {
          const token = LocalStorage.getItem('accessToken');

          this.getAuthUserFollowedTags({
            userId: this.getUser.user.id,
            token,
            tags: this.tags
          })
            .then(() => {
              this.isAuthUser = true;
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
        }

        this.$q.loading.hide();
      })
      .catch(() => {
        this.$q.loading.hide();

        this.$q.notify({
          type: 'negative',
          message: 'Đã xảy ra lỗi khi tải nội dung!!!'
        });
      });
  },

  data() {
    return {
      tags: [],
      isAuthUser: false
    };
  },

  computed: {
    ...mapGetters('tags', ['getTags']),
    ...mapGetters('user', ['getUser'])
  },

  methods: {
    ...mapActions('tags', ['getAllTags', 'getAuthUserFollowedTags']),
    ...mapActions('user', ['refresh'])
  }
};
</script>
