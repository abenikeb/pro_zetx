<template>
  <div class="container">
    <section class="info">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-xl font-bold text-gray-500">Add Associates</h3>
        <div class="tooltip-container">
          <div
            data-tip="
          The associate will recieve the link should accept the
          request to join your business in order to
          participate in your business dashboard.
        "
            class="tooltip"
          >
            <button>
              <span class="icon icon-light-green icon-question"></span>
              <!-- <span>More Info</span> -->
            </button>
          </div>
        </div>
      </div>
      <hr />
      <br />

      <div class="info-body text-gray-400">
        <!-- <div class="tooltip-container">
          <div
            data-tip="
          The associate will recieve the link should accept the
          request to join your business in order to
          participate in your business dashboard.
        "
            class="tooltip"
          >
            <button>
              <span class="icon icon-light-green icon-question"></span>
              <span>More Info</span>
            </button>
          </div>
        </div> -->
      </div>

      <div class="inf">
        <!-- To add an associate search for a user using their email or username.
        When you have identified your user you can press the view modal and add
        the user as an associate from there. -->
        To add an associate, click the
        <span class="bg-gray-200 text-sm font-bold rounded-md px-2"
          >Generate Invite Link</span
        >
        button and you can send the link through email, or any other social
        media platforms. Your associates will be able to join your business when
        they open the link.
      </div>
    </section>

    <section class="search">
      <div class="form-control">
        <!-- Generate Link Section -->
        <div class="mb-2">
          <button class="generate-btn" @click="openGenerateModal">
            Generate Invite Link
          </button>

          <div ref="generateLinkModal" class="modal">
            <div class="modal-box">
              <div>
                <div class="generate-input">
                  <div class="generate-input-help">
                    Send this link through notification, message or social
                    media. Users will be able to join your business when they
                    open the link.
                  </div>
                  <div class="relative">
                    <input
                      type="text"
                      readonly
                      placeholder="Copy the link below"
                    />
                    <button @click="handleLinkCopy">Copy Link</button>
                  </div>
                  <small
                    class="
                      generate-input-copy-success
                      text-xs text-green-400
                      hidden
                    "
                    >Succuessfully copied link.</small
                  >
                </div>
              </div>
              <div class="modal-action">
                <button class="modal-close-btn" @click="closeGenerateModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="relative search-input">
          <input
            ref="search-input"
            type="text"
            placeholder="Search"
            @keydown="handleSearchEnterTrigger"
          />

          <button
            ref="search-btn"
            class="flex gap-1 items-center"
            @click="handleSearch"
          >
            <span :class="!searchLoading && 'hidden'">
              <span class="icon icon-spinner bg-gray-300 animate-spin"></span>
              Loading
            </span>
            <span :class="searchLoading && 'hidden'">
              <span class="icon icon-search bg-white"></span> Search
            </span>
          </button>
        </div> -->

        <!-- <div class="search-includes-select"></div> -->
      </div>
    </section>

    <!-- If page first loads don't show results -->
    <section v-if="!pageLoad" class="results">
      <div v-if="searchLoading" class="results-loading">
        <span class="icon icon-user-location bg-gray-300 animate-bounce"></span>
        Finding Users Please Wait
      </div>

      <div v-if="!searchLoading" class="w-full">
        <div v-if="users.length <= 0">
          <span class="icon icon-sad bg-gray-300"></span>
          Sorry, Unable to Find Matching User
        </div>

        <div v-else class="user-list">
          <user-card
            v-for="(user, idx) in users"
            :key="idx"
            :user="user"
            @openRequestModal="openRequestModal"
          />
        </div>

        <div ref="addUserModal" class="modal">
          <div class="modal-box">
            <div>
              <div>
                <div class="add-user-title">
                  Send Join Business Request to User
                </div>
                <div class="add-user-message">
                  Are you sure you want to send a join company request to user
                  {{ getSelectedUserName() }}?
                </div>
              </div>
            </div>
            <div class="modal-action">
              <button class="modal-cancel-btn" @click="closeRequestModal">
                Cancel
              </button>
              <button class="modal-send-btn" @click="handleRequestSend">
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section v-else>
      <div class="search-users-message text-gray-400 font-light">
        <span class="icon icon-point-up bg-green-300 animate-bounce"></span>
        Start searching to find an associate
      </div>
    </section> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'

import UserCard from '~/components/business/UserCard.vue'

type UserInfoType = { id: string; email: string; fullname: string }

