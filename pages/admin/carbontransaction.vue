<template>
  <div class="overflow-y-auto">
    <h1 class="ml-5 mt-3 mb-5 font-bold text-2xl">Total Carbon Transactions</h1>
    <!-- the carbon transaction table -->
    <vue-good-table
      class="condensed vgt-table px-4 overflow-y-auto"
      :columns="columns"
      :search-options="{
        enabled: true,
        placeholder: 'Search...',
      }"
      :rows="carbonTransaction"
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
        <!-- the carbon trnascation date column condition -->
        <div v-else-if="props.column.field == 'transactionDate'">
          <span>{{ props.row.transactionDate }}</span>
        </div>
        <!-- the carbon trnascation amount column condition -->
        <div v-else-if="props.column.field == 'Amount'">
          <span class="mr-1">{{ props.row.amount }}</span><b>CC</b>
        </div>

        <!-- this will apply for the columns that have no condtions written -->
        <span v-else class="text-xs">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>


<script>
export default { 
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
          label: 'Amount',
          field: 'Amount',
          width: '90px',
        },
        {
          label: 'Transaction Date',
          field: 'transactionDate',
          width: '100px',
        },
      ],
      carbonTransaction:[] 
    }
  },
  async created(){
    // gets the carbon transaction data
      try {
      const finalTransactionData = []
      this.$store.dispatch('loading/toggleLoading', true)
       if(!this.$store.state.dashboard.carbonCreditTransaction)
        await this.$store.dispatch('dashboard/getCarbonCreditTransactionAction')
      
      const tempTransactionData = this.$store.state.dashboard.carbonCreditTransaction

      tempTransactionData.forEach(async (transaction) => {
        const sellerData = await this.$store.dispatch(
          'dashboard/getUserDataById',
          transaction.senderId
        )
        const buyerData = await this.$store.dispatch(
          'dashboard/getUserDataById',
          transaction.receiverId
        )

        finalTransactionData.push({
            sellerName:
            sellerData.data().firstName + '  ' + sellerData.data().lastName,
          buyerName:
            buyerData.data().firstName + '  ' + buyerData.data().lastName,
          transactionDate: new Date(
            transaction.transactionDate.seconds * 1000
          ).toLocaleDateString(), 
          amount: transaction.amount 
        })
      this.$store.dispatch('loading/toggleLoading', false)
      });  
      this.carbonTransaction = finalTransactionData
      }catch(ex){
      this.$store.dispatch('loading/toggleLoading', false)
          console.log(ex)
      }
  } ,
}
</script>