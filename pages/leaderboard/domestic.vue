<template>
  <div class="w-full flex flex-col justify-start items-center">
    <section
      class="
        container
        mx-auto
        flex flex-col
        md:flex-row
        justify-center
        md:items-start
        items-center
      "
    >
      <h1
        class="
          text-lg text-white
          font-semibold
          px-4
          py-2.5
          rounded-xl
          md:mr-2
          mb-2
          md:mb-0
          bg-accent
        "
      >
        <i class="fa fa-flag"></i>
        <span class="md:hidden">Domestic</span>
      </h1>

      <!-- Drop down menu to select Regions -->
      <select class="hidden md:block select select mr-3">
        <label for="place">Cities</label>
        <option selected="selected" value="">Domestic</option>
        <option disabled>London</option>
        <option disabled>Birmingham</option>
        <option disabled>Manchester</option>
        <option disabled>Leeds</option>
        <option disabled>Liverpool</option>
        <option disabled>Lecister</option>
        <option disabled>New Castle</option>
      </select>
      <div>
        <nav class="flex justify-center items-center mb-5">
          <nuxt-link
            :class="{ active: leaderboardSection == 'top10' }"
            class="navitem-tab"
            to="/leaderboard/domestic?section=top10"
            >Top 10</nuxt-link
          >
          <nuxt-link
            :class="{ active: leaderboardSection == 'myLocation' }"
            class="navitem-tab"
            to="/leaderboard/domestic?section=myLocation"
          >
            My rank</nuxt-link
          >
        </nav>
        <div
          class="
            md:hidden
            mb-5
            text-sm
            flex
            justify-evenly
            w-full
            px-3
            gap-x-2
            items-center
          "
        >
          <div class="w-1/2">
            <label for="location">Location</label>
            <input
              placeholder="Search locations"
              class="input w-full input-sm"
              type="text"
            />
          </div>

          <div class="w-1/2">
            <label for="time">Time </label>
            <select class="select w-full select-sm">
              <option disabled="disabled" selected="selected" value="">
                Select time frame
              </option>
              <option>This month</option>
              <option>Previous month</option>
            </select>
          </div>
        </div>
      </div>
    </section>

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
      <div class="w-full md:w-1/2">
        <div
          v-if="leaderboardSection == 'top10' && rawData.length"
          class="w-full px-5 md:px-10 flex flex-col justify-start items-center"
        >
          <!-- The code below renders the top 10 lists -->
          <h1
            class="text-center md:text-lg text-base font-semibold mb-1 md:mb-2"
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
            v-for="(p, i) in rawData"
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
                {{ p.data.name[0].toUpperCase() }}
              </div>
              <h1 class="truncate text-left capitalize">{{ p.data.name }}</h1>
            </div>
            <h1 class="w-1/6 truncate text-left">
              {{ p.data.totalEmissions.toFixed(2) }}
            </h1>
            <h1 class="w-1/3 truncate text-left capitalize">
              {{ p.data.location }}
            </h1>
          </div>
        </div>
        <div
          v-if="leaderboardSection == 'myLocation' && rawData.length"
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
          <h1
            class="text-center text-base md:text-lg font-semibold mb-1 md:mb-2"
          >
            My rank
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
            v-for="(p, i) in rawData"
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
              'border-accent': i == 0 || i == 1 || i == 2,
              'bg-accent bg-opacity-25': p.data.uid == user.uid,
              relative: p.data.uid == user.uid,
            }"
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
                {{ p.data.name[0].toUpperCase() }}
              </div>
              <h1 class="truncate text-left capitalize">{{ p.data.name }}</h1>
            </div>
            <h1 class="w-1/6 truncate text-left">
              {{ p.data.totalEmissions.toFixed(2) }}
            </h1>
            <h1 class="w-1/3 truncate text-left capitalize">
              {{ p.data.location }}
            </h1>
            <div
              v-if="p.data.uid == user.uid"
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
        <h1 v-if="!rawData.length" class="w-full text-center mt-40">
          No data available for this month
          <nuxt-link class="link" to="/dashboard/measure"
            >Start measuring yours</nuxt-link
          >
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      rawData: [],
      // names: [
      //   'David Smith',
      //   'Nancy Jones',
      //   'Mark Johnson',
      //   'Sarah Smith',
      //   'Andrew Miller',
      //   'Emily Davis',
      //   'Steven Price',
      //   'Michael Clark',
      //   'Paul Brown',
      //   'Anna Black',
      // ],
      // locations: [
      //   'London, UK',
      //   'Manchester, UK',
      //   'Birmingham, UK',
      //   'Leeds, UK',
      //   'Glasgow, UK',
      //   'Sheffield, UK',
      //   'Bradford, UK',
      //   'Liverpool, UK',
      //   'Bristol, UK',
      //   'Belfast, UK',
      // ],
    }
  },

  computed: {
    // This toggles top10 or my rank sections
    leaderboardSection() {
      return this.$route.query.section || 'top10'
    },
    sortedList() {
      return 'sortedlist'
      // TODO: return sorted list based on sorting parameter
    },
    user() {
      return this.$store.state.auth.authUser
    },
    userData() {
      return this.$store.state.auth.userData
    },
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    try {
      console.log(new Date().getMonth())
      const ref = this.$fire.firestore
        .collection('emissionsHistory')
        .where('location', '==', this.userData.location)
        .where('month', '==', new Date().getMonth() + 1)
      const domesticEmissions = await ref.get()
      console.log(domesticEmissions)

      domesticEmissions.forEach((e) => {
        this.rawData.push({
          id: e.id,
          data: e.data(),
        })
      })

      if (!this.rawData.length) {
        this.$store.dispatch('loading/toggleLoading', false)
        return alert('No emissions data found for this month.')
      }

      this.rawData = _.sortBy(
        this.rawData,
        (o) => o.data.totalEmissions
      ).reverse()
      // console.log(this.rawData)
      this.$store.dispatch('loading/toggleLoading', false)
    } catch (error) {
      // console.log(error.message)
      alert('Error fetching data. Please try again later.')
      this.$store.dispatch('loading/toggleLoading', false)
    }
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
  @apply px-2.5 py-0.5 md:py-1 bg-transparent hover:bg-accent hover:bg-opacity-70 text-accent hover:text-white rounded-lg border hover:border-transparent border-accent mr-2;
}

.navitem-tab.active {
  @apply bg-accent text-white;
}
</style>
