<template>
  <div>
    <div v-if="order" class="">
      <!-- BACK link section -->
      <nuxt-link
        to="/dashboard/product/manage/ordersList"
        class="text-sm font-bold mb-2"
      >
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
            <div class="md:flex-shrink-0 mb-2 md:mb-0">
              <img
                class="h-48 w-full object-cover md:h-full md:w-48"
                :src="order.product.product.images[0]"
                alt="No images"
              />
            </div>
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
                </div>
              </div>

              <p
                class="
                  block
                  leading-tight
                  font-medium
                  text-black
                  hover:underline
                  mt-4
                  font-bold
                "
              >
                {{
                  `TOTAL (GBP): ${totalPrice(
                    order.price.netPrice,
                    order.product.quantity,
                    order.price.addedTax * order.product.quantity
                  )} £`
                }}
              </p>
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
                    <h1>
                      <p class="float-right"></p>
                      OrderID:
                    </h1>
                    <h1 class="text-sm md:text-lg md:block">Via:</h1>
                    <h1>Date:</h1>
                  </div>
                  <div
                    class="text-accent text-sm md:text-lg font-bold space-y-1"
                  >
                    <h1>#{{ $route.query.id }}</h1>
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

              <!-- START Change Status Button -->
              <div class="mt-4">
                <div v-if="order">
                  <h1><b>Order Status</b></h1>
                  <p v-if="this.order.status !== 'delivered'" class="text-xs">
                    Click the button to change the status
                  </p>
                </div>
                <div
                  v-if="!order"
                  class="animate-pulse h-5 bg-green-200 rounded w-32 mb-2 mt-2"
                ></div>

                <button
                  v-if="order"
                  @click="changeStatus"
                  class="btn btn-accent w-32 mt-2"
                >
                  <div v-if="loading" class="animate-spin h-5 w-5 mr-3">
                    <img
                      src="~/assets/images/product/circle-spinner-accent.svg"
                      alt=""
                    />
                  </div>

                  <div v-if="order">
                    <h1 v-if="!loading">
                      {{ this.order.status }}
                    </h1>
                  </div>

                  <h1 class="text-xs" v-if="loading">Please Wait..</h1>
                </button>
                <button
                  v-if="!order"
                  class="btn btn-accent animate-pulse w-42 mt-2"
                >
                  Loading...
                </button>
              </div>
              <!-- END Change Status Button -->
            </div>

            <!-- END General Information -->
          </div>
        </div>
        <!-- Descktop view -->
        <div
          class="
            mx-auto
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            md:max-w-5xl
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
                    <h1 class="font-bold mb-2">General</h1>
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
                    <h1 class="text-sm">Full Name:</h1>
                    <div>
                      <a href="" class="text-blue-400 text-sm w-full underline"
                        >{{ order.buyer.firstName + '' + order.buyer.lastName }}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h1 class="text-sm">Email address:</h1>
                    <div>
                      <a
                        href=""
                        class="text-blue-400 text-sm w-full underline"
                        >{{ order.buyer.email }}</a
                      >
                    </div>
                  </div>
                  <div>
                    <h1 class="text-sm">Phone:</h1>
                    <p class="">+44 7911 456789</p>
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
                    <p class="">
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
                  <p class="">+44 7911 123456</p>
                </div>
              </div>
              <!-- END Seller Contact Information -->
            </div>

            <!-- END General Information -->

            <!-- START Change Status Button -->
            <div class="mt-2">
              <div v-if="order">
                <h1><b>Order Status</b></h1>
                <p v-if="this.order.status !== 'delivered'" class="text-xs">
                  Click the button to change the status
                </p>
              </div>
              <div
                v-if="!order"
                class="animate-pulse h-5 bg-green-200 rounded w-36 mb-2 mt-2"
              ></div>

              <button
                v-if="order"
                @click="changeStatus"
                class="btn btn-accent w-42 mt-2"
              >
                <div v-if="loading" class="animate-spin h-5 w-5 mr-3">
                  <img
                    src="~/assets/images/product/circle-spinner-accent.svg"
                    alt=""
                  />
                </div>

                <div v-if="order">
                  <h1 v-if="!loading">
                    {{ this.order.status }}
                  </h1>
                </div>

                <h1 class="text-xs" v-if="loading">Please Wait..</h1>
              </button>
              <button
                v-if="!order"
                class="btn btn-accent animate-pulse w-42 mt-2"
              >
                Loading...
              </button>
            </div>
            <!-- END Change Status Button -->
          </div>
        </div>
      </div>
    </div>

    <!-- Srtart Animation Section -->
    <div class="relative" v-if="!order">
      <div
        class="
          max-w-md
          mx-auto
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
          md:max-w-4xl
          px-2
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
                bg-green-200
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
                bg-green-200
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
    <v-dialog />
  </div>
</template>

<script>
import Vue from 'vue'
import VueToastify from 'vue-toastify'
import { OrderStatusState } from '~/plugins/model/order.model'

Vue.use(VueToastify)

export default Vue.extend({
  props: ['orderID'],
  data() {
    return {
      loading: false,
      order: false,
      buyerInfo: false,
      windowLoading: false,
      settings: {
        singular: true,
        title: 'Success',
        body: 'Order Status Changed Successfully',
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

  created() {
    this.init()
  },

  methods: {
    async init() {
      try {
        const order = await this.$store.dispatch('products/getOrder', {
          orderId: this.$route.query.id,
        })
        setTimeout(() => {
          this.order = order
        }, 3000)
      } catch (error) {
        this.errorSetting.body = err.message
        this.$vToastify.error(this.errorSetting)
        this.$router.push({
          path: '/dashboard/product/manage',
        })
      }
    },

    totalPrice(productPrice, quantity, addedTax) {
      // let netAmount = Math.round(productPrice * quantity + addedTax)
      return Number.parseFloat(productPrice * quantity + addedTax).toFixed(2)
    },

    statusConfirm(OrderStatusStateChanged) {
      this.$modal.show('dialog', {
        title: 'You Are Change Status of an Order',
        text: `Are you sure you want to Change the Order Status?`,

        buttons: [
          {
            title: 'Yes',
            handler: async () => {
              this.$modal.hide('dialog')

              await this.$store.dispatch('products/updateOrder', {
                orderId: this.order.id,
                orderState: OrderStatusStateChanged,
              })

              this.order.status = OrderStatusStateChanged
              this.$vToastify.success(this.settings)
            },
          },
          {
            title: 'No',
            handler: () => {
              this.$modal.hide('dialog')
            },
          },
        ],
      })
    },

    changeStatus() {
      this.loading = true

      if (this.order.status === OrderStatusState.PENDING) {
        this.statusConfirm(OrderStatusState.ACCEPTED)
      } else if (this.order.status === OrderStatusState.ACCEPTED) {
        this.statusConfirm(OrderStatusState.DELIVERED)
      }

      this.loading = false
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
.date-style {
  @apply text-gray-700 text-xs border-2 border-gray-200 rounded-lg;
}
</style>
