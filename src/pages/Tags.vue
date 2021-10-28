<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <h5 class="text-h5 text-weight-bold">Tags</h5>

    <div class="row q-py-md q-col-gutter-lg">
      <!-- Display Tags -->
      <Tag v-for="tag in this.tags" :key="tag.id" :tag="tag" :isAuthUser="isAuthUser"/>
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
    this.getAllTags()
      .then (() => {
        this.tags = this.getTags.tags

        if (this.getUser.authenticated) {
          const token = LocalStorage.getItem('accessToken');

          this.getAuthUserFollowedTags({
            userId: this.getUser.user.id,
            token,
            tags: this.tags
          })
            .then(() => {
              this.isAuthUser = true
            })
            .catch(e => {
              console.log('error from followed tags: ', e);
            });
        }
      })
      .catch((e) => {
        console.log('error tag: ', e)
      })
  },

  data () {
    return {
      tags: [],
      isAuthUser: false
    }
  },

  computed: {
    ...mapGetters('tags', ['getTags']),
    ...mapGetters('user', ['getUser'])
  },

  methods: {
    ...mapActions('tags', ['getAllTags', 'getAuthUserFollowedTags'])
  }
};
</script>
