<template>
  <div
    class="flex flex-col justify-center md:flex-row md:flex-wrap md:justify-between items-center md:items-start w-full"
  >
    <div
      v-for="product in products"
      :key="product.id"
      class="md:w-1/2 w-full pr-3 pb-4"
    >
      <div class="product-card">
        <div class="img-container">
          <nuxt-link
            class="center-image"
            :to="`market/productView/${product.id}`"
          >
            <img
              v-if="product.images.length > 0"
              :src="product.images[0]"
              class="product-image"
              alt=""
            />
            <img
              v-else
              src="~assets/images/product/product_not_found.png"
              class="product-image"
              alt=""
            />
          </nuxt-link>
          <!-- this new tag will be dispalyed for the items that is posted 2 days or less ago -->
          <span
            v-if="product.postedDate.seconds > now - 172800"
            class="new-product-badge"
            ><!-- The new tag will be shown when the product posted date is with in two days from today -->
            new
          </span>
        </div>
        <div class="details-container">
          <div>
            <nuxt-link :to="`market/productView/${product.id}`">
              <p class="font-black text-lg">{{ product.name }}</p>
            </nuxt-link>
          </div>
          <div class="w-full flex justify-between items-center pb-5">
            <div>
              <p class="text-xs text-gray-400">in {{ product.category }}</p>
              <p class="text-xs text-gray-500">{{ product.location.city }}</p>
            </div>

            <!-- Pricing Section -->
            <div>
              <h1 class="text-2xl">
                {{ product.price }}<span class="text-gray-500 text-sm">£</span>
              </h1>
              <div class="text-sm text-accent">
                + {{ product.carbonReduction
                }}<span class="text-accent text-xs">CC</span>
              </div>
            </div>
            <!-- END - Pricing Section -->
          </div>
          <div class="btn-container">
            <nuxt-link :to="`market/productView/${product.id}`">
              <button class="btn btn-accent btn-sm rounded btn-buy">Buy</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  props: {
    products: {},
  },
  computed: {
    // returns the current time
    now() {
      return firebase.firestore.Timestamp.now().seconds
    },
  },
})
</script>

<style scoped>
.product-card {
  @apply flex justify-start items-center
    rounded-lg bg-gray-200 overflow-hidden
    md:h-36 h-40 transition duration-200 ease-in-out shadow hover:shadow-lg;
}

.img-container {
  @apply py-1 md:w-1/3 w-full h-full;
  height: 100%;
  width: 50%;
  max-width: 50%;
  background-color: #f5f5f5;
}

.center-image {
  @apply w-full h-full flex items-center justify-center;
}

.details-container {
  @apply px-2;
  flex-grow: 2;
}

.product-image {
  @apply h-full;
  width: 97%;
  height: 97%;
  object-fit: contain;
}

.new-product-badge {
  @apply bg-red-600
      px-3 py-1 rounded-xl text-white absolute
      top-1 right-1 text-xs;
}

.btn-container {
  @apply w-full;
}

.btn-buy {
  @apply w-full;
}
</style>
