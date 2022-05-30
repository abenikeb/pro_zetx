<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Dinner?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="Sandwiches/Wraps"
              v-model="radio"
              type="radio"
              class="hidden"
              value="sandwiches"
            />
            <label
              for="Sandwiches/Wraps"
              class="flex items-start cursor-pointer"
            >
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
              Sandwiches/Wraps
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="Pasta"
              v-model="radio"
              class="hidden"
              type="radio"
              value="pasta"
            />
            <label for="Pasta" class="flex items-start cursor-pointer">
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
              Pasta & Rice</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input
              id="vegan"
              v-model="radio"
              class="hidden"
              type="radio"
              value="vegan"
            />
            <label for="vegan" class="flex items-start cursor-pointer">
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
              Vegan</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input
              id="Meat"
              v-model="radio"
              class="hidden"
              type="radio"
              value="meat"
            />
            <label for="Meat" class="flex items-start cursor-pointer">
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
              Meat & Fish</label
            >
          </div>

          <div class="flex items-center mr-4 mb-t text-white">
            <button class="rounded-xl bg-green-600 px-5" @click="navigate()">
              Next
            </button>
          </div>
        </div>
      </div>
      <div class="image">
        <img src="~assets/images/lunch1.png" alt="" />
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
