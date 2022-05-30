import _ from 'lodash'

// const showRandomFact = (state) => {
//   const randomFact = _.sample(facts)
//   return alert('Did you know?\n' + randomFact)
// }

export const state = () => {
  return {
    shoppingData: [],
    householdData: [],
    transportationData: [],
    foodData: [],
    total: 0,
    allEmissionsHistory: undefined
    // transportation: {
    //   carSize: null,
    //   fuelType: null,
    //   kilometerage: 0,
    // },
  }
}

export const mutations = {
  SET_ALL_EMISSIONS_HISTORY(state, payload) {
    state.allEmissionsHistory = payload
  },
  SET_HOUSEHOLD_DATA(state, payload) {
    state.householdData = payload
  },

  SET_SHOPPING_DATA(state, payload) {
    state.shoppingData = payload
  },

  SET_TRANSPORTATION_DATA(state, payload) {
    state.transportationData = payload
  },

  SET_FOOD_DATA(state, payload) {
    state.foodData = payload
  },

  SET_TOTAL(state, payload) {
    state.total = payload
  },

  CALCULATE_SUBTOTALS(state) {
    calculateSubTotals(state)
    // showRandomFact(state)
  },

  CALCULATE_GRANDTOTAL(state) {
    calculateGrandTotal(state)
  },

  CLEAR_DATA(state) {
    state.shoppingData = []
    state.householdData = []
    state.transportationData = []
    state.foodData = []
    state.total = 0
  },
}

