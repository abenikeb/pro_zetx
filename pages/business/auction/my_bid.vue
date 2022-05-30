<template>
  <div class="container">
    <section>
      <nav class="nav-section">
        <h1 class="nav-left">My Bids</h1>
        <nuxt-link to="/business/auction" class="nav-right">
          <img src="~/assets/images/business/next.svg" alt="" />
          <p>Invitation to Bid</p>
        </nuxt-link>
      </nav>

      <div class="modal-container">
        <carbonCredit
          v-for="(businessAuction, i) in paginateItems"
          :key="i"
          :businessAuction="businessAuction"
        />
        <div v-if="paginateItems.length === 0" class="mt-4 text-accent text-sm">
          There has yet to be a bid put.
          <div class="px-16 md:px-72 py-16 md:py-36">
            <img
              src="~/assets/images/business/auction.svg"
              class="w-48 md:w-64"
              alt="no-image"
            />
          </div>
        </div>
      </div>

      <!-- START pagination index counter -->
      <div class="flex justify-center items-center">
        <Pagination
          :items-count="businessAuctions.length"
          :page-size="4"
          :current-page="currentPage"
          @on_Page_Change="handlePageChange"
        />
      </div>
      <!-- END pagination index counter -->
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import Pagination from '~/components/product/Pagination.vue'
import CarbonCredit from '~/components/business/CarbonCredit.vue'

export default Vue.extend({
  components: {
    carbonCredit: CarbonCredit as Vue.Component,
    Pagination,
  },
  layout: 'auth',
  middleware: ['auth'],
  data() {
    return {
      showModal: false,
      showDropdown: false,
      sidenavActive: false,
      business: undefined as any | undefined,
      currentPage: 1 as number,
      pageSize: 8 as number,
      businessAuctions: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.userData
    },
    paginateItems(): any {
      return _(this.businessAuctions)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value() as any
    },
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    await this.$store.dispatch('business/updateBusinessAuctionStatus')

    try {
      const currentUser = await this.$fire.auth.currentUser
      if (!currentUser) this.$router.replace('dashboard')

      const businessAuctionsRef = await this.$fire.firestore
        .collection('businessAuctions')
        .get()

      let businessAuctions: any = []
      businessAuctionsRef.forEach((businessAuction) => {
        const FilterdOut: any = []
        _.filter(businessAuction.data().bids, (e) => {
          if (e.uid === currentUser?.uid) {
            FilterdOut.push('e')
          }
        })
        if (FilterdOut.length > 0) {
          businessAuctions.push({
            id: businessAuction.id,
            ...businessAuction.data(),
          })
        }
      })
      businessAuctions = _.sortBy(businessAuctions, (b) => b.auctionEndDate)

      this.businessAuctions = businessAuctions

      this.$store.dispatch('loading/toggleLoading', false)
    } catch (error: any) {
      alert(error.message)
      this.$store.dispatch('loading/toggleLoading', false)
    }
  },
  methods: {
    handlePageChange(page: any) {
      this.currentPage = page
    },
  },
})
</script>

<style scoped>
.container {
  @apply px-24;
  width: 100%;
}
.container .nav-section {
  @apply flex my-8;
  gap: 60%;
}
.container .nav-section .nav-left {
  @apply text-3xl font-bold justify-start;
}
.container .nav-section .nav-right {
  @apply text-lg text-gray-600 font-semibold flex gap-1 items-center justify-center bg-gray-200 w-44 
         rounded-lg transition duration-150;
}
.container .nav-section .nav-right:hover {
  @apply bg-gray-300 duration-700 ease-in-out;
}
.container .nav-section .nav-right img {
  @apply w-6 opacity-75;
}
.container .modal-container {
  @apply flex flex-wrap justify-start items-start mt-6;
}
/* Small to Mid Screen */
@media screen and (max-width: 768px) {
  .container {
    @apply px-4 flex;
    width: 100%;
  }
  .container .nav-section {
    @apply flex my-4 ml-2;
    gap: 35%;
  }
  .container .nav-section .nav-left {
    @apply text-lg font-bold justify-start;
  }

  .container .nav-section .nav-right {
    @apply text-sm text-gray-500 flex gap-1 items-center justify-center bg-gray-200 w-36 h-8 ring-1 ring-white
           rounded-lg transition duration-150;
  }

  .container .nav-section .nav-right:hover {
    @apply bg-gray-300 duration-700 ease-in-out;
  }
  .container .nav-section .nav-right img {
    @apply w-5 opacity-75;
  }
  .container .modal-container {
    @apply flex flex-wrap mt-6;
    width: 335px !important;
  }
}
</style>
