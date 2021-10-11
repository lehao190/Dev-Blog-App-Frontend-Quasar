<template>
  <q-page class="edit-wrapper q-px-sm q-py-xl">
    <div class="text-center text-h4 text-weight-bold text-secondary q-mb-md">
      Tạo Thẻ
    </div>

    <!-- Edit Profile Section -->
    <div class="bg-white rounded-borders q-pa-md">
      <div class="q-gutter-y-lg">
        <!-- Tag's Name -->
        <div>
          <div class="q-mb-sm">Tên thẻ</div>
          <q-input filled />
        </div>

        <!-- Tag's Icon -->
        <div>
          <div class="q-mb-sm">Icon</div>
          <q-input filled />
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <q-btn color="secondary" class="full-width text-bold" label="Tạo" />
    </div>
  </q-page>
</template>

<script>
export default {};
</script>
