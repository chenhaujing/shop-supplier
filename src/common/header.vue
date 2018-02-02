<template>
    <div class="header">
        <div class="logo">
            <img src="../../static/img/logoTy.png" alt="">
        </div>
        <div class="header_message">
            <img src="../../static/img/icon/notice.png" alt="">
            <!-- 这里必须是原生绑定方式，否则this指向会被改变，对应的方法找不到 -->
            <marquee class="header_showMessage" scrollamount="2" onMouseOver="this.stop();" onMouseout="this.start();">
                {{showMessage}}
            </marquee>
        </div>
        <div class="user-setting">
            <el-dropdown trigger="click" @command="handleCommand" style="margin-right: 50px;">
                <img src="../../static/img/icon/account.png" alt="" ref="supplierStatus">
                <span class="el-dropdown-link">{{loginName||'ty'}}</span>
                <span v-show="loginNumber==2">已禁用</span>
            </el-dropdown>
            <el-badge :max="99" :value="messageCount" class="user-item" v-show="isAdmin == 0">
                <el-button type="text" @click="messageMethod" v-has:messageSend>
                    <img style="width: 30px;height: 30px;" src="../../static/img/icon/message.png" />
                </el-button>
            </el-badge>
            <!--组件滑动效果-->
            <!-- <el-dropdown trigger="click" @command="handleCommand" class="user-set"> -->
            <!-- 权限控制 齿轮菜单动态展示  -->
            <el-dropdown trigger="click" class="user-set">
                <img style="width: 30px;height: 30px;" src="../../static/img/icon/set.png">
                <el-dropdown-menu slot="dropdown" class="user-seting-model header_position">
                    <div v-for="item in menus" :key="item.index">
                        <div v-if="item.children && (item.code ==='1218000000000' || item.code ==='2216000000000')">
                            <!-- <el-dropdown-item v-for="subItem in item.children" :key="subItem.index" :command="subItem.index">
                                {{subItem.label}}
                            </el-dropdown-item> -->
                            <router-link v-for="subItem in item.children" :key="subItem.index" :to="{path:subItem.index}" >
                                <el-dropdown-item>{{subItem.label}}</el-dropdown-item>
                            </router-link>
                        </div>
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" @command="handleCommand" class="user-logout">
                <img style="width: 30px;height: 30px;" src="../../static/img/icon/exit.png" class="user-seting">
                <el-dropdown-menu class="header_exitSet" slot="dropdown" style="left:94%!important;">
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--组件滑动效果-->
        <div class="slide_box">
            <transition name="slide-fade">
                <message v-if="showMsg" v-on:messageComponent="messageMethod"></message>
            </transition>
        </div>

    </div>
