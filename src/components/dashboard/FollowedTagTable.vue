<template>
  <q-table
    :data="data"
    selection="multiple"
    :selected.sync="selected"
    :columns="columns"
    row-key="name"
    hide-no-data
    wrap-cells
  >
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div class="my-table-details text-bold">
          <router-link to="/users/edit/a">
            {{ props.row.details }}
          </router-link>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Thẻ đang theo',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'calories',
          align: 'center',
          label: 'ID thẻ',
          field: 'calories'
        },
        { name: 'carbs', label: 'Tạo lúc', field: 'carbs', align: 'center' },
        { name: 'protein', label: 'Sửa lúc', field: 'protein', align: 'center' }
      ],

      data: [
        {
          name: 'Frozenasd Yogurt',
          details: 'Javascript This is me mate aha take on me in adday orRRRRR TWWOOOOWOWOWOOWOWO',
          calories: 234,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Dante',
          details: 'Dante',
          calories: 234,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Son',
          details: 'Im a SUPER SAIYAN SOOONNNN GOKU !!!',
          calories: 234,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Vergil',
          details: 'Vergil (Sparda)',
          calories: 234,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        }
      ]
    };
  },
  methods: {
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
