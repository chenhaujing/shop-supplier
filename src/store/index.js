import Vue from 'vue'
import Vuex from 'vuex'
import listPageInfo from './modules/listPageInfo'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import logisticsInformation from './modules/logisticsInformation'
import permissions from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        listPageInfo,
        logisticsInformation,
        permissions,
        user
    },
    getters,
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})

// 自定义权限指令方法
const has = function(permission) {
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
}

Vue.directive('has', {
    bind: function(el, binding) {
        if (!has(binding.arg)) {
            // el.hidden="true";
            el.disabled = "true";
            // el.attributes.class.setValue="is-disabled";
            //适用于采用element标签
            if (el.attributes.class) {
                el.attributes.class.value = el.attributes.class.value + " is-disabled";
            }
        }
    },
});

export default store
