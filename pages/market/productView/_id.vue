<template>
  <div class="px-2.5">
    <div
      class="
        max-w-md
        mx-auto
        bg-white
        md:gray-300
        rounded-xl
        shadow-md
        overflow-hidden
        md:max-w-5xl
      "
    >
      <div
        class="flex flex-col md:flex-row p-0 md:p-16 gap-0 md:gap-8 relative"
      >
        <nuxt-link
          to="/market"
          class="back-btn text-sm font-bold absolute top-0 left-0"
        >
          <span class="flex flex-row gap-2">
            <img
              src="~/assets/images/product/back_112351.png"
              class="w-4"
              alt=""
            />
            <p class="invisible md:visible">Back</p>
          </span>
        </nuxt-link>

        <!-- Start Header Images -->
        <div>
          <div class="md:flex-shrink-0">
            <img
              v-if="product.images.length <= 0"
              class="
                rounded
                h-56
                w-full
                object-cover
                md:h-96 md:w-96 md:border-2 md:border-white
              "
              src="~assets/images/product/product_not_found.png"
              alt="No images placeholder"
            />

            <img
              v-else
              class="
                h-56
                w-full
                object-cover
                md:h-96 md:w-96 md:border-2 md:border-white
              "
              :src="activeImage ? activeImage : product.images[0]"
              alt="Active product image"
            />
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
              overflow-x-auto
            "
          >
            <div v-for="(image, index) in product.images" :key="index">
              <img
                :src="image"
                :class="
                  activeImage == image
                    ? 'rounded-full w-16 h-16 md:w-16 md:h-16 border-2 border-accent shadow-2xl cursor-pointer'
                    : 'rounded-full w-12 h-12 md:w-16 md:h-16 md:border-2 md:border-gray-300  shadow-xl  cursor-pointer'
                "
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
              <h1 class="font-bold text-3xl">{{ product.name }}</h1>
              <img
                src="~/assets/images/product/clarity_new-solid.svg"
                class="w-16"
                alt=""
              />
            </div>
            <!-- <div class="flex mb-4 gap-2 mb-0 md:mb-8">
              <img
                src="~/assets/images/product/green_calander.png"
                class="w-5"
                alt=""
              />
              <p>Posted 1 hour a go</p>
            </div> -->
          </div>
          <div class="mb-4 flex flex-row items-center mb-0 md:mb-8 mt-2">
            <p class="font-bold text-3xl text-accent">
              {{ `£${product.price} +  ` }}
            </p>
            <p class="font-bold text-lg text-accent">
              {{ `${product.carbonReduction} CC` }}
            </p>
          </div>
          <div class="mb-4 md:mb-8">
            <h1 class="font-bold text-xl">Product Description</h1>
            <p class="text-sm">
              {{ product.description }}
            </p>
          </div>

          <div class="flex flex-col items-start space-y-2">
            <div class="flex gap-2">
              <img
                src="~/assets/images/product/inventory_.svg"
                class="w-6"
                alt=""
              />
              <span>Available in Stock: </span>
              <span class="bg-accent px-2 rounded-md text-white">{{
                `${product.inventory.forsale}`
              }}</span>
            </div>

            <div v-if="product.inventory.forsale">
              <div class="flex items-center gap-2 mb-8">
                <div class="flex items-center gap-2">
                  <!-- <img
                    src="~/assets/images/cart_green.png"
                    class="w-6"
                    alt=""
                  /> -->
                  <span>Quantity</span>
                  <input
                    v-model="qunanityInput"
                    class="
                      input input-bordered
                      bg-gray-200
                      border-none
                      rounded
                      w-14
                      h-8
                    "
                    type="number"
                    :max="product.inventory.forsale"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="!product.inventory.forsale">
            <div class="my-2">
              <p class="font-bold text-sm text-red-500">
                Sorry this product is out of stock ..you can contact the seller
                !
              </p>
            </div>
          </div>

          <!-- start contact section -->
          <div class="flex flex-col items-start gap-2">
            <button
              class="
                border-gray-500 border-2
                w-full
                flex flex-row
                justify-center
                items-center
                h-8
                text-sm
                rounded
                p-2
                gap-2
                font-bold
              "
              @click="showContact({ value: 'phone' })"
            >
              <img src="~/assets/images/product/phone.png" class="w-4" alt="" />
              <p>{{ !activeContact ? 'Call Now' : contactPhone }}</p>
            </button>
            <button
              class="
                bg-accent
                w-full
                flex flex-row
                justify-center
                items-center
                h-8
                text-white text-sm
                rounded
                p-2
                gap-2
                font-bold
              "
              @click="showContact({ value: 'email' })"
            >
              <img
                src="~/assets/images/product/message-48.png"
                class="w-4"
                alt=""
              />
              <p>{{ !activeEmail ? 'Email Now' : contactEmail }}</p>
            </button>
          </div>
        </div>
        <!-- End Body Section -->
      </div>

      <!-- start BUY button -->
      <div v-if="product.inventory.forsale">
        <button
          class="bg-accent w-full h-16 text-white rounded-b-2xl font-bold"
          @click="createOrder"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
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
        sellerId: '',
        updateDate: null,
      },
      errorSetting: {
        title: 'Error',
        body: 'Some thing failed',
        withBackdrop: true,
        position: 'top-right',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        defaultTitle: true,
        canTimeout: true,
        iconEnabled: true,
        draggable: true,
        dragThreshold: 0.75,
        hideProgressbar: false,
        duration: 3000,
        theme: 'light',
        orderLatest: true,
      },
      activeContact: false,
      activeEmail: false,
      contactPhone: '+44 913228892',
      contactEmail: 'zeraftech.com.et',
      qunanityInput: '1',
      activeImage: this.product ? this.product.images[0] : undefined,
    }
  },
  computed: {
    now() {
      const nowInSeconds = firebase.firestore.Timestamp.now().seconds
      return nowInSeconds
    },
  },
  created() {
    if (!this.$route.params.id) return null

    this.$store.dispatch('loading/toggleLoading', true)
    this.init()
    this.loadUserData()
    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    async init() {
      try {
        const product = await this.$store.dispatch('market/getProduct', {
          productId: this.$route.params.id,
        })
        this.product = product
        this.activeImage = product.images[0]
      } catch (err) {
        this.errorSetting.body = err.message
        this.$vToastify.error(this.errorSetting)
        this.$router.push({
          path: '/market',
        })
      }
    },
    loadUserData() {
      setTimeout(async () => {
        const sellerRef = await this.$fire.firestore
          .collection('users')
          .doc(this.product.sellerId)
          .get()

        this.contactPhone = sellerRef.data().tel
        this.contactEmail = sellerRef.data().email
      }, 2000)
    },

    selectImage(image) {
      this.activeImage = image
    },
    showContact({ value }) {
      if (value === 'phone') this.activeContact = !this.activeContact
      else this.activeEmail = !this.activeEmail
    },
    createOrder() {
      this.$router.push({
        path: '/market/createOrder',
        query: {
          productID: this.product.id,
          productQuantity: this.qunanityInput,
        },
      })
    },
  },
})
</script>

<style scoped>
.drop-down {
  @apply text-xs font-thin;
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
