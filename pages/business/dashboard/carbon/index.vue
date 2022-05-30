<template>
  <div class="container-fluid">
    <div class="mb-4 mt-4">
      <h4 class="title">
        <i class="icon icon-dashboard bg-yellow-400"></i>
        Carbon Coin Manager
      </h4>
      <hr />
    </div>

    <div class="p-4">
      <h1 class="text-xl font-semibold text-gray-700 mb-4">Any Requests?</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md md:max-w-3xl">
        <div v-for="(card, index) in cards" :key="index">
          <AuctionCard :card="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AuctionCard from '~/components/business/AuctionsCard.vue'
export default Vue.extend({
  components: {
    AuctionCard,
  },
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      cards: [
        {
          id: 1,
          title: 'Purchase Carbon Coin',
          img: 'CC2.svg',
          to: 'buy',
          body_text: 'Purchase carbon coins by starting an auction.',
        },
        {
          id: 2,
          title: 'Carbon Coins Auction Manager',
          img: 'manage_cc.svg',
          to: 'manage',
          body_text: 'View and manage open auctions here',
        },

        // {
        //   id: 3,
        //   title: 'Help Center',
        //   img: 'help.svg',
        //   to: 'help',
        //   body_text:
        //     'Tap the Business Help Center for information on how to purchase carbon coin and manage auctions.',
        // },
      ],
    }
  },

  async created() {
    await this.$store.dispatch('business/updateBusinessAuctionStatus')

    // const notificationref = await this.$fire.firestore
    //   .collection('notifications')
    //   // .where('receiverId', '==', 'odYKNWPannOy3XiPlGKUHgDv7hJ3')
    //   .where('type', '==', 4)
    //   .get()
    // // const notifications_ = [] as any

    // notificationref.forEach((e) => e.ref.delete())

    // this.$store.dispatch('loading/toggleLoading', true)
    // try {
    //   const businessAuctionsRef = await this.$fire.firestore
    //     .collection('businessAuctions')
    //     .get()

    //   _.filter(businessAuctionsRef.docs, async (b) => {
    //     if (b.data().auctionEndDate < firebase.firestore.Timestamp.now()) {
    //       const updateAuctionRef = await this.$fire.firestore
    //         .collection('businessAuctions')
    //         .doc(b.id)

    //       const businessDoc = await this.$fire.firestore
    //         .collection('business')
    //         .doc(b.data().businessId)
    //         .get()

    //       if (!businessDoc.exists) {
    //         return
    //       }
    //       const empCollection = []

    //       b.data().bids.forEach((e) => {
    //         empCollection.push(e)
    //       })

    //       const empBids = _.sortBy(empCollection, (o) => o.bidCarbon).reverse()

    //       const uniquiEmpId = []
    //       for (let idx = 0; idx < empBids.length; idx++) {
    //         uniquiEmpId.push(empBids[idx].uid)
    //       }

    //       const arrdFilter = _.uniq(uniquiEmpId)

    //       for (let idx = 0; idx < arrdFilter.length; idx++) {
    //         const employeeDoc = await this.$fire.firestore
    //           .collection('users')
    //           .doc(arrdFilter[idx])
    //           .get()

    //         console.log('employeeDoc', employeeDoc.data())

    // const requestDoc = await this.$fire.firestore
    //   .collection('carbonCreditTransaction')
    //   .add({
    //     amount: +0,
    //     empName: empBids[idx].employeeName,
    //     vender: b.data()?.vender,
    //     price: b.data()?.price,
    //     code: b.data()?.code,
    //     receiverId: b.data().businessId,
    //     senderId: empBids[idx].uid,
    //     transactionDate: firebase.firestore.Timestamp.now(),
    //   })

    // await dispatch('createBusinessNotification', {
    //   link: `/business/request?ct=${requestDoc.id}&status=2`,
    //   empId: empBids[idx].uid,
    //   type: 6,
    //   message: `Announcement of the winning bidder. ${
    //     businessDoc.data()?.Name
    //   } limited announces the result of bid winning for the CC auction.
    // Name of the winner: ${empBids[0].employeeName}
    // Bid winning value: ${empBids[0].CCamount} CC for ${
    //     empBids[0].price
    //   }Pounds worth gift card from ${empBids[0].vender}.
    // Congratulations to the Winner!`,
    // })
    //       }
    //     }
    //   })
    // } catch (err) {
    //   console.log('hhh')
    // }
    // this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {},
})
</script>

<style scoped>
.container-fluid {
  width: 80%;
  margin: 0 auto;
}
.container-fluid i {
  width: 1.5em;
  height: 1.4em;
}
.container-fluid .title {
  @apply font-bold text-gray-600 text-xl md:text-2xl flex flex-row
          items-center px-4 mt-5 align-bottom gap-2 mb-2;
}
.icon {
  display: inline-block;
  width: 2.6em;
  height: 2.6em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

.icon-dashboard {
  mask: url('~/assets/images/business/CC2.svg');
}
@media screen and (max-width: 768px) {
  .container-fluid i {
    width: 1.9em;
    height: 2em;
  }
  .container-fluid .title {
    @apply font-bold text-gray-800 text-xl flex flex-row
          items-center px-1 mt-5 align-bottom gap-2 mb-4;
  }
}
</style>
