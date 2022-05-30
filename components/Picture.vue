<template>
  <div
    v-viewer="{
      inline: false,
      movable: true,
      button: true,
      navbar: false,
      title: false,
      toolbar: true,
      tooltip: false,
      movable: true,
      zoomable: true,
      rotatable: false,
      scalable: false,
      transition: true,
      fullscreen: false,
      keyboard: true,
    }"
    class="md:w-full md:h-96 md:object-cover md:cursor-pointer "
  >
    <!-- <viewer class="w-56 h-96 object-cover "> -->
    <img :src="src" alt="No image" class="md:mx-auto md:h-full" />
    <!-- </viewer> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: String,
    alt: String,
  },
})
</script>

<style scoped>
</style>