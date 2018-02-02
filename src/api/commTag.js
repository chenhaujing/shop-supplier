import axios from '../utils/fetch.js'

export default {
    //查询商品标签
    getCommTag(accountId) {
        if (accountId) {
            return axios.get('/commTag/search?supplierId=' + accountId);
        } else {
            return axios.get('/commTag/search');
        }
    },
    //添加商品标签
    addCommTag(param) {
        return axios.post('/commTag/save?', param);
    },
    //删除商品标签
    delCommTag(params) {
        return axios.delete('/commTag/delete?id=' + params)
    }
}

