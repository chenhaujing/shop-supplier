<template>
    <div>
        <breadCrumb :navigationList="navigationList"></breadCrumb>
        <div style="margin-left:50px;">
            <p>收货人姓名</p>
            <el-input style="width:217px;" v-model="myData.consigneeName"></el-input>
            <p>收货人电话</p>
            <el-input style="width:217px;" v-model="myData.consigneePhone"></el-input>
            <p>退换货地址</p>
            <span>
                <el-select v-model="myProvince" placeholder="请选择" @change="selectCity">
                    <el-option
                        v-for="item in provice"
                        :label="item.name"
                        :value="item.srId">
                    </el-option>
                </el-select>
                <span>省</span>
            </span>
            <span>
                <el-select v-model="myCity" placeholder="请选择" @change="selectDistrict">
                    <el-option
                        v-for="item in city"
                        :label="item.name"
                        :value="item.srId">
                    </el-option>
                </el-select>
                <span>市</span>
            </span>
            <span>
                <el-select v-model="myDistrict" placeholder="请选择">
                    <el-option
                        v-for="item in district"
                        :label="item.name"
                        :value="item.srId">
                    </el-option>
                </el-select>
                <span>区</span>
            </span>
            <p>详细地址</p>
            <el-input type="textarea" :cols="100" :rows="5" v-model="myData.detailedAddress"></el-input>
            <p>退回物流备注说明</p>
            <el-input type="textarea" :cols="100" :rows="5" v-model="myData.remark"></el-input>

            <p>退货声明</p>
            <ul>
                <li>第一条：收到货物5天内无质量问题不退货</li>
                <li>第二条：收到货5天后不予退款退货</li>
                <li>第三条：若收到货物有损或者货物错误，需要换货或者退货则单项运费由供应商承担</li>
                <li>第四条：若未签收无理由拒收，买家需要承担双项运费</li>
                <li>第五条：若未签收无理由换货，买家需要承担双向运费</li>
                <li>第六条：若未签收，并有足够证据证明货物损坏或货号错误，需要换货，卖家需承担双向运费</li>
                <li>第七条：若未签收，并有足够证据证明货物损坏或货物发错，需要退货，卖家需承担单项费用</li>
                <li>第八条：凡是赠品若出现质量问题一律不给退货或者换货</li>
                <li>第九条：若买家全部拒收赠品也需要一并退回</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <el-button v-has:afterSetting_save type="info" @click="submit">保存</el-button>
        </div>
    </div>
</template>

<style scoped>
    .afterSetting_inputFormat {
        width: 150px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        line-height: 36px;
        height: 36px;
        padding-left: 10px;
    }

    p {
        line-height: 36px;
        margin: 0;
    }

    textarea {
        border-radius: 5px;
    }

</style>
<script>
    import breadCrumb from '../../components/Breadcrumb.vue';
    import afterSet from '../../api/afterSetting.js';
    import account from '../../api/account.js';

    export default {
        data() {
            return {
                myData: {
                    id: null,
                    consigneeName: "",
                    consigneePhone: '',
                    proviceId: '',
                    cityId: '',
                    districtId: '',
                    provice: "",
                    city: "",
                    district: "",
                    detailedAddress: "",
                    remark: ""
                },
                provice: [],
                city: [],
                district: [],
                myProvince: "",
                myCity: "",
                myDistrict: ""
            }
        },
        created() {
            afterSet.getAfterSetting().then(res => {
                if (res.data.code === 1 && res.data.data) {
                    let data = res.data.data;
                    this.myData.id = data.id;
                    this.myData.consigneeName = data.consigneeName;
                    this.myData.consigneePhone = data.consigneePhone;
                    this.myProvince = data.provice;
                    this.myCity = data.city;
                    this.myDistrict = data.district;
                    this.myData.detailedAddress = data.detailedAddress;
                    this.myData.remark = data.remark;
                    this.myData.proviceId = data.proviceId;
                    this.myData.cityId = data.cityId;
                    this.myData.districtId = data.districtId;
                }
                //页面初始化的时候获取省市区三级联动,因为需要this.myData.proviceId和this.myData.cityId所以需要放到ajax请求里面
                account.getAreaList().then(res => {
                    if (res.data) {
                        this.provice = res.data;
                    }
                });
                if (this.myData.proviceId) {
                    account.getAreaData(this.myData.proviceId).then(res => {
                        if (res.data) {
                            this.city = res.data;
                        }
                    });
                }
                if (this.myData.cityId) {
                    account.getAreaData(this.myData.cityId).then(res => {
                        if (res.data) {
                            this.district = res.data;
                        }
                    });
                }
            });

        },
        components: {
            breadCrumb
        },
        methods: {
            submit() {
                //省市区3级联动数据处理,页面初始化的时候是只有srId的,如果页面是更新的话,页面开始绑定的是name不是srId
                for (let i = 0; i < this.provice.length; i++) {
                    if (this.provice[i].name === this.myProvince || this.provice[i].srId === this.myProvince) {
                        this.myData.proviceId = this.provice[i].srId;
                        this.myData.provice = this.provice[i].name;
                    }
                }
                for (let i = 0; i < this.city.length; i++) {
                    if (this.city[i].name === this.myCity || this.city[i].srId === this.myCity) {
                        this.myData.cityId = this.city[i].srId;
                        this.myData.city = this.city[i].name;
                    }
                }
                for (let i = 0; i < this.district.length; i++) {
                    if (this.district[i].name === this.myDistrict || this.district[i].srId === this.myDistrict) {
                        this.myData.districtId = this.district[i].srId;
                        this.myData.district = this.district[i].name;
                    }
                }


                //下面是校验部分;
                if (!this.myData.consigneeName) {
                    this.$alert("请输入收货人姓名");
                    return;
                }
                if (this.myData.consigneePhone.length < 7 || this.myData.consigneePhone.length > 20) {
                    this.$alert("电话号码请输入7到20位字符");
                    return;
                }
                if (!this.myData.proviceId || !this.myData.cityId || !this.myData.districtId) {
                    this.$alert("请选择省市区");
                    return;
                }
                if (this.myData.detailedAddress.length < 1 || this.myData.detailedAddress.length > 250) {
                    this.$alert("详细地址请输入1到250个字符");
                    return;
                }
                if (this.myData.remark.length > 250) {
                    this.$alert("货物备注说明请输入不能超过250个字符");
                    return;
                }
                afterSet.setAfterSetting(this.myData).then(res => {
                    if (res.data.code === 1) {
                        this.$alert(res.data.message);
                    }
                });
            },
            selectCity() {
                if (typeof this.myProvince === "string") {
                    return;
                }
                this.myCity = "";
                this.myData.cityId = "";
                account.getAreaData(this.myProvince).then(res => {
                    this.city = res.data;
                });
            },
            selectDistrict() {
                if (typeof this.myCity === "string") {
                    return;
                }
                this.myDistrict = "";
                this.myData.districtId = "";
                account.getAreaData(this.myCity).then(res => {
                    this.district = res.data;
                });
            }
        },
        computed: {
            navigationList() {
                this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
                if (this.isAdmin == 0) {
                    return [{ name: ' 系统设置' }, { name: '售后设置' }];
                }
            }
        },
    }
</script>
