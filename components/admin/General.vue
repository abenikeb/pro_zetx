<template>
  <div>
    <!-- the success message section -->
    <div
      v-if="toogleSuccess"
      class="
        flex
        md:w-full
        max-w-sm
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        dark:bg-gray-800
        my-5
      "
    >
      <div class="flex items-center justify-center w-12 bg-green-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-green-500 dark:text-green-400"
            >Success</span
          >
          <p class="text-sm text-gray-600 dark:text-gray-200">
            Your profile was updated successfully!
          </p>
        </div>
      </div>
      <i
        class="fa fa-times ml-auto mt-5 mr-6 cursor-pointer hover:text-red-500"
        @click="closeAlert"
      ></i>
    </div>
    <!-- the warning section -->
    <div
      v-if="toogleInfo"
      class="
        flex
        md:w-full
        max-w-sm
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        dark:bg-gray-800
        my-5
      "
    >
      <div class="flex items-center justify-center w-12 bg-blue-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
          />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-blue-500 dark:text-blue-400"
            >Info</span
          >
          <p class="text-sm text-gray-600 dark:text-gray-200">
            Make sure all the fields are filled!
          </p>
        </div>
      </div>

      <i
        class="fa fa-times ml-auto mt-5 mr-6 cursor-pointer hover:text-red-500"
        @click="closeInfoAlert"
      ></i>
    </div>
    <!-- the main section -->
    <div class="form-control">
      <label class="label">
        <span class="label-text font-semibold">Full Name</span>
      </label>
      <input
        v-model="fullName"
        type="text"
        placeholder="Full Name"
        :class="{ errorBorder: !fullName }"
        class="input input-primary input-bordered border-gray-300 md:w-96 w-60"
      />
    </div>
    <div class="form-control mt-2">
      <label class="label">
        <span class="label-text font-semibold">Email</span>
      </label>
      <input
        v-model="email"
        type="text"
        placeholder="Email Address"
        :class="{ errorBorder: !email }"
        class="input input-primary input-bordered border-gray-300 md:w-96"
      />
    </div>
    <div class="form-control mt-2">
      <label class="label">
        <span class="label-text font-semibold">Phone No.</span>
      </label>
      <input
        v-model="phoneNumber"
        type="text"
        placeholder="Phone Number"
        :class="{ errorBorder: !phoneNumber }"
        class="input input-primary input-bordered border-gray-300 md:w-96"
      />
    </div>
    <div class="form-control mt-2">
      <label class="label">
        <span class="label-text font-semibold">Location</span>
      </label>
      <input
        v-model="location"
        type="text"
        placeholder="Location"
        :class="{ errorBorder: !location }"
        class="input input-primary input-bordered border-gray-300 md:w-96"
      />
    </div>
    <div class="my-3 flex">
      <button
        class="
          btn btn-sm
          border-green-600
          text-white
          bg-green-600
          hover:bg-green-800
          mr-3
        "
        @click="updateProfile"
      >
        Save
      </button>
      <button
        class="
          btn btn-sm
          border-red-600
          text-red-600
          hover:bg-red-600 hover:text-white
          btn-outline
        "
        @click="resetForm"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      roles: [],
      status: '',
      toogleSuccess: false,
      toogleInfo: false,
    }
  },
  created() {
    const userData = this.$store.state.auth.userData
    this.fullName = userData.firstName + ' ' + userData.lastName
    this.email = userData.email
    this.phoneNumber = userData.phoneNumber
    this.location = userData.location
    this.roles = userData.roles
    this.status = userData.status
  },
  methods: {
    // updates the profile of the user
    updateProfile() {
      try {
        if (
          !this.fullName ||
          !this.email ||
          !this.phoneNumber ||
          !this.location
        ) {
          this.toogleInfo = true
        } else {
          const fullName = this.fullName.split(' ')
          const firstName = fullName[0]
          const lastName = fullName[1]
          const userData = {
            firstName,
            lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            location: this.location,
            roles: this.roles,
            status: this.status,
          }
          this.$store.dispatch('auth/updateProfile', userData)
          setTimeout(() => {
            this.toogleSuccess = true
          }, 1000)
        }
      } catch (ex) {
        console.log(ex)
      }
    },
    // rests the form to its previous content
    resetForm() {
      const userData = this.$store.state.auth.userData
      this.fullName = userData.firstName + ' ' + userData.lastName
      this.email = userData.email
      this.phoneNumber = userData.phoneNumber
      this.location = userData.location
    },
    // closes the success message
    closeAlert() {
      this.toogleSuccess = false
    },
    closeInfoAlert() {
      this.toogleInfo = false
    },
  },
}
</script>

<style scoped>
.errorBorder {
  @apply border-red-500;
}
</style>
