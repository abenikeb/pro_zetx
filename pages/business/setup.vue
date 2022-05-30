<template>
  <div class="setup-container">
    <div class="setup-box">
      <ul class="w-full steps">
        <li class="step step-primary">Welcome</li>
        <li class="step">Business Information</li>
        <li class="step">Location</li>
        <li class="step">Done</li>
      </ul>

      <div class="main">
        <div ref="page1" class="page page-1 current">
          <div class="greencheddar-logo">
            <img src="~/assets/images/greencheddar_logo.svg" />
            <span class="welcome-text">Welcome to GreenCheddar Business!</span>
            <span class="welcome-description">
              Sample welcome note here.Sample welcome note here.Sample welcome
              note here.Sample welcome note here.Sample welcome note here.
            </span>
          </div>
        </div>

        <div ref="page2" class="page page-2">
          <div>
            <div>
              <div class="page-title">Enter your Business Information</div>

              <div class="page-form">
                <div v-if="validationError" class="text-sm p-2 text-red-800">
                  Error! please make sure you have filled valid <b>Name</b> or
                  <b>Industry</b>
                  information.
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Name</span>
                  </label>
                  <input
                    ref="business-name-input"
                    v-model="businessInformation.Name"
                    placeholder="Business Name Here"
                    type="text"
                    required
                    @input="handleNameValidator"
                  />
                  <div
                    v-if="!takenLoading"
                    class="text-sm text-gray-700 p-2"
                    :class="{ 'text-red-800': isNameTaken }"
                  >
                    <div v-if="isNameTaken">
                      <div :class="!isActive && 'hidden'">
                        {{ nameInputError }}
                      </div>
                    </div>
                    <div v-else>
                      <div :class="!isActive && 'hidden'">
                        Name is Avaliable
                      </div>
                    </div>
                  </div>
                  <div v-else class="p-2">
                    <div class="animate-spin h-5 w-5 mr-3">
                      <img
                        src="~/assets/images/product/circle-spinner-accent.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Industry</span>
                  </label>

                  <select v-model="businessInformation.Industry">
                    <option disabled="disabled" selected="selected">
                      Choose Industry Here
                    </option>
                    <optgroup
                      v-for="(industryList, idx) in industries"
                      :key="idx"
                    >
                      <option
                        v-for="(industry, key) in industryList"
                        :key="key"
                        :value="industry"
                      >
                        {{ industry }}
                      </option>
                    </optgroup>
                  </select>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Description</span>
                  </label>
                  <textarea
                    v-model="businessInformation.Description"
                    required
                    placeholder="Business Description Here."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref="page3" class="page page-3">
          <div>
            <div>
              <div class="page-title">Enter Business Location Information</div>

              <div v-if="validationError" class="text-sm p-2 text-red-800">
                Error! please make sure you have filled <b>City</b> or
                <b>Street1</b> or <b>Country</b> information.
              </div>

              <div class="page-form">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">City</span>
                  </label>

                  <input
                    ref="location-city-input"
                    v-model="businessInformation.Location.City"
                    required
                    placeholder="City Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Street 1</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.Street1"
                    placeholder="Street 1 Here"
                    required
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Street 2</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.Street2"
                    required
                    placeholder="Street 2 Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">State</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.State"
                    required
                    placeholder="State Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Country</span>
                  </label>

                  <select v-model="businessInformation.Location.Country">
                    <option disabled="disabled" selected="selected">
                      Choose Country
                    </option>

                    <option
                      v-for="(countryName, idx) in countryNames"
                      :key="idx"
                      :value="countryName.code"
                    >
                      {{ countryName.name }}
                    </option>
                  </select>

                  <!-- <input
                    v-model="businessInformation.Location.Country"
                    placeholder="Country Here"
                    type="text"
                  /> -->
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Postal Code</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.PostalCode"
                    required
                    placeholder="Postal Code Here"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref="page4" class="page page-4">
          <div>
            <div>
              <div class="page-title">Enter Business Location Information</div>

              <div v-if="validationError" class="text-sm p-2 text-red-800">
                Error! please make sure you have filled <b>City</b> or
                <b>Street1</b> or <b>Country</b> information.
              </div>

              <div class="page-form">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">City</span>
                  </label>

                  <input
                    ref="location-city-input"
                    v-model="businessInformation.Location.City"
                    required
                    placeholder="City Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Street 1</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.Street1"
                    placeholder="Street 1 Here"
                    required
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Street 2</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.Street2"
                    required
                    placeholder="Street 2 Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">State</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.State"
                    required
                    placeholder="State Here"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Country</span>
                  </label>

                  <select v-model="businessInformation.Location.Country">
                    <option disabled="disabled" selected="selected">
                      Choose Country
                    </option>

                    <option
                      v-for="(countryName, idx) in countryNames"
                      :key="idx"
                      :value="countryName.code"
                    >
                      {{ countryName.name }}
                    </option>
                  </select>

                  <!-- <input
                    v-model="businessInformation.Location.Country"
                    placeholder="Country Here"
                    type="text"
                  /> -->
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Postal Code</span>
                  </label>

                  <input
                    v-model="businessInformation.Location.PostalCode"
                    required
                    placeholder="Postal Code Here"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref="page5" class="page page-5">
          <div v-if="businessCreated">
            <div class="page-title">Business Profile Created</div>

            <div class="welcome-description">
              You have successfully created your business profile. You can now
              access your business dashboard. dolore? Sunt, dolor laboriosam!
            </div>
          </div>
          <div v-else>
            <div v-if="!validationError" class="page-title">Almost Done!</div>
            <div
              v-if="validationError"
              class="text-xl text-red-400 font-normal my-2;"
            >
              Error!
            </div>

            <div
              v-if="validationError"
              class="welcome-description text-red-400"
            >
              Error! please make sure you have filled every information.
            </div>

            <div class="welcome-description">
              You're almost done, confirm the information you have entered and
              proceed to create your business profile by pressing the "Finish"
              butakenBusinessNameon.
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button ref="prevBtn" disabled class="prev" @click="handlePrev">
          Back
        </button>
        <span>
          <button ref="nextBtn" class="next" @click="handleNext">Next</button>

          <button ref="finishBtn" class="finish hide-btn" @click="handleCreate">
            Finish
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { COUNTRY_DATA } from '~/plugins/countries'
import { Industries } from '~/plugins/constants'

