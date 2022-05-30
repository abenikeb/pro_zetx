<template>
  <div class="container-fixed">
    <!-- Navigation Top -->
    <nav>
      <div class="nav-collapse">
        <div class="logo-section">
          <!-- Logo Here -->
          <nuxt-link to="/">
            <img src="~/assets/images/logo.svg" alt="" />
          </nuxt-link>

          <!-- Go to dashboard btn -->
          <nuxt-link to="/dashboard">
            <button class="dashboard-btn">Switch to account</button>
          </nuxt-link>
          <!-- END - Go to dashboard btn -->
        </div>
        <div class="dropdown">
          <label
            tabindex="0"
            class="dropdown-button relative"
            @click="toggelNav = !toggelNav"
            ><img
              src="~/assets/images/bell.svg"
              class="w-8 mr-4 opacity-40 hover:opacity-60"
              alt=""
            />
            <span
              v-if="numNotification"
              class="
                absolute
                top-4
                -right-8
                bg-red-600
                text-white
                px-2
                py-0.5
                ring-2 ring-white
                rounded-full
                text-xs
              "
              >{{ numNotification }}</span
            ></label
          >
          <ul
            v-if="toggelNav"
            tabindex="1"
            class="dropdown-content notification-dropdown"
          >
            <p class="dropdown-header-title">Notification</p>

            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex w-full"
            >
              <li>
                <div v-if="notification.type == 7" class="dorpdown-container">
                  <img src="~/assets/images/business/bfk5.svg" />

                  <div>
                    <nuxt-link
                      :to="notification.link"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(notification.dateTime)
                        } ago`
                      }}
                    </div>
                  </div>

                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>
              </li>
            </div>
            <span
              class="
                text-blue-600
                hover:text-blue-800
                cursor-pointer
                hover:underline
                text-center
                mt-2
              "
            >
              <nuxt-link
                to="/business/notifications"
                @click="togelAllActiveNotify"
                >All Notifications</nuxt-link
              >
            </span>
          </ul>
        </div>
        <div class="top-nav-collapse">
          <div class="nav-dropdown">
            <div tabindex="0" class="m-1 btn" @click="toggelNav = !toggelNav">
              <span class="w-full h-full">
                <img
                  src="~/assets/images/business/bars-solid.svg"
                  alt="Top navbar menu icon"
                />
              </span>
            </div>
            <ul v-if="toggelNav" tabindex="0" class="menu dropdown-content">
              <li>
                <nuxt-link
                  to="/business/dashboard"
                  @click.native="toggelNav = !toggelNav"
                >
                  <span>
                    <img
                      src="~/assets/images/business/home_black.svg"
                      alt="Dashboard home icon"
                    />
                  </span>
                  <a>Home</a>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link
                  to="/business/dashboard/leaderboard"
                  @click.native="toggelNav = !toggelNav"
                >
                  <span>
                    <img
                      src="~/assets/images/business/leaderboard.svg"
                      alt="Dashboard home icon"
                    />
                  </span>
                  <a>Leaderboard</a>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link
                  to="/business/dashboard/employees"
                  @click.native="toggelNav = !toggelNav"
                >
                  <span>
                    <img
                      src="~/assets/images/business/employee.svg"
                      alt="Dashboard home icon"
                    />
                  </span>
                  Associate
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/business/dashboard/carbon"
                  @click.native="toggelNav = !toggelNav"
                >
                  <span>
                    <img
                      src="~/assets/images/business/monetization.svg"
                      alt="Dashboard home icon"
                    />
                  </span>
                  Manage CC
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/dashboard"
                  @click.native="toggelNav = !toggelNav"
                >
                  <div class="flex gap-x-2 items-center">
                    <span>
                      <i class="fa fa-angle-left text-accent fa-2x"></i>
                    </span>
                    <span>To account</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- Account Button -->
          <div class="account-dropdown">
            <div
              tabindex="0"
              class="m-1 btn no-animation border-none cursor-default"
              style="min-width: 12ch"
            >
              <span class="w-full h-full">
                <img
                  :src="
                    user
                      ? `https://robohash.org/${user.email}.png?set=set3`
                      : ''
                  "
                  alt="Top navbar menu icon"
                />

                <p v-if="business">{{ business.Name }}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- END - Navigation Top -->

    <!-- Body -->
    <main>
      <!-- SideNav -->
      <aside>
        <section>
          <p>General</p>
          <ul>
            <nuxt-link exact to="/business/dashboard/">
              <li>
                <div>
                  <img
                    src="~/assets/images/business/home-solid.svg"
                    alt="Business Home Icon"
                  />
                </div>
                <span class="description">Dashboard</span>
              </li>
            </nuxt-link>

            <nuxt-link exact to="/business/dashboard/leaderboard">
              <li>
                <div>
                  <i
                    class="icon icon-leaderboard bg-white"
                    style="height: 1em !important; width: 1em !important"
                  ></i>
                </div>
                <span class="description">Leaderboard</span>
              </li>
            </nuxt-link>
          </ul>
        </section>

        <section>
          <p>Associate</p>

          <ul>
            <nuxt-link to="/business/dashboard/employees/add">
              <li>
                <div>
                  <img
                    src="~/assets/images/business/user-plus-solid.svg"
                    alt="Add Employee Icon"
                  />
                </div>
                <span class="description">Add</span>
              </li>
            </nuxt-link>
            <nuxt-link exact to="/business/dashboard/employees/">
              <li>
                <div>
                  <img
                    src="~/assets/images/business/users-solid.svg"
                    alt="Employee List Icon"
                  />
                </div>
                <span class="description">Manage</span>
              </li>
            </nuxt-link>
          </ul>
        </section>

        <section>
          <p>Carbon Coin</p>

          <ul>
            <nuxt-link to="/business/dashboard/carbon">
              <li>
                <div>
                  <img
                    src="~/assets/images/business/CC2.svg"
                    class="w-10"
                    alt="Carbon Transaction Panel"
                  />
                </div>

                <span class="description">Manage</span>
              </li>
            </nuxt-link>
            <nuxt-link to="/business/dashboard/carbon/transactions">
              <li>
                <div>
                  <img
                    src="~/assets/images/business/history-solid.svg"
                    alt="Carbon Transaction Panel"
                  />
                </div>

                <span class="description">History</span>
              </li>
            </nuxt-link>
          </ul>
        </section>
        <!-- :carbonCredit="this.carbonCredit" -->
        <buyCreditModal
          v-if="showModal"
          @closeModal="showModal = false"
          @close-modal="showModal = false"
        />
      </aside>
      <!-- END - SideNav -->

      <div class="content-container"><nuxt-child /></div>
    </main>
    <!-- END - Body -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BuyCreditModal from '~/components/business/BuyCreditModal.vue'

