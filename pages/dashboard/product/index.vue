<template>
  <div class="container">
    <h1>Manage Products</h1>

    <div class="">
      <div class="btn-container">
        <div class="add-product-btn">
          <button
            class="flex flex-col justify-center items-center gap-2"
            @click.prevent="openModal"
          >
            <img
              src="~/assets/images/product/plus-circle.svg"
              class="w-1/4"
              alt=""
            />
            <p class="font-light text-white">Create Product</p>
          </button>
        </div>
        <div class="manage-products-btn">
          <nuxt-link to="product/manage">
            <div>
              <div class="img-container">
                <img
                  src="~/assets/images/product/cog-box.svg"
                  class="w-1/4"
                  alt=""
                />
              </div>
              <p>Manage Product</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <CreateProductModal />
  </div>
</template>

<script>
import CreateProductModal from '~/components/product/CreateProductModal.vue'

export default {
  components: {
    CreateProductModal,
  },
  layout: 'auth',
  middleware: ['auth', 'product'],
  mounted() {},
  methods: {
    openModal() {
      this.$modal.show('create-product')
    },
  },
}
</script>

<style scoped>
.container {
  @apply flex flex-col
    max-w-md
    overflow-hidden
    md:max-w-full md:items-center
    items-center
    h-full
    px-4 md:p-0;
  height: 100% !important;
}

.container h1 {
  @apply font-bold text-gray-600 mt-16 mb-8 text-2xl;
}

.container > div {
  @apply flex justify-center items-center;
}

.btn-container {
  @apply flex flex-col gap-1
    md:flex-row md:divide-x-4
    md:gap-4 md:divide-gray-200;
}

.add-product-btn {
  @apply bg-gray-300
    md:bg-gray-300 rounded-lg
    md:w-80 w-60 md:h-56 h-36
    flex justify-center items-center
    md:ml-4 ml-4;
}

.manage-products-btn {
  @apply bg-gray-300 rounded-lg
    md:rounded-none md:bg-gray-50
    md:w-80 w-60 md:h-56
    h-36 flex justify-center
    items-center md:mr-4 ml-4;
}

.manage-products-btn div {
  @apply flex flex-col justify-center items-center gap-2;
}

.manage-products-btn .img-container img {
  @apply md:bg-gray-300 md:p-2 md:rounded-md;
}

.manage-products-btn div p {
  @apply font-light text-white
    md:text-gray-300 md:font-bold;
}
</style>
