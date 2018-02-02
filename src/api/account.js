import axios from '../utils/fetch'

export default {
    //获取验证码
    confirm(){
        return axios.get('/account/sendCode')
    },
    //发送验证码
    toggle(param){
        return axios.get('/account/verifySmsCode/'+param)
    },
    //修改密码
    updatePassword(param){
        return axios.post('/account/updatePassword',param)
    },
    //点击上传
    uploadContract(){
        return axios.get('/account/uploadContract')
    },
    //获取三级联动
    getAreaList(param) {
        return axios.get('/account/get/', { params: param });
    },
    //获取三级联动----刘述   afterSetting.vue调用
    getAreaData(param) {
        return axios.get('/account/get/?pid=' + param);

    },
//获取用户手机号码
    getUserPhone() {
        return axios.get('/account/LoginPhone');
    },
//获取用户名字
    getUserInfo() {
        return axios.get('/account/username/');
    },
//获取供应商资质状态
    getSupplierState(param) {
        return axios.get('/account/qualification/search/', { params: param })
    },
//获取供应商资质信息
    getSupplierAptitudeStatus(param) {
        return axios.get('/account/qualification/getByAccountId?accountId=' + param)
    },
//获取供应商信息
    getBasicInfo(param) {
        return axios.get('/account/search?id=' + param)
    },
//获取行业列表
    getIndustry(param) {
        return axios.get('/account/selectHangYeDict/');
    },
// 获取银行列表
    getBanks(param) {
        return axios.get('/account/selectBank/');
    },
//获取供应商基本信息
    getUserAccount(param) {
        return axios.get('/account/search0', { params: param });
    },
// 获取供应商总数
    getAccountNum() {
        return axios.get('/account/AccountNumber');
    },
//删除供应商
    deleteSupplier(id) {
        return axios.delete('/account/delete/' + id);
    },
//供应商列表查询
    getSupplierList(param) {
        return axios.get('/account/findAccount', { params: param });
    },
//退出登录
    logout() {
        return axios.post('/account/logout');
    },
    //提交供应商信息(保存)
    submitSupplierInfo(param) {
        return axios.post('/account/save/', { data: param });
    },
    //提交供应商信息(编辑)
    submitEditInfo(param) {
        return axios.put('/account/update/', param)
    },
    //供应商提交审核资质信息
    submitAptitude(data) {
        return axios.post('/account/qualification/save', data)
    },
    //资质审核（提交审核）
    postAptitude(params) {
        return axios
            .put('/account/qualification/updateQualificationStatus?accountId=' + params.accountId + '&qualificationStatus=' + params.qualificationStatus + '&reason=' + params.reason)
    }
}

//退出登录
export function login(username, password) {
    return fetch({
        url: '/user/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}





