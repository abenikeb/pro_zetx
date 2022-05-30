<template>
  <section class="relative">
    <!-- //back button -->
    <nuxt-link to="/business/dashboard/carbon" class="back-btn">
      <div class="mask-back">
        <img class="" alt="" />
      </div>
      <p class="hidden md:block"></p>
    </nuxt-link>
    <section class="container-fluid">
      <div class="mb-6 mt-4">
        <h2 class="__title">Auction Manager</h2>
        <hr />
      </div>

      <section class="overflow-x-auto">
        <div
          v-if="paginateBusinessAuctions.length > 0"
          class="w-full flex flex-wrap justify-start items-start"
        >
          <CarbonCredit
            v-for="(businessAuction, i) in paginateBusinessAuctions"
            :key="i"
            :businessAuction="businessAuction"
          />
        </div>
        <div v-else class="mt-4 text-accent px-4 text-sm md:text-lg">
          <div>
            No open auctions were found. If you want to start the auction
            <nuxt-link
              class="btn btn-primary btn-sm text-white font-bold"
              to="/business/dashboard/carbon/buy"
            >
              Click
            </nuxt-link>
            here!
          </div>
          <div class="px-16 md:px-72 py-16 md:py-36">
            <img
              src="~/assets/images/business/auction.svg"
              class="w-48 md:w-64"
              alt="no-image"
            />
          </div>
        </div>
        <!-- START pagination index counter -->
        <div class="flex justify-center items-center">
          <Pagination
            :items-count="businessAuctions.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @on_Page_Change="handlePageChange"
          />
        </div>
        <!-- END pagination index counter -->
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import CarbonCredit from '~/components/business/CarbonCredit.vue'
import Pagination from '~/components/product/Pagination.vue'

export default Vue.extend({
  components: {
    CarbonCredit,
    Pagination,
  },

  layout: 'auth',
  middleware: 'auth',

  data() {
    return {
      showModal: false,
      currentPage: 1 as number,
      pageSize: 4 as number,
    }
  },
  computed: {
    businessAuctions() {
      return this.$store.state.business.businessAuctions
    },
    paginateBusinessAuctions(): any {
      return _(this.businessAuctions)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value()
    },
  },

  created() {
    this.$store.dispatch('loading/toggleLoading', true)
    this.loadAuctions()
    this.$store.dispatch('business/updateBusinessAuctionStatus')
    this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {
    async loadAuctions() {
      await this.$store.dispatch('business/fetchBusinessAuction')
    },
    handlePageChange(page: any) {
      this.currentPage = page
    },
    async updateBusinessAuctionStatus() {
      await this.$store.dispatch('business/updateBusinessAuctionStatus')
    },
  },
})
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 80%;
  margin: 0 auto;
}
.container-fluid .__title {
  @apply font-bold text-gray-600 md:text-3xl text-2xl  ml-2  md:ml-0
            flex flex-row  px-4 mt-0  md:mt-5 align-bottom gap-2;
}

.icon {
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

.icon-dashboard {
  mask: url('~/assets/images/business/chart-line-solid.svg');
}

.mask-back {
  -webkit-mask-image: url(~/assets/images/business/arrow_back.svg);
  mask-image: url(~/assets/images/business/arrow_back.svg);
}
.mask-back img {
  @apply bg-accent w-6 h-6;
}

.back-btn {
  @apply absolute md:top-2 top-1 left-1 text-sm  gap-1
        font-bold text-accent flex items-center ml-2;
}

@media screen and (max-width: 768px) {
  .container-fluid {
    width: 90%;
    margin: 0 auto;
  }

  .page-container {
    width: 90%;
    margin: 0 auto;
  }

  .current-info {
    flex-direction: column;
  }

  .leaderboard {
    @apply divide-y divide-x border border-gray-200;
    flex-direction: column;

    .card {
      @apply border-none rounded-none border-gray-800;
    }

    .card:first-child {
      @apply rounded-tl-md rounded-tr-md rounded-l-none;
    }

    .card:last-child {
      @apply rounded-b-md rounded-r-none;
    }
    .icon {
      height: 2em;
      width: 2em;
    }

    .icon-flag {
      height: 1.7em;
      width: 1.7em;
    }
  }
  .recent-leaderboards {
    div {
      -ms-overflow-style: none;
      scrollbar-width: 0;
    }

    & > div::-webkit-scrollbar {
      display: none;
    }

    .recent-leaderboards-help {
      @apply text-gray-300;
      display: block;
    }
  }
}
</style>
