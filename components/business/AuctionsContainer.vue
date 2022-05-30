<template>
  <div class="container">
    <div class="tabs mt-4">
      <a
        ref="tab1"
        data-tab="1"
        class="tab tab-bordered tab-active"
        @click="handleTabClick"
        >Open Auctions</a
      >
      <a ref="tab2" data-tab="2" class="tab" @click="handleTabClick"
        >Closed Auctions</a
      >
    </div>

    <div ref="page1">
      <h4 class="mt-4 font-bold text-gray-700 underline">Open Auctions</h4>
      <div class="recent-leaderboards">
        <section class="overflow-x-auto">
          <div
            v-if="paginateBusinessAuctions.length > 0"
            class="w-full flex flex-wrap justify-start items-start"
          >
            <CarbonCredit
              v-for="(businessAuction, i) in paginateBusinessAuctions"
              :key="i"
              :status="opened"
              :businessAuction="businessAuction"
            />
          </div>
          <div v-else class="mt-4 text-xl text-accent px-2">
            <div>
              [ No opened auctions found. If you want to start the auction
              <button
                class="btn btn-primary btn-sm text-white font-bold"
                @click="handleOpen"
              >
                Click
              </button>
              here! ]
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
              :page-size="8"
              :current-page="currentPage"
              @on_Page_Change="handlePageChange"
            />
          </div>
          <!-- END pagination index counter -->
        </section>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>

    <div ref="page2" class="hidden">
      <h4 class="mt-4 font-bold text-gray-700 underline">Closed Auctions</h4>
      <div class="recent-leaderboards">
        <section class="overflow-x-auto">
          <div
            v-if="paginateClosedBusinessAuctions.length > 0"
            class="w-full flex flex-wrap justify-start items-start"
          >
            <CarbonCredit
              v-for="(businessAuction, i) in paginateClosedBusinessAuctions"
              :key="i"
              :businessAuction="businessAuction"
            />
          </div>
          <div v-else class="mt-4 text-lg text-accent px-6">
            [ No Closed Auctions Yet ]
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
              :items-count="closedBusinessAuctions.length"
              :page-size="8"
              :current-page="currentPage"
              @on_Page_Change="handlePageChange"
            />
          </div>
          <!-- END pagination index counter -->
        </section>
        <buyCreditModal
          v-if="showModal === true"
          @closeModal="showModal = false"
          @close-modal="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import CarbonCredit from '~/components/business/CarbonCredit.vue'
import Pagination from '~/components/product/Pagination.vue'
import BuyCreditModal from '~/components/business/BuyCreditModal.vue'

