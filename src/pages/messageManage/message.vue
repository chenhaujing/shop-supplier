<template>
    <div class="message">
        <el-tabs type="border-card" class="msg-tab" v-model="activelabel" @tab-click="getMessageList">
            <!--订单信息-->
            <el-tab-pane label="订单消息" name="order">
                <el-button type="text" @click="closeMessageComponent" v-has:messageSendOrderList>
                    <ul>
                        <li class="rel" v-for="orderMessage in orderMessageList">
                            <h5 class="text-center">{{orderMessage.createdAt}}</h5>
                            <router-link
                                :to="{path:'/orderDetail',query:{id:orderMessage.orderId,messageId: orderMessage.notifiId}}">
                                <div class="message_orderMessage">
                                    <div v-if="orderMessage.notifiStatus === 0"></div>
                                </div>
                                <div class="user-content">
                                    <p>{{orderMessage.title}}</p>
                                    <p>{{orderMessage.content}}</p>
                                </div>
                                <a href="javascript:;" class="abs glyphicon glyphicon-menu-right arrowLeft"></a>
                            </router-link>
                        </li>
                    </ul>
                </el-button>
            </el-tab-pane>
            <!-- 系统消息 -->
            <el-tab-pane label="系统消息" name="system">
                <!-- 固定部分，问题反馈入口 -->
                <el-button type="text" @click="closeMessageComponent" v-has:messageSysterm>
                    <ul>
                        <li class="rel system" v-for="systemMessage in systemMessageList">
                            <h5 class="text-center">{{systemMessage.createdAt}}</h5>
                            <router-link
                                :to="{path:'systemMessageDetail',query:{systemMessageId:systemMessage.notifiId}}">
                                <div class="message_systemMessage">
                                    <div v-if="systemMessage.notifiStatus === 0"></div>
                                </div>
                                <div class="user-content systemMsg" @click="closeMessageComponent">
                                    <p>{{systemMessage.notifiDetail}}</p>
                                </div>
                                <a href="javascript:;" class="abs glyphicon glyphicon-menu-right"></a>
                            </router-link>
                        </li>
                    </ul>
                </el-button>
            </el-tab-pane>
        </el-tabs>
        <el-button class="btn btn-default abs more" v-on:click.native="closeMessageComponent" @click="messageJump">查看全部消息</el-button>
        <!--<router-link :to="{path:'messageList',query: {activelabel: activelabel}}"-->
        <!-->
        <!--</router-link>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import globalData from '../../common/global';
    import api from '../../api/notification';

    // import '../../../static/css/login.css';


    export default {
        data() {
            return {
                activelabel: 'order',
                orderMessageList: [],
                systemMessageList: [],
                isPolling: true
            };
        },
        created() {
            this.getMessageList();
            this.pollingMessage();
        },
        methods: {
            //查看全部信息
            messageJump() {
                this.$router.push({path: 'messageList', query: {activelabel: this.activelabel}});
            },
            getOrderMessageList: function () {
                let obj = {
                    notifiType: 0,
                    count: 5
                };
//                axios({
//                    url: '/notification/searchUnread',
//                    method: 'get',
//                    params: {notifiType: 0, count: 5}
//                })
                api.getOrderMessageList(obj)
                    .then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.orderMessageList = response.data.data;
                            }
                        }
                    );
            },
            getSystemMessageList: function () {
                let obj = {
                    notifiType: 1, count: 5
                };
                api.getOrderMessageList(obj)
                //                axios({
                //                    url: '/notification/searchUnread',
                //                    method: 'get',
                //                    params: {notifiType: 1, count: 5}
                //                }).
                    .then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.systemMessageList = response.data.data;
                            }
                        }
                    );
            },
            getMessageList: function () {
                if (this.activelabel === 'order') {
                    this.getOrderMessageList();
                } else if (this.activelabel === 'system') {
                    this.getSystemMessageList();
                }
            },
            /**
             * 轮询消息
             */
            pollingMessage: function () {
                let time = window.setInterval(() => {
                    if (this.isPolling) {
                        this.getMessageList();
                    }
                }, 180000);
            },
            /**
             * 清除时间对象
             */
            clearTime: function () {
                this.isPolling = false;
                let time = this.pollingMessage();
                window.clearTimeout(time);
            },
            /**
             * 关闭消息组件
             */
            closeMessageComponent: function () {
                this.$emit('messageComponent', 0);
            }
        },
        destroyed: function () {
            this.clearTime();
        }
    };
