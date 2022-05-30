<template>
  <div
    class="
      w-screen
      h-screen
      flex
      justify-center
      items-center
      fixed
      top-0
      left-0
      z-50
      bg-black bg-opacity-40
    "
  >
    <div
      class="
        md:w-1/2
        p-4
        md:p-10
        flex-row
        md:flex-col
        relative
        justify-center
        shadow-lg
        rounded-xl
        bg-white
      "
    >
      <span
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div>
        <div v-if="info === 'budget'">
          <h1 class="font-bold mb-4">Budget</h1>
          <p>
            A budget is the maximum amount of money you intend to spend in your
            auction. It's also a cost control tool. It helps control your
            overall spending in a single auction set.
          </p>
        </div>

        <div v-else-if="info === 'employee_wallet_capacity'">
          <h1 class="font-bold mb-4">Employee Wallet Capacity</h1>
          <p>
            Employee Wallet Capacity means your employee carbon coin range
            amount.
          </p>
        </div>

        <div v-else-if="info === 'estimated_cc_amount'">
          <h1 class="font-bold mb-4">Estimated Carbon Coin Result</h1>
          <p>
            Estimated Carbon Coin Result means you are allowed to buy this
            amount CC amount - Max. --This is depand on your employee wallet
            capacity. --If empoyee has not sufficent amount of CC you are not
            allowd to buy CC --
          </p>
        </div>

        <div v-else-if="info === 'carbon_coin'">
          <h1 class="font-bold mb-4">Employee Carbon Coin Wallet Range</h1>
          <p>
            Here is the maximum amount of carbon coins in your employee's
            wallets. It helps you make an educated decision when you set the
            number of carbon coins you want to purchase.
          </p>
          <section>
            <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div class="w-full">
                <div class="bg-white mx-auto rounded-md shadow-lg mb-4 p-4">
                  <div class="flex flex-row items-center">
                    <div
                      class="help underline-offset-1 ml-2"
                      @click="showModalInfo('employee_wallet_capacity')"
                    >
                      <div class="mask-1">
                        <img class="" />
                      </div>
                      <span></span>
                    </div>
                  </div>
                  <!-- <div
                    class="
                      bg-gray-200
                      rounded-md
                      px-2
                      mb-2
                      h-10
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <p><b>Min</b></p>
                    <p>{{ dataItem.minCapacity }} CC</p>
                    <p>1 people</p>
                  </div> -->
                  <div
                    class="
                      bg-gray-200
                      rounded-md
                      px-2
                      mb-2
                      h-10
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <b>Max</b>
                    <p>{{ dataItem.maxCapacity }} CC</p>
                    <p>1 people</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['info', 'dataItem'],

  data() {
    return {}
  },

  computed: {},

  async created() {},

  methods: {},
})
</script>

<style scoped></style>
