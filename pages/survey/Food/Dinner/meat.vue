<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Meat / Fish ?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="chicken"
              v-model="radio"
              value="chicken"
              type="radio"
              class="hidden"
            />
            <label for="chicken" class="flex items-start cursor-pointer">
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
              Chicken
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="beef"
              v-model="radio"
              type="radio"
              v-bind="beef"
              class="hidden"
            />
            <label for="beef" class="flex items-start cursor-pointer">
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
              Beef
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="lamb"
              v-model="radio"
              type="radio"
              value="lamb"
              class="hidden"
            />
            <label for="lamb" class="flex items-start cursor-pointer">
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
              Lamb
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="turkey"
              v-model="radio"
              value="turkey"
              type="radio"
              class="hidden"
            />
            <label for="turkey" class="flex items-start cursor-pointer">
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
              Turkey
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="salmon"
              v-model="radio"
              value="salmon"
              type="radio"
              class="hidden"
            />
            <label for="salmon" class="flex items-start cursor-pointer">
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
              Salmon
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="tuna"
              v-model="radio"
              value="tuna"
              type="radio"
              class="hidden"
            />
            <label for="tuna" class="flex items-start cursor-pointer">
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
              Tuna
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="prawns"
              v-model="radio"
              value="prawns"
              type="radio"
              class="hidden"
            />
            <label for="prawns" class="flex items-start cursor-pointer">
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
              Prawns
            </label>
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
        <img class="" src="~assets/images/meatC.png" alt="" />
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
