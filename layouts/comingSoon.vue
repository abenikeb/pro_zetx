<template>
  <div style="background-color: #2f784b">
    <Loading />

    <Nuxt class="" />
    <div class="footer hidden sm:inline">
      <footer
        class="items-center p-4 footer text-accent-content z-50 sm:py-8 sm:mx-0 mx-auto"
      >
        <div class="sm:ml-10">
          <div class="items-center grid-flow-col">
            <nuxt-link to="/">
              <p class="text-center">Copyright @ 2022 GreenCheddar Ltd.</p>
            </nuxt-link>
          </div>
          <div class="sm:w-36 w-48 sm:pt-0 pt-4">
            <img src="~/assets/images/landing/ucl.png" alt="" />
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
            class="flex gap-x-4 gap-10 md:place-self-start md:justify-self-start"
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
    <div class="footer sm:hidden">
      <footer
        class="items-center p-4 footer text-accent-content z-50 sm:py-8 sm:mx-0 mx-auto"
      >
        <div class="w-full">
          <div class="items-center grid-flow-col w-full">
            <nuxt-link to="/">
              <p class="text-center">Copyright @ 2022 GreenCheddar Ltd.</p>
            </nuxt-link>
          </div>
          <div class="flex justify-center w-full items-center py-4">
            <img src="~/assets/images/landing/ucl.png" alt="" class="w-28" />
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
import Loading from '~/components/UI/Loading.vue'

export default Vue.extend({
  components: {
    Loading,
  },

  created() {
    const channel = this.$route.query.channel
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

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #2f784b;
}
</style>