import {
  BusinessLocation,
  BusinessInformation,
} from '~/plugins/model/business/business.model'

export default Vue.extend({
  layout: 'empty',
  middleware: ['guest'],
  data() {
    return {
      currPage: 1,
      maxPages: 5,
      businessInformation: {
        Name: '',
        Industry: '',
        Description: '',
        Location: {
          Street1: '',
          Street2: '',
          City: '',
          State: '',
          Country: '',
          PostalCode: '',
        } as BusinessLocation,
        Requests: [],
      },
      loading: false,
      businessCreated: false,
      countryNames: COUNTRY_DATA,
      industries: Industries,
      validationError: false,
      nameInputError: 'Business Name is Taken',
      isNameTaken: false as Boolean,
      takenLoading: false as Boolean,
      isActive: false as Boolean,
    }
  },
  // async created() {
  //   this.$store.dispatch('loading/toggleLoading', true)
  //   const uid = this.$fire.auth.currentUser?.uid
  //   const businessRef = this.$fire.firestore
  //     .collection('business')
  //     .where('BusinessOwnerId', '==', uid)
  //     .limit(1)

  //   if (!(await businessRef.get()).empty) this.$router.replace('dashboard')
  //   this.$store.dispatch('loading/toggleLoading', false)
  // },
  methods: {
    progressSteps(steps: number) {
      const stepNodes = document.getElementsByClassName('step')
      steps = steps - 1

      for (const idx of [0, 1, 2, 3, 4])
        if (idx > steps) stepNodes[idx].classList.remove('step-primary')

      for (let idx = 0; idx <= steps; idx++)
        stepNodes[idx].classList.add('step-primary')

      /* for (let idx = 0; idx <= steps; steps++); */
    },

    handleNext() {
      const currentPage = this.$refs[`page${this.currPage}`] as HTMLDivElement
      const nextPage = this.$refs[`page${this.currPage + 1}`] as HTMLDivElement
      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      const nextBtn = this.$refs.nextBtn as HTMLButtonElement
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement
      /* eslint no-self-assign: ["error", {"props": false}] */
      if (
        this.currPage === 2 &&
        (this.businessInformation.Name === '' ||
          this.businessInformation.Industry === '' ||
          this.isNameTaken)
      ) {
        this.validationError = true
        this.currPage = this.currPage
      } else if (
        this.currPage === 3 &&
        (this.businessInformation.Location.City === '' ||
          this.businessInformation.Location.Street1 === '' ||
          this.businessInformation.Location.Country === '')
      ) {
        this.validationError = true
        this.currPage = this.currPage
      } else {
        this.validationError = false
        this.currPage = this.currPage + 1

        this.progressSteps(this.currPage)

        currentPage.classList.remove('current')
        nextPage.classList.add('current')

        prevBtn.removeAttribute('disabled')
        nextBtn.removeAttribute('disabled')
      }

      if (this.currPage === 1) prevBtn.setAttribute('disabled', 'disabled')
      else if (this.currPage === 2)
        (this.$refs['business-name-input'] as HTMLInputElement).focus()
      else if (this.currPage === 3)
        (this.$refs['location-city-input'] as HTMLInputElement).focus()
      else if (this.currPage === this.maxPages) {
        nextBtn.setAttribute('disabled', 'disabled')
        nextBtn.classList.add('hide-btn')
        finishBtn.classList.remove('hide-btn')
      }
    },

    handlePrev() {
      const currentPage = this.$refs[`page${this.currPage}`] as HTMLDivElement
      const nextPage = this.$refs[`page${this.currPage - 1}`] as HTMLDivElement
      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      const nextBtn = this.$refs.nextBtn as HTMLButtonElement
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement

      this.currPage = this.currPage - 1

      this.progressSteps(this.currPage)

      currentPage.classList.remove('current')
      nextPage.classList.add('current')

      prevBtn.removeAttribute('disabled')
      nextBtn?.removeAttribute('disabled')

      if (this.currPage !== this.maxPages) {
        nextBtn.classList.remove('hide-btn')
        finishBtn.classList.add('hide-btn')
      }

      if (this.currPage === 1) prevBtn.setAttribute('disabled', 'disabled')
      else if (this.currPage === 2)
        (this.$refs['business-name-input'] as HTMLInputElement).focus()
      else if (this.currPage === 3)
        (this.$refs['location-city-input'] as HTMLInputElement).focus()
      else if (this.currPage === this.maxPages) {
        nextBtn.setAttribute('disabled', 'disabled')
      }
      this.validationError = false
    },

    async handleCreate() {
      if (!this.validateInput()) {
        this.validationError = true
        return
      }
      if (this.businessCreated) return

      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      prevBtn.setAttribute('disabled', 'disabled')
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement
      finishBtn.setAttribute('disabled', 'disabled')

      const uid = this.$fire.auth.currentUser?.uid
      const newBusinessInformation = new BusinessInformation({
        BusinessOwnerId: uid as string,
        ...this.businessInformation,
        CarbonCreditBalance: 0,
      })

      this.loading = true
      this.$store.dispatch('loading/toggleLoading', true)
      await this.$fire.firestore
        .collection('business')
        .add(newBusinessInformation.toJson())

      this.$store.dispatch('loading/toggleLoading', false)
      this.businessCreated = true

      const userData = this.$store.state.auth.userData

      if (!(userData.roles as Array<string>).includes('business'))
        userData.roles = _.concat(userData.roles, ['business'])

      await this.$store.dispatch('auth/updateProfile', userData)
      this.$router.replace('/business/dashboard')
    },

    async handleNameValidator(e: Event) {
      const inputTarget = e.target as HTMLInputElement

      this.isActive = true
      this.takenLoading = true

      const businessRef = this.$fire.firestore.collection('business')
      const bussinessCollection = await (await businessRef.get()).docs

      const takenBusinessName = _.filter(
        bussinessCollection,
        (buss) => buss.data().Name === inputTarget.value
      )
      this.takenLoading = false

      if ((e as Event) !== null) {
        takenBusinessName.length > 0
          ? (this.isNameTaken = true)
          : (this.isNameTaken = false)
      }
      if (takenBusinessName) {
        setTimeout(() => {
          this.isActive = false
        }, 10000)
      }
    },

    validateInput() {
      // this.validationError = false
      // if (
      //   Object.values(_.omit(this.businessInformation, ['Location'])).includes(
      //     ''
      //   )
      // )
      //   return false
      // if (Object.values(this.businessInformation.Location).includes(''))
      //   return false

      // this.validationError = true
      return true
    },
  },
})
</script>

