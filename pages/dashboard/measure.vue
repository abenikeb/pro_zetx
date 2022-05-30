<template>
  <div
    class="
      w-full
      flex flex-col
      md:flex-row
      justify-start
      items-start
      px-5
      md:px-0
    "
  >
    <ConfirmPopup
      v-if="showPopup"
      :body="_.sample(facts)"
      :section="measureSection"
      :emission="sectionEmission"
      @finish="finishMeasure"
      @continue="continueMeasure"
    />
    <!-- <h1>{{ sectionEmission }}</h1> -->
    <div class="measure-nav">
      <div
        id="intro"
        :class="{ activeMeasure: measureSection == 'intro' }"
        @click="measureSection = 'intro'"
      >
        <img src="~/assets/images/measure/intro.svg" alt="" />
        <h1 id="intro">Intro</h1>
      </div>
      <div
        id="household"
        :class="{ activeMeasure: measureSection == 'household' }"
        @click="measureSection = 'household'"
      >
        <img src="~/assets/images/house.svg" alt="" />
        <h1 id="household">Household</h1>
      </div>
      <div
        id="shopping"
        :class="{ activeMeasure: measureSection == 'shopping' }"
        @click="measureSection = 'shopping'"
      >
        <img src="~/assets/images/shopping.svg" alt="" />
        <h1>Shopping</h1>
      </div>
      <div
        id="transportation"
        :class="{ activeMeasure: measureSection == 'transportation' }"
        @click="measureSection = 'transportation'"
      >
        <img src="~/assets/images/transportation.svg" alt="" />
        <h1>Transportation</h1>
      </div>
      <div
        id="food"
        :class="{ activeMeasure: measureSection == 'food' }"
        @click="measureSection = 'food'"
      >
        <img src="~/assets/images/food.svg" alt="" />
        <h1 id="food">Food</h1>
      </div>
      <div
        id="finish"
        :class="{ activeMeasure: measureSection == 'finish' }"
        @click="measureSection = 'finish'"
      >
        <img src="~/assets/images/result.svg" alt="" />
        <h1>Finish</h1>
      </div>
      <!-- <div>
        <nuxt-link class="mx-2 font-semibold text-accent-focus" to="/survey"
          >Survey</nuxt-link
        >
      </div> -->
    </div>
    <select
      id="measure-section"
      v-model="measureSection"
      class="w-full p-3 mb-5 md:hidden rounded-2xl shadow-lg border"
      name="measure-section"
    >
      <option class="px-3" value="intro">Intro</option>
      <option class="px-3" value="household">Household</option>
      <option class="px-3" value="shopping">Shopping</option>
      <option class="px-3" value="transportation">Transportation</option>
      <option class="px-3" value="food">Food</option>
      <option class="px-3" value="finish">Finish</option>
    </select>

    <div class="measure-input">
      <div class="flex flex-col gap-y-5 mt-5" v-if="measureSection == 'intro'">
        <h1 class="font-bold">Welcome to Measure Emissions</h1>
        <!-- <h1>You will be able to measure your carbon emissions in two ways:-</h1> -->
        <h1>You will be able to measure your carbon emissions using:-</h1>
        <!-- <h1>Receipt backed & Survey based</h1> -->
        <h1>Receipt backed method</h1>
        <h1 class="font-bold">Receipt backed</h1>
        <h1>
          Learn more about your carbon emissions by uploading a picture of your
          receipt & give us information on what you have been upto we will use
          your data to provide decarbonization advice and logistic services.You
          will recieve rewards for your purchases and receipts.
        </h1>
        <!-- <h1 class="font-bold">Survey based</h1>
        <h1>
          Take a survey and learn more about your carbon emissions. No rewards
          for this data
        </h1> -->
        <div class="flex w-full justify-center items-center gap-x-4 mt-5">
          <button
            @click="measureSection = 'household'"
            class="btn btn-sm border-accent hover:bg-accent hover:text-white"
          >
            Get Started
          </button>
          <!-- <button
            class="btn btn-sm border-accent hover:bg-accent hover:text-white"
          >
            Survey Based
          </button> -->
        </div>
      </div>
      <household
        v-if="measureSection == 'household'"
        @sectionSubmit="showConfirmPopup"
      />
      <shopping
        v-if="measureSection == 'shopping'"
        @sectionSubmit="showConfirmPopup"
      />
      <transportation
        v-if="measureSection == 'transportation'"
        @sectionSubmit="showConfirmPopup"
      />
      <food v-if="measureSection == 'food'" @sectionSubmit="showConfirmPopup" />
      <finish v-if="measureSection == 'finish'" />
    </div>

    <!-- <div class="measure-result">
      <h1 class="mb-2 border-b text-xl text-center">Last Month</h1>
      <div class="w-full flex flex-wrap justify-start items-center">
        <div class="stat w-1/2 mb-2 rounded-2xl">
          <div class="stat-title">Household</div>
          <div class="stat-value text-lg">42 units</div>
        </div>
        <div class="stat w-1/2 mb-2 rounded-2xl">
          <div class="stat-title">Food</div>
          <div class="stat-value text-lg">23 units</div>
        </div>
        <div class="stat w-1/2 mb-2 rounded-2xl">
          <div class="stat-title">Transportation</div>
          <div class="stat-value">11 units</div>
        </div>
        <div class="stat w-1/2 mb-2 rounded-2xl">
          <div class="stat-title">Shopping</div>
          <div class="stat-value text-lg">19 units</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import ConfirmPopup from '~/components/UI/ConfirmPopup'
