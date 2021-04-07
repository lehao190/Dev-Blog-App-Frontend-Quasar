<template>
  <div>
    <q-separator />

    <q-card-section>
      <div class="relative-position q-gutter-sm">
        <!-- User's Avatar -->
        <router-link to="user"
          ><q-avatar size="lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" /> </q-avatar
        ></router-link>

        <!-- User's Post creation date -->
        <span class="absolute text-caption">
          <div>
            <router-link class="text-grey-8" to="about"
              >Lê Minh Hào</router-link
            >
          </div>
          <div>
            <router-link class="text-grey-8" to="date">16/4/2020</router-link>
          </div>
        </span>
      </div>
      <router-link to="post"
        ><div class="q-mt-sm q-mb-xs user-post-text">
          Top 16 Browser Extensions For Increased Developer Productivity
        </div></router-link
      >
    </q-card-section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
