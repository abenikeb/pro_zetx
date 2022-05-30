<template>
  <div class="relative">
    <div class="absolute top-2 left-6">
      <nuxt-link
        to="/dashboard"
        class="text-sm font-bold flex items-center gap-1"
      >
        <div class="mask-back">
          <img class="" alt="" />
        </div>
      </nuxt-link>
    </div>
    <div
      class="notification-container divide-y divide-gray-200 divide-y-reverse"
    >
      <h1 class="notification-header">Notifications</h1>
      <!-- notification tiles that displays the notification content -->
      <div
        v-for="notification in displayedNotifications"
        :key="notification.id"
        class="notification"
      >
        <div>
          <div class="flex flex-row justify-between">
            <div class="notification-wrap">
              <img
                v-if="
                  notification.type == 4 ||
                  notification.type == 5 ||
                  notification.type == 6
                "
                src="~/assets/images/business/bfk5.svg"
              />
              <img v-else src="~/assets/images/business/bfk6.svg" />

              <nuxt-link
                v-if="
                  notification.type == 4 ||
                  notification.type == 5 ||
                  notification.type == 6
                "
                :to="notification.link"
                class="overflow-clip-ellipsis"
                :class="notification.status == 1 ? 'font-bold' : ''"
                @click.native="togelActiveNotify(notification.id)"
              >
                {{ notification.content }}
              </nuxt-link>

              <nuxt-link
                v-else-if="
                  notification.type === 'orderNotifications' &&
                  notification.receiverType === 'seller'
                "
                :to="`/dashboard/product/manage/orderDetail?id=${notification.orderId}`"
                class="overflow-clip-ellipsis"
                :class="notification.status == 1 ? 'font-bold' : ''"
                @click.native="togelActiveNotify(notification.id)"
              >
                {{ notification.content }}
              </nuxt-link>

              <nuxt-link
                v-else-if="
                  notification.type === 'orderNotifications' &&
                  notification.receiverType === 'buyer'
                "
                :to="`/dashboard/transaction/detail?orderId=${notification.orderId}`"
                class="overflow-clip-ellipsis"
                :class="notification.status == 1 ? 'font-bold' : ''"
                @click.native="togelActiveNotify(notification.id)"
              >
                {{ notification.content }}
              </nuxt-link>

              <h1
                v-else-if="notification.type === 1 || notification.type === 2"
              >
                {{ notification.content }}
              </h1>
            </div>
            <img
              v-if="notification.status == 1"
              src="~/assets/images/business/Ellipse .svg"
              class="w-3"
            />
          </div>
          <div class="text-gray-500 pl-12 text-sm mt-2">
            {{
              `${
                typeof notification.dateTime === 'object'
                  ? timeSince(notification.dateTime.toDate())
                  : timeSince(new Date(notification.dateTime))
              } ago`
            }}
          </div>
        </div>
      </div>
      <div class="my-4 flex justify-start items-center">
        <!-- see more notification button -->
        <button
          v-if="loadMoreVisible == 1"
          class="btn btn-accent btn-wide"
          @click="loadNotifications"
        >
          See More >>>
        </button>
        <!-- displayed if there is no more notificaions to load -->
        <span v-else-if="loadMoreVisible == 2" class="text-red-800"
          >No more notifications to load.</span
        >
        <!-- dispalyed if there are no notifications to be displayed -->
        <span v-else-if="loadMoreVisible == 3" class="text-red-800"
          >You have no notifications.</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      notifications: [] as any,
      notificationsToShow: 5,
      loadMoreVisible: 0,
    }
  },
  computed: {
    // returns the notification that is going to displayed
    displayedNotifications() {
      const displayed: any[] = []
      let tempCounter = this.notificationsToShow
      this.notifications.forEach((notification: any) => {
        if (tempCounter > 0) {
          displayed.push(notification)
          tempCounter -= 1
        }
      })
      return displayed
    },
  },
  async created() {
    // fetched the notification that is generated for the user and sort them based on the time generated
    await this.$store.dispatch('notification/getUserNotificationAction')
    this.notifications = this.$store.state.notification.notifications as any
    this.notifications.sort((a: any, b: any) =>
      a.dateTime.seconds < b.dateTime.seconds ? 1 : -1
    )
    // if the notification length is more than 5 changes the condition so that the see more button will be displayed
    if (this.notifications.length > 5) this.loadMoreVisible = 1
    // if the length of the notification is 0 changes the condition so that the message that there is no notificaiton will be displayed
    else if (this.notifications.length === 0) this.loadMoreVisible = 3
  },
  methods: {
    // dismiss the notification that the user clicks
    dismissNotification(notificationId: any) {
      this.$store.dispatch(
        'notification/dismissNotificationAction',
        notificationId
      )
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === notificationId) {
          this.notifications.splice(i, 1)
        }
      }
      if (this.notifications.length === 0) {
        this.loadMoreVisible = 3
      }
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
      await batch.commit().then(() => {
        this.notifications.forEach((notification: any) => {
          if (notification.id === notificationId) notification.status = 2
        })
      })
    },
    // loads more notification if there are any or changes the condition so that the meesage that there is no more notification to load will be displayed
    loadNotifications() {
      this.notificationsToShow += 5
      if (this.notificationsToShow >= this.notifications.length)
        this.loadMoreVisible = 2
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

<style scoped>
.notification-container {
  @apply flex flex-col justify-center items-center mx-auto mt-4 bg-white shadow-lg rounded-lg ring-2 ring-gray-100;
  /* min-width: min-content; */
  min-width: 25rem; /* 672px */
  max-width: 40rem; /* 672px */
}

.notification {
  @apply px-5 mx-0 w-full min-h-full py-5 max-h-96 relative 
  gap-3 flex flex-col text-gray-900 text-sm;
}

.notification-header {
  @apply text-xl font-semibold text-gray-600 mt-4 mb-2 pl-0 justify-self-start;
}

.notification .notification-wrap {
  @apply flex gap-3 items-center w-full px-3;
}

.notification .notification-wrap img {
  @apply w-5;
}

.close-icon {
  @apply absolute right-3 top-5 text-red-600 cursor-pointer hover:text-red-800 text-lg;
}
.mask-back {
  mask-image: url(~/assets/images/business/arrow_back.svg);
}
.mask-back img {
  @apply bg-gray-600 w-6 h-6;
}

@media screen and (max-width: 760px) {
  .notification-container {
    @apply flex flex-col justify-center items-center w-11/12 mx-auto mt-4 bg-white rounded-lg shadow-md;
    /* min-width: min-content; */
    min-width: 20rem; /* 672px */
    /* max-width: 40rem; 672px */
  }

  .notification {
    @apply px-2 mx-0 w-full min-h-full py-4 max-h-96 relative 
  gap-2 flex flex-col text-gray-900 text-sm;
  }

  .notification-header {
    @apply text-xl font-semibold text-gray-600 mb-3 pl-0;
  }

  .notification .notification-wrap {
    @apply flex gap-3 items-center w-full px-3;
  }

  .notification .notification-wrap img {
    @apply w-5;
  }

  .overflow-clip-ellipsis {
    width: 259px;
    padding: 2px 0px;
    /* Both of the following are required for text-overflow */
    white-space: nowrap;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
