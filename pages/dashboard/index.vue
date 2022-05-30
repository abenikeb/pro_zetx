<template>
  <div>
    <div
      v-if="emissionValues.length !== 0"
      class="
        btn-group
        h-14
        lg:ml-32
        flex-row
        w-56
        md:w-1/2
        gap-x-3
        justify-start
        items-center
        md:flex
      "
    >
      <!-- Graph section -->
      <button
        :class="{ active: activeSection == 'household' }"
        @click="
          toggleItem(4)
          activeSection = 'household'
        "
      >
        Household
      </button>
      <button
        :class="{ active: activeSection == 'shopping' }"
        @click="
          toggleItem(1)
          activeSection = 'shopping'
        "
      >
        Shopping
      </button>
      <button
        :class="{ active: activeSection == 'transportation' }"
        @click="
          toggleItem(3)
          activeSection = 'transportation'
        "
      >
        Transportation
      </button>
      <button
        :class="{ active: activeSection == 'food' }"
        @click="
          toggleItem(2)
          activeSection = 'food'
        "
      >
        Food
      </button>
    </div>
    <div
      class="w-3/4 p-3 mb-5 ml-4 md:hidden rounded-2xl shadow-lg border text-sm"
    >
      <option
        :class="{ active: activeSection == 'household' }"
        @click="
          toggleItem(4)
          activeSection = 'household'
        "
      >
        Household
      </option>
      <option
        :class="{ active: activeSection == 'shopping' }"
        @click="
          toggleItem(1)
          activeSection = 'shopping'
        "
      >
        Shopping
      </option>
      <option
        :class="{ active: activeSection == 'transportation' }"
        @click="
          toggleItem(3)
          activeSection = 'transportation'
        "
      >
        Transportation
      </option>
      <option
        :class="{ active: activeSection == 'food' }"
        @click="
          toggleItem(2)
          activeSection = 'food'
        "
      >
        Food
      </option>
    </div>

    <div
      v-if="foodT > 0 || shoppingT > 0 || transportationT > 0 || householdT > 0"
      class="sideD lg:w-80 lg:h-96 float-right"
    >
      <aside
        class="aside lg:h-96 md:h-96 bg-white mb-3 shadow-2xl rounded-2xl px-4"
      >
        <div class="flex flex-col pt-3 items-center justify-center">
          <h1 class="font-bold">Total Emission</h1>
          <div class="chart lg:w-52">
            <PieChart :chart-data="chartData" :options="options"></PieChart>
          </div>
          <div class="slide">
            <carousel
              :per-page="1"
              :navigation-enabled="true"
              :pagination-enabled="false"
              :navigation-click-target-size="1"
              class="text-center lg:mt-8 md:mt-8 sm:mt-4 carou"
            >
              <slide class="flex justify-around">
                <div>
                  <p class="font-bold lg:text-xl md:text-xl sm:text-lg">
                    {{ foodT }}%
                  </p>
                  <p class="font-bold">Food</p>
                  <div class="flex justify-center">
                    <p
                      class="w-3 h-3 rounded-md"
                      style="background-color: rgba(255, 99, 132, 1)"
                    ></p>
                  </div>
                </div>
                <div>
                  <p class="font-bold lg:text-xl md:text-xl sm:text-lg">
                    {{ transportationT }}%
                  </p>
                  <p class="font-bold">Transportation</p>
                  <div class="flex justify-center">
                    <p
                      class="w-3 h-3 rounded-md"
                      style="background-color: rgba(54, 162, 235, 1)"
                    ></p>
                  </div>
                </div>
              </slide>
              <slide class="flex justify-around">
                <div>
                  <p class="font-bold lg:text-xl md:text-xl sm:text-lg">
                    {{ shoppingT }}%
                  </p>
                  <p class="font-bold">Shopping</p>
                  <div class="flex justify-center">
                    <p
                      class="w-3 h-3 rounded-md"
                      style="background-color: rgba(255, 206, 86, 1)"
                    ></p>
                  </div>
                </div>
                <div>
                  <p class="font-bold lg:text-xl md:text-xl sm:text-lg">
                    {{ householdT }}%
                  </p>
                  <p class="font-bold">Household</p>
                  <div class="flex justify-center">
                    <p
                      class="w-3 h-3 rounded-md"
                      style="background-color: rgba(75, 192, 192, 1)"
                    ></p>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </aside>
    </div>
    <div
      v-if="emissionValues.length == 0"
      class="justify-center items-start mt-10"
    >
      <p class="text-center font-bold">No Data is submitted</p>
      <p class="text-center">
        Looks like you haven't submitted any emissions yet
      </p>
      <nuxt-link
        class="flex items-center justify-center"
        to="/dashboard/measure"
      >
        <div
          class="
            square
            flex
            items-center
            justify-center
            rounded-lg
            bg-green-600
            w-50
            mt-5
            px-2
            py-2
          "
        >
          <p class="font-bold text-white">Measure Now</p>
        </div>
      </nuxt-link>
    </div>
    <div
      class="
        bar-chart
        pb-5
        lg:ml-32
        w-full
        md:w-1/2
        flex
        justify-start
        items-center
        overflow-x-auto
      "
    >
      <BarChart
        v-if="emissionValues.length !== 0"
        :chart-data="barChartDataFinal"
        :options="barChartOptions"
      />
    </div>

    <div
      v-if="
        householdEmissionValues[currentDate] != 0 ||
        foodEmissionValues[currentDate] != 0 ||
        transportationEmissionValues[currentDate] != 0 ||
        shoppingEmissionValues[currentDate] != 0
      "
      class="mb-4 w-full overflow-x-auto scrollbar"
    >
      <div class="flex items-center">
        <h1 id="about" class="font-bold py-5">Equivalent Representation</h1>
        <div class="tooltip ml-3">
          <img class="h-6" src="~assets/images/hint.svg" alt="" />
          <div class="tooltiptext">
            <div class="leftColumn">
              <p class="ml-3 items-end">1</p>
              <p class="ml-3 mt-3 items-end">1</p>
              <p class="ml-3 mt-3 items-end">1</p>
              <p class="ml-3 mt-3 items-end">1</p>
              <p class="ml-3 mt-3">%</p>
            </div>
            <div class="middleColumn">
              <!-- <img
                class="ml-6 h-6 items-start"
                src="~assets/images/car.svg"
                alt=""
              /> -->
              <img
                class="ml-6 mt-3 h-6 items-start"
                src="~assets/images/Bulb.svg"
                alt=""
              />
              <img
                class="ml-6 mt-3 h-6 items-start"
                src="~assets/images/Bottle.svg"
                alt=""
              />
              <img
                class="ml-6 mt-3 h-6 items-start"
                src="~assets/images/meatW.svg"
                alt=""
              />
            </div>
            <div class="rightColumn">
              <p class="items-start flex pl-6">
                <span class="pl-2">&#61;</span>
                <span class="pl-2">{{ 40 }}</span>
                <span class="pl-2">Kilometer</span>
              </p>
              <p class="items-start mt-3 flex pl-6">
                <span class="pl-2">&#61;</span>
                <span class="pl-2">{{ 60 }}</span>
                <span class="pl-2">Watt</span>
              </p>
              <p class="items-start mt-3 flex pl-6">
                <span class="pl-2">&#61;</span>
                <span class="pl-2">{{ 12 }}</span>
                <span class="pl-2">Liter</span>
              </p>
              <p class="items-start mt-3 flex pl-6">
                <span class="pl-2">&#61;</span>
                <span class="pl-2">{{ 217 }}</span>
                <span class="pl-2">Kilojoule</span>
              </p>
              <p class="items-start mt-3 flex pl-3">
                is your position relative to your peers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="columnL">
          <div class="mt-5 md:mt-5 sm:mt-1">
            <p class="font-bold">Household</p>
            <p class="text-sm">
              {{
                (
                  (householdEmissionValues[currentDate] /
                    housholdEmissionAverage) *
                  50
                ).toFixed()
              }}%<span
                v-if="
                  (
                    (householdEmissionValues[currentDate] /
                      housholdEmissionAverage) *
                    50
                  ).toFixed() > 50
                "
                >(Above average)</span
              >
              <span
                v-if="
                  (
                    (householdEmissionValues[currentDate] /
                      housholdEmissionAverage) *
                    50
                  ).toFixed() < 50
                "
                >(Below average)</span
              >
              <br />
              <span>&#8773;</span>
              <span
                >{{
                  (
                    (((householdEmissionValues[currentDate] /
                      housholdEmissionAverage) *
                      50 *
                      18) /
                      100) *
                    60
                  ).toFixed()
                }}
                W</span
              >
            </p>
          </div>
          <div class="mt-5 md:mt-5 sm:mt-1">
            <p class="font-bold">Shopping</p>
            <p class="text-sm">
              {{
                (
                  (shoppingEmissionValues[currentDate] /
                    shoppingEmissionAverage) *
                  50
                ).toFixed()
              }}%<span
                v-if="
                  (
                    (shoppingEmissionValues[currentDate] /
                      shoppingEmissionAverage) *
                    50
                  ).toFixed() > 50
                "
                >(Above average)</span
              >
              <span
                v-show="
                  (
                    (shoppingEmissionValues[currentDate] /
                      shoppingEmissionAverage) *
                    50
                  ).toFixed() < 50
                "
                >(Below average)</span
              >
              <br />
              <span>&#8773;</span>
              <span
                >{{
                  (
                    (((shoppingEmissionValues[currentDate] /
                      shoppingEmissionAverage) *
                      50 *
                      18) /
                      100) *
                    12
                  ).toFixed()
                }}
                l</span
              >
            </p>
          </div>
          <div class="mt-5 md:mt-5 sm:mt-1">
            <p class="font-bold">Food</p>
            <p class="text-sm">
              {{
                (
                  (foodEmissionValues[currentDate] / foodEmissionAverage) *
                  50
                ).toFixed()
              }}%<span
                v-if="
                  (
                    (foodEmissionValues[currentDate] / foodEmissionAverage) *
                    50
                  ).toFixed() > 50
                "
                >(Above average)</span
              >
              <span
                v-if="
                  (
                    (foodEmissionValues[currentDate] / foodEmissionAverage) *
                    50
                  ).toFixed() < 50
                "
                >(Below average)</span
              >
              <br />
              <span>&#8773;</span>
              <span
                >{{
                  (
                    (((foodEmissionValues[currentDate] / foodEmissionAverage) *
                      50 *
                      18) /
                      100) *
                    217
                  ).toFixed()
                }}
                kj</span
              >
            </p>
          </div>
          <div class="mt-5 md:mt-5 sm:mt-1">
            <p class="font-bold">Transportation</p>
            <p class="text-sm">
              {{
                (
                  (transportationEmissionValues[currentDate] /
                    transportationEmissionAverage) *
                  50
                ).toFixed()
              }}%<span
                v-if="
                  (
                    (transportationEmissionValues[currentDate] /
                      transportationEmissionAverage) *
                    50
                  ).toFixed() > 50
                "
                >(Above average)</span
              >
              <span
                v-if="
                  (
                    (transportationEmissionValues[currentDate] /
                      transportationEmissionAverage) *
                    50
                  ).toFixed() < 50
                "
                >(Below average)</span
              >
              <br />
              <span>&#8773;</span>
              <span
                >{{
                  (
                    (((transportationEmissionValues[currentDate] /
                      transportationEmissionAverage) *
                      50 *
                      16) /
                      100) *
                    40
                  ).toFixed()
                }}
                km</span
              >
            </p>
          </div>
        </div>
        <div class="columnR">
          <div class="datas">
            <img class="icons" src="~assets/images/powerSub.svg" alt="" />
            <progress
              class="progress mt-2"
              :value="
                (
                  (householdEmissionValues[currentDate] /
                    housholdEmissionAverage) *
                  50
                ).toFixed()
              "
              max="100"
            ></progress>
          </div>
          <div class="datas">
            <img class="icons" src="~assets/images/bottleSub.svg" alt="" />
            <progress
              class="progress mt-2"
              :value="
                (
                  (shoppingEmissionValues[currentDate] /
                    shoppingEmissionAverage) *
                  50
                ).toFixed()
              "
              max="100"
            ></progress>
          </div>
          <div class="datas">
            <img class="icons" src="~assets/images/meat.svg" alt="" />
            <progress
              class="progress mt-2"
              :value="
                (
                  (foodEmissionValues[currentDate] / foodEmissionAverage) *
                  50
                ).toFixed()
              "
              max="100"
            ></progress>
          </div>
          <div class="datas">
            <img class="icons" src="~assets/images/carSub.svg" alt="" />
            <progress
              class="progress mt-2"
              :value="
                (
                  (transportationEmissionValues[currentDate] /
                    transportationEmissionAverage) *
                  50
                ).toFixed()
              "
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
    <!-- rank section -->
    <div
      class="
        bottom
        w-full
        mt-10
        md:mx-0
        flex flex-col
        justify-evenly
        md:items-start md:py-5
        py-5
        <<<<<<<
        HEAD
        =======
        px-5
        >>>>>>>
        c0534dff215f6df88c0813ed596365f68270116e
      "
    >
      <h1
        class="
          md:text-start
          text-xl
          font-semibold
          mb-5
          pb-2
          text-gray-500
          border-b
          w-full
          ml-2.5
          md:ml-0
        "
      >
        Your Rank
      </h1>
      <div class="flex flex-row w-full gap-x-3 ml-10 md:ml-0 flex-wrap">
        <div
          class="
            flex flex-col
            w-1/2
            md:w-1/3
            justify-start
            items-start
            mb-4
            ml-2.5
            pb-4
          "
        >
          <h1 class="text-gray-500 text-ms">
            <i class="fa fa-globe text-secondary"></i> International
          </h1>

          <div class="flex flex-col items-start">
            <h1 v-if="internationalRank !== 0">
              Rank: <span class="text-2xl ml-2"> #{{ internationalRank }}</span>
            </h1>

            <span
              v-else-if="!internationalRank && fetchingData"
              class="text-lg font-bold"
            >
              ...
            </span>

            <span v-else class="text-xs text-red-400">
              You don't have a rank yet. Report your emissions to get started
            </span>

            <nuxt-link
              to="/leaderboard/international"
              class="btn btn-xs btn-accent self-start mt-2"
              >View All</nuxt-link
            >
          </div>
        </div>

        <div
          class="
            rank
            flex flex-col
            w-1/2
            md:w-1/3
            justify-start
            items-start
            mb-8
            ml-2.5
            pb-4
          "
        >
          <h1 class="text-gray-500 text-ms">
            <i class="fa fa-flag text-accent"></i> Domestic
            <span class="text-2xs text-gray-700">({{ location }})</span>
          </h1>

          <div class="flex flex-col items-start">
            <h1 v-if="domesticRank !== 0">
              Rank: <span class="text-2xl ml-auto"> #{{ domesticRank }}</span>
            </h1>

            <span
              v-else-if="!domesticRank && fetchingData"
              class="text-lg font-bold"
            >
              ...
            </span>

            <span v-else class="text-xs text-red-400">
              You don't have a rank yet. Report your emissions to get started
            </span>

            <nuxt-link
              to="/leaderboard/domestic"
              class="btn btn-xs btn-accent self-start mt-2"
              >View All</nuxt-link
            >
          </div>
        </div>

        <div
          class="
            flex flex-col
            justify-start
            items-between
            mb-8
            md:ml-3
            w-1/2
            md:w-1/4
            ml-2.5
          "
        >
          <h1 class="text-gray-500 text-ms">
            <i class="fa fa-lock text-red-700"></i> Private
          </h1>

          <h1 class="text-gray-500 text-sm">
            You have not joined any private leaderboards yet
          </h1>

          <div class="flex flex-col items-start">
            <span class="text-xs text-red-400"
              >You don't have a rank for this month yet</span
            >
            <nuxt-link
              to="/leaderboard/private"
              class="btn btn-xs btn-accent mt-2"
              >View All</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    Carousel,
    Slide,
  },
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      isActive: true,
      totalEmission: 0,
      activeSection: 'household',
      currentDate: 0,
      showFoodTable: false,
      initial: true,
      foodT: 0,
      tableData: [],
      shoppingT: 0,
      transportationT: 0,
      householdT: 0,
      foodEmission: [],
      foodEmissionAverage: 0,
      shoppingEmissionAverage: 0,
      housholdEmissionAverage: 0,
      transportationEmissionAverage: 0,
      shoppingEmission: [],
      householdEmission: [],
      transportationEmission: [],
      shoppingEmissionValues: [],
      foodEmissionValues: [],
      transportationEmissionValues: [],
      householdEmissionValues: [],
      measuredOn: '',
      userData: {},
      chartData: {},
      options: {},
      showModal: false,
      carbonCredit: '',
      rawData: [],
      internationalData: [],
      domesticData: [],
      fetchingData: true,
      emissionValues: [],
      showDropdown: false,
      showInstructionDropdown: false,
      showHowToDropdown: false,
      showScoreDropdown: false,
      showDataDropdown: false,
      showSustainableDropdown: false,
      showOffsetDropdown: false,
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 24,
          fontColor: '#6b7280',
        },
        tooltips: {
          backgroundColor: '#17BF62',
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                fontStyle: 'bold',
                labelString: 'Months',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                fontStyle: 'bold',
                labelString: 'Carbon Emission Amount',
              },
            },
          ],
        },
      },
    }
  },

  computed: {
    internationalRank() {
      return (
        _.findIndex(
          this.internationalData,
          (o) => o.data.uid === this.$store.state.auth.authUser.uid
        ) + 1
      )
    },

    domesticRank() {
      return (
        _.findIndex(
          this.domesticData,
          (o) => o.data.uid === this.$store.state.auth.authUser.uid
        ) + 1
      )
    },

    location() {
      return this.$store.state.auth.userData.location
    },

    barChartDataFinal() {
      let barChartDataFinal = {}
      barChartDataFinal = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Total Emission Amount',
            data: this.emissionValues,
            backgroundColor: 'rgb(0, 145, 104)',
            borderColor: 'gray',
          },
        ],
      }
      return barChartDataFinal
    },
  },
  async mounted() {
    let totalFoodEmission = 0
    let totalShoppingEmission = 0
    let totalTransportationEmission = 0
    let totalHouseholdEmission = 0
    let FoodEmission = 0
    let ShoppingEmission = 0
    let TransportationEmission = 0
    let HouseholdEmission = 0
    const emissionsRef = this.$fire.firestore.collection('emissionsData')
    let januaryEmission = 0
    let februaryEmission = 0
    let marchEmission = 0
    let aprilEmission = 0
    let mayEmission = 0
    let juneEmission = 0
    let julyEmission = 0
    let augustEmission = 0
    let septemberEmission = 0
    let octoberEmission = 0
    let novemberEmission = 0
    let decemberEmission = 0
    let foodEmissionTotal = 0
    let householdEmissionTotal = 0
    let shoppingEmissionTotal = 0
    let transportationEmissionTotal = 0

    const usersData = await emissionsRef
      .where('month', '==', new Date().getMonth() + 1)
      .where('year', '==', new Date().getFullYear())
      .get()
    if (!usersData.empty) {
      const documents = usersData.docs
      const documentsLength = documents.length
      for (let i = 0; i < documents.length; i++) {
        if (documents[i].data().food.length > 0) {
          if ('finalEmissions' in documents[i].data().food[0]) {
            foodEmissionTotal += isNaN(
              documents[i].data().food[0].finalEmissions.total
            )
              ? 0
              : documents[i].data().food[0].finalEmissions.total
          }
        }
        if (documents[i].data().shopping.length > 0) {
          if ('finalEmissions' in documents[i].data().shopping[0]) {
            shoppingEmissionTotal +=
              documents[i].data().shopping[0].finalEmissions.total
          }
        }
        if (documents[i].data().household.length > 0) {
          if ('finalEmissions' in documents[i].data().household[0]) {
            householdEmissionTotal +=
              documents[i].data().household[0].finalEmissions.total
          }
        }
        if (documents[i].data().transportation.length > 0) {
          if ('finalEmissions' in documents[i].data().transportation[0]) {
            transportationEmissionTotal +=
              documents[i].data().transportation[0].finalEmissions.total
          }
        }
      }
      this.foodEmissionAverage = foodEmissionTotal / documentsLength
      this.housholdEmissionAverage = householdEmissionTotal / documentsLength
      this.transportationEmissionAverage =
        transportationEmissionTotal / documentsLength
      this.shoppingEmissionAverage = shoppingEmissionTotal / documentsLength
    }
    const files = await emissionsRef
      .where('uid', '==', this.$store.state.auth.authUser.uid)
      .where('year', '==', new Date().getFullYear())
      .get()
    if (!files.empty) {
      const docm = files.docs
      for (let i = 0; i < docm.length; i++) {
        let date = []
        date = docm[i].data().measuredOn
        let dates = []
        dates = date.split(' ')
        if (docm[i].data().food.length > 0) {
          if ('finalEmissions' in docm[i].data().food[0]) {
            const currentYear = new Date().getFullYear().toString()
            if (dates[3] === currentYear && dates[1] === 'Jan') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              januaryEmission += FoodEmission
            }
            if (dates[3] === currentYear && dates[1] === 'Feb') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              februaryEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Mar') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              marchEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Apr') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              aprilEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'May') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              mayEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jun') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              juneEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jul') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              julyEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Aug') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              augustEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Sep') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              septemberEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Oct') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              octoberEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Nov') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              novemberEmission += FoodEmission
            }
            FoodEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Dec') {
              FoodEmission = isNaN(docm[i].data().food[0].finalEmissions.total)
                ? 0
                : docm[i].data().food[0].finalEmissions.total
              decemberEmission += FoodEmission
            }
            FoodEmission = 0
          }
        }
      }
      this.foodEmissionValues = [
        januaryEmission.toFixed(1),
        februaryEmission.toFixed(1),
        marchEmission.toFixed(1),
        aprilEmission.toFixed(1),
        mayEmission.toFixed(1),
        juneEmission.toFixed(1),
        julyEmission.toFixed(1),
        augustEmission.toFixed(1),
        septemberEmission.toFixed(1),
        octoberEmission.toFixed(1),
        novemberEmission.toFixed(1),
        decemberEmission.toFixed(1),
      ]
      januaryEmission = 0
      februaryEmission = 0
      marchEmission = 0
      aprilEmission = 0
      mayEmission = 0
      juneEmission = 0
      julyEmission = 0
      augustEmission = 0
      septemberEmission = 0
      octoberEmission = 0
      novemberEmission = 0
      decemberEmission = 0
      for (let i = 0; i < docm.length; i++) {
        let date = []
        date = docm[i].data().measuredOn
        let dates = []
        dates = date.split(' ')
        if (docm[i].data().shopping.length > 0) {
          if ('finalEmissions' in docm[i].data().shopping[0]) {
            const currentYear = new Date().getFullYear().toString()
            if (dates[3] === currentYear && dates[1] === 'Jan') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              januaryEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Feb') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              februaryEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Mar') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              marchEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Apr') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              aprilEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'May') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              mayEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jun') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              juneEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jul') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              julyEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Aug') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              augustEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Sep') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              septemberEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Oct') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              octoberEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Nov') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              novemberEmission += ShoppingEmission
            }
            ShoppingEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Dec') {
              ShoppingEmission = docm[i].data().shopping[0].finalEmissions.total
              decemberEmission += ShoppingEmission
            }
            ShoppingEmission = 0
          }
        }
      }
      this.shoppingEmissionValues = [
        januaryEmission.toFixed(1),
        februaryEmission.toFixed(1),
        marchEmission.toFixed(1),
        aprilEmission.toFixed(1),
        mayEmission.toFixed(1),
        juneEmission.toFixed(1),
        julyEmission.toFixed(1),
        augustEmission.toFixed(1),
        septemberEmission.toFixed(1),
        octoberEmission.toFixed(1),
        novemberEmission.toFixed(1),
        decemberEmission.toFixed(1),
      ]
      januaryEmission = 0
      februaryEmission = 0
      marchEmission = 0
      aprilEmission = 0
      mayEmission = 0
      juneEmission = 0
      julyEmission = 0
      augustEmission = 0
      septemberEmission = 0
      octoberEmission = 0
      novemberEmission = 0
      decemberEmission = 0
      for (let i = 0; i < docm.length; i++) {
        let date = []
        date = docm[i].data().measuredOn
        let dates = []
        dates = date.split(' ')
        if (docm[i].data().transportation.length > 0) {
          if ('finalEmissions' in docm[i].data().transportation[0]) {
            const currentYear = new Date().getFullYear().toString()

            if (dates[3] === currentYear && dates[1] === 'Jan') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              januaryEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Feb') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              februaryEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Mar') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              marchEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Apr') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              aprilEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'May') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              mayEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jun') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              juneEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jul') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              julyEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Aug') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              augustEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Sep') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              septemberEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Oct') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              octoberEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Nov') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              novemberEmission += TransportationEmission
            }
            TransportationEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Dec') {
              TransportationEmission =
                docm[i].data().transportation[0].finalEmissions.total
              decemberEmission += TransportationEmission
            }
            TransportationEmission = 0
          }
        }
      }
      this.transportationEmissionValues = [
        januaryEmission.toFixed(1),
        februaryEmission.toFixed(1),
        marchEmission.toFixed(1),
        aprilEmission.toFixed(1),
        mayEmission.toFixed(1),
        juneEmission.toFixed(1),
        julyEmission.toFixed(1),
        augustEmission.toFixed(1),
        septemberEmission.toFixed(1),
        octoberEmission.toFixed(1),
        novemberEmission.toFixed(1),
        decemberEmission.toFixed(1),
      ]
      januaryEmission = 0
      februaryEmission = 0
      marchEmission = 0
      aprilEmission = 0
      mayEmission = 0
      juneEmission = 0
      julyEmission = 0
      augustEmission = 0
      septemberEmission = 0
      octoberEmission = 0
      novemberEmission = 0
      decemberEmission = 0
      for (let i = 0; i < docm.length; i++) {
        let date = []
        date = docm[i].data().measuredOn
        let dates = []
        dates = date.split(' ')
        if (docm[i].data().household.length > 0) {
          if ('finalEmissions' in docm[i].data().household[0]) {
            const currentYear = new Date().getFullYear().toString()

            if (dates[3] === currentYear && dates[1] === 'Jan') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              januaryEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Feb') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              februaryEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Mar') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              marchEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Apr') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              aprilEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'May') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              mayEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jun') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              juneEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Jul') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              julyEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Aug') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              augustEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Sep') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              septemberEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Oct') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              octoberEmission += HouseholdEmission
            }
            HouseholdEmission = 0
            if (dates[3] === currentYear && dates[1] === 'Nov') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              novemberEmission += HouseholdEmission
            }
            if (dates[3] === currentYear && dates[1] === 'Dec') {
              HouseholdEmission =
                docm[i].data().household[0].finalEmissions.total
              decemberEmission += HouseholdEmission
            }
            HouseholdEmission = 0
          }
        }
      }
      this.householdEmissionValues = [
        januaryEmission.toFixed(1),
        februaryEmission.toFixed(1),
        marchEmission.toFixed(1),
        aprilEmission.toFixed(1),
        mayEmission.toFixed(1),
        juneEmission.toFixed(1),
        julyEmission.toFixed(1),
        augustEmission.toFixed(1),
        septemberEmission.toFixed(1),
        octoberEmission.toFixed(1),
        novemberEmission.toFixed(1),
        decemberEmission.toFixed(1),
      ]
      this.emissionValues = this.householdEmissionValues
    }
    januaryEmission = 0
    februaryEmission = 0
    marchEmission = 0
    aprilEmission = 0
    mayEmission = 0
    juneEmission = 0
    julyEmission = 0
    augustEmission = 0
    septemberEmission = 0
    octoberEmission = 0
    novemberEmission = 0
    decemberEmission = 0
    const existing = await emissionsRef
      .where('uid', '==', this.$store.state.auth.authUser.uid)
      .where('month', '==', new Date().getMonth() + 1)
      .where('year', '==', new Date().getFullYear())
      .get()

    if (!existing.empty) {
      const thisDay = new Date(Date.now())
      this.currentDate = thisDay.getMonth()
      const doc = existing.docs
      let lastDoc = _.sortBy(doc, (o) => Date.parse(o.data().measuredOn))
      lastDoc = lastDoc.at(-1).data()
      let foodEmission = lastDoc.food.length > 0 ? lastDoc.food[0] : {}
      let transportationEmission =
        lastDoc.transportation.length > 0 ? lastDoc.transportation[0] : {}
      let householdEmission =
        lastDoc.household.length > 0 ? lastDoc.household[0] : {}
      let shoppingEmission =
        lastDoc.shopping.length > 0 ? lastDoc.shopping[0] : {}
      if ('finalEmissions' in foodEmission) {
        foodEmission = foodEmission.finalEmissions
        delete foodEmission.total
      }
      if ('finalEmissions' in transportationEmission) {
        transportationEmission = transportationEmission.finalEmissions
        delete transportationEmission.total
      }
      if ('finalEmissions' in householdEmission) {
        householdEmission = householdEmission.finalEmissions
        delete householdEmission.total
      }
      if ('finalEmissions' in shoppingEmission) {
        shoppingEmission = shoppingEmission.finalEmissions
        delete shoppingEmission.total
      }
      const date = lastDoc.measuredOn.split(' ')
      this.measuredOn = `${date[1] + ' ' + date[2] + ' ' + date[3]}`
      this.tableData = householdEmission
      this.foodEmission = foodEmission
      this.shoppingEmission = shoppingEmission
      this.transportationEmission = transportationEmission
      this.housholdEmission = householdEmission
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].data().food.length > 0) {
          if ('finalEmissions' in doc[i].data().food[0]) {
            totalFoodEmission += isNaN(
              doc[i].data().food[0].finalEmissions.total
            )
              ? 0
              : doc[i].data().food[0].finalEmissions.total
          }
        }
        if (doc[i].data().shopping.length > 0) {
          if ('finalEmissions' in doc[i].data().shopping[0]) {
            totalShoppingEmission +=
              doc[i].data().shopping[0].finalEmissions.total
          }
        }
        if (doc[i].data().transportation.length > 0) {
          if ('finalEmissions' in doc[i].data().transportation[0]) {
            totalTransportationEmission +=
              doc[i].data().transportation[0].finalEmissions.total
          }
        }
        if (doc[i].data().household.length > 0) {
          if ('finalEmissions' in doc[i].data().household[0]) {
            totalHouseholdEmission +=
              doc[i].data().household[0].finalEmissions.total
          }
        }
      }
    }
    this.totalEmissions =
      totalFoodEmission +
      totalHouseholdEmission +
      totalTransportationEmission +
      totalShoppingEmission

    this.$store.commit('emission/SET_FOOD_EMISSION', totalFoodEmission)
    this.$store.commit(
      'emission/SET_HOUSEHOLD_EMISSION',
      totalHouseholdEmission
    )
    this.$store.commit(
      'emission/SET_TRANSPORTATION_EMISSION',
      totalTransportationEmission
    )
    this.$store.commit(
      'emission/SET_SHOPPING_EMISSION',
      totalTransportationEmission
    )
    this.foodT = isNaN(this.foodT) ? 0 : this.foodT
    this.shoppingT = isNaN(this.shoppingT) ? 0 : this.shoppingT
    this.transportationT = isNaN(this.transportationT)
      ? 0
      : this.transportationT
    this.householdT = isNaN(this.householdT) ? 0 : this.householdT
    this.foodT = ((totalFoodEmission / this.totalEmissions) * 100).toFixed(1)

    this.shoppingT = (
      (totalShoppingEmission / this.totalEmissions) *
      100
    ).toFixed(1)

    this.householdT = (
      (totalHouseholdEmission / this.totalEmissions) *
      100
    ).toFixed(1)

    this.transportationT = (
      (totalTransportationEmission / this.totalEmissions) *
      100
    ).toFixed(1)
    this.options = {
      legend: {
        display: false,
      },
    }
    this.chartData = {
      labels: ['Food', 'Shopping', 'Transportation', 'Household'],
      datasets: [
        {
          data: [
            this.foodT,
            this.shoppingT,
            this.transportationT,
            this.householdT,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 5,
        },
      ],
    }
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    // gets the current carbon credit balance of the logged in user
    if (!this.$store.state.coin.carbonCredit) {
      this.fetchingData = true
      await this.$store.dispatch('dashboard/getUserCarbonCreditAction')
    }
    this.carbonCredit = this.$store.state.coin.carbonCredit
    try {
      const ref = this.$fire.firestore
        .collection('emissionsHistory')
        .where('month', '==', new Date().getMonth() + 1)
      const internationalEmissions = await ref.get()
      internationalEmissions.forEach((e) => {
        this.rawData.push({
          id: e.id,
          data: e.data(),
        })
      })
      this.internationalData = _.sortBy(
        this.rawData,
        (o) => o.data.totalEmissions
      ).reverse()

      this.domesticData = _.filter(this.internationalData, (o) => {
        return o.data.location === this.$store.state.auth.userData.location
      })
    } catch (error) {
      console.log(error)
      alert('Error fetching data. Please try again later.')
      this.$store.dispatch('loading/toggleLoading', false)
    }
    this.fetchingData = false
    this.$store.dispatch('loading/toggleLoading', false)
  },
  // created
  methods: {
    // toggles the account dropdown
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    toggleInstructionDropdown() {
      this.showInstructionDropdown = !this.showInstructionDropdown
    },
    toggleHowToDropdown() {
      this.showHowToDropdown = !this.showHowToDropdown
    },
    toggleScoreDropdown() {
      this.showScoreDropdown = !this.showScoreDropdown
    },
    toggleDataDropdown() {
      this.showDataDropdown = !this.showDataDropdown
    },
    toggleSustainableDropdown() {
      this.showSustainableDropdown = !this.showSustainableDropdown
    },
    toggleOffsetDropdown() {
      this.showOffsetDropdown = !this.showOffsetDropdown
    },
    toggleItem(data) {
      this.isActive = false
      switch (data) {
        case 1:
          this.emissionValues = this.shoppingEmissionValues

          break
        case 2:
          this.emissionValues = this.foodEmissionValues

          break
        case 3:
          this.emissionValues = this.transportationEmissionValues
          break
        case 4:
          this.emissionValues = this.householdEmissionValues
          break
      }
    },
  },
} // export default
</script>

