<template>
  <div
    class="
      w-full
      md:w-screen
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
        w-full
        md:w-1/2
        p-10
        flex flex-col
        relative
        justify-center
        m-4
        md:m-0
        shadow-lg
        rounded-xl
        mt-2
        bg-white
        slidedown
      "
    >
      <span
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div class="text-center mb-5">
        <h6 class="text-xl md:text-2xl font-semibold text-center mb-2">
          Current Balance:
          <span class="md:text-4xl text-2xl font-bold text-accent">
            {{ carbonCredit != null ? `${carbonCredit.toFixed(2)}CC` : '0' }}
          </span>
        </h6>
        <!-- <span class="text-accent text-2xl md:text-4xl font-semibold"
          >600CC</span
        > -->
      </div>

      <div class="text-center mb-5">
        <h6 class="text-lg text-center">
          How many carbon credit do you want to sell?
        </h6>
      </div>

      <div class="flex w-full justify-center items-center">
        <label class="label"> </label>
        <input v-model="auction.amount" type="number" class="input w-1/2" />
      </div>
      <div class="flex justify-center items-center w-full px-5 text-sm mt-4">
        <div class="flex flex-col justify-center items-center">
          <label class="label text-black font-semibold">
            Starting bid from (in USD)
          </label>
          <!-- <h2 class="text-lg font-semibold mb-4 px-12">Starting bid form</h2> -->
          <input
            v-model="auction.price"
            type="number"
            class="input input-sm w-full mb-4"
            placeholder="Enter starting bid"
          />
          <label for="" class="text-black font-semibold"
            >Auction end date</label
          >
          <input
            v-model="auction.auctionEndDate"
            type="date"
            class="input input-sm w-full mb-4"
            placeholder="Enter starting bid"
          />
          <button
            class="btn btn-accent btn-sm justify-center text-center w-full"
            @click.prevent="submitAuction"
          >
            Start Auction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['carbonCredit'],

  data() {
    return {
      auction: {
        amount: 0,
        price: 0,
        auctionEndDate: null,
        bids: [],
      },
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    submitAuction() {
      if (
        !this.auction.auctionEndDate ||
        !this.auction.price ||
        !this.auction.amount
      ) {
        return alert('Please fill all the fields first!')
      }
      if (this.carbonCredit == null) {
        return alert('You do not yet have any carbon credit to sell!')
      }
      if (this.auction.amount > +this.carbonCredit) {
        return alert(
          `You do not have enough carbon credit to sell! You have ${this.carbonCredit} CC`
        )
      }
      const uid = this.authUser.uid
      this.auction.auctionEndDate = new Date(
        this.auction.auctionEndDate
      ).toLocaleDateString('en-US')

      this.$store.dispatch('auction/storeAuction', {
        ...this.auction,
        uid,
        auctionStartDate: new Date().toLocaleDateString('en-US'),
      })
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped>
.slidedown {
  animation: slidedown 0.5s;
}

@keyframes slidedown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
