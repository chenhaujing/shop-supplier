import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import 'mint-ui/lib/style.css'
import vueTap from 'v-tap'
import fastclick from 'fastclick'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vuex from 'vuex'
// import 'bootstrap/dist/js/bootstrap.min.js'

import './filter/time.js'
import './filter/formatPrice.js'
import router from './router.js'
import '../static/css/common.css'
import '../static/css/base.less'

import VueGlobal from './common/vue-global.js'
import store from './store/index'

const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'inputs ', //Default is fields
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    enableAutoClasses: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true
};

Vue.use(VueGlobal);
Vue.use(iView);
Vue.use(vueTap)
Vue.use(VueRouter)
Vue.use(ElementUI);
// Vue.use(VueNumeric)
//Vue.use(VeeValidate,config);


import { Button } from 'mint-ui';

Vue.component(Button.name, Button);

router.beforeEach((to, from, next) => {
    let token = '';
    if(sessionStorage.getItem('vuex')){
        token = JSON.parse(sessionStorage.getItem('vuex')).user?JSON.parse(sessionStorage.getItem('vuex')).user.token:'';
    }

    if (to.path === '/') {
        // localStorage.removeItem('token');
        // localStorage.removeItem('account');
        sessionStorage.removeItem('vuex');
        next({
            path: '/login'
        })
    } else {
        next() // 确保一定要调用 next()
    }

    if (to.path === '/login' && token) {
        // localStorage.removeItem('token');
        // localStorage.removeItem('account');
        sessionStorage.removeItem('vuex');
    }

    if (to.matched.some(record => record.meta.requireAuth)) {
        //这里判断用户是否登录，验证本地存储是否有token
        if (!token) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

// router.beforeEach(
//     (to,from,next) => {
//         if(localStorage.getItem('token')){
//             if(to.path === '/login'){
//                 next({path:'/'})
//             }
//         }
//         if (to.matched.some(record => record.meta.requireAuth)) {
//             //这里判断用户是否登录，验证本地存储是否有token
//             if (!localStorage.getItem('token')) {
//                 next({
//                     path: '/login',
//                     query: { redirect: to.fullPath }
//                 })
//             } else {
//                 next()
//             }
//         } else {
//             next() // 确保一定要调用 next()
//         }
//
//     }
// )

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    data: {
        eventHub: new Vue()
    }
})

/*window.onbeforeunload = function () {
    alert('我要关闭窗口了')
}

window.onbeforeunload = onbeforeunload_handler;
window.onunload = onunload_handler;
function onbeforeunload_handler(){
    window.localStorage.removeItem('token');
    var warning="确认退出?";
    return warning;
}
function onunload_handler(){
    window.localStorage.removeItem('token');
    var warning="谢谢光临";
    alert(warning);
}*/

// router.push('login')
