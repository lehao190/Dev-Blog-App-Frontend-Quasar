<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    const isAuthenticated = this.$q.localStorage.getItem('isAuthenticated')

    // Get authenticated user
    this.$store.dispatch({
      type: 'user/me'
    })

    // if (
    //   isAuthenticated === null ||
    //   isAuthenticated === undefined ||
    //   !isAuthenticated
    // ) {
    //   // Set to false for unauthenticated user
    //   this.$q.localStorage.set('isAuthenticated', false)
    // } else {
    //   // Get authenticated user
    //   this.$store.dispatch({
    //     type: 'user/me'
    //   })
    // }
  }
}
</script>
