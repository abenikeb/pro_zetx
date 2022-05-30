<template>
  <div class="container">
    <section v-if="pageLoading" class="box">
      <div class="box-heading">Please wait, Loading...</div>
    </section>

    <section v-else-if="alreadySent" class="box">
      <div class="box-heading">You have already joined!</div>

      <div class="box-body font-bold">
        You are already an employee at {{ business.Name }}
      </div>
    </section>

    <section v-else-if="error" class="box">
      <div class="box-heading">Error Occured</div>

      <div class="box-body font-bold">
        Business information provided doesn't have required data to process join
        request.
      </div>
    </section>

    <section v-else-if="withOutUniqueId" class="box w-1/2 p-3 md:p-0">
      <div
        class="
          self-center
          text-center text-2xl
          md:text-3xl
          text-gray-800
          font-bold
          my-4
        "
      >
        Announcement of the winning bidder
      </div>
      <div class="text-gray-800">
        <span class="text-accent font-bold text-xl"> {{ business.Name }}</span>
        limited announces the result of bid winning for CC Auction.
        <div class="px-8 py-2">
          <ul class="list-disc">
            <li>Name of the winner: {{ carbonCreditRequest.empName }}</li>
            <li>Bid winning value: {{ carbonCreditRequest.amount }} CC</li>
            <li>
              Pounds worth gift card: {{ carbonCreditRequest.price }} from
              {{ carbonCreditRequest.vender }}
            </li>
          </ul>
        </div>
      </div>
      <div class="box-heading-comp mt-3">Congratulations to the Winner!</div>
      <div class="box-action">
        <button
          ref="acceptRequest"
          for="my-modal"
          class="success"
          @click="closeRequestModalHome"
        >
          <h1>Finish</h1>
        </button>
      </div>
    </section>

    <section
      v-if="
        !(pageLoading || alreadySent || error || nextPage || withOutUniqueId)
      "
      class="box"
      :class="nextPage && 'hidden'"
    >
      <div class="box-img">
        <img src="~/assets/images/business/bfk4.svg" alt="no-img" />
      </div>

      <div class="box-heading-main">CONGRATULATIONS</div>
      <div class="box-heading-sub">You have won the bid started by</div>
      <div class="box-heading-comp">
        {{ `The ${business.Name} Company` }}
      </div>

      <div class="box-action">
        <button
          ref="acceptRequest"
          for="my-modal"
          class="success"
          @click="handleNext"
        >
          <h1>Next</h1>
        </button>
      </div>
    </section>

    <section v-if="nextPage" class="box-verification">
      <div class="box-heading-comp">Verification</div>

      <div class="box-body">
        The voucher below is worth
        <span class="font-bold text-xl text-accent"
          >£{{ carbonCreditRequest.amount }}</span
        >
        and can be used to gain a discount or refund on a variety of products
        that accept vouchers.
      </div>

      <div class="flex gap-2 text-left text-gray-500">
        <img src="~/assets/images/business/bfk1.svg" alt="no-img" />
        Please copy the number and save it in a safe place
      </div>

      <div>
        <p>
          From: <b>{{ business.Name }}</b>
        </p>
        <p>
          Vender: <b>{{ carbonCreditRequest.vender }}</b>
        </p>
      </div>

      <div class="bg-gray-200 h-10 w-full flex rounded-md">
        <span
          class="
            flex flex-1
            font-bold
            text-lg
            justify-center
            items-center
            tracking-widest
          "
        >
          {{ carbonCreditRequest.code }}
        </span>
        <button class="handle-copy" @click="handleCopy">
          <i class="fa fa-solid fa-copy"></i>
        </button>
      </div>

      <small class="generate-key-copy-success text-xs text-green-400 hidden"
        >Succuessfully copied code.</small
      >
      <!-- <p>
        OR <span class="text-blue-500 cursor-pointer">use email address?</span>
      </p> -->

      <div class="box-action">
        <button
          ref="acceptRequest"
          for="my-modal"
          class="success"
          @click="handleAcceptRequest"
        >
          <h1>Finish</h1>
        </button>
      </div>
    </section>

    <div ref="requestHandleModal" class="modal">
      <div class="modal-box relative">
        <span
          class="absolute top-2 right-6 text-2xl text-gray-500 cursor-pointer"
          @click="closeRequestModalHome"
        >
          <span class="fa fa-times"></span>
        </span>

        <img src="~/assets/images/business/bfk3.svg" alt="no-img" />

        <div class="flex flex-col justify-center items-center">
          <h1 class="font-bold text-3xl">Thank You</h1>
          <p class="text-center text-sm pr-2">
            Thank you For Competing and helping out save the climate
          </p>
        </div>
      </div>
    </div>

    <div ref="requestEmailModal" class="modal">
      <div class="modal-box relative">
        <span
          class="absolute top-2 right-6 text-2xl text-gray-500 cursor-pointer"
          @click="closeRequestModalHome"
        >
          <span class="fa fa-times"></span>
        </span>

        <img src="~/assets/images/business/bfk3.svg" alt="no-img" />

        <div class="flex flex-col justify-center items-center">
          <h1 class="font-bold text-3xl">Thank You</h1>
          <p class="text-center text-sm pr-2">
            Thank you For Competing and helping out save the climate
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import firebase from 'firebase'

