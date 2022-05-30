<template>
  <div class="">
    <Loading />
    <TheBusinessNav />

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

    <!-- footer desktop -->
    <div class="footer hidden sm:inline">
      <footer
        class="items-center p-4 footer text-black z-50 sm:py-8 sm:mx-0 mx-auto"
      >
        <div class="sm:ml-10">
          <div class="items-center grid-flow-col">
            <nuxt-link to="/">
              <p class="text-center">Copyright @ 2022 GreenCheddar Ltd.</p>
            </nuxt-link>
          </div>
          <div class="sm:w-36 w-48 sm:pt-0 pt-4">
            <img src="~assets/images/business/landing_page/UCL.png" alt="" />
          </div>
        </div>
        <div class="sm:ml-52">
          <nuxt-link to="/comingSoon">
            <p>Privacy Policy</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>Help</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>T&C</p>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/comingSoon">
            <p>Become an Influencer</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>Businesses</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>Carbon Tokens</p>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/comingSoon">
            <p>FAQ?</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>How it works</p>
          </nuxt-link>
          <div
            class="
              flex
              gap-x-4 gap-10
              md:place-self-start md:justify-self-start
            "
          >
            <a href="https://twitter.com/greencheddar21" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/greencheddar21/" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
    <!-- footer mobile -->
    <div class="footer sm:hidden">
      <footer
        class="items-center p-4 footer text-black z-50 sm:py-8 sm:mx-0 mx-auto"
      >
        <div class="w-full">
          <div class="items-center grid-flow-col w-full">
            <nuxt-link to="/">
              <p class="text-center">Copyright @ 2022 GreenCheddar Ltd.</p>
            </nuxt-link>
          </div>
          <div class="flex justify-center w-full items-center py-4">
            <img
              src="~assets/images/business/landing_page/UCL.png"
              alt=""
              class="w-28"
            />
          </div>
        </div>
        <div class="flex w-full justify-evenly">
          <div class="flex flex-col gap-y-2">
            <nuxt-link to="/comingSoon">
              <p>Privacy Policy</p>
            </nuxt-link>
            <nuxt-link to="/comingSoon">
              <p>Help</p>
            </nuxt-link>
            <nuxt-link to="/comingSoon">
              <p>T&C</p>
            </nuxt-link>
          </div>
          <div class="flex flex-col gap-y-2">
            <nuxt-link to="/comingSoon">
              <p>Become an Influencer</p>
            </nuxt-link>
            <nuxt-link to="/comingSoon">
              <p>Businesses</p>
            </nuxt-link>
            <nuxt-link to="/comingSoon">
              <p>Carbon Tokens</p>
            </nuxt-link>
          </div>
        </div>
        <div class="flex w-full justify-evenly">
          <nuxt-link to="/comingSoon">
            <p>FAQ?</p>
          </nuxt-link>
          <nuxt-link to="/comingSoon">
            <p>How it works</p>
          </nuxt-link>
          <div class="flex gap-x-4">
            <a href="https://twitter.com/greencheddar21" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/greencheddar21/" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheBusinessNav from '~/components/TheBusinessNav.vue'
export default Vue.extend({
  components: { TheBusinessNav },
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
