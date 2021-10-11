<template>
  <q-table
    :grid="isGrid"
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
          <router-link to="/tags/edit/a">
            {{ props.row.details }}
          </router-link>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
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
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'calories',
          align: 'center',
          label: 'ID thẻ',
          field: 'calories'
        },
        { name: 'fat', label: 'Icon', field: 'fat', align: 'center' },
        { name: 'carbs', label: 'Tạo lúc', field: 'carbs', align: 'center' },
        { name: 'protein', label: 'Sửa lúc', field: 'protein', align: 'center' }
      ],

      data: [
        {
          name: 'Frozenasd Yogurt',
          details:
            'Javascript This is me mate aha take on me in adday orRRRRR TWWOOOOWOWOWOOWOWO',
          calories: 234,
          fat: 'fas fa-js',
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Dante',
          details: 'Dante',
          calories: 234,
          fat: 'fas fa-js',
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Son',
          details: 'Im a SUPER SAIYAN SOOONNNN GOKU !!!',
          calories: 234,
          fat: 'fas fa-js',
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Vergil',
          details: 'Vergil (Sparda)',
          calories: 234,
          fat: 'fas fa-js',
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
