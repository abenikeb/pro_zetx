export const state = () => {
  return {
    measureData: [],
  }
}

export const mutations = {
  SET_MEASURE_DATA(state, payload) {
    state.measureData = payload
  },
}

export const actions = {
  // fetches all the measure datas
  async getMeasureDataAction({ commit }) {
    const measureRef = this.$fire.firestore.collection('emissionsData')
    const measureSnapshot = await measureRef.get()
    let measures = []
    measureSnapshot.forEach((measure) => {
      measures.push({
        id: measure.id,
        ...measure.data(),
      })
    })
    commit('SET_MEASURE_DATA', measures)
  },
  async getUserMeasureDataAction({ commit }, id) {
    const measureRef = this.$fire.firestore.collection('emissionsData').doc(id)
    const measureSnapshot = await measureRef.get()
    return {
      id,
      ...measureSnapshot.data(),
    }
  },
  async changeStatus({ state, commit }, data) {
    
    const measureId = data.id
    const section = data.section
    const sentMeasuredData = data.data

    if (section === 'household') {
      const measureRef = this.$fire.firestore
        .collection('emissionsData')
        .doc(measureId)
      await measureRef.update({
        'household': sentMeasuredData,
      })
      const newMeasureData = state.measureData

      newMeasureData.forEach((measure) => {
        if (measure.id === measureId) {
          measure.household = sentMeasuredData
        }
      })

      commit('SET_MEASURE_DATA', newMeasureData)
    } else if (section === 'food') {
      const measureRef = this.$fire.firestore
        .collection('emissionsData')
        .doc(measureId)
      await measureRef.update({
        'food': sentMeasuredData,
      })
      const newMeasureData = state.measureData

      newMeasureData.forEach((measure) => {
        if (measure.id === measureId) {
          measure.food = sentMeasuredData
        }
      })

      commit('SET_MEASURE_DATA', newMeasureData)
    }else if (section === 'shopping') {
      const measureRef = this.$fire.firestore
        .collection('emissionsData')
        .doc(measureId)
      await measureRef.update({
        'shopping': sentMeasuredData,
      })
      const newMeasureData = state.measureData

      newMeasureData.forEach((measure) => {
        if (measure.id === measureId) {
          measure.shopping = sentMeasuredData
        }
      })

      commit('SET_MEASURE_DATA', newMeasureData)
    }
  },
}
