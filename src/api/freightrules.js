import axios from '../utils/fetch'

export default {
    //库存管理接口
    inventorySearch(param) {
        return axios.get('/commInventory/search', { params: param });
    },
    //根据id获取库存信息
    getInventoryById(param) {
        return axios.get('/commInventory/getInventoryById/' + param);
    },
    //库存设置
    updateInventory(param) {
        return axios.post('/commInventory/updateInventory', param);
    },
      /**
     * 商品类型查询
     */
    getCommodityCategory(param) {
        return axios.get('/commType/searchCommCategory', { params: param });
    }
}

