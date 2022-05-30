<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Sandwiches/wrap ?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="sandwichesC"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="sandwichesC"
            />
            <label for="sandwichesC" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Chicken Sandwiches
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="sandwichesE"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="sandwichesE"
            />
            <label for="sandwichesE" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Egg Sandwiches</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="sandwichesS"
              v-model="radio"
              value="sandwichesS"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="sandwichesS" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Seafood Sandwiches</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="sandwichesB"
              v-model="radio"
              value="sandwichesB"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="sandwichesB" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Beef sandwiches</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input
              id="sandwichesCH"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="sandwichesCH"
            />
            <label for="sandwichesCH" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Cheese Sandwiches</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input
              id="sandwichesH"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="sandwichesH"
            />
            <label for="sandwichesH" class="flex items-start cursor-pointer">
              <span
                class="
                  w-5
                  h-5
                  inline-block
                  mr-2
                  rounded-full
                  border border-grey
                  flex-no-shrink
                "
              ></span>
              Ham Sandwiches</label
            >
          </div>
          <div class="flex items-center mr-4 mb-t text-white">
            <!-- <button
              class="rounded-xl bg-green-600 px-5"
              @click=";(isHidden = !isHidden), (values = value)"
            >
              Next
            </button> -->
            <nuxt-link to="/survey/Food/Lunch/portion">
              <div class="square flex items-center justify-center">
                <p class="font-bold text-lg text-black">Next</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="image">
        <img class="" src="~assets/images/sandwiches.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      radio: '',
    }
  },
  methods: {
    navigate() {
      this.$router.push('/survey/Food/Dinner/' + this.radio)
    },
  },
})
</script>

<style scoped>
.optionBlock {
  width: 1000px;
  display: flex;
  @apply mt-32 mx-auto;
}
.image {
  width: 500px;
  @apply mx-14;
}

input[type='radio'] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type='radio'] + label span:hover,
input[type='radio'] + label:hover span {
  transform: scale(1.2);
}

input[type='radio']:checked + label span {
  background-color: #049630;
  box-shadow: 0px 0px 0px 1px white inset;
}

input[type='radio']:checked + label {
  color: #049630;
}
</style>
