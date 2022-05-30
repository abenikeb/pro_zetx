
<template>
  <div>
    <div class="mx-40 float-left max-w-sm">
      <h1 class="mb-6 pt-6">What portion size?</h1>
      <div class="">
        <div class="flex items-start mr-4 mb-4">
          <input id="radio1" type="radio" name="radio" class="hidden" />
          <label for="radio1" class="flex items-start cursor-pointer">
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
            Standard Serving ~ 500kJ - 600kJ
          </label>
        </div>
        <div class="flex items-center mr-4 mb-4">
          <input id="radio2" type="radio" name="radio" class="hidden" />
          <label for="radio2" class="flex items-start cursor-pointer">
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
            Above Standard ~ +600kJ
          </label>
        </div>

        <div class="flex items-center mr-4 mb-4">
          <input id="radio3" type="radio" name="radio" class="hidden" />
          <label for="radio3" class="flex items-start cursor-pointer">
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
            Below Standard ~ 0kJ - 500kJ
          </label>
        </div>
        <div class="flex items-center mr-4 mb-t text-black">
          <button @click=";(isHidden = !isHidden), (value = 'final')">
            Categories
          </button>
        </div>
        <div class="flex items-center mr-4 mb-t text-black">
          <button @click=";(isHidden = !isHidden), (value = 'final')">
            Finsh
          </button>
        </div>
      </div>
    </div>
    <div class="foat-right"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
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