<style scoped>
.setup-container {
  width: 100%;
  height: 100%;

  margin-top: 4em;
}

.setup-box {
  @apply shadow border rounded
    border-gray-200 py-4 px-4;

  width: 60%;
  margin: 0 auto;
}

.setup-box .steps li {
  @apply text-gray-500 text-sm font-light;
}

.setup-box .steps li.step::before,
.setup-box .steps li.step::after {
  @apply bg-gray-300 text-white;
  color: white;
}

.setup-box .steps li.step.step-primary::before,
.setup-box .steps li.step.step-primary::after {
  @apply bg-green-500;
}

.setup-box .controls {
  display: flex;
  justify-content: right;
  gap: 0.2em;
}

.setup-box .controls .next,
.setup-box .controls .finish,
.setup-box .controls .prev {
  @apply btn btn-sm rounded;
}

.setup-box .controls .next,
.setup-box .controls .finish {
  @apply bg-green-500 text-white border-none;
}

.setup-box .controls .prev {
  @apply bg-gray-200 text-gray-500 border-none;
}

.setup-box .controls .prev:hover {
  @apply bg-gray-300;
}

.setup-box .controls .next:hover,
.setup-box .controls .finish:hover {
  @apply bg-green-600;
}

.setup-box .controls .finish:disabled,
.setup-box .controls .prev:disabled {
  @apply bg-gray-300 text-gray-400;
}

