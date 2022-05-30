<template>
  <div class="container">
    <!--START mobile-Sidebar layout section fixed top-10 left-24 right-2-->
    <nav class="mobile-side-nav">
      <nuxt-link
        exact
        class="mobile-hover-class"
        to="/dashboard/product/manage"
      >
        <img src="~/assets/images/product/settings_up2.svg" alt="no-map" />
        <h1 class="truncate text-2xs">Manage product</h1>
      </nuxt-link>

      <nuxt-link
        class="mobile-hover-class relative"
        to="/dashboard/product/manage/ordersList"
      >
        <img src="~/assets/images/product/list_up.svg" class="w-8" />
        <h1 class="truncate text-2xs">Orders</h1>

        <span
          v-if="orderNotificationCount > 0"
          class="notification-mobile-count"
          >{{ orderNotificationCount }}</span
        >
      </nuxt-link>

      <nuxt-link
        class="mobile-hover-class"
        to="/dashboard/product/manage/transactionHistory"
      >
        <img src="~/assets/images/product/receipt_up.svg" alt="no-map" />
        <!-- <h1 class="hidden lg:block">Transaction History</h1> -->
        <h1 class="truncate text-2xs">History</h1>
      </nuxt-link>

      <nuxt-link
        class="mobile-hover-class"
        to="/dashboard/product/manage/payment"
      >
        <img src="~/assets/images/product/payment_up.svg" alt="no-map" />
        <h1 class="truncate text-2xs">SetupPayment</h1>
      </nuxt-link>
    </nav>
    <!--END mobile-Sidebar layout section -->

    <!-- Desktop-Sidebar Section -->
    <nav class="desktop-side-nav">
      <nuxt-link class="desktop-hover-class" to="/dashboard/product">
        <div>
          <img src="~/assets/images/product/add.svg" class="w-9" alt="" />
          <p>Add Product</p>
        </div>
      </nuxt-link>

      <nuxt-link class="desktop-hover-class" to="/dashboard/product/manage">
        <div>
          <img src="~/assets/images/product/settings.svg" alt="no-map" />
          <p>Manage Your Products</p>
        </div>
      </nuxt-link>

      <nuxt-link
        class="desktop-hover-class nav-highlight"
        to="/dashboard/product/manage/ordersList"
      >
        <div>
          <span class="order-notification-container">
            <img src="~/assets/images/product/list.svg" class="w-8" />
            <div v-if="orderNotificationCount > 0" class="notification-count">
              <span>{{ orderNotificationCount }}</span>
            </div>
          </span>
          <p>Product Orders</p>
        </div>
      </nuxt-link>

      <nuxt-link
        class="desktop-hover-class nav-highlight"
        to="/dashboard/product/manage/transactionHistory"
      >
        <div>
          <img src="~/assets/images/product/transaction.svg" alt="no-map" />
          <p>Transactions History</p>
        </div>
      </nuxt-link>

      <nuxt-link
        class="desktop-hover-class nav-highlight"
        to="/dashboard/product/manage/payment"
      >
        <div>
          <img src="~/assets/images/product/transaction.svg" alt="no-map" />
          <p>Setup Payment</p>
        </div>
      </nuxt-link>
    </nav>
    <!-- END - Desktop-Sidebar Section -->
    <div class="mt-3 flex-1">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'product'],
  computed: {
    orderNotificationCount() {
      return this.$store.state.products.orders.orderNotifications.length
    },
  },
  created() {
    this.loadNotification()
  },
  methods: {
    async loadNotification() {
      await this.$store.dispatch('products/fetchAllOrderNotifications')
    },
  },
}
</script>

<style scoped>
/* Page Container */
.container {
  @apply flex flex
      lg:flex-row-reverse
      flex-col
      mx-auto
      overflow-hidden
      lg:max-w-full lg:gap-2
      mx-2
      sticky
      top-10;
  min-width: 100%;
}
/* END - Page Container */

.mobile-side-nav {
  @apply lg:hidden flex ml-2 flex-row items-center justify-center       
   max-w-md bg-white rounded-lg shadow-md order-first lg:order-last h-16 lg:h-72;
}
.mobile-hover-class {
  @apply lg:hidden w-44 flex flex-col opacity-40 transition-all duration-300 items-center justify-center;
}
.mobile-side-nav > a.nuxt-link-active {
  @apply lg:hidden opacity-100 w-48 contrast-150  border-accent;
}
.mobile-side-nav img {
  @apply w-8;
}

/* Desktop Nav Styling */
.desktop-side-nav {
  @apply mt-11
    hidden
    lg:flex flex-col
    bg-white rounded-lg shadow-md
    divide-y;
  height: fit-content;
}

.desktop-hover-class {
  @apply w-48 text-gray-500;
  display: inline-block;
}

.desktop-hover-class:hover {
  @apply text-gray-900;
}

.desktop-side-nav > a.nuxt-link-active.nav-highlight {
  @apply border-none bg-opacity-50 bg-accent text-gray-900;
}

.desktop-side-nav > a.nuxt-link-active.nav-highlight:last-child {
  border-radius: inherit;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.desktop-side-nav img {
  @apply w-8;
}

.desktop-side-nav > .desktop-hover-class > div {
  @apply flex flex-col justify-center items-center py-1 gap-1;
}

.desktop-side-nav .desktop-hover-class:first-child > div {
  @apply pt-3;
}

.desktop-side-nav .desktop-hover-class:last-child > div {
  @apply pb-2;
}

.desktop-side-nav > .desktop-hover-class > div p {
  @apply text-xs;
}

.desktop-side-nav div img {
  @apply h-6;
}

.desktop-side-nav div > * {
  display: inline;
}

.notification-count {
  @apply animate-bounce rounded w-4 h-4 bg-red-400 border-none;
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(20%);
}

.notification-mobile-count {
  @apply animate-bounce rounded w-4 h-4 bg-red-400 border-none text-sm text-white;
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 2;
  transform: translateX(20%);
}

/* FIXME: not needed for now */
/* Adding Notification Animation */
.notification1-count {
  animation-name: wiggle;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  -webkit-animation-name: wiggle;
  -webkit-animation-duration: 1500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;

  -ms-animation-name: wiggle;
  -ms-animation-duration: 1500ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: ease-in-out;
}

.notification-count span {
  @apply text-white font-bold text-xs;
  padding: 0;
  margin: 0;
}

.order-notification-container {
  position: relative;
}

/* Wiggle Animation */
@-ms-keyframes wiggle {
  0% {
    -ms-transform: rotate(1deg);
  }
  20% {
    -ms-transform: rotate(-1deg);
  }
  40% {
    -ms-transform: rotate(1.5deg);
  }
  60% {
    -ms-transform: rotate(-5deg);
  }
  80% {
    -ms-transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(0deg);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(20deg);
  }
  60% {
    transform: rotate(-5deg);
  }
  80% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
/* END - Wiggle Animation */
</style>
