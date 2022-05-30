export const state = () => {
  return {
    carbonCredit: null,
    emissionHistory: null,
    privateLeaderboard: null,
    previousMonthEmissionHistory: null,
    userData: null,
    orderData: null,
    carbonCreditTransaction: null,
    productData: null,
  }
}

export const mutations = {
  SET_USER_CARBONCREDIT(state, payload) {
    state.carbonCredit = payload
  },
  SET_EMISSION_HISTORY(state, payload) {
    state.emissionHistory = payload
  },
  SET_PRIVATELEADERBOARD_DATA(state, payload) {
    state.privateLeaderboard = payload
  },
  SET_PREVIOUS_MONTH_HISTORY(state, payload) {
    state.previousMonthEmissionHistory = payload
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload
  },
  SET_ORDER_DATA(state, payload) {
    state.orderData = payload
  },
  SET_PRODUCT_DATA(state, payload) {
    state.productData = payload
  },
  SET_CARBONCREDIT_TRANSACTION_DATA(state, payload) {
    state.carbonCreditTransaction = payload
  },
  CLEAR_STATE(state) {
    console.log('clearing dashboard state...')
    state.carbonCredit = null
    state.emissionHistory = null
    state.privateLeaderboard = null
    state.previousMonthEmissionHistory = null
    state.userData = null
    state.orderData = null
    state.carbonCreditTransaction = null
    state.productData = null
  },
}

export const actions = {
  async getUserCarbonCreditAction({ rootState, commit }) {
    const userId = await rootState.auth.authUser.uid
    const carbonCreditRef = this.$fire.firestore.collection('wallet')
    const carboncreditSnapshot = await carbonCreditRef
      .where('userId', '==', userId)
      .get()
    let carbonCreditVal = 0
    carboncreditSnapshot.forEach((walletData) => {
      carbonCreditVal = walletData.data().carbonCreditBalance
    })

    commit('SET_USER_CARBONCREDIT', carbonCreditVal)
  },
  async getEmissionsHistoryAction(
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      commit,
    },
    date
  ) {
    const emissionsHistoryRef = this.$fire.firestore
      .collection('emissionsHistory')
      .where('month', '==', date)
    const emissionsHistorySnapshot = await emissionsHistoryRef
      .orderBy('carbonCreditBalance', 'desc')
      .get()
    // eslint-disable-next-line prefer-const
    let emissionsHistory = []

    emissionsHistorySnapshot.forEach((emission) => {
      emissionsHistory.push({
        id: emission.id,
        ...emission.data(),
      })
    })
    commit('SET_EMISSION_HISTORY', emissionsHistory)
  },

  async getUserPrivateLeaderBoardAction({ rootState, commit }) {
    const userId = await rootState.auth.authUser.uid
    const privateLeaderBoardRef = this.$fire.firestore.collection(
      'privateLeaderboards'
    )
    const privateLeaderBoardSnapshot = await privateLeaderBoardRef
      .where('invitees', 'array-contains', userId)
      .get()
    // eslint-disable-next-line prefer-const
    let finalPrivateLeaderBoardData = []

    privateLeaderBoardSnapshot.forEach((privateLeader) => {
      finalPrivateLeaderBoardData.push({
        id: privateLeader.id,
        ...privateLeader.data(),
      })
    })

    commit('SET_PRIVATELEADERBOARD_DATA', finalPrivateLeaderBoardData)
  },
  async getPreviousMonthEmissionHistoryAction({ commit }, date) {
    const emissionsHistoryRef = this.$fire.firestore
      .collection('emissionsHistory')
      .where('month', '==', date)
    const emissionsHistorySnapshot = await emissionsHistoryRef
      .orderBy('carbonCreditBalance', 'desc')
      .get()
    // eslint-disable-next-line prefer-const
    let emissionsHistory = []

    emissionsHistorySnapshot.forEach((emission) => {
      emissionsHistory.push({
        id: emission.id,
        ...emission.data(),
      })
    })

    commit('SET_PREVIOUS_MONTH_HISTORY', emissionsHistory)
  },
  async getTotalUsersAction({ commit }) {
    const usersRef = this.$fire.firestore.collection('users')
    const userSnapshot = await usersRef.get()

    // eslint-disable-next-line prefer-const
    let userData = []

    userSnapshot.forEach((user) => {
      userData.push({
        id: user.id,
        ...user.data(),
      })
    })
    console.log(userData)
    commit('SET_USER_DATA', userData)
  },
  async getTotalProductAction({ commit }) {
    const productRef = this.$fire.firestore.collection('products')
    const productSnapshot = await productRef.get()

    // eslint-disable-next-line prefer-const
    let productData = []

    productSnapshot.forEach((product) => {
      productData.push({
        id: product.id,
        ...product.data(),
      })
    })
    commit('SET_PRODUCT_DATA', productData)
  },
  async getUserDataById({ commit }, userId) {
    const usersRef = this.$fire.firestore.collection('users').doc(userId)
    const userData = await usersRef.get()

    return userData
  },
  async getTotalOrdersAction({ commit }) {
    const orderRef = this.$fire.firestore.collection('orders')
    const orderSnapshot = await orderRef.get()

    // eslint-disable-next-line prefer-const
    const orderData = []

    orderSnapshot.forEach((order) => {
      orderData.push({
        id: order.id,
        ...order.data(),
      })
    })
    commit('SET_ORDER_DATA', orderData)
  },
  async getOrderDataById({ commit }, orderId) {
    const orderRef = this.$fire.firestore.collection('orders').doc(orderId)
    const orderData = await orderRef.get()

    return orderData
  },
  async getCarbonCreditTransactionAction({ commit }) {
    const carbonTransactionRef = this.$fire.firestore.collection(
      'carbonCreditTransaction'
    )
    const carbonTransactionshot = await carbonTransactionRef.get()

    // eslint-disable-next-line prefer-const
    let carbonTransactionData = []

    carbonTransactionshot.forEach((carbonTransaction) => {
      carbonTransactionData.push({
        id: carbonTransaction.id,
        ...carbonTransaction.data(),
      })
    })
    commit('SET_CARBONCREDIT_TRANSACTION_DATA', carbonTransactionData)
  },
  // eslint-disable-next-line no-empty-pattern
  async updateRoleAction({}, payload) {
    try {
      const userRef = this.$fire.firestore.collection('users').doc(payload.id)
      await userRef.update({
        roles: payload.roles,
      })
    } catch (error) {
      console.log(error)
    }
  },
  // eslint-disable-next-line no-empty-pattern
  async updateStatusAction({}, payload) {
    try {
      const userRef = this.$fire.firestore
        .collection(payload.collection)
        .doc(payload.id)
      await userRef.update({
        status: payload.status,
      })
    } catch (error) {
      console.log(error)
    }
  },
}
