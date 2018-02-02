<template>
    <div class="changePassword_bg">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <a href="javascript:location.reload();">修改密码</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="centerParent">
            <p>密码修改</p>
        </div>

        <div class="password" v-show="sure">
            <div class="row updatePassword_content">
                <div class="col-xs-2 col-xs-offset-1">
                    <span class="tel_num">手机号码</span>
                </div>
                <div class="col-xs-6">
                    <el-input  v-model="telnum" :placeholder="userTel" disabled
                               :value="userTel"></el-input>
                </div>
            </div>
            <div class="row updatePassword_content">
                <div class="col-xs-2 col-xs-offset-1">
                    <span class="tel_num">验证码</span>
                </div>
                <div class="col-xs-3">
                    <el-input  placeholder="请输入验证码" v-model="confirmCode"></el-input>
                </div>
                <div class="col-xs-3">
                    <el-button type="info"  @click="confirm()" ref="sendconfirmCode" :disabled="sendCode">发送验证码
                    </el-button>
                </div>
            </div>
            <div class="row updatePassword_content">
                <el-button style="display:block;margin: 0 auto;" type="info" aria-hidden="true" @click="toggle()">下一步
                </el-button>
            </div>
        </div>
        <div class="updatePassword_changePassword" v-show="end">
            <div class="row updatePassword_content">
                <div class="col-xs-2 updatePassword_newPassword">
                    <p class="update_pwd">输入新密码</p>
                </div>
                <div class="col-xs-6 col-xs-offset-1 updatePassword_input">
                    <el-input type="password" placeholder="请输入6--8位密码" v-model="newcode"></el-input>
                </div>
            </div>
            <div class="row updatePassword_content">
                <div class="col-xs-2 updatePassword_newPassword">
                    <p class="update_pwd">确认密码</p>
                </div>
                <div class="col-xs-6 updatePassword_input">
                    <el-input  type="password" placeholder="请输入密码" v-model="confirmNewcode"></el-input>
                </div>
            </div>
            <div class="row updatePassword_finish">
                <el-button style="display:block;margin: 0 auto;" type="info" @click="toggle2()">完成</el-button>
            </div>
        </div>
        <div v-show="close" class="updatePassword_changePassword">
            <div>
                <div class="update_password">密码修改成功</div>
            </div>
            <div class="row updatePassword_finishTwo">
                <div class=" col-lg-3 col-lg-offset-6">
                    <el-button type="info" @click="toggle3()">完成</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../../../static/css/updatePassword.css'
    import api from '../../api/account'
    import Vue from 'vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                sendCode:false,
                mistake: false,
                token: null,
                telnum: '',
                userTel: '',
                sure: true,
                end: false,
                close: false,
                confirmCode: '',
                coder: 1,
                newcode: '',
                confirmNewcode: '',
                timer: ''
            }
        },
        created: function () {
//            this.token = window.localStorage.getItem('token')
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.getPhone()
        },
        methods: {
            getPhone() {
//                let that =this
                api.getUserPhone().then(res => {
                    if (res.data.code == 1) {
                        this.userTel = res.data.data
                    }
                })
            },
            confirm: function () {
                //send_confirmCode 发送验证码
                this.sendCode = true;
                let that = this;
                let count = 30;
                that.timer = setInterval(function () {
                    count--
                    if (that.$refs.sendconfirmCode) {
                        that.$refs.sendconfirmCode.innerHTML = '发送验证码' + count + '(s)';
                        if (count == 0) {
                            that.sendCode=false;
                            that.$refs.sendconfirmCode.innerHTML = '发送验证码';
                            clearInterval(that.timer)
                        }
                    } else {
                        clearInterval(that.timer)
                    }
                }, 1000);
                if ((/^1[3|4|5|7|8]\d{9}$/.test(this.userTel)) == true) {
                    api.confirm()
//                    axios({
//                        method: "get",
//                        url: '/account/sendCode',//v0.9不需要手机号码
//                    })
                        .then(
                        (response) => {
                            if(response.data.code==1){
                                this.$alert(response.data.message);
                            }
                        }
                    )
                } else {
                    this.$alert('请输入正确的电话号码')
                }

            },
            toggle: function () {
                if (this.confirmCode) {
                    api.toggle(this.confirmCode)
//                    let token = this.token
//                    axios({
//                        method: "get",
//                        url: '/account/verifySmsCode/' + this.confirmCode,
//                        headers: { 'Authorization': token }
//                    })
                        .then(
                        (response) => {
                            if (response.data.code == 1) {
                                this.sure = !this.sure
                                this.end = !this.end
                            } else {
                                this.$alert(response.data.message)
                            }
                        }
                    )
                } else {
                    this.$alert('验证码不能为空')
                }
            },
            toggle2: function () {
                let token = this.token
                let that = this
                if (this.newcode.length < 6 || this.newcode.length > 8) {
                    this.$alert('密码只能输入6-8位字符!');
                    return;
                }

                if (this.newcode == this.confirmNewcode) {
                    let data={
                        encodedPassword: this.newcode
                    }
                    api.updatePassword(data)
//                    axios({
//                        method: "post",
//                        url: '/account/updatePassword',
//                        data: {
//                            encodedPassword: this.newcode
//                        }
//                    })
                        .then(
                        (response) => {
                            if (response.data.code == 1) {
                                let number = 3;
                                that.$alert('密码修改成功' + number + 's后跳转页面')
                                let updateTimer = setInterval(function () {
                                    number--
                                    if (number <= 0) {
                                        clearInterval(updateTimer)
                                        that.$router.push({ path: '/login' });
                                    }
                                }, 1000)
                            } else {
                                this.$alert(response.data.message)
                            }
                        }
                    )
                } else {
                    this.$alert('您两次输入的密码不一致!请重新确认')
                    this.confirmNewcode = ''
                    this.newcode = ''
                }
            },
            toggle3: function () {
                this.confirmCode = ''
                this.close = !this.close
                this.sure = !this.sure
            }
        }
    }
</script>


