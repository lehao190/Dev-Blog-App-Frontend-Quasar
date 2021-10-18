<template>
  <q-page class="main-wrapper q-px-sm q-py-sm">
    <div class="post-wrapper q-gutter-y-sm">
      <!-- Preview Markdown -->
      <div class="text-right">
        <q-btn-toggle
          v-model="preview"
          toggle-color="secondary"
          size="15px"
          no-caps
          flat
          :options="[
            { label: 'Tùy Chỉnh', value: 'noPreview' },
            { label: 'Xem', value: 'preview' }
          ]"
        />
      </div>

      <!-- Markdown Section -->
      <div v-if="preview === 'noPreview'" class="bg-white rounded-borders">
        <q-scroll-area style="height: 550px;">
          <div class="q-pa-xl q-gutter-md">
            <!-- Pick Image for post -->
            <div style="width: 200px">
              <q-file color="blue" v-model="file" label="Thêm hình ảnh bìa">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </div>

            <!-- Title for the post -->
            <div>
              <q-input
                class="text-h4"
                :input-style="{
                  lineHeight: '1'
                }"
                type="textarea"
                v-model="title"
                placeholder="Tiêu đề bài viết..."
                autogrow
                borderless
              />
            </div>

            <!-- Choose Tags for post -->
            <div>
              <q-select
                borderless
                label="Thêm tối đa 4 thẻ"
                v-model="multiple"
                multiple
                color="blue"
                :options="options"
                max-values="4"
                style="width: 300px"
              />
            </div>

            <!-- Write Markdown Text  -->
            <div>
              <q-input
                class="text-subtitle1"
                :input-style="{
                  lineHeight: '1'
                }"
                v-model="body"
                placeholder="Viết nội dung bài viết bằng ngôn ngữ MARKDOWN ở đây..."
                borderless
                type="textarea"
                autogrow
              />
            </div>
          </div>
        </q-scroll-area>
      </div>

      <!-- Preview Section -->
      <div v-if="preview === 'preview'" class="bg-white rounded-borders">
        <q-scroll-area class="q-pa-lg" style="height: 550px;">
           <vue-markdown :source="body"/>
        </q-scroll-area>
      </div>

      <!-- Publish Post -->
      <div class="q-pt-md">
        <q-btn @click="onSubmit" class="text-bold" color="secondary" label="Xuất bản" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown';
import { LocalStorage } from 'quasar'

export default {
  data() {
    return {
      title: '',
      body: '',
      preview: 'noPreview',
      file: null,
      multiple: null,
      options: ['#Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    };
  },
  components: {
    VueMarkdown
  },
  computed: {
    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('posts', ['createPost']),
    onSubmit () {
      // console.log(JSON.stringify(this.text));
      const token = LocalStorage.getItem('accessToken')
    
      this.createPost({
        title: this.title,
        body: this.body,
        userId: this.getUser.user.id,
        token
      })
    }
  }
};
</script>
