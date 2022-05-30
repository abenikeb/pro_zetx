<template>
  <div class="main-container">
    <div class="table-container">
      <h1><b>CARBON TRANSACTION PANEL</b></h1>
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
      >
        <!-- START TABLE STYLE -->
        <template slot="table-row" slot-scope="props" class="text-sm">
          <span v-if="props.column.field == 'employeeName'">
            <span> {{ props.row.employeeName }} </span>
          </span>
          <span v-if="props.column.field == 'amount'">
            {{ props.row.amount }} <span class="text-accent">CC</span>
          </span>
          <span v-if="props.column.field == 'to'"> {{ props.row.to }} </span>
          <span v-if="props.column.field == 'transaction_date'">
            {{ props.row.transaction_date }}
          </span>
        </template>
        <!-- END TABLE STYLE style -->
      </vue-good-table>
    </div>

    <!-- <div class="table-container mt-8">
      <h1><b>(Pending) Carbon Transaction Panel</b></h1>
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
      >

        <template slot="table-row" slot-scope="props" class="text-sm">
          <span v-if="props.column.field == 'employeeName'">
            <span> {{ props.row.employeeName }} </span>
          </span>
          <span v-if="props.column.field == 'amount'">
            {{ props.row.amount }}<span class="text-accent">CC</span>
          </span>
          <span v-if="props.column.field == 'to'"> {{ props.row.to }} </span>
          <span v-if="props.column.field == 'transaction_date'">
            {{ props.row.transaction_date }}
          </span>
        </template>
      </vue-good-table>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'

import VueGoodTablePlugin from 'vue-good-table'

// import the vue-good-table styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin)

export default {
  data() {
    return {
      businessId: 'NpuBthBprWQO4ZNDsf2G',
      columns: [
        {
          label: 'From',
          field: 'employeeName',
          type: 'string',
        },
        {
          label: 'To',
          field: 'to',
          type: 'string',
        },
        {
          label: 'Amount',
          field: 'amount',
          type: 'string',
        },
        {
          label: 'Transaction Date',
          field: 'transaction_date',
        },
      ],
      rows: [],
    }
  },
  computed: {
    carbonTransaction() {
      return this.$store.state.business.carbonTransactions
    },
  },
  created() {
    this.loadBusinessTransaction()
    this.populateTable()
    this.updateBusinessAuctionStatus()
  },
  methods: {
    async loadBusinessTransaction() {
      this.$store.dispatch('loading/toggleLoading', true)

      const uid = this.$fire.auth.currentUser?.uid
      const businessDoc = (
        await this.$fire.firestore
          .collection('business')
          .where('BusinessOwnerId', '==', uid)
          .limit(1)
          .get()
      ).docs[0]

      this.business = {
        id: businessDoc.id,
        ...businessDoc.data(),
      }

      await this.fetchCarbonTransactions()

      this.$store.dispatch('loading/toggleLoading', false)
    },
    populateTable() {
      this.carbonTransaction.forEach((transaction) =>
        this.rows.push({
          id: transaction.id,
          employeeName: transaction.employeeName,
          amount: transaction.amount,
          transaction_date: transaction.transaction_date,
          action: 'pass',
        })
      )
    },
    async fetchCarbonTransactions() {
      const transactionsDocListRef = this.$fire.firestore
        .collection('carbonCreditTransaction')
        .where('receiverId', '==', this.business.id)
        .limit(6)

      const transactionDocs = await transactionsDocListRef.get()
      const userRefList = transactionDocs.docs.map((t) =>
        this.$fire.firestore.collection('users').doc(t.data().senderId).get()
      )

      const users = (await Promise.all(userRefList)).map((userDoc) =>
        _.pick(
          {
            id: userDoc.id,
            ...userDoc.data(),
            fullName: `${userDoc.data()?.firstName} ${
              userDoc.data()?.lastName
            }`,
          },
          ['fullName', 'email', 'id']
        )
      )

      this.rows = []
      transactionDocs.forEach((tDoc) => {
        const user = users.find((u) => u.id === tDoc.data().senderId)

        this.rows?.push({
          id: tDoc.id,
          employeeName: user.fullName,
          amount: tDoc.data().amount,
          email: user.email,
          to: this.business.Name,
          transaction_date: new Date(
            tDoc.data().transactionDate.toDate()
          ).toDateString(),
        })
      })
    },
    async updateBusinessAuctionStatus() {
      await this.$store.dispatch('business/updateBusinessAuctionStatus')
    },
  },
}
</script>

<style scoped>
.main-container {
  @apply p-8;
}
.table-container {
  @apply max-w-md
    md:max-w-3xl
    lg:max-w-5xl
    overflow-hidden
    mx-auto
    space-y-4;
}
</style>
