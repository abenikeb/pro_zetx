<template>
  <div>
    <h1 class="text-2xl font-bold text-accent text-center">
      MRV for the Carbon Data
    </h1>
    <div class="flex flex-col md:flex-row">
      <!-- the table title -->
      <div class="md:w-1/6 w-4/5 mx-auto h-1/4 px-5">
        <div
          class="
            bg-white
            shadow-lg
            rounded-xl
            flex flex-col
            items-center
            h-24
            px-2
            border
          "
        >
          <div class="flex justify-between">
            <h1 class="text-gray-500 text-xs my-2 text-left">
              <i class="fa fa-bullhorn"></i> Sponsored Ads
            </h1>
          </div>
          <img
          
            src="https://i.pinimg.com/736x/df/aa/31/dfaa3199b461cf2f5ee75afab66f37c6.jpg"
            alt=""
            class="rounded-lg md:my-5 w-full h-12 md:h-auto"
          />
        </div>
      </div>
      <!-- the table along side its options  -->
      
      <div class="px-2 md:px-20 py-2 md:py-5 md:w-5/6">
        <div>
          <vue-good-table
            class="condensed vgt-table"
            :columns="columns"
            :search-options="{
              enabled: true,
              placeholder: 'Search...',
            }"
            :rows="finalMeasureData"
            line-numbers
            :pagination-options="{
              enabled: true,
              mode: 'records',
            }"
          >
            <!-- the table rows are rendered here based on their conditions -->
            <template slot="table-row" slot-scope="props">
              <!-- the #ID column condition -->
              <div v-if="props.column.field == 'identifier'">
                <i class="fa fa-user-circle fa-2x"></i>
              </div>
              <!-- the progress column condition -->
              <span v-else-if="props.column.field == 'status'">
                <span
                  v-if="props.row.status == 'pending'"
                  class="
                    bg-yellow-400
                    text-yellow-800
                    px-3
                    py-1
                    text-sm
                    rounded-full
                    ml-5
                  "
                  >pending</span
                >
                <span
                  v-if="props.row.status == 'completed'"
                  class="
                    bg-green-500
                    text-green-800
                    px-3
                    py-1
                    text-sm
                    rounded-full
                    ml-5
                  "
                  >completed</span
                >
              </span>
              <!-- the Action column -->

              <span
                v-else-if="
                  props.column.field == 'action' &&
                  props.row.status == 'pending'
                "
              >
                <nuxt-link
                  id="detaisBtn"
                  :to="`/classifier/details/${props.row.id}`"
                  class="btn btn-accent btn-sm btn-outline"
                  >Details</nuxt-link
                >
              </span>
              <!-- this will apply for the columns that have no condtions written -->
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { app } from 'firebase-admin'
import Vue from 'vue'
import { EmissionType } from '~/plugins/models/emission.model'
export default Vue.extend({
  name: 'MyComponent',
  layout: 'auth',
  middleware: ['auth', 'classifier'],
  data() {
    return {
      // the column list
      columns: [
        {
          label: '#ID',
          field: 'identifier',
          width: '50px',
          sortable: false,
        },
        {
          label: 'Progress',
          field: 'status',
          width: '60px',
        },
        {
          label: 'Action',
          field: 'action',
          width: '100px',
          sortable: false,
        },
      ],
      // holds the measure data
      measureDataList: [] as EmissionType[],
    }
  },
  computed: {
    // returns the data that is going to be dispalyed by tracking the number of data verified so far
    finalMeasureData() {
      const returnedArray: any[] = []
      this.measureDataList.forEach((measures: any) => {
        let tempStatus = 'completed'
        const BreakThrow = {}
        try {
          measures.household.forEach((house: any) => {
            if (house.status === 'pending') {
              tempStatus = 'pending'
              throw BreakThrow
            }
          })
          measures.food.forEach((food: any) => {
            if (food.status === 'pending') {
              tempStatus = 'pending'
              throw BreakThrow
            }
          })
          measures.shopping.forEach((shop: any) => {
            if (shop.status === 'pending') {
              tempStatus = 'pending'
              throw BreakThrow
            }
          })
        } catch (e) {
          if(e !== BreakThrow) return e
        }

        returnedArray.push({
          id: measures.id,
          status: tempStatus,
        })
      })

      return returnedArray
    },
  },
  async created() {
    // dispaches the action to display the loading animation for 700ms
    this.$store.dispatch('loading/toggleLoading', true)
    await this.$store.dispatch('classifier/getMeasureDataAction')
    setTimeout(() => {
      this.$store.dispatch('loading/toggleLoading', false)
    }, 700)
    // dispach the action to fetch the avaliable measure data
    // assign the data that is returned from store to the measureData so that we can use it in the template
    this.measureDataList = this.$store.state.classifier.measureData as any
  },
})
</script>

