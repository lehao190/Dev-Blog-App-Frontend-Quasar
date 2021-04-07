<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div class="row q-col-gutter-md">
      <!-- Left sidebar -->
      <aside class="col-3 gt-sm">
        <!-- Intro Section -->
        <IntroSec />

        <!-- User's Navigation Bar -->
        <UserNav />

        <!-- User's Navigation Tags -->
        <UserNavTag />
      </aside>

      <!-- Users's Posts -->
      <div class="col q-gutter-sm">
        <div class="text-weight-bold text-h6">Posts</div>

        <!-- Post Section -->
        <section>
          <Post/>
          <Post/>
          <Post/>
        </section>
      </div>

      <!-- Right sidebar -->
      <aside class="col-3 gt-md">
        <!-- User's Pinned Posts -->
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Bài viết đã lưu</div>
          </q-card-section>

          <PinnedPost />

          <PinnedPost />
        </q-card>
      </aside>
    </div>
  </q-page>
</template>

<script>
import IntroSec from '../components/home_page/IntroSec'
import UserNav from '../components/home_page/UserNav'
import UserNavTag from '../components/home_page/UserNavTag'
import PinnedPost from '../components/home_page/PinnedPost'
import Post from '../components/home_page/Post'

export default {
  name: 'PageIndex',
  components: {
    IntroSec,
    UserNav,
    UserNavTag,
    PinnedPost,
    Post
  }
}
</script>
