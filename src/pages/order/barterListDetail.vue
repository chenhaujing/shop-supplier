<template>
    <div class="barterListDetail_Content">
        <!--面包屑导航-->
        <div>
            <breadCrumb :navigationList="barterListDetail"></breadCrumb>
        </div>
        <div v-show="barterList.status===0||barterList.status===5||barterList.status===6" class="barDetail_goods">该物品已发货</div>
        <!--换货商品信息-->
        <orderDetailsTable :orderDetails="detailsData" :orderNum="orderId" :barterReturnNum="returnNumber"
                           :consignee="orderReceiverName"></orderDetailsTable>
        <!--运费金额、寄回单号、换货原因、问题描述、图片展示、按钮组-->
        <detailContent
            :orderPostage="orderPostage"
            :totalPrice="totalPrice"
            :barterList="barterDetailList"
            :imagesList="imagesList"
            :showIdentity="showIdentity"
            @openModel="openModel"
            @lookLogistics="lookLogistics(1)"
            @sendLogistics="sendLogistics"
            @goBack="goBack"
            @refuseReceiving="refuseReceiving"
            @refuseReceivingLook="refuseReceivingLook"
            @checkPass="checkPass">
        </detailContent>
        <!--拒绝换货弹出的模态框-->
        <el-dialog v-model="reasonShow">
            <el-input  type="textarea" autosize v-model="barterDeatailReason" :disabled="reasonShow"></el-input>
        </el-dialog>
        <!--审核不通过模态框-->
        <el-dialog
            title="拒绝原因"
            v-model="dialogVisible"
            :close-on-click-modal="false">
            <el-input  type="textarea" autosize placeholder="审核不通过，需要输入拒绝理由,纯文本,200字符内"
                       :maxlength="200" style="margin-top:13px"  v-model="refuseReason"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" size="large" @click="abolish(1)">取消</el-button>
                <el-button type="success"  size="large" @click="auditPass(1,3)">确认</el-button>
            </div>
        </el-dialog>
        <!--审核通过模态框-->
        <el-dialog
            title="是否通过审核"
            v-model="dialogVisiblePass"
            :close-on-click-modal="false">
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" size="large" @click="abolish(2)">取消</el-button>
                <el-button type="success" size="large" v-has:barListDetailPass_save @click="auditPass(2,2)">确认</el-button>
            </div>
        </el-dialog>
        <!-- 查看物流模态框-->
        <el-dialog  v-model="seeLogicsVisible" size="tiny">
            <!--无数据-->
            <div v-show="barterList.returnLogisticsMethod===0">
                <p class="barterListDeatail_Data">暂无数据</p>
            </div>
            <!--自配送信息-->
            <div v-show="barterList.returnLogisticsMethod===1">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人姓名</label>
                        </div>
                        <div class="col-sm-9">
                            <el-input type="text"  disabled v-model="barterList.returnDistributorName"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人电话</label>
                        </div>
                        <div class="col-sm-9">
                            <el-input type="text"  disabled v-model="barterList.returnDistributorMobile"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <!--其他配送信息-->
            <div v-show="barterList.returnLogisticsMethod===2" class="orderList-trackInfo">
                <div class="navbar-form row" role="search">
                    <!-- 物流信息表单 -->
                    <el-table :data="logisticsData" stripe style="width:100%"  max-height="500">
                        <el-table-column prop="ftime" label="时间"></el-table-column>
                        <el-table-column prop="context" label="地点和跟踪进度"></el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>
        <!--寄出物流模态框-->
        <el-dialog  v-model="sendLogicsVisible" size="tiny">
            <!--自配送信息-->
            <div v-show="barterList.logisticsMethod===1">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人姓名</label>
                        </div>
                        <div class="col-sm-9">
                            <el-input type="text"  disabled v-model="barterList.distributorName"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <div style="height:7px">
                            <label class="col-sm-3 control-label">配送人电话</label>
                        </div>
                        <div class="col-sm-9">
                            <el-input type="text"  disabled v-model="barterList.distributorMobile"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <!--其他配送信息-->
            <div v-show="barterList.logisticsMethod===2" class="orderList-trackInfo">
                <div class="navbar-form row" role="search">
                    <template>
                        <!-- 物流信息表单 -->
                        <el-table :data="logisticsDataSend" stripe style="width:100%"  max-height="500" >
                            <el-table-column prop="ftime" label="时间"></el-table-column>
                            <el-table-column prop="context" label="地点和跟踪进度"></el-table-column>
                        </el-table>
                    </template>

                </div>
            </div>
        </el-dialog>
        <!-- 修改物流信息-->
        <el-dialog   class="myModal" v-model="updateLogicsVisible">
            <!-- 选择发货方式 -->
            <el-form :model="forms" v-show="logisticsWay">
                <template>
                    <el-tabs    v-model="activeName">
                        <!-- 自配送 -->
                        <el-tab-pane label="自配送" name="selfSend" style="height:200px">
                            <el-form-item label="配送人姓名" :label-width="formsLabelWidth" class="col-xs-12">
                                <el-input  auto-complete="off" class="col-xs-6"
                                           placeholder="请输入姓名"  v-model="forms.senderName"></el-input>
                            </el-form-item>
                            <el-form-item label="配送人手机号" :label-width="formsLabelWidth" class="col-xs-12">
                                <el-input  auto-complete="off"
                                           class="col-xs-6" placeholder="请输入配送人手机号" v-model="forms.senderNumber" :maxlength="11"></el-input>
                            </el-form-item>
                            <el-button style="margin-left: 50%" @click="affirmCargo(1)" v-show="logisticsWay">确认发货</el-button>
                        </el-tab-pane>
                        <!-- 物流配送 -->
                        <el-tab-pane label="物流配送" name="logisticsCompany" style="height:200px">
                            <div class="barterListDetail">
                                <el-form-item label="物流公司" :label-width="formsLabelWidth" class="col-xs-12">
                                    <el-select  placeholder="请选择物流公司" class="col-xs-6"  v-model="forms.logistics">
                                        <el-option v-for="(firm,index) in logisticsFirm"
                                                   :key="index"
                                                   :label="firm.name"
                                                   :value="firm.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="物流单号" :label-width="formsLabelWidth" class="col-xs-12">
                                    <el-input  auto-complete="off"
                                               class="col-xs-6" placeholder="请输入物流单号"   v-model="forms.logisticsNumber"></el-input>
                                </el-form-item>
                            </div>
                            <el-button style="margin-left: 50%" @click="affirmCargo(2)" v-show="logisticsWay">确认发货</el-button>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    import api from '../../api/returnAndExchange';
    import rae from '../../api/logistics'
    import breadCrumb from '../../components/Breadcrumb';
    import detailContent from '../../components/order/detailContent.vue'
    import barterListDetailMethod from '../../utils/barterListDetail.js'
    import '../../../static/css/barterListDetail.less';
    import  filter from '../../utils/filter'
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import orderDetailsTable from '../../components/order/orderDetailsTable.vue';
    export default {
        created(){
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.detailsId = this.$route.query.detailsId;
            this.getReturnDetails(); //根据ID获取订单详情
            this.showIdentity = this.$route.query.source;    //用来区分各个路由模块的识别
            this.recordId===''?this.recordId=this.$route.query.recordId:this.recordId==='';
        },
        data(){
            return{
                recordId:'',        //记录ID 从账户明细传来的数据
                isAdmin:'',
                logisticsFirm:[
                ],
                detailsId:'',       //订单ID  用于接收路由跳转的ID
                //table数组 用于接收后端返回来的数据
                barterDetailList:{},
                showIdentity: '',   //判别供应商 管理员状态
                barterList:[],      //根据Id用于接收后端返回的数据
                detailsData:[],
                orderId:null,
                returnNumber:null,
                orderReceiverName:null,
                imagesList: [],
                forms: {
                    senderName: '', //配送人姓名
                    logistics: '', //物流公司
                    senderNumber: '', //配送人电话
                    logisticsNumber: '' //物流单号

                },
                dialogVisible:false,//拒绝收货模态框
                dialogVisiblePass:false, //审核通过模态框
                seeLogicsVisible:false,  //物流配送模态框显示
                sendLogicsVisible:false,    //寄出物流模态框显示
                updateLogicsVisible:false,   //修改物流信息模态框
                logisticsWay:true,          //控制物流选择方式显隐藏
                reallyShipments:false,                            //确认发货显隐藏
                reallyText:false,           //确认发货字段显隐藏
                formsLabelWidth: '120px',    //宽度
                // 修改单号，复用确认发货第二步，这个用来隐藏其他的按钮；
                isRevise: true,
                // 跟踪物流信息(寄回)
                logisticsData: [

                ],
                // 跟踪物流信息(寄处)
                logisticsDataSend: [

                ],
                activeName:'selfSend',  //物流选择方式默认指向
                reasonShow:false,          //拒绝换货模态框
                barterDeatailReason:'',     //拒绝换货原因
                refuseReason:'',        //审核不通过原因
            }
        },
        methods:{
            //确认换货模态框打开
            openModel(){
                this.updateLogicsVisible= true;
                //发送请求 获取物流公司参数
                this.getLogisticsCompany();
            },
            //发送请求 获得页面内容
            getReturnDetails(){
                api.getReturnDetails(this.detailsId).then(res => {
                    this.barterDetailList = this.barterList = res.data.data;
                    //获取数据  重新处理
                    let data = res.data.data;
                    this.forms.logisticsNumber = data.LogisticsNumber
                    this.orderReceiverName = data.orderReceiverName;
                    this.returnNumber = data.returnNumber;
                    this.orderId = data.orderId;
                    this.imagesList = this.barterList.imagesList;   //图片展示内容
                    //table内容赋值 渲染页面
                    barterListDetailMethod.tableContext(this.barterList,this.detailsData)
                });
            },
            //返回上一级
            goBack(){
                /*
             *修改flag标记为true,在第一个从vuex里面获取搜索条件，搜索一次，重置为false,然后清空vuex条件；
             */
                this.$store.dispatch('setFlag', true);
                switch(this.showIdentity){
                        case 'barterList':
                            this.$router.push('/barterList');
                            break;
                        case 'adminBarterList':
                            this.$router.push('/adminBarterList');
                            break;
                            //跳转（财务计算--结算明细）
                        case 'financialManageDetails':
                            this.$router.push('/financialManageDetails');
                            break;
                            //跳转（账户结算--结算明细）
                        case 'incomeDetailList':
                            this.$router.push('/incomeDetailList');
                            break;
                            //跳转（账户已收入）
                        case 'settlementListDetail':
                            this.$router.push('/settlementListDetail');
                            break;
                            //跳转(账户待收入)
                        case 'unSettlementListDetail':
                            this.$router.push('/unSettlementListDetail');
                            break;
                }
            },
            //拒绝换货模态框
            refuseReceiving(){
                this.dialogVisible = true;
                //输入拒绝原因  发送请求
            },
            //拒绝换货取消
            abolish(type){
                //1:拒绝换货取消  2：审核通过取消
                if(type==1){
                    this.dialogVisible = false; //关闭模态框
                    this.refuseReason = '';     //清空内容
                }else{
                    this.dialogVisiblePass = false;
                }

            },
            //拒绝换货确认
            //1:拒绝收货确认   2：审核通过确认
            auditPass(type,id){
                if(type==1){
                    if(!this.refuseReason){
                        this.$alert('审核原因不能为空');
                        return;
                    }
                    //模态框消失，按钮禁用
                    this.dialogVisible = false;
                    //调用审核接口
                    let obj = {
                        detailsId:this.barterList.detailsId,
                        status:id,
                        refuseReason:this.refuseReason,
                        storeId:this.barterList.storeId
                    }
                    api.shopperCheck(obj)
                        .then((res=>{
                            if(res.data.code===1){
                                this.$alert(res.data.message);
                                this.getReturnDetails();
                            }else{
                                this.$alert(res.data.message);
                            }
                        }))

                }else if(type==2){
                    this.dialogVisiblePass = false;
                    //调用审核接口
                    let obj = {
                        detailsId:this.barterList.detailsId,
                        status:id,
                        storeId:this.barterList.storeId
                    }
                    api.shopperCheck(obj)
                        .then((res)=>{
                            if(res.data.code===1){
                                this.$alert(res.data.message);
                                this.getReturnDetails();
                            }else{
                                this.$alert(res.data.message);
                            }
                        })
                }
            },
            //审核通过
            checkPass(){
                this.dialogVisiblePass = true;
            },
            //查看物流
            lookLogistics(type){
                //1 :查看物流 2：物流查看信息(确认送达)
                if(type==1){
                    this.seeLogicsVisible = true ;  //打开物流模态框
                    //如果寄回方式0为无数据
                    if(this.barterList.returnLogisticsMethod===0){

                    }
                    //如果寄回方式2为物流配送 发送请求
                    if(this.barterList.returnLogisticsMethod===2){
                        this.logistics(this.barterList.returnLogisticsNumber,1);
                    }
                }else{
                    this.seeLogicsVisible = false ;  //关闭物流模态框
                }
            },
            //查看寄出物流信息具体内容
            logistics(obj,type){
                rae.trackLogistics(obj)
                    .then((res)=>{
                        type===1?this.logisticsData = res.data.data.data:this.logisticsDataSend = res.data.data.data;
                    })
            },
            //寄出物流
            sendLogistics(){
                this.sendLogicsVisible = true;
                //如果基础方式为物流配送 发送请求
                if(this.barterList.logisticsMethod===2){
                    this.logistics(this.barterList.logisticsNumber,2);
                }
            },
            handleClick(){
            },
            //确认发货   1:自由配送确认发货  2:物流公司确认发货
            affirmCargo(type){

                if(type==1){
                    //对配送人姓名和电话进行非空判断
                    if(!this.forms.senderName||!this.forms.senderNumber){
                        this.$alert('配送人姓名或配送人电话不能为空');
                        return;
                    }
                    let testPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                    if(!testPhone.test(this.forms.senderNumber)){
                        this.$alert('请输入正确的电话号码');
                        return
                    }
                    //创建对象  发送请求
                    let obj = {
                        detailsId: this.barterList.detailsId,
                        logisticsShipMethod:1,
                        distributorName:this.forms.senderName,
                        distributorMobile:this.forms.senderNumber
                    }
                    //发送请求，获取审核结果
                    this.getCheckResult(obj);
                    //关闭当前模态框
                    this.updateLogicsVisible = false;
                }else{
                    if(!this.forms.logistics){
                        this.$alert('物流公司不能为空');
                        return;
                    }
                    let obj = {
                        detailsId: this.barterList.detailsId,
                        logisticsShipMethod:2,
                        logisticsShipmentNumber:this.forms.logisticsNumber,
                        logisticsCompany:this.forms.logistics
                    }
                    //发送请求，获取审核结果
                    this.getCheckResult(obj);
                    //关闭当前模态框
                    this.updateLogicsVisible = false;
                }

            },
            //获取物流公司
            getLogisticsCompany(){
                api.getLogisticsName()
                    .then((res)=>{
                            this.logisticsFirm=res.data;
                    })

            },
            //审核结果请求
            getCheckResult(obj){
                api.logistics(obj)
                    .then((res)=>{
                        this.$alert(res.data.message);
                        this.getReturnDetails();
                    })
            },
            //成功发货后返回
            barterReturn(){
                this.updateLogicsVisible = false;   //关闭当前模态框
                this.reallyShipments = true;        //禁用按钮
                this.reallyText = true;             //显示发货文字
            },
            //拒绝换货查看原因
            refuseReceivingLook(){
                this.reasonShow = true;      //将模态框显示，查看拒绝原因
                this.barterDeatailReason =this.barterList.refuseReason  //原因渲染页面
            }
        },
        components:{
            breadCrumb,orderDetailsTable,detailContent
        },
        computed:{
            //面包屑导航(管理员)
            barterListDetail(){
               switch(this.showIdentity){
                   //管理员
                   case 'adminBarterList':
                       return[
                           {name:' 订单管理'},
                           {name:'换货列表',route:'/adminBarterList'},
                           {name:'换货详情'}
                       ];
                   break;
                   //供应商
                   case 'barterList':
                       return[
                           {name:' 订单管理'},
                           {name:'换货列表',route:'/barterList'},
                           {name:'换货详情'}];
                   break;
                   case 'incomeDetailList':
                       return[
                           {name:' 账户管理'},
                           {name:'收入明细列表',route:'/incomeDetailList'},
                           {name:'换货详情'}
                       ];
                   break;
                   case 'unSettlementListDetail':
                       return[
                           {name:' 账号管理'},
                           {name:'待结算列表',route:'/unSettlementList'},
                           {name:'账单明细',route:{path:'/unSettlementListDetail',query:{'recordId':this.recordId}}},
                           {name:'换货详情'}
                       ];
                   break;
                   case 'financialManageDetails':
                       return[
                           {name:' 财务管理'},
                           {name:'供应商结算明细列表',route:'/financialManageList'},
                           {name:'账单明细',route:{path:'/financialManageDetails',query:{'recordId':this.recordId}}},
                           {name:'换货详情'}
                       ];
                   break;
                   case 'settlementListDetail':
                       return[
                           {name:' 账号管理'},
                           {name:'已结算列表',route:'/settlementList'},
                           {name:'账单明细',route:'/settlementListDetail'},
                           {name:'换货详情'}
                       ];
                   break;
               }
            },
            //运费金额转化
            orderPostage(){
                return  filter.formatMoney(this.barterList.orderPostage);
            },
            //实付金额转化
            totalPrice(){
                return filter.formatMoney(this.barterList.totalPrice);
            }
        },

    }
</script>
