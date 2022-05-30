<template>
  <div class="w-full mx-auto">
    <form @submit.prevent="submitShoppingData">
      <div class="form-control mb-2">
        <label class="text-sm">
          Paper based products (=books, magazines, newspapers)
        </label>
        <input
          v-model="shoppingData.paper"
          type="number"
          placeholder="$"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm">
          Plastic based products (=plastic containers, water bottles, furniture)
        </label>
        <input
          v-model="shoppingData.plastic"
          type="number"
          placeholder="$"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Clothes, textiles and shoes </label>
        <input
          v-model="shoppingData.textile"
          type="number"
          placeholder="$"
          class="input input-sm input-bordered"
        />
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Pharmaceuticals </label>
        <input
          v-model="shoppingData.pharma"
          type="number"
          placeholder="$"
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
      shoppingData: {
        paper: 0,
        plastic: 0,
        textile: 0,
        pharma: 0,
      },
    }
  },
  created() {
    if (this.$store.state.measure.shopping) {
      // console.log(this.$store.state.measure.shopping)
      this.shoppingData = { ...this.$store.state.measure.shopping }
    }
  },

  methods: {
    submitShoppingData() {
      this.$store.dispatch('measure/setShoppingData', this.shoppingData)
    },
  },
})
</script>

<style scoped></style>
