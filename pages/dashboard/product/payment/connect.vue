<template>
  <div class="container">
    <section v-if="loading" class="success">Please Wait...</section>

    <section v-else-if="error" class="error">
      Error exists <span>{{ error }}</span>
    </section>

    <section v-else-if="exists" class="error">
      Info
      <span
        >Your acconut is already registered with GreenCheddar. Thank you</span
      >
    </section>

    <section v-else class="success">
      Thank you for verifying your payment account.
      <div>
        Your stripe account is now linked with GreenCheddar, you can withdraw
        from your account any time.
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: '',
  middleware: ['auth'],

  data() {
    return {
      error: undefined as undefined | string,
      exists: false,
      loading: true,
    }
  },

  async created() {
    const currentUserId = this.$fire.auth.currentUser?.uid
    const sellerNotRegistered = (
      await this.$fire.firestore
        .collection('marketplaceSeller')
        .where('userId', '==', currentUserId)
        .limit(1)
        .get()
    ).empty

    this.loading = false

    if (!sellerNotRegistered) {
      this.exists = true
      return
    }
    const route = this.$router.currentRoute.fullPath
    const params = this.$router.currentRoute.query

    const recieved = {
      userId: params.ai,
      stripeAccountId: params.si,
    }

    if (
      Object.values(recieved)
        .map((val) => typeof val)
        .includes('undefined')
    ) {
      this.throwError()
      return
    }

    if (currentUserId !== recieved.userId) {
      this.throwError()
      return
    }

    console.log({
      route,
      params,
      currentUserId,
    })

    this.$fire.firestore.collection('marketplaceSeller').add({
      userId: currentUserId,
      stripeAccountId: recieved.stripeAccountId,
    })
  },

  methods: {
    throwError() {
      this.error = 'Required verification data not provided'

      // TODO: Set timeout and leave page
    },
  },
})
</script>

<style scoped>
.container {
  width: 100%;
}

.container > section.error {
  @apply text-lg text-gray-300 font-bold
    py-2;

  display: inline-block;
  margin: 0 auto;
  text-transform: uppercase;
}

.container > section > span,
.container > section.success {
  @apply text-2xl text-gray-700 font-bold
    py-2;

  display: inline-block;
  margin: 0 auto;
}

.container > section.success div {
  @apply text-base font-normal text-gray-400;
}
</style>
