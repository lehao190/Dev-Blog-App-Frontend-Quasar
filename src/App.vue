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

    // this.$socket.on('users hello', data => {
    //   console.log('from server mate: ', data)
    // })

    const audio = new Audio(require('./audio/tmobile.mp3'))
    this.$socket.on('aha2', data => {
      if (data) {
        console.log('data: ', data)

        audio.play()

        this.$q.notify({
          type: 'positive',
          message: `This is a "positive" type notification.`
        })
      }
    })
  }
}
</script>
