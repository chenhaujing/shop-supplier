﻿<template>
    <div>
        <div>
            <el-breadcrumb>
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/systemStaffList'}">员工设置</el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">添加新账号</a></el-breadcrumb-item>
            </el-breadcrumb>
            <hr>
        </div>

        <div class="addStaff_divWrap">
            <div class="addStaff_setting">添加员工</div>
        </div>
        <div class="addStaff_inputWrap">
            <div class="row addStaff_row_bottom">
                <div class="addStaff_row_center">
                    <label>手机号:</label>
                    <input type="text" v-model="staff.empTel" class="el-input__inner col-xs-7 "
                           placeholder="请输入手机号">
                </div>
            </div>
            <div class="row addStaff_row_bottom">
                <div class="addStaff_row_center">
                    <label>姓名:</label>
                    <input type="text" v-model="staff.empName" class="el-input__inner col-xs-7 "
                           placeholder="请输入姓名">
                </div>
            </div>
            <div class="row addStaff_row_bottom">
                <div class="addStaff_row_center">
                    <el-form :inline="true" class="demo-form-inline">
                        <label>性别:</label>
                        <el-select v-model="staff.empSex" class="col-xs-7 clearPadding">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="0"></el-option>
                        </el-select>
                    </el-form>
                </div>
            </div>
                <div class="clearfix">
                    <div class="addStaff_buttonOne fl">
                        <el-button @click="goBack" type="warning">取&nbsp;&nbsp;消</el-button>
                    </div>
                    <div class="addStaff_buttonTwo fl">
                        <el-button @click="save" type="success">保&nbsp;&nbsp;存</el-button>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import axios from 'axios'
    import globalData from '../../common/global'
    import api from '../../api'
    import '../../../static/css/addStaff.css'

    export default {
        data() {
            return {
                staff: {empTel: null, empName: null, empSex: null}
            }
        },
        created() {

        },
        methods: {
            save: function () {
                if (!(/^1[34578]\d{9}$/.test(this.staff.empTel))) {
                    this.$alert('手机号码输入有误!');
                    return
                }
                if (!this.staff.empName) {
                    this.$alert('员工姓名不能为空!');
                    return
                }
                if (!this.staff.empName.length > 50) {
                    this.$alert('员工姓名不能大于50字符!');
                    return
                }
                if (!this.staff.empSex) {
                    this.$alert('员工性别不能为空!');
                    return
                }
                axios({
                    url: '/emp/create',
                    method: 'put',
                    data: this.staff
                }).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.staffs = response.data.data
                            this.$router.push({path: '/systemStaffList'})
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message)
                        }
                    }
                )
            },
            goBack: function () {
                this.$router.go(-1)
            }
        }
    }
</script>
