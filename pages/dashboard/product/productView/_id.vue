<template>
  <div class="px-2">
    <!-- START MOBILE SECTION -->
    <div
      class="
        mobile-item
        max-w-md
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        overflow-hidden
      "
    >
      <div
        class="flex flex-col md:flex-row p-0 md:p-16 gap-0 md:gap-8 relative"
      >
        <nuxt-link
          to="/dashboard/product/manage"
          class="absolute text-sm font-bold top-2 left-1"
        >
          <span class="back-btn flex flex-row gap-2">
            <img
              src="~/assets/images/product/back_112351.png"
              class="w-4"
              alt=""
            />
            Back
          </span>
        </nuxt-link>
        <!-- Start Header Images -->
        <div>
          <div class="md:flex-shrink-0">
            <img
              v-if="product.images.length > 0"
              class="
                h-56
                w-full
                object-cover
                md:h-96 md:w-96 md:border-2 md:border-white
              "
              :src="activeImage ? activeImage : product.images[0]"
              alt="No images"
            />
            <img
              v-else
              src="~assets/images/product/product_not_found.png"
              class="
                h-56
                w-full
                object-cover
                md:h-96 md:w-96 md:border-2 md:border-white
              "
              alt=""
            />

            <!-- <img
              class="
                h-56
                w-full
                object-cover
                md:h-96 md:w-96 md:border-2 md:border-white
              "
              :src="activeImage ? activeImage : product.images[0]"
              alt="No images"
            /> -->
          </div>
          <div
            class="
              max-w-full
              flex flex-row
              justify-center
              items-center
              gap-4
              bg-gray-200
              md:bg-white
              h-20
              md:h-32
              overflow-hidden
            "
          >
            <div v-for="(image, index) in product.images" :key="index">
              <img
                :class="
                  activeImage == image
                    ? 'rounded-xl w-16 h-16 border-2 border-accent shadow-2xl cursor-pointer'
                    : 'rounded-xl w-16 h-16 border-2 border-white cursor-pointer'
                "
                :src="image"
                @click="selectImage(image)"
              />
            </div>
          </div>
          <!-- End Header Images -->
        </div>

        <!-- Start Body section -->
        <div class="p-8 md:w-1/2">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="font-bold text-xl">{{ product.name }}</h1>
            </div>
          </div>
          <div class="mt-4">
            <h1 class="font-bold text-lg">Product Price</h1>
            <div class="mb-4 flex flex-row items-center mb-0 md:mb-8">
              <p class="font-bold text-lg text-accent">
                {{ `£${product.price} ` }}
              </p>
              <p class="font-bold text-lg text-accent">
                {{ `+ ${product.carbonReduction} CC` }}
              </p>
            </div>
          </div>
          <div class="mb-4 md:mb-8">
            <h1 class="font-bold text-lg">Product Description</h1>
            <p class="text-sm text-clip">
              {{ product.description }}
            </p>
          </div>

          <!-- START Inventory Manage -->
          <div class="flex flex-col items-start mb-4">
            <div class="flex gap-2">
              <!-- <img
                src="~/assets/images/product/inventory_.svg"
                class="w-6"
                alt=""
              /> -->
              <span><b>Inventory Manage:</b> </span>
            </div>
            <p>
              {{ `In stock = ${product.inventory.forsale} ` }}
            </p>
          </div>
          <!-- END Inventory Manage -->

          <div v-if="product.inventory.forsale == 0">
            <h1 class="ml-2 mt-2 text-red-500 font-bold text-xs">
              This items is out of stock please add the product..
            </h1>
          </div>

          <!-- START Product tags -->
          <div class="mb-4">
            <h1 class="font-bold text-lg">Product Tags</h1>
            <div class="flex flex-row items-center gap-2">
              <div v-for="(tag, index) in product.tags" :key="index">
                <h1
                  class="text-sm text-white font-bold bg-accent rounded-lg px-4"
                >
                  {{ tag }}
                </h1>
              </div>
            </div>
          </div>
          <!-- START Product tags -->

          <div class="">
            <h1 class="font-bold text-lg">Category</h1>
            <div class="flex flex-row gap-2 mb-4">
              {{ product.category }}
            </div>
          </div>
          <!-- Edit | Delete Button Section -->
          <div
            class="
              flex flex-col flex-nowrap
              justify-center
              gap-1
              space-y-2
              mb-4
            "
          >
            <button
              class="btn btn-xs text-xs h-8 md:h-6"
              @click.prevent="openUpdateModal"
            >
              <img
                src="~/assets/images/product/edit.svg"
                class="w-4 mr-1"
                alt=""
              />
              Edit
            </button>
            <button
              class="
                btn btn-xs btn-outline
                text-red-500 text-xs
                modal-button
                h-8
                md:h-6
              "
              @click="deleteProduct(product)"
            >
              <img
                src="~/assets/images/product/red-trash.svg"
                class="w-4 mr-1"
                alt=""
              />
              Delete
            </button>
          </div>
        </div>

        <!-- start BUY button -->
      </div>
    </div>
    <!-- START DESCKTOP SECTION -->
    <div class="desktop-item flex w-full md:my-5 md:px-8 view-container">
      <div
        class="
          bg-gray-200
          w-11/12
          px-8
          flex
          md:flex-row
          flex-col
          md:justify-center
          items-center
          rounded-lg
          relative
          gap-24
          pb-8
        "
      >
        <h1 class="font-bold absolute top-10 left-96 text-2xl">
          {{ product.name }}
        </h1>

        <nuxt-link
          to="/dashboard/product/manage"
          class="absolute text-sm font-bold top-3.5 left-5"
        >
          <span class="back-btn flex flex-row gap-2">
            <img
              src="~/assets/images/product/back_112351.png"
              class="w-4"
              alt=""
            />

            Back
          </span>
        </nuxt-link>

        <!-- style="position: absolute; top: 400px; left: 570px" -->
        <div
          class="
            w-1/2
            md:pb-32
            pt-24
            md:pl-8
            space-y-4
            mt-20
            flex flex-col
            justify-center
            items-center
          "
        >
          <img
            v-if="product.images.length > 0"
            class="w-80 h-80 border-4 border-white rounded-xl"
            :src="activeImage ? activeImage : product.images[0]"
            alt="No images"
          />
          <img
            v-else
            src="~assets/images/product/product_not_found.png"
            class="w-80 h-80 border-4 border-white rounded-xl"
            alt=""
          />

          <!-- <img
            :src="activeImage ? activeImage : product.images[0]"
            alt="no-rap"
            class="w-80 h-80 border-4 border-white rounded-xl"
          /> -->

          <div class="flex flex-row gap-8 justify-center items-center">
            <div v-for="(image, index) in product.images" :key="index">
              <img
                :class="
                  activeImage == image
                    ? 'rounded-lg w-16 h-16 border-2 border-accent shadow-xl cursor-pointer'
                    : 'rounded-lg w-16 h-16 border-2 border-white cursor-pointer'
                "
                :src="image"
                @click="selectImage(image)"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex flex-col
            md:items-start
            items-center
            w-1/2
            space-y-8
            md:pt-24
            pt-0
            pb-4
            md:pb-0 md:mt-8
            mt-0
          "
        >
          <!-- START Product Description  -->
          <div class="text-center md:text-left">
            <h1 class="font-bold text-xl">Product Description</h1>
            <p class="text-sm">
              {{ product.description }}
            </p>
          </div>
          <!-- END Product Description  -->

          <!-- START Product Location  -->
          <div class="">
            <h1 class="font-bold text-xl">Product Location</h1>
            <div class="flex flex-row gap-2">
              {{ product.location.city + ',' + product.location.country }}
            </div>
          </div>
          <!-- START Product Location  -->

          <!-- START Inventory Manage -->
          <div class="mb-4">
            <h1 class="font-bold text-xl mb-2">Inventory Manage</h1>
            <!-- <span class="text-sm bg-accent px-2 py-1 rounded-lg text-white">
              Instock = <b>{{ product.inventory.instock }}</b>
            </span>
            | -->
            <span class="text-sm bg-accent px-2 py-1 rounded-lg text-white">
              In stock = <b>{{ product.inventory.forsale }}</b>
            </span>

            <div v-if="product.inventory.forsale == 0">
              <h1 class="ml-2 mt-2 text-red-500 font-bold text-sm">
                This items is out of stock please add the product..
              </h1>
            </div>
          </div>
          <!-- END Inventory Manage -->

          <div class="">
            <h1 class="font-bold text-xl">Price</h1>
            <p class="text-lg font-bold">
              £{{ product.price }}
              <span class="text-accent text-sm"
                >+{{ product.carbonReduction }} CC</span
              >
            </p>
          </div>

          <!-- START Product tags -->
          <div class="">
            <h1 class="font-bold text-xl">Product Tags</h1>
            <div class="flex flex-row items-center gap-2">
              <div v-for="(tag, index) in product.tags" :key="index">
                <h1
                  class="text-sm text-white font-bold bg-accent rounded-lg px-4"
                >
                  {{ tag }}
                </h1>
              </div>
            </div>
          </div>
          <!-- START Product tags -->

          <div class="">
            <h1 class="font-bold text-xl">Category</h1>
            <div class="flex flex-row justify-center gap-2">
              {{ product.category }}
            </div>
          </div>
          <!-- Edit | Delete Button Section -->
          <div class="btn-container">
            <button
              ref="editBtn"
              class="edit-btn"
              @click.prevent="openUpdateModal"
            >
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
      </div>
    </div>
    <update-product-modal :productId="$route.params.id" />
    <v-dialog />
  </div>
