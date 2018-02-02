<template>
    <div class="product-couple-back">
        <div class="row">
            <div class="col-lg-6 col-lg-offset-3">
                <img src="../../../static/img/bg01.jpg" alt="" style="width: 100%;height: 300px;margin-bottom:30px;">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-lg-offset-3">
                <span>
                    亲爱的客户您好，感谢您一直以来对我们的信赖和支持。在使用透云智购供应平台的同时，
                    您是否感到满意？或者有不吐不快的槽点？我们都迫切的想知道您以及您公司的感受。
                    恳请您抽出宝贵的时间来提出您珍贵的意见与建议，您的意见和建议将是我们未来进步的重要参考！
                </span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-3 col-lg-offset-3">
                <span style="font-weight: 800;font-size: 20px;">您对平台的建议：</span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-6 col-lg-offset-3">
                <textarea v-model="suggest.suggest" class="form-control" rows="8"></textarea>
            </div>
        </div>
        <br>
        <div style="padding-left: 50%;">
            <el-button @click="submitCoupleBack" type="success">提&nbsp;&nbsp;交</el-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import globalData from '../../common/global'
    import api from '../../api/feedback';

    import '../../../static/css/login.css'

    export default {
        data() {
            return {
                suggest: {suggest: null}
            }
        },
        created() {

        },
        methods: {
            /**
             * 提交客户反馈
             */
            submitCoupleBack: function () {
                if(!this.suggest.suggest){
                    this.$alert('提交的建议内容不能为空')
                    return
                }
                api.createFeedback(this.suggest).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.$alert(response.data.message)
                        }else{
                            this.$alert(response.data.message)
                        }
                    }
                )

            }
        }
    }
</script>
