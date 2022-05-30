<template>
  <div>
    <h1 class="ml-5 mt-3 mb-5 font-bold text-2xl">Total Products</h1>
    <vue-good-table
      class="condensed vgt-table px-4"
      :columns="columns"
      :search-options="{
        enabled: true,
        placeholder: 'Search...',
      }"
      :rows="productList"
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
          <span>{{ props.row.name }}</span>
        </div>
        <div v-else-if="props.column.field == 'creator'">
          <span>{{ props.row.creator }}</span>
        </div>
        <div v-else-if="props.column.field == 'date'">
          <span>{{ props.row.date }}</span>
        </div>
        <!-- the progress column condition -->
        <span v-else-if="props.column.field == 'status'">
          <span
            v-if="props.row.status == 'deactivated'"
            class="
              bg-yellow-400
              text-yellow-800
              px-3
              py-1
              text-sm
              rounded-full
              ml-5
            "
            >Deactivated</span
          >
          <span
            v-if="props.row.status == 'active'"
            class="
              bg-green-500
              text-green-800
              px-3
              py-1
              text-sm
              rounded-full
              ml-5
            "
            >Active</span
          >
        </span>
        <!-- the Action column -->

        <span v-else-if="props.column.field == 'action'">
          <span
            class="
              btn btn-outline
              border-gray-300
              hover:bg-accent hover:border-accent
              bg-gray-300
              btn-sm
              mx-4
            "
            @click="setProduct(props.row.id)"
          >
            <i class="fa fa-eye text-white"></i>
          </span>
          <button
            class="btn text-white btn-sm btn-outline"
            :class="props.row.status === 'active' ? 'bg-red-500' : 'bg-accent'"
            @click="
              updateStatus(
                props.row.status === 'active'
                  ? {
                      id: props.row.id,
                      collection: 'products',
                      status: 'inactive',
                    }
                  : {
                      id: props.row.id,
                      collection: 'products',
                      status: 'active',
                    }
              )
            "
          >
            {{ props.row.status === 'active' ? 'Deactivate' : 'Activate' }}
          </button>
        </span>
        <!-- this will apply for the columns that have no condtions written -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <product-modal
      v-if="showModal"
      :product="displayedProduct"
      @close-modal="showModal = false"
    />
  </div>
</template>

<script>
import firebase from 'firebase'
import ProductModal from '~/components/ProductModal.vue'
export default {
  components: {
    ProductModal,
  },
  data() {
    return {
      // the column list
      columns: [
        {
          label: 'Product',
          field: 'name',
          width: '50px',
        },
        {
          label: 'Quantity',
          field: 'inventory',
          width: '100px',
        },
        {
          label: 'Posted by',
          field: 'creator',
          width: '50px',
        },
        {
          label: 'Created Date',
          field: 'date',
          width: '50px',
        },
        {
          label: 'Action',
          field: 'action',
          width: '90px',
          sortable: false,
        },
      ],
      products: [],
      displayedProduct: {},
      users: {},
      showModal: false,
      productList: [],
    }
  },
  async created() {
    // dispaches the action to display the loading animation for 700ms
    this.$store.dispatch('loading/toggleLoading', true)
    if (!this.$store.state.dashboard.productData)
      this.products = await this.$store.dispatch(
        'dashboard/getTotalProductAction'
      )
    this.products = this.$store.state.dashboard.productData
    const userIds = []
    this.products.forEach((user) =>
      !userIds.includes(user.sellerId) ? userIds.push(user.sellerId) : _
    )
    const userRef = firebase.firestore().collection('users')
    const userSnapshot = await userRef
      .where(firebase.firestore.FieldPath.documentId(), 'in', userIds)
      .get()
    userSnapshot.forEach((snapshot) => {
      this.users[snapshot.id] = snapshot.data()
    })
    this.products.forEach((product) => {
      let tempStatus = 'active'
      // eslint-disable-next-line no-unused-expressions
      product.status && product.status === 'inactive'
        ? (tempStatus = 'deactivated')
        : _
      if (this.users[product.sellerId]) {
        
        product.creator =
          this.users[product.sellerId].firstName +
          ' ' +
          this.users[product.sellerId].lastName
        this.productList.push({
          id: product.id,
          name: product.name,
          inventory: product.inventory.instock,
          creator:
            this.users[product.sellerId].firstName +
            ' ' +
            this.users[product.sellerId].lastName,
          date:
            typeof product.postedDate === 'string'
              ? new Date(Date.parse(product.postedDate)).toLocaleString()
              : new Date(product.postedDate * 1000).toLocaleDateString(),
          // creator: product.
          // roles: product.roles ? product.roles.join(', ') : _,
          roles: product.roles,
          //   locaton: product.location,
          status: tempStatus,
        })
      }
    })
    // dispach the action to fetch the avaliable measure data
    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    setProduct(id) {
      this.displayedProduct = this.products.find((product) => product.id === id)
      this.showModal = true
    },
    updateRole(id) {
      this.products.forEach((product) => {
        if (product.id === id) {
          const tempRole = []
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.admin ? tempRole.push('admin') : _
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.classifier ? tempRole.push('classifier') : _
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.product ? tempRole.push('product') : _
          this.$store
            .dispatch('dashboard/updateRoleAction', {
              id: product.id,
              roles: tempRole,
            })
            .then(() => {
              product.roles = tempRole
            })
        }
      })
    },
    updateStatus(data) {
      this.products.forEach((product) => {
        if (product.id === data.id) {
          this.$store
            .dispatch('dashboard/updateStatusAction', data)
            .then(() => {
              product.status = data.status
              // eslint-disable-next-line no-return-assign
              this.productList.forEach((product) =>
                product.id === data.id ? (product.status = data.status) : _
              )
            })
        }
      })
    },
    getUserName(id) {
      while (!this.users[id] && false) {
        console.log(this.users)
      }
      console.log(this.users[id])
      return this.users[id]
    },
  },
}
</script>

<style scoped>
</style>