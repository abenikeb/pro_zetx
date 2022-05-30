<template>
  <div class="container">
    <section v-if="pageLoading" class="box">
      <div class="box-heading">Please wait, Loading...</div>
    </section>

    <section v-else-if="alreadyEmployee" class="box">
      <div class="box-heading">You have already joined!</div>

      <div class="box-body font-bold">
        You are already an employee at {{ business.Name }}
      </div>
    </section>
    <section v-else-if="businessOwner" class="box">
      <div class="box-heading">Notice!</div>

      <div class="box-body font-bold">
        You are the owner of {{ business.Name }}
      </div>
    </section>

    <section v-else-if="error" class="box">
      <div class="box-heading">Error Occured</div>

      <div class="box-body font-bold">
        Business information provided doesn't have required data to process join
        request.
      </div>
    </section>
    <section v-else class="box">
      <div class="box-heading">Join Business Request</div>

      <div class="box-body">
        {{ business.Name }} sent you a request to join their business as an
        associate, join their company to share awareness on carbon emissions.
      </div>

      <div class="box-action">
        <button class="success" @click="handleJoin">Join</button>
        <button class="reject" @click="handleReject">Reject</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  layout: 'empty',
  middleware: ['auth'],
  data() {
    return {
      error: false,
      pageLoading: true,
      alreadyEmployee: false,
      businessOwner: false,
      business: undefined as any | undefined,
    }
  },
  async mounted() {
    const { b } = this.$router.currentRoute.query
    const uid = this.$fire.auth.currentUser?.uid

    if (typeof b === 'undefined') {
      this.pageLoading = false
      this.error = true
      return
    }

    const businessRef = this.$fire.firestore
      .collection('business')
      .doc(b as string)
    const business = await businessRef.get()

    // Business doesn't exist
    if (!business.exists) {
      this.error = true
    }

    this.business = { id: business.id, ...business.data() }

    if (
      (
        this.business?.Employees as Array<{
          employeeId: string
          active: boolean
        }>
      ).find((employee) => employee.employeeId === uid)
    ) {
      this.pageLoading = false
      this.alreadyEmployee = true
    }

    // if ((this.business?.Requests as Array<string>).includes(uid as string)) {
    //   this.error = true
    //   this.pageLoading = false
    //   return
    // }

    this.pageLoading = false
    if (this.business.BusinessOwnerId === uid) {
      this.error = true
      this.pageLoading = false
      this.businessOwner = true
      return
    }
  },

  methods: {
    async handleJoin() {
      const businessRef = this.$fire.firestore
        .collection('business')
        .doc(this.business.id)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...updatedBusiness } = this.business

      const uid = this.$fire.auth.currentUser?.uid

      const walletCapacity = this.$fire.firestore
        .collection('wallet')
        .where('userId', '==', uid)
      const walletRef = await walletCapacity.get()

      updatedBusiness.Employees = _.concat(updatedBusiness.Employees, [
        {
          employeeId: this.$fire.auth.currentUser?.uid,
          status: 'active',
          carbonCoinBalance: walletRef.docs[0].data().carbonCreditBalance,
        },
      ])

      updatedBusiness.Requests = _.remove(
        updatedBusiness.Requests,
        (el) => el !== uid
      )

      const currentUser = this.$fire.auth.currentUser
      const employeeWalletAmount = await this.$store.dispatch(
        'business/walletCapacity',
        currentUser?.uid
      )
      const { ...wallet } = employeeWalletAmount

      const noEmp = (await businessRef.get()).data()?.Employees.length + 1

      updatedBusiness.CarbonCreditBalance =
        (updatedBusiness.CarbonCreditBalance + wallet.carbonCreditBalance) /
        noEmp

      this.$router.replace('/business/success')
      try {
        await businessRef.update(updatedBusiness)
        this.$router.push('/business/success')
      } catch {
        this.error = true
      }
    },
    handleReject() {
      this.$router.push('/dashboard')
    },
  },
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.container > .box {
  @apply rounded shadow
    border border-green-200 border-opacity-20
    mt-16;

  min-width: 60%;
  max-width: 70%;
  min-height: 300px;
  background-color: #009168aa;

  display: flex;
  flex-direction: column;
  gap: 2em;
}

.box .box-heading {
  @apply self-center text-2xl text-yellow-400 ml-10;

  margin-top: 1em;
  text-transform: uppercase;
  font-weight: bold;
}

.box .box-body {
  @apply self-center text-2xl text-gray-100;
  max-width: 85%;
  margin-bottom: auto;
  text-align: center;
}

.box .box-action {
  width: 85%;
  margin: 0 auto;
  padding: 1em 0;
  display: flex;
  justify-content: center;
  gap: 1em;
}

.box .box-action button {
  @apply btn btn-sm rounded border-none md:w-32 w-24;
}

.box-action button.success {
  @apply bg-gray-50 transition-shadow duration-200 ease-in-out;
  color: #009168;
}

.box-action button.success:hover {
  @apply shadow-md;
}

.box-action button.reject {
  @apply bg-gray-50 bg-opacity-10 text-gray-200 transition-all duration-200 ease-in-out;
}

.box-action button.reject:hover {
  @apply bg-opacity-50;
  color: #ebfffa;
}
</style>
