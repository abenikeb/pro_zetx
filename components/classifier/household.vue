<template>
  <div class="w-full mx-auto">
    <form @submit.prevent="submitHouseholdData">
      <div class="form-control mb-2">
        <label class="text-sm"> Electricity (KwH) </label>
        <input
          type="number"
          placeholder="Electricity in KwH"
          class="input input-sm input-bordered"
          :value="data.electricity"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Natural gas (Litres) </label>
        <input
          type="number"
          placeholder="Natural gas in Litres"
          class="input input-sm input-bordered"
          :value="data.naturalgas"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Coal (Tonnes) </label>
        <input
          type="number"
          placeholder="Coal in tonnes"
          class="input input-sm input-bordered"
          :value="data.coal"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Wood (Tonnes) </label>
        <input
          type="number"
          placeholder="wood in tonnes"
          class="input input-sm input-bordered"
          :value="data.wood"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    data: {},
  },

  created() {
    // if (this.$store.state.measure.household) {
    //   console.log(this.$store.state.measure.household)
    //   this.houseData = { ...this.$store.state.measure.household }
    // }
    // console.log(this.data)
  },

  methods: {
    submitHouseholdData() {},
  },
})
</script>

<style scoped></style>
