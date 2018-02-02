<template>
    <div class="forget-bg">
        <img src="../../../static/img/loginBg.jpg" alt="" class="password_login">
        <img style="text-align: center;" src="../../../static/img/logoTy.png" alt="" class="password_bg">
        <!-- 第一行登录页面内容-->
        <p class="ty_system">透云平台供应商管理系统</p>

        <!--表单内容-->
        <div style="width: 600px;margin: 0 auto;overflow: hidden;text-align: center;padding-left:40px;">
            <span style="float: left;line-height: 34px;margin-right: 20px;">手机号码</span>
            <input type="text" class="form-control" placeholder="请输入您的手机号码" v-model="telnum"
                   style="width: 50%;float:left;margin-right: 20px;"/>
            <button class="btn btn-warning" style="float:left;" @click="sendMsg()">发送短信</button>
            <router-link to="login">
                <button class="btn btn-success">返回</button>
            </router-link>
        </div>
        <div style="width: 600px;margin: 0 auto;text-align: center;">
            <p class="password_warn">温馨提示：密码会通过短信发送至手机，请注意查收</p>
            <p>
            <p style="font-size: 16px;color:#59acff">客服电话：021-888888</p>
        </div>
    </div>
</template>
<script>
    import '../../../static/css/forgetPassword.css'
    import Vue from 'vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                telnum: '',
                token: null
            }
        },
        created: function () {
//            this.token = window.localStorage.getItem('token')
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
        },
        methods: {
            sendMsg: function () {
                if ((/^1[3|4|5|7|8]\d{9}$/.test(this.telnum)) == true) {
                    let token = this.token
                    axios({
                        method: 'get',
                        url: '/account/findPassword/' + this.telnum,
                        headers: {'Authorization': token}
                    }).then(
                        (response) => {
                            if (response.data.code == 1) {
                                this.$alert(response.data.message)
                            } else {
                                this.$alert(response.data.message)
                            }

                        }
                    )
                } else {
                    this.$alert('请输入正确的手机号码')
                }
            }
        }
    }
</script>
