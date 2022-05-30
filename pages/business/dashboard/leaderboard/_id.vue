<template>
  <div>
    <div
      v-if="
        Object.keys(leaderboard).length > 0 &&
        !leaderboard.players.includes(userId) &&
        leaderboard.creatorId !== userId
      "
      class="flex flex-col gap-y-3"
    >
      <p class="text-xl">
        Are you sure you want to join {{ leaderboard.name }}?
      </p>
      <div class="flex gap-x-4">
        <button class="btn primary" @click="joinLeaderboard(true)">
          Yes I want to join
        </button>
        <button class="btn danger" @click="joinLeaderboard(false)">
          Not now
        </button>
      </div>
    </div>
    <div
      v-else-if="Object.keys(leaderboard).length > 0"
      class="flex flex-row md:flex-col gap-y-5 w-full"
    >
      <div class="w-full md:w-3/4 mx-auto flex">
        <nuxt-link
          to="/business/dashboard/leaderboard"
          class="self-center flex gap-x-2"
        >
          <i
            class="
              fa fa-chevron-left
              text-primary text-xl
              self-center
              ml-5
              md:ml-0
            "
          />
          <span class="self-center font-semibold hidden md:inline-block">
            back
          </span>
        </nuxt-link>

        <div
          class="
            w-full
            h-full
            px-5
            md:px-10
            flex flex-col
            justify-start
            items-center
          "
        >
          <div
            class="
              flex flex-col
              md:flex-row
              gap-x-10
              justify-center
              items-center
              mb-4
            "
          >
            <div
              class="flex items-center flex-col md:flex-row gap-y-5 md:gap-x-5"
            >
              <h1
                v-if="!leaderboardEdit"
                class="text-center text-base md:text-lg font-semibold"
              >
                {{ leaderboard.name }}
              </h1>
              <input
                v-else
                ref="leaderboardName"
                type="text"
                :value="leaderboard.name"
                class="
                  px-3
                  py-1
                  border border-gray-600
                  rounded-lg
                  outline-none
                  focus:border-gray-300
                "
              />
              <div
                class="
                  flex flex-col
                  md:flex-row
                  justify-center
                  items-center
                  md:gap-x-5
                  gap-y-3
                "
              >
                <button
                  class="
                    hidden
                    md:inline-block
                    transition
                    duration-150
                    bg-accent
                    rounded-lg
                    border border-white
                    py-2
                    px-3
                    text-white text-sm
                    hover:bg-white hover:text-accent hover:border-accent
                  "
                  @click="showLink = true"
                >
                  <i class="fa fa-link mr-2" />
                  Get invitation link
                </button>

                <i
                  class="fa fa-link mr-10 text-accent md:hidden"
                  @click="showLink = true"
                />

                <button
                  :class="
                    leaderboardEdit
                      ? 'text-white bg-primary border-primary hover:text-primary hover:bg-white'
                      : 'text-secondary bg-white border-secondary hover:text-white hover:bg-secondary'
                  "
                  class="btn btn-xs md:btn-sm"
                  @click="editLeaderboard"
                >
                  {{ leaderboardEdit ? 'Save changes' : 'Edit' }}
                </button>
                <button
                  v-if="leaderboardEdit"
                  class="
                    btn btn-xs
                    md:btn-sm
                    transition
                    duration-300
                    px-4
                    py-1
                    border
                    rounded-lg
                    text-red-500
                    bg-white
                    border-red-500
                    hover:text-white hover:bg-red-500
                  "
                  @click="
                    leaderboardEdit = false
                    leaderboard.players = tempPlayers
                    emissionsHistory = tempEmissionsHistory
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1 v-if="false" class="w-full text-center mt-40">
          No data available for this month
          <nuxt-link class="link" to="/dashboard/measure"
            >Start measuring yours</nuxt-link
          >
        </h1>
      </div>
    </div>
    <div v-else></div>
    <div
      v-if="showLink"
      class="
        w-screen
        h-screen
        fixed
        left-0
        top-0
        bg-black bg-opacity-50
        z-50
        flex
        justify-center
        items-center
      "
      @click.self="showLink = false"
    >
      <div
        class="
          mt-4
          md:px-5 md:py-20
          w-full
          sm:w-4/5
          md:w-2/5
          bg-white
          p-5
          rounded-lg
          flex flex-col
        "
      >
        <i
          class="fa fa-close place-self-end text-3xl md:-mt-14 cursor-pointer"
          @click.self="showLink = false"
        />
        <div class="w-full text-center mx-auto my-6">
          <h1>Copy and share the link below</h1>
          <div class="flex justify-center">
            <span
              class="
                link
                w-full
                text-gray-500 text-xs
                self-center
                overflow-x-auto
              "
            >
              <i class="fa fa-link mr-1" />{{ link }}
            </span>
            <span
              :data-tip="linkCopied ? 'Link copied' : 'Copy link'"
              class="tooltip"
              @click="copyLink"
            >
              <span
                :class="{ 'opacity-60': !linkCopied }"
                class="
                  ml-2
                  rounded-xl
                  px-3
                  py-3
                  bg-accent
                  text-accent
                  bg-opacity-20
                  fa fa-copy
                "
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table
        class="
          table table-compact
          flex
          justify-center
          items-center
          w-3/4
          mx-auto
        "
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Kg Co2-e</th>
            <th>Location</th>
            <th><h1 class="opacity-0">Actions</h1></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(p, i) in emissionsHistory"
            :key="i"
            :class="{
              'bg-accent bg-opacity-25': p.uid == userId,
            }"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.totalEmissions.toFixed(2) }}</td>
            <td>{{ p.location }}</td>
            <td v-if="leaderboardEdit" @click="removeUser(p.uid)">
              <img
                src="~/assets/images/business/minus.png"
                class="w-4 h-4 cursor-pointer"
                alt=""
              />
            </td>
            <td>
              <span
                v-if="p.uid == userId"
                class="
                  rounded-full
                  px-1.5
                  py-0.5
                  bg-secondary
                  text-white text-xs
                "
                >You</span
              >
              <span v-else class="p-4"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      leaderboard: {},
      emissionsHistory: [],
      linkCopied: false,
      showLink: false,
      link: '',
      leaderboardEdit: false,
      tempEmissionsHistory: [],
      tempPlayers: [],
    }
  },
  computed: {
    userId() {
      return this.$store.state.auth.authUser.uid
    },
    leaderboardId() {
      return this.$route.params.id
    },
  },
  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    const myBusinessLeaderboards =
      this.$store.state.business.myBusinessLeaderboard
    let leaderboard
    if (myBusinessLeaderboards) {
      leaderboard = myBusinessLeaderboards.find(
        (lb) => lb.id === this.leaderboardId
      )
      if (!leaderboard) {
        const leaderboardRef = this.$fire.firestore
          .collection('businessLeaderboards')
          .doc(this.leaderboardId)
        const leaderboardSnapshot = await leaderboardRef.get()
        if (leaderboardSnapshot.exists) {
          leaderboard = {
            id: leaderboardSnapshot.id,
            ...leaderboardSnapshot.data(),
          }
        }
      }
      if (leaderboard && leaderboard.creatorId !== this.userId) {
        alert(
          "This is not your leaderboard. It is not a respectable thing to try to access other people's leaderboard"
        )
        this.$router.push('/business/leaderboard')
        leaderboard = undefined
      }
    } else {
      const leaderboardRef = this.$fire.firestore
        .collection('businessLeaderboards')
        .doc(this.leaderboardId)
      const leaderboardSnapshot = await leaderboardRef.get()
      if (leaderboardSnapshot.exists) {
        leaderboard = {
          id: leaderboardSnapshot.id,
          ...leaderboardSnapshot.data(),
        }
      }
      if (leaderboard && leaderboard.creatorId !== this.userId) {
        alert(
          "This is not your leaderboard. It is not a respectable thing to try to access other people's leaderboard"
        )
        this.$router.push('/business/dashboard/leaderboard')
        leaderboard = undefined
        return
      }
    }
    if (!leaderboard) {
      alert('There is no leaderboard with this id')
      this.$router.push('/business/dashboard/leaderboard')
      return
    }
    const players = leaderboard.players
    let allEmissionsHistory = this.$store.state.measure.allEmissionsHistory
    let everythingExistsOnTheStore = true
    if (allEmissionsHistory) {
      players.forEach((player) => {
        const playerEmission = allEmissionsHistory.find(
          (emission) =>
            emission.uid === player &&
            emission.year === new Date().getFullYear() &&
            emission.month === new Date().getMonth() + 1
        )
        if (!playerEmission) everythingExistsOnTheStore = false
      })
    } else everythingExistsOnTheStore = false

    if (!everythingExistsOnTheStore) {
      allEmissionsHistory = await this.$store.dispatch(
        'measure/getAllEmissionsHistory'
      )
    }

    allEmissionsHistory.forEach((emission) => {
      if (
        players.includes(emission.uid) &&
        emission.year === new Date().getFullYear() &&
        emission.month === new Date().getMonth() + 1
      ) {
        this.emissionsHistory.push(emission)
      }
    })
    // }
    this.emissionsHistory = this.emissionsHistory.reverse()
    // eslint-disable-next-line nuxt/no-globals-in-created
    this.link = `${window.location.origin}/leaderboard/private/${this.$route.params.id}`
    this.leaderboard = leaderboard
    this.tempPlayers = this.leaderboard.players
    this.tempEmissionsHistory = this.emissionsHistory

    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    async copyLink() {
      const text = this.link
      try {
        await navigator.clipboard.writeText(text)
        this.linkCopied = true
      } catch (error) {
        console.log('Could not copy to clipboard')
      }
    },
    async joinLeaderboard(decision) {
      if (decision) {
        const leaderboard = this.leaderboard
        this.leaderboard = {}
        const leaderboardRef = this.$fire.firestore
          .collection('businessLeaderboards')
          .doc(this.leaderboardId)
        this.$store.dispatch('loading/toggleLoading', true)
        await leaderboardRef.update({
          players: firebase.firestore.FieldValue.arrayUnion(this.userId),
        })
        leaderboard.players.push(this.userId)
        const players = leaderboard.players
        const emissionsHistoryRef = this.$fire.firestore
          .collection('emissionsHistory')
          .orderBy('totalEmissions')
        const emissionsHistory = await emissionsHistoryRef.get()
        emissionsHistory.forEach((emission) => {
          if (
            players.includes(emission.data().uid) &&
            emission.data().year === new Date().getFullYear() &&
            emission.data().month === new Date().getMonth() + 1
          ) {
            this.emissionsHistory.push(emission.data())
          }
        })
        this.emissionsHistory = this.emissionHistory.reverse()
        this.leaderboard = leaderboard
        this.$store.dispatch('loading/toggleLoading', false)
        alert('You have now joined', this.leaderboard.name)
      } else {
        this.$router.push('/business/dashboard/leaderboard')
      }
    },
    async editLeaderboard() {
      if (!this.leaderboardEdit) {
        this.leaderboardEdit = true
        await this.$refs.leaderboardName
        this.$refs.leaderboardName.focus()
        return
      }
      await this.$refs.leaderboardName
      const newLeaderboardName = this.$refs.leaderboardName.value
      await this.$fire.firestore
        .collection('businessLeaderboards')
        .doc(this.leaderboardId)
        .update({
          name: newLeaderboardName,
          players: this.leaderboard.players,
        })
      console.log(this.$store.state.business.myBusinessLeaderboard)
      this.leaderboard.name = newLeaderboardName
      if (this.$store.state.business.myBusinessLeaderboard) {
        const storeLeaderboard =
          this.$store.state.business.myBusinessLeaderboard
        storeLeaderboard.forEach((lb) => {
          if (lb.id === this.leaderboardId) lb = this.leaderboard
        })
        this.$store.commit(
          'business/SET_MY_BUSINESS_LEADERBOARD',
          storeLeaderboard
        )
      }
      this.leaderboardEdit = false
    },
    removeUser(uid) {
      this.emissionsHistory = this.emissionsHistory.filter(
        (emission) => emission.uid !== uid
      )
      this.leaderboard.players = this.leaderboard.players.filter(
        (player) => player !== uid
      )
      console.log(this.leaderboard.players)
    },
  },
}
</script>

<style scoped>
</style>