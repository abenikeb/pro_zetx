
<template>
  <div class="w-full">
    <!-- CTA -->
    <div class="">
      <nav class="desktop-nav">
        <nuxt-link
          to="/"
          class="flex items-center text-xl font-bold text-accent"
        >
          <img src="~/assets/images/logo.svg" class="w-10" alt="" />
          <h1 class="ml-3 text-accent">GreenCheddar</h1>
        </nuxt-link>
        <!-- <div class="flex justify-center items-center text-gray-500">
          <nuxt-link class="mx-2 hover:text-black" exact to="/">Home</nuxt-link>
        </div> -->
        <div class="auth-links">
          <section v-if="!user">
            <nuxt-link to="/login" class="btn btn-link text-gray-600 btn-sm"
              >Login</nuxt-link
            >
            <nuxt-link to="/signup" class="btn btn-accent btn-sm rounded-full"
              >Sign up</nuxt-link
            >
          </section>
          <section v-if="user && isProfileSetup">
            <nuxt-link
              to="/business/dashboard"
              class="btn btn-accent btn-sm rounded-full"
              >Go to Dashboard</nuxt-link
            >
          </section>
          <section v-else>
            <nuxt-link
              to="/business/setup"
              class="btn btn-accent btn-sm rounded-full"
              >Setup Business Profile</nuxt-link
            >
          </section>
        </div>
      </nav>

      <nav class="mobile-nav">
        <nuxt-link
          to="/"
          class="flex items-center text-xl font-bold text-accent"
        >
          <img src="~/assets/images/logo.svg" class="w-10" alt="" />
        </nuxt-link>
        <div v-if="!sidenavActive" @click="sidenavActive = true">
          <i class="fa fa-bars text-accent text-3xl"></i>
        </div>
        <div v-else @click="sidenavActive = false">
          <i class="fa fa-times text-accent text-3xl"></i>
        </div>
      </nav>

      <div v-if="sidenavActive" class="sidenav">
        <span class="w-14 h-14 mx-auto border-2 border-accent rounded-full">
          <img
            :src="user ? `https://robohash.org/${user.email}.png?set=set3` : ''"
            alt="Top navbar menu icon"
          />
          <!-- <p class="px-2" v-if="business">{{ business.Name }}</p> -->
        </span>
        <h1
          v-if="business"
          class="text-xl my-1 font-semibold px-12 justify-center items-center"
        >
          {{ business.Name }}
        </h1>
        <h1 v-else class="text-xl my-1 font-semibold px-12">
          {{ user.firstName }}
        </h1>
        <section v-if="user && isProfileSetup">
          <nuxt-link
            to="/business/dashboard"
            class="btn btn-accent btn-sm rounded-full"
            >Go to Dashboard</nuxt-link
          >
        </section>
        <section v-else>
          <nuxt-link
            to="/business/setup"
            class="btn btn-accent btn-sm rounded-full"
            >Setup Business Profile</nuxt-link
          >
        </section>
        <!-- <nuxt-link
          class="text-lg mb-2 bg-accent border text-white rounded-box px-3 mx-2"
          to="/business/dashboard"
          @click.native="sidenavActive = false"
          >Go to dashboard</nuxt-link
        > -->

        <div class="w-full flex items-center justify-between"></div>
      </div>
      <div
        v-if="sidenavActive"
        class="bg-black bg-opacity-50 fixed top-0 left-0 z-40 w-screen h-screen"
        @click="sidenavActive = false"
      ></div>
    </div>

    <!-- Hero Section -->
    <section class="w-full pt-8">
      <div
        class="
          bg-white
          my-8
          w-5/6
          md:w-3/4 md:my-12
          mx-auto
          shadow-lg
          rounded-3xl
          overflow-hidden
          flex flex-col
          justify-center
          md:justify-start
          items-center
        "
      >
        <div class="w-full h-96 relative z-30">
          <img src="~/assets/images/homebg.jpg" class="w-full h-full" alt="" />
          <div
            class="
              w-5/6
              md:w-3/4
              mx-auto
              flex flex-col
              justify-center
              items-center
              px-2
              md:px-5
              py-3
              md:py-8
              text-center
              absolute
              top-14
              left-8
              md:left-32
              z-40
              rounded-2xl
              text-white
              bg-black bg-opacity-50
            "
          >
            <h1 class="mb-2 md:mb-4 text-lg md:text-5xl font-black">
              Become a
              <span
                class="
                  text-white
                  bg-gradient-to-br
                  from-accent
                  to-accent-focus
                  px-2
                  py-1
                  rounded-md
                "
                >Green Partner</span
              >
            </h1>
            <p class="mb-4 text-center px-5">
              Explore the different ways we can work together so your company
              can become part of the ESG community, improve its operations and
              public image.
            </p>
            <nuxt-link class="btn btn-accent" to="/dashboard"
              >Get started</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
    <!-- END - Hero Section -->

    <section class="container mx-auto px-8 md:px-36 text-center my-20">
      <div
        class="
          px-14
          py-10
          bg-white
          shadow-sm
          flex flex-col
          justify-start
          items-center
          rounded-3xl
        "
      >
        <img class="w-16 pb-5" src="~/assets/images/logo.svg" alt="logo" />
        <h1 class="text-accent text-4xl font-black mb-5">Who are we?</h1>
        <p class="text-center md:text-left">
          GreenCheddar is a voluntary carbon trading system aiming to make
          carbon trading accessible at an individual/houshold level. It helps
          you contribute to the local and global fight against climate change.
        </p>
      </div>
    </section>
    <!-- call to actions cards -->
    <section
      class="
        w-full
        flex flex-col
        md:flex-row
        flex-wrap
        justify-center
        items-base
        mt-16
        mb-10
        ml-4
      "
    >
      <div class="feature">
        <img src="~/assets/images/earth.svg" alt="" />
        <h1>MOTIVATE EMPLOYEES TO LIVE GREENER</h1>
        <p>
          Reflect on their efforts to reduce their carbon footprint and energy
          use through our Employee Rewards and Recognition program.
        </p>
      </div>

      <div class="feature">
        <img src="~/assets/images/money.svg" alt="" />
        <h1>CREATE CUSTOM LEADERBOARDS</h1>
        <p>
          Build a leaderboard with anyone. With the custom leaderboard, One can
          easily keep track of where they stand relative to their friends,
          family, and colleagues.
        </p>
      </div>

      <div class="feature">
        <img src="~/assets/images/trophy.svg" alt="" />
        <h1>EARN SUSTAINABILITY BADGES</h1>
        <p>
          Take the unique approach with GreenCheddar to ensure your company
          creates positive and long-lasting impacts both within and outside the
          business to earn a badge.
        </p>
      </div>
    </section>
    <!-- Start Advertizing -->
    <div>
      <carousel
        :per-page="1"
        :autoplay="true"
        :loop="false"
        :pagination-padding="5"
        :autoplay-timeout="5000"
        :nav="true"
      >
        <slide v-for="advertise in advertiseContent" :key="advertise">
          <div class="container mx-auto px-8 md:px-36 text-center my-20">
            <AdvertisingCard :advertise="advertise" />
          </div>
        </slide>
      </carousel>
    </div>
    <!-- End Advertizing -->

    <!-- <section
      class="
        w-5/6
        mx-auto
        rounded-full
        bg-accent
        h-44
        flex
        justify-evenly
        items-center
        px-10
        shadow-lg
      "
    >


      <div class="stat">
        <h1>120+</h1>
        <h3>Cities around the world</h3>
      </div>

      <div class="stat">
        <h1>66</h1>
        <h3>Countries in 4 continents</h3>
      </div>

      <div class="stat">
        <h1>20K+</h1>
        <h3>Users</h3>
      </div>

      <div class="stat">
        <h1>$250K+</h1>
        <h3>Traded in carbon credits</h3>
      </div>
    </section> -->

    <section
      class="
        w-full
        h-full
        py-10
        md:px-28
        px-4
        flex flex-col
        md:flex-row
        justify-start
        md:justify-evenly
        items-center
        mt-20
        bg-white
      "
    >
      <!-- News settler section -->

      <div class="flex flex-col justify-center items-center">
        <h1 class="text-lg md:text-2xl font-bold text-accent-focus mb-2">
          Lets be friends
        </h1>
        <img src="~/assets/images/follow.svg" class="w-20 md:w-40" alt="" />
      </div>

      <div class="flex flex-col justify-center items-start w-full md:w-1/2">
        <h1 class="text-center md:text-left text-gray-700 text-xl ml-4 mb-1">
          Subscribe to our monthly newsletter
        </h1>
        <div class="w-full flex justify-center items-center">
          <input
            class="
              input
              w-3/4
              bg-transparent
              hover:bg-transparent
              border border-current
            "
            placeholder="enter your email..."
            type="text"
          />
          <button class="btn ml-2">Subscribe</button>
        </div>

        <div class="w-full overflow-auto flex justify-evenly items-center mt-6">
          <a
            href="#"
            class="
              flex flex-col
              justify-center
              items-center
              text-sm text-gray-600
            "
          >
            <img
              class="w-6 md:w-10 mb-2"
              src="~/assets/images/facebook.svg"
              alt=""
            />
          </a>
          <a
            href="https://twitter.com/greencheddar21"
            target="_blank"
            class="
              flex flex-col
              justify-center
              items-center
              text-sm text-gray-600
            "
          >
            <img
              class="w-6 md:w-10 mb-2"
              src="~/assets/images/twitter.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.instagram.com/greencheddar21/"
            target="_blank"
            class="
              flex flex-col
              justify-center
              items-center
              text-sm text-gray-600
            "
          >
            <img
              class="w-6 md:w-10 mb-2"
              src="~/assets/images/instagram.svg"
              alt=""
            />
          </a>
          <a
            href="#"
            class="
              flex flex-col
              justify-center
              items-center
              text-sm text-gray-600
            "
          >
            <img
              class="w-6 md:w-10 mb-2"
              src="~/assets/images/youtube.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.tiktok.com/@greencheddar21"
            target="_blank"
            class="
              flex flex-col
              justify-center
              items-center
              text-sm text-gray-600
            "
          >
            <img
              class="w-6 md:w-10 mb-2"
              src="~/assets/images/tiktok.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import AdvertisingCard from '../../components/business/AdvertisingCard.vue'

