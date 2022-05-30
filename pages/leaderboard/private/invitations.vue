<template>
  <div class="w-full flex flex-col justify-start items-center">
    <section
      class="
        container
        mx-auto
        flex flex-col
        md:flex-row md:justify-center
        justify-start
        md:items-start
        items-center
      "
    >
      <h1
        class="
          md:text-lg
          text-white
          font-semibold
          px-5
          py-2.5
          rounded-xl
          mr-2
          bg-red-700
        "
      >
        <i class="fa fa-lock"></i>
        Private
      </h1>

      <div>
        <!-- <nav
          class="
            rounded
            inner-nav
            bg-white
            shadow-lg
            h-10
            flex
            justify-center
            items-center
          "
        >
          <nuxt-link exact class="navitem" to="/dashboard"> London</nuxt-link>

          <nuxt-link class="navitem" to="#"> Birmingham</nuxt-link>
          <nuxt-link class="navitem" to="#"> Manchester</nuxt-link>
          <nuxt-link class="navitem" to="#"> Leeds</nuxt-link>
          <nuxt-link class="navitem" to="#"> Liverpool</nuxt-link>
          <nuxt-link class="navitem" to="#"> Lecister</nuxt-link>
          <nuxt-link class="navitem" to="#"> New Castle</nuxt-link>
        </nav> -->
        <nav
          class="
            rounded-xl
            secondary-inner-nav
            h-12
            w-full
            flex
            justify-center
            items-center
          "
        >
          <nuxt-link class="navitem" exact to="/leaderboard/private">
            Your leaderboards</nuxt-link
          >
          <nuxt-link
            class="navitem"
            exact
            to="/leaderboard/private/invitations"
          >
            Invitations</nuxt-link
          >
          <!-- <nuxt-link
            class="navitem"
            exact
            to="/leaderboard/private/invitations"
          >
            Competitions</nuxt-link
          > -->
        </nav>
      </div>
    </section>
    <h1 class="text-accent-focus text-lg md:text-xl font-bold mt-4">
      Invitations
    </h1>

    <div class="w-full md:w-2/3 mx-auto overflow-x-auto mt-4">
      <table class="table table-compact">
        <thead>
          <tr>
            <th>From</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr v-for="i in 4" :key="i" class="w-full">
            <td>Jane Doe</td>
            <td class="md:w-full w-36">
              <a class="link link-accent truncate text-2xs md:text-xs" href="#"
                >https://greencheddar.com/leaderboard/private/jfkf988fjk23hjk009d</a
              >
            </td>
            <td>
              <div
                class="w-20 md:w-24 flex justify-between text-2xs md:text-sm"
              >
                <span
                  class="
                    text-accent
                    bg-accent bg-opacity-30
                    rounded-full
                    px-3
                    py-3
                    fa fa-check
                    cursor-pointer
                  "
                ></span>
                <span
                  class="
                    text-red-700
                    bg-red-700 bg-opacity-30
                    rounded-full
                    px-3
                    py-3
                    fa fa-times
                    cursor-pointer
                  "
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  middleware: 'auth',
})
</script>

<style scoped>
.inner-nav > a {
  @apply transition-all duration-100 border-transparent border-b py-1.5 px-4 rounded;
}
.inner-nav > a:hover,
.inner-nav > a:active {
  @apply border-b border-gray-500 bg-gray-100;
}

.navitem {
  @apply mx-2 text-sm text-gray-500 hover:text-black flex justify-center items-center;
}

.inner-nav > a.nuxt-link-active {
  @apply border-b border-gray-500 text-black  bg-gray-200 rounded;
}

.secondary-inner-nav > a:hover,
.secondary-inner-nav > a:active {
  @apply border-b text-gray-900 font-semibold;
}

.secondary-inner-nav > a.nuxt-link-active {
  @apply text-black font-semibold;
}

.navitem-tab {
  @apply px-2.5 py-1 bg-transparent hover:bg-accent hover:bg-opacity-70 text-accent hover:text-white rounded-xl border hover:border-transparent border-accent mr-2;
}

.navitem-tab.active {
  @apply bg-accent text-white;
}
</style>
