<template>
  <div class="container flex flex-row justify-center items-center md:px-4 px-8">
    <div class="container justify flex justify-center items-center px-4">
      <div
        class="
          relative
          h-8
          md:h-14
          pr-8
          pl-5
          rounded-full
          md:bg-white
          bg-gray-200
          items-stretch
          flex
          justify-between
          shadow-sm
          border
        "
      >
        <!-- input field to type the product name -->
        <div>
          <input
            id="productName"
            v-model="search.name"
            type="text"
            class="
              text-sm
              md:h-14
              h-8
              md:w-96
              w-32
              md:bg-white
              bg-gray-200
              pr-8
              pl-5
              rounded
              focus:shadow focus:outline-none
              border-r-2
              hover:cursor-pointer
            "
            placeholder="Products"
            @keyup="suggestByProduct($event)"
            @focus="focusProduct = true"
            @blur="loseFocusProduct"
          />
          <div
            v-if="focusProduct"
            class="container justify flex justify-center items-start"
          >
            <ul
              class="
                bg-white
                border border-gray-100
                relative
                h-full
                w-full
                z-20
              "
            >
              <li
                v-for="suggestion in productSuggestions"
                :key="suggestion"
                class="
                  pl-5
                  pr-2
                  py-2
                  border-b-2 border-gray-100
                  relative
                  cursor-pointer
                  hover:bg-yellow-50 hover:text-gray-900
                "
                @click="search.name = suggestion"
              >
                <b>{{ suggestion }} </b>
              </li>
            </ul>
          </div>
        </div>

        <!-- input field to type the location -->
        <div>
          <input
            id="location"
            v-model="search.location"
            type="text"
            class="
              md:h-14
              h-8
              md:w-96
              w-32
              md:bg-white
              bg-gray-200
              pr-8
              pl-5
              rounded
              text-sm
              focus:shadow focus:outline-none
            "
            placeholder="Location"
            @keyup="suggestByLocation($event)"
            @focus="focusLocation = true"
            @blur="loseFocusLocation"
          />
          <div
            v-if="focusLocation"
            class="container justify flex justify-center items-start"
          >
            <ul
              class="
                bg-white
                border border-gray-100
                relative
                h-full
                w-full
                z-20
              "
            >
              <li
                v-for="suggestion in locationSuggestions"
                :key="suggestion"
                class="
                  pl-5
                  pr-2
                  py-2
                  border-b-2 border-gray-100
                  relative
                  cursor-pointer
                  hover:bg-yellow-50 hover:text-gray-900
                "
                @click="search.location = suggestion"
              >
                <b>{{ suggestion }} </b>
              </li>
            </ul>
          </div>
        </div>
        <!-- search icon -->
        <div
          id="searchBtn"
          class="
            absolute
            md:top-1
            top-0
            md:right-1.5
            right-0.5
            flex
            justify-center
            items-center
          "
          @click="searchProduct"
        >
          <i
            class="
              fa fa-search
              text-white
              bg-accent
              hover:bg-accent-focus
              md:px-4 md:py-4
              cursor-pointer
              rounded-full
              px-2
              py-2
            "
          ></i>
        </div>
      </div>

      <!-- cart icon -->
      <!-- <img
        src="../assets/images/cart.svg"
        class="ml-7 cursor-pointer w-8"
        alt=""
      /> -->
      <!-- <i class="fa fa-shopping-bag fa-2x px-6 text-accent hover:accent-focus cursor-pointer "></i> -->
    </div>
  </div>
</template>

<script>
import * as JsSearch from 'js-search'
export default {
  props: { products: Array },
  data() {
    return {
      search: {
        name: '',
        location: '',
      },
      productSuggestions: [],
      locationSuggestions: [],
      customProducts: [],
      focusProduct: false,
      focusLocation: false,
    }
  },
  watch: {
    products() {
      this.products.forEach((product) => {
        this.customProducts.push({
          ...product,
        })
      })
    },
  },
  created() {
    if (typeof this.$route.query.name === 'string')
      this.search.name = this.$route.query.name
    if (typeof this.$route.query.location === 'string')
      this.search.location = this.$route.query.location
  },
  methods: {
    // this function will be called when the user enters the search parameters and clicks the search button
    searchProduct() {
      let query = {}
      if (this.search.name !== '') {
        if (this.search.location !== '') {
          query = this.search
        } else {
          query = {
            name: this.search.name,
          }
        }
      } else if (this.search.location !== '') {
        query = {
          location: this.search.location,
        }
      }
      //  redirect to the saerch results page along side the search parameters
      this.$router.push({ path: '/market/search', query })
    },
    suggestByProduct(e) {
      // console.log(e.target.value)
      const search = new JsSearch.Search('id')
      search.addIndex('name')

      search.addDocuments(this.customProducts)
      const suggestions = search.search(e.target.value)
      const tempsuggestions = []
      suggestions.forEach((suggest) => {
        if (!tempsuggestions.includes(suggest.name)) {
          tempsuggestions.push(suggest.name)
        }
      })
      // console.log(tempsuggestions)
      this.productSuggestions = tempsuggestions
    },
    suggestByLocation(e) {
      // console.log(e.target.value)
      const search = new JsSearch.Search('id')
      search.addIndex(['location', 'city'])
      search.addDocuments(this.customProducts)
      const suggestions = search.search(e.target.value)
      const tempsuggestions = []
      suggestions.forEach((suggest) => {
        if (!tempsuggestions.includes(suggest.location.city)) {
          tempsuggestions.push(suggest.location.city)
        }
      })
      this.locationSuggestions = tempsuggestions
    },
    loseFocusProduct() {
      setTimeout(() => {
        this.focusProduct = false
      }, 200)
    },
    loseFocusLocation() {
      setTimeout(() => {
        this.focusLocation = false
      }, 200)
    },
  },
}
</script>