export default Vue.extend({
  components: {
    'user-card': UserCard as Vue.Component,
  },

  data() {
    return {
      searchLoading: false,
      pageLoad: true,
      business: undefined as undefined | any,
      users: [] as Array<UserInfoType>,
      selectedUser: undefined as UserInfoType | undefined,
    }
  },

  created() {
    this.$store.dispatch('loading/toggleLoading', true)
  },

  async mounted() {
    const modalOutside = document.getElementsByClassName(
      'modal'
    )[0] as HTMLDivElement

    await this.fetchBusinessInformation()

    /* Generating Link */
    const linkInput = modalOutside.getElementsByTagName(
      'input'
    )[0] as HTMLInputElement
    linkInput.value = this.businessLink(this.business.id)

    modalOutside?.addEventListener('click', function (e: Event) {
      e.stopPropagation()
      const self = e.target as HTMLElement

      if (modalOutside.isSameNode(self)) {
        modalOutside.classList.remove('modal-open')
      }
    })
    this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {
    async fetchBusinessInformation() {
      const uid = this.$fire.auth.currentUser?.uid
      const businessRef = this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', uid)
        .limit(1)
      const businessData = (await businessRef.get()).docs[0]

      this.business = {
        id: businessData.id,
        ...businessData.data(),
      }
    },

    async searchUsers(keyword: string) {
      const usersPromise = this.$fire.firestore.collection('users').get()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [users, _binfoResult] = await Promise.all([
        usersPromise,
        this.fetchBusinessInformation(),
      ])

      this.users = []
      users.forEach((u) => {
        const { email, firstName, lastName } = u.data()

        if (
          ![email, firstName, lastName]
            .map((val: string) =>
              val.toLowerCase().includes(keyword.toLowerCase())
            )
            .includes(true)
        )
          return

        // Skip if found self account
        if (u.id === this.$fire.auth.currentUser?.uid) return
        // Skip if user already employee
        if (
          _.includes(
            this.business.Employees.map(
              (emp: { employeeId: string; status: string }) => emp.employeeId
            ),
            u.id
          )
        )
          return

        this.users.push({
          id: u.id,
          email,
          fullname: `${firstName} ${lastName}`,
        })
      })
    },

    async handleSearch(e: Event) {
      const self = e.target as HTMLButtonElement
      const searchInput = this.$refs['search-input'] as HTMLInputElement

      if (searchInput.value.length === 0) return

      this.pageLoad = false

      this.searchLoading = true
      self.setAttribute('disabled', 'disabled')

      await this.searchUsers(searchInput.value)

      self.removeAttribute('disabled')
      this.searchLoading = false
    },

    async handleSearchEnterTrigger(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        const searchBtn = this.$refs['search-btn'] as HTMLButtonElement
        const searchInput = e.target as HTMLInputElement
        if (searchInput.value.length === 0) return
        this.pageLoad = false

        this.searchLoading = true
        searchBtn.setAttribute('disabled', 'disabled')

        await this.searchUsers(searchInput.value)

        searchBtn.removeAttribute('disabled')
        this.searchLoading = false
      }
    },

    openGenerateModal() {
      const generateModal = this.$refs.generateLinkModal as HTMLDivElement
      generateModal.classList.add('modal-open')
      const linkCopyBtn = generateModal.getElementsByTagName(
        'button'
      )[0] as HTMLInputElement

      linkCopyBtn.focus()
    },

    closeGenerateModal() {
      const generateModal = this.$refs.generateLinkModal as HTMLDivElement

      /* Hide copy success message */
      const copySuccessMsg = document.getElementsByClassName(
        'generate-input-copy-success'
      )[0] as HTMLElement
      copySuccessMsg?.classList.add('hidden')

      generateModal.classList.remove('modal-open')
    },

    handleLinkCopy() {
      navigator.clipboard.writeText(
        this.businessLink(this.business.id as string)
      )

      /* Show copy success message */
      const copySuccessMsg = document.getElementsByClassName(
        'generate-input-copy-success'
      )[0] as HTMLElement

      copySuccessMsg.classList.remove('hidden')
    },

    openRequestModal(data: { uid: string }) {
      if (typeof data.uid === 'undefined') return

      const addUserModal = this.$refs.addUserModal as HTMLDivElement

      this.selectedUser = this.users.find((u) => u.id === data.uid)
      addUserModal.classList.add('modal-open')
    },

    closeRequestModal() {
      const addUserModal = this.$refs.addUserModal as HTMLDivElement
      this.selectedUser = undefined

      addUserModal.classList.remove('modal-open')
    },

    async handleRequestSend() {
      if (typeof this.selectedUser?.id === 'undefined') return

      const uid = this.$fire.auth.currentUser?.uid

      if (this.selectedUser?.id === uid) return

      const businessRef = this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', uid)
        .limit(1)
      const business = (await businessRef.get()).docs[0]
      const updatedBusiness = { ...business.data() }

      if (!updatedBusiness.Requests.includes(this.selectedUser?.id))
        updatedBusiness.Requests = _.concat(updatedBusiness.Requests, [
          this.selectedUser?.id,
        ])

      await this.$fire.firestore
        .collection('business')
        .doc(business.id)
        .update(updatedBusiness)

      await this.$store.dispatch('business/createBusinessNotification', {
        link: this.businessLink(business.id),
        empId: this.selectedUser?.id,
        message: `You have new join business invitation from ${
          business.data().Name
        }`,
      })

      this.closeRequestModal()
    },

    // businessLink(businessId: string) {
    //   return `http://greencheddar.org/business/join?b=${businessId}`
    // },
    businessLink(businessId: string) {
      return `${window.location.origin}/business/join?b=${businessId}`
    },

    getSelectedUserName() {
      return this.selectedUser?.fullname || 'Name Not Provided'
    },
  },
})
</script>

