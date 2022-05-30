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
        ref="closeTime"
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div class="text-center mb-1">
        <h6
          class="
            text-xl
            md:text-3xl
            font-bold
            opacity-75
            text-accent text-center
            mb-2
          "
        >
          BUY CC
        </h6>
      </div>

      <div class="text-center mb-5">
        <h6 class="text-lg text-center">
          How many carbon Coin do you want to Buy?
        </h6>
      </div>

      <div v-if="error">
        <h6 class="text-sm text-red-900 text-center mb-4">
          Please fill all the fields first!
        </h6>
      </div>

      <div class="flex w-full justify-center items-center">
        <label class="label"> </label>
        <input v-model="auction.CCamount" type="number" class="input w-1/2" />
        <div class="cc-sign flex-none" style="width: 2em">CC</div>
      </div>

      <div class="flex justify-center items-center w-full px-5 text-sm mt-4">
        <div class="flex flex-col justify-center items-center">
          <label class="label text-black font-semibold">
            Starting bid from (in GBP)
          </label>
          <div class="flex w-full items-center">
            <input
              v-model="auction.price"
              type="number"
              class="input input-sm w-full mb-4"
              placeholder="Enter starting bid"
            />
            <!-- <div class="cc-sign flex-none" style="width: 2em">£</div> -->
          </div>

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
            v-if="!auctionStart"
            ref="submit-btn"
            class="btn-style"
            @click.prevent="submitAuction"
          >
            <h1>Start Auction</h1>
          </button>

          <button
            v-if="auctionStart"
            ref="submit-btn"
            class="btn-style-disable"
            @click.prevent="submitAuction"
          >
            <div class="animate-spin h-5 w-5 mr-3">
              <img
                src="~/assets/images/product/circle-spinner-accent.svg"
                :class="auctionFinished && 'hidden'"
                alt=""
              />
            </div>
            <h1 :class="auctionFinished && 'hidden'">Please Wait..</h1>
            <h1 :class="!auctionFinished && 'hidden'">
              <span class="flex text-sm mr-2 items-center justify-center gap-2">
                <img src="~/assets/images/business/done.svg" class="w-4" />Done!
                Auction Started
              </span>
            </h1>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      auction: {
        CCamount: 0,
        price: 0,
        auctionEndDate: null,
        bids: [],
      },
      auctionStart: false,
      auctionFinished: false,
      error: false,
      timeInterval: 3000,
    }
  },

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  methods: {
    async submitAuction() {
      if (
        !this.auction.auctionEndDate ||
        !this.auction.price ||
        !this.auction.CCamount
      ) {
        this.setError()
        return
      }

      this.auction.auctionEndDate = new Date(
        this.auction.auctionEndDate
      ).toLocaleDateString('en-US')

      // creating business auction
      this.auctionStart = true
      await this.$store.dispatch('business/createBusinessAuction', this.auction)
      this.auction.price = 0
      this.auction.CCamount = 0

      const businessRef = await this.$store.dispatch(
        'business/getBusinessInformation'
      )
      // send notification to all employees
      this.auctionFinished = true
      businessRef.Employees.forEach(async (e) => {
        const businessNotification = {
          content: `New Bidding has been conducted by ${businessRef.Name}`,
          receiverId: e.employeeId,
          dateTime: firebase.firestore.Timestamp.now(),
          business: businessRef.id,
          link: 'http://localhost:3000/business/auction',
          status: 1,
          type: 4,
        }
        // send notification for all employees
        await this.$fire.firestore
          .collection('notifications')
          .add(businessNotification)
      })

      setTimeout(() => {
        this.auctionFinished = false
      }, this.timeInterval)

      setTimeout(() => {
        this.auctionStart = false
      }, this.timeInterval)

      this.handleFinishesAction()
    },
    setError() {
      this.error = true
      setTimeout(() => {
        this.error = false
      }, this.timeInterval)
    },
    handleFinishesAction() {
      setTimeout(() => {
        this.$refs.closeTime.click()
      }, this.timeInterval)
    },
  },
}
</script>

<style scoped>
.slidedown {
  animation: slidedown 0.5s;
}

.cc-sign {
  @apply p-2 flex items-center font-bold justify-center rounded border-none bg-white text-xl no-animation;
}
.icon {
  /* @apply bg-gray-300; */
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;

  transition-duration: 200ms;
  transition-property: opacity;
}
.icon-done {
  mask: url('~/assets/images/business/done.svg');
}

.icon-spinner {
  mask: url('~/assets/images/business/spinner.svg');
}
.btn-style {
  @apply flex
        gap-1
        items-center
        btn btn-accent btn-sm
        justify-center
        text-center
        w-full;
}

.btn-style-disable {
  @apply flex
        gap-1
        opacity-75 
        items-center
        btn btn-accent btn-sm
        justify-center
        text-center
        w-full;
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
