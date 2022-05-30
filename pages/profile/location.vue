<template>
  <div class="flex flex-col justify-start items-center gap-y-10 mt-20">
    <div class="flex w-full justify-center items-center">
      <h1 class="text-xl font-bold text-accent">Finish Signing-Up</h1>
    </div>
    <form @submit.prevent="setLocation">
      <div v-if="signinMethod === 'google'" class="mb-2">
        <label for="email" class="text-black">First Name</label>
        <input
          id="fname"
          v-model="formData.firstName"
          name="firstName"
          type="text"
          autocomplete="firstName"
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
          placeholder="Enter your first name"
        />
      </div>
      <div v-if="signinMethod === 'google'" class="mb-2 pb-2">
        <label for="lastName" class="text-black">Last Name</label>
        <input
          id="lname"
          v-model="formData.lastName"
          name="lastName"
          type="text"
          autocomplete="lastName"
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
          placeholder="Enter your last name"
        />
      </div>
      <div v-if="signinMethod === 'google'" class="mb-2 pb-2">
        <label for="email" class="text-black">Email Address</label>
        <input
          id="email"
          v-model="formData.email"
          name="email"
          type="email"
          autocomplete="email"
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
          placeholder="example@example.com"
        />
      </div>
      <div class="mb-2 pb-2">
        <div class="flex w-full gap-x-5 py-4">
          <label for="email" class="text-black">Location</label>
          <div
            class="tooltip tooltip-right"
            data-tip="We need your location the for location based leaderboards that we are going to provide for you"
          >
            <i class="fa fa-question-circle"></i>
          </div>
        </div>
        <select
          id="location"
          v-model="formData.location"
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
      <div class="mb-2">
        <label for="userName" class="text-black">Username</label>
        <input
          id="userName"
          v-model="formData.userName"
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
      <div class="flex flex-col justify-start items-center gap-y-7">
        <button
          type="submit"
          class="btn btn-primary btn-block rounded-lg text-center"
        >
          Get Started
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import cities from '~/gb'
export default {
  layout: 'guest',
  middleware: 'auth',
  data() {
    return {
      cities,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        userName: '',
        tel: '',
        roles: [],
        subscription: '',
        date: new Date().toLocaleDateString('en-GB'),
      },
      signinMethod: '',
    }
  },
  async created() {
    try {
      this.$store.dispatch('loading/toggleLoading', true)
      console.log('from location', firebase.auth().currentUser.uid)
      const userData = await this.$fire.firestore
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
      console.log('user first name', userData.data().firstName)
      this.formData.firstName = userData.data().firstName
      this.formData.lastName = userData.data().lastName
      this.formData.email = userData.data().email
      this.formData.roles = userData.data().roles
      this.formData.subscription = userData.data().subscription
      // this.formData.location = userData.data().location

      const usedMethod = await firebase
        .auth()
        .fetchSignInMethodsForEmail(userData.data().email)
      if (usedMethod.includes('google.com')) {
        this.signinMethod = 'google'
      } else if (usedMethod.includes('password')) {
        this.signinMethod = 'password'
      }
      this.$store.dispatch('loading/toggleLoading', false)
    } catch (ex) {
      this.$store.dispatch('loading/toggleLoading', false)
      console.log(ex)
    }
  },
  methods: {
    async setLocation() {
      try {
        this.$store.dispatch('loading/toggleLoading', true)
        await this.$fire.firestore
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update(this.formData)
        console.log('data to be commited', this.formData)
        this.$store.dispatch('auth/setUserData', this.formData)
        this.$router.push('/dashboard')
        this.$store.dispatch('loading/toggleLoading', false)
      } catch (ex) {
        console.log(ex)
        this.$store.dispatch('loading/toggleLoading', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>