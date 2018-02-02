import axios from '../utils/fetch.js'

export default{
    //查询商品品牌
    getCommodityBrand() {
        return axios.get('/commBrand/search');
    }
}
