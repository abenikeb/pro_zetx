<template>
  <div
    class="
      max-w-xl
      bg-white
      rounded-xl
      shadow-md
      md:max-w-5xl
      my-8
      p-2
      md:p-4
      ml-2
    "
  >
    <h1 class="font-bold text-lg">Orders</h1>
    <p class="text-xs hidden md:block mb-4">
      In the order section, you can review and manage all orders with their
      details, as well as you can view and edit order status.
    </p>

    <p class="md:hidden text-xs text-gray-700 mb-4">
      In the order section, you can review all orders with their details and
      edit order status.
    </p>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        trigger: 'enter',
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        mode: 'pages',
        perPage: 5,
      }"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'createdAt', type: 'desc' },
      }"
      :line-numbers="true"
    >
      <!-- START order status style -->
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'order'" class="text-sm text-accent">
          <span>
            {{ `${props.row.order} ` }}
          </span>
        </span>
        <span v-if="props.column.field == 'customer'" class="text-sm">
          <span>
            {{ props.row.customer }}
          </span>
        </span>
        <span
          v-if="props.column.field == 'order_number'"
          class="text-sm text-gray-900 font-semi-bold"
        >
          <span>
            {{ props.row.order_number }}
          </span>
        </span>
        <span v-if="props.column.field == 'createdAt'" class="text-sm">
          <span>
            {{ props.row.createdAt }}
          </span>
        </span>
        <span
          v-if="props.column.field == 'delivery_status'"
          class="flex md:flex-row flex-col items-center relative gap-4"
        >
          <span
            v-if="props.row.delivery_status === 'pending'"
            class="row-style bg-yellow-400"
          >
            {{ props.row.delivery_status }}</span
          >
          <span
            v-if="props.row.delivery_status === 'accepted'"
            class="bg-blue-400 row-style"
          >
            {{ props.row.delivery_status }}</span
          >
          <span
            v-if="props.row.delivery_status === 'delivered'"
            class="bg-accent row-style"
          >
            {{ props.row.delivery_status }}</span
          >
          <span class="bg-gray-200 md:bg-none flex justify-center row-style">
            <img
              src="~assets/images/product/view-svgrepo-com(1).svg"
              class="text-sm text-white cursor-pointer w-5"
              @click="onRowClick(props.row.order_id)"
          /></span>
        </span>
        <!-- <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span> -->
      </template>
      <!-- END order status style -->
    </vue-good-table>
  </div>
</template>

<script>
import Vue from 'vue'

import VueGoodTablePlugin from 'vue-good-table'

// import the vue-good-table styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin)

export default Vue.extend({
  data() {
    return {
      columns: [
        {
          label: 'Order ID',
          field: 'order_number',
        },
        {
          label: 'Customer',
          field: 'customer',
          type: 'string',
        },
        {
          label: 'Order',
          field: 'order',
          type: 'string',
        },
        {
          label: 'Date',
          field: 'createdAt',
          type: 'string',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Status',
          field: 'delivery_status',
          type: 'string',
        },
      ],
      rows: [],
    }
  },

  computed: {
    orders() {
      return this.$store.state.products.orders.orders
    },
    orderNotificationCount() {
      return this.$store.state.products.orders.orderNotifications.length
    },
  },

  async created() {
    await this.loadOrders()
    await this.loadNotification()
    this.orders.forEach((order) =>
      this.rows.push({
        order_id: order.id,
        order_number: order.orderNumber,
        customer: order.buyer.firstName + ' ' + order.buyer.lastName,
        order: order.product.product.name,
        createdAt: order.orderDate.toDate().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
        delivery_status: order.status,
      })
    )
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

    onRowClick(params) {
      this.$router.push({
        path: '/dashboard/product/orderDetail',
        query: { id: params },
      })
    },
  },
})
</script>

<style scoped>
.row-style {
  @apply text-xs text-white rounded-sm text-white px-2 py-1 w-16;
}

.side-hover {
  @apple;
}

.active-input {
  @apply w-full flex flex-col justify-start  px-6;
}

.activeClass {
  @apply bg-accent bg-opacity-40 text-black font-semibold;
}
</style>
