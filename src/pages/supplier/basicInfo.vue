<template>
    <div>
        <div v-show="isAdmin==1" class="crumbs">
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
        <div v-show="isAdmin==0" class="crumbs">
            <!--账号管理--基本信息-->
            <breadCrumb :navigationList="breadListTwo"></breadCrumb>
        </div>
        <div class="well clearPadding basicInfo_nav" style="margin-bottom:50px;">
            <div class="row basicinfo_Margin">
                <div class="col-xs-2" style="margin-left: 30px;">
                    <p class="clearMargin" v-bind:class="{basicinfo_message:true,basicinfo_message_cartoon:one}">
                        <el-button type="text" style="font-size: 18px"  @click="basicinfo_see()" v-has:aptitudeAudit_auditHeader1>基础信息</el-button>
                    </p>
                </div>
                <div class="col-xs-2 ">
                    <p class="clearMargin" v-bind:class="{basicinfo_message:true,basicinfo_message_cartoon:two}">
                        <el-button type="text" style="font-size: 18px"   @click="bascicfi_unsee()" v-has:aptitudeAudit_auditHeader2>合同信息</el-button>

                    </p>
                </div>
                <div class="col-xs-2 ">
                    <p class="clearMargin" v-bind:class="{basicinfo_message:true,basicinfo_message_cartoon:three}">
                        <el-button type="text" style="font-size: 18px"    @click="bascicfi_aptitude()" v-has:aptitudeAudit_auditHeader3 > 资质信息</el-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="row basicinfo_information clearMargin basicMargin" v-show="one" >
            <div class="col-xs-6">
                <div class="form-horizontal ">
                    <div class="form-group">
                        <span class="col-xs-3 control-label">供应商名称:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.providerName"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="col-xs-3 control-label">法人手机号:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.responsiblePhone"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-horizontal">
                    <div class="form-group">
                        <span class="col-xs-3 control-label">法人代表:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.responsible"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="col-xs-3 control-label">注册地址:</span>
                        <div class="col-xs-2">
                            <el-select v-model="userInfo.registAddressProvince" disabled>
                                <div style="height:30px;overflow:auto;">
                                    <el-option
                                        :value="userInfo.registAddressProvince"
                                        :label="userInfo.registAddressProvince">
                                    </el-option>
                                </div>
                            </el-select>
                        </div>
                        <div class="col-xs-2">
                            <el-select v-model="userInfo.registAddressCity" disabled>
                                <div style="height:30px;overflow:auto;">
                                    <el-option
                                        :value="userInfo.registAddressCity"
                                        :label="userInfo.registAddressCity">
                                    </el-option>
                                </div>
                            </el-select>
                        </div>
                        <div class="col-xs-2">
                            <el-select v-model="userInfo.registAddressDistrict" disabled>
                                <div style="height:30px;overflow:auto;">
                                    <el-option
                                        :value="userInfo.registAddressDistrict"
                                        :label="userInfo.registAddressDistrict">
                                    </el-option>
                                </div>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-5 col-xs-offset-3">
                            <el-input disabled v-model="userInfo.registerAddressDetail" type="text"></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row basicinfo_information clearMargin basicMargin" v-show="two">
            <div class="col-xs-6">
                <div class="form-horizontal">
                    <div class="form-group">
                        <span class="col-xs-3 control-label">开户行类型:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.bankName"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="col-xs-3 control-label">开户行账号:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.bankNum"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="col-xs-3 control-label">开户人姓名:</span>
                        <div class="col-xs-5">
                            <el-input type="text" disabled v-model="userInfo.bankUserName"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-horizontal">
                    <div class="form-group">
                        <span class="col-lg-3 control-label">合同有效期:</span>
                        <div class="col-lg-4">
                            <el-input type="text" disabled v-model="userInfo.contractCreateDate"></el-input>
                        </div>
                        <span class="col-xs-1 control-label basicInfo_margin">至</span>
                        <div class="col-lg-4">
                            <el-input disabled type="text" v-model="userInfo.contractEndDate"></el-input>
                        </div>
                    </div>
                    <div class="form-group" v-show="userInfo.contractStatus==1||userInfo.contractStatus==2">
                        <div class="col-lg-4 col-lg-offset-3 basic_upcomePast" v-show="userInfo.contractStatus==1">合同即将过期</div>
                        <div class="col-lg-4 col-lg-offset-3 basic_past" v-show="userInfo.contractStatus==2">合同已过期</div>
                    </div>
                    <div class="form-group">
                        <span class="col-lg-3 control-label">合同附件:</span>
                        <div class="col-lg-3">
                            <el-button type="success" @click="exportFile()" id="basicInfo_color" v-has:aptitudeAuditHeader2Download>下载附件</el-button>
                        </div>
                        <div class="col-lg-3">
                            <el-button type="success" @click="lookFile()" id="basicInfo_colorTwo" v-has:aptitudeAuditHeader2Look>查看附件</el-button>
                        </div>
                    </div>
                    <div class="form-group">
                        <span class="col-lg-3 control-label">回款结算方式:</span>
                        <div class="col-lg-9" style="margin-bottom:20px;">
                            <div>
                                <input name="balance" type="radio" id="month" v-show="userInfo.remittanceType == 1"
                                       :checked="userInfo.remittanceType == 1" disabled>
                                <input type="radio" disabled v-show="userInfo.remittanceType == 2" disabled>
                                <span for="month">自然月（按照合同账期结算）</span>
                            </div>
                            <input type="radio" disabled v-show="userInfo.remittanceType == 1" disabled>
                            <input name="balance" type="radio" id="fixed" v-show="userInfo.remittanceType == 2"
                                   :checked="userInfo.remittanceType == 2" disabled>
                            <span for="fixed">固定时间</span>
                            <div class="basicInfo_selectStyle clearFix" v-show="userInfo.remittanceType == 1">
                                <span>设置每月</span>
                                <i class="form-control basicInfo_i fl" disabled><span style="margin-left:-20px;">{{userInfo.remittanced}}</span></i>
                                <span>号为结账时间</span>
                            </div>
                            <div class="basicInfo_selectStyle" v-show="userInfo.remittanceType == 2">
                                <div>
                                    结账时间
                                    <span class="form-control basicInfo_spanTwo " disabled>{{userInfo.remittanced}}</span>天为一个周期
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="col-xs-2 control-label" style="margin-left:8%">是否启用:</span>
                        <div class="col-xs-2" style="margin-top:13px">
                            <input  type="radio" name="supplierStart" v-model="userInfo.accountStatus" :value="1"   disabled>启用
                        </div>
                        <div class="col-xs-2"   style="margin-top:13px">
                            <input  type="radio" name="supplierStart" v-model="userInfo.accountStatus" :value="2"   disabled>禁用
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="three" class="basicInfo_pic">
            <div class="row basicinfo_Margin">
                <!--开户银行许可证-->
                <div class="col-xs-5" >
                    <label class="col-xs-7 control-label" style="position:relative;left:-10%"><img src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.5%" >
                    <el-upload
                        :disabled="true"
                        action=""
                        accept=".jpg,png,gif"
                        list-type="picture-card"
                        :file-list="fileListFive"
                        :on-preview="testBank">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleFive" size="tiny">
                        <img width="100%" :src="dialogImageUrlFive" alt="">
                    </el-dialog>
                </div>
                <!--营业执照-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="position: absolute;left:-1%"><img src="../../../static/img/20170801162143.png">营业执照:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListTwo"
                        :on-preview="testBusiness">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleTwo" size="tiny">
                        <img width="100%" :src="dialogImageUrlTwo" alt="">
                    </el-dialog>
                </div>
            </div>
            <div class="row basicinfo_Margin" >
                <!--授权报告-->
                <div v-show="fileListThree.length>0" >
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-3%">授权报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :on-preview="testAccredit"
                        >
                        </el-upload>
                        <el-dialog v-model="dialogVisibleThree" size="tiny">
                            <img width="100%" :src="dialogImageUrlThree" alt="">
                        </el-dialog>
                    </div>
                </div>
                <!--质检报告-->
                <div v-show="fileListPic.length>0">
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-1%;">质检报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.5%">
                        <el-upload
                            :disabled="true"
                            action=""
                            accept=".jpg,png,gif"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :on-preview="testPic">
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
            </div>
            <div class="row basicinfo_Margin" v-show="fileListFour.length>0">
                <!--食品流通许可证-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="left:-10%;">食品流通许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListFour"
                        :on-preview="testFood">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleFour" size="tiny">
                        <img width="100%" :src="dialogImageFour" alt="">
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="row basicinfo_Margin" v-show="three">
            <div class="col-xs-3 col-xs-offset-5 basicinfo_button">
                <el-button type="primary" @click="noPass" v-has:aptitudeAudit_audit_refused>拒绝</el-button>
                <el-button type="primary" @click="pass" v-has:aptitudeAudit_audit_pass style="margin-left:25px;">通过</el-button>
            </div>
        </div>
        <!--模态框审核-->
        <el-dialog
            v-model="dialogVisibleModel"
            :close-on-click-modal="false"
            style="width:90%">
            <div v-show="auditPass">
                <p class="basicinfo_auditPass">是否通过审核</p>
            </div>
            <textarea class="form-control" rows="3" v-show="textShow" placeholder="审核不通过，需要输入拒绝理由,纯文本,200字符内"
                      v-model="commodityText" maxlength="200" style="margin-top:9px"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" size="large" @click="cancel(2)" v-show="auditPass==true">取消</el-button>
                <el-button type="success" @click="commit(2)" size="large" v-show="auditPass==true">提交</el-button>
                <el-button type="warning" size="large" @click="cancel(1)" v-show="auditPass==false">取消</el-button>
                <el-button type="success" @click="commit(1)" size="large" v-show="auditPass==false">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import api from '../../api/account';
    import breadCrumb from '../../components/Breadcrumb';
    import '../../../static/css/basicInfo.css';
    export default {
        data() {
            return {
                //面包屑导航
                breadList:[
                    {name:' 供应商管理'},
                    {name:'资质审核',route:{path:'/aptitudeAudit'}},
                    {name:'供应商详情'}
                ],
                breadListTwo:[
                    {name:' 账号管理'},
                    {name:'基本信息'}
                ],
                baseUrl:'',     //用于接收下载文件的URL
                msg: '供应商入驻信息',
                auditPass:false,   //控制审核样式字段
                token: {},
                supplierStatus:'',  //供应商状态
                accountId: {},
                userInfo: {},
                one: true,
                two: false,
                contractOriginal: {},  //合同云端地址
                supplier:{},
                isAdmin: '',
                three:false,        //控制资质审核样式
                dialogVisible:false,
                dialogVisibleModel:false,   //控制模态框
                commodityText:'',        //不通过理由
                textShow:false,             //控制文本的显示
                dialogImageUrl:'',
                supplierListAll:[],      //保存供应商片段
                fileListTwo:[],
                fileListThree:[],
                fileListFour:[],
                fileListFive:[],
                fileListPic: [],
                dialogImageFour:'',
                dialogImageUrl:'',
                dialogImageUrlThree:'',
                dialogImageUrlTwo:'',
                dialogImageUrlFive:'',
                dialogVisibleFive:false,
                dialogVisibleTwo:false,
                dialogVisibleThree:false,
                dialogVisible:false,
                dialogVisibleFour:false
            }
        },
        created: function () {
            this.baseUrl =this.$globalData.baseUrl;
//            this.token = window.localStorage.getItem('token')//获取token
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.accountId = this.$route.query.accountId //获取供应商的id
            this.supplierStatus = this.$route.query.supplierStatus //获取供应商的状态
            this.getBasicInfo(); //获取供应商信息
            //获取供应商资质信息
            this.getSupplierAptitudeStatus()
//            this.isAdmin = JSON.parse(localStorage.getItem("account")).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            //标签页切换
            this.toggleStatus()
        },
        methods: {
            //标签页切换
            toggleStatus(){
                if(this.supplierStatus==1){
                    this.three = true
                    this.two = false
                    this.one = false
                }
            },
            //状态切换
            supplierStart(type){
                if(type==1){
                    this.userInfo.status = type
                }else if(type==0){
                    this.userInfo.status = type
                }
            },

            //获取供应商资质信息
            getSupplierAptitudeStatus(){
                let that = this
                api.getSupplierAptitudeStatus(this.accountId)
                    .then(function(res){
                        if(res.data.code==1){
                            that.supplierList = res.data.data[0]
                            that.supplierListAll = res.data.data
                            for(let key in that.supplierListAll){
                                if(that.supplierListAll[key].qualificationType==1){
                                    that.fileListFive.push(that.supplierListAll[key])
                                }
                                if(that.supplierListAll[key].qualificationType==2){
                                    that.fileListTwo.push(that.supplierListAll[key])
                                }
                                if(that.supplierListAll[key].qualificationType==3){
                                    that.fileListThree.push(that.supplierListAll[key])
                                }
                                if(that.supplierListAll[key].qualificationType==4){
                                    that.fileListPic.push(that.supplierListAll[key])
                                }
                                if(that.supplierListAll[key].qualificationType==5){
                                    that.fileListFour.push(that.supplierListAll[key])
                                }
                            }
                        }else{
                            that.$alert(res.data.message)
                        }
                    })
            },
            //合同查看
            lookFile(){
                window.open(this.contractOriginal,'newwindow', 'height=800, width=1000,top=200,left=400,resizable=yes');
            },
            //合同下载
            exportFile() {
                let contractOriginal = this.contractOriginal
                let contractOriginalName =  encodeURI(this.userInfo.contractName);
                window.location.href = this.baseUrl+'/account/downloadContract?downloadUrl=' + contractOriginal + '&realFileName=' + contractOriginalName
                    + '&token=' + this.token
            },
            //获取供应商信息
           getBasicInfo() {
                let token = this.token
               api.getBasicInfo(this.accountId)
               .then(
                    (response) => {
                        this.userInfo = response.data
                        this.contractOriginal = response.data.contractOriginal
                    }
                )
            },
            //基础信息切换
            basicinfo_see() {
                this.one = true
                this.two = false
                this.three = false
            },
            //合同信息切换
            bascicfi_unsee() {
                this.one = false
                this.two = true
                this.three = false
            },
            //资质信息切换
            bascicfi_aptitude(){
                this.one = false
                this.two = false
                this.three = true
            },
            //质检报告详情
            testPic(file,fileListPic) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;

            },
            //营业执照详情
            testBusiness(file,fileListTwo) {
                this.dialogImageUrlTwo  = file.url;
                this.dialogVisibleTwo   = true;
            },
            //授权报告详情
            testAccredit(file,fileListThree) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            //食品流通许可证查看详情
            testFood(file,fileListFour) {
               this.dialogImageFour = file.url;
               this.dialogVisibleFour  = true;

            },
            //开户银行查看详情
            testBank(file,fileListFive) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive  = true;
            },
            //取消视图
             pass(){
                this.commodityText = ''
                this.dialogVisibleModel = true
                this.textShow = false
                this.auditPass = true
            },
            //取消视图
            noPass(){
                this.dialogVisibleModel = true
                this.textShow = true
                this.auditPass = false
            },
            //审核提交
            commit(type){
                if(type==1){
                    //提交审核
                    if(!this.commodityText){
                        this.$alert('审核原因不能为空');
                        return;
                    }
                    return;
                    this.getAudit(1)
                }else if(type==2){
                    //提交审核
                    this.getAudit(2)
                }
            },
            //审核取消
            cancel(type){
                if(type==1){
                    this.dialogVisibleModel = false;
                    this.getBasicInfo();
                }else if(type==2){
                    this.dialogVisibleModel = false;
                    this.getBasicInfo();
                }
            },
            //提交审核接口
            getAudit(type){
                let that = this
                if(type==1){
                    let obj = {
                            accountId:this.accountId,
                            qualificationStatus:3,
                            reason:this.commodityText
                    }
                    api.postAptitude(obj)
                        .then(function(res){
                        if(res.data.code==1){
                            that.$alert(res.data.message)
                            that.$router.push({path:'/aptitudeAudit'})
                        }else{
                            that.$alert(res.data.message)
                        }
                    })
                }
                else if(type==2){
                        let obj = {
                            accountId:this.accountId,
                            qualificationStatus:2,
                        }
                        api.postAptitude(obj)
                        .then(function(res){
                        if(res.data.code==1){
                            that.$alert(res.data.message)
                            that.$router.push({path:'/aptitudeAudit'})
                        }else{
                            that.$alert(res.data.message)
                        }
                    })
                }
            }
        },
        components:{
            breadCrumb
        }
    }
</script>

