<template>
  <div>
    <div class="grid">
      <nuxt-link to="#">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Plastic</p>
        </div>
      </nuxt-link>
      <nuxt-link to="#">
        <div class="square flex items-center justify-center">
          <p class="font-bold text-lg">Non-Plastic</p>
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
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.square {
  width: 250px;
  height: 250px;
  background-color: white;
  cursor: pointer;
  @apply mx-14 my-5 rounded-xl shadow-xl hover:text-white;
}
.square:hover {
  background-color: #009168;
}
</style>
