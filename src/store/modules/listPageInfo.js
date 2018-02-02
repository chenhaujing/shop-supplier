const listPageInfo = {
    state: {
        pageInfo: {

        },
        returnFlag: false
    },

    mutations: {
        SET_PAGEINFO: (state, pageInfo) => {
            state.pageInfo = pageInfo
        },

        SET_FLAG: (state, returnFlag) => {
            state.returnFlag = returnFlag
        },


    },

    actions: {

        setPageInfo: ({ commit }, pageInfo) => {
            commit('SET_PAGEINFO', pageInfo)
        },

        setFlag: ({ commit }, returnFlag) => {
            commit('SET_FLAG', returnFlag)
        },

    }
}

export default listPageInfo
