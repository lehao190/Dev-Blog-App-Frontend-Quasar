<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // Get authenticated user
    this.$store.dispatch({
      type: 'user/me'
    })
      .catch(() => {
        return
      })
  }
}
</script>
