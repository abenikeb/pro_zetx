<template>
  <div class="overflow-y-auto">
    <h1 class="ml-5 mt-3 mb-5 font-bold text-2xl">Total Orders</h1>
    <!-- the order table -->
    <vue-good-table
      class="condensed vgt-table px-4 overflow-y-auto"
      :columns="columns"
      :search-options="{
        enabled: true,
        placeholder: 'Search...',
      }"
      :rows="orderList"
      line-numbers
      :pagination-options="{
        enabled: true,
        mode: 'records',
      }"
    >
      <!-- the table rows are rendered here based on their conditions -->
      <template slot="table-row" slot-scope="props">
        <!-- the sellerName column condition -->
        <div v-if="props.column.field == 'seller'">
          <span>{{ props.row.sellerName }}</span>
        </div>
        <!-- the buyerName column condition -->
        <div v-else-if="props.column.field == 'buyer'">
          <span>{{ props.row.buyerName }}</span>
        </div>
        <!-- the orderDate column condition -->
        <div v-else-if="props.column.field == 'orderDate'">
          <span>{{ props.row.orderDate }}</span>
        </div>
        <!-- the progress status column condition -->
        <span v-else-if="props.column.field == 'status'">
          <span
            v-if="props.row.status == 'pending'"
            class="bg-yellow-400 text-white px-3 py-1 text-sm rounded-full ml-5"
            >Pending</span
          >
          <span
            v-if="props.row.status == 'accepted'"
            class="bg-blue-400 text-white px-3 py-1 text-sm rounded-full ml-5"
            >accepted</span
          >
          <span
            v-if="props.row.status == 'delivered'"
            class="bg-green-400 text-white px-3 py-1 text-sm rounded-full ml-5"
            >delivered</span
          >
          <span
            v-if="props.row.status == 'canceled'"
            class="bg-red-400 text-white px-3 py-1 text-sm rounded-full ml-5"
            >canceled</span
          >
        </span>
        <!-- the Action column -->

        <span v-else-if="props.column.field == 'action'">
          <span
            id="viewBtn"
            class="
              btn btn-outline
              border-gray-300
              hover:bg-accent hover:border-accent
              bg-gray-300
              btn-sm
              mx-4
            "
            @click="
              showModal = true
              getOrderDetails(props.row.orderId)
            "
          >
            <i class="fa fa-eye text-white"></i>
          </span>
        </span>
        <!-- this will apply for the columns that have no condtions written -->
        <span v-else class="text-xs">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <modal
      v-if="showModal"
      :order="displayedOrder"
      @close-modal="showModal = false"
    />
    <!-- <modal :orderDetails="orderDetails" v-show="showModal" @close-modal="showModal = false"/> -->
  </div>
</template>



<script>
import firebase from 'firebase'
import Vue from 'vue'
import modal from '~/components/Modal.vue'
export default {
  components: {
    modal,
  },
  layout: 'admin',
  data() {
    return {
      columns: [
        {
          label: 'Seller Name',
          field: 'seller',
          width: '90px',
        },
        {
          label: 'Buyer Name',
          field: 'buyer',
          width: '90px',
        },
        {
          label: 'Order Date',
          field: 'orderDate',
          width: '90px',
        },
        {
          label: 'Status',
          field: 'status',
          width: '20px',
        },
        {
          label: 'Action',
          field: 'action',
          width: '10px',
          sortable: false,
        },
      ],
      orderList: [],
      orders: [],
      showModal: false,
      orderDetails: [],
      orderId: '',
      users: {},
      displayedOrder: {},
    }
  },
  async created() {
    // gets the order data
    try {
      this.$store.dispatch('loading/toggleLoading', true)
      if(!this.$store.state.dashboard.orderData)
         await this.$store.dispatch('dashboard/getTotalOrdersAction')
      this.orders = this.$store.state.dashboard.orderData

      const userIds = []
      this.orders.forEach((order) => {
        if (!userIds.includes(order.buyerId)) {
          userIds.push(order.buyerId)
        }
        if (!userIds.includes(order.sellerId)) {
          userIds.push(order.sellerId)
        }
      })
      const userRef = firebase.firestore().collection('users')
      const userSnapshot = await userRef
        .where(firebase.firestore.FieldPath.documentId(), 'in', userIds)
        .get()
      userSnapshot.forEach((snapshot) => {
        
        this.users[snapshot.id] = snapshot.data()
      })

      this.orders.forEach((orders) => {
        orders.sellerName =
          this.users[orders.sellerId].firstName +
          ' ' +
          this.users[orders.sellerId].lastName
        orders.buyerName =
          this.users[orders.buyerId].firstName +
          ' ' +
          this.users[orders.buyerId].lastName
        this.orderList.push({
          orderId: orders.id,
          sellerName:
            this.users[orders.sellerId].firstName +
            ' ' +
            this.users[orders.sellerId].lastName,
          buyerName:
            this.users[orders.buyerId].firstName +
            ' ' +
            this.users[orders.buyerId].lastName,
          orderDate: new Date(
            orders.orderDate.seconds * 1000
          ).toLocaleDateString(),
          status: orders.status,
        })
        this.$store.dispatch('loading/toggleLoading', false)
      })
    } catch (ex) {
      console.log(ex)
      this.$store.dispatch('loading/toggleLoading', false)
    }
  },
  methods: {
    // gets a specific order detail data
    getOrderDetails(id) {
      this.displayedOrder = this.orders.find((order) => order.id === id)
    },
  },
}
</script>