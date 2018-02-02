<template>
    <div>
        <!--面包屑导航-->
        <div class="crumbs">
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        </div>
        <hr>
        <div class="containers">
             <div class="container-title">
                 <el-col>
                    <label>手机号码</label>
                    <el-input placeholder="请输入手机号码" v-model.trim="userData.loginName"></el-input>
                 </el-col>
             </div>
             <div class="container-title">
                <el-col>
                    <label>用户姓名</label>
                    <el-input placeholder="请输入用户姓名" v-model.trim="userData.userName"></el-input>
                 </el-col>
             </div>

            <div class="container-main">
                <el-row>
                    <div class="grid-content">
                        <label>权限设置:</label>
                        <p>权限与角色关联，选择该账号的角色可完成权限设置</p>
                    </div>
                </el-row>
                <el-row>
                    <div class="grid-content">
                        <label>账号权限</label>
                        <el-select v-model="roleData.id" placeholder="请选择" @change="checkedRoles">
                            <el-option v-for="item in roleList":key="item.id":label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </el-row>
            </div>
            <div class="container-main">
                <div class="tree-style">
                    <el-tree :data="permissionTreeList" :default-expand-all="true" show-checkbox :check-strictly="false" node-key="id" ref="tree" highlight-current></el-tree>
                </div>
            </div>

            <div class="container-bottom">
                <div class="footer">
                    <el-button type="primary" @click="saveUser">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
                    <el-button type="info"  @click="back">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                </div>
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
                // 子账号对象
                userData:{
                    loginName:'',
                    userName:'',
                },
                // 角色详情
                roleData:{
                    id:'',
                    roleName:'',
                    permissionIds:[],
                },
                roleList:[], //角色列表
                searchCondition: {status: null},
                permissionTreeList:[],// 查询全部权限
            }
        },

        created() {
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.token = localStorage.getItem('token');
            // this.accountId = this.$route.query.accountId;
            this.searchRoleList();
        },
        methods: {
            //查询角色列表
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
                        this.$refs.tree.setCheckedKeys(this.roleData.permissionIds);
                    } else {
                        this.$alert(response.data.message)
                    }
                })
            },
            //角色选择方法
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
            // 新建子账号
            saveUser: function () {
                if (!this.userData.loginName) {
                    this.$alert('手机号码不能为空!');
                    return;
                }
                let accountPhone = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                if (!(accountPhone).test(this.userData.loginName)) {
                    this.$alert('手机号码填写有误！');
                    return;
                }
                if (!this.userData.userName) {
                    this.$alert('用户姓名不能为空!');
                    return;
                }
                if (this.userData.userName && this.userData.userName.length > 20) {
                    this.$alert('用户姓名不能大于20个字符!');
                    return;
                }
                if (!this.roleData.id) {
                    this.$alert('账号权限不能为空!');
                    return;
                }

                let params = {
                    loginName: this.userData.loginName,
                    userName: this.userData.userName,
                    roleIds: [this.roleData.id],
                };
                api.addUser(params).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$message({ type: 'success', message: '添加成功!' });
                            this.back();
                        }else{
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            back() {
                this.$router.push({ path: 'systemAccountSetting'  });
            },

        },
        components: {
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
                return [{ name: '系统设置' }, { name: '账号设置',route: { path: '/systemAccountSetting'} },{ name: '新增账号'}]
            }

        }
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
</style>
