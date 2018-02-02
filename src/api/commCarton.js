import axios from '../utils/fetch.js'

export default {
    // 查询箱规单位
    getCommCarton(accountId) {
        if (accountId) {
            return axios.get('/commCarton/search?supplierId=' + accountId);
        } else {
            return axios.get('/commCarton/search');
        }
    },
    //添加箱规单位
    addCommCarton(param) {
        return axios.post('/commCarton/create', param);
    },
    //删除箱规单位
    delCommCarton(param) {
        return axios.delete('/commCarton/delete?id='+param);
    }
}
