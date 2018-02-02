import axios from '../utils/fetch'

export default {
    //获取物流
    trackLogistics(param) {
        return axios.get('/logistics/' + param);
    },
}
