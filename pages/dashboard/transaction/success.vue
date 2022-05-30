<template>
  <div class="flex flex-col items-center justify-center py-48 gap-2">
    <p class="text-2xl font-bold success-text">
      Payment Completed Successfully
    </p>
    <p>
      <span>Please wait, if the page doesn't automatically redirect </span>
      <a href="/dashboard/transaction">click here</a>.
    </p>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      this.$router.push('/dashboard/transaction')
    }, 4000)
  },
}
</script>

<style scoped>
.success-text {
  color: #11c411;
}

p span {
  color: darkgray;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>
