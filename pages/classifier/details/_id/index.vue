<template>
  <div>
    <div class="w-full flex justify-start items-start">
      <!-- this section is for the left hand side navbar -->
      <div class="flex flex-col w-1/4 ml-5">
        <!-- this are the navbar list itmes -->
        <div class="measure-nav">
          <button
            class="btn btn-primary btn-sm self-end hidden md:block"
            :disabled="sectionCompleted"
            @click="submitValidation"
          >
            Complete
          </button>
          <button
            class="btn btn-primary btn-sm self-end md:hidden"
            :disabled="sectionCompleted"
            @click="submitValidation"
          >
            <i class="fa fa-check-square fa-2x mr-5"></i>
          </button>
          <div
            id="householdSection"
            :class="{
              activeMeasure: measureSection == 'household',
              disabled: measureSection !== 'household',
            }"
            class="measure-nav-div"
          >
            <!-- household section -->
            <div class="w-full flex">
              <img src="~/assets/images/house.svg" alt="" />
              <h1
                class="
                  hidden
                  md:inline-block md:align-text-bottom md:self-center md:mr-16
                "
              >
                Household
              </h1>
            </div>
            <div class="w-full py-4">
              <!-- progress bar for the household -->
              <progress-bar
                :val="measureSection === 'household' ? sectionProgress : 100"
              />
            </div>
          </div>
          <!-- shopping section -->
          <div
            id="shoppingSection"
            :class="{
              activeMeasure: measureSection === 'shopping',
              disabled: measureSection !== 'shopping',
            }"
            class="measure-nav-div"
          >
            <div class="w-full flex">
              <img src="~/assets/images/shopping.svg" alt="" />
              <h1 class="hidden md:inline-block">Shopping</h1>
            </div>
            <div class="w-full py-4">
              <!-- progress bar for the shopping -->
              <progress-bar
                :val="
                  measureSection === 'shopping'
                    ? sectionProgress
                    : measureSection === 'household'
                    ? sections.shopping
                      ? 0
                      : 100
                    : 100
                "
              />
            </div>
          </div>
          <!-- food section -->
          <div
            :class="{
              activeMeasure: measureSection == 'food',
              disabled: measureSection !== 'food',
            }"
            class="measure-nav-div"
          >
            <div class="w-full flex">
              <img src="~/assets/images/food.svg" alt="" />
              <h1 class="hidden md:inline-block">Food</h1>
            </div>
            <div class="w-full py-4">
              <progress-bar
                :val="
                  measureSection === 'food'
                    ? sectionProgress
                    : sections.food
                    ? 0
                    : 100
                "
              />
            </div>
          </div>
        </div>
        <!-- overall progress -->
        <div class="w-full pt-4 pl-4 flex flex-col">
          <div class="w-full font-bold">
            <h1>Progress</h1>
          </div>
          <div class="w-full pt-4 flex flex-col md:flex-row justify-between">
            <div
              class="border-2 h-1.5 w-1/4 mt-2.5 rounded-full"
              :class="{
                progressIndicator: overallSectionProgress > 0,
              }"
            ></div>
            <div
              class="border-2 h-1.5 w-1/4 mt-2.5 rounded-full"
              :class="{
                progressIndicator: overallSectionProgress > 1,
              }"
            ></div>
            <div
              class="border-2 h-1.5 w-1/4 mt-2.5 mr-3 rounded-full"
              :class="{
                progressIndicator: overallSectionProgress > 2,
              }"
            ></div>
            <div>
              <span>{{ overallSectionProgress }} of 3</span>
            </div>
          </div>
        </div>
      </div>
      <!-- section that displays user submitted images -->
      <div class="measure-result">
        <h1 class="mb-2 border-b text-xl text-center w-full">
          User submitted image(s)
        </h1>
        <!-- picture component -->
        <pic :src="src" class="w-full" />
      </div>
      <!-- section that displays the data -->
      <div class="measure-input h-full">
        <h1 class="mb-2 border-b text-xl text-center w-full">
          User Reported Data
        </h1>
        <!-- component that displays the household data -->
        <household-display
          v-if="measureSection === 'household'"
          :data="checkData"
          @status="validate"
        />
        <!-- component that displays the food and shopping data -->
        <food-and-shopping
          v-if="measureSection !== 'household'"
          :data="checkData"
          @status="validate"
        />
      </div>
      <div class="flex flex-col md:hidden w-full">
        <!-- section that displays user submitted images -->
        <div class="measure-result-small w-full">
          <h1 class="mb-2 border-b text-sm block text-center w-full">
            User submitted image(s)
          </h1>
          <!-- picture component -->
          <pic :src="src" class="w-full md:mt-5" />
        </div>
        <!-- section that displays the data -->
        <div class="measure-input-small">
          <h1 class="mb-2 border-b text-xl text-center w-full hidden md:block">
            User Reported Data
          </h1>
          <!-- component that displays the household data -->
          <household-display
            v-if="measureSection === 'household'"
            :data="checkData"
            @status="validate"
          />
          <!-- component that displays the food and shopping data -->
          <food-and-shopping
            v-if="measureSection !== 'household'"
            :data="checkData"
            @status="validate"
          />
        </div>
      </div>
    </div>
    <!-- the bottom navigation for the images -->
    <div
      class="
        md:flex md:flex-start md:items-center md:justify-center md:my-4 md:mr-20
        hidden
      "
    >
      <img
        v-for="(data, index) in displayedData"
        :key="index"
        :src="
          measureSection !== 'household'
            ? data.image
            : data.electricity
            ? data.electricityImage
            : data.naturalgasImage
        "
        alt="image"
        class="w-24 h-12 cursor-pointer mx-7 rounded-lg"
        :class="{
          activeImage: selectedData == index,
          validated: data.status != 'pending',
        }"
        @click="changeData(index)"
      />
    </div>

    <!-- the small size bottom navigation -->
    <div class="flex md:hidden overflow-scroll w-full my-6">
      <img
        v-for="(data, index) in displayedData"
        :key="index"
        :src="
          measureSection !== 'household'
            ? data.image
            : data.electricity
            ? data.electricityImage
            : data.naturalgasImage
        "
        alt="image"
        class="w-24 h-12 cursor-pointer mx-7 rounded-lg"
        :class="{
          activeImage: selectedData == index,
          validated: data.status != 'pending',
        }"
        @click="changeData(index)"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
