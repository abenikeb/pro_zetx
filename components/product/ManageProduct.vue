<template>
  <div class="flex flex-row">
    <div
      class="
        bg-gray-200
        pb-16
        pt-4
        mt-8
        md:mx-2
        px-8
        md:px-8
        space-y-8
        rounded-xl
        w-full
      "
    >
      <div class="text-center font-bold text-xl my-2 sm:my-4">
        Manage Products
        <i class="fas fa-redo"></i>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="relative flex-none md:flex-1 rounded-sm">
          <input
            v-model="searchInput"
            placeholder="Enter Search Keyword"
            class="w-full pr-16 input bg-white rounded-sm border-none"
            type="text"
          />
          <button
            class="
              absolute
              top-0
              right-0
              rounded-l-none rounded-r-sm
              btn btn-primary
            "
            @click.prevent="searchProducts"
          >
            Search
          </button>
        </div>

        <select
          class="
            rounded-sm
            flex-none
            select select-bordered
            bg-white
            border-2 border-raduis-xl border-gray-100
          "
          @change="priceFilterChange($event)"
        >
          <option value="null">All</option>
          <option value="down50">Less than 50 £</option>
          <option value="50to100">Between 50 - 100 £</option>
          <option value="up100">More than 100 £</option>
        </select>

        <select
          class="
            select select-bordered
            rounded-sm
            flex-none
            bg-white
            border-2 border-raduis-xl border-gray-100
          "
          @change="categoryFilterChange($event)"
        >
          <option disabled="disabled" selected="selected">Sort By</option>
          <!-- <option :value="null">All</option> -->
          <option
            v-for="(productCategory, idx) in productCategories"
            :key="idx"
            :value="productCategory.value"
          >
            {{ productCategory.name }}
          </option>
        </select>
      </div>
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loading-spinner">
        <div
          class="
            flex flex-row
            gap-2
            items-center
            justify-center
            text-white
            font-bold
            text-xl
          "
        >
          <div>
            <img
              src="~/assets/images/product/circle-spinner-accent.svg"
              class="w-6 animate-spin"
            />
          </div>
          <div>Loading...</div>
        </div>
      </div>
      <!-- END - Loading Spinner -->
      <!-- Start Product card section -->
      <div
        v-if="paginateItems.length > 0"
        class="
          flex flex-col
          justify-center
          items-center
          md:grid md:grid-cols-3
          gap-8
          w-full
        "
      >
        <div v-for="(item, index) in paginateItems" class="w-full" :key="index">
          <ProductCard
            v-on:pass_Update_modal="handleUpdateModal"
            :product="item"
          />
        </div>

        <update-product-modal
          @resetProductId="handleUpdateModalReset"
          :productId="productID"
        />
      </div>
      <div v-if="paginateItems.length == 0">
        <h1>No items Found..</h1>
      </div>
      <!-- End Product card section -->

      <!-- START pagination index counter -->
      <div class="flex justify-center items-center">
        <pagination
          :itemsCount="itemProducts.length"
          :pageSize="3"
          :currentPage="currentPage"
          @on_Page_Change="handlePageChange"
        />
      </div>
      <!-- END pagination index counter -->
    </div>
    <!--START Sidebar layout section -->

    <!--END Sidebar layout section -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import ProductCard from '../../components/product/ProductCard.vue'
import Pagination from '~/components/product/Pagination.vue'
import UpdateProductModal from '~/components/product/UpdateProductModal.vue'
import { ProductType } from '~/plugins/model/products.model'

import {
  FilterProductsBy,
  ProductPriceFilter,
} from '~/plugins/model/marketplace.model'

export default Vue.extend({
  components: {
    'product-card': ProductCard as Vue.Component,
    'update-product-modal': UpdateProductModal as Vue.Component,
    pagination: Pagination as Vue.Component,
  },
  data() {
    return {
      productID: undefined as String | undefined,
      // FilterProductsBy: ['Price', 'Category'] as any,
      searchInput: '',
      isLoading: false,
      currentPage: 1,
      pageSize: 3,
      errorSetting: {
        singular: true,
        title: 'Error',
        body: '',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(200, 200, 200, 0.6)',
        defaultTitle: true,
        canTimeout: true,
        canPause: false,
        iconEnabled: true,
        draggable: true,
        dragThreshold: 0.75,
        hideProgressbar: false,
        duration: 3000,
        theme: 'light',
        baseIconClass: '',
        orderLatest: true,
        transition: null,
        oneType: false,
        maxToasts: 6,
      },
    }
  },
  props: ['page'],
  middleware: ['auth', 'product'],
  computed: {
    itemProducts() {
      return this.$store.state.products.products.products
    },
    productCategories() {
      return this.$store.state.market?.products.productCategories
    },
    paginateItems(): Array<ProductType> {
      return _(this.itemProducts)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value()
    },
  },

  created() {
    this.loadProducts()
  },

  methods: {
    // Modal Loading Screen
    toggleLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    //load product from store
    async loadProducts() {
      try {
        this.$store.dispatch('loading/toggleLoading', true)

        await this.$store.dispatch('market/fetchCategories')
        await this.$store.dispatch('products/fetchAllProducts')

        this.$store.dispatch('loading/toggleLoading', false)
      } catch (error: any) {
        console.log({ error: error.message })
        this.$router.push({
          path: '/dashboard/product/manage',
        })
      }
    },

    async searchProducts(e: KeyboardEvent) {
      this.$store.dispatch('loading/toggleLoading', true)

      await this.$store.dispatch('products/searchedProducts', {
        keyword: this.searchInput,
      })

      this.$store.dispatch('loading/toggleLoading', false)
    },
    async priceFilterChange(event: any) {
      this.$store.dispatch('loading/toggleLoading', true)

      const filterValue = event.target.value
      let filterType: ProductPriceFilter

      switch (filterValue) {
        case 'down50': {
          filterType = ProductPriceFilter.To50
          break
        }
        case '50to100': {
          filterType = ProductPriceFilter.From50To100
          break
        }
        default: {
          filterType = ProductPriceFilter.From100
        }
      }

      const filterConfig = {
        // by: 'price' as FilterProductsBy.Price,
        by: FilterProductsBy.Price,
        where: filterType,
      }

      console.log({
        filterConfig,
      })

      await this.$store.dispatch('products/filterProducts', filterConfig)

      this.$store.dispatch('loading/toggleLoading', false)
    },
    async categoryFilterChange(event: any) {
      this.$store.dispatch('loading/toggleLoading', true)

      await this.$store.dispatch('products/filterProducts', {
        by: FilterProductsBy.Category,
        where: event.target.value,
      })

      this.$store.dispatch('loading/toggleLoading', false)
    },

    handleUpdateModal(id: String) {
      this.productID = id
    },

    handleUpdateModalReset() {
      this.productID = undefined
    },

    handlePageChange(page: any) {
      this.currentPage = page
    },
  },
})
</script>

<style scoped>
.activeMeasure {
  @apply bg-accent bg-opacity-40 text-black font-semibold;
}
</style>
