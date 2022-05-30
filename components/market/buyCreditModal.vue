<template>
  <div
    class="
      w-screen
      h-screen
      flex
      justify-center
      items-center
      fixed
      top-0
      left-0
      z-50
      bg-black bg-opacity-40
    "
  >
    <div
      class="
        md:w-1/2
        p-4
        md:p-10
        flex-row
        md:flex-col
        relative
        justify-center
        shadow-lg
        rounded-xl
        bg-white
      "
    >
      <!-- show current highest bid pinned on the top of the modal -->

      <span
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div class="text-center mb-5">
        <h6 class="text-2xl md:text-5xl font-semibold text-center">
          {{ auction.data.amount }}CC
        </h6>
        <p class="font-semibold text-lg md:text-2xl">
          Bid Starts with:
          <span class="text-accent">{{ auction.data.price }}$</span>
        </p>
      </div>
      <div class="flex w-full justify-center items-center">
        <label class="label"> </label>
        <input
          v-model="bid.amount"
          type="number"
          :min="auction.data.price"
          step="0.5"
          class="
            input
            border-2 border-black
            input-sm
            md:input-md
            w-1/2
            md:w-1/2
          "
        />
        <button
          class="btn btn-accent btn-sm md:btn-md mx-2"
          @click.prevent="placeBid"
        >
          Place bid
        </button>
      </div>
      <h5 class="text-xs md:text-sm text-gray-700 text-center font-light mt-2">
        Bidding ends at: {{ endDate }}
      </h5>
      <h2
        v-if="auction.data.bids.length"
        class="mt-5 md:text-lg font-semibold ml-2 border-b text-base w-full"
      >
        Current Bids
      </h2>

      <h2
        v-else
        class="
          mt-5
          md:text-lg
          font-semibold
          ml-2
          border-b
          text-base text-center text-gray-400
        "
      >
        No bids yet
      </h2>

      <div class="h-60 overflow-auto">
        <div
          v-if="auction.data.bids.length"
          class="
            flex
            justify-between
            items-center
            w-full
            px-5
            text-sm
            mt-4
            md:text-base
            font-bold
            border-b
          "
        >
          <h1>Bidder</h1>
          <h1>Amount</h1>
          <h1>Date Time</h1>
        </div>
        <div
          v-for="(b, i) in sortedBids"
          :key="i"
          class="flex justify-between items-center w-full px-5 text-sm mt-4"
        >
          <div class="flex items-center">
            <div
              class="
                w-8
                h-8
                flex
                justify-center
                items-center
                text-sm
                mr-1
                text-white
              "
            >
              <img :src="`https://robohash.org/${b.uid}.png?set=set3`" alt="" />
            </div>
            <h1 class="md:text-sm text-2xs">{{ b.firstName }}</h1>
          </div>
          <h1>${{ b.amount }}</h1>
          <h1 class="text-2xs md:text-sm text-gray-500">{{ b.time }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="">
import Vue from 'vue'
export default Vue.extend({
  props: {
    auction: Object,
  },

  computed: {
    userData() {
      return this.$store.state.auth.userData
    },
    auctionData() {
      return this.$store.state.auction.auctionData
    },
  },

  data() {
    return {
      bid: {
        amount: 0,
      },
    }
  },

  computed: {
    endDate() {
      return new Date(this.auction.data.auctionEndDate).toLocaleString()
    },

    sortedBids() {
      // console.log(this.auction.data.bids)
      const arr = this.auction.data.bids.map((b) => {
        return {
          amount: +b.amount,
          time: new Date(b.time).toLocaleString(),
          firstName: b.firstName,
          uid: b.uid,
        }
      })
      return _.sortBy(arr, ['amount']).reverse()
    },

    authUser() {
      return this.$store.state.auth.authUser
    },

    userData() {
      return this.$store.state.auth.userData
    },

    maxBid() {
      // max bid is the highest bid
      if (!this.auction.data.bids.length) {
        // console.log(this.auction.data.price)
        return +this.auction.data.price
      }
      return Math.max(...this.auction.data.bids.map((b) => b.amount))
    },
  },

  methods: {
    async placeBid() {
      if (!this.bid.amount) {
        return alert('Please enter a bid amount')
      } else if (this.bid.amount < this.auction.data.price) {
        return alert('Bid must be higher than the initial price')
      } else if (this.bid.amount <= this.maxBid) {
        return alert('Bid must be higher than the current highest bid')
      } else {
        this.$store.dispatch('loading/toggleLoading', true)
        // push bid to bids array using firestore auctions collection
        const auctionRef = this.$fire.firestore
          .collection('auctions')
          .doc(this.auction.id)
        const uid = this.authUser.uid
        const firstName = this.userData.firstName
        const auctionCopy = Object.assign({}, this.auction.data)

        auctionCopy.bids.push({
          ...this.bid,
          uid,
          firstName,
          time: new Date().toLocaleString(),
        })
        try {
          const snapshot = await auctionRef.update(auctionCopy)
          // console.log(snapshot)
          this.bid.amount = 0
          this.$store.dispatch('loading/toggleLoading', false)
          return alert('Bid placed successfully')
        } catch (error) {
          alert(error.message)
          this.$store.dispatch('loading/toggleLoading', false)
        }

        // this.auction.data.bids.push(this.bid)
      }
    },
  },
})
</script>

<style scoped></style>
