const permissions = {
    state: {
        permissionList: [],
        menus: [],
        check:function(permission) {
            let flag = false;
            let obj = JSON.parse(sessionStorage.getItem('vuex'))
            let permissionList = obj.permissions.permissionList
            for (let item of permissionList) {
                if (item === permission) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
    },

    mutations: {
        update_permissionslist (state, permissionList) {
            state.permissionList = permissionList
        },
        update_menus (state, menus) {
            state.menus = menus
        }
    },

    actions: {
        updatePermissionslist: ({ commit }, permissionList) => {
            commit('update_permissionslist', permissionList)
        },
        updateMenus: ({ commit }, menus) => {
            commit('update_menus', menus)
        },
    }
}

export default permissions
