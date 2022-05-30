<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14 my-10">
        <h1 class="mb-6 pt-6 font-bold">What type of waste?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input
              id="fosil"
              value="fosil"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="fosil" class="flex items-start cursor-pointer">
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
              Fossil Fuel Waste(Plastics)
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input
              id="biogenic"
              value="biogenic"
              type="radio"
              name="radio"
              class="hidden"
            />
            <label for="biogenic" class="flex items-start cursor-pointer">
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
              Biogenic Waste(Food)
            </label>
          </div>
        </div>
        <nuxt-link to="/Survey/waste/spent"
          ><div class="flex items-center mr-4 mb-t text-white">
            <button class="rounded-xl bg-green-600 px-5">Next</button>
          </div></nuxt-link
        >
      </div>
      <div class="image">
        <img src="~/assets/images/recycle.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
  @apply mt-10 mx-auto;
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
