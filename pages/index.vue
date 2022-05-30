<template>
  <div
    class="w-full mt-auto"
    style="background-image: linear-gradient(to bottom, #2a9156, #2f784b)"
  >
    <!-- CTA -->

    <!-- intro image -->
    <section
      class="relative text-center flex flex-col justify-start items-center pt-5"
    >
      <div class="text-white top-center">
        <h1 class="text-2xl md:text-5xl font-bold">Sustainablilty Pays</h1>
        <h1 class="text-lg">Saving carbon as an asset class</h1>
      </div>
      <img
        class="md:w-1/4"
        src="~/assets/images/landing/go_green.png"
        alt="go_green"
      />

      <!-- into details -->

      <div
        class="text-white top-center flex flex-col justify-start items-center rounded-3xl md:px-20 md:pb-12 md:mx-20"
      >
        <h1 class="text-base md:text-xl">
          GreenCheddar is a free Sustainablilty app that converts your carbon
          emissions savings from your smart meter or purchasing habbits into
          digital currency that you can use to buy cool stuff, gift cards and
          cryptocurrency.
        </h1>

        <nuxt-link
          class="mt-5 btn md:btn-md btn-md border-transparent bg-green-800"
          to="/signup"
          >Get started</nuxt-link
        >
      </div>
    </section>

    <!-- Why? section -->
    <section
      class="row-layout w-full md:flex justify-evenly items-center md:mt-10 mt-20 mb-10"
    >
      <div class="md:mx-24 mx-5 text-left">
        <h1 class="text-white text-3xl font-bold md:mb-6 mb-3">Why?</h1>
        <img
          class="md:ml-32 mx-auto md:hidden"
          src="~/assets/images/landing/Gaia.png"
          alt=""
        />
        <p class="text-white text-lg md:font-bold md:mr-24">
          Why? Because you benefit society by disclosing your carbon emissions.
          You are an earthling deserving of recognition. You are helping to save
          the earth and billions of dollars in damages. Your actions have value,
          and you are entitled to a lion's share to it.
        </p>
      </div>
      <img
        class="md:ml-32 mx-auto hidden md:inline"
        src="~/assets/images/landing/Gaia.png"
        alt=""
      />
    </section>

    <!-- Got Data Cards -->
    <h1 class="text-white text-3xl font-bold md:pb-24 text-center">
      Got Data?
    </h1>
    <section
      class="w-full flex flex-wrap justify-center items-base mt-24 mb-10"
    >
      <div class="feature glassmorphic">
        <img src="~/assets/images/landing/2-01.png" alt="" />
        <h1>Exchange</h1>
        <p>
          Report your carbon emission by actively uploading reciepts or
          passively connecting your smart meter.
        </p>
      </div>

      <div class="feature glassmorphic md:mt-0 mt-10">
        <img src="~/assets/images/landing/cc-01.png" alt="" />
        <h1>Earn</h1>
        <p>
          Recieve digital currency for carbon reporting and carbon emissions
          saving.
        </p>
      </div>

      <div class="feature glassmorphic">
        <img
          src="~/assets/images/landing/shop-cc-01.png"
          alt=""
          class="absolute -top-10"
        />
        <h1>Expend</h1>
        <p>Reap your rewards by trading your coins for goods and services.</p>
      </div>

      <div class="feature glassmorphic">
        <img src="~/assets/images/landing/Prizes-01.png" alt="" />
        <h1>WIN Prizes</h1>
        <p>
          Stand out, be part of giveaways and win the best prizes competing with
          Friends, Family and Colleagues.
        </p>
      </div>

      <div class="feature glassmorphic">
        <img src="~/assets/images/landing/Group6.png" alt="" />
        <h1>Empower</h1>
        <p>
          Recognition of your data ownership and privacy. Visualise the value of
          your data with your very own virtual garden.
        </p>
      </div>
    </section>

    <!-- CC -->
    <h1 class="text-white text-3xl font-bold mb-6 text-center">
      Carbon Coins, What's it worth?
    </h1>
    <section
      class="row-layout w-full md:flex justify-evenly items-center my-10"
    >
      <img
        class="mx-auto md:hidden"
        src="~/assets/images/landing/Group1.png"
        alt=""
      />
      <div class="md:ml-36 mx-10 md:w-2/5">
        <carousel
          :per-page="1"
          :autoplay="true"
          :loop="true"
          :pagination-padding="5"
          :autoplay-timeout="2000"
          :nav="true"
        >
          <slide>
            <div class="container">
              <h1
                class="text-white md:text-3xl text-xl font-bold md:mb-6 text-left"
              >
                Partners
              </h1>
              <p class="text-white md:text-lg text-base font-bold text-left">
                Why? Because you benefit society by disclosing your carbon
                emissions. You are an earthling deserving of recognition. You
                are helping to save the earth and billions of dollars in
                damages. Your actions have value, and you are entitled to a
                lion's share to it.
              </p>
            </div>
          </slide>
          <slide>
            <div class="container">
              <h1
                class="text-white md:text-3xl text-xl font-bold md:mb-6 text-left"
              >
                Banks
              </h1>
              <p class="text-white md:text-lg text-base font-bold text-left">
                Banks can utilize GreenCheddar to deliver green financing. We
                are the first in the market to offer a credit score based on
                emissions.
              </p>
            </div>
          </slide>
          <slide>
            <div class="container">
              <h1
                class="text-white md:text-3xl text-xl font-bold md:mb-6 text-left"
              >
                Local Authorities
              </h1>
              <p class="text-white md:text-lg text-base font-bold text-left">
                By using GreenCheddar as a behavior change tool, consumers can
                be more sustainable, which has the capacity to boost
                environmental protection.
              </p>
            </div>
          </slide>
          <slide>
            <div class="container">
              <h1
                class="text-white md:text-3xl text-xl font-bold md:mb-6 text-left"
              >
                Employers
              </h1>
              <p class="text-white md:text-lg text-base font-bold text-left">
                Employee engagement, Employers can use GreenCheddar to recognize
                and reward employee's who report their carbon and achieve carbon
                emission savings.
              </p>
            </div>
          </slide>
          <slide>
            <div class="container">
              <h1
                class="text-white md:text-3xl text-xl font-bold md:mb-6 text-left"
              >
                Customer Loyalty Programme
              </h1>
              <p class="text-white md:text-lg text-base font-bold text-left">
                Use GreenCheddar to reward your repeat customers for any
                contribution they are making towards saving CO2.
              </p>
            </div>
          </slide>
        </carousel>
      </div>

      <img
        class="mx-auto hidden md:inline"
        src="~/assets/images/landing/Group1.png"
        alt=""
      />
    </section>

    <!-- NFT -->
    <section
      class="row-layout w-full md:flex justify-evenly items-center my-14"
    >
      <img
        src="~/assets/images/landing/Elk126.png"
        alt=""
        class="md:ml-36 mx-auto"
      />
      <div class="md:mx-24 mx-3 md:text-right text-center">
        <h1 class="text-white text-3xl font-bold mb-6">What is an NFT?</h1>
        <p class="text-white text-base font-bold">
          NFT's stands for Non Fungible Tokens and its a way of owning data.
          GreenCheddar is empowering you to own your data. Owning this NFT will
          grant you exclusive membership perks. When you convert carbon coins
          into crypto tokens ypu will be exempt from paying commission fees.
        </p>
        <nuxt-link
          class="mt-5 btn md:btn-md btn-md border-transparent bg-green-800 text-white"
          to="/signup"
          >View on Opensea</nuxt-link
        >
      </div>
    </section>

    <!-- Contact us -->
    <section
      class="w-full md:flex md:flex-wrap justify-center items-base md:mt-52 mt-36 mb-10"
    >
      <div class="contact-us md:w-2/6 h-44 text-left md:ml-0 ml-">
        <h1
          style="top: -50px"
          class="absolute font-bold md:text-2xl text-lg text-white md:ml-40 ml-28 text-center"
        >
          Get in touch
        </h1>
        <img
          class="absolute z-50 top-6 md:w-32 w-28 mb-4 md:-left-12 md:pl-0 pl-1"
          src="~/assets/images/landing/487.png"
          alt=""
        />
        <div class="md:pt-0 pt-2 md:ml-0 pl-24">
          <h1
            class="text-black md:text-xl text-base font-bold mt-10 md:ml-24 md:text-left text-right md:mr-0 pr-5"
          >
            Michael
          </h1>
          <p
            class="md:text-base text-sm font-bold text-green-400 md:ml-24 md:text-left text-right md:mr-0 pr-5"
          >
            michael.testa@zeraftech.com
          </p>
          <p
            class="md:text-base text-sm text-green-700 italic font-light md:ml-24 md:text-left text-right md:mr-0 pr-5"
          >
            London, United Kingdom
          </p>
        </div>
      </div>

      <div
        class="contact-us md:flex items-center md:w-2/5 text-center md:px-10 px-3 pb-6"
      >
        <img
          class="w-12 pt-4 mx-auto"
          src="~/assets/images/landing/group_86.svg"
          alt=""
        />
        <h1 class="text-black text-xl font-bold mt-4 uppercase">Subscribe</h1>
        <p>
          Join our subscribers list to get the latest news, updates and special
          offers delivered directly into your inbox.
        </p>
        <div
          class="md:flex md:flex-col justify-center items-center w-full my-5"
        >
          <div class="w-full md:flex justify-center items-center px-12">
            <input
              class="input-md md:w-3/4 mb-5 md:mb-0 bg-gray-200 text-md placeholder-green-500"
              placeholder="example@gmail.com"
              type="text"
            />
            <button
              style="background-color: #2a9156"
              class="btn ml-2 btn-md text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'

