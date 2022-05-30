<template>
  <div>
    <h1 class="ml-5 mt-3 font-bold text-2xl">Dashboard Panel</h1>
    <!-- the cards -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between">
            <div class="widget-label">
              <h3>Users</h3>
              <button
                v-if="userData.length == 0"
                class="btn border-none loading bg-white"
              ></button>
              <h1 v-else>
                {{ userData.length }}
              </h1>
            </div>
            <span class="icon widget-icon text-green-500"
              ><img src="~/assets/images/Users.svg" class="w-22 mr-5"
            /></span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between">
            <div class="widget-label">
              <h3>Orders</h3>
              <button
                v-if="orderData.length == 0"
                class="btn border-none loading bg-white"
              ></button>
              <h1 v-else>{{ orderData.length }}</h1>
            </div>
            <span class="icon widget-icon text-blue-500"
              ><img src="~/assets/images/ordersCart.svg" class="w-22 mr-5"
            /></span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between">
            <div class="widget-label">
              <h3>Carbon Transactions</h3>
              <button
                v-if="caronTransaction.length == 0"
                class="btn border-none loading bg-white"
              ></button>
              <h1 v-else>{{ caronTransaction.length }}</h1>
            </div>
            <span class="icon widget-icon text-red-500"
              ><img src="~/assets/images/cc.svg" class="w-22 mr-5"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'admin',
  data() {
    return {
      userData: [],
      orderData: [],
      caronTransaction: [],
    }
  },
  async created() {
    // fetching user data
    try {
      if(!this.$store.state.dashboard.userData)
      await this.$store.dispatch('dashboard/getTotalUsersAction')
    this.userData = this.$store.state.dashboard.userData
    
    } catch (ex) {
      console.log(ex)
    }

    // fetching order data
    try {
      if(!this.$store.state.dashboard.orderData)
         await this.$store.dispatch('dashboard/getTotalOrdersAction')
      this.orderData = this.$store.state.dashboard.orderData
      
    } catch (ex) {
      console.log(ex)
    }
    // fetching carbon transaction data
    try {
      if(!this.$store.state.dashboard.carbonCreditTransaction)
         await this.$store.dispatch('dashboard/getCarbonCreditTransactionAction')
      this.caronTransaction = this.$store.state.dashboard.carbonCreditTransaction
    } catch (ex) {
      console.log(ex)
    }
  },
})
</script>

<style scoped>
.card {
  @apply bg-white border border-gray-100 rounded shadow-lg mx-5 my-3 w-80 md:w-auto;
}

.card.has-table .card-content {
  @apply p-0;
}

.card-content {
  @apply p-6;
}

.card-content hr {
  @apply my-6 -mx-6;
}

.card.empty .card-content {
  @apply text-center py-12 text-gray-500;
}

.card-header {
  @apply flex items-stretch border-b border-gray-100;
}

.card-header-title,
.card-header-icon {
  @apply flex items-center py-3 px-4;
}

.card-header-title {
  @apply flex-grow font-bold;
}

.card-header-icon {
  @apply justify-center;
}

.widget-label h3 {
  @apply text-lg mb-3 leading-tight text-gray-500 truncate;
}

.widget-label h1 {
  @apply text-3xl leading-tight font-semibold;
}

.form-screen .card {
  @apply w-11/12 lg:w-5/12 shadow-2xl rounded-lg;
}
</style>