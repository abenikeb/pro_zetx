<template>
  <!-- responsive custom popup component -->
  <div class="popup-container">
    <div class="popup-content">
      <div class="popup-header">
        <div class="popup-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>
      <div class="popup-body">
        <slot name="body">
          {{ body }}
        </slot>

        <slot name="prompt">
          <p class="border-t mt-2 pt-2 font-semibold">
            Your emissions for {{ section }} is {{ emission.toFixed(2) }} Kg
            Co2-e.
          </p>
          <p class="border-t mt-2 pt-2 font-semibold">
            Do you want to continue measuring or finish for today?
          </p>
        </slot>
      </div>
      <div class="popup-footer">
        <button
          class="btn btn-sm btn-outline btn-primary"
          @click="continueMeasure"
        >
          Continue
        </button>
        <button class="btn btn-sm btn-accent" @click="finishMeasure">
          Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmPopup',
  props: {
    title: {
      type: String,
      default: 'Did you know?',
    },
    section: {
      type: String,
      default: '',
    },
    emission: {
      type: Number,
      default: 0,
    },
    body: {
      type: String,
      default: 'Are you sure?',
    },
    footer: {
      type: String,
      default: 'Yes, No',
    },
    close: {
      type: String,
      default: 'Close',
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },

    continueMeasure() {
      this.$emit('continue')
    },

    finishMeasure() {
      this.$emit('finish')
    },
  },
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 500px;
  background: #fff;
  border-radius: 5px;
  padding: 10px 20px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.popup-body {
  margin-top: 5px;
  margin-bottom: 20px;
  @apply text-xs md:text-sm;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
</style>