export default Vue.extend({
  components: {
    buyCreditModal: BuyCreditModal as Vue.Component,
    CarbonCredit,
    Pagination,
  },

  data() {
    return {
      leaderboards: {
        international: [],
        domestic: [],
        private: [],
      },
      showModal: false,
      currentPage: 1 as number,
      pageSize: 8 as number,
    }
  },
  computed: {
    businessAuctions() {
      return this.$store.state.business.businessAuctions
    },
    closedBusinessAuctions() {
      return this.$store.state.business.closedBusinessAuctions
    },
    paginateBusinessAuctions(): any {
      return _(this.businessAuctions)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value()
    },
    paginateClosedBusinessAuctions(): any {
      return _(this.closedBusinessAuctions)
        .slice(Number(this.currentPage - 1) * Number(this.pageSize))
        .take(Number(this.pageSize))
        .value()
    },
  },

  created() {
    this.$store.dispatch('loading/toggleLoading', true)
    this.loadAuctions()
    this.loadClosedAuctions()
    this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {
    handleTabClick(e: Event) {
      const vueSelf = this

      const ACTIVE_TAB_CLASS_BORDERED = 'tab-bordered'
      const ACTIVE_TAB_CLASS_ACTIVE = 'tab-active'

      const tabBtn = e.target as HTMLElement
      const tabNum = tabBtn.getAttribute('data-tab')
      const tabRefs = _.keys(this.$refs).filter((key) => key.includes('tab'))
      const pageRefs = _.keys(this.$refs).filter((key) => key.includes('page'))

      // Exit if tabNumber not provided
      if (typeof tabNum === 'undefined') return

      const currentTab = tabRefs.find((key) => key.endsWith(tabNum as string))
      const currentPage = pageRefs.find((key) => key.endsWith(tabNum as string))
      const otherTabs = tabRefs.filter((key) => !key.endsWith(tabNum as string))
      const otherPages = pageRefs.filter(
        (key) => !key.endsWith(tabNum as string)
      )

      // Exit if currentTab not provided
      if (
        typeof currentTab === 'undefined' ||
        typeof currentPage === 'undefined'
      )
        return

      // Disable other tabs and pages
      otherTabs.forEach((key) => {
        const tabRef = vueSelf.$refs[key] as HTMLElement
        tabRef.classList.remove('tab-bordered')
        tabRef.classList.remove(ACTIVE_TAB_CLASS_BORDERED)
      })
      otherPages.forEach((key) => {
        const tabRef = vueSelf.$refs[key] as HTMLElement
        tabRef.classList.add('hidden')
      })

      // Enable the current tab and page
      const currentTabRef = this.$refs[currentTab] as HTMLElement
      currentTabRef.classList.add(ACTIVE_TAB_CLASS_BORDERED)
      currentTabRef.classList.add(ACTIVE_TAB_CLASS_ACTIVE)

      const currentPageRef = this.$refs[currentPage] as HTMLElement
      currentPageRef.classList.remove('hidden')
    },
    handleOpen() {
      this.showModal = true
    },
    async loadAuctions() {
      await this.$store.dispatch('business/fetchBusinessAuction')
    },
    async loadClosedAuctions() {
      await this.$store.dispatch('business/fetchCloasedBusinessAuction')
    },
    handlePageChange(page: any) {
      this.currentPage = page
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.leaderboard {
  @apply divide-x shadow-sm rounded-lg;
  display: flex;
  flex-direction: row;

  .inc-rank {
    @apply text-green-400;
  }

  .inc-rank::before {
    content: '↗︎';
    margin-right: 0.1em;
  }

  .dec-rank {
    @apply text-red-400;
  }

  .dec-rank::before {
    content: '↘︎';
    margin-right: 0.1em;
  }

  .disabled-rank {
    @apply text-gray-300;
    text-decoration: line-through;
  }

  .card {
    @apply border-t border-b
      rounded-none py-3 px-4;
    display: inline-flex;
    flex: 1 1 0%;
    flex-direction: column;
    gap: 0.3em;
    position: relative;

    * {
      line-height: 0;
    }

    &:first-child {
      @apply rounded-l-lg border-l;
    }

    &:last-child {
      @apply rounded-r-lg border-r;
    }

    .card-title {
      @apply text-xs text-gray-400
        font-light;
      padding-left: 0.2em;
      line-height: 0;
      margin-bottom: 0;
    }

    .card-value {
      @apply text-4xl text-gray-700 font-bold;
      text-transform: uppercase;
    }

    .card-desc {
      @apply text-xs font-light;
      line-height: 0;
      margin-bottom: 0;
    }

    .card-icon {
      position: absolute;
      top: 10%;
      right: 5%;
    }
  }

  .icon {
    display: inline-block;
    width: 2.5em;
    height: 2.5em;
    line-height: 0;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;

    &.icon-users {
      mask: url('~/assets/images/business/users-solid.svg');
    }

    &.icon-credit {
      mask: url('~/assets/images/business/carbon_credit.svg');
    }

    &.icon-globe {
      mask: url('~/assets/images/business/globe.svg');
    }

    &.icon-flag {
      mask: url('~/assets/images/business/flag-solid.svg');
    }

    &.icon-lock {
      mask: url('~/assets/images/business/lock-alt.svg');
    }

    &.icon-leaderboard {
      mask: url('~/assets/images/business/chess-queen.svg');
    }

    &.icon-exclamation {
      mask: url('~/assets/images/business/lock-alt.svg');

      /* Correcting height issue */
      .icon-flag {
        height: 2em !important;
      }
    }
  }
}

.tab {
  @apply text-gray-400;

  &.tab-active {
    @apply text-gray-900;
  }
}

.recent-leaderboards {
  @apply mt-2;

  thead {
    @apply bg-gray-100 border-none text-gray-700;
  }

  tbody {
    tr > th {
      background: #f9fafb !important;
    }

    tr:nth-child(2n) {
      @apply rounded;
      background: rgb(243, 244, 246);
    }
  }

  .recent-leaderboards-help {
    display: none;
  }

  * {
    @apply border-none divide-y-0 text-xs;
  }
}

@media screen and (max-width: 768px) {
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
