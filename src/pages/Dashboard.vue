<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="text-h4 text-bold">
      Dashboard
    </div>

    <!-- Dashboard Section -->
    <div class="row q-mt-lg q-gutter-x-md">
      <!-- Choosing options -->
      <div class="col-3 bg-accent">
        <q-btn
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Bài viết"
          no-caps
        />
        <q-btn
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Thẻ"
          no-caps
        />
        <q-btn
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Bài viết đã lưu"
          no-caps
        />
        <q-btn
          class="full-width bg-accent text-weight-thin"
          unelevated
          align="left"
          label="Người dùng"
          no-caps
        />
      </div>

      <!-- Dashboard Data -->
      <div class="col rounded-borders">
        <div class="text-right q-mr-xs q-mb-sm q-gutter-sm">
          <q-btn
            class="text-bold"
            color="secondary"
            icon="add"
            label="Tạo"
            no-caps
          />
          <q-btn
            class="text-bold"
            color="negative"
            icon="clear"
            label="Xóa"
            no-caps
          />
        </div>

        <q-table :data="data" :columns="columns" row-key="name">
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
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
        { name: 'fat', label: 'Tên người', field: 'fat', align: 'center' },
        { name: 'carbs', label: 'Tạo lúc', field: 'carbs', align: 'center' },
        { name: 'protein', label: 'Sửa lúc', field: 'protein', align: 'center' }
      ],

      data: [
        {
          name: 'Frozenasd Yogurt',
          details: 'Javascript',
          calories: 234,
          fat: 6.0,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        },
        {
          name: 'Frozenasd Yogurt',
          details: 'Javascript',
          calories: 234,
          fat: 6.0,
          carbs: '2/4/2021',
          protein: '5/9/2021'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
