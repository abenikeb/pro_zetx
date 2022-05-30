<template>
  <div class="px-2">
    <div class="max-w-md md:w-full lg:gap-2 flex flex-col">
      <div class="mt-4">
        <b>Transaction History</b>
      </div>

      <div class="p-4 bg-gray-200 mt-4 rounded-md">
        <div class="flex flex-row gap-2 mb-4">
          <h1 class="text-lg pb-2">Filter</h1>
          <img
            src="~/assets/images/product/filter2.png"
            alt=""
            class="w-5 h-6"
          />
        </div>
        <div v-for="(order, index) in orders" :key="index" :order="order">
          <div
            :v-if="orders.status === 'delivered'"
            class="flex w-full flex-row gap-2 items-center mb-4"
          >
            <div
              class="
                bg-white
                w-24
                text-sm
                h-12
                rounded-md
                flex flex-col
                items-center
              "
            >
              <b>{{
                order.orderDate.toDate().toLocaleString('en-US', {
                  day: 'numeric',
                })
              }}</b>
              {{
                order.orderDate.toDate().toLocaleString('en-US', {
                  month: 'long',
                })
              }}
            </div>
            <div
              class="
                bg bg-white
                w-full
                h-16
                rounded-md
                flex flex-row flex-nowrap
                items-center
                justify-between
                px-4
              "
            >
              <div class="flex flex-col">
                <p>
                  <b>{{ order.product.product.name }}</b>
                </p>
                <p class="text-sm">
                  {{ order.product.product.location.city }},
                  {{ order.product.product.location.country }}
                </p>
              </div>
              <div>
                <p class="text-accent">
                  {{ `${order.price.grossPrice}£` }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  computed: {
    orders() {
      return this.$store.state.products.orders.orders
    },
    orderNotificationCount() {
      return this.$store.state.products.orders.orderNotifications.length
    },
  },

  created() {
    this.loadOrders()
    this.loadNotification()
  },

  methods: {
    async loadOrders() {
      this.$store.dispatch('loading/toggleLoading', true)
      await this.$store.dispatch('products/fetchAllOrders')
      this.$store.dispatch('loading/toggleLoading', false)
    },
    async loadNotification() {
      await this.$store.dispatch('products/fetchAllOrderNotifications')
    },
  },
})
</script>

<style scoped></style>
