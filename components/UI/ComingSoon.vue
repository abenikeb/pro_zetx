<template>
  <!-- component -->
  <div class="w-full md:px-20 px-6 mt-40">
    <div
      class="
        md:w-5/6
        w-full
        mx-auto
        h-1/2
        flex flex-row-reverse
        justify-center
        items-center
      "
    >
      <div
        class="
          flex
          items-center
          text-center
          lg:text-left
          px-5
          md:px-12
          lg:w-1/2
        "
      >
        <div>
          <span class="text-2xl font-semibold text-gray-800 md:text-4xl"
            >Coming<span class="ml-2 text-accent-focus">Soon...</span></span
          >
          <h1
            v-if="title == 'gaiaverse'"
            class="py-5 text-5xl font-semibold text-gray-800 md:text-6xl"
          >
            Gaia<span class="text-accent-focus">Verse</span>
          </h1>

          <h1
            v-else
            class="py-5 text-3xl font-semibold text-gray-800 md:text-5xl"
          >
            GreenCheddar <span class="text-accent-focus">{{ title }}</span>
          </h1>

          <p class="mt-2 text-sm text-gray-500 md:text-lg">
            {{ details }}
          </p>
          <nuxt-link class="btn btn-accent btn-sm mt-5" to="/"
            ><a class="fa fa-arrow-left mr-2"></a> Home</nuxt-link
          >
        </div>
      </div>
      <div class="hidden md:block md:w-1/2">
        <img
          class="w-full rounded-md"
          src="~/assets/images/Gaiaverse.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ComingSoon',
  props: {
    title: {
      type: String,
      default: 'gaiaverse',
    },
    details: {
      type: String,
      default: '',
    },
  },
})
</script>