export default Vue.extend({
  layout: 'empty',
  middleware: ['auth'],
  data() {
    return {
      error: false,
      pageLoading: true,
      alreadyEmployee: false,
      alreadySent: false,
      business: 'undefined' as any | undefined,
      carbonCreditRequest: undefined as any | undefined,
      stripeConnected: false,
      uniqueKey: 0 as number,
      loading: false,
      nextPage: false,
      withOutUniqueId: false,
    }
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)

    const { ct } = this.$router.currentRoute.query
    const { status } = this.$router.currentRoute.query
    const uid = this.$fire.auth.currentUser?.uid

    // if (typeof ct === 'undefined') {
    //   this.pageLoading = false
    //   this.error = true
    //   return
    // }

    if (typeof ct === 'undefined') {
      this.error = true
      return
    }

    if (typeof status !== 'undefined') {
      this.withOutUniqueId = true
    }

    const carbonCreditRequestDoc = await this.$fire.firestore
      .collection('carbonCreditTransaction')
      .doc(ct as string)
      .get()

    if (!carbonCreditRequestDoc.exists) {
      this.$router.push('../../dashboard')
      return
    }

    this.carbonCreditRequest = {
      id: carbonCreditRequestDoc.id,
      ...carbonCreditRequestDoc.data(),
    }

    // if (
    //   this.carbonCreditRequest.senderId !== uid ||
    //   this.carbonCreditRequest.status !== 'pending'
    // ) {
    //   this.$router.push('../../dashboard')
    //   return
    // }

    if (this.carbonCreditRequest.senderId !== uid) {
      this.$router.push('../../dashboard')
      return
    }

    const businessDoc = await this.$fire.firestore
      .collection('business')
      .doc(this.carbonCreditRequest.receiverId)
      .get()

    if (!businessDoc.exists) {
      this.$router.push('../../dashboard')
      return
    }

    this.business = {
      id: businessDoc.id,
      ...businessDoc.data(),
    }

    // await this.fetchStripeAccount()

    this.pageLoading = false
    this.$store.dispatch('loading/toggleLoading', false)
  },

  updated() {
    const actionBtnContainer = this.$refs.actionBtnContainer as HTMLDivElement
    const connectStripeContainer = this.$refs
      .connectStripeContainer as HTMLDivElement

    if (this.stripeConnected) {
      actionBtnContainer?.classList.remove('hidden')
      connectStripeContainer?.classList.add('hidden')
    }
  },

  methods: {
    handleAcceptRequest() {
      // this.loading = true

      // await this.$store.dispatch('business/createCarbonTransactions', {
      //   carbonAmount: this.carbonCreditRequest.amount,
      //   priceAmount: this.carbonCreditRequest.price,
      //   businessId: this.business.id,
      //   uniqueKey: this.uniqueKey,
      // })

      // const businessNotification = {
      //   content: `Your Employee confirmed a bid ${this.carbonCreditRequest.auctionId}`,
      //   receiverId: this.business.BusinessOwnerId,
      //   dateTime: firebase.firestore.Timestamp.now(),
      //   business: this.business.id,
      //   link: '/business/transaction',
      //   status: 1,
      //   type: 4,
      // }

      // await this.$fire.firestore
      //   .collection('notifications')
      //   .add(businessNotification)

      // this.loading = false

      setTimeout(() => {
        this.openRequestModal()
      }, 100)
    },

    handleCopy() {
      navigator.clipboard.writeText(this.carbonCreditRequest.code)
      const successCopied = document.getElementsByClassName(
        'generate-key-copy-success'
      )[0] as HTMLElement
      successCopied.classList.remove('hidden')
    },

    openRequestModal() {
      const openModal = this.$refs.requestHandleModal as HTMLDivElement
      openModal.classList.add('modal-open')
    },

    closeRequestModal() {
      const closeModal = this.$refs.requestHandleModal as HTMLDivElement
      closeModal.classList.remove('modal-open')
    },

    closeRequestModalHome() {
      const closeModal = this.$refs.requestHandleModal as HTMLDivElement
      this.$router.push('../../dashboard')
      closeModal.classList.remove('modal-open')
    },

    openEmailModal() {
      const openModal = this.$refs.requestEmailModal as HTMLDivElement
      openModal.classList.add('modal-open')
    },

    // async handleSend() {
    //   this.$store.dispatch('loading/toggleLoading', true)
    //   const { id, ...carbonCreditRequest } = this.carbonCreditRequest

    //   const carbonCreditRequestRef = this.$fire.firestore
    //     .collection('carbonCreditRequests')
    //     .doc(id)

    //   const updatedCarbonCreditRequest = {
    //     ...carbonCreditRequest,
    //     status: 'sent',
    //   }

    //   const uid = this.$fire.auth.currentUser?.uid
    //   const accountWalletRef = this.$fire.firestore
    //     .collection('wallet')
    //     .where('userId', '==', uid)
    //     .limit(1)
    //   const accountWalletDocs = await accountWalletRef.get()

    //   if (accountWalletDocs.empty) this.$router.push('../../dashboard')

    //   const accountWallet = accountWalletDocs.docs[0].data()

    //   accountWallet.CarbonCreditBalance =
    //     +accountWallet.CarbonCreditBalance - +this.carbonCreditRequest.amount

    //   try {
    //     await carbonCreditRequestRef.update(updatedCarbonCreditRequest)
    //     await accountWalletDocs.docs[0].ref.update(accountWallet)

    //     await this.$fire.firestore
    //       .collection('business')
    //       .doc(this.business.id)
    //       .update({
    //         ...this.business,
    //         CarbonCreditBalance:
    //           +this.business.CarbonCreditBalance +
    //           +this.carbonCreditRequest.amount,
    //       })

    //     await this.$fire.firestore.collection('carbonCreditTransaction').add({
    //       amount: +this.carbonCreditRequest.amount,
    //       receiverId: this.business.id,
    //       senderId: uid,
    //       transactionDate: firebase.firestore.Timestamp.now(),
    //     })

    //     this.$store.dispatch('loading/toggleLoading', true)
    //     this.$router.push('/dashboard')
    //   } catch {
    //     this.$store.dispatch('loading/toggleLoading', true)
    //     this.error = true
    //   }
    // },

    // async fetchStripeAccount() {
    //   const uid = this.$fire.auth.currentUser?.uid
    //   const marketplaceStripeDoc = await this.$fire.firestore
    //     .collection('marketplaceSeller')
    //     .where('userId', '==', uid)
    //     .limit(1)
    //     .get()

    //   if (marketplaceStripeDoc.empty) return

    //   this.stripeConnected = true
    // },

    handleNext() {
      this.nextPage = true
    },
  },
})
</script>

