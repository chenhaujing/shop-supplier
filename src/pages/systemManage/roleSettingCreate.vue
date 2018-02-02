<template>
    <div>
          <!--面包屑导航-->
        <div class="crumbs">
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        </div>
        <hr>
        <div class="containers">
            <div class="container-title">
                <label>角色名称</label>
                <el-input placeholder="请输入角色名称" v-model.trim="roleData.roleName"></el-input>
            </div>
            <div class="container-discribe">
                <p> 说明：</p>
                <p> 1、具备该角色的用户登录后显示操作员工作台；</p>
                <p> 2、修改角色权限后，所有赋予此角色的员工账号对应权限均将修改；</p>
                <p> 3、系统管理员角色不允许改名，也不允许修改其操作权限。</p>
            </div>
        </div>
        <div class="container-main">
            <el-col :span="6"><div class="grid-content">权限明细</div></el-col>
            <el-col :span="12">
                <div class="tree-style">
                    <el-tree :data="permissionTreeList" show-checkbox :default-expand-all="true" node-key="id" ref="tree" highlight-current> </el-tree>
                </div>
            </el-col>
        </div>
        <div class="container-bottom">
            <div class="footer">
                <el-button type="primary" @click="saveRole">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
                <el-button type="info" @click="back">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
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
                roleData:{
                    roleName:'',
                },
                permissionTreeList:[],// 查询全部权限-树状结构返回
                checkedPermissions:[],//获取选中的权限项
                checkIds:[],//根据选中的权限递归返回所有权限id
            }
        },
        created() {
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.accountId = this.$route.query.accountId;
            this.getPermissionsTree();
        },
        methods: {
            // 查询所有权限树状结构返回
            getPermissionsTree(){
                let params = 0;
                api.getAllPermissionsTree(params).then((response) => {
                    if (response.data.code == 1) {
                        // console.log(response.data.data.permissions);
                        this.permissionTreeList = response.data.data.permissions;
                    } else {
                        this.$alert(response.data.message)
                    }
                })
            },

            // 新增角色
            saveRole() {
                if (!this.roleData.roleName) {
                    this.$alert('角色名称不能为空!');
                    return;
                }
                if (this.roleData.roleName && this.roleData.roleName.length > 20) {
                    this.$alert('角色名称不能大于20个字!');
                    return;
                }
                if(this.$refs.tree.getCheckedKeys().length===0){
                    this.$alert('权限不能为空!');
                    return;
                }
                let that = this;
                this.checkedPermissions = this.$refs.tree.getCheckedKeys();
                for (var i = 0; i < this.checkedPermissions.length; i++) {
                    that.getChildIds(that.permissionTreeList,this.checkedPermissions[i]);
                };
                // 数组去重
                let ids = [];
                for(var i = 0; i < this.checkIds.length; i++){
                    if(ids.indexOf(this.checkIds[i]) == -1){
                        ids.push(this.checkIds[i]);
                    }
                }
                let params = {
                     name : this.roleData.roleName,
                     permissionsIds: ids,
                    //  permissionsIds: this.$refs.tree.getCheckedKeys(),
                };
                api.createRole(params).then((response) => {
                    if (response.data.code == 1) {
                        this.$message({ type: 'success', message: '添加成功!' });
                        this.back();
                    } else {
                        this.$alert(response.data.message);
                    }
                })
            },
            //递归方法
            getChildIds(json,item) {
                let that = this;
                //1.第一层 root 深度遍历整个JSON
                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                     //2.有节点就开始找，一直递归下去
                    if (obj.id == item) {
                        if(obj.parentId===0){
                            that.checkIds.push(obj.id);
                        }else{
                            that.checkIds.push(obj.id);
                            that.checkIds.push(obj.parentId);
                            // 如果查找到子节点的父节点，则递归到继续反差改父节点的父节点知道顶级
                            that.getChildIds(this.permissionTreeList, obj.parentId);
                        }
                    }else{
                        if (obj.children) {
                            //3.如果有子节点就开始找
                            that.getChildIds(obj.children, item);
                        }else {
                            //跳出当前递归，返回上层递归
                            continue;
                        }
                    }
                    //没有就下一个
                    if (!obj || !obj.children) {
                        continue;
                    }
                }
            },

            /**
             * 返回方法
             * */
            back() {
                this.$router.push({ path: 'systemRoleSetting' });
            }
        },
        computed: {
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            navigationList() {
                return [{ name: '系统设置' }, { name: '角色设置' ,route: { path: '/systemRoleSetting'}}, { name: '添加角色' }]
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
</style>
