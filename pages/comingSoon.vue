<template>
  <div class="w-full mt-auto bg-white">
    <div class="hidden md:inline">
      <!-- Nav -->
      <section class="w-full flex justify-between items-center pt-4">
        <div class="flex justify-evenly items-center sm:ml-28 ml-5">
          <nuxt-link
            class="sm:pl-3 text-black hover:text-gray-500 text-lg"
            to="/"
          >
            <span class="fa fa-chevron-left"></span>
            <span class="font-bold text-base">Back to home</span>
          </nuxt-link>
        </div>
        <nuxt-link
          to="/"
          class="
            flex
            items-center
            text-xs
            font-bold
            text-accent
            align-bottom
            sm:mr-28
            mr-5
          "
        >
          <img src="~/assets/images/logo.svg" class="w-12" alt="" />
          <div>
            <h1 class="text-accent text-sm pl-3">GreenCheddar</h1>
          </div>
        </nuxt-link>
      </section>

      <!-- Coming Soon -->
      <section class="w-full sm:flex ustify-center">
        <div class="sm:w-1/2 w-full pl-28 sm:my-0 my-5">
          <img
            src="~/assets/images/landing/Elk126.png"
            alt=""
            class="sm:w-3/5 w-3/4"
          />
        </div>

        <div
          class="sm:w-1/2 w-full text-left sm:items-start items-center my-auto"
        >
          <h1
            class="text-black text-4xl font-bold pb-2 sm:text-left text-center"
          >
            Coming Soon
          </h1>
          <p
            class="
              text-black text-lg
              sm:w-1/2
              w-full
              sm:pb-10
              pb-4
              sm:text-left
              text-center
            "
          >
            Be the first one to get notified when the page gets ready.
          </p>

          <div
            class="
              flex flex-col
              justify-center
              sm:items-start
              w-full
              items-center
            "
          >
            <div class="sm:flex justify-center items-center">
              <input
                class="input-md bg-gray-200 text-md placeholder-gray-400"
                placeholder="example@gmail.com"
                type="text"
              />
              <button
                style="background-color: #2a9156"
                class="btn ml-2 btn-md text-white"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="hidden xsm:inline">
      <section class="w-full flex justify-between items-center pt-2">
        <div class="flex justify-evenly items-center sm:ml-28 ml-3">
          <nuxt-link
            class="sm:pl-3 text-black hover:text-gray-500 text-lg"
            to="/"
          >
            <span class="fa fa-chevron-left"></span>
            <span class="font-bold text-base">Back to home</span>
          </nuxt-link>
        </div>
        <nuxt-link
          to="/"
          class="
            flex
            items-center
            text-xs
            font-bold
            text-accent
            align-bottom
            mr-3
          "
        >
          <img src="~/assets/images/logo.svg" class="w-12" alt="" />
          <div>
            <h1 class="text-accent text-sm pl-3">GreenCheddar</h1>
          </div>
        </nuxt-link>
      </section>

      <!-- Coming Soon -->
      <section class="w-full justify-center">
        <div class="w-full pl-28 my-2 items-center">
          <img src="~/assets/images/landing/Elk126.png" alt="" class="w-1/2" />
        </div>

        <div
          class="sm:w-1/2 w-full text-left sm:items-start items-center my-auto"
        >
          <h1
            class="text-black text-4xl font-bold pb-2 sm:text-left text-center"
          >
            Coming Soon
          </h1>
          <p
            class="
              text-black text-lg
              sm:w-1/2
              w-full
              sm:pb-10
              pb-4
              sm:text-left
              text-center
            "
          >
            Be the first one to get notified when the page gets ready.
          </p>

          <div
            class="
              flex flex-col
              justify-center
              sm:items-start
              w-full
              items-center
            "
          >
            <div class="sm:flex justify-center items-center">
              <input
                class="input-md bg-gray-200 text-md placeholder-gray-400"
                placeholder="example@gmail.com"
                type="text"
              />
              <button
                style="background-color: #2a9156"
                class="btn ml-2 btn-md text-white"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="md:hidden xsm:hidden">
      <section class="w-full flex justify-between items-center pt-4">
        <div class="flex justify-evenly items-center ml-5">
          <nuxt-link class="text-black hover:text-gray-500 text-lg" to="/">
            <span class="fa fa-chevron-left"></span>
            <span class="font-bold text-base">Back to home</span>
          </nuxt-link>
        </div>
        <nuxt-link
          to="/"
          class="
            flex
            items-center
            text-xs
            font-bold
            text-accent
            align-bottom
            mr-5
          "
        >
          <img src="~/assets/images/logo.svg" class="w-12" alt="" />
          <div>
            <h1 class="text-accent text-sm pl-3">GreenCheddar</h1>
          </div>
        </nuxt-link>
      </section>

      <!-- Coming Soon -->
      <section class="w-full justify-center">
        <div class="w-full pl-28 my-5">
          <img src="~/assets/images/landing/Elk126.png" alt="" class="w-3/4" />
        </div>

        <div class="w-full text-left items-center my-auto">
          <h1 class="text-black text-4xl font-bold pb-2 text-center">
            Coming Soon
          </h1>
          <p class="text-black text-lg w-full pb-4 text-center">
            Be the first one to get notified when the page gets ready.
          </p>

          <div class="flex flex-col justify-center w-full items-center">
            <div class="justify-center items-center">
              <input
                class="input-md bg-gray-200 text-md placeholder-gray-400"
                placeholder="example@gmail.com"
                type="text"
              />
              <button
                style="background-color: #2a9156"
                class="btn ml-2 btn-md text-white"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  // async created() {
  //   await this.$fire.auth.signOut()
  // },
  components: {},
  layout: 'comingSoon',
  middleware: 'guest',
})
</script>

<style scoped></style>
