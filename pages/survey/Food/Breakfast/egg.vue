<template>
  <div>
    <div class="optionBlock">
      <div class="mx-14">
        <h1 class="mb-6 font-bold">What type of Eggs?</h1>
        <div class="">
          <div class="flex items-start mr-4 mb-4">
            <input id="Soft" type="radio" name="radio" class="hidden" checked />
            <label for="Soft" class="flex items-start cursor-pointer">
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
              Soft Boiled Eggs</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Hard" type="radio" name="radio" class="hidden" />
            <label for="Hard" class="flex items-start cursor-pointer">
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
              Hard Boiled Eggs</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Scrambled" type="radio" name="radio" class="hidden" />
            <label for="Scrambled" class="flex items-start cursor-pointer">
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
              Scrambled Eggs</label
            >
          </div>

          <div class="flex items-center mr-4 mb-4">
            <input id="Fried" type="radio" name="radio" class="hidden" />
            <label for="Fried" class="flex items-start cursor-pointer">
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
              Fried Eggs</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Omelettes" type="radio" name="radio" class="hidden" />
            <label for="Omelettes" class="flex items-start cursor-pointer">
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
              Omelettes</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Poached" type="radio" name="radio" class="hidden" />
            <label for="Poached" class="flex items-start cursor-pointer">
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
              Poached Eggs</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Full" type="radio" name="radio" class="hidden" />
            <label for="Full" class="flex items-start cursor-pointer">
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
              Full English Breakfast</label
            >
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="Benedict" type="radio" name="radio" class="hidden" />
            <label for="Benedict" class="flex items-start cursor-pointer">
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
              Eggs Benedict</label
            >
          </div>
        </div>
        <nuxt-link to="/Survey/Food/portion"
          ><div class="flex items-center mr-4 mb-t text-white">
            <button class="rounded-xl bg-green-600 px-5">Next</button>
          </div></nuxt-link
        >
      </div>
      <div class="image">
        <img src="~/assets/images/egg.png" alt="" />
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
