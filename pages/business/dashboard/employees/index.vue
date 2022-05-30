<template>
  <div class="main-container">
    <div class="table-container">
      <div class="head-section">
        <h1><b>ASSOCIATES PANEL</b></h1>
        <div>
          <nuxt-link to="/business/dashboard/employees/add"
            ><div class="mask-1">
              <img class="" />
            </div>
            <span class="pt-1">Add</span>
          </nuxt-link>
        </div>
      </div>

      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          mode: 'pages',
          perPage: 5,
        }"
      >
        <!-- START TABLE STYLE -->
        <div slot="table-row" slot-scope="props" class="text-sm">
          <span v-if="props.column.field === 'name'">
            <span>
              {{ props.row.name }}
            </span>
          </span>

          <span v-if="props.column.field === 'carbon_credit'">
            {{ props.row.carbon_credit }}<span class="text-accent"></span>
          </span>
          <span v-if="props.column.field === 'email'">
            {{ props.row.email }}
          </span>
          <label v-if="props.column.field === 'action'" class="bg-gray-300">
            <div class="flex md:gap-x-3 gap-x-1">
              <img
                src="~assets/images/product/views7.jpg"
                class="
                  bg-gray-300
                  opacity-75
                  hover:opacity-95
                  rounded-full
                  p-2
                  cursor-pointer
                  w-8
                  h-8
                "
                @click="openViewModal(props.row)"
              />
              <img
                src="~/assets/images/business/deactivate.svg"
                class="opacity-70 p-2 cursor-pointer w-9"
                @click="deleteEmployee(props.row.id)"
              />
            </div>
          </label>
        </div>
        <!-- END TABLE STYLE style -->
      </vue-good-table>
      <v-dialog />

      <!-- Modal section -->
      <div ref="viewModal" class="modal">
        <div class="modal-box bg-white space-y-4">
          <h1><b>ASSOCIATES Details</b></h1>
          <div class="flex gap-8">
            <div class="font-bold space-y-2">
              <p>Name</p>
              <p>Email</p>
              <p>Date Joined</p>
              <p>PhoneNo</p>
              <!-- <p>Request Carbon Credit</p> -->
            </div>
            <div class="space-y-2">
              <p>{{ selectedUser ? selectedUser.name : '' }}</p>
              <p>{{ selectedUser ? selectedUser.email : '' }}</p>
              <p>{{ selectedUser ? selectedUser.dateJoined : '' }}</p>
              <p>
                {{ selectedUser ? selectedUser.tel : '***' }}
              </p>
            </div>
          </div>
          <div class="modal-action">
            <!-- <button
              ref="requestBtn"
              class="
                requestBtn
                btn btn-sm
                bg-green-600
                text-white
                hover:bg-green-500
              "
              :disabled="requestAmount <= 0"
              @click="requestCarbonCredit"
            >
              Request Carbon Credit
            </button> -->

            <label
              for="emp-modal"
              class="
                btn btn-sm
                border-none
                bg-gray-300
                hover:bg-gray-400 hover:text-gray-100
              "
              @click="closeViewModal"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VueGoodTablePlugin from 'vue-good-table'

// import the vue-good-table styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin)

