<template>
  <section class="w-full h-full py-10">
    <div
      class="
        rounded-xl
        flex
        items-start
        justify-center
        px-4
        py-10
        bg-white
        shadow-lg
        md:w-2/3
        lg:w-1/3
        mx-5
        md:mx-auto
      "
    >
      <div class="max-w-sm w-full space-y-2">
        <!-- <h1
          class="
            text-center text-accent text-2xl
            md:text-4xl
            font-black
            border-b
            pb-2
          "
        >
          GreenCheddar
        </h1> -->
        <div class="w-20 mx-auto">
          <img src="~/assets/images/logo.svg" class="w-full" alt="" />
        </div>
        <h2
          class="
            mt-2
            text-center text-lg
            md:text-xl
            font-extrabold
            text-accent-focus
          "
        >
          Sign Up
        </h2>

        <!-- Sign up users forms -->
        <div>
          <!-- Error Alert -->
          <div
            v-if="showError"
            class="
              relative
              my-5
              flex
              w-full
              max-w-sm
              mx-auto
              overflow-hidden
              bg-white
              rounded-lg
              shadow-md
              dark:bg-gray-800
            "
          >
            <div class="flex items-center justify-center w-12 bg-red-500">
              <svg
                class="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                />
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-red-500 dark:text-red-400"
                  >Error</span
                >
                <p class="text-sm text-gray-600 dark:text-gray-200">
                  {{ errorMessage }}
                </p>
              </div>
            </div>
            <i
              @click="showError = false"
              class="
                fa fa-times
                hover:text-red-600
                absolute
                top-5
                right-3
                cursor-pointer
              "
            ></i>
          </div>
          <form class="space-y-4" @submit.prevent="createUser">
            <!-- <input type="hidden" name="remember" value="true" /> -->
            <div class="rounded-md shadow-sm -space-y-px">
              <div class="mb-2">
                <label for="email" class="text-black">Full Name</label>
                <input
                  id="fname"
                  v-model="formData.fullName"
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
                  placeholder="Enter full name (E.g. John Doe)"
                />
              </div>
              <!-- <div class="mb-2 pb-2">
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
              </div> -->
              <div class="mb-2 pb-2">
                <label for="email" class="text-black">Email address</label>
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
                <label for="password" class="text-black">Password</label>
                <input
                  id="password"
                  v-model="formData.password"
                  name="password"
                  type="password"
                  autocomplete="off"
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
                  placeholder="**********"
                />
              </div>
              <div>
                <label for="password" class="text-black"
                  >Confirm Password</label
                >
                <input
                  id="confirm-password"
                  v-model="formData.confirmPassword"
                  name="confirm-password"
                  type="password"
                  autocomplete="off"
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
                  placeholder="**********"
                />
              </div>
            </div>

            <div class="flex items-center justify-start text-sm">
              <div class="flex items-center">
                <p class="text-black">Already have an account?</p>
              </div>

              <nuxt-link
                to="/login"
                class="btn btn-sm btn-link text-accent-800 btn-sm"
                >Login</nuxt-link
              >
            </div>

            <div>
              <button
                id="signup"
                type="submit"
                class="
                  group
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
                Create Account
              </button>

              <h1
                class="
                  mt-5
                  flex
                  justify-center
                  items-center
                  text-xs
                  font-bold
                  text-accent
                  w-full
                "
              >
                OR
              </h1>

              <div
                class="
                  mt-5
                  flex
                  w-auto
                  justify-center
                  items-center
                  gap-x-4
                  border border-accent
                  bg-white
                  cursor-pointer
                  hover:text-white
                  p-3
                "
                @click="googleSignup"
              >
                <div class="w-4 h-4">
                  <img
                    src="~/assets/images/Google.svg"
                    alt=""
                    class="w-auto h-auto"
                  />
                </div>
                <h1 class="text-accent font-bold text-md">
                  Continue with Google
                </h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import firebase from 'firebase'
