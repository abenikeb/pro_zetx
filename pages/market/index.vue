<template>
  <div class="max-w-md md:max-w-full">
    <!-- renders the search bar component -->
    <Search :products="products" />

    <div
      class="
        flex flex-col
        md:flex-row
        justify-start
        items-center
        md:items-start
        w-full
        my-5
        px-10
        gap-4
        md:gap-0
      "
    >
      <div class="md:w-1/5 w-full mr-5 hidden md:block">
        <div class="flex flex-start items-center flex-start">
          <h1 class="2xl mb-2">Filter</h1>
          <img src="../../assets/images/filter.svg" alt="" class="w-5 mb-2" />
        </div>
        <div class="mt-6">
          <label class="text-xs hidden md:block">Price</label>
          <!-- price filter dropdown -->
          <select
            id="price"
            class="
              drop-down
              select select-bordered select-sm
              w-full
              max-w-xs
              mb-3
            "
            @change="priceFilterChange($event)"
          >
            <option :value="-1">All</option>
            <option :value="0">Less than 50 CC</option>
            <option :value="1">Between 50 - 100 CC</option>
            <option :value="2">More than 100 CC</option>
          </select>
          <label class="text-xs">Category</label>
          <!-- category dropdown -->
          <select
            id="category"
            class="
              drop-down
              select select-sm select-bordered
              w-full
              max-w-xsmb-3
            "
            @change="categoryFilterChange($event)"
          >
            <option :value="null">All</option>
            <option v-for="categor in category" :key="categor" :value="categor">
              {{ categor }}
            </option>
          </select>
        </div>
      </div>
      <div class="md:w-1/5 w-full mr-5 md:hidden relative">
        <div
          class="flex flex-start items-center flex-start absolute top-0 right-0"
          @click="filter_active = !filter_active"
        >
          <h1 class="2xl mb-2">Filter</h1>
          <img src="../../assets/images/filter.svg" alt="" class="w-5 mb-2" />
        </div>
        <div v-if="filter_active" class="mt-6">
          <label class="text-xs hidden md:block">Price</label>
          <!-- price filter dropdown -->
          <select
            id="price"
            class="
              drop-down
              select select-bordered select-sm
              w-full
              max-w-xs
              mb-3
            "
            @change="priceFilterChange($event)"
          >
            <option :value="-1">All</option>
            <option :value="0">Less than 50 CC</option>
            <option :value="1">Between 50 - 100 CC</option>
            <option :value="2">More than 100 CC</option>
          </select>
          <label class="text-xs">Category</label>
          <!-- category dropdown -->
          <select
            id="category"
            class="
              drop-down
              select select-sm select-bordered
              w-full
              max-w-xsmb-3
            "
            @change="categoryFilterChange($event)"
          >
            <option :value="null">All</option>
            <option v-for="categor in category" :key="categor" :value="categor">
              {{ categor }}
            </option>
          </select>
        </div>
      </div>
      <div class="md:w-3/5 mt-6 w-full md:mr-5 mr-2">
        <!-- renders the product card component -->
        <ProductCard :products="paginateItems" />
        <!-- displayed if there are no results to be found for the user search parameteres -->
        <h1
          v-if="filteredProducts.length === 0 && !loading"
          class="text-center"
        >
          No result found
        </h1>
      </div>
      <div class="md:w-1/5 w-full h-36 mr-5">
        <div>
          <img
            src="https://searchengineland.com/figz/wp-content/seloads/2017/02/google-adwords-green-outline-ad2-2017-1920.jpg"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- START pagination index counter -->
    <div class="flex justify-center items-center">
      <Pagination
        :items-count="products.length"
        :page-size="8"
        :current-page="currentPage"
        @on_Page_Change="handlePageChange"
      />
    </div>
    <!-- END pagination index counter -->
  </div>
</template>

<script>
import Search from '../../components/TheSearchBar.vue'
import ProductCard from '../../components/market/ProductCard.vue'
import Pagination from '~/components/product/Pagination.vue'
export default {
  components: {
    Search,
    ProductCard,
    Pagination,
  },
  layout: 'auth',
  data() {
    return {
      products: [],
      productsByName: [],
      priceFilter: -1,
      categoryFilter: null,
      currentPage: 1,
      pageSize: 8,
      filter_active: false,
      category: [],
    }
  },
  computed: {
    // returns the state value for the loading animation
    loading() {
      return this.$store.state.loading.isLoading
    },
    paginateItems() {
      return _(this.filteredProducts)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value()
    },
    // returns the products based on the filter values
    filteredProducts() {
      this.$store.dispatch('loading/toggleLoading', true)
      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => {
        this.$store.dispatch('loading/toggleLoading', false)
      }, 500)
      let filteredProducts = []
      if (this.priceFilter < 0 && !this.categoryFilter) {
        filteredProducts = [...this.products]
        return filteredProducts
      } else if (this.priceFilter > -1 && !this.categoryFilter) {
        if (this.priceFilter === 0) {
          filteredProducts = this.products.filter((p) => {
            return p.price < 50
          })
          // return ['array']
        } else if (this.priceFilter === 1) {
          filteredProducts = this.products.filter((p) => {
            return p.price >= 50 && p.price < 100
          })
        } else if (this.priceFilter === 2) {
          filteredProducts = this.products.filter((p) => {
            return p.price >= 100
          })
        } else {
          return ['array2']
        }
      } else if (this.priceFilter < 0 && this.categoryFilter) {
        filteredProducts = this.products.filter((p) => {
          return p.category === this.categoryFilter
        })
      } else {
        if (this.priceFilter === 0) {
          filteredProducts = this.products.filter((p) => {
            return p.price < 50
          })
        } else if (this.priceFilter === 1) {
          filteredProducts = this.products.filter((p) => {
            return p.price >= 50 && p.price < 100
          })
        } else if (this.priceFilter === 2) {
          filteredProducts = this.products.filter((p) => {
            return p.price >= 100
          })
        }
        filteredProducts = filteredProducts.filter((p) => {
          return p.category === this.categoryFilter
        })
      }
      return filteredProducts
    },
    queryName() {
      return this.$route.query.name
    },
    queryLocation() {
      return this.$route.query.location
    },
  },
  watch: {
    queryName() {
      this.$destroy()
      this.$router.go(0)
    },
    queryLocation() {
      this.$destroy()
      this.$router.go(0)
    },
  },
  async created() {
    // fetches all the products
    const productsSnapshot = await this.$fire.firestore
      .collection('products')
      // .where('status', '==', 'active')
      .get()
    const category = []
    productsSnapshot.forEach((product) => {
      this.products.push({
        id: product.id,
        ...product.data(),
      })
      if (!category.includes(product.data().category))
        category.push(product.data().category)
    })
    this.category = category
  },
  methods: {
    // this will capture the selection of the price filter
    priceFilterChange(event) {
      this.priceFilter = parseInt(event.target.value)
    },
    // this will capture the selection of the category filter
    categoryFilterChange(event) {
      this.categoryFilter = event.target.value
    },
    handlePageChange(page) {
      // console.log(page)
      this.currentPage = page
    },
    activateFilter() {
      this.filter_active = !this.filter_active
    },
  },
}
</script>
<style scoped>
.drop-down {
  @apply text-xs font-thin;
}
</style>
