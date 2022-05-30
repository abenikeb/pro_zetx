<template>
  <div>
    <div v-if="pages.length > 1" class="pagination-row btn-group">
      <button
        @click="nextAction"
        class="btn btn-sm text-xs border-2 border-gray-500"
      >
        «-
      </button>
      <button
        v-for="(page, index) in pages"
        :key="index"
        :class="[
          'btn btn-sm btn-outline border-2 border-gray-500',
          page == currentPage ? 'btn-active' : '',
        ]"
        @click="onClickButton(page)"
      >
        {{ page }}
      </button>
      <button class="btn btn-sm text-xs mr-2 border-2 border-gray-500">
        -»
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  data() {
    return {
      currentIndex: 1,
      currentInde: 1,
    }
  },
  props: ['itemsCount', 'pageSize', 'currentPage'],

  computed: {
    pages() {
      //  const range = _.range(1, 3); // [1, 2]
      return _.range(
        1,
        Math.ceil(Number(this.itemsCount) / Number(this.pageSize)) + 1
      )
    },
    pageCount() {
      return Math.ceil(this.itemsCount / this.pageSize)
    },
  },
  methods: {
    // onPageChange(event) {
    //   this.$emit('on_Page_Change', event.page)
    // },
    onClickButton(page: any) {
      this.$emit('on_Page_Change', page)
      //console.log(page)
    },
    nextAction() {
      console.log('currentIndex')
    },
  },
})
</script>

<style scoped>
.pagination-row {
  @apply p-8 m-2;
}
</style>
