export const state = () => {
  return {
    authUser: null,
    userData: null,
    isLoggedIn: false,
    profileTracker: 0,
  }
}

// this will set auth users mutations

export const mutations = {
  RESET_STORE: (state) => {
    state.authUser = null
    state.userData = null
    state.isLoggedIn = false
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    }
    state.isLoggedIn = true
  },

  SET_USER_DATA(state, payload) {
    state.userData = payload
  },
  SET_USER_LOCATION(state, payload) {
    state.userData.location = payload
  },
  SET_PROFILE_TRACKER(state, payload) {
    state.profileTracker = payload
  },
}

export const actions = {
  // this method will write user data to the users collections on firebase

  async onAuthStateChangedAction({ commit, dispatch }, { authUser }) {
    dispatch('loading/toggleLoading', true, { root: true })
    if (!authUser) {
      commit('RESET_STORE')
      dispatch('loading/toggleLoading', false, { root: true })
      return this.$router.push('/')
    } else {
      commit('SET_AUTH_USER', { authUser })
      const userRef = this.$fire.firestore.collection('users').doc(authUser.uid)
      const userData = await userRef.get()

      // if (!userData.exists) {
      //   dispatch('loading/toggleLoading', false, { root: true })
      //   alert('No record with these credentials')
      //   return this.$router.push('/signup')
      // }
      if (userData.exists) {
        console.log('userdata', userData.data())
        commit('SET_USER_DATA', userData.data())
        let profileTracker = 0
        const fieldTracker = 6
        const firstName = userData.data().firstName
        const lastName = userData.data().lastName
        const email = userData.data().email
        const location = userData.data().location
        const tel = userData.data().tel
        const userName = userData.data().userName
        if (firstName !== '') {
          profileTracker++
        }
        if (lastName !== '') {
          profileTracker++
        }
        if (email !== '') {
          profileTracker++
        }
        if (location !== '') {
          profileTracker++
        }
        if (tel !== '') {
          profileTracker++
        }
        if (userName !== '') {
          profileTracker++
        }
        const finalVal = (profileTracker / fieldTracker) * 100
        commit('SET_PROFILE_TRACKER', Math.round(finalVal))
        dispatch('loading/toggleLoading', false, { root: true })
        // this.$router.push('/dashboard/content')
      }
      // this.$swal('Good job!', 'You are ready to start!', 'success')
    }
  },
  // method to update profile of users it gets users data from firestore.

  async updateProfile({ commit, dispatch, state }, payload) {
    dispatch('loading/toggleLoading', true, { root: true })
    try {
      const userRef = this.$fire.firestore
        .collection('users')
        .doc(state.authUser.uid)
      await userRef.update(payload)
      // userRef = this.$fire.firestore.collection('users').doc(state.authUser.uid)
      // const userData = await userRef.get()
      commit('SET_USER_DATA', payload)
      let profileTracker = 0
      const fieldTracker = 6
      const firstName = payload.firstName
      const lastName = payload.lastName
      const email = payload.email
      const location = payload.location
      const tel = payload.tel
      const userName = payload.userName
      if (firstName !== '') {
        profileTracker++
      }
      if (lastName !== '') {
        profileTracker++
      }
      if (email !== '') {
        profileTracker++
      }
      if (location !== '') {
        profileTracker++
      }
      if (tel !== '') {
        profileTracker++
      }
      if (userName !== '') {
        profileTracker++
      }
      const finalVal = (profileTracker / fieldTracker) * 100
      commit('SET_PROFILE_TRACKER', Math.round(finalVal))
      dispatch('loading/toggleLoading', false, { root: true })
      alert('Profile updated successfully')
      return this.$router.push('/dashboard')
    } catch (error) {
      alert(error)
      dispatch('loading/toggleLoading', false, { root: true })
    }
  },
  setUserData({ commit }, payload) {
    commit('SET_USER_DATA', payload)
  },
  profileTrackerHandler({ commit, dispatch, state }) {
    let profileTracker = 0
    const fieldTracker = 6
    const firstName = state.userData.firstName
    const lastName = state.userData.lastName
    const email = state.userData.email
    const location = state.userData.location
    const tel = state.userData.tel
    const userName = state.userData.userName
    if (firstName !== '') {
      profileTracker++
    }
    if (lastName !== '') {
      profileTracker++
    }
    if (email !== '') {
      profileTracker++
    }
    if (location !== '') {
      profileTracker++
    }
    if (tel !== '') {
      profileTracker++
    }
    if (userName !== '') {
      profileTracker++
    }
    const finalVal = (profileTracker / fieldTracker) * 100
    commit('SET_PROFILE_TRACKER', Math.round(finalVal))
  },
}
