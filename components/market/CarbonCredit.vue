<template>
  <div class="w-1/2 md:w-1/4 px-2 pb-4">
    <div
      class="
        w-full
        flex flex-col
        justify-start
        items-center
        bg-gray-300
        shadow-lg
        rounded-xl
        p-3
        md:p-5
        relative
      "
    >
      <span
        class="
          bg-accent-focus
          text-white
          px-1
          py-0.5
          text-2xs
          absolute
          top-1
          right-1
          rounded-lg
        "
        >{{ auction.data.bids.length }} bids</span
      >
      <h2 class="text-3xl md:text-4xl font-bold text-center">
        {{ auction.data.amount }}
      </h2>
      <div class="w-full border-b-2 text-center my-2 pb-2">
        <svg
          class="mx-auto"
          width="48"
          viewBox="0 0 79 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.5296 35.1075C37.3859 38.2342 36.5444 41.0009 35.0051 43.4076C33.4657 45.7937 31.3003 47.645 28.509 48.9615C25.7381 50.278 22.567 50.9363 18.9957 50.9363C13.1051 50.9363 8.46649 49.0129 5.07989 45.1663C1.6933 41.3197 0 35.8892 0 28.8748V26.6532C0 22.2512 0.759418 18.4046 2.27825 15.1133C3.81762 11.8015 6.02403 9.25085 8.89751 7.46125C11.771 5.65108 15.096 4.74599 18.8726 4.74599C24.3116 4.74599 28.6834 6.1859 31.9879 9.06572C35.2924 11.925 37.1704 15.8744 37.622 20.9141H26.8465C26.7644 18.1783 26.0768 16.2138 24.7837 15.0208C23.4906 13.8277 21.5203 13.2312 18.8726 13.2312C16.1838 13.2312 14.2134 14.2391 12.9614 16.255C11.7094 18.2709 11.0526 21.4901 10.991 25.9127V29.0908C10.991 33.8836 11.5863 37.3085 12.7767 39.3655C13.9877 41.4226 16.0607 42.4511 18.9957 42.4511C21.4792 42.4511 23.3778 41.8648 24.6913 40.6923C26.0049 39.5198 26.7028 37.6582 26.7849 35.1075H37.5296Z"
            fill="#009640"
          />
          <path
            d="M78.9076 35.1075C78.764 38.2342 77.9224 41.0009 76.3831 43.4076C74.8437 45.7937 72.6784 47.645 69.887 48.9615C67.1161 50.278 63.9451 50.9363 60.3737 50.9363C54.4831 50.9363 49.8445 49.0129 46.4579 45.1663C43.0713 41.3197 41.378 35.8892 41.378 28.8748V26.6532C41.378 22.2512 42.1374 18.4046 43.6563 15.1133C45.1956 11.8015 47.4021 9.25085 50.2755 7.46125C53.149 5.65108 56.474 4.74599 60.2506 4.74599C65.6897 4.74599 70.0614 6.1859 73.3659 9.06572C76.6704 11.925 78.5485 15.8744 79 20.9141H68.2245C68.1424 18.1783 67.4548 16.2138 66.1617 15.0208C64.8687 13.8277 62.8983 13.2312 60.2506 13.2312C57.5618 13.2312 55.5915 14.2391 54.3394 16.255C53.0874 18.2709 52.4306 21.4901 52.3691 25.9127V29.0908C52.3691 33.8836 52.9643 37.3085 54.1547 39.3655C55.3657 41.4226 57.4387 42.4511 60.3737 42.4511C62.8572 42.4511 64.7558 41.8648 66.0694 40.6923C67.383 39.5198 68.0808 37.6582 68.1629 35.1075H78.9076Z"
            fill="#009640"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.2632 0V9.3617H56.2574V3.0691e-07L63.2632 0Z"
            fill="#009640"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.2632 45.6383V55H56.2574V45.6383H63.2632Z"
            fill="#009640"
          />
        </svg>
      </div>
      <div
        class="
          w-full
          flex flex-col
          md:flex-row
          items-start
          md:items-center
          justify-start
          md:justify-between
        "
      >
        <div class="w-full">
          <h3 class="text-2xs md:text-sm text-center">
            <span class="">Starting Bid:</span>
            <span class="font-bold">{{ auction.data.price }}$</span>
          </h3>

          <h3 class="text-2xs md:text-sm text-center">
            <span class="">Largest Bid:</span>
            <span class="font-bold">{{ auction.data.price }}$</span>
          </h3>
        </div>

        <button
          class="btn btn-accent btn-sm mt-2 mx-auto"
          @click="showModal = true"
        >
          Place a bid
        </button>
      </div>
    </div>
    <div
      v-if="showModal"
      class="
        w-screen
        h-screen
        justify-center
        items-center
        fixed
        top-0
        left-0
        z-50
      "
    >
      <buyCreditModal :auction="auction" @close-modal="showModal = false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import buyCreditModal from '~/components/market/buyCreditModal.vue'
export default Vue.extend({
  components: {
    buyCreditModal,
  },

  props: {
    auction: Object,
  },

  data() {
    return {
      showModal: false,
    }
  },
})
</script>

<style scoped></style>
