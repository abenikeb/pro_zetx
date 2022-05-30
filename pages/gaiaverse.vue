<template>
  <coming-soon
    details="We're working on these! We are planning to reward you with Digital Plants so that someday you can have a digital garden or you can sell these as art in the form of an NFT."
  ></coming-soon>
</template>

<script>
import Vue from 'vue'
import ComingSoon from '~/components/UI/ComingSoon.vue'
export default Vue.extend({
  components: {
    ComingSoon,
  },
  layout: 'empty',
})
</script>
