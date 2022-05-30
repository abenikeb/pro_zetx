<template>
  <div>
    <Loading />

    <nuxt />
  </div>
</template>

<script>
import Loading from '~/components/UI/Loading.vue'
export default {
  components: {
    Loading,
  },
}
</script>