export default Vue.extend({
  components: {
    Carousel,
    Slide,
    AdvertisingCard,
  },
  layout: 'guest',
  middleware: ['auth','bus'],

  data() {
    return {
      isProfileSetup: false,
      sidenavActive: false,
      business: undefined,
      advertiseContent: [
        {
          title: 'Advertise Here',
          highlight: 'Finding customers for your new business',
          body: `Getting a new business off the ground is a lot of hard work. Here
            are several ideas you can use to find your first customers.`,
          images: 'adv1.svg',
        },
        {
          title: 'Sample Advertise',
          highlight: 'Finding customers for your new business',
          body: `Getting a new business off the ground is a lot of hard work. Here
            are several ideas you can use to find your first customers.`,
          images: 'adv2.svg',
        },
      ],
      // business: undefined as undefined | any,
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.userData
    },
  },

  async created() {
    // this.$store.dispatch('loading/toggleLoading', true)
    // await this.fetchBusinessProfile()
    // this.isProfileSetup
    //   ? this.$router.replace('/business/dashboard')
    //   : (this.isProfileSetup = false)
    // this.$store.dispatch('loading/toggleLoading', false)
    // const isBusiness =
    //   this.$store.state.auth.userData.roles.includes('business')
    // console.log('bus', isBusiness)
    // isBusiness
    //   ? this.$router.replace('/business/dashboard')
    //   : this.$router.replace('/business/setup')
  },

  methods: {
    async fetchBusinessProfile() {
      const uid = this.$fire.auth.currentUser?.uid

      if (!uid) return

      const busienssRef = this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', uid)
        .limit(1)
      const businessDocs = await busienssRef.get()

      if (businessDocs.empty) return

      this.isProfileSetup = true
      this.business = {
        id: businessDocs.docs[0].id,
        ...businessDocs.docs[0].data(),
      }
    },
  },
})
</script>

