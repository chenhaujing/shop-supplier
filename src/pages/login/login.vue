<template>
    <div class="login-bg">
        <div class="">
            <div class="loginBg">
                <img src="../../../static/img/loginBg.jpg" alt="">
            </div>
            <div class="logoTy">
                <img src="../../../static/img/logoTy.png" alt="">
            </div>
            <div class="login">
                <h1>透云平台供应商管理系统</h1>
                <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                         class="card-box login-form">
                    <el-form-item prop="username">
                        <el-input class="inputPer" name="username" type="text" v-model="loginForm.username"
                                  autoComplete="on" placeholder="手机号码/用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="inputPas" name="password" type="password" @keyup.enter.native="handleLogin"
                                  v-model="loginForm.password" autoComplete="on"
                                  placeholder="密码"></el-input>
                    </el-form-item>
                        <el-form-item class="login_password">
                            <router-link to="/forgetPassword" class="login_forgetPassword">忘记密码
                            </router-link>
                            <!--<input type="button" name="commit" value="登录" @click="handleLogin">-->
                            <el-button type="primary" style="width: 100%"  @click="handleLogin" class="login_button">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                        </el-form-item>
                </el-form>
            </div>
            <div class="loginTip">
                <p>温馨提示：供应商登录密码通过短信发送至签约登记手机号码，请注意查收。</p>
                <!--<a href="https://m.kuaidi100.com/" target="_blank">快递查询</a>-->
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

    import '../../../static/css/login.css'

    export default {
        data() {

            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, trigger: 'blur', validator: this.validateUserName}
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: this.validatePass}
                    ]
                }
            }
        },
        created() {

        },
        methods: {

            validateUserName(rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入手机号码/用户名'))
                } else {
                    callback()
                }
            },
            validatePass(rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            },

            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
//                        let param = '?username=' + this.loginForm.username + '&password=' + this.loginForm.password
                        let param = {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        }
                        api.login(param).then(res => {
                            if (res.status == 200) {
                                let data = res.data
                                if (data.code == 1) {
                                    let dataInfo = data.data
                                    globalData.globalToken = dataInfo.token
//                                    localStorage.setItem('token', dataInfo.token)
//                                    localStorage.setItem('account', JSON.stringify(dataInfo.user))
                                    this.$store.dispatch('setToken',dataInfo.token);
                                    this.$store.dispatch('setAccount',dataInfo.user);
                                    api.getPermissions().then((response) => {
                                        if (response.data.code == 1) {
                                            if (dataInfo && dataInfo.user) {
                                                //后台数据
                                                this.$store.dispatch('updatePermissionslist',response.data.data.permissions);
                                            }
                                        } else {
                                            this.$alert(response.data.message)
                                        }
                                    });
                                    api.getMenus().then((response) => {
                                        if (response.data.code == 1) {
                                            let menuList = response.data.data.permissions;
                                            this.$store.dispatch('updateMenus',menuList);
                                            if(menuList&&menuList.length>0){
                                                if(menuList[0].children){
                                                    this.$router.push('/'+menuList[0].children[0].index)
                                                }else {
                                                    this.$router.push('/'+menuList[0].index)
                                                }
                                            }
                                        } else {
                                            this.$alert(response.data.message)
                                        }
                                    })
                                } else {
                                    this.$alert(data.message)
                                }
                            }
                        }).catch(function (msg) {
                            console.log('error message is ' + msg)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>
