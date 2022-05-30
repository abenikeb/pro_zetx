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
    <div v-if="!isRebid" class="body-parse">
      <span
        class="absolute top-1 right-2 text-2xl text-red-700"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>

      <!-- START HEADER SECTION -->
      <div class="header">
        <h6
          v-if="businessName && !selectedPath"
          class="
            text-xl
            md:text-2xl
            text-center
            mb-2
            mt-6
            md:mt-0
            text-gray-600
          "
        >
          Company:
          <span class="font-bold text-black">{{ businessName }} </span>
        </h6>

        <h6 class="text-center mb-2">
          Vendor:
          <span class="font-semibold"
            >{{ businessAuction.vender }} Voucher</span
          >
        </h6>
        <h6 class="text-center mb-2 font-semibold text-3xl my-3">
          £<span class="text-4xl md:text-6xl">{{ businessAuction.price }}</span>
        </h6>
        <p class="font-semibold text-lg md:text-xl">
          Starting Bid:
          <span class="text-accent">{{
            `${businessAuction.CCamount} CC`
          }}</span>
        </p>
      </div>
      <!-- END HEADER SECTION -->

      <!-- START Place bid -->
      <div
        v-if="
          !selectedPath &&
          businessAuction.status === 1 &&
          bidStatus === 'invitation'
        "
        class="flex w-full justify-center items-center gap-2 my-6"
      >
        <input
          v-model="bid.bidCarbon"
          type="number"
          :min="businessAuction.CCamount"
          step="0.5"
          :placeholder="`0 CC`"
          class="
            input
            border-2 border-gray-700
            input-sm
            md:input-md
            w-1/2
            md:w-1/2
          "
        />
        <button class="btn-success" @click.prevent="placeBid">Place bid</button>
      </div>
      <!-- END Place bid -->

      <h5 class="text-xs md:text-sm text-gray-700 text-center font-light mt-2">
        Bidding ends at: {{ endDate }}
      </h5>

      <h2
        v-if="businessAuction.bids.length"
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

      <!-- START Bidderd list Table -->
      <div class="min-h-fit max-h-64 overflow-auto w-full">
        <div
          v-if="businessAuction.bids.length"
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
          class="
            flex
            justify-between
            items-center
            w-full
            md:px-5
            px-2
            text-sm
            mt-4
          "
        >
          <div class="flex items-center flex-nowrap">
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
              <img
                :src="`https://robohash.org/${b.uid}.png?set=set3`"
                class=""
                alt=""
              />
            </div>
            <h1 class="md:text-sm text-2xs">{{ b.employeeName }}</h1>
          </div>
          <h1>{{ b.bidCarbon }} CC</h1>
          <h1 class="text-2xs md:text-sm text-gray-500 w-2/6 md:w-auto">
            {{ b.time }}
          </h1>
        </div>
      </div>
      <!-- END Bidderd list Table -->

      <section class="w-full flex justify-center items-center mt-8">
        <div v-if="selectedPath">
          <button
            ref="close-btn"
            class="btn-danger gap-2 text-lg"
            @click="closeAuction(businessAuction)"
          >
            <div class="mask-trash">
              <img class="" alt="" />
            </div>
            <div>Close</div>
          </button>
        </div>

        <div
          v-if="
            !selectedPath &&
            businessAuction.status === 1 &&
            bidStatus === 'my_bid'
          "
          class="flex gap-2"
        >
          <button class="btn-success" @click="() => (isRebid = true)">
            <div class="mask-success">
              <img class="" alt="" />
            </div>
            <div class="">Rebid</div>
          </button>
        </div>
      </section>

      <span
        v-if="businessAuction.status === 0"
        class="font-bold ml-32 text-red-500 md:ml-64"
      >
        Closed
      </span>
    </div>

    <div
      v-if="isRebid"
      class="
        w-11/12
        md:w-2/5
        px-2
        py-3
        md:p-10
        flex-row
        md:flex-col
        relative
        justify-center
        items-center
        shadow-lg
        rounded-xl
        bg-white
      "
    >
      <span
        class="absolute top-4 left-4 text-3xl text-gray-700 cursor-pointer"
        @click="() => (isRebid = false)"
      >
        <img src="~/assets/images/business/arrow_back.svg" class="w-6" alt="" />
      </span>
      <span
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>

      <!-- START HEADER SECTION -->
      <div
        class="
          flex
          mb-5
          w-full
          items-center
          justify-center
          gap-y-2 gap-4
          mt-12
          md:mt-2
        "
      >
        <div>
          <h6 class="text-center mb-2 font-semibold text-2xl">
            £<span class="text-3xl md:text-4xl">{{
              businessAuction.price
            }}</span>
          </h6>
        </div>
        <div>
          <p class="font-semibold text-lg md:text-xl">
            Current Bid:
            <span class="text-accent">{{ `${maxBid} CC` }}</span>
          </p>

          <h5 class="text-gray-700 font-light mt-2">
            Bidding ends at: {{ endDate }}
          </h5>
        </div>
      </div>
      <!-- END HEADER SECTION -->

      <h2
        v-if="businessAuction.bids.length"
        class="mt-5 md:text-lg font-semibold ml-2 border-b text-base w-full"
      >
        My Current Bid
      </h2>

      <!-- START Bidderd list Table -->
      <div class="min-h-fit max-h-64 overflow-auto w-full">
        <div
          v-if="businessAuction.bids.length"
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
          v-for="(b, i) in sortedMyCurrentBids"
          :key="i"
          class="flex justify-between items-center w-full px-5 text-sm mt-4"
        >
          <div v-if="i === 0" class="flex items-center">
            <!-- <div
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
            </div> -->
            <h1 class="md:text-sm text-2xs">{{ b.employeeName }}</h1>
          </div>
          <h1 v-if="i === 0">{{ b.bidCarbon }} CC</h1>
          <h1 v-if="i === 0" class="text-2xs md:text-sm text-gray-500">
            {{ b.time }}
          </h1>
        </div>
      </div>
      <!-- END Bidderd list Table -->

      <!-- START Place bid -->
      <div
        v-if="
          !selectedPath &&
          businessAuction.status === 1 &&
          bidStatus === 'my_bid'
        "
        class="flex flex-col w-full items-center mt-3"
      >
        <span class="flex gap-2">
          <input
            id="bidCarbon"
            v-model="bid.bidCarbon"
            type="number"
            :min="maxBid"
            step="0.5"
            :placeholder="`Enter ${maxBid + 1} CC or more`"
            class="input border-2 border-gray-400 input-sm"
          />
          <button class="btn-success" @click.prevent="placeBid">
            <div class="mask-success">
              <img class="" alt="" />
            </div>
            Rebid
          </button>
        </span>
      </div>
      <!-- END Place bid -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  props: ['businessAuction', 'selectedPath'],

  data() {
    return {
      bid: {
        bidCarbon: this.maxBid,
      },
      businessName: false,
      isWallet: true,
      bidStatus: undefined,
      isRebid: false,
    }
  },

  computed: {
    userData() {
      return this.$store.state.auth.userData
    },
    authUid() {
      return this.$store.state.auth.authUser.uid
    },
    auctionData() {
      return this.$store.state.auction.auctionData
    },
    endDate() {
      return this.convertDateFormat(this.businessAuction.auctionEndDate)
    },
    sortedBids() {
      const arr = this.businessAuction.bids.map((b) => {
        return {
          bidCarbon: +b.bidCarbon,
          time: this.convertDateFormat(b.time),
          employeeName: b.employeeName,
          uid: b.empId,
        }
      })
      return _.sortBy(arr, ['bidCarbon'])
    },

    sortedMyCurrentBids() {
      const arr = this.businessAuction.bids.map((b) => {
        if (b.uid === this.authUid) {
          return {
            bidCarbon: +b.bidCarbon,
            time: this.convertDateFormat(b.time),
            employeeName: b.employeeName,
            uid: b.empId,
          }
        }
      })
      const result = []
      const sortedData = _.sortBy(arr, ['bidCarbon']).reverse()
      _.forEach(sortedData, (e) =>
        typeof e !== 'undefined' ? result.push(e) : null
      )
      return result
    },
    authUser() {
      return this.$store.state.auth.authUser
    },
    maxBid() {
      if (!this.businessAuction.bids.length) {
        return +this.businessAuction.CCamount
      }
      return Math.max(...this.businessAuction.bids.map((b) => b.bidCarbon))
    },
  },

  async created() {
    const business = await this.$store.dispatch('business/getBusinessbyId', {
      id: this.businessAuction.businessId,
    })
    this.businessName = business.Name

    if (this.$route.path === '/business/auction/my_bid')
      this.bidStatus = 'my_bid'
    else if (this.$route.path === '/business/auction')
      this.bidStatus = 'invitation'

    this.walletCapacity()
  },

  methods: {
    async placeBid() {
      if (!this.bid.bidCarbon) {
        return alert('Please enter a bid amount')
      } else if (this.bid.bidCarbon < Number(this.businessAuction.CCamount)) {
        return alert('Bid must be greater than the initial Carbon Coin')
      } else if (this.bid.bidCarbon <= Number(this.maxBid)) {
        return alert('Bid must be greater than the current highest bid')
      } else if (!this.isWallet) {
        return alert(
          'Your carbon currency balance is insufficient; in order to complete the transaction, you will need additional carbon!'
        )
      } else {
        this.$store.dispatch('loading/toggleLoading', true)
        // push bid to bids array using firestore auctions collection
        const auctionRef = this.$fire.firestore
          .collection('businessAuctions')
          .doc(this.businessAuction.id)
        const uid = this.authUser.uid

        const employeeName = `${this.userData.firstName} ${this.userData.lastName}`
        const bidCarbon = this.bid.bidCarbon

        const auctionCopy = Object.assign({}, this.businessAuction)
        auctionCopy.bids.push({
          bidCarbon,
          employeeName,
          uid,
          time: firebase.firestore.Timestamp.now(),
        })
        try {
          await auctionRef.update(auctionCopy)
          this.$emit('close-modal-id', this.businessAuction.id)
          alert('Bid placed successfully')

          const filterData = _.filter(
            auctionCopy.bids,
            (bidder) => bidder.uid === this.authUser.uid
          )
          this.$store.dispatch('loading/toggleLoading', false)

          if (filterData.length > 1) {
            return await this.$store.dispatch('business/checkWalletBalance', {
              EmployeeId: this.authUser.uid,
              BidCarbonAmount: this.bid.bidCarbon,
              status: 'update',
            })
          }
          await this.$store.dispatch('business/checkWalletBalance', {
            EmployeeId: this.authUser.uid,
            BidCarbonAmount: this.bid.bidCarbon,
            status: 'new',
          })
          this.bid.price = 0
          this.bid.bidCarbon = 0
        } catch (error) {
          alert(error.message)
          this.$store.dispatch('loading/toggleLoading', false)
        }
      }
    },

    async walletCapacity() {
      const currentUser = this.$fire.auth.currentUser
      const employeeWalletAmount = await this.$store.dispatch(
        'business/walletCapacity',
        currentUser?.uid
      )
      const { ...wallet } = employeeWalletAmount
      if (typeof wallet.BidCarbonAmount !== 'undefined') {
        if (
          wallet.walletcarbonCreditBalance - +wallet.BidCarbonAmount <
            this.businessAuction.CCamount ||
          wallet.carbonCreditBalance - +wallet.BidCarbonAmount < this.maxBid
        ) {
          return (this.isWallet = false)
        }
      } else if (
        wallet.carbonCreditBalance < this.businessAuction.CCamount ||
        wallet.carbonCreditBalance < this.maxBid
      ) {
        return (this.isWallet = false)
      }
    },

    closeAuction(auction) {
      this.$modal.show('dialog', {
        title: 'Warning! You are closing the auction!',
        text: `Are you sure you want to close this auction with id #${auction.id}?`,
        buttons: [
          {
            title: 'Close',
            handler: () => {
              this.$store.dispatch('loading/toggleLoading', true)
              this.$store.dispatch('business/closeBusinessAuction', {
                auctionId: auction.id,
              })
              this.$store.dispatch('loading/toggleLoading', false)
              this.$emit('close-modal')
              this.$modal.hide('dialog')
            },
          },
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            },
          },
        ],
      })
    },

    cancelAuction(auction) {
      this.$modal.show('dialog', {
        title: `Warning! You're going to cancel the auction!`,
        text: `Are you sure you want to cancel auction #${auction.id}?`,

        buttons: [
          {
            title: 'Yes',
            handler: () => {
              this.$store.dispatch('loading/toggleLoading', true)
              this.$store.dispatch('business/cancelBusinessAuction', {
                auctionId: auction.id,
              })
              this.$store.dispatch('loading/toggleLoading', false)

              this.$modal.hide('dialog')
              this.$emit('close-modal')
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

    convertDateFormat(localDate) {
      return localDate.toDate().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    },
  },
})
</script>

<style scoped>
.body-parse {
  @apply w-11/12 md:w-2/5 md:p-10 px-4 py-2 flex flex-col relative
         justify-center m-4 md:m-0 shadow-lg rounded-xl mt-2 bg-white;
}

.header {
  @apply text-center mb-3;
  position: relative;
}

.btn-success {
  @apply btn btn-sm bg-green-500 flex flex-row items-center justify-center gap-1 text-white
          border-none rounded;
  height: 10px !important;
  font-size: 0.9rem;
}

.btn-danger {
  @apply btn btn-sm bg-white shadow-sm flex flex-row items-center justify-center
         rounded text-red-500 gap-1 border-none;
  height: 10px;
  font-size: 0.8rem;
}

.btn-success img {
  @apply w-4;
}

.mask-trash {
  -webkit-mask-image: url(~/assets/images/business/close_white.svg);
  mask-image: url(~/assets/images/business/close_white.svg);
  mask-position: center;
  mask-repeat: no-repeat;
}
.mask-trash img {
  @apply bg-red-400 w-3 h-4;
}

.mask-success {
  -webkit-mask-image: url(~/assets/images/business/bfk5.svg);
  mask-image: url(~/assets/images/business/bfk5.svg);
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 1em;
}
.mask-success img {
  @apply bg-white h-3 w-3;
}

@media screen and (max-width: 760px) {
  .card-body {
    @apply w-full flex flex-col justify-start items-center bg-white rounded-xl shadow-xl  relative;
  }

  .card-body-closed {
    @apply w-full flex flex-col justify-start items-center bg-white rounded-xl
        shadow-xl p-3 relative;
  }

  .counter-section {
    @apply bg-gray-400 text-white px-1 py-0.5 text-2xs absolute top-1 right-1 rounded-lg;
  }

  .closed-section {
    @apply text-white opacity-95 font-bold px-1 md:px-2 py-0.5 text-2xs absolute top-3 left-0 bg-red-500
          rounded-lg;
    -ms-transform: rotate(-30deg); /* IE 9 */
    transform: rotate(-30deg);
  }

  .btn-container {
    @apply flex flex-row flex-nowrap justify-center items-center gap-1 w-full;
  }

  .btn-success {
    @apply btn btn-sm bg-green-500 flex flex-row items-center justify-center gap-1 text-white
          border-none  rounded;
    font-size: 0.6rem;
  }

  .btn-danger {
    @apply btn btn-xs bg-white shadow-sm flex flex-row items-center justify-center
         rounded text-red-500 gap-1 border-none;
    font-size: 0.6rem;
  }

  .btn-danger img {
    @apply w-3;
  }

  .btn-success img {
    @apply w-4;
  }

  .mask-trash {
    -webkit-mask-image: url(~/assets/images/business/close_white.svg);
    mask-image: url(~/assets/images/business/close_white.svg);
    mask-position: center;
    mask-repeat: no-repeat;
  }

  .mask-trash img {
    @apply bg-red-400 w-2 h-2;
  }

  .mask-success {
    -webkit-mask-image: url(~/assets/images/business/bfk5.svg);
    mask-image: url(~/assets/images/business/bfk5.svg);
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: 1.25em;
  }
  .mask-success img {
    @apply bg-white h-6 w-5;
  }
}
</style>
