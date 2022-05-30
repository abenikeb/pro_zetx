<template>
  <div class="flex flex-col mx-4 md:mx-96 mt-20 md:mt-96 gap-2">
    <p class="text-2xl font-bold success-text">
      You have Successfully Joined the Company
    </p>
    <p>
      <span>Please wait, if the page doesn't automatically redirect </span>
      <a href="../dashboard">click here</a>.
    </p>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: ['auth'],
  created() {
    setTimeout(() => {
      this.$router.push('../dashboard')
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
