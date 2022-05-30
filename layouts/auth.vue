<template>
  <div class="">
    <!-- <div id="google_translate_element" class="fixed top-40 right-10 z-50"></div>

    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        )
      }
    </script>

    <script
      type="text/javascript"
      src="https://translate.google.com/translate_a/element.js?
        cb=googleTranslateElementInit"
    ></script> -->
    <Loading />
    <TheAuthNav />
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
        class="
          opacity-50
          hover:opacity-80
          fixed
          bottom-8
          md:bottom-16
          right-5
          w-12
          z-40
        "
        src="~/assets/images/up-arrow.svg"
        alt=""
      />
    </a>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheAuthNav from '~/components/TheAuthNav.vue'
import TheFooter from '~/components/TheFooter.vue'
import Loading from '~/components/UI/Loading.vue'

export default Vue.extend({
  components: {
    TheAuthNav,
    TheFooter,
    Loading,
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.backToTop()
      }
    },
  },

  created() {
    const channel = this.$route.query.channel
    if (channel) {
      this.$store.dispatch('analytics/addImpression', channel)
    }
  },

  updated() {
    this.backToTop()
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
