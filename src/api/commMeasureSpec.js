import axios from '../utils/fetch.js'

export default {
    //查询规格单位
    getCommMeasureSpec(accountId) {
        if (accountId) {
            return axios.get('/commMeasureSpec/searchCommMeasureSpec?supplierId=' + accountId);
        } else {
            return axios.get('/commMeasureSpec/searchCommMeasureSpec?supplierId=0');
        }
    },
    //添加规格单位
    addCommMeasureSpec(param) {
        return axios.post('/commMeasureSpec/save', param);
    },
    //删除规格单位
    delCommMeasureSpec(param) {
        return axios.delete('/commMeasureSpec/delete?id=' + param);
    }
}
