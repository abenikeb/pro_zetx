<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Pasta / Rice ?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="pastaB"
              v-model="radio"
              value="pastaB"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="pastaB" class="flex items-start cursor-pointer">
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
              Pasta Bolognese (Meat)
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="pastaC"
              v-model="radio"
              type="radio"
              name="radio"
              value="pastaC"
              class="hidden"
            />
            <label for="pastaC" class="flex items-start cursor-pointer">
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
              Pasta Carbonara (Eggs)
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="pastaP"
              v-model="radio"
              value="pastaP"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="pastaP" class="flex items-start cursor-pointer">
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
              Pasta Pesce (Fish)
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="pastaV"
              v-model="radio"
              type="radio"
              name="radio"
              value="pastaV"
              class="hidden"
            />
            <label for="pastaV" class="flex items-start cursor-pointer">
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
              Pasta (Vegetarian)
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="riceB"
              v-model="radio"
              type="radio"
              name="radio"
              value="riceB"
              class="hidden"
            />
            <label for="riceB" class="flex items-start cursor-pointer">
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
              Rice (Beef)
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="riceV"
              v-model="radio"
              type="radio"
              name="radio"
              value="riceV"
              class="hidden"
            />
            <label for="riceV" class="flex items-start cursor-pointer">
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
              Rice (Vegetarian)
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="riceF"
              v-model="radio"
              type="radio"
              value="riceF"
              name="radio"
              class="hidden"
            />
            <label for="riceF" class="flex items-start cursor-pointer">
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
              Rice (Fish)
            </label>
          </div>
          <div class="flex items-center mr-4 mb-t text-white">
            <!-- <button
              class="rounded-xl bg-green-600 px-5"
              @click=";(isHidden = !isHidden), (values = value)"
            >
              Next
            </button> -->
            <nuxt-link to="/survey/Food/portion">
              <div class="square flex items-center justify-center">
                <p class="font-bold text-lg text-black">Next</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="image">
        <img class="" src="~assets/images/pasta.png" alt="" />
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
