<template>
  <div>
    <div class="hidden md:inline">
      <div class="border-t-4 border-white md:mx-10">
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
              <a
                href="https://www.instagram.com/greencheddar21/"
                target="_blank"
              >
                <i class="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div class="md:hidden">
      <div class="border-t-4 border-white md:mx-10">
        <footer
          class="items-center p-4 footer text-accent-content z-50 sm:py-8 sm:mx-0 mx-auto"
        >
          <div class="w-full">
            <div class="items-center grid-flow-col w-full">
              <nuxt-link to="/comingSoon">
                <p class="text-center">Copyright @ 2022 GreenCheddar Ltd.</p>
              </nuxt-link>
            </div>
            <div class="flex justify-center w-full items-center pt-4">
              <img src="~/assets/images/landing/ucl.png" alt="" class="w-48" />
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
              <a
                href="https://www.instagram.com/greencheddar21/"
                target="_blank"
              >
                <i class="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="css" scoped></style>
