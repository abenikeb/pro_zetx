<template>
  <div>
    <div class="grid">
      <nuxt-link to="breakfast">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Breakfast</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/survey/Food/lunch">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Lunch</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/survey/Food/waste">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Waste & Recycling</p>
        </div>
      </nuxt-link>

      <div class="square flex items-center justify-center">
        <p class="font-bold text-lg">Dinner</p>
      </div>
      <div class="square flex items-center justify-center">
        <p class="font-bold text-lg">Snack</p>
      </div>
      <nuxt-link to="/survey/Food/dinner">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Dinner</p>
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
  width: 1000px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.square {
  width: 250px;
  height: 250px;
  margin: 30px;
  background-color: white;
  cursor: pointer;
  @apply rounded-xl shadow-xl hover:text-white;
}
.square:hover {
  background-color: #009168;
}
</style>
