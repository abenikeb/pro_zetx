const authState = require('./auth')
export const state = () => {
  return {
    notifications: [],
  }
}

export const mutations = {
  SET_USER_NOTIFICATIONS(state, payload) {
    state.notifications = payload
  },
  SET_BUSINESS_NOTIFICATIONS(state, payload) {
    state.notifications = payload
  },
}

export const actions = {
  async getUserNotificationAction({ state, rootState, commit }) {
    const userId = await rootState.auth.authUser.uid
    // console.log({ userId: userId })
    const notificationRef = this.$fire.firestore.collection('notifications')
    const notificationSnapshot = await notificationRef
      .where('receiverId', '==', userId)
      .where('type', 'in', [1, 2, 3, 4, 5, 6, 'orderNotifications'])
      .get()

    console.log('notify', notificationSnapshot)
    // console.log({ notificationSnapshot: notificationSnapshot })
    let notifications = []
    notificationSnapshot.forEach((notification) => {
      notifications.push({
        id: notification.id,
        ...notification.data(),
      })
    })
    commit('SET_USER_NOTIFICATIONS', notifications)
  },

  async getBusinessNotificationAction({ rootState, commit }) {
    const userId = await rootState.auth.authUser.uid

    const business = await this.$fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', userId)
      .get()
    // console.log({ business: business.docs[0].id})

    const notificationRef = this.$fire.firestore.collection('notifications')
    const notificationSnapshot = await notificationRef
      .where('receiverId', '==', business.docs[0].id)
      .where('type', '==', 7)
      .where('status', 'in', [1, 2])
      .get()
    // console.log({ notificationSnapshot: notificationSnapshot })
    const notifications = []
    notificationSnapshot.forEach((notification) => {
      notifications.push({
        id: notification.id,
        ...notification.data(),
      })
    })
    commit('SET_BUSINESS_NOTIFICATIONS', notifications)
  },

  async dismissNotificationAction({ state, rootState, commit }, notId) {
    const notificationRef = this.$fire.firestore
      .collection('notifications')
      .doc(notId)
    await notificationRef.update({
      status: 0,
    })
    let newNotifications = state.notifications

    newNotifications.forEach((notification) => {
      if (notification.id == notId) {
        notification.status = 0
      }
    })
    commit('SET_USER_NOTIFICATIONS', newNotifications)
    console.log('stateVar', state.notifications)
  },
  async setNotificationAction({ state, rootState, commit }, notData) {
    const notificationRef = this.$fire.firestore.collection('notifications')
    await notificationRef.add(notData)
  },
}
