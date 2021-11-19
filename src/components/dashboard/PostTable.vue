<template>
  <q-table
    :grid="isGrid"
    :data="getPosts.posts"
    selection="multiple"
    :selected.sync="selected"
    :columns="columns"
    row-key="id"
    hide-no-data
    wrap-cells
    @update:selected="onSelected"
  >
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div class="my-table-details text-bold">
          <router-link :to="'/posts/' + props.row.id">
            {{ props.row.title }}
          </router-link>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['reset'],

  data() {
    return {
      isGrid: false,
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Tên bài viết',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`
        },
        {
          name: 'id',
          align: 'center',
          label: 'ID bài viết',
          field: 'id'
        },
        {
          name: 'created_at',
          label: 'Tạo lúc',
          field: 'created_at',
          align: 'center'
        },
        {
          name: 'updated_at',
          label: 'Sửa lúc',
          field: 'updated_at',
          align: 'center'
        }
      ],

      data: []
    };
  },

  computed: {
    ...mapGetters('posts', ['getPosts']),
    ...mapGetters('user', ['getUser'])
  },

  mounted() {
    window.addEventListener('resize', this.onResize);

    if (window.innerWidth <= 600) {
      this.isGrid = true;
    }

    this.$q.loading.show();

    if (this.getUser.user.admin === true) {
      this.requestAllPosts()
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        });
    } else {
      this.requestAllUserPosts({
        userId: this.getUser.user.id
      })
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();

          this.$q.notify({
            type: 'negative',
            message: 'Đã xảy ra lỗi khi tải nội dung!!!'
          });
        });
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  watch: {
    reset(newVal) {
      if (newVal === true) {
        this.selected = [];

        this.$emit('unsetReset', false);
      }
    }
  },

  methods: {
    ...mapActions('posts', ['requestAllPosts', 'requestAllUserPosts']),

    onSelected(newSelected) {
      this.$emit('selectedPosts', newSelected);
    },

    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
            this.selected.length > 1 ? 's' : ''
          } selected of ${this.data.length}`;
    },

    onResize() {
      if (window.innerWidth <= 600) {
        this.isGrid = true;
      }
    }
  }
};
</script>
