import firebase from 'firebase'
import norminv from 'norminv'
export const state = () => {
  return {
 
    carbonCreditBalance: 0,
  }
}

export const mutations = {

  CALCULATE_CARBONCOIN(state, payload) {
    state.carbonCreditBalance = payload
  },
}

//actions are used to call mutations and getters from the store
export const actions = {
  async calculateCarbonCoin({ state, rootState, commit }) {
    const userId = rootState.auth.authUser.uid

    console.log(userId)
    let totalEmission
    const emissionsRef = this.$fire.firestore
      .collection('emissionsHistory')
      .where('uid', '==', userId)
    const emissionSnapshot = await emissionsRef.get()
    emissionSnapshot.forEach((emission) => {
      totalEmission = emission.data().totalEmissions
      console.log('emission', emission.data().totalEmissions)
    })
    console.log('total', totalEmission)

    //get document count from emissionData collection by user id
    let count
    const emissionsCount = await this.$fire.firestore
      .collection('emissionsData')
      .where('uid', '==', userId)
      .get()
      .then((querySnapshot) => {
        count = querySnapshot.size
        console.log('emissionscounts', count)
      })

    //emissions per report
    const emissionsPerReport = totalEmission / count
    console.log('emissionsPerReport', emissionsPerReport)
    //users count
    let usersCount
    const users = await this.$fire.firestore
      .collection('users')
      .get()
      .then((userSnapshot) => {
        usersCount = userSnapshot.size
        console.log('usersCount', usersCount)
      })

    //average emission per report per user
    const averageEmissionsPerReport = emissionsPerReport / usersCount
    console.log('averageEmissionsPerReport', averageEmissionsPerReport)

    //difference between average emissions per report and emissionsperreport
    // const norm = norminv(Math.random(), averageEmissionsPerReport, 5)
    // console.log('norm', norm)
    // const diff = averageEmissionsPerReport - emissionsPerReport
    // console.log('diff', diff)
    // const per = diff / averageEmissionsPerReport
    // console.log('per', per)
    const mul = averageEmissionsPerReport * 10
    console.log('mul', mul)
    const coin = mul + 10
    console.log('coin', coin)

    if (coin < 0) {
      commit('CALCULATE_CARBONCOIN', 0)
    } else {
      commit('CALCULATE_CARBONCOIN', coin)
    }
    // commit('CALCULATE_CARBONCOIN', coin)
    //state.carbonCreditBalance = coin
  },

  async storeCarbonCoin({ commit, rootState, state }) {
    const userId = rootState.auth.authUser.uid
    //const coin = state.carbonCreditBalance

    // update the wallet collection with the carbon credit
    try {
      let carbonCredit
      let docId
      let sub

      //get users subscription type by document id from users collection
      const userSubscription = await this.$fire.firestore.collection('users')

      const usersRef = this.$fire.firestore
        .collection('users')
        .where(firebase.firestore.FieldPath.documentId(), '==', userId)
      const userSnapshot = await usersRef.get()
      userSnapshot.forEach((user) => {
        sub = user.data().subscription
        console.log('subs', sub)
      })
      console.log('sub', sub)
      const walletRef = this.$fire.firestore
        .collection('wallet')
        .where('userId', '==', userId)
      const walletSnapshot = await walletRef.get()
      console.log(walletSnapshot)
      walletSnapshot.forEach((snapshot) => {
        console.log('snapdata', snapshot.data())
        console.log('snap', snapshot.id)

        docId = snapshot.id
        carbonCredit = snapshot.data().carbonCreditBalance
        console.log(carbonCredit)
      })
      if (docId) {
        console.log(state.carbonCreditBalance)

        const newWallet =
          parseInt(carbonCredit) + parseInt(state.carbonCreditBalance)
        //if sub == free then divide the coin by 2 else give the coin
        if (sub === 'free') {
          const wallet =
            parseInt(carbonCredit) + parseInt(state.carbonCreditBalance) / 2
          console.log('wallet', wallet)
          this.$fire.firestore.collection('wallet').doc(docId).update({
            carbonCreditBalance: wallet,
          })
        } else {
          this.$fire.firestore.collection('wallet').doc(docId).update({
            carbonCreditBalance: newWallet,
          })
        }
    
       
      } else {
        alert('You have no carbon coins')
      }
    } catch (error) {
      alert(error.message)
    }
  },

  //get the carbon coin of the current logged in user

  // async getUserCarbonCreditCoin({ state, rootState, commit }) {
  //   const userId = await rootState.auth.authUser.uid
  //   const carbonCreditRef = this.$fire.firestore.collection('wallet')
  //   const carboncreditSnapshot = await carbonCreditRef
  //     .where('userId', '==', userId)
  //     .get()
  //   let carbonCreditVal = null
  //   carboncreditSnapshot.forEach((walletData) => {
  //     carbonCreditVal = walletData.data().carbonCreditBalance
  //     state.carbonCreditVal = carbonCreditVal
  //     console.log(carbonCreditVal)
  //   })
  // },
}
