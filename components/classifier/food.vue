<template>
  <div class="w-full mx-auto">
    <form
      class="w-full flex flex-wrap justify-between items-center"
      @submit.prevent="submitFoodData"
    >
      <div class="form-control mb-2">
        <label class="text-sm"> Beef </label>
        <input
          v-model="foodData.beef"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Lamb </label>
        <input
          v-model="foodData.lamb"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Cheese </label>
        <input
          v-model="foodData.cheese"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Pork </label>
        <input
          v-model="foodData.pork"
          min="0"
          type="number"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Turkey </label>
        <input
          v-model="foodData.turkey"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Chicken </label>
        <input
          v-model="foodData.chicken"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Tuna </label>
        <input
          v-model="foodData.tuna"
          type="number"
          min="0"
          placeholder="#Kg"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Milk </label>
        <input
          v-model="foodData.milk"
          type="number"
          min="0"
          placeholder="#Litres"
          class="input input-sm input-bordered"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      foodData: {
        beef: 0,
        lamb: 0,
        cheese: 0,
        pork: 0,
        turkey: 0,
        chicken: 0,
        tuna: 0,
        milk: 0,
      },
    }
  },
  created() {
    if (this.$store.state.measure.food) {
      // console.log(this.$store.state.measure.food)
      this.foodData = { ...this.$store.state.measure.food }
    }
  },

  methods: {
    submitFoodData() {
      this.$store.dispatch('measure/setFoodData', this.foodData)
    },
  },
})
</script>

<style scoped>
form > div {
  @apply mr-2;
}
</style>
