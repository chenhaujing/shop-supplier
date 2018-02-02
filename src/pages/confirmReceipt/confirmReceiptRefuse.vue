<template>
    <div id="confirmReceiptRefuse" class="container-fluid">
        <template>
            <el-select v-model="refuseType" placeholder="请选择" @change="selectReason" size="small">
                <el-option
                    v-for="item in refusedReasons"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
            </el-select>
        </template>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写拒收理由"
            v-model="fillRefuseReason.refuseReason" class="textarea">
        </el-input>
        <section class="upload">
            <h3>上传图片</h3>
            <div class="uploader" v-loading.fullscreen.lock="isLoading" element-loading-text="图片上传中，请稍等...">
                <el-upload
                    :action= "baseUrl+ '/upload/file'"
                    list-type="picture-card"
                    :before-upload="limitUpload"
                    :on-remove="handleRemove"
                    :on-preview = "preview"
                    :on-progress ="uploading"
                    :on-success="getUrl"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <section class="show_pic">
                    <h3>图片预览：</h3>
                    <img :src="dialogImageUrl" alt="">
                </section>
            </div>
        </section>
        <footer class="row">
            <button class="btn btn-info" @click="handleSubmit($event)">取消</button>
            <button class="btn btn-info" @click="handleSubmit($event)">提交</button>
        </footer>
    </div>

</template>
<script>
    import api from '../../api'
    import '../../../static/css/confirmReceiptRefuse.less'
    export default {
        data() {
            return {
                isLoading :false,
                orderId: '',
                refuseType: '请选择拒收理由',
                refusedReasons : [{
                    index : 0,
                    value: '请选择拒收理由'
                    },
                    {
                        index : 1,
                        value: '送货时间过长'
                    },
                    {
                        index : 2,
                        value: '商品有破损'
                    },
                    {
                        index : 3,
                        value: '商品即将过保质期'
                    },
                    {
                        index : 4,
                        value: '商品与订单不符'
                    },
                    {
                        index : 5,
                        value: '商品与描述不符'
                    },
                    {
                        index :6,
                        value:'其他原因'
                    }
                ],
                dialogImageUrl: '',
                // dialogVisible: false,
                // totalPics : 0,
                // 拒收原因；
                fillRefuseReason : {
                    orderId : '',
                    refuseReason : '',
                    refuseImg : [],
                    refuseType : '',
                },
                // 图片url
                imgUrl : [],
                /*
                 * 是否显示添加按钮，是否能添加
                 *
                 */
                // isAdd : true,
                baseUrl: '',
            }
        },
        created() {
            // 配置baseUrl
            this.baseUrl = this.$globalData.baseUrl;
            this.orderId = this.$route.query.orderId;
        },
        // 在提交的时候，在转换成base64的存储；
        methods: {
            handleRemove(file, fileList) {
                // file为空，直接返回；
                if(!file ) {return;}
                let fileDel = file.response.data[0];
                // 删除数组里面删除掉的图片；
                for(let i = 0;i<this.imgUrl.length;i++) {
                    if(this.imgUrl[i].url === fileDel.url) {
                        this.imgUrl.splice(i,1);
                        break;
                    }
                };

                // 长度为0，默认为空；否则是最后一张图片；
                if( this.imgUrl.length == 0 ) {
                    this.dialogImageUrl = '';
                } else {
                    this.dialogImageUrl = this.imgUrl[this.imgUrl.length-1].url;
                }
            },

            // 处理提交；
            handleSubmit(event) {
                let ev = event || window.event;
                let target = ev.target || ev.srcElement;
                let refusedReasons = target.innerHTML;
                if(refusedReasons === '取消'){
                    // 跳回上个页面；
                    this.$router.push({path: '/confirmReceipt', query:{orderId:this.orderId}});
                } else {
                    /*
                     * 提交操作；
                     *  循环遍历图片地址对象，并生成base64,存起来；
                     */
                    this.fillRefuseReason.refuseImg = this.imgUrl;
                    if(!this.fillRefuseReason.refuseReason || !this.fillRefuseReason.refuseType) {
                        this.$message.error('拒收理由不能为空！')
                        return;
                    }

                    if(!this.imgUrl.length) {
                          this.$message.error('至少需要传一张图片！');
                        return;
                    }
                    // 开启全屏加载状态；
                    api.sweepRefusing(this.fillRefuseReason).then((res) => {
                        if(res.data.code == 1) {
                            alert('拒收成功!');
                            // 成功返回；
                            this.$router.push({path: '/confirmReceipt', query:{orderId:this.orderId}});
                        } else {
                            this.$message.error('操作失败，请重试')
                        }
                    })
                }
            },

            // 点击切换预览图片；
            preview(file) {
                this.dialogImageUrl = file.url;
            },

            // 限制上传图片数量；
            limitUpload(file){
                if(this.imgUrl.length ===3) {
                    this.$message.error('最多只能传三张');
                    return false;
                }
            },
            /*
             * 上传成功后，拼接对象，设置预览大图；
             */
            getUrl(event,file,fileList) {
                // if(!file.size){
                //     fileList.pop();
                //     return;
                // }

                // 隐藏添加符号；
                this.isLoading = false;
                if(file.response.code ===1) {
                    let fileArr = file.response.data[0];
                    let obj = {};
                    // 设置大图预览；
                    this.dialogImageUrl = fileArr.url || '';
                    // 保存图片的url，size,minImgUrl,type
                    obj.url = fileArr.url;
                    obj.size = fileArr.size;
                    obj.type= fileArr.type;
                    obj.minImgUrl = fileArr.minImgUrl;
                    this.imgUrl.push(obj);
                } else {
                    this.$message.error('上传失败，请重试！')
                }
            },

            selectReason(){
                // 拼接请求对象；并进行
                this.fillRefuseReason.orderId = this.orderId;
                this.fillRefuseReason.refuseType = this.refuseType;
            },
            uploading (event,file,fileList){
                if(!file || file.size ===0){
                 this.isLoading = false;
                } else {
                    this.isLoading = true;
                }
            }
        },

        computed: {
        },
    }
</script>
