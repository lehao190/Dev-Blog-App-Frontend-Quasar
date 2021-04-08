<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <h5 class="text-h5 text-weight-bold">Tags</h5>

    <div class="row q-py-md q-col-gutter-lg">
        <!-- Display Tags -->
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
    </div>
  </q-page>
</template>

<script>
import Tag from '../components/tags_page/Tag'

export default {
  components: {
    Tag
  }
}
</script>