</script>
<style>
    .message {
        /*        position: absolute;
                right: 0;
                z-index: 110;*/
        position: relative;
        background: #fff;
        width: 300px;
        color: #666;
        font-size: 14px;
        padding-bottom: 2rem;
        height: 620px;
    }

    .message > div:nth-child(1) {
        height: 620px;
        overflow: hidden;
    }

    .message .el-tabs__nav {
        width: 100%;
    }

    .message .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        width: 50%;
        text-align: center;
        float: left;
    }

    .message > div > div:nth-child(2) {

        width: 300px;
    }

    .message li {
        margin-bottom: 1rem;
    }

    .message .msg-tab {
        padding-bottom: 2rem;
        height: 440px;
    }

    .message .user-content {
        border: 1px solid #ccc;
        padding-left: 0.5rem;
        padding-top: 6px;
        overflow: hidden;
        width: 90%;
        display: inline-block;

    }

    .message .user-content p {
        height: 20px;
        line-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 230px;
        white-space: nowrap;
        float: left;
    }

    .message .user-content .message_sign {
        text-align: center;
    }

    .message .user-content + a, .message .user-content + .arrowLeft {
        color: #ccc;
        font-size: 16px;
        right: 0.5rem;
        top: 52%;
        font-weight: normal;
        text-decoration: none;
    }

    .message .user-content + .arrowLeft {
        top: 46%;
    }

    .system > a {
        top: 2.5rem;
    }

    .system > a > .message_systemMessage {
        width: 5%;
        display: inline-block;
    }

    .system > a > .message_systemMessage > div {
        /*margin-top: 100%;*/
        margin-top: -14px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: palevioletred;
    }

    .system > .text-center {
        background: #eee;
        line-height: 25px;
    }

    /*系统消息*/
    .message .feedback {
        border: 1px #eee solid;
    }

    .message .feedback p {
        height: 20px;
        line-height: 20px;
    }

    .message .more {
        bottom: 0;
        width: 100%;
    }

    .message > div > div:nth-child(2) > div:nth-child(2) {
        height: 570px;

    }

    .message > div > div:nth-child(2) > div:nth-child(2) li {
        margin-top: 10px;
    }

    .message > div > div:nth-child(2) > div:nth-child(2) li:first-child {
        margin-top: 0;
    }

    /*刘述修改的header中的message样式*/
    .message .el-tabs__content > .el-tab-pane:nth-of-type(2) {
        height: 385px;
    }

    /*定义通用样式*/
    .rel {
        position: relative;
    }

    .abs {
        position: absolute;
    }

    .rel > a {
        display: block;
        height: 60px;
    }

    .rel > .text-center {
        background: #eee;
        line-height: 25px;
    }

    .rel > a > .message_orderMessage {
        height: 100%;
        width: 5%;
        display: inline-block;
    }

    .rel > a > .message_orderMessage > div {
        margin-top: 100%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: palevioletred;
    }

    .header .el-tabs--border-card > .el-tabs__content {
        padding-top: 0;
    }

    .message .systemMsg.user-content p {
        margin: 0;
    }

    .message .systemMsg.user-content + a {
        top: 62%;
    }

    /*右上角滑动效果*/
    .header .slide_box {
        position: absolute;
        right: 0;
        top: 70px;
        z-index: 1000;
        overflow-x: hidden;
    }

</style>

