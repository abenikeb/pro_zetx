<template>
  <div class="">
    <Loading />
    <Nuxt class="min-h-screen" />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheFooter from '~/components/TheFooter.vue'
import Loading from '~/components/UI/Loading.vue'

export default Vue.extend({
  components: {
    TheFooter,
    Loading,
  },

  data() {
    return {
      sidenavActive: false,
    }
  },
  created() {
    const channel = this.$route.query.channel
    if (channel) {
      this.$store.dispatch('analytics/addImpression', channel)
    }
  },

  methods: {},
})
</script>
