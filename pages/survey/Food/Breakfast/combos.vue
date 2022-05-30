<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 font-bold">Any Combos?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input id="Chocolate" type="radio" name="radio" class="hidden" />
            <label for="Chocolate" class="flex items-start cursor-pointer">
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
              Chocolate
            </label>
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Coffee" type="radio" name="radio" class="hidden" />
            <label for="Coffee" class="flex items-start cursor-pointer">
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
              Coffee
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Cereals" type="radio" name="radio" class="hidden" />
            <label for="Cereals" class="flex items-start cursor-pointer">
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
              Cereals
            </label>
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Avocado" type="radio" name="radio" class="hidden" />
            <label for="Avocado" class="flex items-start cursor-pointer">
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

              Avocado
            </label>
          </div>
        </div>
        <nuxt-link to="/Survey/Food/portion"
          ><div class="flex items-center mr-4 mb-t text-white">
            <button class="rounded-xl bg-green-600 px-5">Next</button>
          </div></nuxt-link
        >
      </div>
      <div class="image">
        <img src="~/assets/images/combos.png" alt="" />
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
  width: 250px;
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
