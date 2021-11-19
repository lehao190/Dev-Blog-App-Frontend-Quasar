<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="text-h4 text-bold">
      Dashboard
    </div>

    <!-- Dashboard Section -->
    <div class="row q-mt-lg q-col-gutter-x-md">
      <!-- Choosing options -->
      <div class="col-md-3 col-sm-12 bg-accent">
        <q-btn
          @click="tableOption = 'post'"
          :class="[
            tableOption === 'post'
              ? 'full-width bg-grey-4 text-weight-thin'
              : 'full-width bg-accent text-weight-thin'
          ]"
          unelevated
          align="left"
          label="Bài viết"
          no-caps
        />

        <!-- <q-btn
          @click="tableOption = 'saved_post'"
          :class="[
            tableOption === 'saved_post'
              ? 'full-width bg-grey-4 text-weight-thin'
              : 'full-width bg-accent text-weight-thin'
          ]"
          unelevated
          align="left"
          label="Bài viết đã lưu"
          no-caps
        /> -->

        <q-btn
          v-if="getUser.user.admin === true"
          @click="tableOption = 'tag'"
          :class="[
            tableOption === 'tag'
              ? 'full-width bg-grey-4 text-weight-thin'
              : 'full-width bg-accent text-weight-thin'
          ]"
          unelevated
          align="left"
          label="Thẻ"
          no-caps
        />

        <q-btn
          @click="tableOption = 'user'"
          v-if="getUser.user.admin === true"
          :class="[
            tableOption === 'user'
              ? 'full-width bg-grey-4 text-weight-thin'
              : 'full-width bg-accent text-weight-thin'
          ]"
          unelevated
          align="left"
          label="Người dùng"
          no-caps
        />
      </div>

      <!-- Dashboard Data -->
      <div class="col-md-9 col-sm-12 rounded-borders">
        <div class="row">
          <div class="text-right q-mr-xs q-mb-sm q-gutter-sm col-12">
            <q-btn
              v-if="tableOption !== 'saved_post' && tableOption !== 'user'"
              class="text-bold"
              color="secondary"
              icon="add"
              label="Tạo"
              no-caps
              @click="onCreate"
            />
            <q-btn
              class="text-bold"
              color="negative"
              icon="clear"
              label="Xóa"
              no-caps
              @click="onDelete"
            />
          </div>

          <div class="col-12">
            <TagTable
              @selectedTags="onSelectedItems"
              @unsetReset="unset"
              :reset="reset"
              v-if="this.tableOption === 'tag' && getUser.user.admin === true"
            />

            <UserTable
              @selectedUsers="onSelectedItems"
              @unsetReset="unset"
              :reset="reset"
              v-if="this.tableOption === 'user' && getUser.user.admin === true"
            />

            <PostTable
              @selectedPosts="onSelectedItems"
              @unsetReset="unset"
              :reset="reset"
              v-if="this.tableOption === 'post'"
            />

            <!-- <SavedPostTable v-if="this.tableOption === 'saved_post'" /> -->
            <!-- <FollowedTagTable v-if="this.tableOption === 'followed_tag'" /> -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import TagTable from '../components/dashboard/TagTable.vue';
// import FollowedTagTable from '../components/dashboard/FollowedTagTable.vue';
import PostTable from '../components/dashboard/PostTable.vue';
// import SavedPostTable from '../components/dashboard/SavedPostTable.vue';
import UserTable from '../components/dashboard/UserTable.vue';

import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  mounted() {
    if (this.getUser.authenticated === false) {
      this.$router.push('/');
    }
  },

  data() {
    return {
      tableOption: 'post',
      selectedItems: [],
      reset: false
    };
  },

  computed: {
    ...mapGetters('user', ['getUser'])
  },

  components: {
    TagTable,
    // FollowedTagTable,
    PostTable,
    // SavedPostTable,
    UserTable
  },
  methods: {
    ...mapActions('tags', ['deleteTags']),
    ...mapActions('user', ['deleteUsers', 'refresh']),
    ...mapActions('posts', ['deletePosts']),

    onSelectedItems(value) {
      this.selectedItems = value;
    },

    unset(value) {
      this.reset = value;
    },

    // Create tags, posts
    onCreate() {
      if (this.tableOption === 'tag') {
        return this.$router.push('/create_tag');
      } else {
        return this.$router.push('/create_post');
      }
    },

    // Delete posts, users, tags...
    onDelete() {
      this.$q.loading.show();

      const token = LocalStorage.getItem('accessToken');

      if (this.tableOption === 'user') {
        this.deleteUsers({
          token,
          users: this.selectedItems
        })
          .then(() => {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'positive',
              message: 'Xóa thành công!!!'
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
                message: 'Đã xảy ra lỗi khi thực hiện thao tác!!!'
              });
            }
          });

        return (this.reset = true);
      }

      if (this.tableOption === 'tag') {
        this.deleteTags({
          token,
          tags: this.selectedItems
        })
          .then(() => {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'positive',
              message: 'Xóa thành công!!!'
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
                message: 'Đã xảy ra lỗi khi thực hiện thao tác!!!'
              });
            }
          });

        return (this.reset = true);
      }

      if (this.tableOption === 'post') {
        this.deletePosts({
          token,
          posts: this.selectedItems
        })
          .then(() => {
            this.$q.loading.hide();

            this.$q.notify({
              type: 'positive',
              message: 'Xóa thành công!!!'
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
                message: 'Đã xảy ra lỗi khi thực hiện thao tác!!!'
              });
            }
          });

        return (this.reset = true);
      }

      if (this.tableOption === 'saved_post') {
        console.log('Delete Saved Post');
      }
    }
  }
};
</script>

<style lang="scss">
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
