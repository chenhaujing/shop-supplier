﻿<template>
    <div>
        <!--面包屑导航-->
        <div class="crumbs">
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        </div>
        <hr>
        <div class="containers">
            <div class="container-title">
                <label>手机号码</label>
                <el-input v-model.trim="this.accountInfo.loginName" :disabled="true"></el-input>
                <el-button type="primary" @click="modify">修改密码</el-button>
            </div>
            <div class="container-title">
                <label>用户姓名</label>
                <el-input placeholder="" v-model.trim="accountInfo.userName"></el-input>
            </div>
            <!-- 修改密码弹出框 -->
            <el-dialog title="修改密码" :visible.sync="updatadialog" :close-on-press-escape="true" label-width="20px" size="tiny">
                <el-form>
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model.trim="accountInfo.loginName" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form class="resetpwd">
                    <el-form-item label="设置新密码" :label-width="formLabelWidth">
                        <el-input  type="password" v-model.trim="userData.password" autoComplete="on" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                </el-form>
                <el-form class="resetpwd">
                    <el-form-item label="确认新密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model.trim="userData.confirmPassword" autoComplete="on" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="confirms">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
                    <el-button type="info" @click="updatadialog = false">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                </div>
            </el-dialog>

        </div>
        <div class="container-main">
            <el-row>
                <el-col>
                    <div class="grid-content">
                        <label>权限设置:</label>
                        <p>权限与角色关联，选择该账号的角色可完成权限设置</p>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <div class="grid-content">
                        <label>账号权限</label>
                        <el-select v-model="roleData.id" placeholder="请选择" @change="checkedRoles">
                            <el-option v-for="item in roleList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="container-main">
            <div class="tree-style">
                <el-tree :data="permissionTreeList" :default-expand-all='true' show-checkbox node-key="id" ref="tree" highlight-current></el-tree>
            </div>
        </div>
        <div class="container-bottom">
            <div class="footer">
                <el-button type="primary" @click="updateAccount">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
                <el-button type="info"  @click="back">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
            </div>
        </div>

    </div>

</template>
<script>
    import Vue from 'vue';
    import api from '../../api';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import '../../../static/css/accountSetting.less';


    export default {
         data: function() {
            return{
                userId: '',
                userData: {
                    loginName:'',
                    userName:'',
                    password: '',
                    confirmPassword: '',
                },
                checkList: ['选中且禁用','复选框 A'],
                // 角色详情
                roleData: {
                    id:'',
                    roleName:'',
                    permissionIds:[],
                },
                roleList: [], //角色列表
                permissionTreeList: [],// 查询全部权限
                updatadialog: false,
                accountInfo : {},
                searchCondition: {status: null},
                formLabelWidth: '160px'

            }
        },

        created() {
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.userId = this.$route.query.userId;
            this.searchSubAccount();
            this.searchRoleList();
            this.getPermissionsTree();
        },
        methods: {
            // 查询子账号列表
            searchSubAccount: function () {
                let uerId = this.userId;
                api.getAccountById(uerId).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.accountInfo = response.data.data;
                            this.roleData.id = Number(response.data.data.roleId);
                        } else {
                            this.$alert(response.data.message)
                        }
                    }
                );
            },
            // 查询角色列表
            searchRoleList:function () {
                api.getRoleSelect().then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.roleList = response.data.data;
                        } else {
                            this.$alert(response.data.message)
                        }
                    }
                );
            },
            // 查询所有权限数据
            getPermissionsTree(){
                let params = 1;
                api.getAllPermissionsTree(params).then((response) => {
                    if (response.data.code == 1) {
                        // console.log(response.data.data.permissions);
                        this.permissionTreeList = response.data.data.permissions;
                    } else {
                        this.$alert(response.data.message)
                    }
                })
            },
            // 根据角色id查询
            getPermissionsByRoleId(roleId){
                api.getRoleById(roleId).then((response) => {
                    if (response.data.code == 1) {
                        // console.log(response.data.data)
                        this.roleData.permissionIds = response.data.data.permissionIds;
                        //设置选中的权限数据
                        this.$refs.tree.setCheckedKeys(response.data.data.permissionIds);
                        // this.setCheckedKeys();
                    } else {
                        this.$alert(response.data.message)
                    }
                })
            },
            //角色默认选中方法
            checkedRoles() {
                let roleId = this.roleData.id;
                if (roleId) {
                    this.getPermissionsTree();
                    this.getPermissionsByRoleId(roleId);
                }
            },
            // 设置选中节点
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys(this.roleData.permissionIds,false);
            },
            //
            confirms(){
                if(!this.userData.password){
                    this.$alert('密码不能为空')
                    return;
                }
                if (this.userData.password.length < 6 || this.userData.password.length > 8) {
                    this.$alert('密码只能输入6-8位字符!');
                    return;
                }
                if(this.userData.password == this.userData.confirmPassword){
                    this.saveMessage();
                }else {
                    this.$alert('两次输入的密码不一致')
                }
            },
            saveMessage(){
                let params = {
                    userId: this.userId,
                    loginPassword: this.userData.password,
                    loginName : this.accountInfo.loginName
                };
                api.updataPass(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$alert('密码修改成功' );
                            this.updatadialog =false;
                        }else{
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            // 修改账号
            updateAccount(){
                if (!this.accountInfo.userName) {
                    this.$alert('用户姓名不能为空!');
                    return;
                }
                if (this.accountInfo.userName && this.accountInfo.userName.length > 20) {
                    this.$alert('用户姓名不能大于20个字符!');
                    return;
                }
                if (!this.roleData.id) {
                    this.$alert('账号权限不能为空!');
                    return;
                }
                let params = {
                    userId: this.userId,
                    loginName: this.accountInfo.loginName,
                    userName: this.accountInfo.userName,
                    roleIds: [this.roleData.id],
                };
                api.updateAccountById(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$message({ type: 'success', message: '修改成功!' });
                            this.$router.push({path: '/systemAccountSetting'});
                        }else{
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            modify (){
                this.updatadialog =true;
            },
            back() {
                this.$store.dispatch('setFlag', true);
                this.$router.push({ path: 'systemAccountSetting'});
            },

        },
        computed: {
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            navigationList() {
                return [{ name: '系统设置' }, { name: '账号设置',route: { path: '/systemAccountSetting'} }, { name: '修改账号' }]
            }
        },
        components: {
            mybreadcrumb
        },

    }
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
    .resetpwd{
        margin: 10px 0px;
    }
</style>
