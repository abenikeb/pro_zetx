<template>
  <div class="px-2">
    <div v-if="order" class="">
      <!-- BACK link section -->
      <nuxt-link to="/dashboard/transaction/" class="text-sm font-bold">
        <span class="back-btn flex flex-row gap-2">
          <img
            src="~/assets/images/product/back_112351.png"
            class="w-4"
            alt=""
          />
          Back
        </span>
      </nuxt-link>
      <div>
        <!-- Firsrt Section Area -->
        <div
          class="
            max-w-md
            mx-auto
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            md:max-w-4xl
            relative
          "
        >
          <div class="md:flex">
            <div class="md:flex-shrink-0 mb-8 md:mb-0">
              <img
                class="h-48 w-full object-cover md:h-full md:w-48"
                :src="order.product.product.images[0]"
                alt="No images"
              />
            </div>
            <!-- Seller profile Start -->
            <div
              class="
                absolute
                top-40
                md:top-52
                left-8
                md:left-52
                flex flex-row
                items-center
                justify-center
                md:hidden
              "
            >
              <img
                src="~/assets/images/product/john.jpg"
                class="w-20 rounded-full border-2 border-white shadow-2xl"
                alt="no-image"
              />
              <div class="text-sm gap-2">
                <span class="bg-accent text-white rounded-xl px-2"
                  >Seller Name:
                </span>
                <p>
                  {{ order.seller.firstName + ' ' + order.seller.lastName }}
                </p>
              </div>
            </div>
            <!-- orderd product info -->
            <div class="p-8">
              <div
                class="uppercase tracking-wide text-yellow-500 font-semibold"
              >
                {{ order.product.product.name }}
              </div>
              <div class="flex flex-row gap-8 w-full pt-4 md:pt-2">
                <div class="text-gray-600 text-sm md:text-lg space-y-1">
                  <h1>Quantity:</h1>
                  <h1 class="text-sm md:text-lg md:block">Price:</h1>
                  <h1>Added Tax:</h1>
                  <h1>Total Price (GBP):</h1>
                  <h1
                    class="
                      block
                      leading-tight
                      font-medium
                      text-black
                      hover:underline
                      mt-8
                      font-bold
                    "
                  >
                    Total(GBP)
                  </h1>
                </div>
                <div class="text-accent text-sm md:text-lg font-bold space-y-1">
                  <h1>
                    {{ order.product.quantity }}
                  </h1>
                  <h1>
                    {{
                      `${order.price.netPrice} £ + ${order.product.product.carbonReduction} CC`
                    }}
                  </h1>
                  <h1>
                    {{
                      `${(
                        order.price.addedTax * order.product.quantity
                      ).toFixed(2)} £`
                    }}
                  </h1>
                  <h1>
                    {{
                      `${order.product.quantity} * ${order.price.netPrice} + ${
                        order.price.addedTax * order.product.quantity
                      } = ${totalPrice(
                        order.price.netPrice,
                        order.product.quantity,
                        order.price.addedTax
                      )} £`
                    }}
                  </h1>
                  <h1
                    class="
                      block
                      leading-tight
                      font-medium
                      text-black
                      hover:underline
                      mt-8
                      font-bold
                    "
                  >
                    {{
                      `${totalPrice(
                        order.price.netPrice,
                        order.product.quantity,
                        order.price.addedTax * order.product.quantity
                      )} £`
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- mobiler view -->
        <div
          class="
            max-w-md
            mx-auto
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            md:max-w-4xl
            mb-8
            md:hidden
          "
        >
          <div class="sub-container">
            <!-- START Header Section -->
            <div class="mb-2 md:w-full">
              <h1 class="font-semibold text-lg">Order Detail</h1>
              <div>
                <div class="text-gray-700">______________________________</div>
                <div class="flex flex-row gap-2 w-full pt-4 md:pt-2">
                  <div class="text-gray-600 text-sm md:text-lg space-y-1">
                    <h1>OrderID:</h1>
                    <h1 class="text-sm md:text-lg md:block">Via:</h1>
                    <h1>Date:</h1>
                    <h1>Status</h1>
                  </div>
                  <div
                    class="text-accent text-sm md:text-lg font-bold space-y-1"
                  >
                    <h1>#{{ $route.query.orderId }}</h1>
                    <h1>Stripe</h1>
                    <h1>
                      {{
                        order.orderDate.toDate().toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })
                      }}
                    </h1>
                    <h1>{{ order.status }}</h1>
                  </div>
                </div>
                <div class="text-gray-700">______________________________</div>
              </div>
            </div>
            <!-- END Header Section -->

            <!-- START General Information -->
            <div class="general-section">
              <div
                class="
                  flex flex-col flex-nowrap
                  justify-between
                  md:justify-start
                  w-full
                  md:w-3/4
                  gap-8
                  mb-2
                "
              >
                <!-- START customer Contact Information -->
                <div class="flex-1">
                  <h1 class="font-bold mb-2">Billing address</h1>

                  <div class="flex flex-row gap-8 w-full pt-4 md:pt-2">
                    <div class="text-gray-600 text-sm md:text-lg space-y-1">
                      <h1>Name:</h1>
                      <h1 class="text-sm md:text-lg md:block">Email:</h1>
                      <h1 class="text-sm md:text-lg md:block">Phone:</h1>
                    </div>
                    <div
                      class="text-accent text-sm md:text-lg font-bold space-y-1"
                    >
                      <h1>
                        {{ order.buyer.firstName + '' + order.buyer.lastName }}
                      </h1>
                      <h1>
                        {{ order.buyer.email }}
                      </h1>
                      <h1>+44 7911 456789</h1>
                    </div>
                  </div>
                </div>
                <!-- END customer Contact Information -->
              </div>

              <!-- START Seller Contact Information -->
              <div>
                <h1 class="font-bold mt-4">Seller contact</h1>
                <div class="flex flex-row gap-8 w-full pt-4 md:pt-2">
                  <div class="text-gray-600 text-sm md:text-lg space-y-1">
                    <h1>Name:</h1>
                    <h1 class="text-sm md:text-lg md:block">Email:</h1>
                    <h1 class="text-sm md:text-lg md:block">Phone:</h1>
                  </div>
                  <div
                    class="text-accent text-sm md:text-lg font-bold space-y-1"
                  >
                    <h1>
                      {{ order.seller.firstName + '' + order.seller.lastName }}
                    </h1>
                    <h1>
                      {{ order.seller.email }}
                    </h1>
                    <h1>+44 7911 456789</h1>
                  </div>
                </div>
              </div>
              <!-- END Seller Contact Information -->
            </div>

            <!-- END General Information -->
          </div>
        </div>
        <!-- Descktop view -->
        <div
          class="
            max-w-md
            mx-auto
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            md:max-w-4xl
            mb-8
            hidden
            md:block
          "
        >
          <div class="sub-container">
            <!-- START Header Section -->
            <div class="mb-6 md:w-full">
              <h1 class="font-semibold text-lg mb-2">Order Detail</h1>
              <div>
                <span class="font-bold">Order ID:</span>
                <span class="italic"> #{{ $route.query.orderId }}</span>
              </div>
              <p class="text-sm">
                Payment Via <span class="text-accent font-bold">Stripe</span>
                #Paid on
                {{
                  order.orderDate.toDate().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                }}
              </p>
            </div>
            <!-- END Header Section -->

            <!-- START General Information -->
            <div class="general-section">
              <div
                class="
                  flex flex-row flex-nowrap
                  justify-between
                  md:justify-start
                  w-full
                  md:w-3/4
                  gap-8
                  mb-2
                "
              >
                <!-- START General Header Information -->
                <div class="flex-1">
                  <div class="md:mb-0 mb-2">
                    <h1 class="font-bold mb-2">General Mobile</h1>
                    <div class="flex flex-col md:flex-row gap-2">
                      <h1 class="text-sm">Order Created:</h1>
                      <span class="date-style">
                        {{
                          order.orderDate.toDate().toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })
                        }}</span
                      >
                    </div>
                  </div>

                  <div>
                    <h1 class="text-sm">Customer:</h1>
                    <div>
                      <p>
                        {{ order.buyer.firstName + ' ' + order.buyer.lastName }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- END General Header Information -->
                <!-- START customer Contact Information -->
                <div class="flex-1">
                  <h1 class="font-bold mb-2">Billing address</h1>
                  <div>
                    <h1>Full Name:</h1>
                    <div>
                      <a href="" class="text-blue-400 w-full underline"
                        >{{ order.buyer.firstName + '' + order.buyer.lastName }}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h1>Email address:</h1>
                    <div>
                      <a
                        href=""
                        class="text-blue-400 text-sm w-full underline"
                        >{{ order.buyer.email }}</a
                      >
                    </div>
                  </div>
                  <div>
                    <h1>Phone:</h1>
                    <p class="ml-2">+44 7911 456789</p>
                  </div>
                </div>
                <!-- END customer Contact Information -->
              </div>

              <!-- START Seller Contact Information -->
              <div>
                <h1 class="font-bold">Seller contact</h1>
                <div>
                  <h1>Full Name:</h1>
                  <div>
                    <p>
                      {{ order.seller.firstName + ' ' + order.seller.lastName }}
                    </p>
                  </div>
                </div>

                <div>
                  <h1 class="text-sm">Email Address:</h1>
                  <a href="#" class="text-blue-400 underline">{{
                    order.seller.email
                  }}</a>
                </div>

                <div>
                  <h1 class="text-sm">Phone:</h1>
                  <p>+44 7911 123456</p>
                </div>
              </div>
              <!-- END Seller Contact Information -->
            </div>

            <!-- END General Information -->

            <!-- START Change Status Button -->
            <div class="flex flex-col justify-center items-center">
              <b>Order Status</b>
              <div class="order-style">
                {{ this.order.status }}
              </div>
            </div>
            <!-- END Change Status Button -->
          </div>
        </div>
      </div>
    </div>

    <!-- Srtart Animation Section -->
    <div v-if="!order" class="relative">
      <div
        class="
          max-w-md
          mx-auto
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
          md:max-w-4xl
          mb-8
        "
      >
        <div class="md:flex">
          <div class="md:flex-shrink-0 mb-8 md:mb-0">
            <div
              class="
                animate-pulse
                h-48
                w-full
                object-cover
                md:h-full md:w-48
                bg-blue-200
              "
              alt="No images"
            />
          </div>
          <!-- Seller profile Start -->
          <div
            class="
              absolute
              top-44
              md:top-52
              left-80
              md:left-52
              flex flex-row
              items-center
              justify-center
            "
          >
            <div
              class="
                animate-pulse
                bg-blue-200
                w-20
                rounded-full
                border-2 border-white
                shadow-2xl
              "
              alt="no-image"
            />
            <div class="text-sm gap-2">
              <!-- <span class="animation-class-width"> </span>
              <p class="animation-class-width"></p> -->
            </div>
          </div>
          <div class="p-8">
            <div class="animation-class-width"></div>
            <div class="mt-2">
              <div class="gap-2">
                <div>
                  <span class="animation-class-width"> </span>
                </div>
                <div>
                  <span class="animation-class-width"></span>
                  <span class="animation-class-width"> </span>
                </div>
                <div>
                  <span class="animation-class-width"> </span>
                </div>
                <div>
                  <span class="animation-class-width"> </span>
                </div>
              </div>
            </div>
            <p class="animation-class-width"></p>
          </div>
        </div>
      </div>

      <div
        class="
          max-w-md
          mx-auto
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
          md:max-w-4xl
        "
      >
        <div class="sub-container">
          <!-- START Header Section -->
          <div class="mb-6 md:w-full">
            <h1 class="animation-class-width"></h1>
            <div>
              <span class="animation-class-width"></span>
              <span class="animation-class-width"></span>
            </div>
            <span class="animation-class-width"></span>
          </div>
          <!-- END Header Section -->

          <!-- START General Information -->
          <div class="general-section">
            <div
              class="
                flex flex-row flex-nowrap
                justify-between
                md:justify-start
                w-full
                md:w-3/4
                gap-8
                mb-2
              "
            >
              <!-- START General Header Information -->
              <div class="flex-1">
                <div class="md:mb-0 mb-2">
                  <h1 class="animation-class-width"></h1>
                  <div class="flex flex-col md:flex-row gap-2">
                    <span class="animation-class-width"> </span>
                  </div>
                  <div class="flex flex-col md:flex-row gap-2">
                    <span class="animation-class-width"> </span>
                  </div>
                </div>

                <div>
                  <span class="animation-class-width"></span>
                </div>
              </div>
              <!-- END General Header Information -->
              <!-- START customer Contact Information -->
              <div class="flex-1">
                <h1 class="animation-class md:animation-class-width"></h1>
                <div>
                  <h1 class="animation-class md:animation-class-width"></h1>
                </div>
                <div>
                  <h1 class="animation-class md:animation-class-width"></h1>
                </div>
                <div>
                  <h1 class="animation-class md:animation-class-width"></h1>
                </div>
              </div>
              <!-- END customer Contact Information -->
            </div>

            <!-- START Seller Contact Information -->
            <div>
              <h1 class="animation-class-width"></h1>

              <div>
                <h1 class="animation-class-width"></h1>
              </div>

              <div>
                <h1 class="animation-class-width"></h1>
              </div>
            </div>
            <!-- END Seller Contact Information -->
          </div>
          <!-- END General Information -->

          <!-- START Change Status Button -->
          <div class="flex flex-col justify-center items-center">
            <h1 class="animation-class-width"></h1>
          </div>
          <!-- END Change Status Button -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueToastify from 'vue-toastify'

Vue.use(VueToastify)

export default Vue.extend({
  data() {
    return {
      loading: false,
      order: false,
      buyerInfo: false,
      windowLoading: false,
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      const order = await this.$store.dispatch('market/getOrder', {
        orderId: this.$route.query.orderId,
      })
      setTimeout(() => {
        this.order = order
      }, 5000)
    },
    // Finding Total amount of order
    totalPrice(productPrice, quantity, addedTax) {
      let netAmount = productPrice * quantity + addedTax
      return Number.parseFloat(netAmount).toFixed(2)
    },
  },
})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.sub-container {
  @apply md:p-8 p-4 bg-white mt-8 shadow-xl flex flex-col items-start;
}
.general-section {
  @apply flex flex-col md:flex-row md:items-start mb-6 w-full;
}
.general-section-mobile {
  @apply flex flex-col md:flex-row md:items-start mb-6 w-full;
}
.date-style {
  @apply text-gray-700 text-sm border-2 border-gray-200 rounded-lg px-2;
}
.order-style {
  @apply flex justify-center items-center text-white font-bold bg-accent rounded-3xl w-24 h-8 mt-2;
}
.sub-product-container {
  @apply bg-white shadow-sm w-5/6 rounded-sm p-8 divide-y divide-gray-200 gap-2;
}
.animation-class {
  @apply animate-pulse h-5 bg-blue-200 rounded w-36 mb-2;
}
.animation-class-width {
  @apply animate-pulse h-5 bg-blue-200 rounded w-52 mb-2;
}
</style>
