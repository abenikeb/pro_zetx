<template>
  <div class="w-full bg-white -mt-20">
    <!-- Hero -->
    <section class="relative justify-center mb-16 sm:pl-40 sm:pr-28">
      <div class="flex flex-col lg:flex-row items-center gap-10 mt-20">
        <!-- content-->
        <div class="felx flex-0 flex-col items-center lg:items-start mt-10">
          <div class="hidden sm:inline">
            <h1
              class="
                font-black
                md:text-4
                sm:text-7xl
                text-3xl text-center
                sm:text-left
                mb-0
              "
            >
              Sustainability
            </h1>
            <h1
              class="
                font-black
                md:text-4
                sm:text-7xl
                text-3xl text-center
                sm:text-left
                mb-8
              "
            >
              Pays
            </h1>
            <p
              class="
                font-black
                text-black text-opacity-50 text-center text-lg
                sm:text-left
                lg:text-2xl
              "
            >
              Saving carbon as an
            </p>
            <p
              class="
                font-black
                text-black text-opacity-50 text-center text-lg
                sm:text-left
                lg:text-2xl
                sm:mb-20
              "
            >
              asset class
            </p>
          </div>
          <div class="sm:hidden">
            <h1
              class="
                font-black
                md:text-4
                sm:text-7xl
                text-3xl text-center
                sm:text-left
                mb-0
              "
            >
              Sustainability Pays
            </h1>
            <p
              class="
                font-black
                text-black text-opacity-50 text-center text-lg
                sm:text-left
                lg:text-2xl
              "
            >
              Saving carbon as an asset class
            </p>
          </div>
          <div class="sm:hidden justify-center flex-1 mb-10">
            <img
              class="heroImage object-cover"
              src="~/assets/images/HeroImage.png"
              alt=""
            />
          </div>
          <div class="flex justify-center lg:justify-start flex-wrap gap-6">
            <button
              type="button"
              class="
                button button-green
                hover:bg-white hover:text-accent hover:scale-200
                font-bold
              "
            >
              Book a Demo
            </button>
            <button
              type="button"
              class="
                button button-white
                hover:bg-accent hover:text-white
                font-bold
              "
            >
              Contact Us
            </button>
          </div>
        </div>
        <!--Image-->
        <div
          class="hidden sm:flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0"
        >
          <img
            class="heroImage object-cover"
            src="~/assets/images/HeroImage.png"
            alt=""
          />
        </div>
      </div>
    </section>

    <!--Mission-->
    <section class="relative sm:pl-40 pr-0">
      <div class="sm:felx sm:flex-1 sm:flex-col items-start mt-10">
        <h2
          class="
            font-black
            text-black text-opacity-30 text-3xl
            md:text-4
            lg:text-4xl
            text-center
            lg:text-left
            mb-0
            whitespace-pre-line
          "
        >
          Mission
        </h2>
        <p
          class="
            text-black text-lg
            lg:text-left
            mb-9
            whitespace-pre-line
            text-center
            sm:px-5
            md:px-0
          "
        >
          Green Cheddar is on a mission to provide employees with incentives
          they need to combat climate change at home, at work, and in the
          commuinty.
        </p>
      </div>
    </section>

    <!--video section-->
    <section
      class="
        relative
        bg-black bg-opacity-5
        sm:pl-40 sm:pr-20 sm:pt-20 sm:pb-40
        px-5
        py-20
      "
    >
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <!-- content-->
        <div class="felx flex-1 flex-col items-center lg:items-start mt-10">
          <h2
            class="
              font-black
              text-black text-opacity-30 text-3xl
              md:text-4
              lg:text-3xl
              text-center
              lg:text-left
              mb-6
            "
          >
            What is Green Cheddar?
          </h2>
          <p class="text-black text-center text-lg lg:text-left mb-8">
            Operator of a sustainability app that offers digital currency,
            including crypto, in exchange for long-term behavioral changes.
          </p>
          <p class="text-black text-center text-lg lg:text-left">
            Green Cheddar's software checks and transforms carbon savings and
            emissions reporting into currency, allowing users to trade with one
            another and spend on products, services, and experiences offered by
            company partners and the user community.
          </p>
        </div>
        <div class="aspect-w-16 aspect-h-9 flex justify-center flex-1">
          <!-- <iframe
          src="~assets/images/business/landing_page/business_LP_video.mp4"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> -->
          <div class="box1 flex rounded-lg px-5">
            <video
              width="100%"
              preload="auto"
              autoplay
              loop
              muted="muted"
              volume="0"
            >
              <source
                src="~assets/images/business/landing_page/business_LP_video.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
      <!--video-->
      <!-- <div class="flex flex-1"></div> -->
    </section>

    <!--why now section-->
    <section class="relative sm:pl-40 sm:pr-20 sm:pt-20 px-5 py-20">
      <div class="flex flex-col lg:flex-row items-center gap-6">
        <!-- content-->
        <div class="felx flex-1 flex-col items-center lg:items-start mt-7">
          <h2
            class="
              font-extrabold
              text-black text-opacity-30 text-3xl
              md:text-4
              lg:text-4xl
              text-center
              lg:text-left
              mb-1
            "
          >
            Why Now?
          </h2>
          <h2
            class="
              font-extrabold
              text-black text-opacity-30 text-3xl
              md:text-4
              lg:text-1xl
              text-center
              lg:text-left
              mb-3
            "
          >
            A Thriving Culture of Sustainability
          </h2>
          <div class="sm:hidden justify-center">
            <img
              class="object-cover"
              src="~/assets/images/business/Gaia.png"
              alt=""
            />
          </div>
          <p class="text-black text-center text-lg lg:text-left mb-10">
            More than<span class="font-extrabold"> 56 percent </span>of
            employees believe it is critical for their firm to have a climate
            change strategy in place.
          </p>
          <p class="text-black text-center text-lg lg:text-left">
            <span class="font-extrabold">Gen Z,</span> in particular, is
            extremely concerned about climate change: It is one of their top
            societal worries for<span class="font-extrabold"> 76 percent</span>
            of them, and for<span class="font-extrabold"> 37 percent,</span> it
            is their top concern.
          </p>
        </div>
        <div class="hidden sm:flex why_image justify-center flex-1">
          <img
            class="object-cover"
            src="~/assets/images/business/Gaia.png"
            alt=""
          />
        </div>
      </div>
    </section>

    <!--Service offering section-->
    <section class="w-full justify-evenly items-center">
      <div class="flex flex-col">
        <h1
          class="
            font-extrabold
            mb-6
            text-3xl text-black text-opacity-30
            sm:ml-36
            ml-2
          "
        >
          Service Offering
        </h1>
      </div>
      <div class="sm:ml-36 mx-5">
        <carousel
          :per-page="1"
          :autoplay="true"
          :loop="true"
          :pagination-padding="5"
          :autoplay-timeout="2000"
          :nav="true"
        >
          <!-- slide 1 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  An in-depth look at the collective carbon footprint,
                  accomplishments, and trends among staff.
                </h1>
                <p class="text-black text-left mb-6">
                  Collect anonymous Scope 3 emissions data on your employees
                  using cutting-edge technology. This includes everything from
                  energy use at home to commutes, including business trips.
                </p>
                <p class="text-black text-left mb-10">
                  Free dashboard that visualizes an in-depth analysis of
                  emissions and can spot trends and progress.
                </p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28"
                  src="~/assets/images/business/landing_page/67.png"
                  alt=""
                />
              </div>
            </div>
            <!-- slide 1 -->
          </slide>
          <!-- slide 2 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  Habit Formation Based on Behavioral Economics.
                </h1>
                <p class="text-black text-left mb-6">
                  Employees are incentivized to create long-term impact through
                  Gift Cards, Prize Draws and Crypto Tokens. When behaviors are
                  tracked and rewarded, they can occasionally become habits,
                  resulting in long-term carbon savings.
                </p>
                <p class="text-black text-left mb-10">
                  Employees are rewarded for taking and documenting
                  environmentally responsible acts. Green Cheddar provides a
                  seamless smart meter connection or receipt-based data capture
                  for transportation, food, shopping, and energy usage.
                </p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28"
                  src="~/assets/images/business/landing_page/11.png"
                  alt=""
                />
              </div>
            </div>
          </slide>
          <!-- slide 3 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  Collaboration as a Strategy for Engagement.
                </h1>
                <p class="text-black text-left mb-6">
                  Teams and leaderboards are utilized to promote personal
                  development and wellbeing. This causes Sustainable Behavioral
                  Change
                </p>
                <p class="text-black text-left mb-10"></p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28"
                  src="~/assets/images/business/landing_page/12.png"
                  alt=""
                />
              </div>
            </div>
          </slide>
          <!-- slide 4 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  Continuous Support.
                </h1>
                <p class="text-black text-left mb-6">
                  Our client- focused team is on hand to ensure a smooth launch
                  and continuous interaction.
                </p>
                <p class="text-black text-left mb-10"></p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28"
                  src="~/assets/images/business/landing_page/13.png"
                  alt=""
                />
              </div>
            </div>
          </slide>
          <!-- slide 5 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  Carbon Coins.
                </h1>
                <p class="text-black text-left mb-6">
                  Carbon Coins are a streamlined incentive system that allows
                  users to exchange their Carbon Coin for goods and services or
                  convert them into cryptocurrency.
                </p>
                <p class="text-black text-left mb-10"></p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28 sm:w-2/5 w-5/6"
                  src="~/assets/images/business/landing_page/41.png"
                  alt=""
                />
              </div>
            </div>
          </slide>
          <!-- slide 6 -->
          <slide>
            <div class="sm:flex sm:flex-row">
              <div class="card sm:flex sm:flex-1 sm:flex-col pb-10">
                <h1 class="sm:flex font-extrabold text-black mb-6 text-xl">
                  Community Vending.
                </h1>
                <p class="text-black text-left mb-6">
                  Promote your sustainable products or services for free in
                  exchange for users' carbon coins, or join our affiliate
                  marketing program to increase your sales.
                </p>
                <p class="text-black text-left mb-10"></p>
              </div>
              <div class="sm:flex sm:flex-1 object-contain justify-center">
                <img
                  class="sm:ml-28 sm:w-1/2 w-5/6"
                  src="~/assets/images/business/landing_page/14.png"
                  alt=""
                />
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </section>

    <!--Desktop Our value section-->
    <section class="hidden sm:block realtive pl-40 pr-40 pb-40 pt-40">
      <div class="flex flex-col items-center">
        <h1 class="text-4xl font-black text-black text-opacity-30 pb-8">
          Our Value
        </h1>

        <!--Circular graph clockwise direction-->
        <div class="container_business">
          <!--btn 3-->
          <div class="dummy_circle_green deg-0">
            <button
              id="btn3"
              ref="circle3"
              class="
                ring
                flex
                circle_content_inactive
                rounded-full
                border-2
                self-center
              "
              @click="buttonThreeHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_3.png"
              />
            </button>
          </div>

          <!--btn 4-->
          <div class="dummy_circle_green deg-45">
            <button
              id="btn4"
              ref="circle4"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonFourHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_4.png"
              />
            </button>
          </div>

          <!--btn 5-->
          <div class="dummy_circle_green deg-90">
            <button
              id="btn5"
              ref="circle5"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonFiveHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_5.png"
              />
            </button>
          </div>

          <!--btn 6-->
          <div class="dummy_circle_green deg-135">
            <button
              id="btn6"
              ref="circle6"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonSixHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_6.png"
              />
            </button>
          </div>

          <!--btn 7-->
          <div class="dummy_circle_green deg-180">
            <button
              id="btn7"
              ref="circle7"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonSevenHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_7.png"
              />
            </button>
          </div>

          <!--btn 8-->
          <div class="dummy_circle_green deg-225">
            <button
              id="btn8"
              ref="circle8"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonEightHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_8.png"
              />
            </button>
          </div>

          <!--btn 1-->
          <div class="dummy_circle_green deg-270">
            <button
              id="btn1"
              ref="circle1"
              class="
                ring
                circle_content_active
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonOneHandler"
            >
              <img
                class="object-cover"
                src="~assets/images/business/landing_page/circle_1.png"
              />
            </button>
          </div>

          <!--btn 2-->
          <div class="dummy_circle_green deg-315">
            <button
              id="btn2"
              ref="circle2"
              class="
                ring
                circle_content_inactive
                flex
                rounded-full
                border-2
                self-center
              "
              @click="buttonTwoHandler"
            >
              <img
                class="object-cover w-auto h-auto"
                src="~assets/images/business/landing_page/circle_2.png"
              />
            </button>
          </div>

          <!--Middle center-->
          <div class="flex">
            <!--Middle center-->
            <div
              class="
                circle_row
                border-4 border-accent
                rounded-full
                w-72
                h-72
                justify-center
                px-10
                py-24
              "
            >
              <p class="text-black text-center">
                <span class="font-extrabold">{{ titleChange }}:</span>
                {{ descriptionChange }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Mobile Our Value section-->
    <section class="sm:hidden realtive pb-20 pt-16 px-8 justify-center">
      <div class="ml-4">
        <h1
          class="
            text-2xl
            font-black
            text-black text-opacity-30
            pb-8
            text-center
          "
        >
          Our Value
        </h1>
        <carousel
          :per-page="1"
          :autoplay="true"
          :loop="true"
          :pagination-padding="5"
          :autoplay-timeout="2000"
          :nav="true"
        >
          <!-- slide 1 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_1.png"
                  alt=""
                />
              </div>
              <div class="card flex sm:flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Employees:</span> may address the
                  cost of living issue with sustainable actions which lead to
                  rewards.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 2 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_2.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">HR:</span> Enhanced employee
                  retention and recruitment, as well as overall employee
                  engagement.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 3 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_3.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Marketing:</span> Building a
                  brand around genuine corporate sustainability initiatives.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 4 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_4.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Planet:</span> Be apart of the
                  Net Zero Story.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 5 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_5.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Savings:</span> Sustainable
                  business practices result in measurable financial savings.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 6 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_6.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Costs: </span>
                  Free
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 7 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_7.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Decision Makers:</span> Build a
                  reputation for yourself Now is the time to take action.
                </p>
              </div>
            </div>
          </slide>

          <!-- slide 8 -->
          <slide>
            <div class="flex flex-col justify-center">
              <div
                class="flex flex-1 object-contain justify-center w-7/12 pb-8"
              >
                <img
                  class="ml-28"
                  src="~/assets/images/business/landing_page/circle_8.png"
                  alt=""
                />
              </div>
              <div class="card flex flex-1 flex-col pb-10">
                <p class="text-black text-center">
                  <span class="font-extrabold">Sales:</span> Improved ESG
                  credentials, which are increasingly in demand, can help you
                  attract and retain clients.
                </p>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </section>

    <!--Email subscription-->
    <section
      class="
        flex
        sm:px-48
        px-4
        pb-20
        pt-28
        bg-black bg-opacity-5
        justify-center
      "
    >
      <div
        class="
          flex flex-col
          contact_form
          justify-center
          items-center
          pb-6
          pt-6
          sm:px-20
          px-4
        "
      >
        <div class="flex pb-2">
          <img src="~assets/images/business/landing_page/email_main_icon.svg" />
        </div>

        <div class="flex flex-col items-center">
          <h1 class="sm:text-3xl text-xl font-black text-black mb-0">
            Join GreenCheddar
          </h1>
          <p class="text-black mb-10 text-center">
            Join our subscribers to get the latest news, updates and special
            offers delivered directly in your inbox.
          </p>
        </div>

        <div class="sm:flex sm:flex-row sm:gap-6">
          <label
            class="
              flex flex-row
              bg-gray-200
              rounded-md
              pl-4
              pr-3
              pt-1
              pb-1
              gap-2
            "
          >
            <img src="~assets/images/business/landing_page/email_field.svg" />
            <input
              class="
                w-full
                text-gray-600
                appearance-none
                bg-gray-200
                font-extralight
                focus:outline-none
              "
              type="email"
              placeholder="email@gmail.com"
            />
          </label>
          <button
            class="
              btn-custom
              bg-accent
              rounded-md
              text-white
              sm:mt-0
              mt-5
              pt-2
              pl-4
              pr-4
            "
            type="button"
          >
            Subscribe
          </button>
        </div>
        <!-- <div class="hidden sm:block sm:w-1/6 sm:-mt-2 sm:ml-96 sm:-mr-4">
        <img src="~assets/images/business/landing_page/footprints.png" />
      </div> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  components: {},
  layout: 'business_LP',
  data() {
    return {
      isActive1: true,
      title: 'Employees',
      description:
        'may address the cost of living issue with sustainable actions which lead to rewards.',
    }
  },
  computed: {
    titleChange() {
      return this.title
    },
    descriptionChange() {
      return this.description
    },
  },

  methods: {
    buttonOneHandler() {
      this.title = 'Employees'
      this.description =
        'may address the cost of living issue with sustainable actions which lead to rewards.'

      this.$refs.circle1.classList.remove('circle_content_inactive')
      this.$refs.circle1.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonTwoHandler() {
      this.title = 'HR'
      this.description =
        'Enhanced employee retention and recruitment, as well as overall employee engagement.'

      this.$refs.circle2.classList.remove('circle_content_inactive')
      this.$refs.circle2.classList.add('circle_content_active')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonThreeHandler() {
      this.title = 'Marketing'
      this.description =
        'Building a brand around genuine corporate sustainability initiatives.'

      this.$refs.circle3.classList.remove('circle_content_inactive')
      this.$refs.circle3.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonFourHandler() {
      this.title = 'Planet'
      this.description = 'Be apart of the Net Zero Story.'

      this.$refs.circle4.classList.remove('circle_content_inactive')
      this.$refs.circle4.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonFiveHandler() {
      this.title = 'Savings'
      this.description =
        'Sustainable business practices result in measurable financial savings.'

      this.$refs.circle5.classList.remove('circle_content_inactive')
      this.$refs.circle5.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonSixHandler() {
      this.title = 'Costs'
      this.description = 'Free'

      this.$refs.circle6.classList.remove('circle_content_inactive')
      this.$refs.circle6.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonSevenHandler() {
      this.title = 'Decision Makers'
      this.description =
        'Build a reputation for yourself Now is the time to take action.'

      this.$refs.circle7.classList.remove('circle_content_inactive')
      this.$refs.circle7.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')

      this.$refs.circle8.classList.remove('circle_content_active')
      this.$refs.circle8.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
    buttonEightHandler() {
      this.title = 'Sales'
      this.description =
        'Improved ESG credentials, which are increasingly in demand, can help you attract and retain clients.'
      this.$refs.circle8.classList.remove('circle_content_inactive')
      this.$refs.circle8.classList.add('circle_content_active')

      this.$refs.circle2.classList.remove('circle_content_active')
      this.$refs.circle2.classList.add('circle_content_inactive')

      this.$refs.circle3.classList.remove('circle_content_active')
      this.$refs.circle3.classList.add('circle_content_inactive')

      this.$refs.circle4.classList.remove('circle_content_active')
      this.$refs.circle4.classList.add('circle_content_inactive')

      this.$refs.circle5.classList.remove('circle_content_active')
      this.$refs.circle5.classList.add('circle_content_inactive')

      this.$refs.circle6.classList.remove('circle_content_active')
      this.$refs.circle6.classList.add('circle_content_inactive')

      this.$refs.circle7.classList.remove('circle_content_active')
      this.$refs.circle7.classList.add('circle_content_inactive')

      this.$refs.circle1.classList.remove('circle_content_active')
      this.$refs.circle1.classList.add('circle_content_inactive')
      // console.log(this.isActive)
    },
  },
}
</script>

<style scoped>
.button {
  @apply shadow-md py-3 px-6 rounded-md transition duration-300;
}
.button-green {
  @apply bg-accent text-white;
}
.button-white {
  @apply bg-white text-accent;
}
.heroImage {
  width: 778px;
}
.container_business {
  width: 600px;
  height: 600px;
  border-radius: 51%;
  position: relative;
  margin: 100px;
}
.circle_row {
  margin-top: 150px;
  margin-left: 150px;
  border-color: rgba(0, 150, 64, var(--tw-border-opacity));
}
.circle_col {
  margin-top: -600px;
  margin-left: 235px;
}
.dummy_circle_green {
  position: absolute;
  top: 51%;
  left: 51%;
  margin: -51px;
  margin-left: -70px;
  margin-top: -68px;
  border-radius: 51%;
  line-height: 100px;
}
.circle_content_active {
  width: 120px;
  height: 120px;
  --tw-ring-offset-width: 20px;
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(0, 150, 64, var(--tw-ring-opacity));
}
.circle_content_inactive {
  width: 120px;
  height: 120px;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.deg-0 {
  transform: translate(251px);
}

.deg-45 {
  transform: rotate(46deg) translate(251px) rotate(-46deg);
}

.deg-90 {
  transform: rotate(91deg) translate(251px) rotate(-91deg);
}

.deg-135 {
  transform: rotate(136deg) translate(251px) rotate(-136deg);
}

.deg-180 {
  transform: rotate(181deg) translate(251px) rotate(-181deg);
}

.deg-225 {
  transform: rotate(226deg) translate(251px) rotate(-226deg);
}

.deg-270 {
  transform: rotate(271deg) translate(251px) rotate(-271deg);
}

.deg-315 {
  transform: rotate(316deg) translate(251px) rotate(-316deg);
}
.img_rotate_right {
  transform: rotate(45deg);
}
.img_rotate_left {
  transform: rotate(-45deg);
}
.why_image {
  width: 467px;
  height: 501.885px;
}
.contact_form {
  background-color: white;
  border-radius: 25px;
  width: 750px;
  height: 325px;
  box-shadow: 0 3px 40px rgb(0 0 0 / 0.1);
}
.box1 {
  width: 100%;
  height: auto;
}
.btn-custom {
  margin-left: 30%;
}

@media screen and (min-width: 640px) {
  .btn-custom {
    margin-left: 0%;
  }
}
</style>