export default Vue.extend({
  components: {
    buyCreditModal: BuyCreditModal as Vue.Component,
  },
  layout: 'business',
  middleware: ['auth', 'business'],
  data() {
    return {
      showModal: false,
      showDropdown: false,
      sidenavActive: false,
      toggelNav: false,
      business: undefined as any | undefined,
      showNotificationDropdown: false,
      notifications: [] as any,
      isBusiness: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.userData
    },
    numNotification() {
      let numNotification = 0
      this.notifications.forEach((not: any) =>
        not.status === 1 ? (numNotification += 1) : numNotification
      )
      return numNotification
    },
  },
  async created() {
    const counter = 5
    const uid = this.$fire.auth.currentUser?.uid
    const busienssRef = this.$fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', uid)
      .limit(1)

    const businessDoc = (await busienssRef.get()).docs[0]
    this.business = { id: businessDoc.id, ...businessDoc.data() }

    await this.$store.dispatch('notification/getBusinessNotificationAction')
    await this.$store.dispatch('business/updateBusinessAuctionStatus')

    const sortedNotifications =
      this.$store.state.notification.notifications.sort((a: any, b: any) =>
        a.dateTime.seconds < b.dateTime.seconds ? 1 : -1
      )

    sortedNotifications.slice(0, counter).forEach((notification: any) => {
      this.notifications.push(notification)
    })

    this.isBusiness = this.$store.state.auth.userData.roles.includes('business')
  },
  methods: {
    // toggles the dropdown
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },

    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown
    },
    // This methods gets called when the user wants to logout
    signOut() {
      this.$fire.auth.signOut()
    },

    async togelActiveNotify(notificationId: any) {
      const batch = this.$fire.firestore.batch()
      this.$store.state.notification.notifications.forEach(
        (notification: any) => {
          if (notification.id === notificationId) {
            const notificationRef = this.$fire.firestore
              .collection('notifications')
              .doc(notification.id)
            batch.update(notificationRef, { status: 2 })
          }
        }
      )
      await batch.commit().then((): any => {
        this.notifications.forEach((notification: any) => {
          if (notification.id === notificationId) notification.status = 2
        })
      })
    },

    async togelAllActiveNotify() {
      const batch = this.$fire.firestore.batch()
      this.$store.state.notification.notifications.forEach(
        (notification: any) => {
          if (notification.status === 1) {
            const notificationRef = this.$fire.firestore
              .collection('notifications')
              .doc(notification.id)
            batch.update(notificationRef, { status: 2 })
          }
        }
      )
      await batch.commit().then(() => {
        setTimeout(() => {
          this.notifications.forEach((notification: any) => {
            notification.status = 2
          })
        }, 2000)
      })
    },

    timeSince(date: any) {
      const seconds = Math.floor(((new Date() as any) - date) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
  },
})
</script>

