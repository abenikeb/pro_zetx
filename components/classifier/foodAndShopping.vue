<template>
  <div class="w-full mx-auto">
    <div v-if="!showCorrectionForm">
      <!-- loops over the data that is passed for it -->
      <div v-for="(value, name, index) in receivedData" :key="index">
        <!-- this section contains the input field -->
        <div
          v-if="name !== 'status' && !showCorrectionForm"
          class="form-control mb-4"
        >
          <label class="text-sm">
            <b>{{ name }}</b>
          </label>
          <input
            readonly
            :value="value"
            type="number"
            placeholder="$"
            class="input input-sm input-bordered"
          />
        </div>
        <!-- this section contains the buttons they will emit the values to page where the component is called -->
      </div>
    </div>
    <div class="flex w-full items-center justify-center">
      <div v-if="receivedData.status === 'pending' && !showCorrectionForm">
        <div class="flex">
        <button
          id="validBtn"
          class="btn btn-primary hover:bg-green-800 mx-5"
          @click="
            receivedData.status = 'approved'
            $emit('status', receivedData)
          "
        >
          Valid
        </button>
        <button
          id="inValidBtn"
          class="btn btn-md bg-red-600 hover:bg-red-800 text-white"
          @click="
            showCorrectionForm = true
            correctedData = receivedData
          "
        >
          Invalid
        </button>
        </div>
      </div>
      <div v-else-if="showCorrectionForm">
        <!-- :type="typeof value === 'number' ? 'number' : 'text'" -->
        <label for=""> Please add the correct value(s) from the photo. </label>
        <br />
        <div
          v-for="(value, name, index) in correctedData"
          :key="index"
          class="flex flex-col"
        >
          <label v-if="name !== 'status'" for=""
            ><b>{{ name }}</b></label
          >
          <input
            v-if="name !== 'status'"
            v-model="correctedData[name]"
            type="number"
            placeholder="$"
            class="input input-sm input-bordered"
          />
          <br />
        </div>
        <div class="flex">

        <button
          class="btn text-white bg-accent mx-5 hover:bg-white hover:text-black"
          @click="
            correctedData.status = 'corrected'
            $emit('status', { ...correctedData })
            showCorrectionForm = false
          "
        >
          Submit
        </button>
        <button
          class="btn btn-md bg-red-600 hover:bg-red-800 text-white"
          @click="showCorrectionForm = false"
        >
          Cancel
        </button>
        </div>
      </div>

      <div
        v-else-if="
          receivedData.status === 'approved' ||
          receivedData.status === 'corrected'
        "
      >
        <button
          class="btn btn-md bg-yellow-300 hover:bg-yellow-400 text-yellow-800"
          @click="
            receivedData.status = 'pending'
            $emit('status', { status: 'pending' })
          "
        >
          <!-- @click="$emit('status', { status: 'pending', value: value })" -->
          Retract
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { data:Object },
  data() {
    return {
      correctedData: {},
      showCorrectionForm: false,
      correctedValue: 0,
    }
  },
  computed: {
    receivedData() {
      return this.data
    },
  },
  watch: {
    data() {
      this.showCorrectionForm = false
    },
  },
  created() {
    this.correctedData = this.receivedData
  },
  methods: {
    submitShoppingData() {
    },
  },
}
</script>

<style scoped></style>
