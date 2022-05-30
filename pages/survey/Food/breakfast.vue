<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of breakfast?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="egg"
              v-model="radio"
              value="egg"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="egg" class="flex items-start cursor-pointer">
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
              Eggs</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="oats"
              v-model="radio"
              value="oats"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="oats" class="flex items-start cursor-pointer">
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
              Oats & Cereals</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="bread"
              v-model="radio"
              value="bread"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="bread" class="flex items-start cursor-pointer">
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
              Bread and Bakery</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="juice"
              v-model="radio"
              value="juice"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="juice" class="flex items-start cursor-pointer">
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
              Juice & Yogurt</label
            >
          </div>
          <div class="flex items-center mr-4 mb-t text-white">
            <button class="rounded-xl bg-green-600 px-5" @click="targetValue()">
              Next
            </button>
          </div>
        </div>
      </div>
      <div class="image">
        <!-- <img src="~/assets/images/frame.svg" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
    }
  },
  methods: {
    targetValue() {
      this.$router.push('/Survey/Food/Breakfast/' + this.radio)
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  width: 350px;
  @apply ml-20;
}
.optionBlock {
  width: 1000px;
  display: flex;
  @apply mt-20 mx-auto;
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
