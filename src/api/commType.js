import axios from '../utils/fetch.js'

export default {
    //商品类型查询 ----3级联动
    getCommodityCategory(param) {
        return axios.get('/commType/searchCommCategory', { params: param });
    },
}
