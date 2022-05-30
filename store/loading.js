export const state = () => {
  return {
    isLoading: false,
  }
}

export const mutations = {
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
}

export const actions = {
  toggleLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
}
