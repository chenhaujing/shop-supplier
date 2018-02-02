<template>
    <div id="financialManageList">
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
        <div class="row clearMargin publicHeader search-arrange">
            <div>
                <label>支付时间</label>
                <el-date-picker
                    style="width:150px;"
                    v-model="startTime"
                    type="date"
                    placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                    style="width:150px;"
                    v-model="paymentDate"
                    type="date"
                    placeholder="结束时间">
                </el-date-picker>
            </div>
            <el-input
                placeholder="商品名称/商品条码"
                v-model="inputValue">
            </el-input>
            <div class="block">
                <label>收款类型</label>
                <el-select v-model="searchCondition.status"  >
                    <el-option
                        v-for="item in receiptTypes"
                        :key="item.value"
                        :label="item.name"
                        :data-status="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <label>供应商名称</label>
            <el-input
                placeholder="供应商名称"
                v-model="storeName">
            </el-input>
            </div>
            <el-button class="" type="info" @click="firstClick"><i class="el-icon-search"></i>    查 询</el-button>
        </div>

        <!--table表格部分-->
        <div class="commstyle">
            <el-table :data="commodityData" border style="width: 100%">
                <el-table-column  label="序号"
                    type="index"
                    width="80" header-align="center">
                </el-table-column>
                <el-table-column prop="storeName"  label="供应商名称"  header-align="center" min-width="150"></el-table-column>
                <el-table-column prop="goodsImage" label="商品图片" width="150" header-align="center">
                    <template scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <img :src="scope.row.goodsImage" width="100%" />
                            <div slot="reference" class="name-wrapper">
                                <img :src="scope.row.goodsImage" width="40" >
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="commName" label="商品名称"  header-align="center" min-width="160"></el-table-column>
                <el-table-column prop="brandName" label="商品品牌"  header-align="center" min-width="100"></el-table-column>
                <el-table-column prop="code69" label="商品条码" header-align="center" min-width="160"></el-table-column>
                <el-table-column prop="goodsAttribute" label="规格值"  header-align="center" min-width="130"></el-table-column>
                <el-table-column prop="commQuantity" label="商品数量" header-align="center" min-width="100"></el-table-column>
                <el-table-column label="透云进货价" header-align="center" min-width="130">
                    <template scope="scope">
                        {{scope.row.price | formatPrice}}
                    </template>
                </el-table-column>
                <el-table-column  label="app订货价" header-align="center" min-width="120">
                    <template scope="scope">
                        {{scope.row.unitPrice | formatPrice}}
                    </template>
                </el-table-column>
                <el-table-column label="折扣优惠" header-align="center" min-width="100">
                    <template scope="scope">
                        {{scope.row.discount | formatPrice}}
                    </template>
                </el-table-column>
                <el-table-column  label="总额"  header-align="center" min-width="130" >
                    <template scope="scope">
                        {{scope.row.subtotal | formatPrice}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="是否退换货" header-align="center" min-width="120">
                </el-table-column>
                <el-table-column  label="退款金额"  header-align="center" min-width="100">
                    <template scope="scope">
                        {{scope.row.returnMoney | formatPrice}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div v-if="commodityData.length>0" class="pull-right block page_style">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="paging.pageNum":page-sizes="pageList":page-size="paging.pageSize" :total="paging.total"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '../../api/financialManage';
    import vue from 'vue';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import paging from '../../components/page.vue';
    import {mapGetters} from 'vuex';
    import parse from 'date-fns/parse';
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';

    export default {
        data() {
            return {
                isOpen : false,
                queryObj:{
                    dataStart: '',
                    dataEnd: '',
                    inputVal: '',
                    receiptType: '全部',
                    checkType: '全部',
                    completeType: '全部'
                },
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                receiptTypes: [
                    { name: '全部', value: ''}, { name: '预收款', value: 0 }, { name: '银货两讫', value: 1 }
                ],
                inputValue:'',
                paymentDate: '',
                startTime: '',
                endTime: '',
                storeName :'',
                dialogMatching :false,
                // 未结算金额
                unsettledMoney: 0,
                settledMoney: 0,
                summary: {},
                //搜索条件；
                state: 0,
                // 搜索条件
                query: {},
                searchCondition: {status: ''},
                commodityData : [],

            }
        },
        created: function () {
            this.initialDate();
        },

        methods: {
            //图片放大放小
            showImg(data, event) {
                if (data === '') { //判断图片不存在的话,放大的那张图片也就不显示了
                    event.target.nextElementSibling.src = '';
                } else {
                    //图片存在  将地址输入在要显示的区域
                    event.target.nextElementSibling.src = data;
                    event.target.nextElementSibling.classList.add('financialCommodity_tableImgDisplay');
                }
            },
            //图片隐藏
            hiddenImg(event) {
                event.target.nextElementSibling.src = '';
                event.target.nextElementSibling.classList.remove('financialCommodity_tableImgDisplay');
            },

            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                this.SearchBycondition();
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                this.SearchBycondition();
            },
            // 刚进来时候把日期置成当前的月份；
            initialDate() {
                let now = new Date();
                this.paymentDate = new Date();
                this.startTime = this.handleDate(now).dateStr + '-01';
                this.endTime = this.handleDate(now).dateStr + '-' + this.handleDate(now).totalDays;
                this.SearchBycondition();
            },
            firstClick(){
                this.paging.pageNum = 1;
                this.SearchBycondition();
            },

            //商品名称/商品条码查询商品对账信息
            SearchBycondition(){
                if (this.startTime && this.paymentDate && this.startTime > this.paymentDate) {
                    this.$alert('起始时间不能大于终止时间，请重新输入');
                    return;
                }
                let param = {
                    storeName :this.storeName,
                    receiptType :this.searchCondition.status ,
                    inputValue :this.inputValue,
                    beginPaymentTime : this.startTime ? format(this.startTime, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    endPaymentTime :  this.paymentDate ? format(this.paymentDate, 'YYYY-MM-DD', {locale: zh_cn}) : '',
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                api.financialCommodityByCondition(param).then(
                    (response) => {
                        let data =response.data.data.list;
                        for(let i in data) {
                            //收款类型 : 0-预收款 1-银货两讫
                            if (!isNaN(data[i].status)) {
                                switch (data[i].status) {
                                    case 0:
                                        data[i].status = "否";
                                        break;
                                    case 1:
                                        data[i].status = "是";
                                        break;
                                    default:
                                        data[i].status = "是";
                                        break;
                                }
                                ;
                            }
                            ;
                        }
                        this.paging.total=response.data.data.total;
                        this.paging.pageTotal=response.data.data.pages;
                        this.commodityData = data ? data:[];
                    });
            },

            // 工具方法
            handleDate(d) {
                /*
                 * 获取当前时间，转换成日期字符串，进行查询；
                 */
                // 当前月总共有多少天；
                let curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
                let year = d.getFullYear();
                let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
                let dateStr = year + '-' + month;
                return {
                    dateStr: dateStr,
                    totalDays: curMonthDays
                };
            }
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'returnFlag'
            ]),
            navigationList() {
                return [{ name: '财务管理' }, { name: '财务商品列表' }];
            }

        },
        components: {
            mybreadcrumb,
            paging
        }
    }
</script>
<style scoped lang="less" type="text/less">

    .el-date-editor--daterange.el-input{
        width: 205px;
    }
    .el-input{
        width: 185px;
        margin-right:10px;
    }
    .el-select{
        width: 125px;
        margin-right: 10px;
    }

    .search-arrange >div{
        display: inline-block;
    }
    .el-table {
        margin: 20px 0;
    }
    .financial-reconciliation{
        text-align: center;
    }
    .financial-header{
        min-height: 60px;
        line-height: 60px;
        padding-top: 10px;
        background: #eaeaea;
    }
    .financial-content{
        min-height: 120px;
    }
    .el-icon-document{
        font-size: 32px;
    }
    .financialOrder-Btn {
        display: inline-block;
        margin: 15px 15px 15px 10px;
        float: right;
    }
</style>



