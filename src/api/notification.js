
import axios from '../utils/fetch'
export default {
    //获取跑马灯信息
    getMessage() {
        return axios.get('/notification/marqueeShow/');
    },
    //获取消息
    getMessageCount(){
        return axios.get('/notification/getTotal/')
    },
    //根据ID获取消息
    getMesageDetail(param){
        return axios.get('/notification/getNotificationById/'+param)
    },
    //获取消息详情
    updateMessageStatus(param){
        return axios.get('/notification/updateStatus/'+param)
    },
    //铃铛(获取消息)
    getOrderMessageList(param){
        return axios.get('/notification/searchUnread?notifiType='+param.notifiType+'&count='+param.count)
    },
    //获取系统消息详情
    requestMessage(param){
        return axios
            .get('/notification/getPage?notifiType='+param.notifiType+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize+'&pageTotal='+param.pageTotal+'&total='+param.total)
    },
    //消息发送
    messageSend(data) {
        return axios.post('/notification/createNotifi/',data)
    },
    //删除消息
    deleteMessage(param){
        return axios.post('/notification/deleteBySigin?sigin='+param)
    },
    //获取消息列表接口
    getMessageList(param) {
        return axios.get('/notification/getPage', { params: param });
    },
}


