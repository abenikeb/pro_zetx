<template>
  <div>
    <div class="optionBlock">
      <div class="mx-12">
        <h1 class="mb-6 pt-6 font-bold">What portion size?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="Sandwiches/Wraps"
              type="radio"
              name="radio"
              class="hidden"
              @click="value = 'Sandwiches/Wraps'"
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
              Standard Serving ~ 500kj - 600kj
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="Pasta"
              type="radio"
              name="radio"
              class="hidden"
              @click="value = 'Pasta&Rice'"
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
              ></span
              >Above Standard ~ +600kj</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="Meat"
              type="radio"
              name="radio"
              class="hidden"
              @click="value = 'Meat&ish'"
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
              ></span
              >Below Standard ~ 0kj - 500kj</label
            >
          </div>
          <div class="flex items-center mr-4 mb-t text-white">
            <button
              class="rounded-xl bg-green-600 px-5"
              @click=";(isHidden = !isHidden), (values = value)"
            >
              Next
            </button>
            <!-- <nuxt-link to="/survey/Food/Lunch/sandwiches">
              <div class="square flex items-center justify-center">
                <p class="font-bold text-lg text-black">Next</p>
              </div>
            </nuxt-link> -->
          </div>
        </div>
      </div>
      <div class="image">
        <img src="~assets/images/portion.png" alt="" />
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
  @apply mt-20 mx-auto;
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
