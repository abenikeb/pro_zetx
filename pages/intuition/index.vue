<template>
  <div>
    <div
      class="
        w-full
        flex
        justify-evenly
        items-center
        flex-wrap
        px-5
        md:px-20
        gap-5
        md:gap-0
      "
    >
      <nuxt-link to="/intuition/about" class="intuition-card">
        <img class="w-10" src="~/assets/images/info.png" alt="" />
        <h1 class="font-bold text-xl mb-2 text-accent-focus">About us</h1>

        <p>GreenCheddar is here to help you to the road to net zero.</p>
        <button class="btn btn-sm btn-accent">view more</button>
      </nuxt-link>

      <nuxt-link to="/intuition/support" class="intuition-card">
        <img class="w-10" src="~/assets/images/customer-service.png" alt="" />
        <h1 class="font-bold text-xl mb-2 text-accent-focus">Support</h1>
        <p>Have any questions? We’d love to hear from you.</p>
        <button class="btn btn-sm btn-accent">view more</button>
      </nuxt-link>
    </div>

    <div
      class="
        w-full
        flex
        justify-evenly
        items-center
        flex-wrap
        px-5
        md:px-20
        py-5
      "
    >
      <nuxt-link to="/intuition/faq" class="intuition-card">
        <img class="w-10" src="~/assets/images/conversation.png" alt="" />
        <h1 class="font-bold text-xl mb-2 text-accent-focus">FAQ</h1>

        <p>
          Get instant answers to the most common questions and learn how to use
          GreenCheddar like a pro.
        </p>
        <button class="btn btn-sm btn-accent">view more</button>
      </nuxt-link>
    </div>

    <div
      class="
        w-full
        flex
        justify-evenly
        items-center
        flex-wrap
        px-5
        gap-5
        md:gap-0 md:px-20
      "
    >
      <nuxt-link to="/intuition/terms" class="intuition-card">
        <img
          class="w-10"
          src="~/assets/images/terms-and-conditions.png"
          alt=""
        />
        <h1 class="font-bold text-xl mb-2 text-accent-focus">Common terms</h1>

        <p>
          Get acquainted with some of the definitions of terms used throughout
          GreenCheddar.
        </p>
        <button class="btn btn-sm btn-accent">view more</button>
      </nuxt-link>
      <nuxt-link to="/intuition/content" class="intuition-card">
        <img class="w-10" src="~/assets/images/content.png" alt="" />
        <h1 class="font-bold text-xl mb-2 text-accent-focus">Content</h1>

        <p>Digital gardens, blogs, NFTs and more. Coming soon!</p>
        <button class="btn btn-sm btn-accent">view more</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
.intuition-card {
  @apply bg-gray-50 hover:bg-white shadow-lg border rounded-xl md:w-80 min-h-full h-56 hover:shadow-2xl transition-all duration-200 flex flex-col justify-between items-center p-4 text-center;
}

.intuition-card:hover {
  @apply py-3;
}

p {
  @apply text-sm;
}
</style>
