<template>
    <div class="messageList_list">

        <el-breadcrumb v-show="activelabel === 'order'" separator="/">
            <el-breadcrumb-item>消息</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:location.reload();">订单消息列表</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-show="activelabel === 'system'" separator="/">
            <el-breadcrumb-item>消息</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:location.reload();">系统消息列表</a></el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs v-model="activelabel" type="card" @tab-click="changeTab" class="messageList_tab">
            <el-tab-pane label="订单消息" name="order" class="messageList_message">
                <div v-for="orderMessage in messageList">
                    <div class="messageList_signWrap">
                        <div v-if="orderMessage.notifiStatus === 0"></div>
                    </div>
                    <router-link
                        :to="{path:'/orderDetail',query:{id:orderMessage.orderId,messageId: orderMessage.notifiId}}">
                        <span class="messageList_text">{{orderMessage.notifiDetail}}</span>
                    </router-link>
                    <span class="messageList_time">{{orderMessage.createdAt}}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="系统消息" name="system" class="messageList_message">
                <div v-for="systemMessage in messageList">
                    <div class="messageList_signWrap">
                        <div v-if="systemMessage.notifiStatus === 0"></div>
                    </div>
                    <router-link :to="{path:'/systemMessageDetail',query:{systemMessageId:systemMessage.notifiId}}">
                        <span class="messageList_text">{{systemMessage.notifiDetail}}</span>
                    </router-link>
                    <span class="messageList_time">{{systemMessage.createdAt}}</span>
                </div>
            </el-tab-pane>
        </el-tabs>
        <paging ref="page" :page-num="page.pageTotal" :current-page="page.pageNum" :pageSize='page.pageSize'
                @change="change" v-on:changeR="changeRow"></paging>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import globalData from '../../common/global';
    import api from '../../api/notification'
    import paging from '../../components/page';
    import '../../../static/css/messageList.less';

    export default {
        data () {
            return {
                activelabel: 'order',
                messageList: [],
                systemMessageList: [],
                page: {total: 1, pageTotal: 1, pageNum: 1, pageSize: 10},
                queryCondition: {notifiType: null}
            };
        },
        created () {
            this.aggregateQuery();
        },
        methods: {
            requestMessage: function () {
                //给查询条件增加分页参数
                for (let key in this.page) {
                    this.queryCondition[key] = this.page[key];
                }
                let obj = this.queryCondition
//                axios({
//                    url: '/notification/getPage',
//                    method: 'get',
//                    params: this.queryCondition
//                }).
                api.requestMessage(obj)
                    .then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.messageList = response.data.data.list;

                            this.page.total = response.data.data.total;
                            this.page.pageTotal = response.data.data.pages;
                            this.page.pageNum = response.data.data.pageNum;
                            this.page.pageSize = response.data.data.pageSize;
                        }
                    }
                );
            },
            setMessageCondition: function () {
                let messageOption = {'order': '0', 'system': '1'};
                this.queryCondition.notifiType = messageOption[this.activelabel];
            },
            getQueryParame: function () {
                this.activelabel = this.$route.query.activelabel;
            },
            aggregateQuery: function () {
                this.getQueryParame();
                this.setMessageCondition();
                this.requestMessage();
            },
            /**
             * 改变table切换，使用实现
             */
            changeTab: function () {
                this.page.pageNum = 1;
                this.$router.push({path: '/messageList', query: {activelabel: this.activelabel}});
            },

            change: function (index) {
                this.page.pageNum = index;
                this.aggregateQuery();
            },
            //每页显示条数
            changeRow: function (row) {
                this.page.pageNum = 1;
                this.page.pageSize = row;
                this.aggregateQuery();
            },
            changeStatus: function () {
                this.page.pageNum = 1;
                this.aggregateQuery();
            }
        },
        watch: {
            '$route': {
                handler: function () {
                    this.aggregateQuery();
                }
            }
        },
        components: {
            paging
        }
    };
</script>
