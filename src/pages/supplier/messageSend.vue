<template>
    <div class="messageSend_wrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 消息管理</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="javascript:location.reload();">发送消息</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="messageSend_content">
            <!--已发送消息标题-->
            <div class="row" style="margin:0">
                <div class="col-xs-3 sendMessage">已发送信息:</div>
            </div>
            <!--发送消息列表-->
            <div class="row messageSend_contentRow" style="margin:0px;">
                <div class="table-responsive">
                    <table class="tableStyle table table-hover table-bordered" style="table-layout: fixed;width:100%">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>标题</th>
                            <th>日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(message,index) in messageList.list">
                            <td>{{index + 1}}</td>
                            <td>
                                <el-button type="text" @click="messageJump(message.notifiId)">
                                    {{message.notifiDetail}}
                                </el-button>
                            </td>
                            <td>{{message.createdAt}}</td>
                            <td>
                                <el-button type="danger" size="small" @click="delete_message(message.sigin)">删 除</el-button>
                            </td>
                        </tr>
                        <tr v-show="messageList.list&&messageList.list.length===0">
                            <td colspan="4">没有数据记录</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="messageSend_paging">
                <el-pagination v-show="this.messageList.total>0"
                               @size-change="changeRows"
                               @current-change="change"
                               :current-page="currentPage"
                               :page-sizes=messageSendSize
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="this.messageList.total">
                </el-pagination>
            </div>
            <!--发送信息标题-->
            <div class="row" style="margin:0">
                <div class="col-xs-3 sendMessage">发送信息:</div>
            </div>
            <div class="col-xs-12 messageSend_all_message clearPadding">
                <div class="row messageSend_title clearMargin" style="margin:0">
                    <div class="col-xs-12">
                        <input type="text" placeholder="请输入标题" class="messageSend_input"
                               v-model="messageSend.notifiDetail" maxlength="100">
                    </div>
                </div>

                <quill-editor ref="myTextEditor" v-model="messageSend.comment" :options="editorOption"
                              style="min-height:300px;" @change="onChange"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)">
                    <div id="toolbar" slot="toolbar">
                        <!-- Add a bold button -->
                        <button class="ql-bold">Bold</button>
                        <button class="ql-italic">Italic</button>
                        <!-- Add font size dropdown -->
                        <select class="ql-size">
                            <option value="small"></option>
                            <!-- Note a missing, thus falsy value, is used to reset to default -->
                            <option selected></option>
                            <option value="large"></option>
                            <option value="huge"></option>
                        </select>
                        <!-- Add subscript and superscript buttons -->
                        <button class="ql-script" value="sub"></button>
                        <button class="ql-script" value="super"></button>
                        <span class="ql-formats">
                    <button type="button" @click="imgClick">
                        <svg viewBox="0 0 18 18">
                            <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                            <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                            <polyline class="ql-even ql-fill"
                                      points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                        </svg>
                    </button>
                </span>
                    </div>
                </quill-editor>
            </div>
            <div class="row messageSend_text" style="margin:0">
                <div class="col-xs-2 col-xs-offset-5">
                    <el-button type="success" v-has:messageSend_messageSend @click="message_send()" size="medium">确认发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import api from '../../api/notification'
    import '../../../static/css/messageSend.css'
    import paging from '../../components/page'
    import {quillEditor} from 'vue-quill-editor';

    export default {
        props: {
            value: {
                type: String
            },
            /*上传图片的地址*/
            uploadUrl: {
                type: String,
                default:  '/upload/file'
            },
            /*上传图片的file控件name*/
            fileName: {
                type: String,
                default: 'file'
            },
        },
        data() {
            return {
                messageSendSize:[10,20,40],
                pageTotal: 0, //总页数
                pageSize: 10,  //每页长度
                currentPage: 1,  //当前页
                messageList: [],
                messageSend: {
                    notifiDetail: null,  //消息标题
                    comment: null,   //消息内容
                },
                editorOption: {
                    // something config
//                    debug: 'info',
                    modules: {
                        toolbar: '#toolbar'
                    },
                    placeholder: '发送消息',
                    readOnly: false,
                    theme: 'snow'
                },
                messageObj: {
                    notifiType: 1,
                    pageNum: 1,
                    pageSize: null,
                },

            }
        },
        created() {
            this.getMessage();
        },
        methods: {
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
            },
            onChange() {
                this.$emit('input', this.messageSend.comment)
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var fileInput = e.target
                if (fileInput.files.length == 0) {
                    return
                }
//                this.editor.focus()
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    })
                }
                var data = new FormData;
                data.append(this.fileName, fileInput.files[0])
                axios.post(this.uploadUrl, data).then(res => {
                    if (res.data) {
                        let data = res.data.data;
                        this.editor.insertEmbed(this.editor.getSelection() ? this.editor.getSelection().index : '', 'image', data[0].url)
                    }
                })
            },
            /*点击上传图片按钮*/
            imgClick() {
                if (!this.uploadUrl) {
                    return;
                }
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
            onEditorChange({ editor, html, text }) {
                this.messageSend.comment = html;
            },
            //首页获得已读信息的内容
            getMessage(pageNum) {
                this.messageObj.notifiType = (this.notifiType ? 0 : 1)
                this.messageObj.pageNum = (this.currentPage = pageNum ? pageNum : this.currentPage)
                this.messageObj.pageSize = this.pageSize
                let that = this
                api.getMessageList(that.messageObj)
                    .then(function (res) {
                        if (res.data.code == 1) {
                            that.messageList = res.data.data
                            that.pageTotal = Math.floor((that.messageList.total % that.pageSize) == 0 ?
                                (that.messageList.total / that.pageSize) : (that.messageList.total / that.pageSize) + 1)
                        }
                    })
            },
            //删除已读信息
            delete_message(index) {
                let sigin = index
                let _that = this
                _that.$confirm('此操作将删除已发送信息，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    api.deleteMessage(sigin)
                        .then(function (res) {
                            if (res.data.code == 1) {
                                _that.$alert(res.data.message)
                                _that.getMessage()
                            } else {
                                _that.$alert(res.data.message)
                            }
                        })
                }).catch(function () {
                    _that.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            //消息发送
            message_send() {
                if (!this.messageSend.notifiDetail) {
                    this.$alert('消息标题不能为空')
                    return
                }
                if (!this.messageSend.comment) {
                    this.$alert('消息内容不能为空')
                    return
                }
                let _that = this
                let obj = {
                    notifiDetail:_that.messageSend.notifiDetail,
                    comment:_that.messageSend.comment
                }
                    api.messageSend(obj)
                        .then(function (res) {
                            if (res.data.code == 1) {
                                _that.$alert('发送成功')
                                _that.messageSend.notifiDetail = ''
                                _that.messageSend.comment = ''
                                _that.getMessage()
                            } else {
                                _that.$alert(res.data.message)
                            }
                        })
            },
            //点击消息发送进行跳转
            messageJump(Id){
//                this.$router.push({'/systemMessageDetail',query:{accountId:Id,supplierStatus:number}});
                this.$router.push({path:'/systemMessageDetail',query:{systemMessageId:Id,isAdmin:true}})
            },
            //点击页码下标时，根据不同页码的数字显示对应的页面
            change(index) {
                this.currentPage = index
                //继续调用加载已读信息的内容
                this.getMessage()
            },
            //每页显示的条目
            changeRows(row) {
                this.currentPage = 1
                this.pageSize = row
                //继续调用加载已读信息的内容
                this.getMessage()
            }
        },
        mounted() {
            this.messageSend.comment = this.value
        },
        components: {
            paging,
            quillEditor
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor) {
                    if (newVal !== this.messageSend.comment) {
                        this.messageSend.comment = newVal
                    }
                }
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill;
            }
        }
    }
</script>


