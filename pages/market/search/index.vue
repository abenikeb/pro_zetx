<template>
  <div>
    <!-- renders the search bar -->
    <Search :products="firestoreProducts" />
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
          <img src="~/assets/images/filter.svg" alt="" class="w-5 mb-2" />
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
            <option :value="null">All</option>
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
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
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
import firebase from 'firebase'
import * as JsSearch from 'js-search'
import Pagination from '~/components/product/Pagination.vue'
import Search from '../../../components/TheSearchBar.vue'
import ProductCard from '../../../components/market/ProductCard.vue'
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
      firestoreProducts: [],
      productsByName: [],
      priceFilter: null,
      categoryFilter: null,
      currentPage: 1,
      pageSize: 8,
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

    // returns the products based on the filter values  `
    filteredProducts() {
      this.$store.dispatch('loading/toggleLoading', true)
      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => {
        this.$store.dispatch('loading/toggleLoading', false)
      }, 500)
      let filteredProducts = [...this.products]

      if (!this.priceFilter && !this.categoryFilter) {
        return filteredProducts
      } else if (this.priceFilter && !this.categoryFilter) {
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
      } else if (!this.priceFilter && this.categoryFilter) {
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
    this.$store.dispatch('loading/toggleLoading', true) // triggers loading animation until the data is fetched from firebase

    // start: This section retrieves product collections
    const productsRef = firebase.firestore().collection('products')
    const productsSnapshot = await productsRef.get()
    productsSnapshot.forEach((product) => {
      this.firestoreProducts.push({
        id: product.id,
        ...product.data(),
      })
    })
    // end:

    const search = new JsSearch.Search('id') //  this line is to initialize JS search libriaries instance
    search.addDocuments(this.firestoreProducts) // tells JS search instance which array of object to search from

    if (this.$route.query.name) {
      // true if product name is provided as a search query parameter
      if (this.$route.query.location) {
        // true if product name and location is provided as a search query parameter
        search.addIndex('name') // tell the js library to only search from the value with a key called 'name'
        const tempResultByName = search.search(this.$route.query.name) // first search by only the name and set the result on a temporary variable
        const searchLocation = new JsSearch.Search('id') // initialize  another JS search libriaries instance to search on the temporary variable
        searchLocation.addDocuments(tempResultByName)
        searchLocation.addIndex(['location', 'city'])
        this.products = searchLocation.search(this.$route.query.location)
      } else {
        search.addIndex('name')
        this.products = search.search(this.$route.query.name)
      }
    } else if (this.$route.query.location) {
      search.addIndex(['location', 'city'])
      this.products = search.search(this.$route.query.location)
    } else {
      this.$router.push('/market')
    }
    setTimeout(() => {
      this.$store.dispatch('loading/toggleLoading', false)
    }, 700)
  },
  methods: {
    // this will capture the selection of the price filter
    priceFilterChange(event) {
      this.priceFilter = event.target.value
    },
    // this will capture the selection of the category filter
    categoryFilterChange(event) {
      this.categoryFilter = event.target.value
    },
    handlePageChange(page) {
      // console.log(page)
      this.currentPage = page
    },
  },
}
</script>

<style scoped>
.drop-down {
  /* eslint-disable */
  @apply text-xs font-thin;
}
</style>
