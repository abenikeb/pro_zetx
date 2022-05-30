export const state = () => {
  return {
    foodTotalEmission: 0,
    shoppingTotalEmission: 0,
    householdTotalEmission: 0,
    transportationTotalEmission: 0,
  }
}

export const mutations = {
  SET_FOOD_EMISSION: (state, totalFoodEmission) => {
    state.foodTotalEmission = totalFoodEmission
  },
  SET_SHOPPING_EMISSION: (state, totalShoppingEmission) => {
    state.shoppingTotalEmission = totalShoppingEmission
  },
  SET_HOUSEHOLD_EMISSION: (state, totalHouseholdEmission) => {
    state.householdTotalEmission = totalHouseholdEmission
  },
  SET_TRANSPORTATION_EMISSION: (state, totalTransportationEmission) => {
    state.transportationTotalEmission = totalTransportationEmission
  },
}
