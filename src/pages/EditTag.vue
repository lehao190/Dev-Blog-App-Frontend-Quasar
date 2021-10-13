<template>
  <q-page class="edit-wrapper q-px-sm q-py-xl">
    <div class="text-center text-h4 text-weight-bold text-secondary q-mb-md">
      Chỉnh Sửa Thẻ
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
        label="Sửa"
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
    const token = LocalStorage.getItem('accessToken');
    const hashURL = window.location.hash.split('/tags/edit/');
    
    // Get tag data to edit
    this.getTag({
      token,
      tagId: hashURL[1]
    }).then(() => {
      const { tag } = this.getOneTag

      this.tagId = hashURL[1]
      this.tagName = tag.tag_name
      this.tagIcon = tag.tag_icon
    });
  },
  data() {
    return {
      tagId: '',
      tagName: '',
      tagIcon: ''
    };
  },
  computed: {
    ...mapGetters('tags', ['getOneTag'])
  },
  methods: {
    ...mapActions('tags', ['editTag', 'getTag']),

    // Edit Tag
    onClick() {
      const token = LocalStorage.getItem('accessToken');

      this.editTag({
        token,
        tagId: this.tagId,
        tagName: this.tagName,
        tagIcon: this.tagIcon
      })
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch(e => {
          console.log('Error: ', e);

          this.$q.notify({
            type: 'negative',
            message: e.data.errors.tag_name
          });
        });
    }
  }
};
</script>