// Vue library for displaying images with different navigation options
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// importing components
import householdDisplay from '~/components/classifier/householdDisplay.vue'
import pic from '~/components/Picture.vue'
import ProgressBar from '~/components/classifier/Progress.vue'
import FoodAndShopping from '~/components/classifier/foodAndShopping.vue'

// tell Vue to use the image previewing library
Vue.use(VueViewer)

export default {
  components: { pic, householdDisplay, ProgressBar, FoodAndShopping }, // register imported components
  layout: 'auth', // the layout that contains the main navbar
  middleware: 'auth', // middleware to block unauthenticated user
  data() {
    return {
      isActive: true,
      measureSection: '',
      displayedData: [],
      firebaseData: {},
      selectedData: 0,
      listDataIndex: 0,
      sections: {
        household: false,
        food: false,
        shopping: false,
      },
    }
  },
  computed: {
    src() {
      let source = ''
      if (this.measureSection === 'household') {
        if (this.displayedData[this.selectedData] !== undefined)
          source =
            this.displayedData[this.selectedData].electricity > 0
              ? this.displayedData[this.selectedData].electricityImage
              : this.displayedData[this.selectedData].naturalgasImage
      } else if (
        this.measureSection === 'shopping' ||
        this.measureSection === 'food'
      ) {
        source = this.displayedData[this.selectedData].image
      }
      return source
    },
    checkData() {
      let data = {}
      if (this.measureSection === 'household') {
        if (this.displayedData[this.selectedData] !== undefined) {
          data =
            this.displayedData[this.selectedData].electricity > 0
              ? {
                  Electricity: {
                    value: this.displayedData[this.selectedData].electricity,
                    status: this.displayedData[this.selectedData].status,
                  },
                }
              : {
                  'Natural gas': {
                    value: this.displayedData[this.selectedData].naturalgas,
                    status: this.displayedData[this.selectedData].status,
                  },
                }
        }
      } else if (this.measureSection === 'food') {
        data = {
          Beef: this.displayedData[this.selectedData].beef,
          Pork: this.displayedData[this.selectedData].pork,
          Milk: this.displayedData[this.selectedData].milk,
          Turkey: this.displayedData[this.selectedData].turkey,
          Tuna: this.displayedData[this.selectedData].tuna,
          Chicken: this.displayedData[this.selectedData].chicken,
          Cheese: this.displayedData[this.selectedData].cheese,
          Lamb: this.displayedData[this.selectedData].lamb,
          status: this.displayedData[this.selectedData].status,
        }
      } else if (this.measureSection === 'shopping') {
        data = {
          Paper: this.displayedData[this.selectedData].paper,
          Plastic: this.displayedData[this.selectedData].plastic,
          Textile: this.displayedData[this.selectedData].textile,
          Pharmaceuticals: this.displayedData[this.selectedData].pharma,
          status: this.displayedData[this.selectedData].status,
        }
      }
      return data
    },
    // tracks whether or not the avaliable all the data are verified and returns true so that the completed button
    sectionCompleted() {
      let returnValue = false
      this.displayedData.forEach((data) => {
        if (data.status === 'pending') returnValue = true
      })
      return returnValue
    },
    sectionProgress() {
      let verified = 0
      this.displayedData.forEach((el) => {
        if (el.status !== 'pending') verified += 1
      })
      return (verified / this.displayedData.length) * 100
    },

    overallSectionProgress() {
      let sectionCompletedIndicator = 0
      const BreakThrow = {}
      if (this.firebaseData.household !== undefined) {
        try {
          this.firebaseData.household.forEach((house) => {
            if (house.status === 'pending') {
              throw BreakThrow
            }
          })
          sectionCompletedIndicator += 1
        } catch (e) {
          if (e !== BreakThrow) throw e
        }
        try {
          this.firebaseData.food.forEach((fo) => {
            if (fo.status === 'pending') {
              throw BreakThrow
            }
          })
          sectionCompletedIndicator += 1
        } catch (e) {
          if (e !== BreakThrow) throw e
        }
        try {
          this.firebaseData.shopping.forEach((sho) => {
            if (sho.status === 'pending') {
              throw BreakThrow
            }
          })
          sectionCompletedIndicator += 1
        } catch (e) {
          if (e !== BreakThrow) throw e
        }
      }
      return sectionCompletedIndicator
    },
  },
  async created() {
    // dispaches the action to display the loading animation for 700ms
    this.$store.dispatch('loading/toggleLoading', true)
    // dispaches the action that returns a measure data for a specific record and assign it to the displayedData
    this.firebaseData = await this.$store.dispatch(
      'classifier/getUserMeasureDataAction',
      this.$route.params.id
    )
    const BreakThrow = {} // a constant used for simulating break on javascript
    try {
      this.firebaseData.household.forEach((data) => {
        // loops through the household data array
        if (data.status === 'pending') {
          // checks if the specific data has been validated yet
          this.sections.household = true /* if there is at least one unvalidated data from the household array 
                                          we set the variable that holds if sections should be active */
          throw BreakThrow // this command will break the loop and jump to the catch section
        }
      })
    } catch (e) {
      if (e !== BreakThrow)
        return e /* throw the caught error if it is different from the constant 
                                        we are using to keep track of where the error has been thrown from */
    }
    try {
      this.firebaseData.shopping.forEach((data) => {
        if (data.status === 'pending') {
          this.sections.shopping = true
          throw BreakThrow
        }
      })
    } catch (e) {
      if (e !== BreakThrow) return e
    }
    try {
      this.firebaseData.food.forEach((data) => {
        if (data.status === 'pending') {
          this.sections.food = true
          throw BreakThrow
        }
      })
    } catch (e) {
      if (e !== BreakThrow) return e
    }
    if (this.sections.household) {
      this.measureSection = 'household'
    } else if (this.sections.shopping) {
      this.measureSection = 'shopping'
    } else if (this.sections.food) {
      this.measureSection = 'food'
    }
    this.setDisplayedData()
    setTimeout(() => {
      this.$store.dispatch('loading/toggleLoading', false)
    }, 900)
  },
  methods: {
    // renders the next image
    nextImage() {
      const BreakThrow = {}
      try {
        this.displayedData.forEach((data, index) => {
          if (data.status === 'pending') {
            this.selectedData = index
            throw BreakThrow
          }
        })
      } catch (e) {
        if (e !== BreakThrow) throw e
      }
    },
    // sets the data that needs to be dispalyed
    setDisplayedData() {
      this.displayedData = []
      this.selectedData = 0
      if (this.measureSection === 'household') {
        this.firebaseData.household?.forEach((data, index) => {
          if (data.status === 'pending') {
            const electricity = {
              id: index,
              electricity: data.electricity,
              electricityImage: data.electricityImage,
              status: data.status,
            }
            this.displayedData.push(electricity)
            const naturalGas = {
              id: index,
              naturalgas: data.naturalgas,
              naturalgasImage: data.naturalgasImage,
              status: data.status,
            }
            this.displayedData.push(naturalGas)
          }
        })
      } else if (this.measureSection === 'shopping') {
        this.firebaseData.shopping?.forEach((data, index) => {
          if (data.status === 'pending')
            this.displayedData.push({ id: index, ...data })
        })
      } else if (this.measureSection === 'food') {
        this.firebaseData.food?.forEach((data, index) => {
          if (data.status === 'pending')
            this.displayedData.push({ id: index, ...data })
        })
      }
    },
    // submites the validated data to the firebase
    submitValidation() {
      if (this.measureSection === 'household') {
        const claimedDate = []
        this.displayedData.forEach((data) => {
          if (data.electricity) {
            this.firebaseData.household[data.id].electricity = data.electricity
            this.firebaseData.household[data.id].status =
              this.firebaseData.household[data.id].status === 'approved' ||
              this.firebaseData.household[data.id].status === 'pending'
                ? data.status
                : this.firebaseData.household[data.id].status
          } else if (data.naturalgas) {
            this.firebaseData.household[data.id].naturalgas = data.naturalgas
            this.firebaseData.household[data.id].status =
              this.firebaseData.household[data.id].status === 'approved' ||
              this.firebaseData.household[data.id].status === 'pending'
                ? data.status
                : this.firebaseData.household[data.id].status
          }
          if (
            !claimedDate.includes(
              this.firebaseData.household[data.id].dateUserClaims
            )
          )
            claimedDate.push(
              this.firebaseData.household[data.id].dateUserClaims
            )
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (claimedDate.every((val, i, arr) => val === arr[0])) {
          this.$store.dispatch('notification/setNotificationAction', {
            receiverId: this.firebaseData.uid,
            status: 1,
            type: 2,
            dateTime: firebase.firestore.Timestamp.now(),
            content: `Your household data claimed for ${claimedDate[0]} is now approved.`,
          })
        } else {
          claimedDate.forEach((date) => {
            this.$store.dispatch('notification/setNotificationAction', {
              receiverId: this.firebaseData.uid,
              status: 1,
              type: 2,
              dateTime: firebase.firestore.Timestamp.now(),
              content: `Your household data claimed for ${date} is now approved.`,
            })
          })
        }
        // console.log(this.firebaseData.household)
        this.$store
          .dispatch('classifier/changeStatus', {
            id: this.$route.params.id,
            section: this.measureSection,
            data: this.firebaseData.household,
          })

          .then(() => {
            if (this.sections.shopping) this.measureSection = 'shopping'
            else if (this.sections.food) this.measureSection = 'food'
            else this.$router.push('/classifier')
            this.setDisplayedData()
          })
          .catch((e) => {
            console.log(e)
          })
      } else if (this.measureSection === 'shopping') {
        const claimedDate = []
        this.displayedData.forEach((data) => {
          this.firebaseData.shopping[data.id].status = data.status
          this.firebaseData.shopping[data.id].paper = data.paper
          this.firebaseData.shopping[data.id].pharma = data.pharma
          this.firebaseData.shopping[data.id].plastic = data.plastic
          this.firebaseData.shopping[data.id].textile = data.textile
          claimedDate.push(this.firebaseData.shopping[data.id].dateUserClaims)
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (claimedDate.every((val, i, arr) => val === arr[0])) {
          this.$store.dispatch('notification/setNotificationAction', {
            receiverId: this.firebaseData.uid,
            status: 1,
            type: 2,
            dateTime: firebase.firestore.Timestamp.now(),
            content: `Your shopping data claimed for ${claimedDate[0]} is now approved.`,
          })
        } else {
          claimedDate.forEach((date) => {
            this.$store.dispatch('notification/setNotificationAction', {
              receiverId: this.firebaseData.uid,
              status: 1,
              type: 2,
              dateTime: firebase.firestore.Timestamp.now(),
              content: `Your shopping data claimed for ${date} is now approved.`,
            })
          })
        }
        this.$store
          .dispatch('classifier/changeStatus', {
            id: this.$route.params.id,
            section: this.measureSection,
            data: this.firebaseData.shopping,
          })
          .then(() => {
            if (this.sections.food) this.measureSection = 'food'
            else this.$router.push('/classifier')
            this.setDisplayedData()
          })
      } else if (this.measureSection === 'food') {
        const claimedDate = []
        this.displayedData.forEach((data) => {
          this.firebaseData.food[data.id].status = data.status
          this.firebaseData.food[data.id].milk = data.milk
          this.firebaseData.food[data.id].beef = data.beef
          this.firebaseData.food[data.id].lamb = data.lamb
          this.firebaseData.food[data.id].pork = data.pork
          this.firebaseData.food[data.id].cheese = data.cheese
          this.firebaseData.food[data.id].chicken = data.chicken
          this.firebaseData.food[data.id].turkey = data.turkey
          this.firebaseData.food[data.id].tuna = data.tuna
          claimedDate.push(this.firebaseData.food[data.id].dateUserClaims)
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (claimedDate.every((val, i, arr) => val === arr[0])) {
          this.$store.dispatch('notification/setNotificationAction', {
            receiverId: this.firebaseData.uid,
            status: 1,
            type: 2,
            dateTime: firebase.firestore.Timestamp.now(),
            content: `Your food data claimed for ${claimedDate[0]} is now approved.`,
          })
        } else {
          claimedDate.forEach((date) => {
            this.$store.dispatch('notification/setNotificationAction', {
              receiverId: this.firebaseData.uid,
              status: 1,
              type: 2,
              dateTime: firebase.firestore.Timestamp.now(),
              content: `Your food data claimed for ${date} is now approved.`,
            })
          })
        }
        this.$store
          .dispatch('classifier/changeStatus', {
            id: this.$route.params.id,
            section: this.measureSection,
            data: this.firebaseData.food,
          })

          .then(() => {
            this.$router.push('/classifier')
          })
      }
    },
    // passes the data based on the selection of the the images on the image naviagetion
    changeData(id) {
      // this.src = this.displayedData[id].image
      this.selectedData = id
    },
    // handles the actions the appears when the valid or invalid button clicked
    validate(data) {
      if (this.measureSection === 'household') {
        this.displayedData[this.selectedData].status = data.status
        if (this.displayedData[this.selectedData].electricity > 0) {
          const firebaseElectricityValue =
            this.firebaseData.household[
              this.displayedData[this.selectedData].id
            ].electricity
          this.displayedData[this.selectedData].electricity =
            data.status !== 'pending' ? data.value : firebaseElectricityValue
        } else {
          const firebaseNaturalGasValue =
            this.firebaseData.household[
              this.displayedData[this.selectedData].id
            ].naturalgas
          this.displayedData[this.selectedData].naturalgas =
            data.status !== 'pending' ? data.value : firebaseNaturalGasValue
        }
        this.displayedData[this.selectedData].status = data.status
        this.nextImage()
      } else if (this.measureSection === 'shopping') {
        this.displayedData[this.selectedData].status = data.status
        if (data.status === 'pending') {
          this.displayedData[this.selectedData].paper =
            this.firebaseData.shopping[
              this.displayedData[this.selectedData].id
            ].paper
          this.displayedData[this.selectedData].plastic =
            this.firebaseData.shopping[
              this.displayedData[this.selectedData].id
            ].plastic
          this.displayedData[this.selectedData].textile =
            this.firebaseData.shopping[
              this.displayedData[this.selectedData].id
            ].textile
          this.displayedData[this.selectedData].pharma =
            this.firebaseData.shopping[
              this.displayedData[this.selectedData].id
            ].pharma
        } else {
          this.displayedData[this.selectedData].paper = data.Paper
          this.displayedData[this.selectedData].plastic = data.Plastic
          this.displayedData[this.selectedData].textile = data.Textile
          this.displayedData[this.selectedData].pharma = data.Pharmaceuticals
          this.nextImage()
        }
      } else if (this.measureSection === 'food') {
        this.displayedData[this.selectedData].status = data.status
        if (data.status === 'pending') {
          this.displayedData[this.selectedData].status =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].status
          this.displayedData[this.selectedData].milk =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].milk
          this.displayedData[this.selectedData].beef =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].beef
          this.displayedData[this.selectedData].lamb =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].lamb
          this.displayedData[this.selectedData].pork =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].pork
          this.displayedData[this.selectedData].cheese =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].cheese
          this.displayedData[this.selectedData].chicken =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].chicken
          this.displayedData[this.selectedData].turkey =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].turkey
          this.displayedData[this.selectedData].tuna =
            this.firebaseData.food[
              this.displayedData[this.selectedData].id
            ].tuna
        } else {
          this.displayedData[this.selectedData].milk = data.Milk
          this.displayedData[this.selectedData].beef = data.Beef
          this.displayedData[this.selectedData].lamb = data.Lamb
          this.displayedData[this.selectedData].pork = data.Pork
          this.displayedData[this.selectedData].cheese = data.Cheese
          this.displayedData[this.selectedData].chicken = data.Chicken
          this.displayedData[this.selectedData].turkey = data.Turkey
          this.displayedData[this.selectedData].tuna = data.Tuna
          this.nextImage()
        }
      }
    },
  },
}
</script>

