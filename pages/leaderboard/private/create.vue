<template>
  <div class="w-full flex flex-col justify-start items-center">
    <section
      class="
        container
        mx-auto
        flex flex-col
        md:flex-row md:justify-center
        justify-start
        md:items-start
        items-center
      "
    >
      <h1
        class="
          md:text-lg
          text-white
          font-semibold
          px-5
          py-2.5
          rounded-xl
          mr-2
          bg-red-700
        "
      >
        <i class="fa fa-lock"></i>
        Private
      </h1>

      <div>
        <!-- <nav
          class="
            rounded
            inner-nav
            bg-white
            shadow-lg
            h-10
            flex
            justify-center
            items-center
          "
        >
          <nuxt-link exact class="navitem" to="/dashboard"> London</nuxt-link>

          <nuxt-link class="navitem" to="#"> Birmingham</nuxt-link>
          <nuxt-link class="navitem" to="#"> Manchester</nuxt-link>
          <nuxt-link class="navitem" to="#"> Leeds</nuxt-link>
          <nuxt-link class="navitem" to="#"> Liverpool</nuxt-link>
          <nuxt-link class="navitem" to="#"> Lecister</nuxt-link>
          <nuxt-link class="navitem" to="#"> New Castle</nuxt-link>
        </nav> -->
        <nav
          class="
            rounded-xl
            secondary-inner-nav
            h-12
            w-full
            flex
            justify-center
            items-center
          "
        >
          <nuxt-link class="navitem" exact to="/leaderboard/private">
            Your leaderboards</nuxt-link
          >
          <nuxt-link
            class="navitem"
            exact
            to="/leaderboard/private/invitations"
          >
            Invitations</nuxt-link
          >
          <!-- <nuxt-link
            class="navitem"
            exact
            to="/leaderboard/private/invitations"
          >
            Competitions</nuxt-link
          > -->
        </nav>
      </div>
    </section>
    <h1 class="text-accent-focus md:text-xl text-sm font-bold mt-4">
      <span
        class="
          rounded-full
          text-sm
          bg-accent bg-opacity-20
          text-accent
          px-3
          py-1.5
          cursor-pointer
        "
        @click="$router.back()"
        ><span class="fa fa-chevron-left"></span> back</span
      >
      Create your own private leaderboard
    </h1>

    <div class="mt-4 px-5 md:px-0 w-full">
      <form
        v-if="!linkGenerated && !link"
        class="w-full md:w-1/3 mx-auto"
        @submit.prevent="createLeaderboard"
      >
        <!-- <div class="w-full flex justify-between my-2">
          <div class="w-5/12 flex flex-col">
            <label for="start">Start Date:</label>
            <input class="md:input input-sm border border-black" type="date" />
          </div>

          <div class="flex w-5/12 flex-col">
            <label for="end">End Date:</label>
            <input class="md:input input-sm border border-black" type="date" />
          </div>
        </div> -->

        <div class="form-control my-2">
          <label for="prize">Name:</label>

          <input
            v-model="leaderboard.name"
            required
            placeholder="Give your leaderboard a name..."
            class="md:input input-sm border border-black rounded-lg"
            type="text"
          />
        </div>

        <div class="form-control my-2">
          <label for="start">Number of players:</label>
          <input
            v-model="leaderboard.numberOfPlayers"
            required
            placeholder="#"
            class="md:input input-sm border border-black rounded-lg"
            type="number"
            min="5"
            max="20"
          />
        </div>

        <div class="form-control my-2">
          <label for="prize">Prize/ Bet:</label>

          <input
            v-model="leaderboard.prize"
            placeholder="Is there a prize? What is it? (optional)"
            class="md:input input-sm border border-black rounded-lg"
            type="text"
          />
        </div>

        <div class="form-control my-2">
          <label for="start">Prize/Bet Description:</label>

          <textarea
            v-model="leaderboard.prizeDescription"
            placeholder="Describe the rules of the bet/prize..."
            class="border border-black rounded-lg px-2 py-1.5"
            rows="3"
            cols="50"
          />
        </div>

        <button
          v-if="!formSubmitted"
          type="submit"
          class="btn-sm btn md:btn-md btn-accent rounded-full mt-5"
        >
          Generate Invitation Link
        </button>
      </form>
      <div v-if="linkGenerated && link" class="w-5/6 text-center mx-auto my-6">
        <h1>Copy and share the link below</h1>
        <h1 class="link text-gray-500 text-sm">
          <span class="fa fa-link mr-2"></span>{{ link }}
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
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      link: '',
      linkCopied: false,
      formSubmitted: false,
      linkGenerated: false,
      leaderboard: {
        name: '',
        // creator: this.user.uid,
        numberOfPlayers: 0,
        // players: [this.user.uid],
        prize: '',
        prizeDescription: '',
        createdOn: new Date(),
      },
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.authUser
    },
    userData() {
      return this.$store.state.auth.userData
    },
  },

  methods: {
    async copyLink() {
      const text = this.link
      try {
        await navigator.clipboard.writeText(text)
        console.log('Copied to clipboard')
        this.linkCopied = true
      } catch (error) {
        console.log('Could not copy to clipboard')
      }
    },

    async createLeaderboard() {
      const leaderboardsRef = this.$fire.firestore.collection(
        'privateLeaderboards'
      )
      try {
        this.$store.dispatch('loading/toggleLoading', true)
        const snapshot = await leaderboardsRef.add({
          ...this.leaderboard,
          createdOn: new Date().toDateString(),
          creatorId: this.user.uid,
          creatorName: this.userData.firstName,
          players: [this.user.uid],
        })
        this.link = `${window.location.origin}/leaderboard/private/${snapshot.id}`
        console.log(this.link)
        this.formSubmitted = true
        this.linkGenerated = true
        this.$store.dispatch('loading/toggleLoading', false)
      } catch (error) {
        this.formSubmitted = false
        console.log(error)
        this.$store.dispatch('loading/toggleLoading', false)
        return alert('Something went wrong. Please try again later.')
      }
      alert(
        'Success!\nYou have successfully created your own private leaderboard. Share the invite link with people you want to join the leaderboard.'
      )
    },
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
</style>
