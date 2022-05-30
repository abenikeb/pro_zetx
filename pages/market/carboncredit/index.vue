<template>
  <div>
    <h1 class="text-xl font-semibold justify-start px-6 mt-5 mb-4 md:ml-28">
      Buy Carbon Coins
    </h1>

    <div
      class="
        w-full
        flex flex-wrap
        justify-start
        items-start
        md:px-16
        lg:px-24
        px-4
      "
    >
      <CarbonCredit
        v-for="(auction, i) in auctions"
        :key="i"
        :auction="auction"
      />
    </div>
  </div>
</template>

<script lang="">
import Vue from 'vue'
import CarbonCredit from '~/components/market/CarbonCredit.vue'
export default Vue.extend({
  components: {
    CarbonCredit,
  },
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      auctions: [],
    }
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    const auctionsRef = this.$fire.firestore.collection('auctions')
    try {
      const auctions = await auctionsRef.get()
      auctions.forEach((auction) => {
        this.auctions.push({
          id: auction.id,
          data: auction.data(),
        })
      })
      this.$store.dispatch('loading/toggleLoading', false)
    } catch (error) {
      alert(error.message)
      this.$store.dispatch('loading/toggleLoading', false)
    }
  },
})
</script>