<style scoped>
.feature {
  @apply hover:bg-white  flex flex-col justify-start items-center w-5/6 md:w-1/4 mb-8 p-4 shadow-lg hover:shadow-xl mx-4 bg-white rounded-3xl z-40;
}

.feature > img {
  @apply filter grayscale contrast-200 transition-all duration-200;
}
.feature:hover img {
  @apply filter-none;
}

.feature > h1 {
  @apply text-accent text-center text-base font-bold mb-3;
}

.feature > p {
  @apply text-center text-gray-700 text-sm;
}

.feature > img {
  @apply w-16 mb-4;
}

.stat {
  @apply bg-transparent flex flex-col justify-start items-center shadow-none;
}

.stat > h1 {
  @apply text-5xl font-bold text-gray-100 mb-2;
}

.stat > h3 {
  @apply text-lg text-gray-200;
}

/* Navbar Styles */
nav {
  @apply w-full  px-16 flex justify-between items-center h-14 shadow-md bg-white fixed top-0 left-0 z-50;
}

.desktop-nav {
  @apply hidden sm:flex;
}

.desktop-nav a.nuxt-link-active {
  @apply text-black font-bold;
}

.mobile-nav {
  @apply sm:hidden  px-5;
}

.sidenav {
  @apply w-2/3 md:hidden py-5 px-6 fixed rounded-lg top-14 right-0 bg-white shadow text-gray-800 z-50 flex flex-col justify-center items-center;
  animation: slidein 0.4s forwards;
}

@keyframes slidein {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