<style scoped>
.disabled {
  @apply pointer-events-none opacity-50;
}
.progressIndicator {
  @apply border-accent bg-accent;
}
.validated {
  @apply opacity-50 border-4 border-red-600;
}
.measure-nav-div {
  @apply flex flex-col justify-start items-start w-1/6 bg-white px-5 pt-3 text-gray-600 hover:text-black cursor-pointer border-b w-full hover:bg-accent hover:bg-opacity-20 text-sm;
}
.measure-nav {
  @apply flex flex-col justify-start items-start w-full bg-white shadow-md rounded-md border;
}
/* .measure-nav-div {
  @apply 
  flex flex-col justify-start items-center px-5 pt-3 text-gray-600 hover:text-black cursor-pointer border-b w-full hover:bg-accent hover:bg-opacity-20 text-sm;
} */

.measure-nav img {
  @apply w-6 mr-3;
}

.measure-input {
  @apply md:w-1/3 md:flex md:flex-col md:justify-start md:items-start md:px-12 hidden;
}

.measure-result {
  @apply md:w-1/2 md:flex md:flex-col md:justify-start md:items-start md:pl-5 md:text-center hidden;
}
.measure-input-small {
  @apply w-full h-full justify-start items-start pl-5 pr-10 mt-4;
}

.measure-result-small {
  @apply w-5/6 flex flex-col justify-start items-start pl-5 text-center;
}

.activeMeasure {
  @apply bg-accent bg-opacity-40 text-black font-semibold;
}
.measure-submit {
  @apply w-1/2 flex flex-row justify-center gap-5 mx-auto my-4;
}
.activeImage {
  @apply border-4 border-accent border-opacity-100;
}
</style>
