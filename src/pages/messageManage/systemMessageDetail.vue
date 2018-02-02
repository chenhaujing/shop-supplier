<template>
    <div class="system-message-detail">
        <div v-if="isAdmin">
            <!--<el-breadcrumb>-->
                <!--<el-breadcrumb-item>消息</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item :to="{path:'/messageSend',query:{activelabel:'system'}}">消息发送列表</el-breadcrumb-item>-->

                <!--<el-breadcrumb-item><a href="javascript:location.reload();">消息详情</a></el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
        <div v-else="isAdmin">
            <!--<el-breadcrumb>-->
                <!--<el-breadcrumb-item>消息</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item :to="{path:'/messageList',query:{activelabel:'system'}}">系统消息列表</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item><a href="javascript:location.reload();">消息详情</a></el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
            <breadCrumb :navigationList="messageBreadList"></breadCrumb>
        </div>

        <hr>
        <div class="row">
            <div class="col-lg-6 systemMessageDetail_title">
                {{systemMessage.notifiDetail}}
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-6 systemMessageDetail_time">
                {{systemMessage.createdAt}}
            </div>
        </div>
        <div class="row">
            <quill-editor ref="myTextEditor" v-model="systemMessage.comment" :options="editorOption" style="min-height:300px;">
            </quill-editor>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import axios from 'axios'
    import globalData from '../../common/global'
    import { quillEditor } from 'vue-quill-editor'
    import api from '../../api/notification'
    import breadCrumb from '../../components/Breadcrumb';
    import '../../../static/css/systemMessageDetail.css'

    export default {
        data () {
            return {
                breadList:[    //消息发送面包屑导航
                    {name:'消息'},
                    {name:'消息发送列表',route:'/messageSend'},
                    {name:'消息详情'}
                ],
                messageBreadList:[
                    {name:'消息'},
                    {name:'系统消息列表',route:{path:'/messageList',query:{activelabel:'system'}}},
                    {name:'消息详情'}
                ],
                editorOption: {
                    modules: {
                        toolbar: false
                    },
                    placeholder: 'Compose an epic...',
                    readOnly: true,
                    theme: 'snow'
                },
                isAdmin: null,
                systemMessageId: null,
                systemMessage: {}
            }
        },
        created () {
            this.getRouteQuery()
            this.getSystemMessage()
        },
        methods: {
            getSystemMessage: function () {
                    api.getMesageDetail(this.systemMessageId)
//                axios({
//                    url: '/notification/getNotificationById/' + this.systemMessageId,
//                    method: 'get'
//                }).
                        .then(
                    (response) => {
                        if (response.data.code === 1) {
                            console.log(JSON.stringify(response.data.data))
                            this.systemMessage = response.data.data
                            this.updateMessageStatus()
                        }
                    }
                )
            },
            updateMessageStatus: function () {
                api.updateMessageStatus(this.systemMessageId)
//                axios({
//                    url: '/notification/updateStatus/' + this.systemMessageId,
//                    method: 'post'
//                })
                    .then(
                    (response) => {
                        if (response.data.code === 1) {
                            console.log(JSON.stringify(response.data.data))
                        }
                    }
                )
            },
            getRouteQuery: function () {
                this.systemMessageId = this.$route.query.systemMessageId
                this.isAdmin = this.$route.query.isAdmin
            }
        },
        watch: {
            '$route': {
                handler: function () {
                    this.getRouteQuery()
                    this.getSystemMessage()
                }
            }
        },
        components: {
            quillEditor,breadCrumb
        }
    }
</script>
