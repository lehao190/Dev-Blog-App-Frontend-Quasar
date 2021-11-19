<template>
  <q-table
    :grid="isGrid"
    :data="getUsers.users"
    selection="multiple"
    :selected.sync="selected"
    :columns="columns"
    row-key="email"
    hide-no-data
    wrap-cells
    @update:selected="onSelected"
  >
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div class="my-table-details text-bold">
          <router-link :to="'/users/edit/' + props.row.id">
            {{ props.row.email }}
          </router-link>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage } from 'quasar';

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
          label: 'Email',
          align: 'left',
          field: row => row.email,
          format: val => `${val}`
        },
        {
          name: 'id',
          align: 'center',
          label: 'ID',
          field: 'id'
        },
        { name: 'admin', label: 'admin', field: 'admin', align: 'center' },
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
    ...mapGetters('user', ['getUsers'])
  },

  mounted() {
    this.$q.loading.show()

    const token = LocalStorage.getItem('accessToken');

    this.requestAllUsers({
      token
    })
      .then(() => {
        this.$q.loading.hide();
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
    ...mapActions('user', ['requestAllUsers', 'refresh']),

    onSelected(newSelected) {
      this.$emit('selectedUsers', newSelected);
    },

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
