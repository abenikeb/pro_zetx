<template>
  <div>
    <div class="optionBlock">
      <h1 class="font-bold">How much did you spend on the products?</h1>
    </div>
    <progress class="progress mt-2" :value="value * 2" max="100"></progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 34,
    }
  },
}
</script>

<style lang="scss" scoped>
.optionBlock {
  width: 1000px;
  display: flex;
  @apply mt-20 mx-auto;
}
progress::-webkit-progress-bar {
  height: 10px;
  margin: 0 auto;
  background-color: #dadada;
  border-radius: 100px;
}
progress::-webkit-progress-value {
  height: 10px;
  background: #009168;
  border-radius: 100px;
}
.progress {
  width: 400px;
}
</style>
