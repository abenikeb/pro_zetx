<template>
  <div class="relative">
    <nav class="desktop-nav text-sm">
      <nuxt-link
        to="/business"
        class="flex items-center text-xs font-bold text-accent align-bottom"
      >
        <img src="~/assets/images/logo.svg" class="w-16" alt="" />
        <div>
          <h1 class="text-accent text-sm pl-3">GreenCheddar</h1>
        </div>
      </nuxt-link>
      <div class="flex justify-center ml-20 items-center text-black">
        <nuxt-link class="mx-2 hover:text-gray-500 text-base" to="/"
          >Consumer</nuxt-link
        >
        <nuxt-link class="mx-2 hover:text-gray-500 text-base" to="/comingSoon"
          >Influencers</nuxt-link
        >
        <nuxt-link class="mx-2 hover:text-gray-500 text-base" to="/comingSoon"
          >Carbon Tokens</nuxt-link
        >
      </div>
      <div class="auth-links">
        <nuxt-link class="mr-16 text-black hover:text-gray-500" to="/comingSoon"
          >FAQ?</nuxt-link
        >
        <nuxt-link
          to="/business/setup"
          class="btn btn-link btn-xs text-gray-600 normal-case"
          >Signup</nuxt-link
        >
        <nuxt-link
          to="/login"
          class="btn btn-accent btn-xs rounded-md normal-case"
          >Login</nuxt-link
        >
      </div>
    </nav>

    <nav class="mobile-nav">
      <nuxt-link to="/" class="flex items-center text-xl font-bold text-accent">
        <img src="~/assets/images/logo.svg" class="w-10" alt="" />
      </nuxt-link>
      <nuxt-link
        to="/"
        class="flex items-center text-lg mx-auto font-bold text-accent"
      >
        <p>GreenCheddar</p>
      </nuxt-link>
      <div v-if="!sidenavActive" @click="sidenavActive = true">
        <i class="fa fa-bars text-accent text-3xl"></i>
      </div>
      <div v-else @click="sidenavActive = false">
        <i class="fa fa-times text-accent text-3xl"></i>
      </div>
    </nav>

    <div v-if="sidenavActive" class="sidenav">
      <nuxt-link
        class="text-lg mb-2"
        to="/"
        @click.native="sidenavActive = false"
        >Home</nuxt-link
      >
      <nuxt-link
        class="text-lg mb-2"
        to="/comingSoon"
        @click.native="sidenavActive = false"
        >Businesses</nuxt-link
      >
      <!-- <nuxt-link class="text-lg mb-2 ml-5" to="">About Us</nuxt-link> -->
      <nuxt-link
        class="text-lg mb-2"
        to="/comingSoon"
        @click.native="sidenavActive = false"
        >Influencers</nuxt-link
      >
      <nuxt-link
        class="text-lg mb-2"
        to="/comingSoon"
        @click.native="sidenavActive = false"
        >FAQ?</nuxt-link
      >
      <!-- <nuxt-link
        class="text-lg mb-2"
        to="/contact"
        @click.native="sidenavActive = false"
        >Contact</nuxt-link
      > -->
      <div class="w-full flex items-center justify-between">
        <button
          class="btn btn-sm rounded-full border-accent bg-accent items-center"
        >
          <nuxt-link class="text-white mb-2 text-sm" to="/busiess/setup"
            >Signup</nuxt-link
          >
        </button>
        <nuxt-link to="/login" class="btn btn-link text-gray-600 btn-sm ml-5"
          >Login</nuxt-link
        >
      </div>
    </div>
    <div
      v-if="sidenavActive"
      class="bg-black bg-opacity-50 fixed top-0 left-0 z-40 w-screen h-screen"
      @click="sidenavActive = false"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'guest',
  data() {
    return {
      sidenavActive: false,
    }
  },
})
</script>

<style scoped>
nav {
  @apply w-full  px-16 flex justify-between items-center h-20  bg-white  top-0 left-0;
}
.desktop-nav {
  @apply hidden sm:flex;
}
.desktop-nav a.nuxt-link-active {
  @apply text-gray-500 font-bold;
}
.mobile-nav {
  @apply sm:hidden  px-5;
}
.sidenav {
  @apply w-3/5 md:hidden py-5 px-6 fixed rounded-lg top-14 right-0 bg-white shadow text-gray-800 z-50 flex flex-col justify-start items-start;
  animation: slidein 0.4s forwards;
}
@keyframes slidein {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