export const actions = {
  async getAllEmissionsHistory({
    commit
  }) {
    const emissionsHistoryRef = this.$fire.firestore
      .collection('emissionsHistory')
      .orderBy('totalEmissions')
    const emissionsHistorySnapshot = await emissionsHistoryRef.get()
    const emissonsHistory = []
    emissionsHistorySnapshot.forEach(emissions => {
      emissonsHistory.push({
        id: emissions.id,
        ...emissions.data()
      })
    })
    commit('SET_ALL_EMISSIONS_HISTORY', emissonsHistory)
    return emissonsHistory
  },
  setHouseholdData({
    commit
  }, payload) {
    commit('SET_HOUSEHOLD_DATA', payload)
    commit('CALCULATE_SUBTOTALS')
    commit('CALCULATE_GRANDTOTAL')
  },

  setShoppingData({
    commit
  }, payload) {
    commit('SET_SHOPPING_DATA', payload)
    commit('CALCULATE_SUBTOTALS')
    commit('CALCULATE_GRANDTOTAL')
  },

  setTransportationData({
    commit
  }, payload) {
    commit('SET_TRANSPORTATION_DATA', payload)
    commit('CALCULATE_SUBTOTALS')
    commit('CALCULATE_GRANDTOTAL')
  },

  setFoodData({
    commit
  }, payload) {
    commit('SET_FOOD_DATA', payload)
    commit('CALCULATE_SUBTOTALS')
    commit('CALCULATE_GRANDTOTAL')
  },

  setTotal({
    commit
  }, payload) {
    commit('CALCULATE_SUBTOTALS')
    commit('CALCULATE_GRANDTOTAL')
  },

  async storeEmissionsData({
    commit,
    state,
    rootState,
    dispatch
  }) {
    if (state.total == 0) {
      return alert(
        'Emissions data is empty. Please fill in the forms and try again.'
      )
    }

    const emissions = {
      uid: rootState.auth.authUser.uid,
      measuredOn: new Date().toDateString(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      shopping: state.shoppingData,
      transportation: state.transportationData,
      food: state.foodData,
      household: state.householdData,
      total: state.total,
    }

    const history = {
      uid: rootState.auth.authUser.uid,
      name: rootState.auth.userData.firstName +
        ' ' +
        rootState.auth.userData.lastName,
      location: rootState.auth.userData.location,
      totalEmissions: state.total,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }

    const emissionsRef = this.$fire.firestore.collection('emissionsData')
    const historyRef = this.$fire.firestore.collection('emissionsHistory')

    dispatch('loading/toggleLoading', true, {
      root: true
    })
    try {
      await emissionsRef.add(emissions)
      const existing = await historyRef
        .where('uid', '==', rootState.auth.authUser.uid)
        .where('month', '==', new Date().getMonth() + 1)
        .where('year', '==', new Date().getFullYear())
        .get()
      if (!existing.empty) {
        const doc = existing.docs[0].data()
        const newTotal = doc.totalEmissions + state.total
        await historyRef.doc(existing.docs[0].id).update({
          totalEmissions: newTotal,
        })
        alert(
          'Your total emissions are ' +
          state.total.toFixed(2) +
          ' Kg Co2-e. \n\n Lets see where on the leaderboard it puts you!'
        )
        commit('CLEAR_DATA')
      } else {
        await historyRef.add(history)
        alert(
          'Your total emissions are ' +
          state.total.toFixed(2) +
          ' Kg Co2-e. \n Lets see where on the leaderboard it puts you!'
        )
        commit('CLEAR_DATA')
      }
      this.$router.push({
        path: '/leaderboard/international',
        query: {
          section: 'myLocation'
        },
      })
      dispatch('loading/toggleLoading', false, {
        root: true
      })
    } catch (error) {
      alert(error.message)
      dispatch('loading/toggleLoading', false, {
        root: true
      })
    }

    // try {
    //   const snapshot = await emissionsRef.add(emissions)
    //   if (snapshot) {
    //
    //   }
    // } catch (error) {
    //   alert(error.message)
    // }
  },
}

const calculateSubTotals = (state) => {
  // const householdTotal = 0
  // const shoppingTotal = 0
  // const transportationTotal = 0
  // const foodTotal = 0
  // const grandTotal = 0

  state.householdData.forEach((e) => {
    e.finalEmissions.electricity = +e.electricity * +e.factors.electricity
    e.finalEmissions.naturalgas = +e.naturalgas * +e.factors.naturalgas
    e.finalEmissions.total = +e.finalEmissions.electricity + +e.finalEmissions.naturalgas
  })

  state.foodData.forEach((fd) => {
    fd.finalEmissions.total = 0
    for (const product in fd.finalEmissions) {
      if (Object.hasOwnProperty.call(fd, product)) {
        fd.finalEmissions[product] = +fd[product] * +fd.factors[product];
        fd.finalEmissions.total += +fd[product] * +fd.factors[product]
      }
    }
    console.log('shopping data single total', fd.finalEmissions.total);
  })
  state.transportationData.forEach((e) => {
    e.finalEmissions.diesel = +e.diesel * +e.factors.diesel
    e.finalEmissions.petrol = +e.petrol * +e.factors.petrol
    e.finalEmissions.electric = +e.electric * +e.factors.electric
    e.finalEmissions.hybrid = +e.hybrid * +e.factors.hybrid
    e.finalEmissions.localBus = +e.localBus * +e.factors.localBus
    e.finalEmissions.averageBus = +e.averageBus * +e.factors.averageBus
    e.finalEmissions.londonBus = +e.londonBus * +e.factors.londonBus
    e.finalEmissions.coach = +e.coach * +e.factors.coach
    e.finalEmissions.nationalTrain = +e.nationalTrain * +e.factors.nationalTrain
    e.finalEmissions.lightTrain = +e.lightTrain * +e.factors.lightTrain
    e.finalEmissions.londonUnderground = +e.londonUnderground * +e.factors.londonUnderground
    e.finalEmissions.internationalTrain = +e.internationalTrain * +e.factors.internationalTrain
    e.finalEmissions.sailingBoat = +e.sailingBoat * +e.factors.sailingBoat
    e.finalEmissions.largeMotorBoat = +e.largeMotorBoat * +e.factors.largeMotorBoat
    e.finalEmissions.domesticFlight = +e.domesticFlight * +e.factors.domesticFlight
    e.finalEmissions.shortFlight = +e.shortFlight * +e.factors.shortFlight
    e.finalEmissions.longFlight = +e.longFlight * +e.factors.longFlight
    e.finalEmissions.internationalFlight = +e.internationalFlight * +e.factors.internationalFlight
    // e.finalEmissions.car = +e.kilometerage * +e.factors.car
    // e.finalEmissions.bus = +e.busKilometerage * +e.factors.bus
    // e.finalEmissions.train = +e.trainKilometerage * +e.factors.train
    e.finalEmissions.total = +e.finalEmissions.diesel + +e.finalEmissions.petrol + +e.finalEmissions.electric + +e.finalEmissions.hybrid +
      +e.finalEmissions.localBus + +e.finalEmissions.averageBus + +e.finalEmissions.londonBus +
      +e.finalEmissions.coach + +e.finalEmissions.nationalTrain + +e.finalEmissions.lightTrain +
      +e.finalEmissions.londonUnderground + +e.finalEmissions.internationalTrain +
      +e.finalEmissions.sailingBoat + +e.finalEmissions.largeMotorBoat +
      +e.finalEmissions.domesticFlight + +e.finalEmissions.shortFlight +
      +e.finalEmissions.domesticFlight + +e.finalEmissions.shortFlight +
      +e.finalEmissions.longFlight + +e.finalEmissions.internationalFlight
  })
  // shopping data emission calculation
  state.shoppingData.forEach((ssd) => {
    ssd.finalEmissions.total = 0
    for (const product in ssd.finalEmissions) {
      if (Object.hasOwnProperty.call(ssd, product)) {
        ssd.finalEmissions[product] = +ssd[product] * +ssd.factors[product];
        ssd.finalEmissions.total += +ssd[product] * +ssd.factors[product]
      }
    }
    console.log('shopping data single total', ssd.finalEmissions.total);
  })

}

const calculateGrandTotal = (state) => {
  const householdTotal = state.householdData.reduce((acc, e) => {
    return acc + e.finalEmissions.total
  }, 0)

  const shoppingTotal = state.shoppingData.reduce((acc, e) => {
    return acc + e.finalEmissions.total
  }, 0)
  console.log('shopping grand total', shoppingTotal);

  const transportationTotal = state.transportationData.reduce((acc, e) => {
    return acc + e.finalEmissions.total
  }, 0)

  const foodTotal = state.foodData.reduce((acc, e) => {
    return acc + e.finalEmissions.total
  }, 0)
  console.log('food grand total', foodTotal);

  const grandTotal =
    householdTotal + shoppingTotal + transportationTotal + foodTotal

  state.total = grandTotal
  console.log('Grand total', grandTotal);
}

// const calculateLog = (x) => Math.log10(+x),

// const calculateAverage = (x) => {
//   return _.mean(x)
// }
