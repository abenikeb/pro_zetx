<template>
  <section class="w-full h-full py-10">
    <div
      class="
        rounded-xl
        flex
        items-start
        justify-center
        px-10
        p-5
        bg-white
        shadow-lg
        w-3/5
        md:w-1/2
        lg:w-1/3
        mx-auto
      "
    >
      <div class="max-w-sm w-full space-y-2">
        <h1 class="text-center text-accent text-4xl font-black border-b pb-2">
          GreenCheddar
        </h1>
        <h2 class="mt-2 text-center text-xl font-extrabold text-gray-900">
          Sign Up
        </h2>

        <div>
          <!-- Sign up users forms -->

          <form class="space-y-4" @submit.prevent="createUser">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
              <div class="mb-2">
                <label for="email" class="text-black">Business Name</label>
                <input
                  id="fname"
                  v-model="formData.name"
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
              <!-- <div class="mb-2 pb-2">
                <label for="email" class="text-black">Last Name</label>
                <input
                  id="lname"
                  v-model="formData.lastName"
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
              <div class="mb-2 pb-2">
                <label for="password" class="text-black">Password</label>
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
                    placeholder-gray-500
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
              <div>
                <label for="password" class="text-black"
                  >Confirm Password</label
                >
                <input
                  id="confirm-password"
                  v-model="formData.confirmPassword"
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
                    placeholder-gray-500
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

            <div class="flex items-center justify-start text-sm">
              <div class="flex items-center">
                <p class="text-black">Already have an account?</p>
              </div>

              <div class="text-md">
                <nuxt-link
                  to="/business/login"
                  class="btn btn-sm btn-link text-accent-800 btn-sm"
                  >Login</nuxt-link
                >
              </div>
            </div>

            <div>
              <button
                id="signup"
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
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'guest',
  middleware: 'guest',

  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },

  methods: {
    // method to create new users by setting the from data to firestore users collections

    async createUser() {
      try {
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
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          roles: ['user', 'classifier', 'admin', 'superadmin', 'business'],
        })
        // console.log(userDataSnapshot)
        await this.$fire.auth.currentUser.sendEmailVerification()
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
