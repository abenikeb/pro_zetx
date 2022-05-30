<template>
  <!-- max-w-lg -->
  <div class="bg-gray-100 h-auto rounded-md w-5/6 mx-auto lg:mx-0 lg:w-64">
    <nuxt-link
      :to="`productView/${product.id}`"
      class="flex flex-row justify-center"
    >
      <img
        v-if="product.images.length > 0"
        :src="product.images[0]"
        class="w-full h-48 lg:h-36 object-cover rounded-t-md"
        alt="Product image"
      />
      <img
        v-else
        src="~assets/images/product/product_not_found.png"
        class="w-full h-48 lg:h-36 object-cover rounded-t-md"
        alt="Product image placeholder"
      />
    </nuxt-link>
    <div class="px-4 pb-4">
      <div class="my-4">
        <p class="text-lg font-bold">{{ product.name }}</p>
        <span class="text-sm font-semibold">{{ product.price }} £ </span> +
        <span class="text-sm font-semibold"
          >{{ product.carbonReduction }} CC</span
        >
      </div>
      <div class="btn-container">
        <button ref="editBtn" class="edit-btn" @click.prevent="openUpdateModal">
          <img
            src="~/assets/images/product/edit-solid.svg"
            alt="Edit Product Button"
          />
          Edit
        </button>
        <button class="delete-btn" @click="deleteProduct(product)">
          <img
            src="~/assets/images/product/trash-alt-solid.svg"
            alt="Delete Product Button"
          />
          <div class="mt-0.5">Delete</div>
        </button>
      </div>
    </div>
    <v-dialog />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      openedModal: false,
      trashID: '',
      settings: {
        singular: true,
        title: 'Remove',
        body: 'Product Deleted Successfully',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(0, 0, 0, 0.6)',
        defaultTitle: true,
        canTimeout: true,
        canPause: false,
        iconEnabled: true,
        draggable: true,
        dragThreshold: 0.75,
        hideProgressbar: false,
        duration: 3000,
        theme: 'light',
        baseIconClass: '',
        orderLatest: true,
        transition: null,
        oneType: false,
        maxToasts: 6,
      },
    }
  },
  props: ['product'],
  methods: {
    deleteBtnId() {
      return `delete-btn-${this.product.id}`
    },
    openUpdateModal() {
      // console.log('Openning', this.product.id)
      this.$emit('pass_Update_modal', this.product.id)
    },
    deleteProduct(item) {
      this.$modal.show('dialog', {
        title: 'Warning! You are deleting a product!',
        text: `Are you sure you want to remove this product? ${item.name}`,
        buttons: [
          {
            title: 'Delete',
            handler: () => {
              this.$store.dispatch('loading/toggleLoading', true)
              this.$store.dispatch('products/deleteProduct', {
                productId: item.id,
              })
              this.$store.dispatch('loading/toggleLoading', false)

              this.$modal.hide('dialog')

              this.$vToastify.error(this.settings)
              this.$router.push({
                path: '/dashboard/product/manage',
              })
            },
          },
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            },
          },
        ],
      })
    },
  },
})
</script>

<style scoped>
.btn-container {
  @apply flex
    flex-col md:flex-row flex-nowrap
    justify-center md:justify-start
    gap-1;
}

.delete-btn {
  @apply btn btn-xs
    bg-red-400 hover:bg-red-700
    rounded
    border-none
    text-red-50 text-xs
    h-6
    flex-none;
}

.edit-btn {
  @apply btn btn-xs btn-accent
    text-xs text-green-50
    border-none
    h-6
    rounded
    flex-1;
  height: -8px !important;
}

.edit-btn,
.delete-btn {
  display: flex;
  align-content: center;
  justify-items: center;
}

.delete-btn img,
.edit-btn img {
  @apply h-3 mr-0.5 pb-0.5;
}
</style>
