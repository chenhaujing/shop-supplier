import {format} from 'date-fns';
import {zh_cn} from 'date-fns/locale/zh_cn';

export default {
    //根据状态进行标签页切换
    toggleStatus(routeSupplier,three,two,one,aptitudeCheck){
        if (routeSupplier ==1 || routeSupplier == 2 || routeSupplier == 3 || routeSupplier == 4||routeSupplier==5) {
            three = true;
            two = false;
            one = false;
            aptitudeCheck = true;
        }
    },
    //清空审核本地图片
    clearPic(obj){
        obj = [];
        return obj;
    },
    //待审核成功后 将隐藏的状态置为显示
    picBlock(arr){
        arr[2].style.display = 'block';
        arr[3].style.display = 'block';
        arr[4].style.display = 'block';
        arr[5].style.display = 'block';
        arr[6].style.display = 'block';
        return arr;
    },
    //根据供应商不同的状态 展现需要的照片
    showPic(supplierListAll,fileListFive, fileListTwo, fileListThree,fileListPic,fileListFour){
        for (let key in supplierListAll) {
            if (supplierListAll[key].qualificationType == 1) {
                fileListFive.push(supplierListAll[key])
            }
            if (supplierListAll[key].qualificationType == 2) {
                fileListTwo.push(supplierListAll[key])
            }
            if (supplierListAll[key].qualificationType == 3) {
                fileListThree.push(supplierListAll[key])
            }
            if (supplierListAll[key].qualificationType == 4) {
                fileListPic.push(supplierListAll[key])
            }
            if (supplierListAll[key].qualificationType == 5) {
                fileListFour.push(supplierListAll[key])
            }
        }
    },
    //图片在线查看功能
    //  图片查看功能
    // file 代表上传成功后的数组 dialogVisible 保存上传后的图片 dialogVisible 控制视图
    picLookDialogImageUrl(file,dialogImageUrl){
       return dialogImageUrl=file.url;
    },
    picLookDialogVisible(file,dialogVisible){
       return dialogVisible = true;
    },
}


