import {format} from 'date-fns';
import {zh_cn} from 'date-fns/locale/zh_cn';

export default {
    clearData(obj){
        //发送请求前，清空高级查询所有数据
        for (let key in obj) {
            if (key === 'pageNum' || key === 'pageSize') {
                continue;
            }
            obj[key] = null;
        }
    },
    timeJudge(obj) {
        obj.beginApplyForTime = obj.beginApplyForTime ? format(obj.beginApplyForTime, 'YYYY-MM-DD', {locale: zh_cn}) : ''; //换货时间开始赋值
        obj.endApplyForTime = obj.endApplyForTime ? format(obj.endApplyForTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';  //换货时间结束赋值
    },
    statusAssignment(arr){
        arr.forEach((r)=>{
            switch (r.status){
                case 0:
                    r.name = '已完成';
                    break;
                case 1:
                    r.name = '换货申请中';
                    break;
                case 2:
                    r.name = '审核通过';
                    break;
                case 3:
                    r.name = '拒绝换货';
                    break;
                case 4:
                    r.name = '换货中';
                    break;
                case 5:
                    r.name = '已换货';
                    break;
                case 6 :
                    r.name = '换货取消';
                    break;
            }
        })
    },
}
