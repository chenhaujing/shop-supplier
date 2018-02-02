const TABLE_HEAD_ONE = [{ name: '商品条码' }, { name: '商品商家编码' },
    { name: '库存单位' }, { name: '规格' },
    { name: '箱规' }, { name: '规格值' },
];
const TABLE_HEAD_TWO = [{ name: '起订量' },
    { name: '透云进货价' }, { name: 'app订货价' }, { name: '生产日期' },
    { name: '有效期' }, { name: '商品标签' }];


export default {
    tableHeadOne: TABLE_HEAD_ONE,
    tableHeadTwo: TABLE_HEAD_TWO,
    checkout(obj) {
        //判断商品条码输入是否符合规则
        if (!obj.code69 || (obj.code69 != null && !/^[1-9][0-9]{0,19}$/.test(obj.code69))) {
            return '商品条码不能为空并且不能大于20位的数字!';
        }
        //判断商品商家编码
        if (obj.code && obj.code.length > 20) {
            return '商品商家编码长度不能大于20位';
        }
        if (obj.code && !/[\w+|\d+]/ig.test(obj.code)) {
            return '商品商家编码只能输入数字和字母';

        }
        if (!obj.unitId) {
            return "请选择库存单位";
        }
        //判断规格值是否符合要求
        if (!/^[1-9][0-9]{0,3}$/.test(obj.measureSpecVal)) {
            return '规格值必须是1到9999正整数';
        }
        if (!obj.measureSpecName) {
            return '请选择规格单位';
        }
        //判断箱规值是否符合要求
        if (!/^[1-9][0-9]{0,3}$/.test(obj.cartonVal)) {
            return '箱规值必须是1到9999正整数';
        }
        if (!obj.cartonId) {
            return '请选择箱规单位';
        }
        //校验起订量
        if (!/^[1-9][0-9]{0,3}$/.test(obj.minOrderQuantity)) {
            return '起订量必须是1到999的正整数';
        }
        if (Number(obj.unitPrice) <= 0) {
            return '透云进货价不能为负数或者为0';
        }
        if (!/^\d+(\.\d{0,2})?$/.test(obj.unitPrice)) {
            return '透云进货价，只能输入数字，小数点后只能保留两位';
        }
        if (Number(obj.unitPrice) > 99999999) {
            return '透云进货价不能大于99999999';
        }
        if (Number(obj.price) <= 0) {
            return 'app订货价不能为负数或者为0';
        }
        if (!/^\d+(\.\d{0,2})?$/.test(obj.price)) {
            return 'app订货价,只能输入数字，小数点后只能保留两位';
        }
        if (Number(obj.price) > 99999999) {
            return 'app订货价不能大于99999999';
        }
        if (Number(obj.unitPrice) > Number(obj.price)) {
            return '透云进货价不能大于app订货价';

        }
        if (!obj.productionDate) {
            return "生产日期不能为空";
        }
        if (!obj.guaranteePeriod || (!/^[1-9][0-9]{0,3}$/.test(obj.guaranteePeriod))) {
            return "有效期不能为空并且必须是1到9999的正整数";
        }
        if (!obj.guaranteePeriodUnit) {
            return "请选择有效期单位";
        }
        if (obj.imgeList.length === 0) {
            return '上传图片个数不能为0';
        }
    },
    queryType(type) {
        if (type === 1) {
            return 1
        } else if (type === 2) {
            return 2
        }
    },
    rowHeight(dom1, dom2) {
        let newArr = [];
        if (dom1 && dom2) {
            for (let i = 0; i < dom1.length; i++) {
                newArr.push(dom1[i].offsetHeight);
            }
            for (let i = 0; i < dom2.length; i++) {
                dom2[i].children[0].style.height = newArr[i] + 'px';
            }
            return dom2;
        }
    },
}