<style lang="scss">
.icon {
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  &.icon-leaderboard {
    mask: url('~/assets/images/business/chess-queen.svg');
  }
}
</style>

<style scoped>
.container-fixed {
  @apply flex flex-col;
  width: 100%;
}
/* END - Top-Nav Dropdown */
.container-fixed > nav {
  @apply w-full;
  background: #ffffff;

  height: 64px;
}

.container-fixed nav > .nav-collapse div:first-child {
  margin-right: auto;
}

.container-fixed > nav img {
  height: 36px;
}

/* Top Navigation Bar */
.nav-collapse {
  @apply w-11/12 md:w-11/12;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  height: 100%;
  margin: 0 auto;
}

/* Top-Nav [Go to account dash] btn */
.logo-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 2em;
}

.logo-section .dashboard-btn {
  @apply text-gray-300 transition-all duration-500
        rounded-full
        border-2 border-transparent;
  box-sizing: content-box;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 0.5em;
  line-height: 0%;
}

.logo-section .dashboard-btn:hover {
  @apply border-green-300 text-green-400;
}

.top-nav-collapse .nav-dropdown {
  @apply dropdown dropdown-end
    border-none;
  display: none;
}

.top-nav-collapse .nav-dropdown .btn {
  @apply btn-sm border-none rounded-sm    
    bg-gray-600 hover:bg-gray-700 text-white align-middle;
}
.top-nav-collapse .nav-dropdown .btn span {
  @apply flex items-center justify-center;
}
.top-nav-collapse .nav-dropdown .btn img {
  @apply w-2/3 h-full;
}

.top-nav-collapse .nav-dropdown .menu {
  @apply p-1 mt-1 shadow bg-white font-light text-gray-500
    rounded w-40;
}

.top-nav-collapse .nav-dropdown .menu li {
  @apply flex flex-row justify-start items-center;
}

.top-nav-collapse .nav-dropdown .menu span {
  @apply mr-2;
  height: fit-content;
}

.top-nav-collapse .nav-dropdown .menu li a {
  @apply text-sm text-gray-900;
}

.top-nav-collapse .nav-dropdown .menu li img {
  @apply opacity-50;
  height: 1.5em;
}

.top-nav-collapse .nav-dropdown .menu li:hover {
  @apply text-gray-900;
}

.top-nav-collapse .nav-dropdown .menu li:active {
  @apply text-gray-900 bg-transparent;
  background: transparent !important;
}
/* END - Top-Nav Dropdown */

/* Top-Nav Account Dropdown */
.top-nav-collapse .account-dropdown {
  @apply dropdown dropdown-end
    border-none;
  display: block;
}

.top-nav-collapse .account-dropdown .btn {
  @apply btn-sm
    bg-transparent
    border-gray-300
    rounded-md
    transition-all duration-300 ease-in-out
    text-gray-900;
}

.top-nav-collapse .account-dropdown .btn:hover {
  @apply shadow border-gray-300;
}

.top-nav-collapse .account-dropdown .btn span {
  @apply flex items-center justify-center gap-2;
}

.top-nav-collapse .account-dropdown .btn span img {
  height: 70%;
}

.top-nav-collapse .account-dropdown .btn span p {
  @apply text-sm text-gray-700;
  white-space: nowrap;
}

.top-nav-collapse .account-dropdown .btn img {
  @apply w-2/3 h-full;
}

.top-nav-collapse .account-dropdown .menu {
  @apply p-1 mt-1 shadow-md bg-white font-light text-gray-500
    rounded;
  min-width: 160px;
  max-width: 200px;
}

.top-nav-collapse .account-dropdown .menu li {
  @apply flex flex-row align-top justify-start;
}

.top-nav-collapse .account-dropdown .menu span {
  @apply mr-2;
}

.top-nav-collapse .account-dropdown .menu li a {
  @apply text-sm;
}

.top-nav-collapse .account-dropdown .menu li img {
  height: 1em;
}

.top-nav-collapse .account-dropdown .menu li:hover {
  @apply text-gray-900;
}

.top-nav-collapse .account-dropdown .menu li:active {
  @apply text-gray-900;
  background: transparent !important;
}

/* END - Top Navigation Bar */

