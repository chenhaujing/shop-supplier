<template>
    <div class="addOneSupplier_warp">
        <div>
            <div class="crumbs">
                <breadCrumb :navigationList="breadList"></breadCrumb>
            </div>
            <div class="mes col-xs-offset-5">
                <h3>供应商入驻信息</h3>
            </div>
            <div class="addOneSupplier_basic_warp row">
                <div class="col-xs-2 col-md-2 col-lg-2" style="margin-left: 50px;">
                    <p class="clearMargin"
                       v-bind:class="{addOneSupplier_message:true,addOneSupplier_message_cartoon:one}">基础信息</p>
                </div>
                <div class="col-xs-2 col-md-2 col-lg-2">
                    <p class="clearMargin"
                       v-bind:class="{addOneSupplier_message:true,addOneSupplier_message_cartoon:two}">合同信息</p>
                </div>
            </div>
            <!--基础信息-->
            <div class="addOneSupplier_basic_message" v-show="one" >
                <div class="row addOneSupplier_content">
                    <div class="form-horizontal">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <span class="col-xs-3 control-label"> <img
                                    src="../../../static/img/20170801162143.png">供应商名称:</span>
                                <div class="col-xs-7">
                                    <el-input type="text"  placeholder="请输入供应商名称"
                                           v-model="subInfo.providerName" :maxlength="254">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <span class="col-xs-3 control-label"> <img
                                    src="../../../static/img/20170801162143.png">法人代表:</span>
                                <div class="col-xs-7">
                                    <el-input type="text" placeholder="请输入法人姓名"
                                              v-model="subInfo.responsible" :maxlength="254">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <span class="col-xs-3 control-label"> <img
                                    src="../../../static/img/20170801162143.png">法人手机号:</span>
                                <div class="col-xs-7">
                                    <el-input type="text"  placeholder="请输入责任人手机"
                                           v-model="subInfo.responsiblePhone" :maxlength="11">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group addOneSupplier_option">
                                <span class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">
                                    注册地址:</span>
                                <div class="col-xs-3">
                                    <el-select v-model="subInfo.registAddressProvince"
                                               @change="getCity0(subInfo.registAddressProvince)">
                                            <el-option
                                                v-for="option in provinces0"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                    </el-select>
                                </div>
                                <div class="col-xs-3">
                                    <el-select v-model="subInfo.registAddressCity"
                                               @change="getArea0">
                                        <div style="min-height:30px;overflow:auto;">
                                            <el-option
                                                v-for="option in cities0"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                        </div>
                                    </el-select>
                                </div>
                                <div class="col-xs-3">
                                    <el-select v-model="subInfo.registAddressDistrict">
                                        <div style="height:200px;overflow:auto;">
                                            <el-option
                                                v-for="option in countres0"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                        </div>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-xs-offset-6">
                            <div class="form-group">
                                <span class="col-xs-3 control-label"> </span>
                                <div class="col-xs-7">
                                    <el-input type="text" placeholder="请输入街道-门牌号"
                                              v-model="subInfo.registerAddressDetail" :maxlength="254">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--合同信息-->
            <!--two-->
            <div class="row addOneSupplier_two" v-show="two">
                <div class="form-horizontal">
                    <div class="col-xs-6">
                        <div class="form-group">
                            <span class="col-xs-3 control-label addOneSupplier_margin">
                                <img src="../../../static/img/20170801162143.png">
                                合同有效期:
                            </span>
                            <div class="col-xs-4">
                                <el-date-picker
                                    v-model="subInfo.contractCreateDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    type="date" style="width:100%">
                                </el-date-picker>
                            </div>
                            <span class="col-xs-1 addOneSupplier_timeUnit">至</span>
                            <div class="col-xs-3">
                                <el-date-picker
                                    v-model="subInfo.contractEndDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    type="date" style="width:132%;margin-left:-2%">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group ">
                            <span class="col-xs-3 control-label addOneSupplier_margin"> <img src="../../../static/img/20170801162143.png">开户行账号:</span>
                            <div class="col-xs-7">
                                <el-input type="text"  placeholder="请输入账号" v-model="subInfo.bankNum"
                                          :maxlength="127">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group">
                            <span class="col-xs-3 control-label addOneSupplier_margin"> <img src="../../../static/img/20170801162143.png">开户人姓名:</span>
                            <div class="col-xs-7">
                                <el-input type="text"  placeholder="请输入姓名"
                                          v-model="subInfo.bankUserName" :maxlength="254">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group">
                            <span class="col-xs-3 control-label addOneSupplier_margin"> <img src="../../../static/img/20170801162143.png">开户行类型:</span>
                            <div class="col-xs-7">
                                <el-select v-model="subInfo.bankName" style="width: 100%">
                                        <el-option
                                            v-for="option in banks"
                                            :key="option"
                                            :label="option"
                                            :data-status="option"
                                            :value="option">
                                        </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group">
                            <span class="col-xs-3 control-label"> <img src="../../../static/img/20170801162143.png">回款结算方式:</span>
                            <div class="col-xs-9">
                                <el-radio-group v-model="subInfo.remittanceType">
                                    <el-radio   :label="1">自然月（按照合同账期结算）</el-radio>
                                    <br>
                                    <el-radio   :label="2">固定时间</el-radio>
                                </el-radio-group>
                                <div class="addOneSupplier_selectStyle" v-show="subInfo.remittanceType===1" >
                                    <div>设置每月</div>
                                    <el-select v-model="remittancedOne">
                                        <el-option
                                            v-for="optionsNumber in number"
                                            :key="optionsNumber"
                                            :label="optionsNumber"
                                            :data-status="optionsNumber"
                                            :value="optionsNumber">
                                        </el-option>
                                    </el-select>
                                    <div>号为结账时间</div>
                                </div>
                                <div class="addOneSupplier_inputStyle" v-show="subInfo.remittanceType===2">
                                    <span>结账时间</span>
                                    <el-input type="text"  placeholder="请输入结算天数"
                                           v-model="remittancedTwo" :maxlength="254">
                                    </el-input>
                                    <span>天为一个周期</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 addOneSupplier_text">
                        <div class="form-group">
                            <span class="col-xs-3 control-label addOneSupplier_margin">
                                <img src="../../../static/img/20170801162143.png">上传合同原件:
                            </span>
                            <div class="col-xs-6" style="display: block">
                                    <el-upload
                                        :multiple="false"
                                        :action="baseUrl+'/account/uploadContract?token='+this.token"
                                         accept=".pdf"
                                        :on-preview="test"
                                        :headers="headers"
                                        :on-success="uploadSuccess"
                                        :on-error="uploadError"
                                        :on-remove="removeFile"
                                        :before-upload="beforeAvatarUpload"
                                        :file-list="fileList"
                                        style="display: block">
                                        <el-button size="small" type="primary" id="addOneSupplier_click" >点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">备注说明：上传文件类型：.pdf文件大小不得超过20MB</div>
                                    </el-upload>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 addOneSupplier_start">
                    <span class="col-xs-3 control-label"> <img src="../../../static/img/20170801162143.png">是否启用:</span>
                        <el-radio-group v-model="subInfo.accountStatus" style="margin-left:2%">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="2">禁用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <!-- 把详细地址修改成了必填项 -->
            </div>
        </div>
        <!--第一部分的上一步按钮-->
        <div class="row addOneSupplier_nextStep">
            <div class="col-xs-2 col-xs-offset-5" v-show="one">
                <el-button type="info" @click="nextStep()" v-show="one" size="medium" id="addOneSupplier_next">下一步</el-button>
            </div>
        </div>
        <!--two-->
        <div class="row" v-show="two">
            <div class="col-xs-2 col-xs-offset-4">
                <el-button type="info" @click="lastStep()" size="medium" id="addOneSupplier_top">上一步</el-button>
            </div>
            <!--第二部分的按钮-->
            <div class="col-xs-2 col-xs-offset-1">
                <el-button type="info" @click="save" size="medium"  id="addOneSupplier_save">保存</el-button>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="save_model" size="tiny">
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3">已成功添加供应商信息，是否继续添加</div>
            </div>
            <div class="row addOneSupplier_model">
                <div class="col-xs-3 col-xs-offset-3">
                    <el-button type="info" @click="v_return()" id="addOneSupplier_spanOne">返回</el-button>
                </div>
                <div class="col-xs-3">
                    <el-button type="info" @click="v_yes()" id="addOneSupplier_spanTwo">确认</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import api from '../../api'
    import dateConvert from '../../dateConvert.js'
    import breadCrumb from '../../components/Breadcrumb';
    import parse from 'date-fns/parse'
    import {format} from 'date-fns'
    import {zh_cn} from 'date-fns/locale/zh_cn'
    import '../../../static/css/addOneSupplier.css'


    export default {
        data() {
            return {
                //面包屑导航
                breadList:[
                    {name:' 供应商管理'},
                    {name:'供应商添加'}
                ],
                baseUrl:'',     //用于存放上传数据的URL
                isEmpty:false, //判断供应商状态
                bargainSrc:false,
                bargainName:'',
                number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
                token: '',
                v_upload: true,
                one: true,
                two: false,
                save_model: false,
                isDisplay: false,
                isDisplayTwo: false,
                startUse:'',
                stopUse:'',
                addSupplierDisplayStart:false,
                addSupplierDisplayStop:true,
                remittancedOne: null, //固定时间时 传天数，自然月不传
                remittancedTwo: null,
                subInfo: {
                    bankName: null, // 开户行名称
                    bankNum: null,  //开户行账号
                    bankUserName: null, //开户人名称
                    contractCreateDate: null,  //合同开始时间
                    contractEndDate: null,     // 合同结束时间
                    providerName: null, //供应商名称
                    registAddressProvince: null, // 注册地址
                    registAddressCity: null,
                    registAddressDistrict: null,
                    registerAddressDetail: null, // 注册详细地址
                    remittanceType: null, //  1时表示每月哪天, 2时表示天数
                    responsible: null,  //供应商法人代表（基本信息）
                    responsiblePhone: null, // 供应商法人代表电话
                    contractName: '', //合同名字
                    accountStatus:2, //供应商状态
                    contractOriginalName: '',  //合同云端名称（fileName）
                    contractOriginal: ''       //合同云端地址（fileUrl）
                },
                industries: [],
                banks: [],
                provinces: [], // 省
                cities: [], // 市
                countres: [], // 县
                selectedSignPro: '',
                selectedSignCity: '',
                selectedSignArea: '',
                provinces0: [],
                cities0: [], // 基本信息市
                countres0: [], // 基本信息县
                selectedSignPro0: '',
                selectedSignCity0: '',
                selectedSignArea0: '',
                isClick: false,
                fileList: [],
            }
        },
        filters: {
            filterPhone: function (value) {
                return value
            }
        },
        computed: {
            headers() {
                let token = this.token
                return {
                    'Authorization': token
                }
            },
            //对时间进行二次处理
            formateLicenseTimeCreate: function () {
                return format(this.subInfo.licenseTimeCreate, 'YYYY-MM-DD', {locale: zh_cn});
            },
            formateLicenseTimeEnd: function () {
                return format(this.subInfo.licenseTimeEnd, 'YYYY-MM-DD', {locale: zh_cn});
            },
            formateContractCreateDate: function () {
                return format(this.subInfo.contractCreateDate, 'YYYY-MM-DD', {locale: zh_cn});
            },
            formateContractEndDate: function () {
                return format(this.subInfo.contractEndDate, 'YYYY-MM-DD', {locale: zh_cn});
            },
            formateContractLicenseCreate: function () {
                return format(this.subInfo.contractLicenseCreate, 'YYYY-MM-DD', {locale: zh_cn});
            },
            formateContractLicenseEnd: function () {
                return format(this.subInfo.contractLicenseEnd, 'YYYY-MM-DD', {locale: zh_cn});
            }
        },
        created: function () {
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.baseUrl = this.$globalData.baseUrl;
            this.selectHangYe()   //获取行业
            this.selectBank()     //获取银行
            this.getProvince0()   //获取省市区
            this.getProvince()     //获取省市区
        },
        methods: {
            //打开在线链接
            test(file){
                this.bargainName=file.response.data.fileUrl;
                this.bargainSrc=true;
                this.pdfurls =  this.bargainName;
                window.open(this.bargainName,'height=800, width=1000,top=200,left=400,resizable=yes');
            },
            //上传文件start
            uploadSuccess(response, file, fileList) {
                this.subInfo.contractOriginalName = response.data.fileName;
                this.subInfo.contractOriginal = response.data.fileUrl;
                this.subInfo.contractName = response.data.originalFileName;
                this.fileList.push(file)
            },
            //删除图片
            removeFile(file, fileList) {
                if (file) {
                    this.fileList = [];
                    this.subInfo.contractOriginalName = '';
                    this.subInfo.contractOriginal = '';
                }
            },
            //限制上传图片大小/
            beforeAvatarUpload(file) {
                if (this.fileList && this.fileList.length == 1) {
                    this.$message.error('文件只能上传一次')
                    return false
                }
                let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
                if ('pdf' !== suffix) {
                    this.$alert('您上传的格式有误')
                    return false
                }
                const isLt2M = file.size / 1024 / 1024 < 20;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 20MB!');
                }
                return isLt2M;
            },
            //文件上传提示
            inProgress(event, file, fileList) {
                this.$alert('文件正在上传中')
            },
            //文件上传失败提示
            uploadError(err, file, fileList) {
                this.$alert('文件上传失败')
            },
            /*点击下一步，所提示的信息*/
            nextStep() {
                //必填项进行检验
                let isEmpty = false;
                let supperlierPhone = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                let supperlierTel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                //校验所有填写的信息
                this.inspectSupplier(isEmpty,supperlierPhone)
            },
            //点下下一步，对填写的信息进行校验
            inspectSupplier(type,phone){
                let item2Check = {
                    providerName: '供应商名称',
                    responsible: '法人代表',
                    responsiblePhone: '法人手机号',
                    registAddressProvince: '注册地址',
                    registAddressCity: '注册地址',
                    registAddressDistrict: '注册地址',
                    registerAddressDetail: '注册地址',
                };
                for (let item in item2Check) {
                    if (!this.subInfo[item]) {
                        this.$alert(item2Check[item] + '不能为空');
                        type = true;
                        break;
                    }
                }
                if (type) {
                    return;
                }
                if (!(phone).test(this.subInfo.responsiblePhone)) {
                    this.$alert('法人手机号填写有误！');
                    this.subInfo.responsiblePhone = '';
                    return;
                }
                    this.one = !this.one,
                    this.two = !this.two
            },
            /*上一步,返回供应商基础信息*/
            lastStep() {
                    this.one = !this.one,
                    this.two = !this.two
            },
            /*模态框确认，清空所有内容，准备二次提交*/
            v_yes() {
                //路由跳转，清空所有内容
                this.$router.push('/addOneSupplier')
                for(let key in this.subInfo){
                    this.subInfo[key] = ''
                }
                //清空状态以及当前的内容
                this.clearSupplier();
            },
                //点击确认，清空供应商所有内容
               clearSupplier(){
                this.subInfo.accountStatus = 2
                this.fileList=[];
                this.isDisplay = false
                this.isDisplayTwo = false
                this.save_model = !this.save_model
                this.one = !this.one
                this.two = !this.two
            },
            /*模态框返回*/
            v_return() {
                this.$router.push('/supplierInfoList')
            },
            //复选框选择
            start(type){
                if(type==1){
                    this.subInfo.accountStatus=1
                }else if(type==0){
                    this.subInfo.accountStatus=2
                }
            },
            //保存
            save() {
                let that = this;
                //回款方式
                this.moneyMethod();
                //三级联动
                this.supplierCity();
                //供应商非空判断
                let isEmpty = false;
                let item2Check = {
                    contractCreateDate: '合同有效期起始时间',
                    contractEndDate: '合同有效期终止时间',
                    bankNum: '开户行账号',
                    bankUserName: '开户人姓名',
                    bankName: '开户行类型',
                    remittanceType: '回款结算方式',
                    contractOriginalName: '上传合同',
                    contractOriginal: '合同云端地址',
                };
                for (let item in item2Check) {
                    if (!that.subInfo[item]) {
                        this.$alert(item2Check[item] + '不能为空');
                        isEmpty = true;
                        break;
                    }
                }
                if (isEmpty) {
                    return;
                }
                //供应商启用状态 回款结算天数非空判别
                this.supplierSaveStatue();
                if(this.supplierSaveStatue()===false){
                       return;
                }

                if (that.formateContractCreateDate > that.formateContractEndDate) {
                    that.subInfo.contractCreateDate = '';
                    that.subInfo.contractEndDate = '';
                    this.$alert('合同有效期起始时间不能大于合同有效期终止时间');
                    return false;
                }
                if (that.formateContractCreateDate === that.formateContractEndDate) {
                    that.subInfo.contractCreateDate = '';
                    that.subInfo.contractEndDate = '';
                    this.$alert('合同有效期起始时间不能等于合同有效期终止时间');
                    return false;
                }
                //时间处理判断
                this.saveTime();
                if(this.saveTime()===false){
                    return
                }
//                let token = window.localStorage.getItem('token');
                this.isClick = true
                //供应商时间二次赋值
                this.supplierTime();
                //供应商提交
                this.supplierSave();

            },
            //供应商提交前时间处理
            saveTime(){
                // 结算方式数字验证
                const integer3 = /^\d{0,256}$/
                let that = this;
                let contractCreateDateTest = new Date().getTime();
                let contractEndDateTest = new Date(that.subInfo.contractEndDate).getTime();
                let betweenDate =contractEndDateTest - contractCreateDateTest;
                if(betweenDate<0){
                    this.$alert('合同有效期终止时间不能小于当前时间');
                    return false;
                }
                if (!integer3.test(Number(that.subInfo.remittanced))) {
                    this.$alert('回款数字必须为整数!');
                    return false;
                }
            },
            //供应商启用状态 回款结算方式
            supplierSaveStatue(){
                let that = this
                //供应商启用状态
                if((!that.subInfo.accountStatus)){
                    this.$alert('供应商状态不能为空');
                    return false;
                }
                //供应商回款结算天数非空判别
                if (that.subInfo.remittanceType == 1 && !that.subInfo.remittanced) {
                    this.$alert('回款结算天数不能为空');
                    return false;
                }
                //供应商回款结算天数非空判别
                if (that.subInfo.remittanceType == 2 && !that.subInfo.remittanced) {
                    this.$alert('回款结算天数不能为空');
                    return false;
                }
                //银行卡号验证
                let bankNum = /^\d{1,30}$/
                if(!bankNum.test(that.subInfo.bankNum)){
                    this.$alert('您输入的银行卡号有误!请重新输入')
                    this.subInfo.bankNum = ''
                    return false
                }
            },
            //供应商提交
            supplierSave(){
                let that = this;
                let subObj = new Object();
                for (let key in this.subInfo) {
                    let name = key;
                    let value = this.subInfo[key];
                    subObj[name] = this.subInfo[key];
                }
               api.submitSupplierInfo(subObj)
                    .then(
                    (response) => {
                        if (response.data.code == 1) {
                            that.save_model = !that.save_model;
                        }
                        else {
                            that.$alert(response.data.message);
                        }
                    }
                )
            },
            //三级联动
            supplierCity(){
                let that = this;
                let subProv0 = '', subCity0 = '', subArea0 = '', subProv = '', subCity = '', subArea = ''
                that.provinces0.forEach(function (ele) {
                    if (ele.srId == that.selectedSignPro0) {
                        subProv0 = ele.name
                    }
                })
                // 基本信息注册地址省市区
                that.cities0.forEach(function (ele) {
                    if (ele.srId == that.selectedSignCity0) {
                        subCity0 = ele.name
                    }
                })
                that.countres0.forEach(function (ele) {
                    if (ele.srId == that.selectedSignArea0) {
                        subArea0 = ele.name
                    }
                })
                //合同注册地址省市区
                that.provinces.forEach(function (ele) {
                    if (ele.srId == that.selectedSignPro) {
                        subProv = ele.name
                    }
                })
                that.countres.forEach(function (ele) {
                    if (ele.srId == that.selectedSignArea) {
                        subArea = ele.name
                    }
                })
            },
            //回款方式
            moneyMethod(){
                let that = this;
                if (that.subInfo.remittanceType == 1) {
                    that.subInfo.remittanced = that.remittancedOne;
                }
                if (that.subInfo.remittanceType == 2) {
                    that.subInfo.remittanced = that.remittancedTwo;
                }
            },
            //供应商时间二次赋值
            supplierTime(){
                if (this.subInfo) {
                    if (this.subInfo.licenseTimeCreate) {
                        this.subInfo.licenseTimeCreate = this.formateLicenseTimeCreate;
                    }
                    if (this.subInfo.licenseTimeEnd) {
                        this.subInfo.licenseTimeEnd = this.formateLicenseTimeEnd;
                    }
                    if (this.subInfo.contractCreateDate) {
                        this.subInfo.contractCreateDate = this.formateContractCreateDate;
                    }
                    if (this.subInfo.contractEndDate) {
                        this.subInfo.contractEndDate = this.formateContractEndDate;
                    }
                }
            },
            //获取行业类别
            selectHangYe: function () {
                let that = this
                api.getIndustry().then(function (res) {
                    that.industries = res.data
                })
            },
            //获取银行类别
            selectBank: function () {
                let that = this
                api.getBanks().then(function (res) {
                    that.banks = res.data
                })
            },
            //获取省份信息(调试)
            getProvince0: function () {
                let that = this
                api.getAreaList({'pid': 0}).then((response) => {
                    that.provinces0 = response.data
                })
            },
            //获取基础信息城市列表。调试
            getCity0: function () {
                if (!this.subInfo.registAddressProvince) {
                    return
                }
                this.subInfo.registAddressCity = ''
                this.subInfo.registAddressDistrict = ''
                api.getAreaList({'pid': this.subInfo.registAddressProvince}).then((response) => {
                    this.cities0 = response.data
                })
            },
            //获取基础信息区列表。
            getArea0: function () {
                if (!this.subInfo.registAddressCity) {
                    return
                }
                let that = this
                api.getAreaList({'pid': this.subInfo.registAddressCity}).then((response) => {
                    that.subInfo.registAddressDistrict = ''
                    that.countres0 = response.data
                })
            },
            //获取省份信息
            getProvince: function () {
                let that = this
                api.getAreaList({'pid': 0}).then((response) => {
                    that.provinces = response.data
                })
            },
        },
        components:{
            breadCrumb
        }
    }
</script>


