<template>
  <div
    class="bg-gray-300 pb-16 pt-8 md:mx-12 px-4 md:px-12 space-y-12 rounded-xl"
  >
    <div class="text-center font-bold text-xl my-4 sm:my-8">
      Manage Products
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Enter Search Keyword"
        class="
          input
          rounded-sm
          bg-white
          flex-none
          md:flex-1
          border-2 border-raduis-xl border-gray-100
        "
      />

      <select
        class="
          rounded-sm
          flex-none
          select select-bordered
          bg-white
          border-2 border-raduis-xl border-gray-100
        "
      >
        <option disabled="disabled" selected="selected">
          Choose Your Superpower
        </option>
        <option>telekinesis</option>
        <option>time travel</option>
        <option>invisibility</option>
      </select>

      <select
        class="
          select select-bordered
          rounded-sm
          flex-none
          bg-white
          border-2 border-raduis-xl border-gray-100
        "
      >
        <option disabled="disabled" selected="selected">Sort By</option>
        <option>Latest Added</option>
        <option>Oldest Added</option>
        <option>A-Z Order (ASC)</option>
        <option>A-Z Order (DESC)</option>
        <option>Active First Order</option>
        <option>Inactive First Order</option>
      </select>
    </div>

    <div class="grid sm:grid-cols-3 gap-8">
      <ProductCard
        v-for="(product, idx) in products"
        :key="idx"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/ProductCard.vue'
export default {
  components: {
    ProductCard,
  },
  middleware: ['auth', 'product'],
  computed: {
    products() {
      return this.$store.state.products.products.products
    },
  },
  created() {
    this.loadProducts()
  },
  methods: {
    async loadProducts() {
      this.$store.dispatch('loading/toggleLoading', true)
      await this.$store.dispatch('products/fetchAllProducts')
      this.$store.dispatch('loading/toggleLoading', false)
    },
  },
}
</script>

<style lang="scss" scoped></style>
