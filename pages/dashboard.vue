<template>
  <div class="flex justify-start items-start md:pr-4">
    <section
      class="
        container
        mx-auto
        flex-col
        justify-center
        items-center
        w-1/5
        hidden
        md:flex
      "
    >
      <div class="flex flex-col justify-start items-center">
        <div
          class="
            w-32
            h-32
            overflow-hidden
            rounded-full
            border-2 border-accent
            shadow-lg
          "
        >
          <img
            class="w-full h-full bg-accent bg-opacity-20"
            :src="user ? `https://robohash.org/${user.email}.png?set=set3` : ''"
          />
        </div>
        <nuxt-link to="#"> </nuxt-link>
      </div>

      <div class="flex flex-col justify-center items-center ml-5">
        <div class="flex">
          <h1 v-if="user" class="text-2xl font-bold text-gray-900 uppercase">
            {{ user.firstName + ' ' + user.lastName }}
          </h1>
          <img class="w-6 ml-1" src="~/assets/images/check.svg" alt="" />
        </div>
        <div class="flex gap-x-2">
          <i class="fa fa-map-pin text-accent"></i>
          <h4 class="text-sm text-gray-600 text-center">{{ user.location }}</h4>
        </div>
        <div
          class="
            mt-1
            bg-accent
            px-5
            py-3
            rounded-2xl
            flex
            justify-center
            items-center
          "
        >
          <span class="text-xs font-normal text-white mr-2">Balance</span>
          <!-- <h1 v-if="carbonCredit" class="text-2xl font-bold text-white">
            {{ carbonCredit }}<span class="text-gray-100 text-sm">CC</span>
          </h1>
          <button v-else class="btn btn-accent loading"></button> -->
          <h1
            v-if="carbonCredit || !fetchingData"
            class="md:text-2xl font-bold text-white"
          >
            {{ carbonCredit == null ? '0 CC' : `${+carbonCredit.toFixed(2)} CC`
            }}<span class="text-gray-100 text-sm"></span>
          </h1>
          <button v-else class="btn btn-sm btn-accent loading" href=""></button>
        </div>
        <!-- <nuxt-link class="btn btn-xs btn-outline btn-accent px-5" to="#"
            >Sell</nuxt-link -->
        <!-- <div class="w-full flex justify-center items-center mt-3">
          <nuxt-link
            class="btn btn-xs btn-accent px-5 mr-3"
            to="/market/carboncredit"
            >Buy</nuxt-link
          >
          
          <button
            class="btn btn-xs btn-outline btn-accent px-5"
            @click="showModal = true"
          >
            Sell
          </button>
        </div> -->
        <div
          v-if="profileTrackerFinal !== 100"
          class="w-full flex flex-col justify-start items-center"
        >
          <div class="w-full flex items-center mt-5 gap-x-2">
            <div class="w-full">
              <progress-bar :val="profileTrackerFinal" />
            </div>
            <h1 class="font-bold text-sm">{{ profileTrackerFinal }}%</h1>
          </div>
          <nuxt-link to="/dashboard/settings">
            <h1
              class="
                w-full
                text-center text-sm
                font-bold
                text-accent
                hover:underline
                mt-2
                cursor-pointer
              "
            >
              Complete profile
            </h1>
          </nuxt-link>
        </div>

        <sellCreditModal
          v-if="showModal"
          :carbon-credit="carbonCredit"
          @closeModal="showModal = false"
          @close-modal="showModal = false"
        />
      </div>

      <div class="mt-5 px-5">
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
            <img class="w-full" src="~/assets/images/rocket.png" alt="rocket" />
          </div>
          <nuxt-link
            to="/dashboard/subscriptions"
            class="btn btn-accent btn-sm rounded-full"
            >Get premium</nuxt-link
          >
        </div>
      </div>
    </section>
    <nav
      class="
        mobile-innernav
        sticky
        top-16
        md:hidden
        w-1/6
        flex flex-col
        justify-start
        items-center
        gap-y-5
        py-4
        px-1
        shadow-lg
        bg-white
        rounded-md
        z-30
      "
    >
      <nuxt-link exact class="mobile-navitem" to="/dashboard">
        <img src="~/assets/images/dashboard.svg" class="w-6" alt="" />
        <h1 class="text-2xs truncate">dashboard</h1>
      </nuxt-link>
      <nuxt-link class="mobile-navitem" to="/dashboard/content">
        <img src="~/assets/images/contentDashboard.svg" class="w-6" alt="" />
        <h1 class="text-2xs truncate">content</h1>
      </nuxt-link>
      <nuxt-link class="mobile-navitem" to="/dashboard/measure"
        ><img src="~/assets/images/measures.svg" class="w-6" alt="" />
        <h1 class="text-2xs truncate">measure</h1>
      </nuxt-link>
      <nuxt-link class="mobile-navitem" to="/dashboard/product">
        <img src="~/assets/images/manage.svg" class="w-6" alt="" />
        <h1 class="text-2xs truncate">products</h1>
      </nuxt-link>
      <div class="dropdown">
        <label
          tabindex="0"
          class="dropdown-button mobile-navitem"
          @click="toggelNav = !toggelNav"
          ><img
            src="~/assets/images/dashboardOptions.svg"
            class="w-5 mr-1"
            alt=""
          />
          More</label
        >
        <div class="w-8">
          <ul v-if="toggelNav" tabindex="1" class="dropdown-content">
            <li>
              <nuxt-link
                class="mobile-navitem-more"
                to="/dashboard/transaction"
                @click.native="toggleMobileMoreOptions"
              >
                <img
                  src="~/assets/images/history.svg"
                  class="w-6 mt-3"
                  alt=""
                />
                <h1 class="text-2xs truncate">history</h1>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="mobile-navitem-more"
                to="/dashboard/subscriptions"
                @click.native="toggleMobileMoreOptions"
              >
                <img
                  src="~/assets/images/subscription.svg"
                  class="w-6 mt-3"
                  alt=""
                />
                <h1 class="text-2xs truncate">your plan</h1>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="mobile-navitem-more"
                to="/dashboard/settings"
                @click.native="toggleMobileMoreOptions"
              >
                <img
                  src="~/assets/images/settings.svg"
                  class="w-6 mt-3"
                  alt=""
                />
                <h1 class="text-2xs truncate">settings</h1>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- <nuxt-link class="mobile-navitem" to="#">
        <img src="~/assets/images/referrals.svg" class="w-6" alt="" />
      </nuxt-link> -->
      <div class="relative">
        <!-- <span
          class="flex flex-col items-center cursor-pointer"
          @click="toggleMobileMoreOptions"
        >
          <img
            src="~/assets/images/dashboardOptions.svg"
            class="w-5 mr-1"
            alt=""
          />
          More</span
        > -->

        <!-- <div
          v-if="showMobileMoreOptions"
          class="w-24 h-48 shadow-md gap-y-5 bg-white absolute top-2 left-10"
        >
          <nuxt-link
            class="mobile-navitem-more"
            to="/dashboard/transaction"
            @click.native="toggleMobileMoreOptions"
          >
            <img src="~/assets/images/history.svg" class="w-6 mt-3" alt="" />
            <h1 class="text-2xs truncate">history</h1>
          </nuxt-link>
          <nuxt-link
            class="mobile-navitem-more"
            to="/dashboard/subscriptions"
            @click.native="toggleMobileMoreOptions"
          >
            <img
              src="~/assets/images/subscription.svg"
              class="w-6 mt-3"
              alt=""
            />
            <h1 class="text-2xs truncate">your plan</h1>
          </nuxt-link>
          <nuxt-link
            class="mobile-navitem-more"
            to="/dashboard/settings"
            @click.native="toggleMobileMoreOptions"
          >
            <img src="~/assets/images/settings.svg" class="w-6 mt-3" alt="" />
            <h1 class="text-2xs truncate">settings</h1>
          </nuxt-link>
        </div> -->
      </div>
    </nav>
    <section class="w-4/5">
      <nav
        class="
          inner-nav
          container
          bg-white
          shadow-lg
          h-14
          rounded
          justify-center
          items-center
          gap
          hidden
          md:flex
        "
      >
        <nuxt-link exact class="navitem" to="/dashboard">
          <img src="~/assets/images/dashboard.svg" class="w-5 mr-1" alt="" />
          Dashboard</nuxt-link
        >
        <nuxt-link class="navitem" to="/dashboard/content"
          ><img
            src="~/assets/images/contentDashboard.svg"
            class="w-5 mr-1"
            alt=""
          />Content</nuxt-link
        >
        <nuxt-link class="navitem" to="/dashboard/measure"
          ><img
            src="~/assets/images/measures.svg"
            class="w-5 mr-1"
            alt=""
          />Measure emissions</nuxt-link
        >

        <nuxt-link class="navitem" to="/dashboard/product">
          <img src="~/assets/images/manage.svg" class="w-5 mr-1" alt="" />
          Manage products</nuxt-link
        >
        <div class="relative">
          <!-- <span class="flex cursor-pointer" @click="toggleMoreOptions">
            <img
              src="~/assets/images/dashboardOptions.svg"
              class="w-5 mr-1"
              alt=""
            />
            More</span
          > -->
          <div
            class="dropdown dropdown-end inner-nav"
            style="min-width: 14em; max-width: 40em"
          >
            <label
              tabindex="0"
              class="dropdown-button flex navitem text-lg"
              @click="toggelNav = !toggelNav"
              ><img
                src="~/assets/images/dashboardOptions.svg"
                class="w-5 mr-1"
                alt=""
              />
              More</label
            >
            <ul v-if="toggelNav" tabindex="1" class="dropdown-content">
              <li>
                <nuxt-link
                  class="text-xs flex"
                  to="/dashboard/transaction"
                  @click.native="toggelNav = !toggelNav"
                >
                  <img
                    src="~/assets/images/history.svg"
                    class="w-5 mx-4"
                    alt=""
                  />
                  Transaction history</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  class="text-xs flex"
                  to="/dashboard/subscriptions"
                  @click.native="toggelNav = !toggelNav"
                >
                  <img
                    src="~/assets/images/subscription.svg"
                    class="w-5 mx-4"
                    alt=""
                  />
                  Subscription</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  class="text-xs flex"
                  to="/dashboard/settings"
                  @click.native="toggelNav = !toggelNav"
                >
                  <img
                    src="~/assets/images/settings.svg"
                    class="w-5 mx-4"
                    alt=""
                  />
                  Settings</nuxt-link
                >
              </li>
            </ul>
          </div>
          <div
            v-if="showMoreOptions"
            class="w-52 h-36 shadow-md gap-y-5 bg-white absolute top-9 z-50"
          >
            <nuxt-link
              class="text-xs m-5 flex"
              to="/dashboard/transaction"
              @click.native="toggleMoreOptions"
            >
              <img src="~/assets/images/history.svg" class="w-5 mx-4" alt="" />
              Transaction history</nuxt-link
            >
            <nuxt-link
              class="text-xs m-5 flex"
              to="/dashboard/subscriptions"
              @click.native="toggleMoreOptions"
            >
              <img
                src="~/assets/images/subscription.svg"
                class="w-5 mx-4"
                alt=""
                @click.native="toggleMoreOptions"
              />
              Subscription</nuxt-link
            >
            <nuxt-link
              class="text-xs m-5 flex"
              to="/dashboard/settings"
              @click.native="toggleMoreOptions"
            >
              <img src="~/assets/images/settings.svg" class="w-5 mx-4" alt="" />
              Settings</nuxt-link
            >
          </div>
        </div>
      </nav>

      <div class="container mx-auto md:mt-3">
        <NuxtChild />
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import sellCreditModal from '~/components/market/sellCreditModal.vue'
import ProgressBar from '~/components/classifier/Progress.vue'
export default Vue.extend({
  components: {
    sellCreditModal,
    ProgressBar,
  },
  layout: 'auth',
  middleware: 'auth',

  data() {
    return {
      showModal: false,
      fetchingData: true,
      showMoreOptions: false,
      showMobileMoreOptions: false,
      toggelNav: false,
    }
  },

  computed: {
    profileTrackerFinal() {
      return this.$store.state.auth.profileTracker
    },
    user() {
      return this.$store.state.auth.userData
    },

    carbonCredit() {
      console.log(this.$store.state.dashboard.carbonCredit)
      return this.$store.state.dashboard.carbonCredit
    },
  },
  async created() {
    await this.$store.dispatch('auth/profileTrackerHandler')
    await this.$store.dispatch('dashboard/getUserCarbonCreditAction')
    this.fetchingData = false
  },
  methods: {
    toggleMoreOptions() {
      this.showMoreOptions = !this.showMoreOptions
    },
    toggleMobileMoreOptions() {
      this.showMobileMoreOptions = !this.showMobileMoreOptions
    },
  },
})
</script>