</template>

<script>
import Vue from 'vue'
import UpdateProductModal from '~/components/product/UpdateProductModal.vue'

export default Vue.extend({
  components: {
    UpdateProductModal,
  },
  layout: 'auth',
  data() {
    return {
      product: {
        category: '',
        description: '',
        images: [],
        location: '',
        name: '',
        postedDate: null,
        price: 0,
        inventory: 0,
        status: false,
        tags: [],
        updateDate: null,
      },
      settings: {
        singular: true,
        title: 'Remove',
        body: 'Product Deleted Successfully',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(211,211,211, 0.6)',
        defaultTitle: true,
        canTimeout: true,
        canPause: false,
        iconEnabled: true,
        draggable: true,
        dragThreshold: 0.75,
        hideProgressbar: false,
        duration: 15000,
        theme: 'light',
        baseIconClass: '',
        orderLatest: true,
        transition: null,
        oneType: false,
        maxToasts: 6,
      },

      qunanityInput: '1',
      activeImage: undefined,
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      try {
        this.$store.dispatch('loading/toggleLoading', true)
        const product = await this.$store.dispatch('products/getProduct', {
          productId: this.$route.params.id,
        })
        this.product = product
        this.activeImage = product.images[0]
        this.$store.dispatch('loading/toggleLoading', false)
      } catch (error) {
        this.$router.push({
          path: '/dashboard/product/manage',
        })
      }
    },
    sold(instock, forsale) {
      return instock - forsale
    },
    handleUpdateModalReset() {
      this.productID = undefined
    },
    deleteProduct(item) {
      this.$modal.show('dialog', {
        title: 'You Are Deleting A Product',
        text: `Are you sure you want to remove this product? ${item.name}`,
        buttons: [
          {
            title: 'Delete',
            handler: () => {
              this.$store.dispatch('loading/toggleLoading', true)
              this.$store.dispatch('products/deleteProduct', {
                productId: item.id,
              })
              console.log({ item: item.id })
              this.$store.dispatch('loading/toggleLoading', true)

              this.$vToastify.error(this.settings)
              this.$router.push({
                path: '/dashboard/product/manage',
              })
              // this.$modal.hide('dialog')
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
    openUpdateModal() {
      this.$modal.show('update-product')
    },
    selectImage(image) {
      this.activeImage = image
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
.drop-down {
  @apply text-xs font-thin;
}
.desktop-item {
  @apply hidden md:block;
}
.mobile-item {
  @apply md:hidden;
}
.view-container {
  position: relative;
}

.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(50%) translateY(100%);
}
</style>
