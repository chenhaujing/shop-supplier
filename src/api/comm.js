import axios from '../utils/fetch.js'

export default {
    //首页加载获取商品信息
    getCommodity(param) {
        return axios.get('/comm/findApproval/', { params: param });
    },
    //商品批量审核请求
    getBulk(data) {
        return axios.post('/comm/audit/bulk/', data)
    },
    //新增页面提交数据
    submitContent(params) {
        return axios.post('/comm/save', params);
    },
    //编辑页面提交数据
    editSubmitContent(id, data) {
        return axios.put('/comm/update?supplierId=' + id, data)
    },
    //列表普通查询
    simpleSearch(param) {
        return axios.get('/comm/simplesearch', { params: param });
    },
    //列表高级查询--第一个参数是数据,第二个是请求头
    search(param, data) {
        return axios.get('/comm/search', { params: param }, data);
    },
    //列表删除--第一个参数是数据,第二个是请求头
    deleteCommodity(id, param) {
        return axios.delete('/comm/delete/bulk?id=' + id, param);
    },
    //详情删除商品sku
    deleteCommoditySku(commodityId) {
        return axios.delete('/comm/delete/' + commodityId);
    },
    //列表和详情上架商品
    goodsShelves(id) {
        return axios.put('/comm/onShelves/' + id);
    },
    //列表和详情下架商品
    cancelCommoditySku(commodityId) {
        return axios.put('/comm/offShelves/' + commodityId);
    },
    //批量上架
    uploadCommodity(ids, param) {
        return axios.put('/comm/onShelves/batch?ids=' + ids, param);
    },
    //批量下架
    cancelCommodity(ids, param) {
        return axios.put('/comm/offShelves/batch?ids=' + ids, param);
    },
    //商品详情查询---管理员
    getAdminCommodityInfo(id) {
        return axios.get('/comm/getAudit/' + id);
    },
    //商品详情查询---供应商
    getCommodityInfo(id) {
        return axios.get('/comm/get/' + id);
    },
    //根据商品条码查询商品信息接口
    findByCode69(code69) {
        return axios.get('/comm/findByCode69/' + code69);
    }
}
