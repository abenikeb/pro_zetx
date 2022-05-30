<template>
  <div class="flex h-screen">
    <aside class="aside is-placed-left is-expanded hidden md:inline-block">
      <!-- the sidebar section -->
      <div class="bg-white text-white h-16 flex justify-start items-center">
        <nuxt-link to="/main">
          <img
            src="@/assets/images/frame.png"
            alt="Logo"
            class="w-24 h-auto pl-4"
          />
        </nuxt-link>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col pt-4 mb-4">
          <h1 class="text-gray-300 text-sm pl-4">GENERAL</h1>
          <ul class="menu-list">
            <li>
              <nuxt-link exact to="/admin" class="pl-4">
                <span class="pr-4"
                  ><i class="fa fa-th-large text-white"></i
                ></span>
                <span class="text-white">Dashboard</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="flex flex-col pt-4 mb-4 bg-accent">
          <h1 class="text-gray-300 text-sm pl-4">OTHERS</h1>
          <ul class="menu-list">
            <li>
              <nuxt-link exact to="/admin/users" class="pl-4">
                <span class="pr-4"><i class="fa fa-users text-white"></i></span>
                <span class="text-white">Users</span>
              </nuxt-link>
            </li>
          </ul>
          <ul class="menu-list">
            <li>
              <nuxt-link exact to="/admin/orders" class="pl-4">
                <span class="pr-4"
                  ><i class="fa fa-shopping-cart text-white"></i
                ></span>
                <span class="text-white">Orders</span>
              </nuxt-link>
            </li>
          </ul>
          <ul class="menu-list">
            <li>
              <nuxt-link exact to="/admin/products" class="pl-4">
                <span class="pr-4"
                  ><i class="fa fa-shopping-bag text-white"></i
                ></span>
                <span class="text-white">Products</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link exact to="/admin/carbontransaction" class="pl-4">
                <span class="pr-4"
                  ><img
                    src="~/assets/images/whitecc.svg"
                    alt=""
                    class="w-6 mt-1"
                /></span>
                <span class="text-white">Carbon Transactions</span>
              </nuxt-link>
            </li>
          </ul>
          <div class="flex flex-col pt-4 bg-accent">
            <h1 class="text-gray-300 text-sm pl-4">ACCOUNT</h1>
            <ul class="menu-list">
              <li>
                <nuxt-link to="/admin/setting" class="pl-4">
                  <span class="pr-4"
                    ><i class="fa fa-gear text-white"></i
                  ></span>
                  <span class="text-white">Settings</span>
                </nuxt-link>
              </li>
            </ul>

            <ul class="menu-list">
              <li
                class="cursor-pointer hover:bg-accent-focus py-2"
                @click="signOut"
              >
                <span class="pl-4">
                  <span class="pr-4"
                    ><i class="fa fa-sign-out text-white"></i
                  ></span>
                  <span class="text-white">Log out</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    <div class="flex flex-col w-full">
      <!-- the navbar section -->
      <nav class="navbar hidden md:flex">
        <div class="ml-auto relative">
          <div
            class="
              mt-5
              mr-12
              ml-auto
              cursor-pointer
              mb-5
              w-12
              h-12
              overflow-hidden
              rounded-full
              border-2 border-accent
              shadow-lg
              relative
            "
            @click="toggleDropdown"
          >
            <img
              class="w-full h-full bg-accent bg-opacity-20"
              :src="
                user ? `https://robohash.org/${user.email}.png?set=set3` : ''
              "
            />
          </div>
          <!-- the dropdown -->
          <div v-if="showDropdown" class="account-dropdown mt-8">
            <nuxt-link
              class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
              to="/admin/setting"
              >Settings</nuxt-link
            >
            <span
              class="
                text-sm
                pb-2
                text-red-600
                hover:text-red-800
                font-semibold
                cursor-pointer
              "
              @click="signOut"
              >Log out</span
            >
          </div>
        </div>
      </nav>
      <nav class="flex md:hidden">
        <nuxt-link
          to="/admin"
          class="flex items-center text-xl font-bold text-accent"
        >
          <img src="~/assets/images/logo.svg" class="w-10" alt="" />
        </nuxt-link>
        <div v-if="!sidenavActive" @click="sidenavActive = true">
          <i class="fa fa-bars text-accent text-3xl ml-72"></i>
        </div>
        <div v-else @click="sidenavActive = false">
          <i class="fa fa-times text-accent text-3xl ml-72"></i>
        </div>
      </nav>
      <div
        v-if="sidenavActive"
        class="
          flex flex-col
          bg-white
          shadow-lg
          rounded
          w-48
          top-10
          left-44
          fixed
          z-50
          md:hidden
        "
      >
        <nuxt-link
          exact
          to="/admin"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <span class="pr-4"><i class="fa fa-th-large text-accent"></i></span>
          <span class="text-black">Dashboard</span>
        </nuxt-link>
        <nuxt-link
          exact
          to="/admin/users"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <span class="pr-4"><i class="fa fa-users text-accent"></i></span>
          <span class="text-black">Users</span>
        </nuxt-link>
        <nuxt-link
          exact
          to="/admin/orders"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <span class="pr-4"
            ><i class="fa fa-shopping-cart text-accent"></i
          ></span>
          <span class="text-black">Orders</span>
        </nuxt-link>
        <nuxt-link
          exact
          to="/admin/products"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <span class="pr-4"
            ><i class="fa fa-shopping-bag text-accent"></i
          ></span>
          <span class="text-black">Products</span>
        </nuxt-link>
        <nuxt-link
          exact
          to="/admin/carbontransaction"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <div class="flex w-full">
            <span class="pr-4"
              ><img src="~/assets/images/cc.svg" alt="" class="w-6 mt-3"
            /></span>
            <span class="text-black">Carbon Transactions</span>
          </div>
        </nuxt-link>
        <nuxt-link
          to="/admin/setting"
          class="px-4 py-2"
          @click.native="sidenavActive = false"
        >
          <span class="pr-4"><i class="fa fa-gear text-accent"></i></span>
          <span class="text-black">Settings</span>
        </nuxt-link>
        <span class="cursor-pointer py-2" @cspanck="signOut">
          <span class="ml-4">
            <span class="pr-4"><i class="fa fa-sign-out text-accent"></i></span>
            <span class="text-black">Log out</span>
          </span>
        </span>
      </div>
      <!-- the body section -->
      <section class="is-title-bar md:h-screen">
        <NuxtChild />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth', 'admin'],
  data() {
    return {
      showDropdown: false,
      sidenavActive: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.userData
    },
  },

  methods: {
    // toggles the dropdown
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    // This methods gets called when the user wants to logout
    signOut() {
      this.$fire.auth.signOut()
    },
  },
}
</script>

<style scoped>
.aside {
  @apply w-1/5 h-screen bg-accent;
}
.navbar {
  @apply bg-white;
}
.menu-list li a {
  @apply py-2 flex text-gray-300;
}
.menu-list li > a {
  @apply hover:bg-accent-focus;
}

.menu-list li a .menu-item-label {
  @apply flex-grow;
}

.menu-list li a .icon {
  @apply w-12 flex-none;
}

.menu-list li.active > a {
  @apply bg-gray-700;
}

.menu-list li ul {
  @apply hidden;
}

.menu-list li ul a {
  @apply p-3 text-sm;
}

.menu-list li.active ul {
  @apply block bg-gray-600;
}
.account-dropdown {
  @apply z-50 flex flex-col justify-center items-start py-2 px-4 w-28 bg-white border-2 shadow-md rounded-lg absolute top-12 -left-4 right-24;
}
.menu-list li > a.nuxt-link-active {
  @apply bg-accent-focus;
}
</style>
