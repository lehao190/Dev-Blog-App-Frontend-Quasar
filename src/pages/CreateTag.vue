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
import { mapActions } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  data() {
    return {
      tagName: '',
      tagIcon: ''
    };
  },
  methods: {
    ...mapActions('tags', ['createTag']),

    // Create Tag
    onClick() {
      const token = LocalStorage.getItem('accessToken');

      this.createTag({
        token,
        tagName: this.tagName,
        tagIcon: this.tagIcon
      })
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch((e) => {
          console.log('Error: ', e)
          
          this.$q.notify({
            type: 'negative',
            message: e.data.errors.tag_name
          });
        });
    }
  }
};
</script>
