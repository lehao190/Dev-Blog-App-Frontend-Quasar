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
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Bài viết"
          no-caps
        />

        <q-btn
          @click="tableOption = 'saved_post'"
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Bài viết đã lưu"
          no-caps
        />

        <q-btn
          @click="tableOption = 'tag'"
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Thẻ"
          no-caps
        />

        <q-btn
          @click="tableOption = 'followed_tag'"
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Thẻ đang theo dõi"
          no-caps
        />

        <q-btn
          @click="tableOption = 'user'"
          class="full-width bg-accent text-weight-thin"
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
              class="text-bold"
              color="secondary"
              icon="add"
              label="Tạo"
              no-caps
            />
            <q-btn
              class="text-bold"
              color="negative"
              icon="clear"
              label="Xóa"
              no-caps
            />
          </div>

          <div class="col-12">
            <TagTable v-if="this.tableOption === 'tag'" />
            <FollowedTagTable v-if="this.tableOption === 'followed_tag'" />
            <UserTable v-if="this.tableOption === 'user'" />
            <PostTable v-if="this.tableOption === 'post'" />
            <SavedPostTable v-if="this.tableOption === 'saved_post'" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import TagTable from '../components/dashboard/TagTable.vue';
import FollowedTagTable from '../components/dashboard/FollowedTagTable.vue';
import PostTable from '../components/dashboard/PostTable.vue';
import SavedPostTable from '../components/dashboard/SavedPostTable.vue';
import UserTable from '../components/dashboard/UserTable.vue';

export default {
  data() {
    return {
      tableOption: 'tag'
    };
  },
  components: {
    TagTable,
    FollowedTagTable,
    PostTable,
    SavedPostTable,
    UserTable
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
