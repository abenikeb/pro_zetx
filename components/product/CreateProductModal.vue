<template>
  <vmodal
    name="create-product"
    classes="product-modal mx-1 md:mx-8"
    transition="scale"
    height="100%"
    :scrollable="true"
    width="100%"
    @before-open="initModal"
  >
    <!-- Getting Vue-MultiSelect StyleSheet -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div
        class="
          flex flex-row
          gap-2
          items-center
          justify-center
          text-white
          font-bold
          text-xl
        "
      >
        <div>
          <img
            src="~/assets/images/product/circle-spinner-accent.svg"
            class="w-6 animate-spin"
          />
        </div>
        <div>Please Wait...</div>
      </div>
    </div>
    <!-- END - Loading Spinner -->

    <!-- Product Form -->
    <form class="modal-form" @submit.prevent="createProduct">
      <div class="modal-header">
        <h4 class="text-xl font-bold">Create Product</h4>
        <button class="close-modal-btn" @click.prevent="closeModal">X</button>
      </div>
      <!-- Container -->
      <div class="pt-4">
        <!-- Title -->
        <fieldset class="form-control mb-2">
          <label class="label">
            <span>Product Title</span>
          </label>
          <input
            v-model="product.name"
            type="text"
            pattern="[a-zA-Z][a-z \sA-Z]*"
            title="Title should be letters, and at least 4 letters long"
            required
            placeholder="What is the product called?"
            class="modal-text-input"
          />
        </fieldset>

        <!-- Description -->
        <fieldset class="form-control mb-2">
          <label class="label">
            <span>Description</span>
          </label>
          <textarea
            v-model="product.description"
            row="24"
            placeholder="Describe Your Product Here."
            class="modal-text-area"
            required
          ></textarea>
        </fieldset>

        <!-- TODO: Image & Quantity -->
        <div
          class="
            flex
            md:flex-row
            flex-col-reverse
            mb-2
            w-full
            gap-2
            justify-between
          "
        >
          <div
            class="
              flex flex-col
              sm:flex-row
              w-full
              overflow-hidden
              gap-2
              sm:gap-0
            "
          >
            <fieldset class="form-control">
              <label class="label">
                <span>Images</span>
              </label>
              <div>
                <input
                  ref="upload_product_image"
                  class="upload-product-image"
                  type="file"
                  accept="image/jpeg, image/png"
                  @change.prevent="handleImageUpload"
                  @removeImage="handleImageRemove"
                />
                <!-- Row for upload button and Quantity selection -->
                <div>
                  <button
                    ref="upload_product_image_btn"
                    class="upload-img-btn"
                    :disabled="isUploadingImage"
                    @click.prevent="openUploadDialog"
                  >
                    <span v-if="!isUploadingImage">Choose File</span>
                    <span v-else>Uploading...</span>
                  </button>
                </div>
              </div>
            </fieldset>

            <fieldset class="image-preview">
              <label class="hidden sm:block label text-transparent">
                <span>Image Preview</span>
              </label>

              <div class="image-preview-list">
                <image-preview
                  v-for="(preview, idx) in product.images"
                  :key="idx"
                  :imgsrc="preview"
                  @removeimg="handleImageRemove"
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div v-if="productImagesUnavailable" class="text-red-500 text-xs block">
          Please add at least one product image.
        </div>

        <!-- (Tags, Category) & Location -->
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 mb-2">
          <div class="flex flex-col gap-2">
            <!-- Inventory -->
            <fieldset class="pt-2">
              <h3 class="text-xl font-bold">Product Inventory</h3>
              <hr />
            </fieldset>
            <fieldset class="form-contrl w-full">
              <label class="label">
                <span>Instock (Inventory)</span>
              </label>

              <input
                v-model="product.inventory.instock"
                class="modal-text-input w-full"
                type="number"
                min="1"
                required
              />
            </fieldset>

            <fieldset class="form-contrl w-full">
              <label class="label">
                <span>For Sale (Inventory)</span>
              </label>

              <input
                v-model="product.inventory.forsale"
                class="modal-text-input w-full"
                type="number"
                min="1"
                required
                @change="validateInstock"
              />
              <small v-if="forsaleError" class="text-red-600"
                >Forsale products shouldn't be more than instock items.</small
              >
            </fieldset>
            <!-- END - Inventory -->

            <!-- Tags -->
            <fieldset class="form-control">
              <label class="label">
                <span>Product Tags</span>
              </label>

              <!-- @see {@link https://vue-multiselect.js.org/#sub-tagging|Taggable Multiselect Input} -->
              <multiselect
                v-model="tags"
                tag-placeholder="Add Current Tag"
                placeholder="Add Product Related Tags"
                label="name"
                track-by="value"
                :options="availableTags"
                :multiple="true"
                :taggable="true"
                @tag="addTag"
              ></multiselect>
            </fieldset>
            <!-- END - Tags -->

            <!-- Category Select -->
            <fieldset class="form-control">
              <label class="label">
                <span>Product Category</span>
              </label>

              <select v-model="product.category" class="modal-select-input">
                <option value="" disabled="disabled" selected="selected">
                  Choose a Product Category
                </option>
                <option
                  v-for="(productCategory, idx) in productCategories"
                  :key="idx"
                  :value="productCategory.value"
                >
                  {{ productCategory.name }}
                </option>
              </select>
            </fieldset>
            <!-- END - Category Select -->
          </div>

          <!-- Location -->
          <div class="flex flex-col">
            <fieldset class="pt-2">
              <h3 class="text-xl font-bold">Product Sale Location</h3>
              <hr />
            </fieldset>
            <fieldset class="form-control">
              <label class="label">
                <span>Country</span>
              </label>
              <input
                v-model="product.location.country"
                type="text"
                placeholder="Enter Country Here."
                class="modal-text-input"
                pattern="[a-zA-Z][a-z\sA-Z]*,*[a-z \sA-Z]*"
              />
            </fieldset>
            <fieldset class="form-control">
              <label class="label">
                <span>City</span>
              </label>
              <input
                v-model="product.location.city"
                type="text"
                placeholder="Enter City Here."
                class="modal-text-input"
                pattern="[a-zA-Z][a-z\sA-Z]*,*[a-z \sA-Z]*"
              />
            </fieldset>
            <fieldset class="form-control">
              <label class="label">
                <span>Borough</span>
              </label>
              <input
                v-model="product.location.street"
                type="text"
                placeholder="Enter Borough Here."
                class="modal-text-input"
                pattern="[a-zA-Z][a-z\sA-Z]*,*[a-z \sA-Z]*"
              />
            </fieldset>
            <fieldset class="form-control">
              <label class="label">
                <span>Post Code</span>
              </label>
              <input
                v-model="product.location.state"
                type="text"
                placeholder="Enter State Here."
                class="modal-text-input"
              />
            </fieldset>

            <!--
            <div class="flex flex-row py-1 justify-center">
              <h4 class="text-lg font-bold">OR</h4>
            </div>
            Find My Location Button
            <button class="find-location-btn" @click.prevent>
              <img
                src="~/assets/images/product/location-plus-icon.svg"
                class="w-6 mr-1"
                alt=""
                srcset=""
              />
              Find My Location
            </button>
            -->

            <!-- Price -->
            <fieldset class="pt-4">
              <h3 class="text-xl font-bold">Product Price</h3>
              <hr />
            </fieldset>
            <fieldset class="form-control">
              <label class="label">
                <span>Carbon Coins Price</span>
              </label>
              <div class="flex w-full flex-row gap-2">
                <input
                  v-model="product.carbonReduction"
                  type="number"
                  min="0"
                  placeholder="How much does this cost?"
                  class="modal-text-input flex-1"
                  @change="handleChange"
                />
                <div class="cc-sign flex-none" style="width: 2em">CC</div>
              </div>
            </fieldset>

            <fieldset class="form-control">
              <label class="label">
                <span>Price in GBP</span>
              </label>
              <div class="flex w-full flex-row gap-2">
                <input
                  v-model="product.price"
                  type="number"
                  min="0"
                  placeholder="How much does this cost?"
                  class="modal-text-input flex-1"
                />
                <div class="cc-sign flex-none" style="width: 2em">£</div>
              </div>
            </fieldset>
          </div>
          <!-- END - Location -->
        </div>
        <!-- END - (Tags, Category) & Location -->

        <!-- Publish Row -->
        <div class="flex justify-start mb-2">
          <div class="form-control">
            <label class="cursor-pointer label">
              <input
                checked="checked"
                type="checkbox"
                class="checkbox checkbox-accent mr-1"
                @change="handleStatusChange"
              />
              <span class="label-text">Publish on website</span>
            </label>
          </div>
        </div>
        <!-- END - Publish Row -->

        <!-- Submit Row -->
        <div class="flex justify-start mb-2">
          <button type="submit" class="green-btn">Submit Item</button>
        </div>
        <!-- END - Submit Row -->
      </div>
      <!-- END - Container -->
    </form>
  </vmodal>
</template>

<script lang="ts">
import Vue from 'vue'
/** @see {@link https://euvl.github.io/vue-js-modal/ | VueJS Modal} */
import Multiselect from 'vue-multiselect'

// Custom
import ImagePreview from './ImagePreview.vue'
import { Product, ProductStatus } from '~/plugins/model/products.model'
import GenerateUUID from '~/plugins/uuid-generator'
// import { ProductCategory } from '~/plugins/models/products.model'

const clearProduct = () =>
  new Product({
    name: '',
    status: ProductStatus.ACTIVE,
    price: 0,
    location: {
      city: '',
      street: '',
      state: '',
      country: '',
      postalCode: '',
    },
    category: '',
    tags: [],
    images: [],
    sellerId: '',
    carbonReduction: 0,
  })

export default Vue.extend({
  /*
    INFO: Combining component using as 'Vus.Component' IDE points out error,
    Combined Vue Instance with unknown type error. Breaks every other prop & method.
  */
  components: {
    multiselect: Multiselect as Vue.Component,
    'image-preview': ImagePreview as Vue.Component,
  },
  data() {
    return {
      loading: false,
      // Instantiate Product
      product: clearProduct(),
      /* Temporary Array for storing selected tags */
      tags: [] as Array<{ name: string; value: string }>,
      isUploadingImage: false,
      forsaleError: false,
      productImagesUnavailable: false,
    }
  },

  computed: {
    productCategories() {
      // Bind to product categories from the product store.
      return this.$store.state.market?.products.productCategories
    },

    /* Gets All Available Tags */
    availableTags(): Array<{ name: string; value: string }> {
      return (
        this.$store.state.market?.products.productTags as Array<string>
      ).map((tag) => ({
        name: tag,
        value: tag.toLowerCase(),
      }))
    },
  },

  methods: {
    /*
     * Initializes the product create page with required data.
     */

    /*
      Initializes the Modal when openning the modal.
      Issues with when openning modal, data from before is displayed.
     */
    initModal() {
      this.product = clearProduct()
      this.tags = []
      this.productImagesUnavailable = false
      this.isUploadingImage = false
    },

    /**
     * @see {@link {https://github.com/lyhd/reactjs/blob/react-firebase-file-upload/src/index.js} | Upload Image using Firebase Cloud Store}
     */
    async handleImageUpload(e: InputEvent) {
      const imageUploadInput = e.target as HTMLInputElement

      // Exit if no image is selected
      if (!imageUploadInput.files) return
      if (!imageUploadInput.files[0]) return

      this.toggleUploadLoading(true)
      const imageFile: File = imageUploadInput.files[0]

      try {
        const imageStorageRef = this.$fire.storage.ref()
        const productImageRef = imageStorageRef.child(
          `products/${imageFile.name.replace('.', `.${GenerateUUID()}.`)}`
        )

        try {
          const prodImgDoc = await productImageRef.put(imageFile)
          this.product.images?.push(await prodImgDoc.ref.getDownloadURL())
          this.toggleUploadLoading(false)
        } catch (err) {
          console.log('Uploading Product Failed', {
            err,
          })
          this.toggleUploadLoading(false)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Product Image Upload Error: ', e)
      }
    },

    handleImageRemove(selectedImg: string) {
      /**
       * Sets contain only unique elements, so I can safely remove an item.
       *
       * @see {@like https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set | Set Documnetation}
       */
      const imagesMap = new Set(this.product.images)
      imagesMap.delete(selectedImg)

      /* Replace the array of images with the new images array */
      this.product.images = Array.from(imagesMap)
    },

    handleChange(e: Event) {
      console.log((e.target as HTMLInputElement).value)
    },

    closeModal() {
      this.$modal.hide('create-product')
    },

    openUploadDialog() {
      // Click on file upload input element.
      const uploadButton = this.$refs.upload_product_image as HTMLButtonElement
      uploadButton?.click()
    },

    // Modal Loading Screen
    toggleLoading(isLoading: boolean) {
      this.loading = isLoading
    },

    // Image Uploading Loading
    toggleUploadLoading(isLoading: boolean) {
      this.isUploadingImage = isLoading
    },
    /* END - Element Events */

    /* For creating product */
    async createProduct() {
      // product Image uploaded validation
      this.productImagesUnavailable = false
      if (this.product.images!.length <= 0) {
        this.productImagesUnavailable = true

        const imageInput = this.$refs
          .upload_product_image_btn as HTMLInputElement
        imageInput?.focus()

        return
      }

      // Create the product
      this.toggleLoading(true)

      // Product Tags are an array of strings.
      const selectedTagsFromMultiselect = this.tags.map(
        (tag) => tag.value
      ) as Array<string>
      this.product.tags = selectedTagsFromMultiselect

      // Adding Tags into global product tags collection.
      await this.$store.dispatch('market/addTags', {
        tags: selectedTagsFromMultiselect,
      })

      await this.$store.dispatch('products/createProduct', {
        product: this.product,
      })

      // Stop Loading UI
      this.toggleLoading(false)
      // Hide modal
      this.$modal.hide('create-product')
    },

    /* Add Tags to the selected tags */
    addTag(tag: string) {
      const newTag = {
        name: tag,
        value: tag.toLowerCase(),
      }
      this.tags.push(newTag)
    },

    /** Validate For-sale is below InStock inventory */
    validateInstock(e: Event) {
      const forsaleValue = Number((e.target as HTMLInputElement).value)
      this.forsaleError = false

      if (typeof this.product.inventory?.instock === 'undefined')
        throw new Error("Instock doesn't exist, can't set for sale products.")

      if (forsaleValue > this.product.inventory?.instock) {
        this.forsaleError = true
        this.product.inventory.forsale = this.product.inventory.instock

        e.preventDefault()
      }
    },

    handleStatusChange(e: Event) {
      const target = e.target as HTMLInputElement

      this.product.status = target.checked
        ? ProductStatus.ACTIVE
        : ProductStatus.INACTIVE
    },
  },
})
</script>

<style scoped>
.modal-form {
  @apply pt-12 pb-20 pb-8 px-8 md:px-12;
  background-color: #dfdddd;
  height: 100vh;
  overflow: scroll;
}

.modal-header {
  @apply flex-1 relative flex flex-row justify-center items-center;
}

.close-modal-btn {
  @apply btn btn-sm border-none text-white bg-red-600 absolute top-1 right-1;
}

.modal-text-input {
  @apply input input-bordered border-none rounded bg-white;
}

.modal-text-area {
  @apply textarea border-none rounded bg-white;
}

.modal-select-input {
  @apply border-none rounded bg-white select select-bordered w-full max-w-xs;
}

/* Upload Image Button */
.upload-img-btn {
  @apply btn border-none rounded sm:rounded-r-none text-white flex-1 w-32;
  background-color: #a5a5a5;
}

/*
  Hide File Upload Input
  Building custom file upload dialog.
*/
.upload-product-image {
  display: none;
}

/* Input Label Customization */
.label span {
  @apply label-text font-bold text-base;
}

/* Location Input Customizations */
.find-location-btn {
  @apply green-btn;
  background-color: #009640;
}

/* Carbon Credit (CC) Sign */
.cc-sign {
  @apply p-2 flex items-center font-bold justify-center rounded border-none bg-white text-xl no-animation;
}

/* Green Button */
.green-btn {
  @apply btn rounded border-none text-white;
  background-color: #009640;
}

/* Image Preview Component */
.image-preview {
  @apply p-0 min-h-6 w-full rounded;
  overflow: hidden;
}

.image-preview-list {
  @apply flex flex-row flex-shrink-0 gap-2 w-auto overflow-x-auto
    bg-white rounded sm:rounded-l-none sm:pl-1 p-1 bg-opacity-60;
  height: 48px;
}

/*
  Makes scrollable image previews

  @see {https://stackoverflow.com/a/47548156 | Make Flex Container Children Scroll}
*/
.image-preview-list > * {
  flex-shrink: 0;
}

/* modify scrollbar width */
::-webkit-scrollbar {
  height: 5px !important;
}

/* --- Modal Custmomizations -- */

/* Styling Product Modal */
.product-modal {
  @apply rounded-lg;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.loading-spinner {
  @apply w-full h-full flex items-center justify-center;
  background: rgb(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

/* Scale Animation for Product Modal */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s;
}
.scale-enter,
.scale-leave-active {
  opacity: 0;
  transform: scale(0.8) translateY(24px);
}
</style>
