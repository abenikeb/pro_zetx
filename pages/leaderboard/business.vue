<template>
  <div class="mt-20 ml-10">
    <h4 class="font-bold text-gray-600 text-3xl">
      <i
        class="icon icon-leaderboard bg-yellow-400"
        style="width: 1em; height: 1em"
      ></i>
      Business Leaderboards
    </h4>
    <div class="tabs mt-4">
      <a
        ref="tab1"
        data-tab="1"
        class="tab tab-bordered tab-active"
        @click="handleTabClick"
        >International</a
      >
      <a ref="tab2" data-tab="2" class="tab" @click="handleTabClick"
        >Domestic ({{ local_country }})</a
      >
    </div>

    <div ref="page1">
      <h4 class="mt-4 font-bold text-gray-700 underline">
        International Leaderboard
      </h4>

      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Business Name</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Employees</th>
                <th>Carbon Coin (CC)</th>
              </tr>
            </thead>
            <tbody v-if="leaderboards">
              <tr
                v-for="(businessLeaderboard, idx) in leaderboards.international"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.Name }}</td>
                <td>{{ businessLeaderboard.Country }}</td>
                <td>{{ businessLeaderboard.Industry }}</td>
                <td>{{ businessLeaderboard.EmployeeCount }}</td>
                <td>{{ businessLeaderboard.CarbonCreditBalance }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  Nothing to show from the leaderboard
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>

    <div ref="page2" class="hidden">
      <h4 class="mt-4 font-bold text-gray-700 underline">
        Domestic Leaderboard
      </h4>

      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Business Name</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Employees</th>
                <th>Carbon Coin (CC)</th>
              </tr>
            </thead>
            <tbody v-if="leaderboards">
              <tr
                v-for="(businessLeaderboard, idx) in leaderboards.domestic"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.Name }}</td>
                <td>{{ businessLeaderboard.Country }}</td>
                <td>{{ businessLeaderboard.Industry }}</td>
                <td>{{ businessLeaderboard.EmployeeCount }}</td>
                <td>{{ businessLeaderboard.CarbonCreditBalance }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  Nothing to show from the leaderboard
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>

    <div ref="page3" class="hidden">
      <h4 class="mt-4 font-bold text-gray-700 underline">
        Private Leaderboard
      </h4>

      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Business Name</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Employees</th>
                <th>Carbon Coin (CC)</th>
              </tr>
            </thead>
            <tbody v-if="leaderboards">
              <tr
                v-for="(businessLeaderboard, idx) in leaderboards.private"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.Name }}</td>
                <td>{{ businessLeaderboard.Country }}</td>
                <td>{{ businessLeaderboard.Industry }}</td>
                <td>{{ businessLeaderboard.EmployeeCount }}</td>
                <td>{{ businessLeaderboard.CarbonCreditBalance }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  Nothing to show from the leaderboard
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      local_country: this.$store.state.auth.userData.location,
      business: undefined as undefined | any,
      businessRank: undefined as undefined | any,
      leaderboards: {
        international: [],
        domestic: [],
        private: [],
      },
    }
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)

    this.business = await this.$store.dispatch(
      'business/getBusinessInformation'
    )
    this.businessRank = await this.$store.dispatch(
      'business/getBusinessLeaderbardRank'
    )
    if (this.$store.state.business.topBusinessLeaderboard === undefined) {
      this.leaderboards = await this.$store.dispatch(
        'business/getTopBusinessLeaderboard'
      )
    } else this.leaderboards = this.$store.state.business.topBusinessLeaderboard


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
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
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