<style scoped>
.leftColumn {
  width: 10px;
}
.middleColumn {
  width: 15px;
}
.rightColumn {
  width: 330px;
}
.datas {
  @apply mt-7;
}

progress::-webkit-progress-bar {
  height: 10px;
  margin: 0 auto;
  background-color: #dadada;
  border-radius: 100px;
}
progress::-webkit-progress-value {
  height: 10px;
  background: #009168;
  border-radius: 100px;
}

.tab-content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
}

.btn-group button {
  padding: 5px 16px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: center; /* Float the buttons side by side */
  font-size: 14px;
}
.progress {
  width: 550px;
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: '';
  clear: both;
  display: table;
}

.row {
  display: flex;
}
.columnL {
  width: 250px;
}
.columnR {
  width: 600px;
}
.slide {
  width: 250px;
}

/* Add a background color on hover */
.btn-group button:hover {
  @apply bg-gray-300 rounded-md text-black;
}
.btn-group button:focus {
  @apply text-white rounded-md font-bold bg-green-700;
}
/* :checked - resize to full height */
.tab input:checked ~ .tab-content {
  max-height: 100vh;
}
/* Label formatting when open */
.tab input:checked + label {
  /*@apply text-xl p-5 border-l-2 border-indigo-500 bg-gray-100 text-indigo*/
  font-size: 1.25rem; /*.text-xl*/
  padding: 1.25rem; /*.p-5*/
  border-left-width: 2px; /*.border-l-2*/
  border-color: #6574cd; /*.border-indigo*/
  background-color: #f8fafc; /*.bg-gray-100 */
  color: #6574cd; /*.text-indigo*/
}
/* Icon */
.tab label::after {
  float: right;
  right: 0;
  top: 0;
  display: block;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5;
  font-size: 1.25rem;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
}
/* Icon formatting - closed */
.tab input[type='checkbox'] + label::after {
  content: '+';
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #b8c2cc; /*.border-grey*/
}
.tab input[type='radio'] + label::after {
  content: '\25BE';
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #b8c2cc; /*.border-grey*/
}
/* Icon formatting - open */
.tab input[type='checkbox']:checked + label::after {
  transform: rotate(315deg);
  background-color: #6574cd; /*.bg-indigo*/
  color: #f8fafc; /*.text-grey-lightest*/
}
.tab input[type='radio']:checked + label::after {
  transform: rotateX(180deg);
  background-color: #6574cd; /*.bg-indigo*/
  color: #f8fafc; /*.text-grey-lightest*/
}
@media screen and (max-width: 600px) {
  .icons {
    height: 10px;
  }
  .columnR {
    @apply mx-5;
    width: 400px;
  }
  .progress {
    width: 400px;
  }
  .bottom {
    @apply text-sm flex px-1 justify-start w-full;
  }
  .datas {
    @apply mt-10;
  }
}
@media screen and (max-width: 768px) {
  .chart {
    width: 180px;
  }
  .datas {
    @apply mt-10;
  }
  .aside {
    margin-top: 10px;
    width: 270px;
    height: 300px;
    justify-content: left;
    @apply mx-4;
  }
  .bar-chart {
    @apply ml-4;
  }
  .slide {
    width: 220px;
  }
  .sideD {
    float: left;
    margin-left: 5px;
  }
  .btn-group {
    height: 12px;
    visibility: hidden;
  }
  .scrollbar {
    @apply ml-4;
  }
}
.tooltip {
  position: relative;
  display: inline-block;
}
.icons {
  height: 24px;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  height: 180px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  width: 330px;
  top: 100%;
  left: 50%;
  margin-left: -60px;
  display: flex;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.navitems {
  @apply mx-5 text-sm  text-gray-500 hover:text-gray-900  flex justify-start items-center;
}
.inner-nav > a:active {
  @apply border-b border-gray-500 bg-gray-100;
}
.active {
  @apply text-white rounded-md font-bold bg-green-700;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: rgb(233, 230, 230);
  color: black;
  padding: 13px;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
}
</style>
