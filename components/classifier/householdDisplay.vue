<template>
  <div class="w-full mx-auto">
    <!-- loops over the data that is passed for it -->
    <div v-for="(value, name, index) in data" :key="index" class="hidden md:block">
      <div v-if="!showCorrectionForm" class="form-control mb-4">
        <label class="text-sm">
          <b>{{ name }}</b>
        </label>
        <input
          readonly
          :value="value.value"
          type="number"
          placeholder="$"
          class="input input-sm input-bordered"
        />
      </div>
      <!-- this section contains the buttons they will emit the values to page where the component is called -->
      <div class="flex w-full items-center justify-center">
        <div v-if="value.status === 'pending'">
          <button
            v-if="!showCorrectionForm"
            id="validBtn"
            class="btn btn-primary hover:bg-green-800 mx-5"
            @click="$emit('status', { status: 'approved', value: value.value })"
          >
            Valid
          </button>
          <button
            v-if="!showCorrectionForm"
            id="inValidBtn"
            class="btn btn-md bg-red-600 hover:bg-red-800 text-white"
            @click="
              showCorrectionForm = true
              correctedValue = value.value
            "
          >
            Invalid
          </button>
          <div v-else class="flex flex-col">
            <label class="px-5 py-2" for=""
              ><b>Please add the correct value from the photo.</b></label
            >
            <input
              v-model="correctedValue"
              type="number"
              placeholder="$"
              class="input input-sm input-bordered mx-5"
            /><br />
            <div class="flex justify-center items-center w-full">
              <button
                class="
                  btn
                  text-white
                  bg-accent
                  mx-5
                  hover:bg-white hover:text-black
                "
                @click="
                  $emit('status', {
                    status: 'corrected',
                    value: parseInt(correctedValue),
                  })
                  showCorrectionForm = false
                "
              >
                Submit
              </button>
              <button
                class="
                  btn btn-error btn-outline
                  hover:bg-red-600
                  text-white
                "
                @click="showCorrectionForm = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <button
            class="btn btn-md bg-yellow-300 hover:bg-yellow-400 text-yellow-800"
            @click="$emit('status', { status: 'pending' })"
          >
            Retract
          </button>
        </div>
      </div>
    </div>
    <div v-for="(value, name, index) in data" :key="'A' + index" class="md:hidden w-full">
      <div v-if="!showCorrectionForm" class="form-control mb-4">
        <label class="text-sm w-full">
          <b>{{ name }}</b>
        </label>
        <input
          readonly
          :value="value.value"
          type="number"
          placeholder="$"
          class="input input-sm input-bordered w-5/6"
        />
      </div>
      <!-- this section contains the buttons they will emit the values to page where the component is called -->
      <div class="flex w-full items-center justify-center">
        <div v-if="value.status === 'pending'" class="flex w-full">
          <button
            v-if="!showCorrectionForm"
            id="validBtn"
            class="btn btn-primary hover:bg-green-800 mr-3"
            @click="$emit('status', { status: 'approved', value: value.value })"
          >
            Valid
          </button>
          <button
            v-if="!showCorrectionForm"
            id="inValidBtn"
            class="btn btn-md bg-red-600 hover:bg-red-800 text-white"
            @click="
              showCorrectionForm = true
              correctedValue = value.value
            "
          >
            Invalid
          </button>
          <div v-else class="flex flex-col">
            <label class="px-5 py-2" for=""
              ><b>Please add the correct value from the photo.</b></label
            >
            <input
              v-model="correctedValue"
              type="number"
              placeholder="$"
              class="input input-sm input-bordered mx-5"
            /><br />
            <div class="flex justify-center items-center w-full">
              <button
                class="
                  btn
                  text-white
                  bg-accent
                  mx-5
                  hover:bg-white hover:text-black
                "
                @click="
                  $emit('status', {
                    status: 'corrected',
                    value: parseInt(correctedValue),
                  })
                  showCorrectionForm = false
                "
              >
                Submit
              </button>
              <button
                class="
                  btn btn-error btn-outline
                  hover:bg-red-600
                  text-white
                "
                @click="showCorrectionForm = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <button
            class="btn btn-md bg-yellow-300 hover:bg-yellow-400 text-yellow-800"
            @click="$emit('status', { status: 'pending' })"
          >
            Retract
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: { 
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      showCorrectionForm: false,
      correctedValue: 0,
    }
  },
  watch: {
    data() {
      this.showCorrectionForm = false
    },
  },
  created() {},
  methods: {
    submitShoppingData() {},
  },
}
</script>

<style scoped></style>
