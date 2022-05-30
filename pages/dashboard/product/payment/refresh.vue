<template>
  <div class="container">
    <section>Please Wait...</section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: '',
  middleware: ['auth'],

  mounted() {
    // Go to setup account page
    this.$router.replace('/dashboard/product/manage/payment')
  },
})
</script>

<style scoped>
.container {
  width: 100%;
}

.container > section {
  @apply text-2xl text-gray-700 font-bold
    py-2;

  display: inline-block;
  margin: 0 auto;
}
</style>