</template>
<script>
    import message from '../pages/messageManage/message';
    import axios from 'axios';
    import _$ from 'jquery';
    import api from '../api';
    import {mapGetters} from 'vuex';

    export default {
        data () {
            return {
//                name: 'linxin',
                loginName: null,
                token: null,
//                userPermission: {},
                messageComponent: null,     //message子组件会传递这个参数
                messageCount: null,          //子组件会传递这个参数
                showMsg: false,
                isPolling: true,
                showMessage: null,          //用于接收跑马灯信息
                isAdmin: '',
                loginNumber: '',

            };
        },
        computed: {
//            username () {
//                let username = localStorage.getItem('ms_username');
//                return username ? username : this.name;
//            },
             ...mapGetters([
                'menus',
                'permissionList',
            ]),
        },

        created () {
            this.getUserInfo();
//            this.getUserPermission()
            this.executeChildrenComponent();
            this.getShowmessage();
//
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
//            this.loginNumber =JSON.parse(localStorage.getItem('account')).userStatus
//            this.supplierId  = JSON.parse(localStorage.getItem('account')).accountId


            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.loginNumber =JSON.parse(sessionStorage.getItem('vuex')).user.account.userStatus
            this.supplierId  = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId
        },
        methods: {
            /*跑马灯*/
            getShowmessage () {
                let that = this;
                api.getMessage()
                    .then(function (res) {
                        that.showMessage = res.data.data;
                    });
            },
            // 齿轮设置 临时方案
            handleCommand (command) {
                if (command == 'loginout') {
//                    api.logout().then(res => {
//                        localStorage.removeItem('token');
//                        localStorage.removeItem('account');
                        sessionStorage.removeItem('vuex');
                        this.$router.push('/login');
//                    });
                } else if (command == 'passwordUpdate') {
                    this.$router.push('/updatePassword');
                } else if (command == 'commonSupplierInfoEdit') {
                    this.$router.push({path:'/commonSupplierInfoEdit',query:{accountId:this.supplierId}});
                }
                // else if (command == 'updatePassword') {
                //     this.$router.push('/updatePassword');
                // } else if (command == 'systemAuxiliarySetting') {
                //     this.$router.push('/systemAuxiliarySetting');
                // } else if (command == 'systemStaffList') {
                //     this.$router.push('/systemStaffList');
                // }else if(command == 'systemDistributionScope'){
                //     this.$router.push('/systemDistributionScope');
                // }else if(command == 'systemFreightRules'){
                //     this.$router.push('/systemFreightRules');
                // }else if(command == 'systemAccountSetting'){
                //     this.$router.push('/systemAccountSetting');
                // }else if(command == 'productCoupleBack'){
                //     this.$router.push('/productCoupleBack');
                // }else if(command == 'systemRoleSetting'){
                //     this.$router.push('systemRoleSetting');
                // }
            },
            getUserInfo () {
//                let token = window.localStorage.getItem('token');
                api.getUserInfo()
                    .then(
                    (response) => {
                        if (response.data.code == 1) {
                            this.loginName = response.data.data.username
                        } else if (response.data.code == 0) {
                        }
                    }
                );
            },

            /**
             * 消息模块调用的方法，让子模块是否显示消失
             */
            messageMethod: function () {
                this.showMsg = !this.showMsg;
            },
            /**
             * 页面渲染的时候执行一次子组件，为了获取系统消息
             */
            executeChildrenComponent: function () {
                let time = window.setInterval(() => {
                    if (this.isPolling) {
                        this.getMessageCount();
                    }
                }, 180000);

                return time;
            },
            /**
             * 清除时间对象
             */
            clearTime: function () {
                this.isPolling = false;
                let time = this.executeChildrenComponent();
                window.clearTimeout(time);
            },
            /**
             * 执行子组件方法【消息的获取使用轮询，不触发】
             */
            getMessageCount: function () {
                api.getMessageCount()
//                axios({
//                    url: '/notification/getTotal',
//                    method: 'get'
//                })
                    .then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.messageCount = response.data.data;
                        }
                    }
                );
            }
        },

        destroyed: function () {
            this.clearTime();
        },

        components: {
            message: message
        }

    };
</script>
<style>
    /*animate*/
    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .5s ease;
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }

    .user-setting {
        position: absolute;
        right: 2%;
        top: 0;
    }

    .user-setting img {
        width: 30px;
        height: 30px;
    }

    .user-setting span {
        padding-left: 5px;
        margin-bottom: -5px;
        color: white;
    }

    .user-item, .user-set, .user-logout {
        margin-right: 2rem;
        cursor: pointer;
    }

    .user-item {
        margin-top: 3px;
    }

    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: #242f42;
    }

    .header .logo {
        float: left;
        width: 30%;
        text-align: left;
    }

    .header .logo img {
        width: 140px;
        margin-right: 20px;
        vertical-align: middle;
        margin-top: -5px;
        margin-left: 10px;
    }

    .header .logo span {
        display: inline-block;
        vertical-align: bottom;
    }

    .user-info {
        float: left;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
        margin-left: -250px;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .header_showMessage {
        width: 80%;
        font-size: 1.2rem;
        vertical-align: top;
        margin-left: 10px;
    }

    marquee {
        display: inline-block;
        width: 20%;
    }

    .user-info > .el-dropdown {
        margin-left: -180px;
    }

    .header_position {
        left: 90.5% !important;
    }

    .header_exitSet {
        left: 93.5% !important;
    }

    .message .user-content {
        border: none !important;
    }

    .message {
        /*top: 70px;*/
    }

    .header_message {
        width: 40%;
        float: left;
    }

    .header_message > img {
        width: 25px;
        height: 25px;
    }
</style>
