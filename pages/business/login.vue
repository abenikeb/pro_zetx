<template>
  <div class="flex items-start justify-center py-20 px-4">
    <div class="max-w-sm w-full space-y-8 bg-white shadow-lg p-10 rounded-xl">
      <div>
        <h1 class="text-center text-accent text-4xl font-black border-b pb-4">
          GreenCheddar
        </h1>
        <h2 class="mt-6 text-center text-xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <!-- Login forms -->

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

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="
                h-4
                w-4
                text-indigo-600
                focus:ring-accent
                border-gray-300
                rounded
              "
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
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
      </form>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'guest',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    // this method  will get email and password to login users

    async signinUser() {
      this.$store.dispatch('loading/toggleLoading', true)
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        // this.$store.dispatch('loading/toggleLoading', false)
      } catch (e) {
        this.$store.dispatch('loading/toggleLoading', false)
        alert(e)
      }
    },
  },
}
</script>

<style scoped></style>
