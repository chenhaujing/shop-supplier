const logisticsInformation = {
    state: {
        logiticsInfo: {

        },
        isRemember: false,
    },

    mutations: {
        SET_LOGS: (state, logiticsInfo) => {
            state.logiticsInfo = logiticsInfo
        },

        SET_REMEMBER: (state, isRemember) => {
            state.isRemember = isRemember
        },
    },

    actions: {
        setLogs: ({ commit }, logiticsInfo) => {
            commit('SET_LOGS', logiticsInfo)
        },

        setRemember: ({ commit }, isRemember) => {
            commit('SET_REMEMBER', isRemember)
        },
    }
}

export default logisticsInformation
