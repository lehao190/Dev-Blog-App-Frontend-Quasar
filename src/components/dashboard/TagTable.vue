<template>
  <q-table
    :grid="isGrid"
    :data="getTags.tags"
    selection="multiple"
    :selected.sync="selected"
    :columns="columns"
    row-key="tag_name"
    hide-no-data
    wrap-cells
    @update:selected="onSelected"
  >
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div class="my-table-details text-bold">
          <router-link :to="'/tags/edit/' + props.row.id">
            {{ props.row.tag_name }}
          </router-link>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  mounted() {
    window.addEventListener('resize', this.onResize);

    if (window.innerWidth <= 600) {
      this.isGrid = true;
    }

    this.$q.loading.show();

    this.getAllTags()
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
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  props: ['reset'],

  data() {
    return {
      isGrid: false,
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Thẻ',
          align: 'left',
          field: row => row.tag_name,
          format: val => `${val}`
        },
        {
          name: 'id',
          align: 'center',
          label: 'ID thẻ',
          field: 'id'
        },
        { name: 'tag_icon', label: 'Icon', field: 'tag_icon', align: 'center' },
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
    ...mapGetters('tags', ['getTags'])
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
    ...mapActions('tags', ['getAllTags']),

    onSelected(newSelected) {
      this.$emit('selectedTags', newSelected);
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
