import axios from '../utils/fetch'

export default {
    setAfterSetting(data) {
        return axios.post("/afterSetting/save", data);
    },
    getAfterSetting() {
        return axios.get('/afterSetting/get');
    }
}
