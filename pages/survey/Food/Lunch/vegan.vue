<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Pasta / Rice ?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="pbm"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="pbm"
            />
            <label for="pbm" class="flex items-start cursor-pointer">
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
              Plant Based Meats
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="tofu"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="tofu"
            />
            <label for="tofu" class="flex items-start cursor-pointer">
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
              Tofu
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="rp"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="rp"
            />
            <label for="rp" class="flex items-start cursor-pointer">
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
              Rice and Pasta
            </label>
          </div>
          <div class="flex items-start mr-4 mb-4">
            <input
              id="vn"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="vn"
            />
            <label for="vn" class="flex items-start cursor-pointer">
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
              Vegetables & Nuts
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="bl"
              v-model="radio"
              type="radio"
              name="radio"
              class="hidden"
              value="bl"
            />
            <label for="bl" class="flex items-start cursor-pointer">
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
              Beans & Legumes
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
        <img class="" src="~assets/images/vegan.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
