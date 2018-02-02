<template>
    <div class="aptitude_audit">
        <div>
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
        <div class="publicHeader row aptitude_Header">
            <div>
                <el-input  placeholder="法人手机号/供应商名称" :on-icon-click="getAptitudeAudits" icon="search" v-model="queryConditionName"></el-input>
            </div>
            <div>
                <label >资质审核</label>
                <div>
                    <el-select v-model="queryCondition.status" placeholder="请选择">
                        <el-option v-for="item in aptitudeAuditStatus"
                                   :key="item.key"
                                   :label="item.value"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                    <label>更新时间</label>
                        <el-date-picker v-model="queryCondition.startUpdateTime" format="yyyy-MM-dd" :editable='false' type="date" style="width:102px"></el-date-picker>
                        <el-date-picker v-model="queryCondition.endUpdateTime" format="yyyy-MM-dd" :editable='false' type="date" style="width:102px"></el-date-picker>
            </div>
            <div>
                    <label>提交审核时间:</label>
                        <el-date-picker v-model="queryCondition.startCreateTime" format="yyyy-MM-dd" :editable='false' type="date" style="width:102px"></el-date-picker>
                        <el-date-picker v-model="queryCondition.endCreateTime" format="yyyy-MM-dd" :editable='false' type="date" style="width:102px" ></el-date-picker>
            </div>
        </div>
        <div class="aptitudeAudit_tableParent">
            <div class="table-responsive">
                <table class="table table-bordered table-hover text-center aptitudeAudit_mainTable" style="table-layout: fixed;width:100px">
                    <thead>
                    <tr>
                        <th style="width:75px;">序号</th>
                        <th v-for="(item,index) in aptitudeTh">{{item.name}}<i style="cursor: pointer" v-if="item.name==='提交审核时间'" class="el-icon-arrow-up"  :class="{aptitudeAuditArrowUp: queryCondition.sort == 0, aptitudeAuditArrowDown: queryCondition.sort == 1}" @click="sortType()"></i></th>
                        <th style="width:93px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(aptitudeAudit,index) in aptitudeAudits">
                        <td>{{index + 1}}</td>
                        <td>{{aptitudeAudit.providerName}}</td>
                        <td>{{aptitudeAudit.accountId}}</td>
                        <td>{{aptitudeAudit.responsiblePhone}}</td>
                        <td>{{aptitudeAudit.province}} {{aptitudeAudit.city}} {{aptitudeAudit.district}}</td>
                        <td>
                            <span v-if="aptitudeAudit.qualificationStatus == 1">待审核</span>
                            <span v-if="aptitudeAudit.qualificationStatus == 2" >审核通过</span>
                            <span v-if="aptitudeAudit.qualificationStatus == 3">审核未通过</span>
                        </td>
                        <td>{{aptitudeAudit.createTime}}</td>
                        <td>{{aptitudeAudit.updateTime}}</td>

                    </tr>
                    </tbody>
                    <tbody>
                    <tr v-show="aptitudeAudits.length===0">
                        <td colspan="9"> 没有数据记录</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <table class="aptitudeAudit_editTable">
                <thead>
                    <tr>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(aptitudeAudit,index) in aptitudeAudits" >
                        <td>
                            <span v-if="aptitudeAudit.qualificationStatus == 2 || aptitudeAudit.qualificationStatus == 3" style="color:#CCCCCC">审核</span>
                            <el-button v-has:aptitudeAudit_audit type="text" v-if="aptitudeAudit.qualificationStatus == 1" @click="aptitudeAuditJump(aptitudeAudit.accountId,1)">审核</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--<el-table :data="aptitudeAudits" style="margin:20px 0;" border>-->
                <!--<el-table-column type="index" label="序号" align="center" width="100"></el-table-column>-->
                <!--<el-table-column prop="providerName" label="供应商名称" align="center" width="180"></el-table-column>-->
                <!--<el-table-column prop="accountId" label="供应商id" align="center" width="100"></el-table-column>-->
                <!--<el-table-column prop="responsiblePhone" label="法人手机号" align="center" width="180"></el-table-column>-->
                <!--<el-table-column prop="province" label="注册地址" align="center" width="200"></el-table-column>-->
                <!--<el-table-column prop="qualificationStatus" label="资质审核" align="center" width="200"></el-table-column>-->
                <!--<el-table-column prop="createTime" label="提交审核时间" align="center" width="200"></el-table-column>-->
                <!--<el-table-column prop="updateTime" label="更新时间" align="center" widhth="200"></el-table-column>-->
                <!--<el-table-column fixed="right" label="操作" width="80" align="center">-->
                    <!--<template scope="scope">-->
                        <!--<span style="color:#CCCCCC" v-show="scope.row.qualificationStatus==='审核通过'||scope.row.qualificationStatus==='审核未通过'">审核</span>-->
                        <!--<el-button v-has:aptitudeAudit_audit type="text" v-show="scope.row.qualificationStatus==='待审核'">审核</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <el-pagination class="aptitudeAudit_paging"
                           @size-change="changeRow"
                           @current-change="change"
                           :current-page="page.pageNum"
                           :page-sizes=aptitudeSize
                           :page-size="page.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import api from '../../api';
    import globalData from '../../common/global';
    import paging from '../../components/page';
    import breadCrumb from '../../components/Breadcrumb';
    import '../../../static/css/aptitudeAudit.less';
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';

    //资质审核列表数据
    const aptitudeOption = [
        {id:1,name:'供应商名称'},
        {id:2,name:'供应商id'},
        {id:3,name:'法人手机号'},
        {id:4,name:'注册地址'},
        {id:5,name:'资质审核'},
        {id:6,name:'提交审核时间'},
        {id:7,name:'更新时间'}
    ];
    export default {
        data () {
            return {
                aptitudeSize:[10,20,40],
                //面包屑导航
                breadList:[
                    {name:' 供应商管理'},
                    {name:'资质审核'}
                ],
                aptitudeTh:[], //用于接收供应商th中的内容
                aptitudeAudits: [],
                page: {total: 1, pageTotal: 1, pageNum: 1, pageSize: 10},
                aptitudeAuditStatus: [{key: '', value: '全部'}, {key: '1', value: '待审核'}, {key: '2', value: '审核通过'}, {key: '3', value: '审核未通过'}],

                queryConditionName: null,
                queryCondition: {name: null, status: '1', startUpdateTime: null, endUpdateTime:null, startCreateTime:null, endCreateTime:null,sort:0},
                isFirstPage: false
            };
        },
        created () {
            //获取供应商table中th的内容
            this.getAptitudeMath();
            //获取供应商所有资质信息
            this.getAptitudeAudits();
        },
        methods: {
            //获取供应商table中th的内容
            getAptitudeMath(){
                this.aptitudeTh = aptitudeOption.map((r)=>{
                    return{
                        name: r.name
                    }
                })
            },
            //审核跳转详情
            aptitudeAuditJump(Id,number){
                this.$router.push({path:'/basicInfo',query:{accountId:Id,supplierStatus:number}})
            },
            /**
             * 获取供应商所有资质
             */
            getAptitudeAudits: function () {
                this.isQueryFirstPage();
                //供应商时间赋值
                this.getTime();
                //给查询条件增加分页参数
                for (let key in this.page) {
                    this.queryCondition[key] = this.page[key];
                }
                this.queryCondition.name = this.queryConditionName
                if (this.queryCondition.startUpdateTime && this.queryCondition.endUpdateTime) {
                    if (this.queryCondition.startUpdateTime > this.queryCondition.endUpdateTime) {
                        this.$alert('更新时间：起始时间不能大于终止时间');
                        return;
                    }
                }
                if (this.queryCondition.startCreateTime && this.queryCondition.endCreateTime) {
                    if (this.queryCondition.startCreateTime > this.queryCondition.endCreateTime) {
                        this.$alert('提交审核时间：起始时间不能大于终止时间');
                        return;
                    }
                }
                //发送请求，获取供应商状态
                this.getSupplierStatu(this.queryCondition);

            },
            //发送请求，获取供应商资质状态
            getSupplierStatu(type){
                api.getSupplierState(type)
                    .then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.aptitudeAudits = response.data.data.list;
                            //对后端返回的省市区进行处理
                         //   this.cityAdd();
                            //对后端返回的资质状态进行处理
                          //  this.qualificationStatus();
                            this.page.total = response.data.data.total;
                            this.page.pageTotal = response.data.data.pages;
                            this.page.pageNum = response.data.data.pageNum;
                            this.page.pageSize = response.data.data.pageSize;
                        }
                    }
                );
            },
            //对后端返回的省市区进行处理
            cityAdd(){
                this.aptitudeAudits.forEach((r)=>{
                   r.province=r.province +' '+r.city+' '+r.district
                })
            },
            //对后端返回的资质状态进行处理
            qualificationStatus(){
                this.aptitudeAudits.forEach(r=>{
                    switch (r.qualificationStatus){
                        case '1' :
                            r.qualificationStatus = '待审核';
                            break;
                        case '2' :
                            r.qualificationStatus = '审核通过';
                            break;
                        case '3':
                            r.qualificationStatus = '审核未通过';
                            break;
                    }
                })
            },
            //供应商资质时间赋值
            getTime(){
                this.queryCondition.startUpdateTime ? this.queryCondition.startUpdateTime = format(this.queryCondition.startUpdateTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.queryCondition.endUpdateTime ?this.queryCondition.endUpdateTime = format(this.queryCondition.endUpdateTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.queryCondition.startCreateTime ? this.queryCondition.startCreateTime = format(this.queryCondition.startCreateTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';
                this.queryCondition.endCreateTime ? this.queryCondition.endCreateTime = format(this.queryCondition.endCreateTime, 'YYYY-MM-DD', {locale: zh_cn}) : '';
            },
            //供应商根据法人代表和名称查询
            simpleSearch(){
                this.getAptitudeAudits();
            },
            change: function (index) {
                this.page.pageNum = index;
                this.getAptitudeAudits();
            },
            //每页显示条数
            changeRow: function (row) {
                this.page.pageNum = 1;
                this.page.pageSize = row;
                this.getAptitudeAudits();
            },
            changeStatus: function () {
                this.page.pageNum = 1;
                this.getAptitudeAudits();
            },
            /**
             * 是否查询第一页
             */
            isQueryFirstPage: function () {
                if (this.isFirstPage) {
                    this.page.pageNum = 1;
                }
                this.isFirstPage = false;
            },
            //列表排序
            sortType: function () {
                this.page.pageNum = 1
                this.queryCondition.sort === 0 ? this.queryCondition.sort = 1 : this.queryCondition.sort = 0;
            }
        },
        watch: {
            queryCondition: {
                handler: function (newVal, oldVal) {
                    this.changeStatus()
                },
                deep:true
            }
        },
        components: {
            paging,breadCrumb
        }
    };
</script>

<style></style>
