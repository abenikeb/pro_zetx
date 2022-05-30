<template>
  <div style="background-color: #2f784b">
    <Loading />
    <TheNav />

    <Nuxt class="min-h-screen mt-20" />
    <a class="cursor-pointer" @click="backToTop">
      <!-- <span
        class="
          fas
          fa-chevron-up
          px-4
          py-2
          rounded-full
          opacity-50
          hover:opacity-80
          fixed
          bottom-5
          right-5
          bg-accent
          text-white
          transition
          duration-200
          z-0
        "
        >back to top</span
      > -->
      <img
        class="opacity-50 hover:opacity-80 fixed bottom-8 md:bottom-16 right-5 w-12 z-40"
        src="~/assets/images/up-arrow.svg"
        alt=""
      />
    </a>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheNav from '~/components/TheNav.vue'
import TheFooter from '~/components/TheFooter.vue'
import Loading from '~/components/UI/Loading.vue'

export default Vue.extend({
  components: {
    TheNav,
    TheFooter,
    Loading,
  },

  created() {
    const channel = this.$route.query.channel
    console.log(channel)
    if (channel) {
      this.$store.dispatch('analytics/addImpression', channel)
    }
  },

  methods: {
    backToTop() {
      if (process.browser) {
        window.scrollTo(0, 0)
      }
    },
  },
})
</script>
