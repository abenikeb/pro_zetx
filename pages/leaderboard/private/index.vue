<template>
  <div class="w-full flex flex-col justify-start items-center">
    <section
      class="
        container
        mx-auto
        flex flex-col
        md:flex-row
        justify-center
        items-start
      "
    >
      <div
        class="
          hidden
          md:flex
          w-1/5
          sticky
          top-20
          flex-col
          justify-start
          items-start
          mt-10
        "
      >
        <h1 class="text-gray-500 text-xs mb-2 text-left">
          <i class="fa fa-bullhorn"></i> Sponsored Ads
        </h1>
        <div class="mb-5">
          <div
            class="
              bg-white
              shadow-lg
              rounded-xl
              flex flex-col
              justify-start
              items-center
              w-full
              py-4
              px-2
              border
            "
          >
            <h1 class="text-sm font-semibold text-black">
              Use <span class="text-accent">Premium</span> features now!
            </h1>
            <div class="w-1/3 my-4">
              <img
                class="w-full"
                src="~/assets/images/rocket.png"
                alt="rocket"
              />
            </div>
            <nuxt-link
              to="/dashboard/subscriptions"
              class="btn btn-accent btn-sm rounded-full"
              >Get premium</nuxt-link
            >
          </div>
        </div>
      </div>

      <div
        class="
          ml-auto
          w-full
          px-5
          mx-auto
          flex flex-col
          justify-start
          items-center
        "
      >
        <div class="w-full">
          <div
            class="
              w-full
              px-5
              md:px-10
              flex flex-col
              justify-start
              items-center
            "
          >
            <h1
              class="
                text-center
                md:text-lg
                text-base
                font-semibold
                mb-1
                md:mb-2
              "
            >
              Private Leaderboards
            </h1>
            <div
              class="overflow-x-auto w-full"
              v-if="privateLeaderboards.length && !loading"
            >
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Your rank</th>
                    <th>Average Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(p, i) in privateLeaderboards"
                    :key="i"
                    class="
                      cursor-pointer
                      border
                      shadow-md
                      bg-white
                      hover:bg-accent hover:bg-opacity-20
                    "
                    @click="$router.push(`/leaderboard/private/${p.id}`)"
                  >
                    <td>{{ i + 1 }}</td>
                    <td class="ellipsis">{{ p.name }}</td>
                    <td>{{ p.rank ? p.rank : 'N/A' }}</td>
                    <td>{{ p.averagePoints.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="overflow-x-auto w-full" v-else-if="loading">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Your rank</th>
                    <th>Average Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(p, i) in 5"
                    :key="i"
                    class="
                      cursor-pointer
                      border
                      shadow-md
                      bg-white
                      hover:bg-accent hover:bg-opacity-20
                    "
                  >
                    <td>
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="w-full justify-center items-center flex flex-col"
              v-else
            >
              <img
                src="~/assets/images/private.png"
                class="w-3/5 h-full mt-10"
                alt=""
              />

              <h1>You have no private leaderboards so far</h1>
            </div>
            <!-- <div
              v-if="privateLeaderboards.length"
              class="
                flex
                justify-between
                items-center
                bg-white
                shadow-md
                border
                h-10
                w-full
                mb-1
                px-5
                md:text-base
                text-sm
                font-semibold
              "
            >
              <h1 class="w-1/12">#</h1>
              <h1 class="w-1/3">Name</h1>
              <h1 class="w-1/2">Your rank in this leaderboard</h1>
              <h1 class="w-1/6">Average Points</h1>
            </div>
            <div
              v-for="(p, i) in privateLeaderboards"
              :key="i"
              class="
                flex
                justify-between
                items-center
                bg-white
                shadow-md
                border
                h-10
                w-full
                mb-1
                px-5
                md:text-sm
                text-xs
                cursor-pointer
              "
              @click="$router.push(`/leaderboard/private/${p.id}`)"
            >
              <h1 class="font-bold w-1/12">
                {{ i + 1 }}
              </h1>
              <div class="flex items-center">
                <div
                  class="
                    rounded-full
                    bg-accent bg-opacity-60
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
                  L
                </div>
                <h1 class="w-full text-left capitalize">{{ p.name }}</h1>
              </div>
              <h1 class="w-1/6 text-left">{{ p.rank ? p.rank : 'N/A' }}</h1>
              <h1 class="w-1/6 text-left">{{ p.averagePoints.toFixed(2) }}</h1>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      privateLeaderboards: [],
      loading: true,
    }
  },
  computed: {
    uid() {
      return this.$store.state.auth.authUser.uid
    },
  },
  async created() {
    if (!this.$store.state.leaderboard.myPrivateLeaderboards)
      await this.$store.dispatch('leaderboard/getMyPrivateLeaderboards')
    const privateLeaderboards =
      this.$store.state.leaderboard.myPrivateLeaderboards

    if (!this.$store.state.measure.allEmissionsHistory)
      await this.$store.dispatch('measure/getAllEmissionsHistory')

    const allEmissionsHistory = this.$store.state.measure.allEmissionsHistory

    // const emissionsHistoryRef = this.$fire.firestore
    //   .collection('emissionsHistory')
    //   .orderBy('totalEmissions')
    // const emissionsHistorySnapshot = await emissionsHistoryRef.get()
    const emissionsHistory = {}
    allEmissionsHistory.forEach((emission) => {
      if (
        emission.year === new Date().getFullYear() &&
        emission.month === new Date().getMonth() + 1
      )
        emissionsHistory[emission.uid] = {
          ...emission,
        }
    })

    privateLeaderboards.forEach((privateBoard) => {
      let total = 0
      let leaderboardRankList = []
      privateBoard.players.forEach((player) => {
        if (emissionsHistory[player]) {
          total += emissionsHistory[player].totalEmissions
          leaderboardRankList.push({
            id: player,
            emission: emissionsHistory[player].totalEmissions,
          })
        }
      })
      leaderboardRankList.sort((a, b) => a.emission - b.emission)
      leaderboardRankList = leaderboardRankList.reverse()
      privateBoard.rank =
        leaderboardRankList.findIndex((lb) => lb.id === this.uid) + 1
      if (privateBoard.players.length === 0) privateBoard.averagePoints = 0
      else privateBoard.averagePoints = total / privateBoard.players.length
    })
    privateLeaderboards.sort((a, b) => a.averagePoints - b.averagePoints)

    this.privateLeaderboards = privateLeaderboards.reverse()
    this.loading = false
  },
})
</script>

<style scoped>
.inner-nav > a {
  @apply transition-all duration-100 border-transparent border-b py-1.5 px-4 rounded;
}
.inner-nav > a:hover,
.inner-nav > a:active {
  @apply border-b border-gray-500 bg-gray-100;
}

.navitem {
  @apply mx-2 text-sm text-gray-500 hover:text-black flex justify-center items-center;
}

.inner-nav > a.nuxt-link-active {
  @apply border-b border-gray-500 text-black  bg-gray-200 rounded;
}

.secondary-inner-nav > a:hover,
.secondary-inner-nav > a:active {
  @apply border-b text-gray-900 font-semibold;
}

.secondary-inner-nav > a.nuxt-link-active {
  @apply text-black font-semibold;
}

.navitem-tab {
  @apply px-2.5 py-1 bg-transparent hover:bg-accent hover:bg-opacity-70 text-accent hover:text-white rounded-xl border hover:border-transparent border-accent mr-2;
}

.navitem-tab.active {
  @apply bg-accent text-white;
}

.ellipsis {
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