.setup-box .hide-btn {
  display: none !important;
}

.setup-box .main {
  @apply py-4;

  width: 85%;
  margin: 0 auto;
}

.setup-box .main > * {
  display: none;
}

.setup-box .main > .current {
  display: flex;
}

.setup-box .main .page {
  width: 100%;
}

.setup-box .main .page .page-title {
  @apply text-xl text-green-400
    font-normal my-2;
}

.setup-box .main .page .page-form .label-text {
  @apply text-gray-400 text-xs;
  text-transform: uppercase;
}

.setup-box .main .page .page-form .form-control {
  @apply my-2;
}

.setup-box .main .page .page-form input {
  @apply input input-sm input-bordered border-2
    border-gray-200
    rounded bg-gray-100;
}

.setup-box .main .page .page-form input:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form select {
  @apply select select-sm rounded
    select-bordered border-2
    border-gray-200 text-gray-500
    bg-gray-100
    w-full;
}

.setup-box .main .page .page-form select:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form textarea {
  @apply textarea h-24 textarea-bordered
    border-2 rounded
    border-gray-200 text-gray-500
    bg-gray-100
    w-full;
}

.setup-box .main .page .page-form textarea:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form input::placeholder,
.setup-box .main .page .page-form select::placeholder,
.setup-box .main .page .page-form textarea::placeholder {
  @apply text-gray-300;
}

.setup-box .main .page .welcome-text {
  @apply text-xl text-green-600 font-normal;
  text-align: center;
}

.setup-box .main .page .welcome-description {
  @apply text-sm text-gray-400 w-11/12 mt-1 font-normal;
  text-align: justify;
}

.setup-box .main .page-1 {
  width: 100%;
  height: 100%;

  flex-direction: column;
}

.setup-box .main .page-1 img {
  width: 70px;
  height: 70px;
}

.setup-box .main .page-1 .greencheddar-logo {
  @apply py-4;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
}

@media screen and (max-width: 768px) {
  .setup-box {
    width: 95%;
  }

  .setup-box .main .page-1 .greencheddar-logo .welcome-text {
    width: 75%;
  }

  .setup-box .main .page-1 .greencheddar-logo .welcome-description {
    @apply text-sm text-gray-400 font-normal;
    text-align: justify;
    width: 95%;
  }
}
</style>
