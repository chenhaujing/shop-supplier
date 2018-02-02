<template>
    <div class="supplierInfoList_wrap">
        <div class="crumbs">
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
            <div class="row clearMargin supplierInfoList_navWrap publicHeader">
                <div>
                    <label>资质审核</label>
                    <div>
                        <el-select v-model="qualificationStatus" @change="getSimpleData(1)" style="width:150px;">
                            <el-option v-for="item in status" :label="item.name" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <label>更新时间</label>
                    <el-date-picker
                                    v-model="simBeginDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    type="date"
                                    @change="simpleSearch">
                    </el-date-picker>
                    <el-date-picker
                                    v-model="simEndDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    type="date"
                                    @change="simpleSearch">
                    </el-date-picker>

                </div>
                <div>
                    <el-input v-model="vagueSearch" placeholder="法人代表／供应商名称" icon="search"
                              :on-icon-click="simpleSearch"></el-input>
                    <el-button type="info" @click="supperSearch()" style="margin-left: 20px;">高级搜索</el-button>
                    <p>供应商总数:{{supplierCount}}</p>
                </div>
                <div>
                    <el-button type="success" @click="addSupplier"   v-has:supplierInfoList_addSupplier>新增供应商</el-button>
                </div>
            </div>
        <!--高级搜索弹出的模态框-->
        <div v-show="supplierList_Search" class="  publicModelSearch">
            <div v-show="supplierList_Search">
                <el-form>
                    <div class="row supplierInfoList_Advanced clearMargin">
                        <!--创建时间 合同有效期 更新时间-->
                        <div>
                                <div >
                                    <label>创建时间</label>
                                    <div>
                                        <el-date-picker v-model="createBeginDate" format="yyyy-MM-dd"
                                                        :editable='false' type="date" class="fullWidth">
                                        </el-date-picker>
                                    </div>
                                    <div>
                                        <el-date-picker
                                            v-model="createEndDate"
                                            format="yyyy-MM-dd"
                                            :editable='false'
                                            type="date" class="fullWidth">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div>
                                    <label>合同有效期</label>
                                    <div>
                                        <el-date-picker v-model="contractCreateDate" format="yyyy-MM-dd"
                                                        :editable='false' type="date">
                                        </el-date-picker>
                                    </div>
                                    <div>
                                        <el-date-picker  :editable='false' format="yyyy-MM-dd"
                                                        v-model="contractEndDate" type="date">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <!--1.0 新增启用时间-->
                                <div>
                                    <label>更新时间</label>
                                    <div>
                                        <el-date-picker v-model="updateBeginDate" format="yyyy-MM-dd"
                                                        :editable='false' type="date" class="fullWidth">
                                        </el-date-picker>
                                    </div>
                                    <div>
                                        <el-date-picker
                                            v-model="updateEndDate"
                                            format="yyyy-MM-dd"
                                            :editable='false'
                                            type="date" class="fullWidth">
                                        </el-date-picker>
                                    </div>
                                </div>
                        </div>
                        <!--法人手机号 法人代表 供应商名称-->
                        <div>
                                <div>
                                    <label>法人手机号</label>
                                        <el-input  style="width:150px;"
                                                   v-model="userList.responsiblePhone"></el-input>
                                </div>
                                <div>
                                    <label>法人代表</label>
                                        <el-input  style="width:150px;"
                                                   v-model="userList.responsible"></el-input>
                                </div>
                                <div>
                                    <label class=" control-label">供应商名称</label>
                                        <el-input  style="width:150px;"
                                                   v-model="userList.providerName"></el-input>
                                </div>
                        </div>
                        <!--注册地址 账号状态-->
                        <div>
                                <div>
                                    <label>注册地址:</label>
                                        <el-select v-model="contractRegisterAddressProvince" @change="getCity" style="width:150px;margin-top:-1px">
                                            <el-option
                                                v-for="option in provinces"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="contractRegisterAddressCity" @change="getArea" style="width:150px">
                                            <el-option
                                                v-for="option in cities"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="contractRegisterAddressDistrict" style="width:150px;">
                                            <el-option
                                                v-for="option in countres"
                                                :key="option.srId"
                                                :label="option.name"
                                                :data-status="option.srId"
                                                :value="option.srId">
                                            </el-option>
                                        </el-select>
                                </div>
                                <!--新增账号状态-->
                                <div>
                                    <label>账号状态:</label>
                                        <el-select v-model="supplieraccountStatus" style="width:150px;">
                                            <el-option v-for="option in accountStatus"
                                                       :label="option.name"
                                                       :value="option.value">
                                            </el-option>
                                        </el-select>
                                </div>
                        </div>
                    </div>
                    <div class="row clearMargin supplierList_btn">
                        <div>
                            <el-button type="info" @click="multiSearch">查询</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="row clearMargin">
            <!--&lt;!&ndash;table表格&ndash;&gt;-->
            <!--<el-table :data="supplierData.list"  style="margin:20px 0;" border>-->
                <!--<el-table-column-->
                    <!--type="index"-->
                    <!--label="序号"-->
                    <!--align="center"-->
                    <!--width="100">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="providerName"-->
                    <!--label="供应商名称"-->
                    <!--align="center"-->
                    <!--min-width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="accountId"-->
                    <!--label="供应商Id"-->
                    <!--align="center"-->
                    <!--min-width="100">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="responsible"-->
                    <!--label="法人代表"-->
                    <!--align="center"-->
                    <!--min-width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="responsiblePhone"-->
                    <!--label="法人手机号"-->
                    <!--align="center"-->
                    <!--min-width="130">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="registAddress"-->
                    <!--label="注册地址"-->
                    <!--align="center"-->
                    <!--min-width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="supplierData"-->
                    <!--label="合同有效期"-->
                    <!--align="center"-->
                    <!--min-width="200">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="qualificationStatu"-->
                    <!--label="资质审核"-->
                    <!--align="center"-->
                    <!--min-width="120">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="accountStatus"-->
                    <!--label="账号状态"-->
                    <!--align="center"-->
                    <!--min-width="100">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="createDate"-->
                    <!--label="创建时间"-->
                    <!--align="center"-->
                    <!--min-width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="updateDate"-->
                    <!--label="更新时间"-->
                    <!--align="center"-->
                    <!--min-width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--fixed="right"-->
                    <!--label="操作"-->
                    <!--min-width="80"-->
                    <!--align="center">-->
                    <!--<template scope="scope">-->
                        <!--<el-popover trigger="hover" placement="left">-->
                            <!--<el-button style="display: block;text-align: center;margin: 0 auto;"-->
                                       <!--type="text" size="small" v-has:supplierInfoList_supplierInfoEdit @click="supplierJump(1,scope.row.accountId)">详情-->
                            <!--</el-button>-->
                            <!--<el-button style="display: block;text-align: center;margin: 0 auto;"-->
                                       <!--type="text" size="small" v-has:supplierInfoList_commodityList @click="supplierJump(2,scope.row.accountId)">供货商品-->
                            <!--</el-button>-->
                            <!--<el-button style="display: block;text-align: center;margin: 0 auto;"-->
                                       <!--type="text" size="small" v-has:supplierInfoList_orderList @click="supplierJump(3,scope.row.accountId)">供货订单-->
                            <!--</el-button>-->
                            <!--<div slot="reference" class="name-wrapper">-->
                                <!--<img src="../../../static/img/details.png">-->
                            <!--</div>-->
                        <!--</el-popover>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        </div>
        <div class="supplierInfoList_tableParent">
            <div class="table-responsive">
                <table class="supplierInfoList_mainTable table table-bordered table-hover text-center" style="table-layout: fixed;width:100px">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="(item,index) in this.supplierTh">{{item.name}}<i v-show="item.name==='创建时间'" class="el-icon-arrow-down" :class="{supplierArrowUp: sort == 1, supplierArrowDown: sort == 0}" @click="sortType()"></i></th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(supplier,index)  in supplierData.list">
                        <td>{{index + 1}}</td>
                        <td>{{supplier.providerName}}</td>
                        <td>{{supplier.accountId}}</td>
                        <td>{{supplier.responsible}}</td>
                        <td>{{supplier.responsiblePhone}}</td>
                        <td>{{supplier.registAddress}}</td>
                        <td>
                            <p :value="supplier.contractStatus" v-show="supplier.contractStatus==0">
                                {{supplier.contractCreateDate}}——{{supplier.contractEndDate}}</p>
                            <p :value="supplier.contractStatus" v-show="supplier.contractStatus==1">
                                {{supplier.contractCreateDate}}——{{supplier.contractEndDate}}<br>即将过期
                            </p>
                            <p :value="supplier.contractStatus" v-show="supplier.contractStatus==2">
                                {{supplier.contractCreateDate}}——{{supplier.contractEndDate}}<br/>已过期
                            </p>
                        </td>
                        <td v-show="supplier.qualificationStatus==0">未发起审核</td>
                        <td v-show="supplier.qualificationStatus==1">待审核</td>
                        <td v-show="supplier.qualificationStatus==2">审核通过</td>
                        <td v-show="supplier.qualificationStatus==3">审核未通过</td>
                        <td>{{supplier.accountStatus}}</td>
                        <td>{{supplier.createDate}}</td>
                        <td>{{supplier.updateDate}}</td>
                    </tr>
                    <tr v-if="supplierData.list && supplierData.list.length===0">
                        <td colspan="12">没有数据记录</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <supplierBtn :supplierList="supplierData.list" @supplierJump="supplierJump"></supplierBtn>
            <div class="supplierInfoList_pageWrap">
                <!--&lt;!&ndash;普通查询分页&ndash;&gt;-->
                <el-pagination v-show="queryType==1&&supplierData.total>0"
                    @size-change="changeRows"
                    @current-change="change"
                    :current-page="simpleCurrentPage"
                    :page-sizes=supplierSize
                    :page-size="simplePageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.supplierData.total">
                </el-pagination>
                <!--&lt;!&ndash;高级查询分页&ndash;&gt;-->
                <el-pagination v-show="queryType==2&&supplierData.total>0"
                               @size-change="changeRows"
                               @current-change="change"
                               :current-page="currentPage"
                               :page-sizes=supplierSize
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="this.supplierData.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import '../../../static/css/supplierInfoList.less';
    import axios from 'axios';
    import api from '../../api/account';
    import paging from '../../components/page';
    import breadCrumb from '../../components/Breadcrumb';
    import supplierBtn from '../../components/supplier/supplierListBtn'
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';
    import { mapGetters } from 'vuex';

    //供应商列表选项数据
    const supplierOption = [
        {id:1,name:'供应商名称'},
        {id:2,name:'供应商Id'},
        {id:3,name:'法人代表'},
        {id:4,name:'法人手机号'},
        {id:5,name:'注册地址'},
        {id:6,name:'合同有效期'},
        {id:7,name:'资质审核'},
        {id:8,name:'账号状态'},
        {id:9,name:'创建时间'},
        {id:10,name:'更新时间'},
    ];
    export default {
        data () {
            return {
                supplierSize:[10,20,40],
                //面包屑导航
                breadList:[
                    {name:' 供应商管理'},
                    {name:'供应商列表'}
                ],
                supplierTh:[],  //供应商选项列表
                sort: 3,//排序的次序（必传，且只能传0或1，0代表正序 1代表逆序）
                test:'',
                button_display: false, //控制按钮的显示
                queryType: 1,//1-简易查询 2-高级查询
                supplierList_Search: false,//控制高级搜索显示
                simBeginDate: '',
                simEndDate: '',
                vagueSearch: '',
                dialogFormVisible: false,
                v_model: false,
                show: false,
                title: '商品列表',
                token: null,
                supplierData: {},
                arrLIst: [],
                qualificationStatus:'',
                provinces: [], // 省
                cities: [], // 市
                countres: [], // 县
                supplierCount: null,//供应商个数
                selectedSignPro: '',
                selectedSignCity: '',
                selectedSignArea: '',
                cityList:[
                    {name:'全部',srId:0}
                ],
                createBeginDate: null,                                         //开始时间
                createEndDate: null,                                           //截止时间
                contractCreateDate: null,                                //合同创建日期
                contractEndDate: null,                                   //合同截止日期
                updateBeginDate:null,                                       //更新时间开始
                updateEndDate:null,                                         //更新时间结束
                supplieraccountStatus:null,                                 //账号状态
                supplierObj:{},                                                 //简单查询发送的对象
                userList: {
                    num:1,
                    createBeginDate: null,                                         //开始时间
                    createEndDate: null,                                           //截止时间
                    responsible: null,                               //法人代表（合同）
                    responsiblePhone: null,                          //法人代表电话（合同）
                    beginTime: null,                                         //开始时间(做类型转换)
                    endTime: null,                                           //截止时间(做类型转换)
                    startEndDate:null,                                      //启用开始时间
                    startBeginDate:null,                                    //启用结束时间
                    contractCreateDate: null,                                //合同创建日期
                    contractCreateTime: null,                                //合同创建日期(做类型转换)
                    contractEndDate: null,                                   //合同截止日期
                    contractEndTime: null,                                   //合同截止日期(做类型转换)
                    registAddressDistrict: null,                                              // 省
                    registAddressProvince: null,                                                 // 市
                    registAddressCity: null,                                               // 县
                    providerName: null,                                      //供应商名称
                    pageNum: 1,                                              //页数
                    pageSize: 10,                                            //每页长度
                    uploadMode: null,                                         //供应商上传方式
                    updateBeginDate:null,
                    updateEndDate:null,
                    accountStatus:null,
                    sort: 3,                                                    //正倒序
                },
                status:[
                    {value:'',name:'全部'},
                    {value:0,name:'未发起审核'},
                    {value:1,name:'待审核'},
                    {value:2,name:'审核通过'},
                    {value:3,name:'审核未通过'},
                ],
                //供应商状态
                accountStatus:[
                    {value:'',name:'全部'},
                    {value:1,name:'启用'},
                    {value:2,name:'禁用'}
                ],
                pageNum: 1,    //
                pageTotal: 1, //总页码
                pageSize: 10, //每页条数
                currentPage: 1, //当前页
                checkNum:1,  //每页选择项
                accountPurchaseLowInput:{}, //普通查询发送的对象
                simplePageNum: 1,
                simplePageTotal: 1,
                simpleCurrentPage: 1,
                simplePageSize: 10,
                contractRegisterAddressProvince: null,  //合同注册地址省
                contractRegisterAddressCity: null,      //合同注册地址市
                contractRegisterAddressDistrict: null,  //合同注册区/县
                searchNum:1,
                jumpType:null,
            };
        },
        created: function () {
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.supplierMath();         //对供应商的列表数据进行循环处理
            this.getProvince();          //获取省份（三级联动）
            this.getSupplierList();      //获取供应商总数
            this.simpleSearch();           //查询
        },
        methods: {
            //对供应商的列表数据进行循环处理
            supplierMath(){
                this.supplierTh = supplierOption.map(r=>{
                    return{
                        name: r.name
                    }
                })
            },
            //供应商跳转 (1:跳转详情 2:供货商品 3：供货订单)
            supplierJump(type,id){
                if(type==1){
                    //0:高级   1：普通
                    if(this.jumpType === 0){
                        this.userList.jumpType = 1;
                        this.$router.push({path:'/supplierInfoEdit',query:{accountId:id}});
                        this.$store.dispatch('setPageInfo', this.userList);
                    }else{
                        this.accountPurchaseLowInput.jumpType = 0;
                        this.$router.push({path:'/supplierInfoEdit',query:{accountId:id}});
                        this.$store.dispatch('setPageInfo', this.accountPurchaseLowInput);
                    }
                }
                else if(type==2){
                    this.$router.push({path:'/commodityList',query:{accountId:id}})
                }
                else if(type==3){
                    this.$router.push({path:'/orderList',query:{accountId:id}})
                }
            },
            //列表排序
            sortType () {
                //对时间列表数值进行处理
                if(this.sort===3){
                    this.sort = 0;
                }else if(this.sort ===0){
                    this.sort = 1;
                }else if(this.sort ===1){
                    this.sort = 0;
                }
                if(this.searchNum==1){
                    this.simpleCurrentPage = 1
                    this.getSimpleData();
                }
                else if(this.searchNum==2){
                    this.currentPage = 1
                    this.Informationquery();
                }
            },
            //新增供应商
            addSupplier(){
                this.$router.push('/addOneSupplier')
            },
            //供应商查询信息
            simpleSearch () {
                // 如果return flag 为true，就用vuex里面的条件，否则就用 用户输入；
                if(this.$store.getters.returnFlag) {
                    this.$store.dispatch('setFlag', false);
                    //进行类别判断   0：普通查询  1：高级查询
                    if(this.$store.getters.pageInfo.jumpType===0) {
                        this.accountPurchaseLowInput = this.$store.getters.pageInfo
                        this.supplierCity();    //发送请求，对发送的城市ID进行处理
                        this.supplierArea();     //发送请求，对发送的城市ID进行处理
                        this.getSimpleDataEasy(); //通过返回传过来的对象进行查询
                    }
                    else if(this.$store.getters.pageInfo.jumpType===1){
                        this.userList = this.$store.getters.pageInfo;
                        //时间处理
                        this.timeDispose();
                        this.disposesearchSupplier();
                        //更新时间、创建时间 二次重新赋值
                        this.supplierCity();
                        this.supplierArea();
                        this.getSimpleDataSupplier(); //通过返回传过来的对象进行查询
                    }
                }else{  //普通查询
                    if (this.dialogFormVisible) {
                        this.dialogFormVisible = !this.dialogFormVisible;
                    }
                    //清空高级查询的搜索条件
                    for (let key in this.userList) {
                        if (key === 'pageNum' || key === 'pageSize') {
                            continue;
                        }
                        this.userList[key] = null;
                    }
                    this.simpleCurrentPage = 1;
                    this.queryType = 1;
                    this.getSimpleData();   //发送参数，进行查询
                }
            },
            //返回来的高级查询时间处理
            timeDispose(){
                this.contractCreateDate = this.userList.contractCreateDate ? format(this.userList.contractCreateDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.contractEndDate = this.userList.contractEndDate ? format(this.userList.contractEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.createBeginDate = this.userList.createBeginDate ? format(this.userList.createBeginDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.createEndDate = this.userList.createEndDate ? format(this.userList.createEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.updateEndDate = this.userList.updateEndDate ? format(this.userList.updateEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.updateBeginDate =this.userList.updateBeginDate ? format(this.userList.updateBeginDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.sort = this.userList.sort;
                this.supplieraccountStatus = this.userList.accountStatus        //账号状态
            },
            //高级查询
            getSimpleDataSupplier(){
                    //发送请求
                    api.getSupplierList(this.userList).then(
                        (response) => {
                            //重新赋值 保存用户输入的值
                            this.supplierData = response.data;
                            // 对后端返回的值进行处理
                            this.timeDeal(this.supplierData);
                            this.searchNum = 2; //控制更新时间的开关
                            this.queryType=2;   //控制分页的开关
                            this.jumpType = 0;  //控制高级查询的开关
                            let pageTotal = (this.supplierData.total % this.userList.pageSize) === 0 ? this.supplierData.total / this.userList.pageSize : (this.supplierData.total / this.userList.pageSize) + 1;
                                this.currentPage = this.userList.pageNum;
                                this.pageTotal = Math.floor(pageTotal);
                            this.supplierAccountStatus(this.supplierData.list);

                        });

            },
            //对用户返回的对象进行处理，进行数据处理，进行查询（高级查询）
            disposesearchSupplier(){
                //    高级查询  重新赋值 保存用户输入的值
                this.queryType = 2;
                this.contractRegisterAddressProvince = this.userList.registAddressProvince      //三级联动重新赋值
                this.contractRegisterAddressCity = this.userList.registAddressCity
                this.contractRegisterAddressDistrict = this.userList.registAddressDistrict
                this.supplierList_Search = true;        //控制模态框显示
            },

            //通过前一个页面返回进行供应商查询筛选
            getSimpleDataEasy(){
                //发送请求
                api.getSupplierList(this.accountPurchaseLowInput).then(
                    (response) => {
                        //重新赋值 保存用户输入的值
                        this.supplierInput();
                        this.supplierData = response.data;
                        // 对后端返回的值进行处理
                        this.timeDeal(this.supplierData);
                        //对象二次赋值，通过vuex发送详情的对象
                        this.searchNum = 1  //控制创建时间的开关(普通查询)
                        this.queryType = 1  //控制分页的开关(普通查询)
                        this.jumpType = 1   //控制普通查询Vuex的开关
                        let pageTotal = ( this.supplierData.total % this.accountPurchaseLowInput.pageSize) === 0 ? this.supplierData.total / this.accountPurchaseLowInput.pageSize : (this.supplierData.total / this.accountPurchaseLowInput.pageSize) + 1;
                        this.simpleCurrentPage = this.accountPurchaseLowInput.pageNum; //将当前页置为页数
                        this.simplePageTotal = Math.floor(pageTotal);
                        this.supplierAccountStatus(this.supplierData.list)
                    });
            },
            //重新赋值 保存用户输入的值(普通查询)
            supplierInput(){
                this.simBeginDate = this.accountPurchaseLowInput.updateBeginDate;
                this.simEndDate = this.accountPurchaseLowInput.updateEndDate;
                this.vagueSearch =  this.accountPurchaseLowInput.vague
                this.qualificationStatus = this.accountPurchaseLowInput.qualificationStatus
                this.sort = this.accountPurchaseLowInput.sort
            },
            //根据供应商信息进行查询筛选
            getSimpleData (type) {
                if(type==1){
                    this.simpleCurrentPage = 1
                    this.currentPage = 1
                }
                let simBeginDate = this.simBeginDate ? format(this.simBeginDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                let simEndDate = this.simEndDate ? format(this.simEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                if (simBeginDate && simEndDate && simBeginDate > simEndDate) {
                    this.$alert('起始时间不能大于终止时间');
                    return;
                }
                //创建一个新的对象，用于发送请求
                this.accountPurchaseLowInput = {
                    pageNum: this.simpleCurrentPage,
                    pageSize: this.simplePageSize,
                    updateBeginDate: simBeginDate,//开始时间（更新时间）
                    updateEndDate: simEndDate,  //截止时间（更新时间)
                    vague: this.vagueSearch,//查询条件(法人代表/供应商名称)
                    qualificationStatus: this.qualificationStatus, //供应商资质状态
                    sort: this.sort
                };
                //发送请求,获取供应商信息
                this.supplierMessage(this.accountPurchaseLowInput);
            },
            //发送请求，获取供应商信息
            supplierMessage(type){
                api.getSupplierList(type).then(
                    (response) => {
                        this.supplierData = response.data;
                        //对后端返回的值进行处理
                        this.timeDeal(this.supplierData);
                        //对象二次赋值，通过vuex发送详情的对象
                        this.searchNum = 1;
                        this.jumpType = 1;
                        let pageTotal = (this.supplierData.total % this.simplePageSize) == 0 ? this.supplierData.total / this.simplePageSize : (this.supplierData.total / this.simplePageSize) + 1;
                        this.simplePageTotal = Math.floor(pageTotal);
                        this.supplierAccountStatus(this.supplierData.list)
                    });
            },
            //对后端返回的值进行处理
            timeDeal(obj){
                for(let key in obj.list){
                    //合同有效期处理
                    switch(obj.list[key].contractStatus){
                        case 0 :
                            obj.list[key].supplierData = obj.list[key].contractCreateDate+'--'+obj.list[key].contractEndDate;
                            break;
                        case 1 :
                            obj.list[key].supplierData = obj.list[key].contractCreateDate+'--'+obj.list[key].contractEndDate+'  即将过期';
                            break;
                        case 2 :
                            obj.list[key].supplierData = obj.list[key].contractCreateDate+'--'+obj.list[key].contractEndDate+'   已过期';
                            break;
                    }
                    //资质审核处理
                    switch(obj.list[key].qualificationStatus){
                        case  0 :
                            obj.list[key].qualificationStatu = '即将过期';
                            break;
                        case  1 :
                            obj.list[key].qualificationStatu = '待审核';
                            break;
                        case  2 :
                            obj.list[key].qualificationStatu = '审核通过';
                            break;
                        case  3 :
                            obj.list[key].qualificationStatu = '审核未通过';
                            break;
                    }
                }
            },
            multiSearch () {
                this.queryType = 2;
                this.currentPage = 1;
                this.Informationquery();
            },
            //供应商状态判断    1:普通查询  2：高级查询
            supplierAccountStatus(type,obj){
                for(let key in this.supplierData.list) {
                    if (this.supplierData.list[key].accountStatus == 1) {
                        this.supplierData.list[key].accountStatus = '启用'
                    } else if (this.supplierData.list[key].accountStatus == 2) {
                        this.supplierData.list[key].accountStatus = '禁用'
                    }
                }
            },
            //获取供应商总数
            getSupplierList () {
                api.getAccountNum().then(res => {
                    if (res.data.code == 1) {
                        this.supplierCount = res.data.data;
                    }
                });
            },
            //高级搜索模态框隐藏显示
            supperSearch () {
                this.v_model = !this.v_model;
                this.supplierList_Search = !this.supplierList_Search;
            },
            //获取省份信息
            getProvince: function () {
                api.getAreaList({'pid': this.contractRegisterAddressProvince}).then(
                    (res) => {
                        let provinces = res.data;
                        provinces.unshift({level:0,name:'全部',srId:null})
                        this.provinces=provinces
                    }
                );
            },
            //获取基础信息城市列表。
            getCity: function () {
                this.contractRegisterAddressCity = ''
                this.contractRegisterAddressDistrict =''
                api.getAreaList({'pid': this.contractRegisterAddressProvince}).then(
                    (response) => {
                        this.cities = response.data;
                    }
                );
            },
            //获取基础信息区列表。
            getArea: function () {
                if (!this.contractRegisterAddressCity) {
                    return;
                }
                this.contractRegisterAddressDistrict =''
                api.getAreaList({'pid': this.contractRegisterAddressCity}).then(
                    (response) => {
                        this.countres = response.data;
                    }
                );
            },
            //分页选择  1：代表普通查询分页 2：代表高级查询分页
            change (index) {
                if (this.queryType && this.queryType == 1) {
                    this.userList.num = index;
                    this.simpleCurrentPage = index;
                    this.userList.pageNum =  this.simpleCurrentPage;
                    this.getSimpleData();
                } else if (this.queryType && this.queryType == 2) {
                    this.userList.num = index;
                    this.currentPage = index;
                    this.userList.pageNum =  this.currentPage;
                    this.Informationquery();
                    this.getSupplierList();
                }
            },
            //每页显示条数
            changeRows (row) {
                //1：普通查询  2：高级查询
                if (this.queryType && this.queryType == 1) {
                    this.simpleCurrentPage = 1;
                    this.simplePageSize = row;
                    this.simpleSearch(); //普通查询接口
                } else if (this.queryType && this.queryType == 2) {
                    this.currentPage = 1;
                    this.userList.pageSize = row;
                    this.multiSearch(); //高级查询接口
                }
            },
            // 查询
            Informationquery: function () {
                //分页赋值
                this.userListPaging();
                //对时间进行处理
                this.userList.contractCreateDate = this.contractCreateDate ? format(this.contractCreateDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.contractEndDate = this.contractEndDate ? format(this.contractEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.createBeginDate = this.createBeginDate ? format(this.createBeginDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.createEndDate = this.createEndDate ? format(this.createEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.updateEndDate = this.updateEndDate ? format(this.updateEndDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.updateBeginDate =this.updateBeginDate ? format(this.updateBeginDate, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.userList.sort = this.sort;
                //对时间进行处理
                if( this.userList.updateBeginDate&& this.userList.updateEndDate&& this.userList.updateBeginDate> this.userList.updateEndDate){
                    this.$alert('更新时间起始时间不能大于终止时间');
                    return;
                }
                if (this.userList.contractCreateDate && this.userList.contractEndDate && this.userList.contractCreateDate> this.userList.contractEndDate) {
                    this.$alert('合同有效期起始时间不能大于终止时间');
                    return;
                }
                if (this.userList.beginDate && this.userList.endDate && this.userList.beginDate > this.userList.endDate) {
                    this.$alert('创建时间起始时间不能大于终止时间');
                    return;
                }
                //账号状态赋值  准备提交
                this.userList.accountStatus =  this.supplieraccountStatus;
                //发送请求
                this.getSupplierMessage(this.userList);
            },
            //发送高级查询请求
            getSupplierMessage(type){
                api.getSupplierList(type).then(
                    (response) => {
                        this.searchNum=2;
                        this.jumpType = 0;
                        this.supplierData = response.data;
                        this.timeDeal(this.supplierData);
                        this.pageTotal = Math.floor((this.supplierData.total % this.userList.pageSize) === 0 ? (this.supplierData.total / this.userList.pageSize) : (this.supplierData.total / this.userList.pageSize) + 1);
                        this.supplierAccountStatus(this.supplierData.list)
                    }
                );
            },
            //分页赋值
            userListPaging(){
                this.userList.pageNum = this.currentPage;
                this.userList.registAddressProvince = this.contractRegisterAddressProvince;
                this.userList.registAddressCity = this.contractRegisterAddressCity;
                this.userList.registAddressDistrict = this.contractRegisterAddressDistrict;
            },
            //供应商根据省ID获取市
            supplierCity(){
                api.getAreaList({'pid': this.contractRegisterAddressProvince}).then(
                    (response) => {
                        this.cities = response.data;
                    }
                );
            },
            //供应商根据市ID获取地区
            supplierArea(){
                api.getAreaList({'pid': this.contractRegisterAddressCity}).then(
                    (response) => {
                        this.countres = response.data;
                    }
                );
            }
        },

        components: {
            paging,supplierBtn,breadCrumb
        },
    };
</script>
