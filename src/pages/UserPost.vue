<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="row q-gutter-md">
      <!-- Likes, Saved Posts -->
      <div class="col-1 relative-position">
        <!-- Likes -->
        <div class="fixed text-center" style="top: 130px; margin-left: 25px;">
          <q-btn
            round
            size="22px"
            unelevated
            :color="1 === 1 ? 'accent' : 'blue'"
            :text-color="1 === 1 ? 'grey' : 'blue'"
            icon="favorite"
          />
          <div class="absolute-bottom">39</div>
        </div>

        <!-- Saved Posts -->
        <div class="fixed text-center" style="top: 200px; margin-left: 25px;">
          <q-btn
            round
            size="22px"
            unelevated
            :color="1 === 1 ? 'accent' : 'blue'"
            :text-color="1 === 1 ? 'secondary' : 'blue'"
            icon="bookmark"
          />
          <div class="absolute-bottom text-secondary">4</div>
        </div>
      </div>

      <!-- Markdown Post Content Section -->
      <div class="col bg-white text-h2 rounded-borders">
        Take on me
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae soluta
        pariatur iure numquam neque quam ducimus dolore quos ipsum laborum,
        maxime sunt enim eveniet aut ea quasi sed labore consequatur? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Quae soluta pariatur
        iure numquam neque quam ducimus dolore quos ipsum laborum, maxime sunt
        enim eveniet aut ea quasi sed labore consequatur? Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Quae soluta pariatur iure numquam
        neque quam ducimus dolore quos ipsum laborum, maxime sunt enim eveniet
        aut ea quasi sed labore consequatur? Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Quae soluta pariatur iure numquam neque
        quam ducimus dolore quos ipsum laborum, maxime sunt enim eveniet aut ea
        quasi sed labore consequatur? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quae soluta pariatur iure numquam neque quam ducimus
        dolore quos ipsum laborum, maxime sunt enim eveniet aut ea quasi sed
        labore consequatur? Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Quae soluta pariatur iure numquam neque quam ducimus dolore quos
        ipsum laborum, maxime sunt enim eveniet aut ea quasi sed labore
        consequatur? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Quae soluta pariatur iure numquam neque quam ducimus dolore quos ipsum
        laborum, maxime sunt enim eveniet aut ea quasi sed labore consequatur?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae soluta
        pariatur iure numquam neque quam ducimus dolore quos ipsum laborum,
        maxime sunt enim eveniet aut ea quasi sed labore consequatur? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Quae soluta pariatur
        iure numquam neque quam ducimus dolore quos ipsum laborum, maxime sunt
        enim eveniet aut ea quasi sed labore consequatur?
      </div>

      <!-- User's Info section -->
      <div class="col-3 gt-sm">
        <div
          id="user-section"
          class="bg-grey-1 rounded-borders fixed q-pa-md"
          style="top: 86px; margin-left: 0px; width: 320px;"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <span class="q-ml-sm text-body1 text-weight-bold">Lê Minh Hào</span>

          <div class="q-mt-sm text-body2 text-weight-medium">
            Tham gia vào
          </div>
          <div class="">
            <q-avatar
              rounded
              size="md"
              color="gray-1"
              text-color="dark"
              icon="fas fa-birthday-cake"
            />
            3/9/2021
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
@media only screen and (max-width: 1284px) {
  #user-section {
    width: 25% !important;
  }
}
</style>
