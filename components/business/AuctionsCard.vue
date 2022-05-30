<template>
  <div class="container">
    <nuxt-link :to="`/business/dashboard/carbon/${card.to}`">
      <div class="flex flex-col justify-center items-center">
        <div class="container-head">
          <img
            class="h-8 w-8"
            :src="require(`@/assets/images/business/${card.img}`)"
            alt="Man looking at item at a store"
          />
        </div>
        <div class="p-8">
          <div class="container-title">{{ card.title }}</div>
          <p class="container-body">{{ card.body_text }}</p>
          <button></button>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['card'],
})
</script>

<style scoped>
.container {
  @apply max-w-md
        mx-auto
        bg-white
        opacity-100 
        hover:bg-gray-100
        hover:opacity-90
        transition duration-300 
        ease-in-out
        rounded-xl
        shadow-md
        ring-1
        md:ring-0
        ring-gray-100
        overflow-hidden
        md:max-w-2xl
        pt-4;
}

/* .container > a.nuxt-link-active {
  @apply contrast-150;
} */

.container-head {
  @apply bg-gray-300
        h-16
        w-16
        rounded-full
        flex
        justify-center
        items-center;
}
.container-title {
  @apply uppercase tracking-wide text-center text-accent font-bold;
}
.container-body {
  @apply block
        mt-2
        leading-tight
        font-medium
        italic
        text-gray-700 text-center text-sm;
}
</style>
