<template>
  <div>
    <!-- the success message section -->
    <div
      v-if="toogleSuccess"
      class="
        flex
        w-full
        md:max-w-sm
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
          <span class="text-green-500 dark:text-green-400">Success</span>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            Your password was updated successfully!
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
      v-if="toggleWarning"
      class="
        flex
        w-full
        max-w-sm
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        shadow-md
        dark:bg-gray-800
        my-5
        mr-7
      "
    >
      <div class="flex items-center justify-center w-12 bg-yellow-400">
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
          <span class="text-yellow-400 dark:text-yellow-300">Warning</span>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            Passwords you entered doesn't match!
          </p>
        </div>
      </div>
      <i
        class="fa fa-times ml-auto mt-5 mr-6 cursor-pointer hover:text-red-500"
        @click="closeWarning"
      ></i>
    </div>

    <!-- the main section -->
    <div class="w-full mt-5">
      <h1 class="mb-5 hidden md:block">Change Password</h1>
      <div class="flex flex-col md:flex-row w-full">
        <label class="md:mr-4 md:mt-6">New Password</label>
        <input
          v-model="password"
          required
          type="password"
          placeholder="New password"
          :class="{ errorBorder: !password }"
          class="
            input input-primary input-bordered input-sm
            md:input-md
            w-full
            md:w-64 md:my-5 md:ml-6
            mb-5
            border-gray-300
          "
        />
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <label class="md:mr-4 md:mt-8">Re-type Password</label>
        <input
          v-model="cpassword"
          required
          type="password"
          placeholder="Confirm New password"
          :class="{ errorBorder: !cpassword }"
          class="
            input input-primary input-bordered input-sm
            md:input-md md:w-64 md:my-5 md:ml-2
            w-full
            border-gray-300
          "
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
          @click="updatePassword"
        >
          Save
        </button>
        <button
          class="
            btn btn-sm
            text-red-600
            border-red-600
            hover:bg-red-600 hover:text-white
            btn-outline
          "
          @click="clearForm"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      password: '',
      cpassword: '',
      toogleSuccess: false,
      toggleWarning: false,
    }
  },
  methods: {
    // update the password of the user
    updatePassword() {
      if (this.password !== this.cpassword) {
        this.toggleWarning = true
      } else {
        const user = firebase.auth().currentUser
        user
          ?.updatePassword(this.password)
          .then(() => {
            setTimeout(() => {
              this.toogleSuccess = true
            }, 1000)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    // clears the form
    clearForm() {
      this.password = ''
      this.cpassword = ''
    },
    // closes the success message
    closeAlert() {
      this.toogleSuccess = false
    },
    // closes the warning alert
    closeWarning() {
      this.toggleWarning = false
    },
  },
})
</script>

<style scoped>
.errorBorder {
  @apply border-red-500;
}
</style>
