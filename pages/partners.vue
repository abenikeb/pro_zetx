<template>
  <div class="w-full flex flex-col justify-start items-center py-4">
    <h2 class="text-lg md:text-xl font-semibold">Let's become partners</h2>
    <div
      class="
        w-full
        flex flex-col
        md:flex-row
        mt-4
        shadow-lg
        bg-gray-200
        px-4
        justify-start
        items-center
        md:justify-evenly md:items-start
      "
    >
      <div class="justify-center items-center mt-6 flex flex-col pr-4">
        <img class="w-16 h-16" src="~assets/images/1st.svg" alt="" />
        <h2 class="mt-1 pr-8 font-semibold text-accent">
          Rewards and Recognition
        </h2>
        <p class="w-full md:w-3/4 mx-auto mb-3 text-xs md:text-sm mt-2">
          Work with us to create a culture of rewarding recognition at your
          company by acknowledging your employees' positive actions towards
          reducing their personal carbon footprint.
        </p>
      </div>

      <div class="justify-center items-center mt-6 flex flex-col pr-4">
        <img class="w-16 h-16" src="~assets/images/2nd.svg" alt="" />
        <h2 class="mt-1 pr-8 font-semibold text-accent">Retailers</h2>
        <p class="w-full md:w-3/4 mx-auto mb-3 text-xs md:text-sm mt-2">
          GreenCheddar provides you with metrics so you can better position your
          sustainable products and services to acquire new clients and increase
          your retention.
        </p>
      </div>

      <div class="justify-center items-center mt-6 flex flex-col pr-4">
        <img class="w-16 h-16" src="~assets/images/3rd.svg" alt="" />
        <h2 class="mt-1 pr-8 font-semibold text-accent">
          Become a Green Partner
        </h2>
        <p class="w-full md:w-3/4 mx-auto mb-3 text-xs md:text-sm mt-2">
          Explore the different ways we can work together so your company can
          become part of the ESG community and improve its public image.
        </p>
      </div>
    </div>

    <div class="w-full flex flex-col justify-center items-center mt-6">
      <div
        class="
          w-full
          md:w-1/2
          flex flex-col
          md:flex-row
          justify-center
          items-center
          px-16
          mt-8
        "
      >
        <carousel :per-page="1" :loop="true" :autoplay="true">
          <slide>
            <img class="rounded-xl" src="~/assets/images/image.png" alt="" />
          </slide>
          <slide>
            <img class="rounded-xl" src="~/assets/images/image1.png" alt="" />
          </slide>
          <slide>
            <img class="rounded-xl" src="~/assets/images/image2.png" alt="" />
          </slide>
          <slide>
            <img class="rounded-xl" src="~/assets/images/image3.png" alt="" />
          </slide>
        </carousel>
        <div class="flex flex-col">
          <span class="px-5 mt-3"
            >You can find NFT's that represent our brand down below
          </span>
          <span class="px-5 text-blue-500"
            ><a href="https://opensea.io/bloomsburyibex" target="_blank"
              >https://opensea.io/bloomsburyibex</a
            ></span
          >
        </div>
      </div>
      <div
        class="
          w-full
          flex flex-col
          md:flex-row
          justify-center
          items-center
          px-16
          mt-8
        "
      >
        <div class="w-full md:w-1/5 h-20 flex shadow-lg rounded-xl">
          <img src="~/assets/images/indiegogo.svg" alt="" class="px-4 pr-1" />
          <!-- <h2 class="text-3xl font-semibold m-2">Indigogo</h2> -->
        </div>
        <div class="flex flex-col">
          <span class="px-5 mt-3"
            >Below is our indiegogo campaign for funding our project
          </span>
          <span class="px-5 text-pink-500"
            ><a
              href="https://www.indiegogo.com/projects/save-the-earth--11#/"
              target="_blank"
              >https://www.indiegogo.com/projects/save-the-earth--11#/</a
            ></span
          >
        </div>
      </div>
      <div class="mt-8 justify-center items-center px-6">
        <h2 class="text-lg md:text-xl font-semibold px-12 text-center">
          Want to know more
        </h2>

        <span class=""
          >contact us if you want more information about the project</span
        >
      </div>
      <nuxt-link
        to="/contact"
        class="btn btn-sm btn-accent justify-center items-centers mt-2"
        >Contact us</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
/* .bg-set {
  background-image: url('../assets/images/Mask.png');
} */
</style>
