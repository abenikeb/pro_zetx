<template>
  <div>
    <div
      class="
        max-w-md
        mx-auto
        bg-white
        rounded-xl
        overflow-hidden
        shadow-md
        md:max-w-2xl
      "
    >
      <!-- :src="require`~/assets/images/business/${advertise.images}`" -->
      <div class="flex-col">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-72 md:w-full"
            src="~/assets/images/business/advertise1.png"
            alt="`${advertise.images}`"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-lg text-accent font-semibold"
          >
            {{ advertise.title }}
          </div>
          <a
            href="http://localhost:3000/business/"
            class="
              block
              mt-1
              text-lg
              leading-tight
              font-medium
              text-black
              hover:underline
            "
            >{{ advertise.highlight }}</a
          >
          <p class="mt-2 text-gray-500">
            {{ advertise.body }}
          </p>
          <nuxt-link
            to="/business"
            class="btn btn-accent btn-sm rounded-full mt-4"
            >Read More</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['advertise'],
}
</script>
