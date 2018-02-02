<template>
 <!-- 导出模态框 -->
        <div>
            <template>
                <!-- 单选按钮组-->
                <el-radio-group v-model="radio" @change="changeLabel" >
                    <p class="export-item">
                        <el-radio :label="1">导出当前页列表</el-radio>
                    </p>
                    <p class="export-item">
                        <el-radio :label="2">导出所选页列表
                           <!--  <select @change="chooseBeginPage" v-model="selectedBeginPage">
                                <option :value="index" v-for="(index,item) in totalPages">{{index}}
                                </option>
                            </select> -->
                            <template>
                                <el-select v-model="selectedBeginPage" placeholder="请选择" @change="chooseBeginPage" size="mini" class="scope">
                                    <el-option
                                      v-for="(index,item) in totalPages"
                                      :key="index"
                                      :label="index"
                                      :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                            <span>-</span>
                         <!--    <select @change="selectOverPage" v-model="selectedOverPage">
                                <option :value="k" v-for="(k,item) in totalPages">{{k}}</option>
                            </select> -->
                            <template>
                                <el-select v-model="selectedOverPage" placeholder="请选择" @change="chooseOverPage" size="mini" class="scope">
                                    <el-option
                                      v-for="(k,item) in totalPages"
                                      :key="k"
                                      :label="k"
                                      :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-radio>

                    </p>
                    <p class="export-item">
                        <el-radio :label="3">导出所有列表</el-radio>
                    </p>
                </el-radio-group>
            </template>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data: function () {
            return {
                radio:1,
                //事件绑定和属性绑定，最后都是自定义中间量，在父组件上面，进行关联；
                selectedBeginPage :0,
                selectedOverPage:0,
            }
        },
        methods: {
            // 点击单选的时候，触发父组件的方法
            changeLabel(){
                this.$emit('selectScope',this.radio);
            },
            // 选择起始页码；
            chooseBeginPage(){
                this.$emit('chooseBeginPage', this.selectedBeginPage+1);
            },
            chooseOverPage(){
                this.$emit('chooseEndPage', this.selectedOverPage+1)
            },
        },
        props: {

            totalPages:{
                type: Number,
                required: true,
                default: 1
            },

        },
        computed: {


        },

        created () {

        },
        watch: {

        },

    }

</script>
<style scoped>
    .el-select{
        width: 60px
    }
    .el-select-dropdown__item{
        height: auto;
        padding:2px 10px;
    }
    p.export-item{
        overflow: hidden;
        margin: 0;
    }
</style>