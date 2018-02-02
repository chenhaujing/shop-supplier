const user = {
    state: {
        token: '',
        account: {},
    },

    mutations: {
        SET_ACCOUNT: (state, account) => {
            state.account = account
        },

        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },

    actions: {
        setAccount: ({ commit }, account) => {
            commit('SET_ACCOUNT', account)
        },

        setToken: ({ commit }, token) => {
            commit('SET_TOKEN', token)
        },
    }
}

export default user
