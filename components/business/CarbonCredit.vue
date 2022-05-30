<template>
  <div class="w-1/2 md:w-1/4 px-1 md:px-2 pb-4">
    <div class="card-body">
      <span class="counter-section"
        >{{ businessAuction.bids.length }} bids</span
      >
      <span v-if="businessAuction.status === 0" class="closed-section">
        Closed
      </span>

      <div
        v-if="selectedPath"
        class="
          text-sm
          flex flex-col
          items-center
          md:text-sm
          mt-4
          mb-2
          w-full
          text-gray-600
        "
      >
        Vender:
        <p class="font-bold text-gray-900">
          {{ businessAuction.vender }} Voucher
        </p>
      </div>

      <div v-if="!selectedPath" class="mt-4 md:text-lg font-bold md:mt-2 mb-2">
        <b> {{ businessName }}</b>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold text-center">
        £<span class="text-4xl md:text-6xl">{{ businessAuction.price }}</span>
      </h2>

      <div class="w-full text-center pb-2"></div>
      <div
        v-if="businessAuction.status === 1"
        class="text-xs text-gray-500 mb-3 flex"
      >
        <p class="font-bold text-red-500">
          {{
            `${timeCounter.days > 0 ? timeCounter.days + 'd' : ''} 
              ${timeCounter.hours > 0 ? timeCounter.hours + 'h' : ''} ${
              timeCounter.minutes > 0 ? timeCounter.minutes + 'm' : ''
            }`
          }}
          <span
            v-if="
              (timeCounter.days > 0 && timeCounter.minutes > 0) ||
              (timeCounter.days > 0 && timeCounter.hours > 0) ||
              (timeCounter.days > 0 &&
                timeCounter.hours > 0 &&
                timeCounter.minutes) ||
              (timeCounter.hours > 0 && timeCounter.minutes) ||
              timeCounter.minutes > 0
            "
            >Left</span
          >
        </p>

        <p
          v-if="
            timeCounter.days <= 0 &&
            timeCounter.hours <= 0 &&
            timeCounter.minutes <= 0 &&
            timeCounter.seconds > 0
          "
          class="font-bold text-red-500"
        >
          {{ `${timeCounter.seconds}s Left` }}
        </p>
      </div>
      <div
        v-if="businessAuction.status === 0"
        class="text-xs text-gray-500 mb-3"
      >
        <p class="font-bold">
          Ended ({{
            businessAuction.auctionEndDate < now
              ? timeSince(businessAuction.auctionEndDate.toDate())
              : 'some time'
          }}
          ago)
        </p>
      </div>

      <div
        class="
          w-full
          flex flex-col
          items-center
          md:items-center
          justify-center
          md:justify-between
        "
      >
        <div class="w-full">
          <h3 class="text-2xs md:text-sm text-center mb-2">
            <span class="text-gray-800">Starting Bid:</span>
            <span class="text-gray-800 font-bold"
              >{{ businessAuction.CCamount }} CC</span
            >
          </h3>
        </div>

        <div class="btn-container">
          <button
            v-if="selectedPath && businessAuction.status === 1"
            class="btn-danger"
            @click="closeAuction(businessAuction)"
          >
            <div class="mask-trash">
              <img class="" alt="" />
            </div>

            <div class="hidden md:block">Close</div>
          </button>

          <button
            v-if="selectedPath && businessAuction.status === 1"
            class="btn-success"
            @click="showModal = true"
          >
            <img src="~/assets/images/business/view.svg" alt="Button" />
            <p class="hidden md:block">View</p>
          </button>

          <nuxt-link
            v-else-if="selectedPath && businessAuction.status === 0"
            :to="{
              path: '/business/dashboard/carbon/report',
              query: {
                id: businessAuction.id,
              },
            }"
            class="btn-success"
          >
            <img src="~/assets/images/business/view.svg" alt="Button" />
            View
          </nuxt-link>

          <button
            v-if="!selectedPath"
            :id="businessAuction.id"
            ref="CarbonModalBtn"
            class="btn-success"
            @click="showModal = true"
          >
            <img src="~/assets/images/business/view.svg" alt="Button" />
            View
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      ref="sellCarbonModal"
      class="
        w-screen
        h-screen
        justify-center
        items-center
        fixed
        top-0
        left-0
        z-50
      "
    >
      <sellCreditModal
        :businessAuction="businessAuction"
        :status="status"
        :selectedPath="selectedPath"
        @close-modal="
          () => {
            showModal = false
          }
        "
        @close-modal-id="close_modal_id"
      />
    </div>
    <v-dialog />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
