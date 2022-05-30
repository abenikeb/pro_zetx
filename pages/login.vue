<template>
  <div
    class="
      flex-col
      md:flex
      items-start
      md:items-center
      justify-center
      py-10
      px-4
    "
  >
    <div
      class="
        max-w-sm
        overflow-hidden
        md:w-1/2
        space-y-2
        bg-white
        shadow-lg
        p-10
        rounded-xl
      "
    >
      <div>
        <div class="w-20 mx-auto">
          <img src="~/assets/images/logo.svg" class="w-full" alt="" />
        </div>
        <h2 class="mt-6 text-center text-xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <!-- Login forms -->
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
            <p class="text-gray-600 text-2xs dark:text-gray-200">
              {{ errorMessage }}
            </p>
          </div>
        </div>
        <i
          class="
            fa fa-times
            hover:text-red-600
            absolute
            top-10
            right-3
            cursor-pointer
          "
          @click="showError = false"
        ></i>
      </div>
      <form class="space-y-6" @submit.prevent="signinUser">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label class="text-gray-700" for="email">Email address</label>
            <input
              id="email"
              v-model="formData.email"
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
                placeholder-gray-300
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
              "
              placeholder="example@example.com"
            />
          </div>
          <div>
            <label class="text-gray-700" for="password">Password</label>
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
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
                placeholder-gray-300
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="**********"
            />
          </div>
        </div>

        <div class="md:flex items-center md:justify-between">
          <div class="text-sm justify-center">
            <nuxt-link
              to="/forgetpassword"
              class="
                font-medium
                text-blue-700
                hover:text-blue-800 hover:underline
              "
            >
              Forgot your password?
            </nuxt-link>
          </div>
        </div>

        <div class="flex items-center justify-start text-sm">
          <div class="flex items-center">
            <p class="text-black">Don't have an account?</p>
          </div>

          <div class="text-md">
            <nuxt-link
              to="/signup"
              class="btn btn-sm btn-link text-accent-800 btn-sm"
              >Sign up</nuxt-link
            >
          </div>
        </div>

        <div>
          <button
            id="login"
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
            Sign in
          </button>
        </div>
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
          @click="googleSignin"
        >
          <div class="w-4 h-4">
            <img
              src="~/assets/images/Google.svg"
              alt=""
              class="w-auto h-auto"
            />
          </div>
          <h1 class="text-accent font-bold text-md">Continue with Google</h1>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  layout: 'guest',
  middleware: 'guest',
  created() {
    console.log('from', this.$nuxt.context.from.path)
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      errorMessage: '',
      showError: false,
    }
  },

  methods: {
    // allows user to login using google and saves the data returned to the firestore
    async googleSignin() {
      let exists = false
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const user = await this.$fire.auth.signInWithPopup(provider)
        const snapshot = await this.$fire.firestore.collection('users').get()
        snapshot.forEach((doc) => {
          // console.log('docdata', doc.data())
          if (doc.data().email === user.additionalUserInfo.profile.email) {
            exists = true
          }
        })
        console.log('exists', exists)

        if (!exists) {
          const usersRef = this.$fire.firestore
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
          await usersRef.set({
            uid: firebase.auth().currentUser.uid,
            firstName: user.additionalUserInfo.profile.given_name,
            lastName: user.additionalUserInfo.profile.family_name,
            location: '',
            email: user.additionalUserInfo.profile.email,
            tel: '',
            roles: ['user'],
            subscription: 'free',
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
            id: firebase.auth().currentUser.uid,
            firstName: user.additionalUserInfo.profile.given_name,
            lastName: user.additionalUserInfo.profile.family_name,
            location: '',
            email: user.additionalUserInfo.profile.email,
            tel: '',
            roles: ['user'],
            subscription: 'free',
            date: new Date().toLocaleDateString('en-GB'),
          })
          return this.$router.push('/profile/location')
          // await firebase.auth().currentUser.delete()
        }
      } catch (ex) {
        console.log('Some error occured')
        console.log(ex)
      }
    },
    // this method  will get email and password to login users
    async signinUser() {
      const signInMethod = await firebase
        .auth()
        .fetchSignInMethodsForEmail(this.formData.email)
      console.log(signInMethod)
      if (
        (signInMethod.includes('password') &&
          signInMethod.includes('google.com')) ||
        signInMethod.includes('password')
      ) {
        this.$store.dispatch('loading/toggleLoading', true)
        try {
          await this.$fire.auth.signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          // this.$store.dispatch('loading/toggleLoading', false)
          this.$router.push('/dashboard/content')
        } catch (e) {
          this.$store.dispatch('loading/toggleLoading', false)
          alert(e)
        }
      } else if (signInMethod.includes('google.com')) {
        if (process.browser) {
          window.scrollTo(0, 0)
        }
        this.errorMessage =
          'Looks like you signed up using google or you have switched to logging in using google. Try logging in using google instead'
        this.showError = true
      } else {
        this.$store.dispatch('loading/toggleLoading', true)
        try {
          await this.$fire.auth.signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          // if (this.$nuxt.context.from.path == '/') {
          //   this.$router.push('/dashboard/content')
          // } else if (this.$nuxt.context.from.path == '/business') {
          //   this.$router.push('/business/dashboard')
          // }
          this.$router.push('dashboard/content')

          // this.$store.dispatch('loading/toggleLoading', false)
        } catch (e) {
          this.$store.dispatch('loading/toggleLoading', false)
          alert(e)
        }
      }
    },
  },
}
</script>

<style scoped>
/* form * {
  font-family: Arial, Helvetica, sans-serif;
} */
</style>
