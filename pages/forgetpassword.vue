<template>
  <section class="w-full h-full py-10">
    <div
      class="
        rounded-xl
        flex
        items-start
        justify-center
        md:px-10
        px-4
        py-5
        bg-white
        shadow-lg
        w-4/5
        md:w-1/3
        mx-auto
      "
    >
      <div class="flex items-start justify-center py-20 px-4">
        <div class="w-full space-y-8">
          <div>
            <h1
              class="
                text-center text-accent text-2xl
                md:text-4xl
                font-black
                border-b
                pb-4
              "
            >
              GreenCheddar
            </h1>
            <h2
              class="
                mt-6
                text-center text-lg
                md:text-xl
                font-extrabold
                text-gray-900
              "
            >
              Find your account
            </h2>
            <p class="mt-3 text-2xs md:text-sm text-gray-500">
              Enter your email and we'll send you a link to get back into your
              account.
            </p>
          </div>

          <!-- email input form -->

          <form class="space-y-6" @submit.prevent="resetPassword">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
              <div class="mb-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  v-model="formData.email"
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
              <button
                id="forgetPassword"
                type="submit"
                class="
                  group
                  relative
                  w-full
                  flex
                  justify-center
                  py-2
                  px-6
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
                Get reset link
              </button>

              <nuxt-link to="/signup">
                <p
                  class="
                    text-center text-md text-gray-500
                    hover:text-accent
                    border-t
                    mt-6
                    font-black
                  "
                >
                  Or create account
                </p>
              </nuxt-link>
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
  data() {
    return {
      formData: {
        email: '',
      },
    }
  },
  methods: {
    // Method to send password reset links

    async resetPassword() {
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.formData.email)
        alert('Password reset link has been sent to your email')
      } catch (error) {
        alert('This email is not found')
        // console.log(error.message)
      }
    },
  },
}
</script>