import SellCreditModal from '~/components/business/SellCreditModal.vue'
export default Vue.extend({
  components: {
    sellCreditModal: SellCreditModal as Vue.Component,
  },
  props: ['businessAuction', 'status', 'bid_id'],
  data() {
    return {
      showModal: false,
      showBiddersReport: false,
      selectedPath: false,
      businessName: undefined,
      counterT: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    }
  },
  computed: {
    now() {
      return firebase.firestore.Timestamp.now()
    },

    timeCounter() {
      const now = new Date().getTime()
      const timeleft = this.businessAuction.auctionEndDate.toDate() - now

      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

      return {
        days,
        hours,
        minutes,
        seconds,
      }
    },
  },

  async created() {
    this.$route.path === '/business/dashboard/carbon/manage'
      ? (this.selectedPath = true)
      : (this.selectedPath = false)

    const business = await this.$store.dispatch('business/getBusinessbyId', {
      id: this.businessAuction.businessId,
    })
    this.businessName = business.Name

    const CarbonModalBtn = this.$refs.CarbonModalBtn as HTMLButtonElement

    if (this.$route.query.id && CarbonModalBtn.id === this.$route.query.id) {
      CarbonModalBtn.click()
    }
  },
  methods: {
    currentPath() {},
    closeAuction(auction: any) {
      this.$modal.show('dialog', {
        title: 'Warning! You are closing the auction!',
        text: `Are you sure you want to close this auction?`,
        buttons: [
          {
            title: 'Yes',
            handler: () => {
              this.$store.dispatch('loading/toggleLoading', true)
              this.$store.dispatch('business/closeBusinessAuction', {
                auctionId: auction.id,
              })
              this.$store.dispatch('loading/toggleLoading', false)

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
    close_modal_id(id: any) {
      this.showModal = false
      this.$emit('close_modal_id', id)
    },

    timeSince(date: any) {
      const seconds = Math.floor(((new Date() as any) - date) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
  },
})
</script>

<style scoped>
.card-body {
  @apply w-full flex flex-col justify-start items-center bg-white rounded-2xl shadow-xl p-3 md:p-5 relative;
}

.card-body-closed {
  @apply w-full flex flex-col justify-start items-center bg-white rounded-xl
        shadow-xl p-5 relative;
}

.counter-section {
  @apply bg-gray-400 text-white  px-1 py-0.5 text-2xs absolute top-1 right-1 rounded-lg;
}

.closed-section {
  @apply text-white opacity-95 font-bold px-2 py-0.5 text-2xs absolute top-2 left-0 bg-red-500  
          rounded-lg font-semibold;
  -ms-transform: rotate(-30deg); /* IE 9 */
  transform: rotate(-30deg);
}

.btn-container {
  @apply flex flex-row justify-center items-center gap-1 md:w-full mt-0 md:mt-2;
}

.btn-success {
  @apply btn btn-xs bg-green-500 flex flex-row items-center justify-center gap-1 text-white 
          border-none flex-1 rounded;
  font-size: 0.6rem;
}

.btn-danger {
  @apply btn btn-xs bg-white shadow-sm flex flex-row items-center justify-center
         rounded text-red-500 flex-1 gap-1 border-none;
  font-size: 0.6rem;
}

/* .btn-danger img {
  @apply w-3;
} */

.btn-success img {
  @apply w-4;
}
/* 
.mask-trash {
  -webkit-mask-image: url(~/assets/images/product/trash-alt-solid.svg);
  mask-image: url(~/assets/images/product/trash-alt-solid.svg);
  mask-position: center;
  mask-repeat: no-repeat;
} */

.mask-trash {
  -webkit-mask-image: url(~/assets/images/business/close_white.svg);
  mask-image: url(~/assets/images/business/close_white.svg);
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 1.8em;
}

.mask-trash img {
  @apply bg-red-400 w-3 h-3;
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
    @apply text-white opacity-95  font-bold px-1 md:px-2 py-0.5 text-2xs absolute top-3 left-0 bg-red-500  
          rounded-lg font-semibold;
    -ms-transform: rotate(-30deg); /* IE 9 */
    transform: rotate(-30deg);
  }

  .btn-container {
    @apply flex flex-row flex-nowrap justify-center items-center gap-1 w-full;
  }

  .btn-success {
    @apply btn btn-xs bg-green-500 flex flex-row items-center justify-center gap-1 text-white 
          border-none flex-1 rounded;
    font-size: 0.6rem;
  }

  .btn-danger {
    @apply btn btn-xs bg-white shadow-sm flex flex-row items-center justify-center flex-1 w-full
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
    @apply bg-red-400 w-3 h-4;
  }
}
</style>
