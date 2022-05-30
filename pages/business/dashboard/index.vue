<template>
  <div>
    <div
      class="
        p-group
        no-scrollbar
        h-14
        lg:ml-32
        flex-row
        w-56
        md:w-1/2
        justify-start
        items-center
        md:flex
      "
    >
      <!-- Graph section -->
      <p class="navBtn">Household</p>
      <div class="box" style="background-color: rgba(75, 192, 192, 1)"></div>
      <p class="navBtn">Shopping</p>
      <div class="box" style="background-color: rgba(255, 206, 86, 1)"></div>
      <p class="navBtn">Transportation</p>
      <div class="box" style="background-color: rgba(54, 162, 235, 1)"></div>
      <p class="navBtn">Food</p>
      <div class="box" style="background-color: rgba(255, 99, 132, 1)"></div>
    </div>
    <div class="sideD lg:w-80 lg:h-96 mr-5 float-right">
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
      class="
        pb-5
        lg:ml-32
        w-full
        md:w-1/2
        flex
        bar-chart
        justify-start
        items-center
        overflow-x-auto
      "
    >
      <BarChart :chart-data="barChartDataFinal" :options="barChartOptions" />
    </div>
    <div class="page-container pb-10 overflow-x-auto scrollbar">
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
                v-if="
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
            <img class="h-6" src="~assets/images/powerSub.svg" alt="" />
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
            <img class="h-6" src="~assets/images/bottleSub.svg" alt="" />
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
            <img class="h-6" src="~assets/images/meat.svg" alt="" />
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
            <img class="h-6" src="~assets/images/carSub.svg" alt="" />
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
    <div class="page-container container mx-auto">
      <!-- <div class="mb-6 mt-4">
      <h4
        class="
          font-bold
          text-gray-600 text-3xl
          flex flex-row
          align-bottom
          gap-2
        "
      >
        <i
          class="icon icon-dashboard bg-yellow-400"
          style="width: 1em; height: 1em"
        ></i>
        Dashboard
      </h4>
      <hr />
    </div> -->

      <div class="flex justify-end">
        <!-- <nuxt-link to="/business/dashboard/leaderboard">
        <button
          style="text-decoration: none !important"
          class="btn btn-link no-animation text-green-400 py-1 text-xs"
        >
          Go to Leaderboards
        </button>
      </nuxt-link> -->
      </div>

      <div class="leaderboard">
        <div class="card">
          <span class="card-title">International</span>
          <span class="card-value">{{
            rank ? rank.leaderboard.international : '#'
          }}</span>

          <span class="card-icon icon icon-globe bg-yellow-400"></span>
        </div>
        <div class="card">
          <span class="card-title">Domestic</span>
          <span class="card-value">{{
            rank ? rank.leaderboard.domestic : '#'
          }}</span>

          <span class="card-icon icon icon-flag bg-green-400"></span>
        </div>
        <div class="card">
          <span class="card-title">Private</span>
          <span class="card-value card-value-unavailable">#-</span>
          <span class="card-desc disabled-rank">unavailable</span>

          <span class="card-icon icon icon-lock bg-red-400"></span>
        </div>
      </div>

      <div class="current-info">
        <div class="card">
          <div class="card-title">Associates</div>
          <div v-if="business" class="card-value">
            {{ business.Employees.length }}
          </div>
          <div v-else class="card-value">#</div>
          <span class="card-icon icon icon-users bg-red-400"></span>
        </div>
        <div class="card">
          <div class="card-title">Credit Earned</div>
          <div v-if="business" class="card-value">
            {{ business.CarbonCreditBalance.toFixed(2) }}
          </div>
          <div v-else class="card-value">#</div>
          <span class="card-icon icon icon-credit bg-green-400"></span>
        </div>
      </div>

      <!-- <div class="mt-4">
      <div class="text-2xl text-gray-400">Recent Transaction History</div>
      <hr />
    </div> -->

      <!-- <div class="recent-transactions">
      <div class="flex justify-end"> -->
      <!-- <nuxt-link to="/business/dashboard/carbon/transactions">
          <button class="btn no-animation text-green-400 py-1">
            Go to transactions page
          </button>
        </nuxt-link> -->
      <!-- </div>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Associate. Name</th>
              <th>Credit Amount</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-if="transactions">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.employeeName }}</td>
              <td>
                {{ transaction.amount }}
                <span class="text-green-300 font-bold">CC</span>
              </td>
              <td>{{ transaction.email }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3" aria-colspan="3" class="ml-8">
                No Transactions Yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="recent-transactions-help">
        You can scroll left to view more.
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
export default Vue.extend({
  data() {
    return {
      business: 0,
      transactions: [],
      rank: 0,
      chartData: {},
      options: {},
      currentDate: 0,
      foodT: 0,
      transportationT: 0,
      householdT: 0,
      shoppingT: 0,
      totalEmission: 0,
      foodEmissionAverage: 0,
      shoppingEmissionAverage: 0,
      housholdEmissionAverage: 0,
      transportationEmissionAverage: 0,
      foodEmission: [],
      shoppingEmission: [],
      householdEmission: [],
      transportationEmission: [],
      shoppingEmissionValues: [],
      foodEmissionValues: [],
      transportationEmissionValues: [],
      householdEmissionValues: [],
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
              stacked: true,
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
              stacked: true,
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
            label: 'Household  total Emission Amount ',
            barThickness: 25,
            data: this.householdEmissionValues,
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'gray',
          },

          {
            label: 'Shopping  total Emission Amount ',
            barThickness: 25,
            data: this.shoppingEmissionValues,
            backgroundColor: 'rgba(255, 206, 86, 1)',
            borderColor: 'gray',
          },

          {
            label: 'Transportation total Emission Amount',
            barThickness: 25,
            data: this.transportationEmissionValues,
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'gray',
          },
          {
            label: 'Food total Emission Amount',
            barThickness: 25,
            data: this.foodEmissionValues,
            backgroundColor: 'rgba(255, 99, 132, 1)',
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
    let totalHouseholdEmission = 0
    let totalTransportationEmission = 0
    let FoodEmission = 0
    let ShoppingEmission = 0
    let TransportationEmission = 0
    let HouseholdEmission = 0
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
    const Userdata = []
    const businessRef = this.$fire.firestore.collection('business')
    const emissionsRef = this.$fire.firestore.collection('emissionsData')
    const existing = await businessRef
      .where('BusinessOwnerId', '==', this.$store.state.auth.authUser.uid)
      .get()
      .then((employee) => {
        employee.docs[0].data().Employees.forEach((value) => {
          Userdata.push(value.employeeId)
        })
        return Userdata
      })
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
    const file = await emissionsRef
      .where('uid', 'in', existing)
      .where('year', '==', new Date().getFullYear())
      .get()
    if (!file.empty) {
      const docm = file.docs
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
    }
    const files = await emissionsRef
      .where('uid', 'in', existing)
      .where('month', '==', new Date().getMonth() + 1)
      .get()
    if (!files.empty) {
      const doc = files.docs
      const thisDay = new Date(Date.now())
      this.currentDate = thisDay.getMonth()
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].data().food.length > 0) {
          if ('finalEmissions' in doc[i].data().food[0]) {
            totalFoodEmission += doc[i].data().food[0].finalEmissions.total
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

    this.foodT = isNaN(this.foodT) ? 0 : this.foodT
    this.shoppingT = isNaN(this.shoppingT) ? 0 : this.shoppingT
    this.transportationT = isNaN(this.transportationT)
      ? 0
      : this.transportationT
    this.householdT = isNaN(this.householdT) ? 0 : this.householdT
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
    await this.fetchBusinessInformation()
    await this.fetchCarbonTransactions()
    if (this.$store.state.business.businessLeaderboardRanks === undefined)
      this.rank = await this.$store.dispatch(
        'business/getBusinessLeaderboardRank'
      )
    else this.rank = this.$store.state.business.businessLeaderboardRanks
    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    async fetchBusinessInformation() {
      const uid = this.$fire.auth.currentUser?.uid
      const businessRef = this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', uid)
        .limit(1)
      const businessData = (await businessRef.get()).docs[0]
      this.business = {
        id: businessData.id,
        ...businessData.data(),
      }
    },
    async fetchCarbonTransactions() {
      const transactionsDocListRef = this.$fire.firestore
        .collection('carbonCreditTransaction')
        .where('receiverId', '==', this.business.id)
        .limit(6)
      const transactionDocs = await transactionsDocListRef.get()
      const userRefList = transactionDocs.docs.map((t) =>
        this.$fire.firestore.collection('users').doc(t.data().senderId).get()
      )
      const users = (await Promise.all(userRefList)).map((userDoc) =>
        _.pick(
          {
            id: userDoc.id,
            ...userDoc.data(),
            fullName: `${userDoc.data()?.firstName} ${
              userDoc.data()?.lastName
            }`,
          },
          ['fullName', 'email', 'id']
        )
      )
      this.transactions = []
      transactionDocs.forEach((tDoc) => {
        const user = users.find((u) => u.id === tDoc.data().senderId)
        this.transactions?.push({
          id: tDoc.id,
          employeeName: user.fullName,
          amount: tDoc.data().amount,
          email: user.email,
        })
      })
    },
  },
})
</script>

<style scoped>
.row {
  display: flex;
}
.columnL {
  width: 150px;
}
.columnR {
  width: 600px;
}
.leftColumn {
  width: 10px;
}
.middleColumn {
  width: 15px;
}
.rightColumn {
  width: 330px;
}
.slide {
  width: 250px;
}
.datas {
  @apply mt-8;
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
.progress {
  width: 550px;
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
  /* Position the tooltip text*/
  position: absolute;
  z-index: 1;
  display: flex;
}
/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.box {
  height: 15px;
  width: 15px;
  padding: 5px;
  margin-right: 25px;
  border: 1px solid black;
}
.p-group p {
  color: black; /* White text */
  padding: 5px 6px; /* Some padding */
  float: center; /* Float the buttons side by side */
  font-size: 14px;
}
.page-container {
  width: 80%;
  margin: 0 auto;
}
.leaderboard {
  @apply divide-x shadow-sm rounded-lg;
  display: flex;
  flex-direction: row;
}
.leaderboard .card {
  @apply border-t border-b
    rounded-none py-3 px-4;
  display: inline-flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 0.3em;
  position: relative;
}
.leaderboard .card * {
  line-height: 0;
}
.leaderboard .card:first-child {
  @apply rounded-l-lg border-l;
}
.leaderboard .card:last-child {
  @apply rounded-r-lg border-r;
}
.leaderboard .card .card-title {
  @apply text-xs text-gray-400
    font-light;
  padding-left: 0.2em;
  line-height: 0;
  margin-bottom: 0;
}
.leaderboard .card .card-value {
  @apply text-4xl text-gray-700 font-bold;
  text-transform: uppercase;
}
.leaderboard .card .card-desc {
  @apply text-xs font-light;
  line-height: 0;
  margin-bottom: 0;
}
.leaderboard .card .card-icon {
  position: absolute;
  top: 10%;
  right: 5%;
}
.inc-rank {
  @apply text-green-400;
}
.inc-rank::before {
  content: '↗︎';
  margin-right: 0.1em;
}
.dec-rank {
  @apply text-red-400;
}
.dec-rank::before {
  content: '↘︎';
  margin-right: 0.1em;
}
.disabled-rank {
  @apply text-gray-300;
  text-decoration: line-through;
}
.current-info {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.6em;
  margin-top: 0.7em;
}
.current-info * {
  line-height: 0;
  margin: 0;
}

.current-info .card {
  @apply shadow-sm
    border border-gray-200
    rounded-md
    px-4 py-4;
  flex: 1 1 0%;
  display: inline-flex;
  flex-direction: column;
  height: inherit;
  position: relative;
}
.current-info .card .card-title {
  @apply text-sm text-gray-300;
}
.current-info .card .card-value {
  @apply text-4xl text-gray-700 font-bold;
}
.current-info .card .card-value.card-value-unavailable {
  @apply text-gray-400;
  text-transform: line-through;
}
.current-info .card .card-icon {
  position: absolute;
  top: 10%;
  right: 5%;
}
.icon-users {
  mask: url('~/assets/images/business/users-solid.svg');
}
.icon-credit {
  mask: url('~/assets/images/business/carbon_credit.svg');
}
.icon-globe {
  mask: url('~/assets/images/business/globe.svg');
}
.icon-flag {
  mask: url('~/assets/images/business/flag-solid.svg');
}
.icon-lock {
  mask: url('~/assets/images/business/lock-alt.svg');
}
.icon-dashboard {
  mask: url('~/assets/images/business/chart-line-solid.svg');
}
.icon-exclamation {
  mask: url('~/assets/images/business/lock-alt.svg');
}
.icon {
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
/* Correcting height issue */
.icon-flag {
  height: 2em !important;
}
@media screen and (max-width: 600px) {
  .chart {
    width: 200px;
  }
  .aside {
    margin-top: 10px;
    width: 300px;
    height: 300px;
    justify-content: left;
    @apply ml-7;
  }
  .sideD {
    float: left;
    margin-left: 5px;
  }
  .slide {
    width: 220px;
  }
  .p-group {
    visibility: hidden;
  }
  .box {
    height: 10px;
    width: 10px;
    padding: 5px;
    margin-right: 15px;
    border: 1px solid black;
  }
  .progress {
    width: 300px;
  }
  .page-container {
    width: 90%;
    margin: 0 auto;
  }
  .datas {
    @apply mt-12;
  }
}
@media screen and (max-width: 600px) {
  .datas {
    @apply mt-12;
  }
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
}
@media screen and (max-width: 768px) {
  .datas {
    @apply mt-12;
  }
  .sideD {
    float: left;
    margin-left: 5px;
  }
  .bar-chart {
    @apply mx-4;
  }
  .page-container {
    width: 90%;
    margin: 0 auto;
  }
  .p-group {
    visibility: hidden;
  }
  .current-info {
    flex-direction: column;
  }
  .leaderboard {
    @apply divide-y divide-x border border-gray-200 mt-4;
    flex-direction: column;
  }
  .leaderboard .card {
    @apply border-none rounded-none border-gray-800;
  }
  .leaderboard .card:first-child {
    @apply rounded-tl-md rounded-tr-md rounded-l-none;
  }
  .leaderboard .card:last-child {
    @apply rounded-b-md rounded-r-none;
  }
  .leaderboard .icon {
    height: 2em;
    width: 2em;
  }
  .leaderboard .icon-flag {
    height: 1.7em;
    width: 1.7em;
  }
}
</style>
