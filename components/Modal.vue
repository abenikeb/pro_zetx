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
            <i class="fa fa-shopping-cart mr-3"></i>Order Details
          </h6>
        </div>
        <div class="h-60 overflow-auto">
          <div class="flex items-center w-full md:px-5 text-sm mt-4">
            <div class="flex flex-col">
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Buyer</h1>
                <h1 class="ml-5 md:truncate">{{ order.buyerName }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Seller</h1>
                <h1 class="ml-5 truncate">{{ order.sellerName }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Order Date</h1>
                <h1 class="ml-5">
                  {{
                    new Date(
                      order.orderDate.seconds * 1000
                    ).toLocaleDateString()
                  }}
                </h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Added Tax</h1>
                <h1 class="ml-5 truncate">{{ order.price.addedTax }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Gross Price</h1>
                <h1 class="ml-5 truncate">{{ order.price.grossPrice }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Net Price</h1>
                <h1 class="ml-5 truncate">{{ order.price.netPrice }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Payment Type</h1>
                <h1 class="ml-5">{{ order.paymentType }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Product Name</h1>
                <h1 class="ml-5">{{ order.product.product.name }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Quantity</h1>
                <h1 class="ml-5">{{ order.product.quantity }}</h1>
              </div>
              <div class="flex items-center justify-center px-16 py-5">
                <h1 class="font-bold">Status</h1>
                <h1 class="ml-5">{{ order.status }}</h1>
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
    order: Object,
  },
}
</script>