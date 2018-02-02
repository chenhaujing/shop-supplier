import axios from '../utils/fetch'
export default {

    /**
     * 配送范围接口
     * @param param
     * @returns {AxiosPromise}
     */

    //1.获取列表接口
    getDistributionList(param) {
        return axios.get('/distributionscope/queryAll', { params: param });
    },

    //2.获取单条信息接口
    getDistributionById(id) {
        return axios.get('/distributionscope/query/' + id);
    },

    //3.新增接口
    addDistribution(param) {
        return axios.post('/distributionscope/create', param);
    },

    //4.删除接口
    deleteDistribution(id) {
        return axios.post('/distributionscope/delete/' + id);
    },

    //5.更新接口
    updateDistribution(id, param) {
        return axios.post('/distributionscope/update/' + id, param);
    },

    //获取供应商
    getDistributionscope(id) {
        return axios.get('/distributionscope/query/' + id);
    },

    // 获取地区列表
    getAreaList(param) {
        return axios.get('/account/get/', { params: param });
    },
    //根据id查询管理员子账号详情接口
    getAccountById(id){
        return axios.get('/subaccount/details/'+id)
    },

}
