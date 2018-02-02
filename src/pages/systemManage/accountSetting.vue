﻿<template>
    <div>
        <!--面包屑导航-->
        <div >
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        </div>
        <div class="row clearMargin publicHeader">
            <el-button type="primary" v-bind:class="{set_btnStyle:isAcountFocus}" plain>账号列表</el-button>
            <el-button type="primary" v-bind:class="{set_btnStyle:isRoleFocus}" plain @click="jumpToRole">角色列表</el-button>
        </div>
        <div class="row clearMargin publicHeader">
            <label>账号状态</label>
            <el-select  placeholder="全部" v-model="searchCondition.userStatus" >
                <el-option v-for="item in accountStatus" :key="item.status" :label="item.type":data-status="item.status" :value="item.status" ></el-option>
            </el-select>
            <el-input  placeholder="手机号码" v-model="searchCondition.loginName" icon="search" :on-icon-click="searchByPhone"></el-input>
            <el-button @click="addSubAcount" type="info">新增账号</el-button>
        </div>
        <div class="containers">
            <table class="table table-bordered table-hover" >
                <thead>
                <tr>
                    <th width="20%">手机号码</th>
                    <th width="25%">用户姓名</th>
                    <th width="25%">角色名称</th>
                    <th width="15%">状态</th>
                    <th width="15%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in subAccountList">
                    <td>{{item.loginName}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.roleName}}</td>
                    <td>{{item.userStatus == 1? '启用':'禁用'}} </td>
                    <td>
                        <el-button type="info" size="small" @click="modifyStatus(item.userId,2,item.loginName)" v-if="item.userStatus==1">禁 用</el-button>
                        <el-button type="info" size="small" @click="modifyStatus(item.userId,1,item.loginName)" v-else>启 用</el-button>
                        <el-button type="info" size="small" @click="updateStatus(item.userId)">账号修改</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--分页-->
            <div v-if="subAccountList.length > 0"  class="pull-right block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="pagingAcount.pageNum":page-sizes="pageList":page-size="pagingAcount.pageSize" :total="pagingAcount.total"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import globalData from '../../common/global';
    import api from '../../api';
    import paging from '../../components/page';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import '../../../static/css/accountSetting.less';

    export default {
        data() {
            return {
                name: 'params',
                subAccountList:[],
                isRoleFocus: false,
                isAcountFocus: true,
                pagingAcount:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                checkChange: [],
                searchCondition: {loginName:"",userStatus: ""},
                accountStatus: [
                    {
                        status: '',
                        type: '全部'
                    },
                    {
                        status: '1',
                        type: '启用'
                    },
                    {
                        status: '2',
                        type: '禁用'
                    },
                ],
            };
        },
        created() {
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.token = localStorage.getItem('token');
            this.accountId = this.$route.query.accountId;
            this.getAccount();
        },
        methods: {
            changeStatus: function () {
                this.getAccount();
            },

            jumpToRole(){
                this.$router.push({path: '/systemRoleSetting'})
            },
            // 创建子账号
            addSubAcount(){
                this.$router.push({path: '/systemAddAccount'});
            },
            updateStatus(id){
                let pageInfo = {
                    userStatus : this.searchCondition.userStatus,
                    loginName  : this.searchCondition.loginName,
                    pageNum : this.pagingAcount.pageNum,
                    pageSize : this.pagingAcount.pageSize,
                };
                this.$store.dispatch('setPageInfo', pageInfo);
                this.$router.push({path: '/systemUpdateAccount',query:{"userId":id}});
            },


            modifyStatus(userId,userStatus,loginName){
                if(userId){
                    let userId = userId;
                }
                if(userStatus){
                    let userStatus =userStatus
                }
                if(loginName){
                    let loginName =loginName
                }
                let param = {
                    loginName :loginName,
                    userId : userId,
                    userStatus : userStatus
                };
                api.accountUpdataStatus(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            this.$alert('更改成功');
                            this.getAccount();
                        }else {
                            this.$alert(response.data.message);
                        }
                    });
            },
            //根据手机号查询
            searchByPhone(){
                this.pagingAcount.pageNum = 1;
                this.getAccount();
            },
            // 查询账户列表信息
            getAccount: function(){
                let param = {}
                if (this.$store.getters.returnFlag) {
                    let pageInfo = this.$store.getters.pageInfo;
                    this.searchCondition.userStatus =pageInfo.userStatus,
                    this.searchCondition.loginName = pageInfo.loginName,
                    this.pagingAcount.pageNum = pageInfo.pageNum,
                    this.pagingAcount.pageSize = pageInfo.pageSize
                    this.$store.dispatch('setFlag', false);
                }
                param = {
                    userStatus :this.searchCondition.userStatus,
                    loginName : this.searchCondition.loginName,
                    pageNum : this.pagingAcount.pageNum,
                    pageSize : this.pagingAcount.pageSize,
                };
                api.getAccountList(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            let data =response.data.data.list;
                            this.pagingAcount.total=response.data.data.total;
                            this.pagingAcount.pageTotal=response.data.data.pages;
                            this.subAccountList =data ? data:[];
                        }else {
                            this.$alert(response.data.message);
                        }
                    });
            },
            // 分页
            handleSizeChange(row){
                this.pagingAcount.pageNum = 1;
                this.pagingAcount.pageSize = row;
                this.getAccount();
            },
            handleCurrentChange(index){
                this.pagingAcount.pageNum = index;
                this.getAccount();
            },
        },

        watch: {
            'searchCondition.userStatus': {
                handler: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.changeStatus();
                    }
                }
            },
        },
        components: {
            paging,
            mybreadcrumb
        },

        computed: {
            navigationList() {
//                this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
                this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
                return [{ name: '系统设置' }, { name: '账号设置' }]
            }
        }

    };


</script>
<style scoped>
    label{
        margin: 0 10px;
        font-weight: normal;
    }
    .el-input{
        width: 185px;
        margin: 0 10px;
    }

    .accountSetting_select{
        display: inline-block;
    }
    .accountSetting_table{
        margin-top: 20px;
    }
    .paging_analyze{
        margin-right: 20px;
        float: right;
    }

    .set_btnStyle{
        border:1px solid #0ca3d2;
    }
</style>