export default Vue.extend({
  // async created() {
  //   await this.$fire.auth.signOut()
  // },
  components: {
    Carousel,
    Slide,
  },
  middleware: 'guest',
})
</script>

<style scoped>
.row-layout > img {
  @apply w-48 md:w-96 md:mr-10 md:py-0 py-7 contrast-200 transition-all duration-200;
}

.glassmorphic {
  @apply bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50;
}

.feature {
  @apply relative pt-20 flex flex-col justify-start items-center w-full md:w-1/4 mb-24 p-4 mx-4 rounded-3xl z-30;
}

.feature > img {
  @apply absolute bottom-32 w-32 z-50;
}

.feature > h1 {
  @apply text-center text-white text-base font-bold mb-3;
}

.feature > p {
  @apply text-center text-white text-sm;
}

.stat {
  @apply bg-transparent flex md:flex-col justify-start items-center shadow-none;
}

.stat > h1 {
  @apply text-lg md:text-3xl font-bold text-gray-100 mb-2 truncate;
}

.stat > h3 {
  @apply md:text-base text-xs text-gray-200 truncate;
}

.contact-us {
  @apply relative md:flex-col mb-8 md:mx-10 mx-3 bg-white rounded-3xl;
}

.contact-us > h1,
p {
  @apply mb-2;
}
</style>
