import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// 创建axios实例
const service = axios.create({

    baseURL: process.env.BASE_URL, // api的base_url
    timeout: 15000 // 请求超时时间
})

// request拦截器
// noinspection JSAnnotator
service.interceptors.request.use(config => {
    let token = '';
    if(sessionStorage.getItem('vuex')){
        token = JSON.parse(sessionStorage.getItem('vuex')).user?JSON.parse(sessionStorage.getItem('vuex')).user.token:'';
    }
    config.headers.common.Authorization = token;
    return config;
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

function messageHandler(response) {
    return response;
}


// respone拦截器
service.interceptors.response.use(
    (response) => {
        return messageHandler(response);
    },
    (error) => {
        // debugger
        // errorMessageHandler(error);
        if (error.response) {
            switch (error.response.status) {
                case 403:
                    // 返回 401 清除token信息并跳转到登录页面
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('account');
                    // router.replace({ path: 'page403', query: { redirect: router.currentRoute.fullPath } });
                    Message({
                        message: '无此操作权限',
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('account');
                    sessionStorage.removeItem('vuex');
                    MessageBox({
                        message: '此账号正在别处使用',
                        type: 'error',
                        duration: 2 * 1000
                    }).then(()=>{
                        location.reload();// 为了重新实例化vue-router对象 避免bug
                    });
                    // return this.$route.path.replace('/', '');
                    // this.$router.replace({path: '/login'});

            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
)

export default service
