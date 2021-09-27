<template>
  <q-page class="main-wrapper q-px-sm q-py-lg">
    <div>
      <textarea id="aha" v-model="text" @click="onClick"/>
      <vue-markdown :source="text"></vue-markdown>
    </div>
    
    <!-- <div class="row bg-white">
      
    </div> -->
  </q-page>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  data() {
    return {
      text: "# Some Text my dude"
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    onClick () {
      console.log(this.text)
      console.log(JSON.stringify(this.text))
    }
  }
};
</script>
