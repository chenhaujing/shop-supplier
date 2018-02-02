import axios from '../utils/fetch.js'

export default {
    //查询库存单位
    getCommUnit(accountId) {
        if (accountId) {
            return axios.get('/commUnit/search?supplierId=' + accountId);
        } else {
            return axios.get('/commUnit/search');
        }
    },
    //添加库存单位
    addCommUnit(param) {
        return axios.post('/commUnit/save', param);
    },
    //删除库存单位
    delCommUnit(param) {
        return axios.delete('/commUnit/delete?id=' + param);
    }
}
