<template>
  <div class="px-3">
    <!-- START Loading Screen | backdrop -->
    <div
      v-if="loading"
      class="
        z-50
        fixed
        top-0
        left-0
        w-screen
        h-screen
        bg-white bg-opacity-80
        flex
        justify-center
        items-center
      "
    ></div>
    <!-- END Loading Screen | backdrop -->
    <div
      class="
        max-w-md
        mx-auto
        flex
        justify-center
        items-center
        bg-gray-200
        rounded-xl
        shadow-md
        overflow-hidden
        md:max-w-4xl
        relative
      "
    >
      <!-- Back link -->
      <nuxt-link
        to="/market"
        class="absolute text-sm font-bold top-0 left-0 md:top-3.5 md:left-5"
      >
        <div class="back-btn text-gray-600 flex flex-row gap-2">
          <img
            src="~/assets/images/product/back_112351.png"
            class="w-4"
            alt=""
          />

          <span>Back</span>
        </div>
      </nuxt-link>

      <div class="w-5/6 mt-4">
        <div class="w-5/6 ml-4 md:ml-16 divide-y divide-gray-200 gap-2">
          <h1 class="font-bold text-xl mt-8 mb-4">Order Summery</h1>
        </div>
        <div
          class="
            bg-white
            shadow-sm
            rounded-sm
            w-full
            md:w-5/6 md:ml-16
            divide-y divide-gray-200
            gap-2
          "
        >
          <div
            class="flex flex-col items-center md:items-start md:flex-row gap-4"
          >
            <div>
              <!-- <img
                :src="product.images[0]"
                alt="no-img"
                class="w-48 md:w-40 rounded-md mt-10 h-40 my-8 mx-4 rounded-lg"
              /> -->
              <img
                v-if="product.images.length > 0"
                :src="product.images[0]"
                class="w-48 md:w-40 rounded-md mt-10 h-40 my-8 mx-4 rounded-lg"
                alt=""
              />
              <img
                v-else
                src="~assets/images/product/product_not_found.png"
                class="w-48 md:w-40 rounded-md mt-10 h-40 my-8 mx-4 rounded-lg"
                alt=""
              />
            </div>
            <div
              class="
                flex flex-row
                gap-8
                pl-6
                bg-gray-100
                w-full
                pt-4
                md:pt-2 md:bg-white
              "
            >
              <div class="text-gray-600 text-sm md:text-lg space-y-1">
                <h1 class="mb-2 md:mt-10 mt-2">
                  <span>Product: </span>
                </h1>
                <h1>Quantity:</h1>
                <h1 class="text-sm md:text-lg md:block">Product Price:</h1>
                <h1>Added Tax:</h1>
                <h1>Total Price (GBP):</h1>
              </div>
              <div class="text-accent text-sm md:text-lg font-bold space-y-1">
                <h1 class="mb-2 md:mt-10 mt-2">
                  {{ product.name }}
                </h1>
                <h1>
                  {{ $route.query.productQuantity }}
                </h1>
                <h1>
                  {{ `£${product.price} + ${product.carbonReduction} CC` }}
                </h1>
                <h1>
                  {{
                    `£${Number.parseFloat(
                      product.price * $route.query.productQuantity * 0.2
                    ).toFixed(2)} `
                  }}
                </h1>
                <h1>
                  {{ $route.query.productQuantity }} * {{ product.price }} +
                  {{
                    Number.parseFloat(
                      product.price * $route.query.productQuantity * 0.2
                    ).toFixed(2)
                  }}
                  = £
                  {{
                    totalPrice(
                      product.price,
                      $route.query.productQuantity,
                      product.price * $route.query.productQuantity * 0.2
                    )
                  }}
                </h1>
              </div>
            </div>
          </div>
          <!-- Total Price Section -->
          <div class="p-4 font-bold bg-gray-100 w-full">
            Billed Today
            <h1 class="float-right">
              {{
                `£${totalPrice(
                  product.price,
                  $route.query.productQuantity,
                  product.price * 0.2 * $route.query.productQuantity
                )}`
              }}
            </h1>
          </div>
        </div>

        <h1 class="font-bold text-center text-lg mt-8">Payment Information</h1>
        <p class="tetx-xm text-center mb-4">
          This is secure 128-bit SSL encrypted payment
        </p>

        <!-- START Payment gateway container -->
        <div
          class="
            bg-white
            shadow-lg
            w-full
            md:w-5/6 md:ml-16
            rounded-sm
            divide-y divide-gray-200
            gap-2
            py-2
            flex flex-row
            justify-between
            px-4
          "
        >
          <div class="form-control">
            <label class="cursor-pointer label mr-8">
              <input
                type="radio"
                name="opt2"
                checked="checked"
                class="radio radio-accent border-2 border-gray-400"
                value="3"
              />
              <span class="label-tex font-bold ml-2">Stripe</span>
            </label>
          </div>
          <img
            src="~/assets/images/product/payment_.jpg"
            class="w-32 h-8 border-2 border-gray-200"
            alt="wew"
          />
        </div>
        <!-- END Payment gateway container -->

        <button
          class="
            btn btn-accent btn-block
            w-full
            md:w-5/6 md:ml-16
            rounded-lg
            mt-8
            text-center
            mb-8
          "
          type="submit"
          @click="submitOrder"
        >
          Buy now
          {{
            `£${totalPrice(
              product.price,
              $route.query.productQuantity,
              product.price * $route.query.productQuantity * 0.2
            )}`
          }}
        </button>

        <form action="https://zrf-temp-pp-1.herokuapp.com/pay" method="POST">
          <input type="hidden" name="prod_name" :value="product.name" />
          <input type="hidden" name="unit_amount" :value="product.price" />
          <input
            type="hidden"
            name="quantity"
            :value="$route.query.productQuantity"
          />
          <button ref="payBtn" hidden type="submit"></button>
        </form>
      </div>
    </div>
    <!-- <div class="container ml-44">
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
// import { GenerateOrderPrice } from '~/plugins/model/order.model'

