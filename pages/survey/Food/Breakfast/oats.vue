<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 pt-6 font-bold">What type of Oats & Cereals?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input id="Cornflakes" type="radio" name="radio" class="hidden" />
            <label for="Cornflakes" class="flex items-start cursor-pointer">
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
              Cornflakes</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Muesli" type="radio" name="radio" class="hidden" />
            <label for="Muesli" class="flex items-start cursor-pointer">
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
              Muesli</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Oats" type="radio" name="radio" class="hidden" />
            <label for="Oats" class="flex items-start cursor-pointer">
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
              Oats / Oat Porridge</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Bran" type="radio" name="radio" class="hidden" />
            <label for="Bran" class="flex items-start cursor-pointer">
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
              Bran flakes
            </label>
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Granola" type="radio" name="radio" class="hidden" />
            <label for="Granola" class="flex items-start cursor-pointer">
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
              Granola</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Wheat" type="radio" name="radio" class="hidden" />
            <label for="Wheat" class="flex items-start cursor-pointer">
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
              Wheat Flakes</label
            >
          </div>
          <nuxt-link to="/Survey/Food/Breakfast/milk"
            ><div class="flex items-center mr-4 mb-t text-white">
              <button class="rounded-xl bg-green-600 px-5">Next</button>
            </div></nuxt-link
          >
        </div>
      </div>
      <div class="image">
        <img src="~/assets/images/oats.png" alt="" />
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
