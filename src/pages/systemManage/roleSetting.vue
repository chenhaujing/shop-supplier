﻿<template>
    <div>
        <!--面包屑导航-->
        <div>
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        </div>
        <div class="row clearMargin publicHeader">
            <el-button type="primary" v-bind:class="{set_btnStyle:isAcountFocus}" plain @click="jumpToAcount">账号列表</el-button>
            <el-button type="primary" v-bind:class="{set_btnStyle:isRoleFocus}" plain >角色列表</el-button>
        </div>
        <div class="row clearMargin publicHeader">
            <el-button @click="createRole" type="info">新增角色</el-button>
        </div>
        <div class="containers">
            <table class="table table-bordered table-hover" >
                <thead>
                <tr>
                    <th width="20%">角色ID</th>
                    <th>角色名称</th>
                    <th width="30%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in roleList">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <el-button type="info" size="small" @click="editRole(item.id)">修 改</el-button>
                        <el-button type="info" size="small" @click="confirmDelete(item.id)">删 除</el-button>
                    </td>
                </tr>
                <tr v-if="roleList.length < 0">暂无数据</tr>
                </tbody>
            </table>
            <!--分页-->
            <div v-if="roleList.length > 0" class="pull-right block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="paging.pageNum":page-sizes="pageList":page-size="paging.pageSize" :total="paging.total"
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

    export default {
        data() {
            return {
                name: 'params',
                roleList:[],
                isRoleFocus : true,
                isAcountFocus : false,
                isSave: false,
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                checkChange: [],
                searchCondition: {loginName:"",userStatus: ""},
            };
        },
        created() {
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.getRoleList();
        },
        methods: {

            jumpToAcount(){
                this.$router.push({path: '/systemAccountSetting'})
            },

            // 获取角色列表
            getRoleList: function(){
                let param = {};
                if (this.$store.getters.returnFlag) {
                    this.paging.pageNum = this.$store.getters.pageInfo.pageNum;
                    this.paging.pageSize = this.$store.getters.pageInfo.pageSize;
                    this.$store.dispatch('setFlag', false);
                };
                param = {
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                api.getRoleList(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            this.roleList =response.data.data.list;
                            this.paging.total = response.data.data.total;
                            this.paging.pageTotal = response.data.data.pages
                        }else {
                            this.$alert(response.data.message);
                        }
                    });
            },

            createRole: function(){
                this.$router.push({ path: '/systemCreateRole'});
            },
            editRole: function(id){
                let pageInfo = {
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize

                };
                this.$store.dispatch('setPageInfo', pageInfo);
                this.$router.push({ path: '/systemEditRole',query:{roleId:id} });

            },

            //提示框
            confirmDelete: function(id) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRole(id);
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            },

            //删除角色
            deleteRole: function(id){
                api.deleteRole(id).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$message({ type: 'success', message: '删除成功!' });
                            //当前页只有一条数据时显示前一页
                            if(this.roleList.length == 1 && this.paging.pageNum>1) {
                                this.paging.pageNum -= 1;
                                this.change(this.paging.pageNum);
                            }else{
                                this.getRoleList();
                            }

                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );

            },

            // 分页
            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                this.getRoleList();
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                this.getRoleList();
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

            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            navigationList() {
                return [{ name: '系统设置' }, { name: '角色设置' }]
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
    .simplesearch_rowstyle{ min-width: 800px; }
    .btn{
        margin-left: 30px;
    }
    .paging_analyze{
        margin-right: 20px;
        float: right;
    }
    .set_btnStyle{
        border:1px solid #0ca3d2;
    }
</style>