<style scoped>
.container {
  @apply w-full h-auto flex items-center justify-center;
}

.container > .box {
  @apply rounded-2xl shadow-lg border border-green-200 border-opacity-20 mt-32 flex flex-col items-center justify-center;
  min-width: 50%;
  max-width: 90%;
  min-height: 350px;
  background-color: #ffffffd3;
  gap: 1em;
}

.container > .box-verification {
  @apply rounded-2xl shadow-lg border border-green-200 border-opacity-20 mt-32 flex flex-col p-8;
  min-width: 50%;
  max-width: 55%;
  min-height: 350px;
  background-color: #ffffffd3;
  gap: 1.2em;
}

.box .box-img img {
  @apply self-center pt-10  w-32;
}

.box .box-heading {
  @apply self-center text-4xl text-accent;
  margin-top: 0.2em;
  text-transform: uppercase;
  font-weight: bold;
}

.box .box-heading-main {
  @apply self-center text-3xl text-gray-800;
  margin-top: 0.2em;
  text-transform: uppercase;
  font-weight: bold;
}

.box .box-heading-sub {
  @apply self-center text-xl text-gray-400 font-semibold;
}

.box .box-heading-comp {
  @apply self-center text-2xl text-gray-700 font-semibold;
}

.box-verification .box-heading-comp {
  @apply self-center text-2xl text-gray-900 font-semibold mb-3;
}

