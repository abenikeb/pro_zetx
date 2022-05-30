<template>
  <div class="w-full flex flex-col md:flex-row justify-start items-start">
    <div class="measure-nav">
      <div
        :class="{ activeMeasure: settingSection == 'profile' }"
        @click="settingSection = 'profile'"
      >
        <img src="~/assets/images/userProfile.svg" alt="" />
        <h1 class="hidden md:block">Profile</h1>
      </div>
      <div
        :class="{ activeMeasure: settingSection == 'security' }"
        @click="settingSection = 'security'"
      >
        <img src="~/assets/images/gearAdmin.svg" alt="" />
        <h1 class="hidden md:block">Security</h1>
      </div>
    </div>

    <div
      class="
        flex flex-row
        w-full
        justify-evenly
        md:hidden
        bg-white
        shadow-lg
        rounded
      "
    >
      <div
        class="
          flex
          justify-start
          items-center
          px-5
          py-3
          text-gray-600
          hover:text-black
          cursor-pointer
          border-b
          w-full
          hover:bg-accent hover:bg-opacity-20
          text-sm
        "
        :class="{ activeMeasure: settingSection == 'profile' }"
        @click="settingSection = 'profile'"
      >
        <img class="w-5" src="~/assets/images/userProfile.svg" alt="" />
        <h1 class="">Profile</h1>
      </div>
      <div
        class="
          flex
          justify-start
          items-center
          px-5
          py-3
          text-gray-600
          hover:text-black
          cursor-pointer
          border-b
          w-full
          hover:bg-accent hover:bg-opacity-20
          text-sm
        "
        :class="{ activeMeasure: settingSection == 'security' }"
        @click="settingSection = 'security'"
      >
        <img class="w-5" src="~/assets/images/gearAdmin.svg" alt="" />
        <h1 class="">Security</h1>
      </div>
    </div>

    <div class="measure-input">
      <profile v-if="settingSection == 'profile'" />
      <security v-if="settingSection == 'security'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import profile from '~/components/settings/profile.vue'
import security from '~/components/settings/security.vue'

export default Vue.extend({
  components: {
    profile,
    security,
  },
  data() {
    return {
      settingSection: 'profile',
    }
  },
})
</script>

<style scoped>
.measure-nav {
  @apply hidden md:flex flex-col justify-start items-start w-1/6 bg-white shadow-md rounded-md border;
}

.measure-nav > div {
  @apply flex justify-start items-center px-5 py-3 text-gray-600 hover:text-black cursor-pointer border-b w-full hover:bg-accent hover:bg-opacity-20 text-sm;
}

.measure-nav img {
  @apply w-6 mr-3;
}

.measure-input {
  @apply md:w-1/2 w-full flex flex-col justify-start items-start md:px-12 px-5;
}

.measure-result {
  @apply w-1/3 flex flex-col justify-start items-start pr-24 text-center;
}

.activeMeasure {
  @apply bg-accent bg-opacity-40 text-black font-semibold;
}
</style>
