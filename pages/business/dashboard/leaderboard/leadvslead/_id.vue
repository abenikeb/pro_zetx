<template>
  <div class="flex flex-col mx-5">
    <h1 class="text-center md:text-lg text-base font-semibold mb-1 md:mb-2">
      {{ lvlData.name }}
    </h1>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Department</th>
            <th>Number of players</th>
            <th>Prize</th>
            <th>Monthly average points</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lb, rank) in displayedLeaderboards"
            :key="lb.id"
            class="
              cursor-pointer
              border
              shadow-md
              bg-white
              hover:bg-accent hover:bg-opacity-20
            "
            @click="$router.push('/business/dashboard/leaderboard/' + lb.id)"
          >
            <td>{{ rank + 1 }}</td>
            <td class="ellipsis">{{ lb.name }}</td>
            <td>{{ lb.players.length }}</td>
            <td>{{ lb.prize }}</td>
            <td>{{ lb.averagePoints }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lvlData: {},
      displayedLeaderboards: [],
    }
  },
  computed: {
    uid() {
      return this.$store.state.auth.authUser.uid
    },
  },
  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    const lvlSnapshot = await this.$fire.firestore
      .collection('departmentVsDepartment')
      .doc(this.$route.params.id)
      .get()
    this.lvlData = { id: lvlSnapshot.id, ...lvlSnapshot.data() }
    let myLeaderboards
    if (this.$store.state.business.myBusinessLeaderboard === undefined) {
      myLeaderboards = await this.$store.dispatch(
        'business/getMyBusinessLeaderboard'
      )
    } else myLeaderboards = this.$store.state.business.myBusinessLeaderboard

    const emissionsHistoryRef = this.$fire.firestore
      .collection('emissionsHistory')
      .orderBy('totalEmissions')
    const emissionsHistorySnapshot = await emissionsHistoryRef.get()
    const emissionsHistory = {}
    emissionsHistorySnapshot.forEach((emission) => {
      if (
        emission.data().year === new Date().getFullYear() &&
        emission.data().month === new Date().getMonth() + 1
      )
        emissionsHistory[emission.data().uid] = {
          id: emission.id,
          ...emission.data(),
        }
    })
    const displayedLeaderboards = []
    myLeaderboards.forEach((myLeaderboard) => {
      let total = 0
      myLeaderboard.players.forEach((player) => {
        if (emissionsHistory[player])
          total += emissionsHistory[player].totalEmissions
      })
      if (myLeaderboard.players.length === 0) myLeaderboard.averagePoints = 0
      else myLeaderboard.averagePoints = total / myLeaderboard.players.length
      if (this.lvlData.addedLeaderboards.includes(myLeaderboard.id))
        displayedLeaderboards.push(myLeaderboard)
    })
    displayedLeaderboards.sort((a, b) => a.averagePoints - b.averagePoints)
    this.displayedLeaderboards = displayedLeaderboards.reverse()
    this.$store.dispatch('loading/toggleLoading', false)
  },
}
</script>

<style scoped>
.ellipsis {
  max-width: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>