<style scoped>
.container {
  @apply pt-4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 75%;
  margin: 0 auto;
}

.container .search .search-input input {
  @apply w-full pr-16 input input-primary
      input-bordered border-green-400 rounded;
}

.container .search .search-input button {
  @apply absolute top-0 right-0  bg-green-500 hover:bg-green-600 border-none
    rounded-l-none rounded-r btn btn-primary no-animation;
}

.container .search .generate-btn {
  @apply btn btn-sm bg-green-400 hover:bg-green-500
    border-none rounded text-gray-50 text-sm;
}

.container .results {
  @apply text-gray-400;
}

.container .results .results-loading,
.container .search-users-message {
  @apply flex items-center justify-center;
  line-height: 0;
  gap: 0.3em;
  text-transform: capitalize;
}

.container .results .results-loading::after {
  content: '...';
}

.container .results .user-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  justify-content: safe center;
}

.info .info-body {
  text-align: justify;
}

.icon-question {
  mask: url('~/assets/images/business/question-circle-solid.svg');
}

.icon-search {
  mask: url('~/assets/images/business/search-solid.svg');
}

.icon-spinner {
  mask: url('~/assets/images/business/spinner.svg');
}

.icon-user-location {
  mask: url('~/assets/images/business/user-location.svg');
}

.icon-sad {
  mask: url('~/assets/images/business/sad-dizzy.svg');
}

.icon-point-up {
  mask: url('~/assets/images/business/hand-point-up-solid.svg');
}

.icon-light-green {
  background: #37cdbe;
  opacity: 30%;
}

.icon {
  /* @apply bg-gray-300; */
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;

  transition-duration: 200ms;
  transition-property: opacity;
}

.icon:hover .tooltip::before {
  opacity: 70%;
}

.icon:hover .tooltip::before {
  opacity: 100%;
}

.tooltip-container {
  display: flex;
  /* justify-content: right; */
  white-space: normal;

  /* margin-bottom: 0.8em; */
  /* margin-left: 1.3em; */
}

.tooltip-container * {
  display: inline-block;
  line-height: 0%;
}
/* justify-self: right; */
/* .tooltip-container .tooltip {

  display: inline-flex;
  flex-direction: row;
  align-content: center;
} */

.tooltip {
  @apply tooltip-bottom;
}

.tooltip::before {
  @apply text-gray-50;
  background-color: #37cdbe;
  z-index: 999;
}

.search .search-input button {
  line-height: 0ch;
  display: inline-flex;
  flex-direction: row;
  align-content: center;
}

.search .search-input .icon {
  height: 1em;
}

.modal .modal-box {
  @apply bg-white rounded;
}

.modal::before {
  content: '';
  background: rgb(75, 85, 99);
  opacity: 40%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.modal .modal-close-btn {
  @apply btn btn-sm bg-green-300
    rounded
    text-white border-none transition-all duration-150 ease-in-out;
}

.modal .modal-close-btn:hover {
  @apply bg-green-400;
}

.modal .modal-send-btn {
  @apply btn btn-sm bg-green-300
    rounded
    text-white border-none transition-all duration-150 ease-in-out;
}

.modal .modal-send-btn:hover {
  @apply bg-green-400;
}

.modal .modal-cancel-btn {
  @apply btn btn-sm bg-transparent rounded no-animation
    text-gray-300 border-none transition-all duration-150 ease-in-out;
}

.modal .modal-cancel-btn:hover {
  @apply text-gray-500;
}

.modal .generate-input input {
  @apply w-full pr-16 input input-sm rounded-sm
    input-bordered
    text-gray-500
    border-green-200;
}

.modal .generate-input button {
  @apply absolute top-0 right-0 rounded-l-none rounded-r-sm
    btn btn-sm
    bg-green-300 hover:bg-green-400
    text-white border-none;
}

.modal .generate-input-help {
  @apply text-sm text-gray-400 font-light pb-4;
}

.modal .add-user-title {
  @apply text-base text-gray-300 pb-2;
  text-transform: uppercase;
}

.modal .add-user-message {
  @apply text-base text-gray-500 pb-4;
}

@media screen and (max-width: 768px) {
  .container {
    width: 86%;
  }

  .tooltip {
    @apply tooltip-bottom;
  }

  .tooltip::before {
    @apply text-gray-50 pl-12;
    background-color: #37cdbe;
    z-index: 999;
    margin-left: 10px;
  }

  .info .info-body {
    display: flex;
    flex-direction: column-reverse;
  }

  .container .results .user-list {
    justify-content: space-evenly;
  }
}
</style>
