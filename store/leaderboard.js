export const state = () => {
    return {
        myPrivateLeaderboards: undefined
    }
}

export const mutations = {
    SET_MY_PRIVATE_LEADERBOARDS: (state, leaderboards) => {
        state.myPrivateLeaderboards = leaderboards
    }
}

export const actions = {
    async getMyPrivateLeaderboards({ commit, state }) {
        const leaderboardsSnapshot = await this.$fire.firestore
            .collection('businessLeaderboards')
            .where('players', 'array-contains', this.$fire.auth.currentUser.uid)
            .get()
        const privateLeaderboards = []
        leaderboardsSnapshot.docs.forEach((lb) =>
            privateLeaderboards.push({ id: lb.id, ...lb.data() })
        )
        commit('SET_MY_PRIVATE_LEADERBOARDS', privateLeaderboards)
        return privateLeaderboards
    }
}