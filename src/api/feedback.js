import axios from '../utils/fetch'

export default {

    //产品返回提交
    createFeedback(param) {
        return axios.post('/feedback/createFeedback', param)
    },
}