<template>
    <div>
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>

        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="匹配出错" name="first">
                <match-history-table :matchHistoryList="matchHistoryArray"></match-history-table>
            </el-tab-pane>
            <el-tab-pane label="支付宝缺失记录" name="second">
                <match-history-table :matchHistoryList="matchHistoryArray"></match-history-table>
            </el-tab-pane>
            <el-tab-pane label="平台缺失记录" name="third">
                <match-history-table :matchHistoryList="matchHistoryArray"></match-history-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 分页 -->
        <div v-if="matchHistoryArray.length>0" class="pull-right block">
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
    import matchHistoryTable from '../../components/financial/financialOrderMatchHistoryTable.vue';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                activeName: 'first',
                checkingType : 3,//对账类型默认不匹配； 0-未对账（支付宝缺失记录） 1-未对账（平台缺失记录） 2-对账匹配  3-对账不匹配
                //分页
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                matchHistoryArray:[]
            }
        },
        created: function () {
            this.simpleSearch();
        },

        methods: {

            // 查询列表信息
            simpleSearch(){
                this.switchActiveName(this.activeName);
                let param = {
                    checkingType : this.checkingType,
                    pageNum : this.paging.pageNum,
                    pageSize : this.paging.pageSize
                };
                api.getFinancialOrderMatchHistory(param).then(
                    (response) => {
                        if (response.data.code === 1){
                            let data =response.data.data.list;
                            this.paging.total=response.data.data.total;
                            this.paging.pageTotal=response.data.data.pages;
                            this.matchHistoryArray =data ? data:[];
                        }else {
                            this.$alert(response.data.message);
                        }
                    });
            },

            switchActiveName(activeName){
                switch(activeName){
                    case 'first':
                        this.checkingType = 3 ;
                        break;
                    case 'second':
                        this.checkingType = 0 ;
                        break;
                    case 'third':
                        this.checkingType = 1 ;
                        break;
                    default:
                        break;
                };
            },

            //切换卡片
            handleClick() {
                this.paging.pageNum = 1;
                this.simpleSearch();
            },

            // 分页
            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                this.simpleSearch();
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                this.simpleSearch();
            },

        },

        computed: {
            navigationList() {
                return [{ name: '财务管理' }, { name: '财务订单列表' , route: { path: '/financialOrderList' }}, { name: '上次匹配记录' }];
            }
        },
        components: {
            mybreadcrumb,
            matchHistoryTable
        }
    }
</script>
<style scoped lang="less" type="text/less">
    .el-tabs{
        margin: 20px 0;
    }
</style>



