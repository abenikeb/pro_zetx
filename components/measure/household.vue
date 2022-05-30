<template>
  <div class="w-full mx-auto">
    <h1 class="mb-2 border-b text-md font-bold">Household Emissions Data</h1>

    <form class="mt-5" @submit.prevent="">
      <div class="form-control w-full">
        <div class="flex flex-col gap-y-3 shadow-md p-5">
          <div class="flex flex-row items-center justify-center">
            <div class="overflow-hidden relative w-1/2 md:w-2/5">
              <label class="text-sm font-bold mb-3"> Electricity (KwH) </label>
              <div class="flex flex-col">
                <div class="w-auto">
                  <label for="images">
                    <h6
                      class="
                        border
                        bg-gray-400
                        rounded-lg
                        md:px-3 md:py-2
                        text-white
                        w-full
                        text-center
                        hidden
                        md:inline-block
                      "
                      :class="{
                        'bg-accent text-white cursor-pointer':
                          electricitySwitchVal,
                      }"
                    >
                      <i class="fa fa-upload md:mr-3" />
                      Upload Photo
                    </h6>
                    <h6
                      class="
                        border
                        bg-gray-400
                        rounded-lg
                        px-3
                        py-2
                        text-white
                        w-full
                        inline-block
                        md:hidden
                        text-center
                      "
                      :class="{
                        'bg-accent text-white cursor-pointer':
                          electricitySwitchVal,
                      }"
                    >
                      <i class="fa fa-upload md:mr-3" />
                      Upload
                    </h6>
                  </label>
                  <input
                    id="images"
                    accept="image/png, image/jpeg"
                    type="file"
                    :disabled="!electricitySwitchVal"
                    class="hidden"
                    @change="uploadElectricityImage($event)"
                  />
                </div>
              </div>

              <!-- <input
              accept="image/png, image/jpeg"
              type="file"
              :disabled="!electricitySwitchVal"
              @change="uploadElectricityImage($event)"
            /> -->
              <!-- @change="uploadImage($event, 'electricity')" -->

              <input
                class="
                  cursor-pointer
                  absolute
                  block
                  py-2
                  px-4
                  w-full
                  opacity-0
                  pin-r pin-t
                "
                type="file"
                name="image"
                accept="image/png, image/jpeg"
              />
            </div>
            <div class="flex items-center justify-center w-1/2">
              <label
                for="elecToggle"
                class="flex items-center cursor-pointer mt-5 ml-5 md:ml-0"
              >
                <div class="relative">
                  <input
                    id="elecToggle"
                    type="checkbox"
                    class="sr-only"
                    @change="electricitySwitch($event)"
                  />
                  <div
                    class="
                      block
                      bg-white
                      border border-black border-opacity-20
                      w-14
                      h-8
                      rounded-full
                    "
                  ></div>
                  <div
                    class="
                      dot
                      absolute
                      left-1
                      top-1
                      bg-gray-400
                      w-6
                      h-6
                      rounded-full
                      transition
                    "
                  ></div>
                </div>
              </label>
            </div>
            <div
              v-if="electricityImageData && electricitySwitchVal"
              class="hidden md:inline-block relative"
            >
              <img
                :src="electricityImageData"
                alt=""
                class="w-24 h-16 opacity-50 rounded-md"
              />
              <i
                class="
                  fa fa-times
                  bg-gray-400
                  absolute
                  right-1
                  top-1
                  cursor-pointer
                "
                @click="removeElectricityImage"
              ></i>
            </div>
          </div>
          <div
            v-if="electricityImageData && electricitySwitchVal"
            class="md:hidden inline-block relative w-2/3"
          >
            <img
              :src="electricityImageData"
              alt=""
              class="w-24 h-16 opacity-50 rounded-md"
            />
            <i
              class="
                fa fa-times
                bg-gray-400
                absolute
                right-12
                top-1
                cursor-pointer
              "
              @click="removeElectricityImage"
            ></i>
          </div>
        </div>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/electricity-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  houseDataEntry.electricity > 10000
                    ? 10000
                    : houseDataEntry.electricity
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="electricityValue($event)"
              ></vue-slider>
            </div>
            <div class="w-full my-5 inline-block md:hidden">
              <vue-slider
                :value="
                  houseDataEntry.electricity > 10000
                    ? 10000
                    : houseDataEntry.electricity
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="electricityValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex gap-x-2">
                <img
                  src="~/assets/images/measure/electricity-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/electricity-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/electricity-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <input
              id="elecricity"
              :value="houseDataEntry.electricity"
              type="number"
              class="
                input input-sm input-accent
                text-center
                w-full
                md:w-48 md:ml-2
                mt-2
                md:mt-0
              "
              @input="electricityInputChange($event)"
            />
          </div>
        </div>
      </div>

      <div class="form-control my-4">
        <div class="flex flex-col gap-y-3 shadow-md p-5">
          <div class="flex flex-row items-center">
            <div class="overflow-hidden relative md:ml-5 w-1/2 md:w-2/5">
              <label class="text-sm font-bold w-full mb-3">
                Natural gas (Ltr)
              </label>
              <div class="w-auto">
                <label for="nat">
                  <h6
                    class="
                      border
                      bg-gray-400
                      rounded-lg
                      md:px-3 md:py-2
                      text-white
                      w-full
                      text-center
                      hidden
                      md:inline-block
                    "
                    :class="{
                      'bg-accent text-white cursor-pointer':
                        naturalgasSwitchVal,
                    }"
                  >
                    <i class="fa fa-upload md:mr-3" />
                    Upload Photo
                  </h6>
                  <h6
                    class="
                      border
                      bg-gray-400
                      rounded-lg
                      px-3
                      py-2
                      text-white
                      w-full
                      inline-block
                      md:hidden
                      text-center
                    "
                    :class="{
                      'bg-accent text-white cursor-pointer':
                        naturalgasSwitchVal,
                    }"
                  >
                    <i class="fa fa-upload md:mr-3" />
                    Upload
                  </h6>
                </label>
                <input
                  id="nat"
                  accept="image/png, image/jpeg"
                  type="file"
                  :disabled="!naturalgasSwitchVal"
                  class="hidden"
                  @change="uploadNaturalGasImage($event)"
                />
              </div>
              <!-- <input
              type="file"
              accept="image/png, image/jpeg"
              :disabled="!naturalgasSwitchVal"
              @change="uploadNaturalGasImage($event)"
            /> -->
              <!-- @change="uploadImage($event, 'naturalgas')" -->
              <input
                class="
                  cursor-pointer
                  absolute
                  block
                  py-2
                  px-4
                  w-full
                  opacity-0
                  pin-r pin-t
                "
                type="file"
                name="image"
                accept="image/png, image/jpeg"
              />
            </div>
            <div class="flex items-center justify-center w-1/2">
              <label
                for="natgas"
                class="flex items-center cursor-pointer mt-7 ml-5 md:ml-0"
              >
                <div class="relative">
                  <input
                    id="natgas"
                    type="checkbox"
                    class="sr-only"
                    @change="naturalgasSwitch($event)"
                  />
                  <div
                    class="
                      block
                      bg-white
                      border border-black border-opacity-20
                      w-14
                      h-8
                      rounded-full
                    "
                  ></div>
                  <div
                    class="
                      dot
                      absolute
                      left-1
                      top-1
                      bg-gray-400
                      w-6
                      h-6
                      rounded-full
                      transition
                    "
                  ></div>
                </div>
              </label>
            </div>
            <div
              v-if="naturalgasImageData && naturalgasSwitchVal"
              class="hidden md:inline-block relative"
            >
              <img
                :src="naturalgasImageData"
                alt=""
                class="w-24 h-16 opacity-50 rounded-md"
              />
              <i
                class="
                  fa fa-times
                  bg-gray-400
                  absolute
                  right-1
                  top-1
                  cursor-pointer
                "
                @click="removeNaturalgasImage"
              ></i>
            </div>
            <!-- <input
            id="naturalgas"
            v-model="houseDataEntry.naturalgas"
            type="number"
            placeholder="Natural gas in Litres"
            class="input input-sm input-accent w-full md:w-1/2 md:ml-2 mt-2 md:mt-0"
          /> -->
          </div>
          <div
            v-if="naturalgasImageData && naturalgasSwitchVal"
            class="md:hidden inline-block relative w-2/3"
          >
            <img
              :src="naturalgasImageData"
              alt=""
              class="w-24 h-16 opacity-50 rounded-md"
            />
            <i
              class="
                fa fa-times
                bg-gray-400
                absolute
                right-12
                top-1
                cursor-pointer
              "
              @click="removeNaturalgasImage"
            ></i>
          </div>
        </div>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/natural-gas-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  houseDataEntry.naturalgas > 200
                    ? 200
                    : houseDataEntry.naturalgas
                "
                :min="min"
                :max="200"
                :marks="natGasMarks"
                :tooltip-placement="'bottom'"
                @change="natGasValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  houseDataEntry.naturalgas > 200
                    ? 200
                    : houseDataEntry.naturalgas
                "
                :min="min"
                :max="200"
                :marks="natGasMobileMarks"
                :tooltip-placement="'bottom'"
                @change="natGasValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex gap-x-2">
                <img
                  src="~/assets/images/measure/natural-gas-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/natural-gas-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/natural-gas-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <input
              :value="houseDataEntry.naturalgas"
              type="number"
              class="
                input input-sm input-accent
                text-center
                w-full
                md:w-48 md:ml-2
                mt-2
                md:mt-0
              "
              @input="natGasInputChange($event)"
            />
          </div>
        </div>
      </div>
      <!-- <div class="form-control w-1/2 mb-4">
        <label for="month" class="text-sm">Month</label>
        <input v-model="houseDataEntry.dateUserClaims" type="month" />
      </div> -->

      <!-- <div class="w-full md:w-1/3 text-xs form-control mb-5">
        <button
          class="btn btn-sm btn-accent rounded-full"
          :class="{ loading: uploadingImage }"
          @click.prevent="addEntry"
        >
          <span v-if="!uploadingImage">
            <span class="fa fa-plus mr-1"></span> Add entry
          </span>
          <span v-else>Uploading</span>
        </button>
      </div> -->

      <!-- <div
        v-if="houseData.length"
        class="
          w-full
          mb-2
          flex
          gap-x-5
          flex-row flex-wrap
          justify-start
          items-start
        "
      >
        <div
          v-for="(entry, i) in houseData"
          :key="i"
          class="
            w-2/5
            px-5
            py-2
            bg-gray-200
            text-gray-600
            rounded-lg
            mr-1
            mb-2
            text-xs
            relative
          "
        >
          <button
            class="
              px-1
              py-0.5
              rounded-md
              bg-red-600
              text-white
              absolute
              -top-2
              -right-2
            "
            @click.prevent="removeEntry(i)"
          >
            <span class="fa fa-minus mr-1"></span>
          </button>
          <h1>{{ `Electricity: ${entry.electricity}` }}</h1>
          <h1>{{ `Natural Gas: ${entry.naturalgas}` }}</h1>
        </div>
      </div> -->
      <!--
      <div class="form-control mb-2">
        <label class="text-sm"> Coal (Tonnes) </label>
        <input
          id="coal"
          v-model="houseData.coal"
          type="number"
          placeholder="Coal in tonnes"
          class="input input-sm"
        />
        <p class="text-gray-500 font-light text-xs">
          This is the amount of coal you used primarily for heating and cooking
          purposes
        </p>
      </div>

      <div class="form-control mb-2">
        <label class="text-sm"> Wood (Tonnes) </label>
        <input
          id="wood"
          v-model="houseData.wood"
          type="number"
          placeholder="wood in tonnes"
          class="input input-sm"
        />
        <p class="text-gray-500 font-light text-xs">
          This is the amount of wood you used primarily for heating and cooking
          purposes
        </p>
      </div> -->
      <div
        class="
          flex flex-col
          p-4
          md:w-1/2
          w-full
          shadow-lg
          bg-white
          mb-4
          rounded-lg
        "
      >
        <p class="text-center font-semibold text-sm">
          Number of people in your household?
        </p>
        <div class="flex w-full items-center">
          <div
            class="
              hidden
              md:inline-block md:w-10 md:h-10
              w-1/2
              h-32
              overflow-y-hidden
              mr-2
            "
          >
            <img
              src="~/assets/images/twemoji_house.svg"
              alt=""
              class="w-full h-full"
            />
          </div>
          <input
            v-model="numberOfPeople"
            min="1"
            class="
              outline-none
              border
              h-full
              py-2
              px-2
              bg-black bg-opacity-5
              rounded-lg
              mt-3
              md:mt-0
            "
            type="number"
            name=""
          />
        </div>
      </div>
      <div class="flex justify-center gap-x-4 items-center gap-5 border-t pt-5">
        <button class="btn btn-sm" @click.prevent="$emit('sectionSubmit')">
          Skip
        </button>
        <button
          id="submit"
          class="
            btn btn-sm
            border-accent
            text-accent
            hover:text-white hover:bg-accent
          "
          type="submit"
          @click.prevent="submitHouseholdData"
        >
          Submit
        </button>
      </div>
    </form>
    <!-- <div
      class="w-full flex flex-wrap justify-center items-center mt-4 font-bold"
    >
      <div class="stat w-1/2 mb-2 rounded-2xl">
        <div class="stat-title">Total Emissions</div>
        <div class="stat-value text-lg">42 KgCO2</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfPeople: 1,
      electricitySwitchVal: false,
      naturalgasSwitchVal: false,
      elecImage: '',
      natgasImage: '',
      uploadingImage: false,
      houseData: [],
      electricityImageData: '',
      naturalgasImageData: '',
      houseDataEntry: {
        electricity: 0,
        electricityImage: null,
        naturalgas: 0,
        naturalgasImage: null,
        dateMeasured: new Date().toDateString(),
        // dateUserClaims: null,
        status: 'pending',
        factors: {
          electricity: 0.21,
          naturalgas: 0.2,
        },
        finalEmissions: {
          electricity: 0,
          naturalgas: 0,
          total: 0,
        },
      },
      min: 0,
      max: 10000,
      marks: {
        0: 'Low Consumption',
        5000: 'Middle Consumption',
        10000: 'High Consumption',
      },
      mobileMarks: {
        0: 'Low',
        5000: 'Average',
        10000: 'High',
      },
      natGasMarks: {
        0: 'Low Consumption',
        100: 'Middle Consumption',
        200: 'High Consumption',
      },
      natGasMobileMarks: {
        0: 'Low',
        100: 'Average',
        200: 'High',
      },
    }
  },

  computed: {},

  created() {
    if (this.$store.state.measure.householdData.length) {
      // console.log(this.$store.state.measure.householdData)
      this.houseData = [...this.$store.state.measure.householdData]
    }
  },

  methods: {
    electricitySwitch(event) {
      this.electricitySwitchVal = event.target.checked
    },
    naturalgasSwitch(event) {
      this.naturalgasSwitchVal = event.target.checked
    },
    async submitHouseholdData() {
      if (this.electricitySwitchVal && this.elecImage === '') {
        return alert('Please upload an image for electricity')
      }
      if (this.naturalgasSwitchVal && this.natgasImage === '') {
        return alert('Please upload an image for natural gas')
      }
      if (this.uploadingImage) {
        return alert('Image is uploading')
      }

      if (this.elecImage !== '') {
        this.$store.dispatch('loading/toggleLoading', true)

        await this.uploadImage(this.elecImage, 'electricity')
        this.$store.dispatch('loading/toggleLoading', false)
      }
      if (this.natgasImage !== '') {
        this.$store.dispatch('loading/toggleLoading', true)

        await this.uploadImage(this.natgasImage, 'naturalGas')
        this.$store.dispatch('loading/toggleLoading', false)
      }
      // if (!this.houseDataEntry.dateUserClaims) {
      //   return alert('Please select a month')
      // }
      this.houseDataEntry.electricity /= this.numberOfPeople
      this.houseDataEntry.naturalgas /= this.numberOfPeople
      this.houseData.push(this.houseDataEntry)
      this.clearHouseDataEntry()
      if (!this.houseData.length) {
        return alert('Please add an entry or skip the section')
      }
      this.$store.dispatch('measure/setHouseholdData', this.houseData)
      this.$emit('sectionSubmit')
    },

    // addEntry() {
    //   // alert image is uploading if uploadingImage is true

    // },
    removeEntry(i) {
      this.houseData.splice(i, 1)
    },

    clearHouseDataEntry() {
      this.houseDataEntry = {
        electricity: 0,
        electricityImage: null,
        naturalgas: 0,
        naturalgasImage: null,
        dateMeasured: null,
        // dateUserClaims: null,
        status: 'pending',
        factors: {
          electricity: 0.21,
          naturalgas: 0.2,
        },
        finalEmissions: {
          electricity: 0,
          naturalgas: 0,
          total: 0,
        },

        // coal: 0,
        // wood: 0,
      }
    },
    uploadElectricityImage(event) {
      this.elecImage = event.target.files[0]
      if (event.target.files.length !== 0) {
        this.electricityImageData = URL.createObjectURL(event.target.files[0])
      }
    },
    uploadNaturalGasImage(event) {
      this.natgasImage = event.target.files[0]
      if (event.target.files.length !== 0) {
        this.naturalgasImageData = URL.createObjectURL(event.target.files[0])
      }
    },
    removeElectricityImage() {
      this.elecImage = ''
      this.electricityImageData = ''
    },
    removeNaturalgasImage() {
      this.natgasImage = ''
      this.naturalgasImageData = ''
    },
    electricityInputChange(e) {
      this.houseDataEntry.electricity = parseInt(e.target.value)
    },
    electricityValue(val) {
      this.houseDataEntry.electricity = parseInt(val)
    },
    natGasInputChange(e) {
      this.houseDataEntry.naturalgas = parseInt(e.target.value)
    },
    natGasValue(val) {
      this.houseDataEntry.naturalgas = parseInt(val)
    },
    async uploadImage(img, type) {
      this.uploadingImage = true
      const image = img
      if (!image) {
        return (this.uploadingImage = false)
      }
      if (!image.type.match('image.*')) {
        this.uploadingImage = false
        return alert('Please select an image file')
      }
      const fileName = `mrv/MRV${new Date().getTime()}`
      const imageRef = this.$fire.storage
        .ref()
        .child(`${fileName}.${image.name.split('.').pop()}`)
      try {
        const snapshot = await imageRef.put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        if (type === 'electricity') {
          this.houseDataEntry.electricityImage = imageUrl
        } else if (type === 'naturalGas') {
          this.houseDataEntry.naturalgasImage = imageUrl
        }
        this.uploadingImage = false
      } catch (error) {
        this.uploadingImage = false
        alert(error.message)
      }
    },
  },
}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  @apply bg-accent;
}
</style>
