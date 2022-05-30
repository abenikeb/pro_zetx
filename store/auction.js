export const state = () => {
  return {
    auctionData: {},
  }
}

export const mutations = {
  SET_AUCTION_DATA(state, payload) {
    state.auctionData = payload
  },
}

export const actions = {
  setAuctionData({ commit }, payload) {
    commit('SET_AUCTION_DATA', payload)
  },

  async storeAuction({ state, rootState, dispatch }, payload) {
    dispatch('loading/toggleLoading', true, { root: true })
    const auctionsRef = this.$fire.firestore.collection('auctions')
    try {
      const snapshot = await auctionsRef.add(payload)
      // console.log(snapshot)
      dispatch('loading/toggleLoading', false, { root: true })

      alert('your auction is saved')
    } catch (error) {
      alert.log(error.message)
      dispatch('loading/toggleLoading', false, { root: true })
    }
  },

  async getAuctions({ commit, dispatch }) {
    dispatch('loading/toggleLoading', true, { root: true })
    const auctionsRef = this.$fire.firestore.collection('auctions')
    try {
      const res = await auctionsRef.get()
      //   console.log(res.data());

      dispatch('loading/toggleLoading', false, { root: true })
    } catch (error) {
      console.log(error)
      dispatch('loading/toggleLoading', true, { root: true })
    }
  },
  
}
