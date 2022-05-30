<template>
  <div class="relative">
    <nuxt-link to="/business/dashboard/carbon/manage" class="back-btn">
      <div class="mask-back">
        <img class="" alt="" />
      </div>
      <p class="hidden md:block"></p>
    </nuxt-link>

    <section class="list-container">
      <div class="list-container-inner">
        <!-- Start Title Section -->
        <div class="my-5 relative">
          <h2 class="_title">Auction Summary</h2>
          <hr />
        </div>
        <!-- End Title Section -->
        <p>Here is the list of bidders who participated in this auction</p>
        <!-- table section start -->
        <div class="table-header">
          <h1 class="md:w-1/6 w-4">#</h1>
          <h1 class="w-1/4 md:w-1/3">Name</h1>
          <h1 class="w-1/6">Bid</h1>
          <h1 class="1/5 md:w-1/6">Status</h1>
        </div>
        <div v-if="auctionData.length > 0" class="">
          <div
            v-for="(p, i) in auctionData"
            :key="i"
            class="table-body"
            :class="{ 'table-body-accent': i == 0 }"
          >
            <span class="font-bold md:w-1/6 w-4">
              {{ i + 1 }}
            </span>
            <span class="flex items-center w-1/4 md:w-1/3">
              <h1 class="truncate text-left capitalize">
                {{ p.employeeName }}
              </h1>
            </span>
            <span class="w-1/6 truncate text-left">{{ p.bidCarbon }} CC</span>
            <span
              v-if="i == 0"
              class="1/5 md:w-1/6 text-left flex gap-1 items-center"
            >
              <i class="fa fa-check mr-1"></i>
              Winner
            </span>
            <span v-else-if="i == 1" class="1/5 md:w-1/6 text-gray-400">
              Runner up
            </span>
            <span v-else class="1/5 md:w-1/6 text-gray-400"> Contender </span>
          </div>
        </div>
        <div v-else class="p-4 text-gray-600">There were no bidders.</div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
export default Vue.extend({
  layout: 'auth',
  /* eslint object-shorthand: "error" */
  data() {
    return {
      auctionData: [],
      business: undefined,
      requestAmount: 0,
      price: 0,
      isRequestSent: false,
      requestLoading: false,
    }
  },
  computed: {
    leaderboardSection() {
      return this.$route.query
    },
    sortedList() {
      return 'sortedlist'
    },
    user() {
      return this.$store.state.auth.authUser
    },
  },

  created() {
    this.$store.dispatch('loading/toggleLoading', true)
    this.loadBiddersData()
    this.handleSetRequest()
    this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {
    async loadBiddersData() {
      const businessAuctionsCollection = await this.$fire.firestore
        .collection('businessAuctions')
        .doc(this.$route.query.id)
        .get()

      const auctionData_ = []

      businessAuctionsCollection.data().bids.forEach((e) => {
        auctionData_.push(e)
      })
      const sortedData = _.sortBy(auctionData_, (o) => o.price).reverse()

      this.auctionData = sortedData

      this.requestAmount = businessAuctionsCollection.data().CCamount
      this.price = businessAuctionsCollection.data().price
      this.$store.dispatch('loading/toggleLoading', false)

      this.isAuctionDataReady = false

      this.businessInfo()
    },

    async handleSetRequest() {
      const requestAuctiosRef = await this.$fire.firestore
        .collection('carbonCreditRequests')
        .where('auctionId', '==', this.$route.query.id)
        .get()
      const alereadySent = requestAuctiosRef.docs[0]

      if (typeof alereadySent === 'undefined') return
      if (typeof alereadySent === 'object') {
        this.isRequestSent = true
      }
    },

    onlyUnique(value, index, self) {
      return self.indexOf(value.uid) === index
    },

    async businessInfo() {
      const uid = this.$fire.auth.currentUser?.uid
      const businessRef = this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', uid)
        .limit(1)

      const businessData = (await businessRef.get()).docs[0]
      const business = { id: businessData.id, ...businessData.data() }
      this.business = business
    },
  },
})
</script>

<style scoped>
.list-container {
  @apply w-full flex flex-col justify-start items-center;
}

.list-container .list-container-inner {
  @apply w-11/12 md:w-3/5 mx-auto;
}

.list-container .list-container-inner ._title {
  @apply font-bold text-gray-600 text-xl md:text-3xl flex flex-row px-6 md:px-1 mt-5 align-bottom gap-2;
}

.list-container .list-container-inner > p {
  @apply mt-2 mb-4 text-sm md:text-lg text-gray-700;
}

.list-container .table-header {
  @apply flex justify-between items-center bg-white border h-10 px-2 mb-1
          md:px-5 md:text-base text-sm font-semibold overflow-x-auto;
}

.list-container .table-body {
  @apply flex justify-between items-center overflow-x-auto bg-white border w-full
          h-10 mb-1 px-2 md:px-5 md:text-sm  text-xs;
}

.list-container .table-body-accent {
  @apply bg-accent text-white;
}

.back-btn {
  @apply absolute md:top-2 top-5 left-0 text-sm font-bold
        text-accent flex items-center ml-2  gap-2;
}

button {
  font-size: 0.65rem;
}

button img {
  @apply w-4;
}

.mask-back {
  -webkit-mask-image: url(~/assets/images/business/arrow_back.svg);
  mask-image: url(~/assets/images/business/arrow_back.svg);
}

.mask-back img {
  @apply bg-accent w-6 h-6;
}
</style>