<style scoped>
.inner-nav > a,
.inner-nav > div > span {
  @apply transition-all duration-100 border-transparent border-b py-1.5 px-10;
}
.inner-nav > a:hover,
.inner-nav > a:active {
  @apply border-b border-gray-500 bg-gray-100;
}

.navitem {
  @apply mx-2 text-xs text-gray-500 hover:text-gray-900 flex justify-center items-center;
}

.inner-nav > a.nuxt-link-active {
  @apply border-b border-green-500 bg-accent text-white rounded;
}

.mobile-navitem {
  @apply border-b-2 border-transparent opacity-40 mx-auto transition-all duration-300 flex flex-col items-center;
}
.mobile-navitem-more {
  @apply border-b-2 border-transparent transition-all duration-300 flex flex-col items-center;
}
.mobile-innernav > a.nuxt-link-active {
  @apply opacity-100 w-8 contrast-150 border-accent;
}

.dropdown .dropdown-button {
  @apply font-light normal-case m-1 cursor-pointer text-gray-400  hover:text-gray-600;
}

.dropdown .dropdown-button:focus {
  @apply text-gray-600 font-bold;
}

.dropdown ul {
  @apply menu p-2 shadow bg-white rounded-box mt-5;
}

.dropdown li {
  @apply bg-white hover:bg-gray-200 rounded-xl;
}

.more-menu {
  /* z-index: unset !important; */
}

@media screen and (max-width: 768px) {
  .dropdown .dropdown-button {
    @apply font-light normal-case  m-1 cursor-pointer text-gray-400  hover:text-gray-600;
  }

  .dropdown .dropdown-button:focus {
    @apply text-gray-600 font-bold;
  }

  .dropdown ul {
    @apply menu p-2 shadow bg-white rounded-box mt-5 w-24;
  }

  .dropdown li {
    @apply bg-white hover:bg-gray-200 rounded-xl;
  }
}
</style>
