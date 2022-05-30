<template>
  <div class="max-w-sm w-full space-y-2">
    <div>
      <form class="space-y-4" @submit.prevent="updateProfile">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-2">
            <label for="email" class="text-black">First Name</label>
            <input
              id="fname"
              v-model="userData.firstName"
              name="firstName"
              type="text"
              autocomplete="firstName"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="Enter your first name"
            />
          </div>
          <div class="mb-2 pb-2">
            <label for="email" class="text-black">Last Name</label>
            <input
              id="lname"
              v-model="userData.lastName"
              name="firstName"
              type="text"
              autocomplete="firstName"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="Enter your last name"
            />
          </div>
          <div class="mb-2 pb-2">
            <label for="email" class="text-black">Location</label>
            <select
              id="location"
              v-model="userData.location"
              class="
                select select-sm
                rounded-none
                w-full
                border border-gray-300
                placeholder-gray-300
                text-gray-900
                focus:outline-none focus:ring-accent focus:border-accent
              "
              name="location"
              required
            >
              <option disabled value="">Select a city</option>
              <option v-for="(c, i) in cities" :key="i" :value="c.city">
                {{ c.city }}
              </option>
            </select>
          </div>
          <div class="mb-2 pb-2">
            <label for="email" class="text-black">Phone Number</label>
            <form action="" method="POST">
              <VuePhoneNumberInput
                required
                v-model="userData.tel"
                valid-color="#009168"
                size="lg"
                clearable
                show-code-on-list
                default-country-code="GB"
              />
            </form>
          </div>
          <!-- <div class="mb-2 pb-2">
            <label for="email" class="text-black">Phone Number</label>
            <input
              id="tel"
              v-model="userData.tel"
              name="Phone Number"
              type="text"
              autocomplete="Phone Number"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="Enter your phone number"
            />
          </div> -->
          <div class="mb-2 pb-2">
            <label for="email" class="text-black">Email address</label>
            <input
              id="email"
              v-model="userData.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="example@example.com"
            />
          </div>
          <div class="mb-2">
            <label for="userName" class="text-black">Username</label>
            <input
              id="userName"
              v-model="userData.userName"
              name="userName"
              type="text"
              autocomplete="userName"
              required
              class="
                rounded-none
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-300
                text-gray-900
                focus:outline-none focus:ring-accent focus:border-accent
              "
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-accent
              hover:bg-accent
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-accent
            "
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import Vue from 'vue'
import cities from '~/gb'
export default Vue.extend({
  components: {
    VuePhoneNumberInput,
  },
  props: {
    clearable: true,
    fetchCountry: true,
  },
  data() {
    return {
      userData: null,
      cities,
    }
  },
  created() {
    // console.log(this.$store.state.auth.userData)
    if (!this.userData) {
      this.userData = { ...this.$store.state.auth.userData }
    }
  },

  methods: {
    updateProfile() {
      if (this.userData.tel === null) {
        this.userData.tel = ''
      }
      this.$store.dispatch('auth/updateProfile', this.userData)
    },
  },
})
</script>
