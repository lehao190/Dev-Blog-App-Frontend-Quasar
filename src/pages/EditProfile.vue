<template>
  <q-page class="edit-wrapper q-px-sm q-py-xl">
    <div class="text-center text-h4 text-weight-bold text-secondary q-mb-md">
      Chỉnh Sửa Hồ Sơ
    </div>

    <!-- Edit Profile Section -->
    <div class="bg-white rounded-borders q-pa-md">
      <div class="q-gutter-y-lg">
        <div class="text-h6 text-weight-bold">
          User
        </div>

        <!-- User's Name -->
        <div>
          <div class="q-mb-sm">Họ Tên</div>
          <q-input filled />
        </div>

        <!-- User's Email -->
        <div>
          <div class="q-mb-sm">Email</div>
          <q-input filled />
        </div>

        <!-- User's Avatar -->
        <div class="row q-gutter-x-xs">
          <div class="col-12 q-mb-sm">Hình Đại Diện</div>

          <q-avatar size="55px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <q-file class="col" filled />
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <q-btn color="secondary" class="full-width text-bold" label="Lưu Hồ Sơ" />
    </div>
  </q-page>
</template>

<script>
export default {};
</script>
