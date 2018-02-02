import {format} from 'date-fns';
import {zh_cn} from 'date-fns/locale/zh_cn';

export default {
    simpleSearchObj: {   //普通查询
        beginDate: '',
        endDate: '',
        inputValue: '',
        status: null,
        orderReceiverName: '',
        orderReceiverMobile: '',
        pageSize: 10,
        pageNum: 1
    },
    searchObj: {       //高级查询
        pageSize: 10,
        pageNum: 1,
        returnNumber: "",
        beginDate: '',
        endDate: '',
        orderPaymentMethod: null,
        orderReceiverName: '',
        orderReceiverMobile: '',
        orderPaymentNum: '',
        beginMoney: '',
        endMoney: '',
        status: '',
        orderReceiveBeginTime: '',
        orderReceiveEndTime: '',
        orderPaymentBeginTime: '',
        orderPaymentEndTime: ''
    },
    status: [
        { name: '全部', value: "" },
        { name: '已完成', value: 0 }, { name: '退款申请中', value: 1 }, { name: '审核通过', value: 2 },
        { name: '拒绝退款', value: 3 }, { name: '退款中', value: 4 }, { name: '已退款', value: 5 },
        { name: '退款取消', value: 6 }
    ],
    typePayment: [
        { name: '全部', value: "" }, { name: '微信', value: 1 }, { name: '支付宝', value: 2 }
    ],
    //退货列表转换数据方法
    changeReturnListData(data) {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            data[i].num = i + 1;
            switch (data[i].status) {
                case 0:
                    data[i].returnNumberStatus = '已完成';
                    break;
                case 1:
                    data[i].returnNumberStatus = '退款申请中';
                    break;
                case 2:
                    data[i].returnNumberStatus = '审核通过';
                    break;
                case 3:
                    data[i].returnNumberStatus = '拒绝退款';
                    break;
                case 4:
                    data[i].returnNumberStatus = '退款中';
                    break;
                case 5:
                    data[i].returnNumberStatus = '已退款';
                    break;
                case 6:
                    data[i].returnNumberStatus = '退货取消';
                    break;
            }
        }
        return data;
    },
    //普通查询数据转换方法,并且清空高级搜索
    changeReturnSimSearch(simSearch, search) {
        let res = "";
        for (let key in search) {
            if (key === 'pageNum' || key === 'pageSize') {
                continue;
            }
            if (key === 'orderPaymentMethod') {
                search[key] = null;
                continue;
            }
            search[key] = "";
        }
        simSearch.beginDate = simSearch.beginDate ? format(simSearch.beginDate, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
        simSearch.endDate = simSearch.endDate ? format(simSearch.endDate, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
        res = this.checkTime([simSearch.beginDate], [simSearch.endDate], ['拒收']);
        if (typeof res === "string") {
            return res;
        }
        simSearch.endDate = res[0];
        return simSearch;
    },
    //高级查询数据转换方法,并且清空普通搜索
    changeReturnSearch(search) {
        let res = "",
            startArr = [],
            endArr = [],
            strArr = [];

        search.beginDate = search.beginDate ? format(search.beginDate, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
        search.endDate = search.endDate ? format(search.endDate, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';

        search.orderPaymentBeginTime = search.orderPaymentBeginTime ? format(search.orderPaymentBeginTime, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
        search.orderPaymentEndTime = search.orderPaymentEndTime ? format(search.orderPaymentEndTime, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';

        search.orderReceiveBeginTime = search.orderReceiveBeginTime ? format(search.orderReceiveBeginTime, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
        search.orderReceiveEndTime = search.orderReceiveEndTime ? format(search.orderReceiveEndTime, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';

        if (search.beginMoney && search.endMoney && parseInt(search.beginMoney) > parseInt(search.endMoney)) {
            return "最小金额不能大于最大金额"
        }
        startArr = [search.beginDate, search.orderPaymentBeginTime, search.orderReceiveBeginTime];
        endArr = [search.endDate, search.orderPaymentEndTime, search.orderReceiveEndTime];
        strArr = ['拒收', '支付', '收货'];

        res = this.checkTime(startArr, endArr, strArr);
        if (typeof res === "string") {
            return res;
        }
        search.endDate = res[0];
        search.orderPaymentEndTime = res[1];
        search.orderReceiveEndTime = res[2];

        return search;
    },
    //判断开始时间和结束时间是否合理
    checkTime(startTime, endTime, strArr) {
        for (let i = 0; i < strArr.length; i++) {
            if (endTime[i]) {
                let arr = endTime[i].split(' ')[0];
                endTime[i] = arr + ' 23:59:59';
            }
            if (startTime[i] && endTime[i] && startTime[i] > endTime[i]) {
                return strArr[i] + '开始时间不能大于结束时间'
            }
        }
        return endTime;
    },
}
