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
      <!-- Time frame and specific location filters -->
      <div class="w-full flex">
        <div
          class="
            hidden
            w-1/6
            sticky
            top-20
            md:flex
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
          v-if="
            Object.keys(leaderboard).length > 0 &&
            !leaderboard.players.includes(userId) &&
            leaderboard.creatorId !== userId
          "
          class="flex justify-center items-center w-full mt-60 md:mt-0"
        >
          <div class="flex flex-col gap-y-3 w-full items-center">
            <div class="flex gap-x-2">
              <p class="text-xl">Are you sure you want to join</p>
              <p class="text-accent text-xl font-semibold">
                {{ leaderboard.name }}?
              </p>
            </div>
            <div class="flex gap-x-4">
              <button
                class="
                  btn btn-sm btn
                  primary
                  border-accent
                  text-accent
                  hover:bg-accent hover:text-white
                "
                @click="joinLeaderboard(true)"
              >
                Yes I want to join
              </button>
              <button
                class="
                  btn btn-sm
                  text-yellow-600
                  border-yellow-600
                  hover:text-white hover:bg-yellow-600
                "
                @click="joinLeaderboard(false)"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
        <div
          v-else-if="Object.keys(leaderboard).length > 0"
          class="flex flex-col gap-y-5 w-full"
        >
          <div class="w-full mx-auto">
            <div
              class="
                w-full
                px-5
                md:px-10
                flex flex-col
                justify-start
                items-center
                md:hidden
              "
            >
              <!-- The code below renders the top 10 lists -->
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
                Top 10
              </h1>
              <div
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
                <h1 class="w-1/6">Rank</h1>
                <h1 class="w-1/3">Name</h1>
                <h1 class="w-1/6">Kg Co2-e</h1>
                <h1 class="w-1/3">Location</h1>
              </div>
              <div
                v-for="(p, i) in emissionsHistory"
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
                "
                :class="{ 'border-accent': i == 0 || i == 1 || i == 2 }"
              >
                <h1 class="font-bold w-1/6">{{ i + 1 }}</h1>
                <div class="flex items-center w-1/3">
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
                    {{ p.name[0].toUpperCase() }}
                  </div>
                  <h1 class="truncate text-left capitalize">{{ p.name }}</h1>
                </div>
                <h1 class="w-1/6 truncate text-left">
                  {{ p.totalEmissions.toFixed(2) }}
                </h1>
                <h1 class="w-1/3 truncate text-left capitalize">
                  {{ p.location }}
                </h1>
                <div
                  v-if="p.uid == userId"
                  class="
                    absolute
                    flex
                    justify-center
                    items-center
                    px-1.5
                    py-0.5
                    bg-secondary
                    text-white text-2xs
                    md:right-2
                    right-10
                    rounded-full
                  "
                >
                  <span>You</span>
                </div>
              </div>
            </div>
            <div
              class="
                w-full
                h-full
                px-5
                md:px-10
                hidden
                md:flex
                flex-col
                justify-start
                items-center
              "
            >
              <div class="flex gap-x-8 justify-center items-center mb-4">
                <h1 class="text-center text-base md:text-lg font-semibold">
                  My rank
                </h1>
                <button
                  class="
                    transition
                    duration-150
                    bg-accent
                    rounded-lg
                    border border-white
                    py-2
                    px-3
                    text-white text-sm
                    -mr-8
                    hover:bg-white hover:text-accent hover:border-accent
                  "
                  @click="showLink = true"
                >
                  <i class="fa fa-link mr-2" />
                  Get invitation link
                </button>
              </div>

              <div
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
                  font-semibold
                  text-sm
                "
              >
                <h1 class="w-1/6">Rank</h1>
                <h1 class="w-1/3">Name</h1>
                <h1 class="w-1/6">Kg Co2-e</h1>
                <h1 class="w-1/3 ml-auto">Location</h1>
              </div>
              <div
                v-for="(p, i) in emissionsHistory"
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
                "
                :class="{
                  'bg-accent bg-opacity-25': p.uid == userId,
                  relative: p.uid == userId,
                }"
              >
                <!-- 'border-accent': i == 0 || i == 1 || i == 2, -->
                <h1 class="font-bold w-1/6">{{ i + 1 }}</h1>
                <div class="flex items-center w-1/3">
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
                    {{ p.name[0].toUpperCase() }}
                  </div>
                  <h1 class="truncate text-left capitalize">{{ p.name }}</h1>
                </div>
                <h1 class="w-1/6 truncate text-left">
                  {{ p.totalEmissions.toFixed(2) }}
                </h1>
                <h1 class="w-1/3 truncate text-left capitalize">
                  {{ p.location }}
                </h1>
                <div
                  v-if="p.uid == userId"
                  class="
                    absolute
                    flex
                    justify-center
                    items-center
                    px-1.5
                    py-0.5
                    bg-secondary
                    text-white text-2xs
                    right-2
                    rounded-full
                  "
                >
                  <span>You</span>
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
      </div>
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
            class="fa fa-close place-self-end text-3xl -mt-14"
            @click.self="showLink = false"
          />
          <div class="w-full text-center mx-auto my-6">
            <h1>Copy and share the link below</h1>
            <div class="flex justify-center">
              <span class="link text-gray-500 text-xs self-center">
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
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  layout: 'auth',
  data() {
    return {
      leaderboard: {},
      emissionsHistory: [],
      linkCopied: false,
      showLink: false,
      link: '',
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

    const leaderboardRef = this.$fire.firestore
      .collection('businessLeaderboards')
      .doc(this.leaderboardId)
    const leaderboardSnapshot = await leaderboardRef.get()
    const creatorId = leaderboardSnapshot.data().creatorId

    const businessSnapshot = await this.$fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', creatorId)
      .get()
    if (!businessSnapshot.empty) {
      const businessMembers = businessSnapshot.docs[0].data().Employees
      if (
        businessMembers.filter((member) => member.employeeId === this.userId)
          .length === 0 &&
        businessSnapshot.docs[0].data().BusinessOwnerId !== this.userId
      ) {
        alert('You are not a member of the organization')
        this.$router.push('/leaderboard/private')
      } else {
        console.log('You should see the leaderboard')
        if (leaderboardSnapshot.exists) {
          const leaderboard = leaderboardSnapshot.data()
          const players = leaderboard.players
          if (
            players.includes(this.userId) ||
            leaderboard.creatorId === this.userId
          ) {
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
          }
          this.emissionsHistory = this.emissionsHistory.reverse()
          // eslint-disable-next-line nuxt/no-globals-in-created
          this.link = `${window.location.origin}/leaderboard/private/${this.$route.params.id}`
          this.leaderboard = leaderboard
        }
      }
    } else {
      console.log('this is an erroneous link')
    }
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
        this.emissionsHistory = this.emissionsHistory.reverse()
        this.leaderboard = leaderboard
        this.$store.dispatch('loading/toggleLoading', false)
        alert('You have now joined', this.leaderboard.name)
      } else {
        this.$router.push('/business/dashboard/leaderboard')
      }
    },
  },
}
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
  @apply px-2.5 py-0.5 md:py-1 bg-transparent hover:bg-accent hover:bg-opacity-70 text-accent hover:text-white rounded-lg border hover:border-transparent border-accent mr-2;
}

.navitem-tab.active {
  @apply bg-accent text-white;
}
</style>