/* Main Section */
main {
  width: 100%;

  /* Flex Setup */
  display: flex;
  flex-direction: row;
}

/* Side Nav */
main aside {
  @apply px-2 py-4;
  min-height: calc(100vh - 64px);
  width: 250px;

  background: #009168;
}

main aside section {
  @apply mb-6;
}

main aside section > p {
  @apply text-gray-200 font-light text-sm;
}

main aside section > ul {
  @apply mt-1 text-white;
  list-style: none;
}

main aside section > ul li {
  @apply py-1 px-2 my-0.5;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

main aside section > ul li * {
  min-height: 1rem;
  display: flex;
  overflow-x: hidden;
}

main aside section > ul li span {
  @apply text-xs;
  text-transform: uppercase;
  white-space: normal;
}

main aside section > ul li * img {
  width: 18px;
  align-self: center;
  justify-self: center;
}

main aside section > ul li:hover {
  @apply rounded bg-opacity-10 bg-green-200;
}

main aside section > ul .nuxt-link-active li {
  @apply rounded bg-opacity-30 bg-green-200;
}
/* END - Side Nav */

main .content-container {
  @apply pt-2 pb-8 border-t-2;
  width: 100%;
}

.notification-dropdown {
  @apply flex flex-col justify-center items-center absolute top-16 -left-44 py-2 w-48 bg-white 
         shadow-sm rounded-lg overflow-y-auto;
}

.notification-dropdown {
  @apply divide-y divide-y-reverse;
  width: 385px;
}

.notification-dropdown .dropdown-header-title {
  @apply text-lg font-bold mb-2 text-gray-700;
}

.notification-dropdown .dorpdown-container {
  @apply flex flex-row gap-3 items-center justify-start px-3 flex-nowrap;
}

.notification-dropdown .dropdown-active {
  @apply bg-white;
}

.notification-dropdown .dorpdown-container img:first-child {
  @apply w-6 opacity-60;
}

.notification-dropdown .dorpdown-container img:last-child {
  @apply w-3;
}

.notification-dropdown .dorpdown-container a {
  @apply my-2 text-sm  text-black overflow-clip-ellipsis flex-1;
  /* width: 100% !important; */
}

.overflow-clip-ellipsis {
  width: 300px;
  padding: 2px 1px;
  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.new-notifications {
  @apply text-gray-800 text-sm pb-2 cursor-pointer hover:text-gray-600;
}

.close-icon {
  @apply text-gray-400 cursor-pointer hover:text-gray-800;
}

.desktop-nav {
  @apply hidden sm:flex;
}

.dropdown .dropdown-button {
  @apply font-light normal-case m-1 cursor-pointer text-gray-400  hover:text-gray-600;
}

.dropdown .dropdown-button:focus {
  @apply text-gray-600 font-bold;
}

.dropdown ul {
  @apply menu p-2 shadow bg-white rounded-box mt-5;
  min-width: 14em;
  max-width: 43em;
}

.dropdown li {
  @apply bg-white hover:bg-gray-100 my-1 rounded-xl;
}

/* END - Main Section */

/* Small to Mid Screen */
@media screen and (max-width: 768px) {
  .container-fixed {
    @apply flex flex-col;
    width: 100%;
  }
  /* END - Top-Nav Dropdown */
  .container-fixed > nav {
    background: #ffffff;
    width: 100% !important;
    height: 64px;
  }

  .container-fixed nav > .nav-collapse div:first-child {
    margin-right: auto;
  }

  main aside,
  .top-nav-collapse .account-dropdown,
  .logo-section .dashboard-btn {
    display: none;
  }

  .top-nav-collapse .nav-dropdown {
    display: block;
  }

  .notification-dropdown {
    @apply w-72 text-sm divide-y divide-y-reverse absolute top-14 -right-36;
  }

  .notification-dropdown .dropdown-header-title {
    @apply font-bold text-gray-700;
  }

  .notification-dropdown .dorpdown-container {
    @apply flex flex-row px-2 gap-2 items-center justify-start flex-nowrap;
  }

  .notification-dropdown .dropdown-active {
    @apply bg-white;
  }

  .notification-dropdown .dorpdown-container img:first-child {
    @apply w-5 opacity-60 mx-1;
  }

  .notification-dropdown .dorpdown-container img:last-child {
    @apply w-3;
  }

  .notification-dropdown .dorpdown-container a {
    @apply my-2 flex-1;
    /* width: 100% !important; */
  }

  .overflow-clip-ellipsis {
    width: 200px;
    padding: 2px 0px;
    /* Both of the following are required for text-overflow */
    white-space: nowrap;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
