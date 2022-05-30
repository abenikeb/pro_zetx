<template>
  <div class="image-preview-box">
    <img class="h-full" :src="imgsrc" alt="" />

    <div
      class="image-preview-remove"
      @mouseenter="overImage"
      @mouseleave="notOverImage"
    >
      <button
        ref="removeBtn"
        class="hidden btn btn-primary btn-xs btn-square"
        @click.prevent="removeBtn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * An image preview for image upload when creating
 * or updating a product.
 *
 * @author Zablon Dawit <zablon@zeraftech.com>
 */

import Vue from 'vue'
export default Vue.extend({
  props: {
    // Image location
    imgsrc: {
      required: true,
      type: String,
    },
    /**
     * When an image, the preview should display a
     * placeholder instread of the real image, this
     * is for some security concernes loading local
     * files.
     */
    uploading: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    removeBtn() {
      this.$emit('removeimg', this.imgsrc)
    },
    overImage() {
      const removeBtn = this.$refs.removeBtn as HTMLButtonElement

      removeBtn.classList.remove('hidden')
    },
    notOverImage() {
      const removeBtn = this.$refs.removeBtn as HTMLButtonElement

      removeBtn.classList.add('hidden')
    },
  },
})
</script>

<style scoped>
.image-preview-box {
  @apply h-full relative;
  display: inline-block;
  min-width: 48px;
}

.image-preview-remove {
  @apply absolute flex justify-center items-center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