import cities from '~/gb'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
export default {
  components: {
    VuePhoneNumberInput,
  },
  layout: 'guest',
  middleware: 'guest',

  props: {
    clearable: true,
    fetchCountry: true,
  },

  data() {
    return {
      cities,
      formData: {
        fullName: '',
        // lastName: '',
        email: '',
        // location: '',
        // tel: '',
        password: '',
        confirmPassword: '',
      },
      showError: false,
      errorMessage: '',
    }
  },

  methods: {
    // allows user to login using google and saves the data returned to the firestore
    // async googleSignup() {
    //   let exists = false
    //   try {
    //     const provider = new firebase.auth.GoogleAuthProvider()
    //     const user = await this.$fire.auth.signInWithPopup(provider)
    //     const snapshot = await this.$fire.firestore.collection('users').get()
    //     snapshot.forEach((doc) => {
    //       if (doc.data().email === user.additionalUserInfo.profile.email) {
    //         exists = true
    //       }
    //     })
    //     if (exists) {
    //       alert('Looks like you have already signed up')
    //       this.$store.dispatch('loading/toggleLoading', false)
    //       return this.$router.push('/dashboard')
    //     } else {
    //       const usersRef = this.$fire.firestore
    //         .collection('users')
    //         .doc(firebase.auth().currentUser.uid)
    //       await usersRef.set({
    //         firstName: user.additionalUserInfo.profile.given_name,
    //         lastName: user.additionalUserInfo.profile.family_name,
    //         location: '',
    //         email: user.additionalUserInfo.profile.email,
    //         tel: '',
    //         roles: ['user'],
    //         subscription: 'free',
    //         date: new Date().toLocaleDateString('en-GB'),
    //       })
    //       // console.log(userDataSnapshot)
    //       const walletRef = this.$fire.firestore.collection('wallet')
    //       walletRef.add({
    //         userId: firebase.auth().currentUser.uid,
    //         carbonCreditBalance: 0,
    //         moneyBalance: 0,
    //       })
    //       this.$store.dispatch('loading/toggleLoading', false)
    //       await this.$store.dispatch('auth/setUserData', {
    //         id: firebase.auth().currentUser.uid,
    //         firstName: user.additionalUserInfo.profile.given_name,
    //         lastName: user.additionalUserInfo.profile.family_name,
    //         location: '',
    //         email: user.additionalUserInfo.profile.email,
    //         tel: '',
    //         roles: ['user'],
    //         subscription: 'free',
    //         date: new Date().toLocaleDateString('en-GB'),
    //       })
    //       return this.$router.push('/profile/location')
    //     }
    //   } catch (ex) {
    //     console.log('Some error occured')
    //     console.log(ex)
    //   }
    // },
    // allows user to login using google and saves the data returned to the firestore
    async googleSignup() {
      let exists = false
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const user = await this.$fire.auth.signInWithPopup(provider)
        const snapshot = await this.$fire.firestore
          .collection('users')
          .where('email', '==', user.additionalUserInfo.profile.email)
          .get()
        exists = !snapshot.empty
        // snapshot.forEach((doc) => {
        //   if (doc.data().email === user.additionalUserInfo.profile.email) {
        //     exists = true
        //   }
        // })
        if (exists) {
          // alert('Looks like you have already signed up')
          const fireUser = snapshot.docs[0]
          await this.$store.dispatch('auth/setUserData', {
            uid: firebase.auth().currentUser.uid,
            firstName: fireUser.firstName,
            lastName: fireUser.lastName,
            location: fireUser.location,
            email: fireUser.email,
            tel: fireUser.tel,
            roles: fireUser.roles,
            subscription: fireUser.subscription,
            userName: fireUser.userName,
            date: new Date().toLocaleDateString('en-GB'),
          })
          this.$store.dispatch('loading/toggleLoading', false)
          return this.$router.push('/dashboard/content')
        } else {
          const usersRef = this.$fire.firestore
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
          await usersRef.set({
            firstName: user.additionalUserInfo.profile.given_name,
            lastName: user.additionalUserInfo.profile.family_name,
            location: '',
            email: user.additionalUserInfo.profile.email,
            tel: '',
            roles: ['user'],
            subscription: 'free',
            userName: '',
            date: new Date().toLocaleDateString('en-GB'),
          })
          // console.log(userDataSnapshot)
          const walletRef = this.$fire.firestore.collection('wallet')
          walletRef.add({
            userId: firebase.auth().currentUser.uid,
            carbonCreditBalance: 0,
            moneyBalance: 0,
          })
          this.$store.dispatch('loading/toggleLoading', false)
          await this.$store.dispatch('auth/setUserData', {
            uid: firebase.auth().currentUser.uid,
            firstName: user.additionalUserInfo.profile.given_name,
            lastName: user.additionalUserInfo.profile.family_name,
            location: '',
            email: user.additionalUserInfo.profile.email,
            tel: '',
            roles: ['user'],
            subscription: 'free',
            userName: '',
            date: new Date().toLocaleDateString('en-GB'),
          })
          return this.$router.push('/profile/location')
        }
      } catch (ex) {
        console.log('Some error occured')
        console.log(ex)
      }
    },
    // method to create new users by setting the from data to firestore users collections
    async createUser() {
      let validFullName = false
      const fullName = this.formData.fullName.split(' ')
      if (fullName.length >= 2) {
        validFullName = true
      } else {
        if (process.browser) {
          window.scrollTo(0, 0)
        }
        this.errorMessage = 'Please enter a valid full name'
        this.showError = true
        // alert('Please enter a valid full name')
      }
      if (this.formData.password.length < 6) {
        if (process.browser) {
          window.scrollTo(0, 0)
        }
        this.errorMessage = 'Password too short'
        this.showError = true
        return
        // return alert('Password too short')
      }
      if (this.formData.password !== this.formData.confirmPassword) {
        if (process.browser) {
          window.scrollTo(0, 0)
        }
        this.errorMessage = 'Passwords do not match'
        this.showError = true
        return
        // return alert('Passwords do not match')
      }
      try {
        const signInMethod = await firebase
          .auth()
          .fetchSignInMethodsForEmail(this.formData.email)
        console.log('signup method', signInMethod)
        if (
          (signInMethod.includes('password') &&
            signInMethod.includes('google.com')) ||
          signInMethod.includes('password')
        ) {
          alert('Email already in use login instead')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else if (signInMethod.includes('google.com')) {
          alert('You have already signed up using google please login instead')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else if (validFullName) {
          const userSnapshot =
            await this.$fire.auth.createUserWithEmailAndPassword(
              this.formData.email,
              this.formData.password
            )
          // console.log(userSnapshot.user.uid)
          const usersRef = this.$fire.firestore
            .collection('users')
            .doc(userSnapshot.user.uid)
          const userDataSnapshot = await usersRef.set({
            firstName: fullName[0],
            lastName: fullName[1],
            location: '',
            email: this.formData.email,
            tel: '',
            roles: ['user'],
            subscription: 'free',
            userName: '',
            date: new Date().toLocaleDateString('en-GB'),
          })
          // console.log(userDataSnapshot)
          await this.$fire.auth.currentUser.sendEmailVerification()
          const walletRef = this.$fire.firestore.collection('wallet')
          walletRef.add({
            userId: userSnapshot.user.uid,
            carbonCreditBalance: 0,
            moneyBalance: 0,
          })
        }
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<style scoped>
.input {
  @apply appearance-none
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
                    sm:text-sm;
}
</style>
