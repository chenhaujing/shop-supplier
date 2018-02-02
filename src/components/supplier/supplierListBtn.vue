<template>
    <table class="table table-hover table-bordered supplierInfoList_editTable">
        <thead>
        <tr>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(supplier,index)  in supplierList">
            <td>
                <img src="../../../static/img/details.png" alt="" class="supplierInfoList_img">
                <div class="supplierInfoList_editLabelWarp">
                    <div>
                        <el-button type="text" v-has:supplierInfoList_supplierInfoEdit @click="supplierJump(1,supplier.accountId)">详情</el-button>
                    </div>
                    <div>
                        <el-button type="text" v-has:supplierInfoList_commodityList @click="supplierJump(2,supplier.accountId)">供货商品</el-button>
                    </div>
                    <div>
                        <el-button type="text" v-has:supplierInfoList_orderList @click="supplierJump(3,supplier.accountId)">供货订单</el-button>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        data: function () {
            return {

            }
        },
        props: {
            supplierList:{
                type: Array,
            },
        },
        methods:{
            supplierJump(type,Id){
                this.$emit('supplierJump',type,Id)
            }
        }
    }
</script>

<style scoped lang="less">

         .supplierInfoList_editTable {
            position: absolute;
            right:0px;
            top:0px;
            z-index: 100;
            width:100px;
            background: #FFFFFF;
            thead {
                tr {
                    th {
                        border: 1px solid #ccc;
                        width:92px;
                        height:38px;
                    }
                }
            }
            tbody {
                tr {
                    td {
                        border: 1px solid #ccc;
                        text-align: center;
                        height: 57px;
                        vertical-align: middle;
                        position: relative;
                        &:hover div{
                            display: block;
                        }
                    }
                }
            }
        }

        > .supplierInfoList_pageWrap {
            position: absolute;
            right: 6%;
            > .v-pagination {
                margin: 20px 0;
                .v-select-page {
                    margin: 0 10px;
                }
                .v-select-page{
                    margin-bottom: 10px;
                }
                >.checkNumber{
                    >select{
                        margin: 0!important;
                    }
                }
            }
        }


    .form-control.pageSelect {
        margin-bottom: 12px;
    }

    .supplierInfoList_clearPadding {
        padding: 0;
    }

    .mySelf > thead > tr > th {
        text-align: center;
        line-height: 20px;
    }

    .supplierinfoList_dateStyle {
        width: 20px;
        text-align: center;
        line-height: 36px;
    }

    .supplierInfoList_clear > .el-date-editor {
        width: 80%;
    }

    .v-pagination > .checkNumber {
        margin-bottom: 12px;
    }

    .v-pagination > .checkNumber > select {
        margin-bottom: 0;
    }
    .supplierinfoList_dateRightStyle{
    }
    /*刘述添加到style样式end*/
    .supplierInfoList_margin{
        margin-top:8px;
    }

    .supplierHeader{
        height:55px;
    }
    .supplierInfoList_editLabelWarp {
        position: absolute;
        width: 100px;
        right:56px;
        display: none;
        border: 1px solid #ccc;
        z-index: 100;
        >div:nth-child(1){
            background:#FFFFFF;
            padding:5px 0px;
            &:hover{
                background:#E4E8F1;
            }
        }
        >div:nth-child(2){
            background:#FFFFFF;
            padding:5px 0px;
            &:hover{
                background:#E4E8F1;
            }
        }
        >div:nth-child(3){
            background:#FFFFFF;
            padding:5px 0px;
            &:hover{
                background:#E4E8F1;
            }
        }
        a {
            display: block;
        }
    }
    .supplierInfoList_bold{
        font-weight:bold;
        margin:0;
    }
    .supplierArrowUp {
        transform: rotate(0deg);
        transition: all .3s;
    }
    .supplierArrowDown {
        transform: rotate(180deg);
        transition: all .3s;
    }
    .supplierInfoList_navWrap{
        >div{
            padding: 0;
            margin:0;
            label{
                padding: 0;
                margin: 0;
            }
            div{
                padding: 0;
                margin: 0;
            }
            p{
                display:inline-block ;
                line-height: 36px;
                text-align: center;
                margin: 0!important;
            }
        }
    }

</style>