export default {
  data() {
    return {
      business: undefined,
      employees: [],
      columns: [
        {
          label: 'Name',
          field: 'name',
          type: 'string',
        },
        {
          label: 'Total Emission',
          field: 'carbon_credit',
          type: 'string',
        },
        {
          label: 'Email',
          field: 'email',
          type: 'string',
        },
        {
          label: 'Action',
          field: 'action',
          type: 'string',
        },
      ],
      rows: [],
      requestAmount: 0,
      selectedUser: undefined,
      emissionData: [],
    }
  },
  computed: {
    selectedUserIndentifier() {
      return this.selectedUser
    },
  },
  async created() {
    this.$store.dispatch('loading/toggleLoading', true)

    const uid = this.$fire.auth.currentUser?.uid
    const businessRef = this.$fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', uid)
      .limit(1)

    const businessData = (await businessRef.get()).docs[0]
    const business = { id: businessData.id, ...businessData.data() }
    this.business = business
    const employeeIds = []
    this.business.Employees.forEach((emp) => {
      employeeIds.push(emp.employeeId)
    })
    if (employeeIds.length !== 0) {
      const tempEmissions = []
      const emissionsRef = this.$fire.firestore.collection('emissionsHistory')
      const emissionSnapshot = await emissionsRef.get()
      emissionSnapshot.forEach((doc) => {
        tempEmissions.push({ id: doc.id, ...doc.data() })
      })

      tempEmissions.forEach((emission) => {
        this.emissionData[emission.uid] = emission
      })
    }
    await this.fetchEmployees()
    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    activateRequestButton() {
      return requestAmount <= 0 ? 'disabled' : ''
    },

    async fetchEmployees() {
      const filteredEmployees = []
      this.business.Employees.forEach((emp) => {
        if (emp.status === 'active') {
          filteredEmployees.push(emp)
        }
      })
      const employeesIdList = _.map(filteredEmployees, (emp) =>
        this.$fire.firestore.collection('users').doc(emp.employeeId).get()
      )
      const response = await Promise.all(employeesIdList)
      const employees = response.map((empRef) => ({
        id: empRef.id,
        name: `${empRef.data().firstName} ${empRef.data().lastName}`,
        email: empRef.data().email,
        tel: empRef.data()?.tel,
        dateJoined: empRef.data().date,
        carbon_credit: this.emissionData[empRef.id]?.totalEmissions
          ? this.emissionData[empRef.id]?.totalEmissions.toFixed(2)
          : 0,
      }))

      this.rows = employees
    },

    async requestCarbonCredit() {
      if (typeof this.selectedUser === 'undefined') return

      const employeeId = this.selectedUser?.id

      const ccRequetCollectionRef = this.$fire.firestore.collection(
        'carbonCreditRequests'
      )
      const requestDoc = await ccRequetCollectionRef.add({
        employeeId,
        businessId: this.business.id,
        amount: this.requestAmount,
        status: 'pending',
      })

      await this.$store.dispatch('business/createBusinessNotification', {
        link: `http://localhost:3000/business/request?ct=${requestDoc.id}`,
        empId: employeeId,
        message: `You have new send business carbon coin request from ${this.business.Name}`,
      })

      this.requestAmount = 0
      this.$modal.hide('emp-modal')
    },
    deleteEmployee(empId) {
      // if (typeof this.selectedUser === 'undefined') return

      if (confirm('Are you sure you want to delete this associate')) {
        const updatedEmployee = []
        this.business.Employees.forEach((employee) => {
          if (employee.employeeId === empId) {
            employee.status = 'inactive'
          }
          updatedEmployee.push(employee)
        })
        // console.log('updated', updatedEmployee)
        this.$store.dispatch('business/removeEmployee', {
          businessId: this.business.id,
          employees: updatedEmployee,
        })
        alert('Associate deleted')
        const newRows = []
        this.rows.forEach((emp) => {
          if (emp.id !== empId) {
            newRows.push(emp)
          }
        })
        this.rows = newRows
      }
    },
    openViewModal(row) {
      const viewModal = this.$refs.viewModal
      this.selectedUser = row

      viewModal.classList.add('modal-open')
    },
    closeViewModal() {
      const viewModal = this.$refs.viewModal
      this.selectedUser = undefined

      viewModal.classList.remove('modal-open')
    },
  },
}
</script>

<style scoped>
button.requestBtn:disabled {
  @apply no-animation bg-gray-200 text-gray-300 border-none;
}

.main-container {
  @apply p-8;
}
.table-container {
  @apply max-w-md
        md:max-w-3xl
        lg:max-w-5xl
        overflow-hidden
        mx-auto
        space-y-4;
}
.table-container .head-section {
  @apply flex justify-between w-full items-center pr-2;
}
.table-container .head-section a {
  @apply flex
        items-center
        justify-center
        gap-1
        text-accent
        font-semibold;
}
.table-container .head-section img {
  @apply bg-accent w-6 h-5;
}
.mask-1 {
  -webkit-mask-image: url(~/assets/images/business/add_person.svg);
  mask-image: url(~/assets/images/business/add_person.svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
