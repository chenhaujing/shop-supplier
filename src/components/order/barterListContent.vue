<template>
    <div>
        <!--普通搜索栏-->
        <div class=" publicHeader  barterListHeader">
            <!--换货时间-->
            <div>
                <label>换货时间</label>
                <div>
                    <el-date-picker  format="yyyy-MM-dd"
                                     :editable='false' placeholder="请输入日期" type="date"
                                     v-model="barterList.beginApplyForTime" @change="getBarterList" style="width:120px">
                    </el-date-picker>
                </div>
                <div>
                    <el-date-picker  format="yyyy-MM-dd"
                                     :editable='false' placeholder="请输入日期" type="date"
                                     v-model="barterList.endApplyForTime" @change="getBarterList" style="width:120px;margin-left:-80px;">
                    </el-date-picker>
                </div>
            </div>
            <!--接收人输入框-->
            <div>
                <el-input v-model="barterList.inputValue" placeholder="收货人姓名/电话" icon="search" @click="getBarterList" style="margin-left:15px;"></el-input>
            </div>
            <!--换货单状态-->
            <div style="margin-left:10px;">
                <label>换货单状态</label>
                <el-select v-model="barterList.status" @change="statueChange"  class="barter_select">
                    <el-option v-for="item in barterState" :value="item.statue" :label="item.name">
                        {{item.name}}
                    </el-option>
                </el-select>
            </div>
            <!--高级搜索（管理员）-->
            <div v-if = "isAdmin===0" style="margin-left:-30px;">
                <el-button type="info" @click="supplierSearch">高级搜索</el-button>
            </div>
            <!--高级搜索(供应员)-->
            <div v-if = "isAdmin!==0" style="margin-left:-30px;">
                <el-button type="info" @click="supplierSearch">高级搜索</el-button>
            </div>
        </div>
        <!--高级搜索弹层-->
        <div class="barterList_search   publicModelSearch" v-show="barterListExpert.barterListSearch">
            <div class="row clearMargin">
                <div>
                    <label>换货单号</label>
                    <div>
                        <el-input v-model="barterListExpert.returnNumber" style="width:244px;"></el-input>
                    </div>
                </div>
                <div>
                    <label>收货人姓名</label>
                    <div>
                        <el-input class="barterList_input" v-model="barterListExpert.receiverName"></el-input>
                    </div>
                </div>
            </div>
            <div class="row clearMargin">
                <div>
                    <label>换货时间</label>
                    <div>
                        <el-date-picker  format="yyyy-MM-dd"
                                         :editable='false' placeholder="请输入日期" type="date"
                                         v-model="barterListExpert.beginApplyForTime" style="width:120px;">
                        </el-date-picker>
                    </div>
                    <div>
                        <el-date-picker  format="yyyy-MM-dd"
                                         :editable='false' placeholder="请输入日期" type="date"
                                         v-model="barterListExpert.endApplyForTime" style="width:120px;">
                        </el-date-picker>
                    </div>
                </div>
                <div>
                    <label>收货人电话</label>
                    <div>
                        <el-input class="barterList_input_phone" v-model="barterListExpert.receiverMobile" style="width:244px;"></el-input>
                    </div>
                </div>
            </div>
            <div class="row clearMargin">
                <div class="barterList_button">
                    <el-button type="info" @click="isAdvancedSearch">查询</el-button>
                </div>
            </div>
        </div>
        <!--table表格-->
        <el-table :data="shopListTable"  style="margin:20px 0;" border>
            <el-table-column
                type="index"
                label="序号"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
             v-if="isAdmin===0"
            prop="storeName"
            label="供应商名称"
            align="center"
            min-width="80">
            </el-table-column>
            <el-table-column
                prop="returnNumber"
                label="换货单号"
                align="center"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="换货单状态"
                align="center"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="goodsTotalPrice"
                label="商品金额小计"
                align="center"
                min-width="100">
                <template scope="scope">
                    {{scope.row.goodsTotalPrice|formatPrice}}
                </template>
            </el-table-column>
            <el-table-column
                prop="applyForTime"
                label="换货时间"
                align="center"
                min-width="100">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="95"
                align="center">
                <template scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <el-button v-if="isAdmin!==0" style="display: block;text-align: center;margin: 0 auto;"
                                   type="text" size="small"   v-has:barList_Order @click="barterListJump(2,scope.row.orderId,'barterList')">订单详情
                        </el-button>
                        <el-button v-if="isAdmin!==0" style="display: block;text-align: center;margin: 0 auto;"
                                   type="text" size="small"  v-has:barList_Detail @click="barterListJump(1,scope.row.detailsId,'barterList')" >换货审核
                        </el-button>

                        <el-button v-if = "isAdmin===0" style="display: block;text-align: center;margin: 0 auto;"
                                   type="text" size="small" @click="barterListJump(2,scope.row.orderId,'adminBarterList')" v-has:adminbarList_Order>订单详情
                        </el-button>
                        <el-button v-if="isAdmin===0" style="display: block;text-align: center;margin: 0 auto;"
                                   type="text" size="small" @click="barterListJump(1,scope.row.detailsId,'adminBarterList')" v-has:adminbarList_Detail>换货审核
                        </el-button>
                        <div slot="reference" class="name-wrapper">
                            <img src="../../../static/img/details.png">
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import '../../../static/css/barterList.less';
    export default {
        props:{
            barterList:{
                type:Object
            },
            barterListExpert:{
                type:Object
            },
            shopListTable:{
                type:Array
            },
            barterState:{
                type:Array
            },
            isAdmin:{
                type:Number
            }
        },
        methods:{
            //列表查询
            getBarterList(){
                this.$emit('getBarterList')
            },
            //状态选择框
            statueChange(){
                this.$emit('statueChange')
            },
            //高级搜索(控制模态框)
            supplierSearch(){
                this.$emit('supplierSearch')
            },
            //搜索
            isAdvancedSearch(){
                this.$emit('isAdvancedSearch')
            },
            isAdvancedSearch(){
                this.$emit('isAdvancedSearch')
            },
            //路由跳转
            barterListJump(type,id,path){
                this.$emit('barterListJump',type,id,path)
            }
        }
    }
</script>

