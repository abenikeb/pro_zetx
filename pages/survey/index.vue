<template>
  <div>
    <div class="grid">
      <nuxt-link to="Survey/Food/">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Food</p>
        </div>
      </nuxt-link>
      <nuxt-link to="#">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Transportation</p>
        </div>
      </nuxt-link>
      <nuxt-link to="#">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Household</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/survey/shopping">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Shopping</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.grid {
  width: 750px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.square {
  width: 250px;
  height: 250px;
  background-color: white;
  cursor: pointer;
  @apply rounded-xl mx-14 my-5 shadow-xl hover:text-white;
}
.square:hover {
  background-color: #009168;
}
</style>