import transportation from '~/components/measure/transportation.vue'
import finish from '~/components/measure/finish.vue'
import household from '~/components/measure/household.vue'
import food from '~/components/measure/food.vue'
import shopping from '~/components/measure/shopping.vue'

export default Vue.extend({
  components: {
    transportation,
    finish,
    shopping,
    food,
    household,
    ConfirmPopup,
  },
  data() {
    return {
      showPopup: false,
      measureSection: 'intro',
      measureSections: [
        'household',
        'shopping',
        'transportation',
        'food',
        'finish',
      ],
      facts: [
        'Within the next 2 decades, global temperatures are likely to rise 1.5 degrees Celsius',

        'The last 7 years have been the warmest on record',

        'More than 1 million species are at risk of extinction by climate change',

        'Human activity, especially greenhouse gas emissions, is considered the dominant cause of temperature increases',

        'The last decade was the hottest in 125,000 years',

        'The greenhouse effect refers to the way the Earth’s atmosphere traps and absorbs solar energy',

        `By 2060, the cost of inaction on climate change is predicted to reach a staggering $44 trillion, with the highest anticipated GDP losses in the Middle-East, Northern, and Sub-Saharan Africa, and South and Southeast Asia`,

        'We are losing 1.2 trillion tons of ice each year',

        'We lost 302.4 billion work hours to excessive heat in 2019',

        'Hurricanes, droughts and coral deaths are a few of the natural disasters caused due to climate change',

        'More than 1 million species are at risk of extinction by climate change',

        'Due to the greenhouse effect, the average temperature of the earth is 15 degrees rather than -18 degrees without the greenhouse effect',

        'Carbon dioxide constitutes only 3.6 % of total greenhouse gases, out of which 0.12% is attributed to human activities',

        'Carbon dioxide is not the only contributing gas to climate change. Other gases like methane and nitrous oxide are far more dangerous than carbon dioxide alone.',

        'According to the World Food Program (WPF.org), by 2015, the number of people affected by climate change disasters could reach 375 million per year',

        'Nature is an untapped solution for climate change. Restore nature.',

        `According to a recent report by Oxfam, climate change could push food prices by 50-60 percent more by 2030.`,

        `Since 1969, the oceans have absorbed much of this increased heat, with the top 700 meters (about 2,300 feet) of ocean showing warming of more than 0.4 degrees Fahrenheit`,

        `Global sea level rose about 8 inches in the last century. However, the rate in the last two decades is nearly double that of the last century.`,

        'The average number of people exposed to heatwaves has increased by approximately 125 million since the beginning of the century.',

        'Community-led nonprofits working to fight climate change are underfunded.',

        `While instances of wildfires have decreased over the years, according to the WMO, the burn area and intensity of fires have increased.`,

        `Australia recently battled its largest bushfire on record, while parts of the Arctic, the Amazon and central Asia have also experienced unusually severe blazes`,

        `Over the next 20 years, global warming is expected to increase by 0.2 degrees per decade.`,

        `The concentration of carbon dioxide (CO2) in our atmosphere, as of May 2020, is 416 parts per million, the highest it has been in human history.`,

        `Depending upon the carbon emissions, a rise in temperature from 1.1 degrees up to 6.4 degrees is expected by the end of this century.`,

        `Promoting green transportation and carpooling can help to reduce carbon emissions and improve public health`,

        `The IPCC SR15 report found that limiting warming to 1.5°C above pre-industrial implies reaching net zero CO2 emissions globally around 2050.`,

        `Steps to reduce greenhouse gases can help save the negative health impacts. `,

        `Promoting safe public transportation and active activities like walking or use public transport can help reduce carbon emissions`,

        `Climate change is rapidly causing coastal flooding and displacement of people. Floods further cause major damages by injuring and killing people.`,

        `In 2003, around 70,000 deaths occurred in Europe alone due to diseases caused by rising temperatures.`,
      ],
    }
  },

  computed: {
    sectionEmission() {
      const sectionEmission =
        this.measureSection == 'household'
          ? this.$store.state.measure.householdData
          : this.measureSection == 'shopping'
          ? this.$store.state.measure.shoppingData
          : this.measureSection == 'transportation'
          ? this.$store.state.measure.transportationData
          : this.$store.state.measure.foodData

      if (!sectionEmission.length) return 0
      // sum by key
      return _.sumBy(sectionEmission, 'finalEmissions.total')
    },
  },

  created() {
    console.log(new Date().getFullYear() + '-' + (new Date().getMonth() + 1))
  },

  methods: {
    showConfirmPopup() {
      this.showPopup = true
    },

    hideConfirmPopup() {
      this.showPopup = false
    },

    continueMeasure() {
      // pick a random fact

      // if (finish) {
      //   this.measureSection = 'finish'
      //   return
      // }
      const cur = _.findIndex(
        this.measureSections,
        (e) => e === this.measureSection
      )

      this.measureSection =
        cur === this.measureSections.length - 1
          ? this.measureSections[0]
          : this.measureSections[cur + 1]
      this.hideConfirmPopup()
      if (process.client) {
        const el = document.getElementById('measure-section')
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },

    finishMeasure() {
      this.measureSection = 'finish'
      this.hideConfirmPopup()
    },
  },
})
</script>

<style scoped>
.measure-nav {
  @apply flex flex-col justify-start items-start w-full md:w-1/5 bg-white shadow-md rounded-md border hidden md:flex;
}

.measure-nav > div {
  @apply flex justify-start items-center px-5 py-3 text-gray-600 hover:text-black cursor-pointer border-b w-full hover:bg-accent hover:bg-opacity-20 text-sm;
}

.measure-nav img {
  @apply w-6 mr-3;
}

.measure-input {
  @apply w-full md:w-3/5 flex flex-col justify-start items-start md:px-12;
}

.measure-result {
  @apply w-1/3 flex-col justify-start items-start text-center hidden md:flex;
}
.measure-result * {
  @apply border-none;
}

.activeMeasure {
  @apply bg-accent bg-opacity-40 text-black font-semibold;
}
</style>
