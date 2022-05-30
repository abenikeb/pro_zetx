<template>
  <div
    class="
      w-screen
      h-screen
      bg-black bg-opacity-50
      fixed
      top-0
      left-0
      flex
      justify-center
      items-center
    "
  >
    <div
      class="
        gap-2
        w-11/12
        md:w-1/2
        lg:w-2/5
        mx-auto
        bg-white
        rounded-md
        p-5
        md:p-10
        flex flex-col
        justify-start
        items-center
      "
    >
      <i class="fa fa-check-circle text-accent text-7xl"></i>
      <h1 class="text-2xl md:text-4xl">Success</h1>
      <p class="text-sm md:text-base text-gray-500 text-center">
        You have successfully bought a monthly Green Cheddar
        <span class="text-accent font-semibold text-xl">Premium</span>
        Subscription.
      </p>
      <nuxt-link class="btn btn-sm md:btn-md btn-accent mt-5" to="/"
        ><i class="fa fa-arrow-left mr-1"></i> Home</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'auth',

  computed: {
    authUser() {
      return this.$store.state.auth.authUser
    },
  },

  async created() {
    const uid = this.authUser.uid
    const userRef = this.$fire.firestore.collection('users').doc(uid)
    let userData = null
    await userRef
      .get()
      .then((user) => {
        if (user.exists) {
          userData = user.data()
        } else {
          alert(
            "We couldn't find your account. Please make sure you have registered and signed in."
          )
          return this.$router.push('/')
        }
      })
      .catch((error) => {
        return alert('Error getting document:', error.message)
      })

    try {
      userData.subscription = 'premium'
      userRef.update(userData)
    } catch (error) {
      return alert(error.message)
    }
  },
}
</script>
