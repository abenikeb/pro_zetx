<template>
  <div class="flex flex-col justify-center items-center mx-auto">
    <h1 class="mb-2 border-b text-xl text-center">Total emissions</h1>
    <div class="measure-finish">
      <div class="stat">
        <div class="stat-title">Total emissions</div>
        <div class="stat-value">{{ total.toFixed(2) }} Kg/Co2e</div>
        <!-- <div class="stat-desc">21% more than last month</div> -->
      </div>
    </div>
    <button class="btn btn-sm" @click="submitData">Finish</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    total() {
      return this.$store.state.measure.total
    },
  },
  methods: {
    submitData() {
      this.$store.dispatch('measure/storeEmissionsData')
      this.$store.dispatch('coin/calculateCarbonCoin')
      this.$store.dispatch('coin/storeCarbonCoin')

      console.log(this.$store.state.coin.carbonCreditBalance)
      // this.$router.push('/dashboard')
    },
  },
})
</script>

<style scoped>
.measure-finish {
  @apply flex flex-wrap justify-center items-center text-center mb-5;
}

.stat-card {
  @apply bg-white shadow p-5 rounded-lg mr-2 mb-2;
}

.stat-value {
  @apply text-3xl my-2;
}
</style>
