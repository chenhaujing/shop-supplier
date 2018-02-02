<template>
    <div id="staffList">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">员工设置</a></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="row clearMargin publicHeader">
                <div class="col-xs-3 clearPadding">
                    <label>状态:</label>
                    <div class="col-xs-8">
                        <el-select v-model="queryCondition.status" placeholder="请选择">
                            <el-option v-for="item in staffStatus"
                                       :key="item.key"
                                       :label="item.value"
                                       :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="col-xs-3 clearPadding">
                    <input v-model="queryCondition.empNameOrTel" type="text" placeholder="姓名／手机号"
                           class="el-input__inner"/>
                </div>
                <div class="col-xs-1"></div>
                <div class="col-xs-2 clearPadding">
                    <el-button type="info" @click="getStaffs()">查询</el-button>
                </div>
                <div class="col-xs-2 clearPadding">
                    <router-link :to="{path:'systemAddStaff'}">
                        <el-button type="success">添加账号</el-button>
                    </router-link>
                </div>
            </div>
            <div style="margin-top:20px;" class="row clearMargin">
                <table class="table table-bordered table-hover staffList_table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>手机号</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(staff,index) in staffs">
                        <td>{{index + 1}}</td>
                        <td>{{staff.empName}}</td>
                        <td>
                            <span v-show="staff.empSex == 1">男</span>
                            <span v-show="staff.empSex == 0">女</span>
                        </td>
                        <td>{{staff.empTel}}</td>
                        <td>
                            <span v-show="staff.empStatus == 0">禁用</span>
                            <span v-show="staff.empStatus == 1">启用</span>
                        </td>
                        <td>
                            <el-button size="small" v-if="staff.empStatus == 0" @click="updateStaffStatus(staff.id,'1')"
                                       type="success">
                                启用
                            </el-button>
                            <el-button size="small" v-if="staff.empStatus == 1" @click="updateStaffStatus(staff.id,'0')"
                                       type="warning">
                                禁用
                            </el-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <paging ref="page" :page-num="page.pageTotal" :current-page="page.pageNum" :pageSize='page.pageSize'
                        @change="change" v-on:changeR="changeRow"></paging>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import globalData from '../../common/global';
    import paging from '../../components/page';
    import api from '../../api';
    import '../../../static/css/staffList.less';

    export default {
        data () {
            return {
                staffs: [],
                page: {total: 1, pageTotal: 1, pageNum: 1, pageSize: 10},
                staffStatus: [{key: null, value: '全部'},{key: '0', value: '禁用'}, {key: '1', value: '启用'}],
                queryCondition: {status: null, empNameOrTel: null},
                isFirstPage: false
            };
        },
        created () {
            this.getStaffs();
        },
        methods: {
            /**
             * 获取所有用户
             */
            getStaffs: function () {

                this.isQueryFirstPage();

                //获取用户不需要员工id
                if (this.queryCondition.empId) {
                    this.queryCondition.empId = null;
                }

                //遍历所有的key,如果有空字符串就设置成null
                for (let key in this.queryCondition) {
                    if (!this.queryCondition[key]) {
                        this.queryCondition[key] = null;
                    }
                }
                //给查询条件增加分页参数
                for (let key in this.page) {
                    this.queryCondition[key] = this.page[key];
                }

                axios({
                    url: '/emp/findemp',
                    method: 'get',
                    params: this.queryCondition
                }).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.staffs = response.data.data.list;
                            console.log(this.staffs)
                            this.page.total = response.data.data.total;
                            this.page.pageTotal = response.data.data.pages;
                            this.page.pageNum = response.data.data.pageNum;
                            this.page.pageSize = response.data.data.pageSize;
                        }
                    }
                );
            },

            /**
             * 激活账号
             * @param id
             * @param status
             */
            updateStaffStatus: function (id, status) {
                axios({
                    url: '/emp/updateStatus',
                    method: 'put',
                    data: {empId: id, status: status}
                }).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.getStaffs();
                        }
                    }
                );
            },

            change: function (index) {
                this.page.pageNum = index;
                this.getStaffs();
            },
            //每页显示条数
            changeRow: function (row) {
                this.page.pageNum = 1;
                this.page.pageSize = row;
                this.getStaffs();
            },
            changeStatus: function () {
                this.page.pageNum = 1;
                this.getStaffs();
            },
            /**
             * 是否查询第一页
             */
            isQueryFirstPage: function () {
                if (this.isFirstPage) {
                    this.page.pageNum = 1;
                }
                this.isFirstPage = false;
            }
        },
        watch: {
            'queryCondition.status': {
                handler: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.changeStatus();
                    }
                }
            },
            'queryCondition.empNameOrTel': {
                handler: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.isFirstPage = true;
                    }
                }
            }
        },
        components: {
            paging
        }
    };
</script>
