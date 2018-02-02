import axios from '../utils/fetch.js';

export default {
    //发票设置查询接口
    getInvoiceSetting() {
        return axios.get('/invoiceSetting/get');
    },

    //发票设置接口
    invoiceUpdate(param) {
        return axios.put('/invoiceSetting/update', param)
    },
}
