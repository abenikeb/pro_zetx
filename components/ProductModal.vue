<template>
  <div
    class="
      w-full
      md:w-screen
      h-screen
      flex
      justify-center
      items-center
      fixed
      top-0
      left-0
      z-50
      bg-black bg-opacity-40
    "
  >
    <div
      class="
        w-full
        md:w-1/2
        p-10
        flex flex-col
        relative
        justify-center
        m-4
        md:m-0
        shadow-lg
        rounded-xl
        mt-2
        bg-white
      "
    >
      <span
        class="absolute top-2 right-4 text-3xl text-red-700 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div class="flex flex-col justify-center">
        <div class="text-center mb-5">
          <h6 class="text-3xl font-semibold text-center">
            <i class="fa fa-shopping-bag mr-3"></i>Product Details
          </h6>
        </div>
        <div class="h-60 overflow-auto">
          <div class="flex items-center w-full md:px-5 text-sm mt-4">
            <div class="flex flex-col">
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Product</h1>
                <h1 class="ml-5">{{ product.name }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">product Date</h1>
                <h1 class="ml-5">{{ typeof product.postedDate === 'string'
            ? new Date(Date.parse(product.postedDate)).toLocaleString()
            : new Date(product.postedDate * 1000).toLocaleDateString() }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Quantity</h1>
                <h1 class="ml-5">{{ product.inventory.instock }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Carbon Reduction</h1>
                <h1 class="ml-5">{{ product.carbonReduction }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Price</h1>
                <h1 class="ml-5">{{ product.price }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Status</h1>
                <h1 class="ml-5">{{ product.status }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Product owner</h1>
                <h1 class="ml-5">{{ product.creator }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
}
</script>