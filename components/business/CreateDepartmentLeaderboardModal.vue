<template>
  <div
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
    @click.self="$emit('hidemodal')"
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
        @click.self="$emit('hidemodal')"
      />

      <form
        v-if="!linkGenerated && !link"
        class="w-9/12 mx-auto"
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
          <h1>
            Choose leaderboards:<i
              class="fa fa-asterisk text-red-600 text-2xs align-text-top"
            />
          </h1>
          <div
            v-for="lb in leaderboards"
            :key="lb.id"
            class="flex flex-col gap-y-4"
          >
            <div class="flex gap-x-4 place-items-center">
              <input
                :id="lb.id"
                type="checkbox"
                :name="lb.name"
                @change="addLeaderboard"
              />
              {{ lb.name }}
            </div>
          </div>
        </div>
        <div class="form-control my-2">
          <label for="prize">Prize/ Bet:</label>

          <input
            v-model="leaderboard.prize"
            placeholder="Is there a prize? What is it? (optional)"
            class="md:input input-sm border border-black rounded-lg"
            type="text"
            required
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
          Create Leaderboard
        </button>
      </form>
      <div v-if="linkGenerated && link" class="w-full text-center mx-auto my-6">
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
</template>

<script>
export default {
  props: { myLbs: Array },
  data() {
    return {
      //   link: 'http://localhost:3000/business/dashboard/leaderboard/amYKSpBiOosOLqrRerAD',
      link: '',
      linkCopied: false,
      formSubmitted: false,
      // linkGenerated: true,
      linkGenerated: false,
      leaderboard: {
        name: '',
        prize: '',
        prizeDescription: '',
        addedLeaderboards: [],
      },
      leaderboards: [],
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
  created() {
    this.myLbs.forEach((lb) => this.leaderboards.push(lb))
  },
  methods: {
    addLeaderboard(event) {
      if (event.target.checked)
        this.leaderboard.addedLeaderboards.push(event.target.id)
      else {
        const index = this.leaderboard.addedLeaderboards.find(
          (l) => l === event.target.id
        )
        this.leaderboard.addedLeaderboards.pop(index)
      }
    },
    async copyLink() {
      const text = this.link
      try {
        await navigator.clipboard.writeText(text)
        this.linkCopied = true
      } catch (error) {
        console.log('Could not copy to clipboard')
      }
    },

    async createLeaderboard() {
      if (this.leaderboard.addedLeaderboards.length < 2)
        alert('You will need to add at least 2 departments')
      else {
        const leaderboardsRef = this.$fire.firestore.collection(
          'departmentVsDepartment'
        )
        try {
          this.$store.dispatch('loading/toggleLoading', true)
          const leaderboardToBeAdded = {
            ...this.leaderboard,
            createdOn: new Date().toDateString(),
            creatorId: this.user.uid,
          }
          const snapshot = await leaderboardsRef.add(leaderboardToBeAdded)
          this.$emit('hidemodal')
          this.$emit('addedDepartmentLeaderboard', {
            id: snapshot.id,
            ...leaderboardToBeAdded,
            averagePoints: 0,
          })
          this.$store.dispatch('loading/toggleLoading', false)
        } catch (error) {
          this.formSubmitted = false
          this.$store.dispatch('loading/toggleLoading', false)
          return alert('Something went wrong. Please try again later.')
        }
        alert(
          'Success!\nYou have successfully created your own private leaderboard. Share the invite link with people you want to join the leaderboard.'
        )
      }
    },
  },
}
</script>

<style scoped>
</style>