.box .box-body {
  @apply text-gray-700;
  max-width: 85%;
  margin-bottom: auto;
  text-align: left;
}

.box-verification .box-body {
  @apply text-gray-800;
  max-width: 100%;
  margin-bottom: auto;
  text-align: left;
}

.box .box-action {
  @apply mt-4 mb-3;
  width: 85%;
  padding: 1em 0;
  display: flex;
  justify-content: center;
  gap: 2em;
}

.box-verification .box-action {
  width: 85%;
  margin: 0 auto;
  padding: 1em 0;
  display: flex;
  justify-content: center;
  gap: 1em;
}

.box .box-action label {
  @apply btn btn-sm rounded border-none w-32;
}

.box .box-action button {
  @apply btn btn-sm rounded border-none w-32;
}

.box-action button.success {
  @apply bg-accent transition-shadow duration-200 ease-in-out;
  color: #ffffff;
}

.box-action label.success {
  @apply bg-accent transition-shadow duration-200 ease-in-out;
  color: #ffffff;
}

.box-action button.success:hover {
  @apply shadow-md;
}

.box-action label.success:hover {
  @apply shadow-md;
}

.box-action button.reject {
  @apply bg-gray-50 bg-opacity-10 text-gray-200 transition-all duration-200 ease-in-out;
}

.box-action button.reject:hover {
  @apply bg-opacity-50;
  color: #ebfffa;
}

.box-action button.connect {
  @apply bg-gray-50 bg-opacity-10 text-gray-200 transition-all duration-200 ease-in-out w-64;
}

.box-action button.connect:hover {
  @apply bg-opacity-50;
  color: #ebfffa;
}

.box .box-action.hidden {
  display: none;
}

.box-verification .box-action button {
  @apply btn btn-sm rounded border-none w-32;
}

.box-action button.success {
  @apply bg-accent transition-shadow duration-200 ease-in-out;
  color: #ffffff;
}

.box-action label.success {
  @apply bg-accent transition-shadow duration-200 ease-in-out;
  color: #ffffff;
}

.box-action button.success:hover {
  @apply shadow-md;
}

.modal {
  @apply w-full h-full flex items-center justify-center;
  background: rgb(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.modal-box {
  @apply w-2/6 h-auto bg-white flex gap-5 px-0 py-16;
}

.modal-box img {
  @apply w-48;
}

.modal .modal-inner-box {
  @apply box-border h-auto bg-gray-50 mb-5 w-auto p-4 border-l-4 border-red-500 text-sm text-gray-500;
}

.modal .modal-text-input {
  @apply box-border h-8 w-8 flex justify-center items-center text-gray-700 border-2 border-gray-200;
}

.handle-copy {
  @apply btn btn-sm border-0 bg-accent hover:bg-green-600 h-full w-12 text-white;
}

@media screen and (max-width: 768px) {
  .container {
    @apply w-full h-auto flex items-center justify-center;
  }
  .container > .box {
    @apply rounded-2xl shadow-lg border border-green-200 border-opacity-20 mt-32 flex flex-col items-center justify-center;
    width: 100%;

    min-height: 350px;
    background-color: #ffffffd3;
    gap: 1em;
  }

  .container > .box-verification {
    @apply rounded-2xl shadow-lg border border-green-200 border-opacity-20 mt-32 flex flex-col p-8;
    min-width: 90%;
    max-width: 100%;
    min-height: 350px;
    background-color: #ffffffd3;
    gap: 1.2em;
  }

  .box .box-heading {
    @apply self-center text-2xl text-accent;
    margin-top: 0.2em;
    text-transform: uppercase;
    font-weight: bold;
  }

  .box .box-heading-main {
    @apply self-center text-xl text-gray-800;
    margin-top: 0.2em;
    text-transform: uppercase;
    font-weight: bold;
  }

  .box .box-heading-sub {
    @apply self-center text-gray-400 font-semibold;
  }

  .box .box-heading-comp {
    @apply self-center text-xl text-gray-700 font-semibold;
  }

  .box-verification .box-heading-comp {
    @apply self-center text-xl text-gray-900 font-semibold mb-3;
  }

  .modal {
    @apply w-full h-full flex items-center justify-center;
    background: rgb(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .modal-box {
    @apply w-11/12 h-auto bg-white flex gap-5 px-0 py-16;
  }

  .modal-box img {
    @apply w-32;
  }
}
</style>
