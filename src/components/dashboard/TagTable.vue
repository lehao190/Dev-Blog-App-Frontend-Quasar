<template>
  <q-table
    :grid="isGrid"
    :data="data"
    selection="multiple"
    :selected.sync="selected"
    :columns="columns"
    row-key="tag_name"
    hide-no-data
    wrap-cells
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
  // created() {
  //   // if (window.innerWidth <= 600) {
  //   //   this.isGrid = true
  //   // }

  //   window.addEventListener('resize', function(event) {
  //     console.log(window.innerWidth)
  //   });
  // },
  // destroyed () {
  //   window.removeEventListener('resize', function(event) {
  //     console.log('Destroyed Linstener !!!')
  //   })
  // },

  async mounted() {
    await this.getAllTags()
    this.data = this.getTags.tags
  },

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

  methods: {
    ...mapActions('tags', ['getAllTags']),

    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
            this.selected.length > 1 ? 's' : ''
          } selected of ${this.data.length}`;
    }
  }
};
</script>
