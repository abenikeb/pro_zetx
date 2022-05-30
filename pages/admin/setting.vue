<template>
  <div class="flex flex-col md:w-full items-start">
    <h1 class="ml-10 mt-3 mb-5 font-bold text-2xl">Settings</h1>
    <!-- the sidebar section -->
    <div class="flex flex-col justify-start items-center">
      <div class="flex flex-row items-start md:w-full">
        <div
          class="
            ml-10
            mb-5 
            w-24
            h-24
            md:w-32
            md:h-32
            overflow-hidden
            rounded-full
            border-2 border-accent
            shadow-lg
          "
        >
          <img
            class="w-full h-full bg-accent bg-opacity-20"
            :src="user ? `https://robohash.org/${user.email}.png?set=set3` : ''"
          />
        </div>
        <h1
          v-if="settingSection == 'General'"
          class="hidden md:inline-block ml-48 mt-3 mb-5 font-bold text-xl"
        >
          General Account Setting
        </h1>
        <h1
          v-if="settingSection == 'Security'"
          class="hidden md:inline-block ml-48 mt-3 mb-5 font-bold text-xl"
        >
          Account Security Setting
        </h1>
      </div>
    </div>
    <!-- the selected tab content secton -->
    <div class="md:w-full flex md:flex-row flex-col justify-start items-start">
      <div class="setting-nav">
        <div
          id="general"
          :class="{ activeSetting: settingSection == 'General' }"
          @click="settingSection = 'General'"
        >
          <img src="~/assets/images/gearAdmin.svg" alt="" />
          <h1 id="general">General</h1>
        </div>
        <div
          id="security"
          :class="{ activeSetting: settingSection == 'Security' }"
          @click="settingSection = 'Security'"
        >
          <img src="~/assets/images/securityAdmin.svg" alt="" />
          <h1>Security</h1>
        </div>
      </div>
      <!-- this sctions will load two different components based on the tab selected -->
      <div class="measure-input">
        <General v-if="settingSection == 'General'" />
        <Security v-if="settingSection == 'Security'" />
      </div>
    </div>
  </div>
</template>

<script>
import General from '~/components/admin/General.vue'
import Security from '~/components/admin/Security.vue'
export default {
  components: {
    General,
    Security,
  },
  data() {
    return {
      settingSection: 'General',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.userData
    },
  },
  created() {
    this.$store.dispatch('loading/toggleLoading', true)
    setTimeout(() => {
      this.$store.dispatch('loading/toggleLoading', false)
    }, 500)
  },
}
</script>

<style scoped>
.setting-nav {
  @apply flex md:flex-col flex-row justify-start items-start md:w-1/6 bg-white shadow-md rounded-md border ml-10;
}

.setting-nav > div {
  @apply flex justify-start items-center px-5 py-3 text-gray-600 hover:text-black cursor-pointer border-b md:w-full hover:bg-accent hover:bg-opacity-20 text-sm;
}

.setting-nav img {
  @apply w-6 mr-3;
}

.measure-input {
  @apply w-1/2 flex flex-col justify-start items-start px-12;
}

.measure-result {
  @apply w-1/3 flex flex-col justify-start items-start text-center;
}
.measure-result * {
  @apply border-none;
}
.activeSetting {
  @apply bg-accent bg-opacity-50 text-black font-semibold;
}
</style>
