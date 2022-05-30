/* eslint-disable no-unused-expressions */ /* eslint-disable
no-unused-expressions */
<template>
  <div class="text-2xs">
    <h1 class="ml-5 mt-3 mb-5 font-bold text-2xl">Total Users</h1>
    <vue-good-table
      class="condensed vgt-table px-4 md:w-full"
      :columns="columns"
      :search-options="{
        enabled: true,
        placeholder: 'Search...',
      }"
      :rows="userList"
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
        <div v-else-if="props.column.field == 'email'">
          <span>{{ props.row.email }}</span>
        </div>
        <div v-else-if="props.column.field == 'roles'">
          <span>{{ props.row.roles ? props.row.roles.join(', ') : _ }}</span>
        </div>
        <div v-else-if="props.column.field == 'date'">
          <span>{{ props.row.date }}</span>
        </div>
        <!-- the progress column condition -->
        <span v-else-if="props.column.field == 'status'">
          <span
            v-if="props.row.status == 'deactivated'"
            class="text-red-400 px-3 py-1 ml-5 text-sm"
          >
            <i
              class="
                fa fa-circle fa-xs
                text-red-600
                mr-3
                hidden
                md:inline-block
              "
            ></i>
            Deactivated</span
          >
          <span
            v-if="props.row.status == 'active'"
            class="text-green-400 px-3 py-1 ml-5 text-sm"
            ><i
              class="
                fa fa-circle fa-xs
                text-green-600
                mr-3
                hidden
                md:inline-block
              "
            ></i
            >Active</span
          >
        </span>
        <!-- the Action column -->

        <span v-else-if="props.column.field == 'action'">
          <div class="dropdown">
            <button
              class="
                btn
                bg-blue-500
                text-white
                btn-sm btn-outline
                ml-6
                hidden
                md:inline-flex
              "
              @click="
                setRoles(props.row.id)
                toggleDropdown()
              "
            >
              <img
                src="~/assets/images/gearAdmin.svg"
                alt=""
                class="w-6 mb-1 mr-2"
              />Manage
            </button>
            <button
              class="
                btn
                border-none
                btn-sm
                ml-6
                inline-block
                md:hidden
                w-full
                mr-24
              "
              @click="
                setRoles(props.row.id)
                toggleDropdown()
              "
            >
              <img
                src="~/assets/images/gearAdmin.svg"
                alt=""
                class="mb-1 mr-2 w-10"
              />
            </button>

            <div
              v-if="showDropdown"
              class="
                p-2
                shadow
                menu
                dropdown-content
                bg-gray-100
                rounded-box
                w-52
              "
            >
              <h1 class="text-sm font-semibold text-gray-400 mt-3 ml-1">
                Roles
              </h1>
              <div class="mt-2">
                <div class="my-4">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox w-6 h-6 mr-2 cursor-pointer"
                      :checked="updatedRoles.admin"
                      @change="updatedRoles.admin = $event.target.checked"
                    />
                    <span class="ml-2">Admin</span>
                  </label>
                </div>
                <div class="my-4">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox w-6 h-6 mr-2 cursor-pointer"
                      :checked="updatedRoles.classifier"
                      @change="updatedRoles.classifier = $event.target.checked"
                    />
                    <span class="ml-2">Classifier</span>
                  </label>
                </div>
                <div class="my-4">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox w-6 h-6 mr-2 cursor-pointer"
                      :checked="updatedRoles.user"
                      @change="updatedRoles.user = $event.target.checked"
                    />
                    <span class="ml-2">User</span>
                  </label>
                </div>
                <div class="my-2">
                  <button
                    class="btn btn-sm btn-accent"
                    @click="updateRole(props.row.id)"
                  >
                    Save
                  </button>
                </div>
                <h1 class="text-sm font-semibold text-gray-400 my-3 ml-1">
                  Change Status
                </h1>
                <button
                  class="btn text-white btn-sm btn-outline"
                  :class="
                    props.row.status === 'active' ? 'bg-red-500' : 'bg-accent'
                  "
                  @click="
                    updateStatus(
                      props.row.status === 'active'
                        ? {
                            id: props.row.id,
                            collection: 'users',
                            status: 'inactive',
                          }
                        : {
                            id: props.row.id,
                            collection: 'users',
                            status: 'active',
                          }
                    )
                  "
                >
                  {{
                    props.row.status === 'active' ? 'Deactivate' : 'Activate'
                  }}
                </button>
              </div>
            </div>
          </div>
        </span>
        <!-- this will apply for the columns that have no condtions written -->
        <span v-else class="text-sm">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // the column list
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: '90px',
        },
        {
          label: 'Status',
          field: 'status',
          width: '100px',
        },
        {
          label: 'Email',
          field: 'email',
          width: '90px',
        },
        {
          label: 'Roles',
          field: 'roles',
          width: '100px',
        },
        {
          label: 'Date (DD/MM/YYYY)',
          field: 'date',
          dateFormat: 'DD/MM/YYYY',
          width: '100px',
        },
        {
          label: 'Action',
          field: 'action',
          width: '1px',
          sortable: false,
        },
      ],
      users: [],
      showDropdown: false,
      fireRoles: {
        admin: false,
        classifier: false,
        user: false,
      },
      updatedRoles: {
        admin: false,
        classifier: false,
        user: false,
      },
    }
  },
  computed: {
    // returns the data that is going to be dispalyed by tracking the number of data verified so far
    userList() {
      const returnedArray = []
      this.users.forEach((user) => {
        let tempStatus = 'active'
        // eslint-disable-next-line no-unused-expressions
        user.status && user.status === 'inactive'
          ? (tempStatus = 'deactivated')
          : _
        returnedArray.push({
          id: user.id,
          date: user.date,
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
          // roles: user.roles ? user.roles.join(', ') : _,
          roles: user.roles,
          //   locaton: user.location,
          status: tempStatus,
        })
      })

      return returnedArray
    },
  },
  async created() {
    // dispaches the action to display the loading animation for 700ms
    this.$store.dispatch('loading/toggleLoading', true)
    if (!this.$store.state.dashboard.userData)
      await this.$store.dispatch('dashboard/getTotalUsersAction')
    this.users = this.$store.state.dashboard.userData

    // dispach the action to fetch the avaliable measure data
    this.$store.dispatch('loading/toggleLoading', false)
  },
  methods: {
    setRoles(id) {
      const currentUser = this.users.find((user) => user.id === id)
      this.updatedRoles = this.fireRoles = currentUser.roles
        ? {
            admin: currentUser.roles.includes('admin'),
            classifier: currentUser.roles.includes('classifier'),
            user: currentUser.roles.includes('user'),
          }
        : _
    },
    updateRole(id) {
      this.users.forEach((user) => {
        if (user.id === id) {
          const tempRole = []
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.admin ? tempRole.push('admin') : _
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.classifier ? tempRole.push('classifier') : _
          // eslint-disable-next-line no-unused-expressions
          this.updatedRoles.user ? tempRole.push('user') : _
          this.$store
            .dispatch('dashboard/updateRoleAction', {
              id: user.id,
              roles: tempRole,
            })
            .then(() => {
              user.roles = tempRole
            })
          this.showDropdown = false
        }
      })
    },
    updateStatus(data) {
      this.users.forEach((user) => {
        if (user.id === data.id) {
          this.$store
            .dispatch('dashboard/updateStatusAction', data)
            .then(() => {
              user.status = data.status
            })
          this.showDropdown = false
        }
      })
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
  },
}
</script>

<style scoped></style>