import VueToastify from 'vue-toastify'

Vue.use(VueToastify)

export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      product: {
        id: '',
        name: '',
        status: 'INACTIVE',
        price: 0,
        category: '',
        inventory: undefined,
        images: [],
      },
      successSetting: {
        singular: true,
        title: 'Success',
        body: 'Successfully Created..',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(0, 0, 0, 0.7)',
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
      errorSetting: {
        title: 'Error',
        body: 'Error has Found',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        defaultTitle: true,
        canTimeout: true,
        iconEnabled: true,
        draggable: true,
        dragThreshold: 0.75,
        hideProgressbar: false,
        duration: 3000,
        theme: 'light',
        orderLatest: true,
      },
      loading: false,
      activeLocation: false,
      qunanityInput: 0,
      err: 'Some thing failed',
    }
  },

  created() {
    this.loadProduct()
  },

  methods: {
    async loadProduct() {
      this.$store.dispatch('loading/toggleLoading', true)
      const product = await this.$store.dispatch('market/getProduct', {
        productId: this.$route.query.productID,
      })
      if (!product) return null
      this.product = product

      this.$store.dispatch('loading/toggleLoading', false)
    },

    totalPrice(productPrice, quantity, addedTax) {
      const netAmount = productPrice * quantity + addedTax
      return Number.parseFloat(netAmount).toFixed(2)
    },

    async submitOrder() {
      this.$store.dispatch('loading/toggleLoading', true)
      try {
        await this.$store.dispatch('market/createOrder', {
          productId: this.product.id,
          quantity: this.$route.query.productQuantity,
        })
        this.$refs.payBtn.click()
      } catch (err) {
        this.errorSetting.body = err.message
        this.$vToastify.error(this.errorSetting)
      }
      this.$store.dispatch('loading/toggleLoading', false)
    },
  },
})
</script>

<style scoped>
.order-container {
  position: relative;
}

.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(50%) translateY(100%);
}
</style>
