<template>
    <div>
        <!--面包屑导航-->
        <div class="commodityManage_nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 库存管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品库存</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--普通搜索-->
        <div class="row clearMargin publicHeader">
            <!-- 商品状态 -->
            <div>
                <label>预警状态</label>
                <el-select v-model="basicSearch.inventoryStatus" placeholder="请选择" @change="simplesearch">
                    <el-option value="" :label="selectAll"></el-option>
                    <el-option v-for="item in inventoryStuOptions":key="item.value":label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <!-- 商品条码/商品名称 -->
            <div>
                <el-input v-if="isAdmin" placeholder="商品条码／商品名称／供应商名称" icon="search" v-model.trim="basicSearch.inputvalue" :on-icon-click="simplesearch"></el-input>
                <el-input v-else placeholder="商品条码／商品名称" icon="search" v-model.trim="basicSearch.inputvalue" :on-icon-click="simplesearch"></el-input>
            </div>
            <!-- 高级搜索按钮 -->
            <div>
                 <el-button type="info"  @click="supperSearch">高级搜索</el-button>
            </div>
        </div>
        <!--高级搜索-->
        <div class="publicModelSearch" v-show="dialogFormVisible">
            <el-row class="row-style">
                <div>
                    <label>商品条码</label>
                    <el-input placeholder="请输入商品条码" v-model.trim="supperSearchData.commCode69"></el-input>
                </div>
                <div>
                    <label>商品名称</label>
                    <el-input placeholder="请输入商品名称" v-model.trim="supperSearchData.commName"></el-input>
                </div>
                <div v-if="isAdmin">
                    <label>供应商名称</label>
                    <el-input placeholder="请输入供应商名称" v-model.trim="supperSearchData.supplierName"></el-input>
                </div>
            </el-row>
            <el-row class="row-style">
                <div class="commodity-classif">
                    <label>商品科属</label>
                     <el-select placeholder="请选择商品科属" v-model="categoryOneId">
                        <el-option value="" :label="selectAll"></el-option>
                        <el-option v-for="item in commodityClassifyOne" :key="item.value" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                    <el-select placeholder="请选择商品科属" v-model="categoryTwoId">
                        <el-option value="" :label="selectAll"></el-option>
                        <el-option v-for="item in commodityClassifyTwo"  :key="item.value" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                    <el-select placeholder="请选择商品科属" v-model="categoryThreeId">
                        <el-option value="" :label="selectAll"></el-option>
                        <el-option v-for="item in commodityClassifyThree" :key="item.value" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </div>
                <div>
                    <label>预警状态</label>
                     <el-select v-model="inventoryStatus2">
                        <el-option value="" :label="selectAll">全 部</el-option>
                        <el-option v-for="item in inventoryStuOptions2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                 <div>
                     <div class="multiSearch-button">
                         <el-button type="info"  @click="multiSearch">查  询</el-button>
                     </div>
                </div>
            </el-row>
        </div>
        <!--table表格-->
        <div class="containers">
            <!--table表格部分-->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="70" header-align="center"></el-table-column>
                <el-table-column v-if="isAdmin" prop="supplierName" label="供应商名称" width="250" header-align="center"></el-table-column>
                <el-table-column prop="code69" label="商品条码"  width="200" header-align="center"></el-table-column>
                <el-table-column prop="brandName" label="商品品牌" min-width="150" header-align="center"></el-table-column>
                <el-table-column prop="commName" label="商品名称" min-width="200" header-align="center"></el-table-column>
                <el-table-column prop="unitName" label="库存单位" width="100" header-align="center"></el-table-column>
                <el-table-column prop="ruleVal" label="规格值" width="150" header-align="center"></el-table-column>
                <el-table-column prop="inventoryMinimum" label="库存下限" width="100" header-align="center"></el-table-column>
                <!-- 库存预警（0代表库存正常，1代表下限预警） -->
                <el-table-column prop="inventory" label="库存量"  width="80" header-align="center">
                    <template scope="scope">
                        <span v-if="scope.row.inventoryStatus ===0"> {{scope.row.inventory}}</span>
                        <span v-else class="inventoryWaringStyle"> {{scope.row.inventory}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预警状态" width="100" header-align="center">
                    <template scope="scope">
                        <span v-if="scope.row.inventoryStatus ===0">库存正常</span>
                        <span v-else class="inventoryWaringStyle">下限预警</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" header-align="center">
                    <template scope="scope">
                       <el-button type="info" size="small" v-has:commInventoryManage_setInventory @click="setInventory(scope.row.id)">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div v-if="tableData.length > 0" class="pull-right block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="paging.pageNum":page-sizes="pageList":page-size="paging.pageSize" :total="paging.total"
                        layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>

        <!-- 设置商品库存对话框 -->
        <el-dialog title="" :visible.sync="dialogInventoryChange" size="tiny">
            <el-form :model="formData" :label-position="labelPosition" label-width="20px">
                <el-form-item>
                    <label class="dialog_label_style">库存下限 </label>
                    <el-input class="dialog_input_style"v-model.trim="formData.inventoryMinimum" placeholder="请输入库存下限" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="8">
                        <label  class="dialog_label_style">原库存量 </label>
                        <span class="dialog_span_style"> {{formData.inventory}} </span>
                    </el-col>
                    <el-col :span="16">
                        <label  class="dialog_label_style">库存增减 </label>
                        <el-input class="dialog_input_style" v-model.trim="formData.inventoryIncreasement" placeholder="整数" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button  type="info" @click="dialogInventoryChange = false">取 消</el-button>
                <el-button type="primary" @click="updateInventory()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import vue from 'vue';
    import api from '../../api/freightrules';
    import paging from '../../components/page.vue';
    import {mapState,mapMutations} from 'vuex';

    export default {
        data() {
            return {
                accountId:'',
                dialogFormVisible: false, //高级搜索框是否显示
                dialogInventoryChange: false, //库存设置
                inputvalue: null,
                pid: null,
                selectAll: '全部',
                queryType: 1,   //1-简易查询，2-高级查询
                //库存状态下拉框
                inventoryStuOptions: [
                    {value: '0',label: '库存正常' },
                    {value: '1',label: '下限预警' }
                ],
                //商品状态下拉框
                commodityStuOptions: [
                    {value: '2',label: '已上架' },
                    {value: '3',label: '已下架' },
                    {value: '4',label: '上架待审核' },
                    {value: '5',label: '下架待审核' },
                    {value: '6',label: '编辑待审核' }
                ],
                //库存状态下拉框
                inventoryStuOptions2: [
                    {value: '0',label: '库存正常' },
                    {value: '1',label: '下限预警' }
                ],
                // 基本搜索 只有基本搜索字段；
                basicSearch: {
                    supplierId: null,
                    inventoryStatus: '',///库存预警(0代表库存正常,1代表下限预警)
                    inputvalue: '' //
                },
                // 高级搜索
                supperSearchData: {
                    supplierId: null, //供应商id
                    commCode69: '', //商品条码
                    commName: '', //商品名称
                    supplierName:'', //供应商名称
                },
                categoryOneId: '', //商品一级分类ID
                categoryTwoId: '', //商品二级分类ID
                categoryThreeId: '', //商品三级分类ID
                inventoryStatus2: '', //库存预警(0代表库存正常,1代表下限预警)
                //商品科属
                commodityClassifyOne: [],
                commodityClassifyTwo: [],
                commodityClassifyThree: [],
                paging:{pageNum: 1, pageSize: 10,total: 1, pageTotal: 10 },
                pageList:[10,20,40], //每页选择的个数选项
                //弹出页面
                formData: {
                    id: null,
                    inventoryMinimum: null, //库存下限
                    inventoryIncreasement: null,   //库存增减
                    inventory: '0' //库存
                },
                tableData: [],//查询结果数据
                labelPosition: 'center',
            };
        },
        created() {
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.accountId = JSON.parse(localStorage.getItem('account')).accountId;
            this.accountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            this.simplesearch(); //获取页面数据
            this.getCommodityType();//商品科属
        },
        computed: {
            // 是否为管理员，转换成布尔值；
            isAdmin () {
//                return !!Number(JSON.parse(localStorage.getItem('account')).isAdmin);
                return !!Number(JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin);
            },
        },
        methods: {
            /**
             * 普通查询
             */
            simplesearch: function() {
                if (this.dialogFormVisible) {
                    this.dialogFormVisible = !this.dialogFormVisible;
                }
                //清空高级查询的搜索条件
                this.categoryOneId = ''; //商品一级分类ID
                this.categoryTwoId =  ''; //商品二级分类ID
                this.categoryThreeId =  ''; //商品三级分类ID
                this.inventoryStatus2 =  ''; //库存预警(0代表库存正常,1代表下限预警)
                for (let key in this.supperSearchData) {
                    this.supperSearchData[key] = null;
                }
                this.queryType = 1;
                this.paging.pageNum = 1;
                this.getSimpleData();
            },
            //当切换状态时， 页码重置为第一页， 并获取新数据
            // changeStatus: function () {
            //     this.queryType = 1;
            //     this.paging.pageNum = 1;
            //     this.getSimpleData();
            // },
            //获取普通搜索数据
            getSimpleData: function() {
                let basicSearch = {
                    inventoryStatus: this.basicSearch.inventoryStatus,
                    inputvalue: this.basicSearch.inputvalue,
                    pageNum: this.paging.pageNum,
                    pageSize: this.paging.pageSize,
                };
                if (basicSearch.inputvalue !=null && basicSearch.inputvalue.length > 45) {
                    this.$alert('输入内容不能大于45字符!');
                    return
                }
                api.inventorySearch(basicSearch).then((response) => {
                    if (response.data.code === 1) {
                        // console.log(response.data);
                        this.tableData = response.data.data.list;
                        this.paging.pageNum = response.data.data.pageNum;
                        this.paging.pageSize = response.data.data.pageSize;
                        this.paging.total = response.data.data.total;
                        this.paging.pageTotal = response.data.data.pages;
                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message)
                    }
                })
            },
            /**
             * 高级搜索中的商品科属三级联动---第一级(初始化)
             * */
            getCommodityType: function() {
                api.getCommodityCategory({pid: this.pid ? this.pid : 0})
                    .then(response =>{
                        this.commodityClassifyOne = response.data
                    });
            },
            /**
             * 高级搜索中的商品科属三级联动---第二级--在watch监听中调用该方法
             * */
            getCommodityCategoryTwo: function() {
                api.getCommodityCategory({pid: this.categoryOneId})
                    .then(response => {
                        this.commodityClassifyTwo = response.data;
                    });
            },
            /**
             * 高级搜索中的商品科属三级联动---第三级--在watch监听中调用该方法
             * */
            getCommodityCategoryThree: function() {
                api.getCommodityCategory({pid: this.categoryTwoId})
                    .then(response => this.commodityClassifyThree = response.data);
            },
            /**
             * 高级搜索
             */
            supperSearch: function(){
                this.dialogFormVisible = !this.dialogFormVisible;
            },
            multiSearch: function(){
                this.queryType = 2;
                this.paging.pageNum = 1;
                this.multiSearchData();
            },
            multiSearchData: function() {
                let str = '', pattern = null;
                let supperSearchParam = {
                    commCode69: this.supperSearchData.commCode69,//商品条码
                    commName: this.supperSearchData.commName,//商品名称
                    supplierName: this.supperSearchData.supplierName, //供应商名称
                    categoryOneId: this.categoryOneId,//商品一级分类ID
                    categoryTwoId: this.categoryTwoId,//商品二级分类ID
                    categoryThreeId: this.categoryThreeId, //商品三级分类ID
                    inventoryStatus: this.inventoryStatus2, //库存预警(0代表库存正常,1代表下限预警)
                    pageNum: this.paging.pageNum,
                    pageSize: this.paging.pageSize,
                };
                //判断商品条码输入是否符合规则
                if (supperSearchParam.commCode69 && supperSearchParam.commCode69.length > 20) {
                    this.$alert('商品条码不能大于20字符!');
                    return
                }
                if (supperSearchParam.commCode69 && !/^[A-Za-z0-9]+$/.test(supperSearchParam.commCode69)) {
                        this.$alert('商品条码只能输入数字和字母');
                        return;
                }
                if (supperSearchParam.commName && supperSearchParam.commName.length > 45) {
                    this.$alert('商品名称不能大于45字符!');
                    return
                }
                if (supperSearchParam.supplierName && supperSearchParam.supplierName.length > 45) {
                    this.$alert('供应商名称不能大于45字符!');
                    return
                }
                api.inventorySearch(supperSearchParam).then((response) => {
                    if (response.data.code === 1) {
                        // console.log(response.data);
                        this.tableData = response.data.data.list;
                        //
                        this.paging.pageNum = response.data.data.pageNum;
                        this.paging.pageSize = response.data.data.pageSize;
                        this.paging.total = response.data.data.total;
                        this.paging.pageTotal = response.data.data.pages;

                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message)
                    }
                })
            },
            /**
             * 设置库存弹出框页面
             */
            setInventory: function(id) {
                this.dialogInventoryChange = true;
                //
                api.getInventoryById(id).then((response) => {
                    if (response.data.code === 1) {
                        // console.log(response.data);
                        this.formData = response.data.data;
                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message)
                    }
                })

            },
            //库存设置
            updateInventory: function(){
                let params = {
                    id: this.formData.id, //商品ID
                    inventoryMinimum: this.formData.inventoryMinimum, //库存下限
                    inventoryIncreasement: this.formData.inventoryIncreasement, //库存增减
                    inventory: this.formData.inventory,
                };
                if (!/^[0-9][0-9]{0,8}$/.test(params.inventoryMinimum)) {
                    this.$alert('库存下限必须为0-999999999内的整数!');
                    return
                }
                if (params.inventoryIncreasement && !/^-?[0-9]\d*$/.test(params.inventoryIncreasement) ) {
                    this.$alert('库存增减必须为整数!');
                    return
                }
                if(Number(params.inventoryIncreasement) < 0){
                    if(Number(params.inventoryIncreasement) + Number(params.inventory) < 0){
                        this.$alert('库存减少的数量不能大于原库存量');
                        return;
                    }
                }
                this.dialogInventoryChange = false;
                api.updateInventory(params).then((response) => {
                    if (response.data.code === 1) {
                        // console.log(response.data);
                        this.simplesearch();
                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message)
                    }
                })
            },

            // 分页
            handleSizeChange(row){
                this.paging.pageNum = 1;
                this.paging.pageSize = row;
                if (this.queryType && this.queryType === 1) {
                    this.getSimpleData();
                } else if (this.queryType && this.queryType === 2) {
                   this.multiSearchData();
                }
            },
            handleCurrentChange(index){
                this.paging.pageNum = index;
                if (this.queryType && this.queryType === 1) {
                    this.getSimpleData();
                } else if (this.queryType && this.queryType === 2) {
                   this.multiSearchData();
                }
            },

        },
        watch: {//深度 watcher
            'categoryOneId': {
                handler(newVal, oldVal) {
                    if (newVal) {
                        this.categoryTwoId = "";
                        this.categoryThreeId = "";
                        this.getCommodityCategoryTwo();
                    }
                }
            },
            'categoryTwoId': {
                handler(newVal, oldVal) {
                    if (newVal) {
                        this.categoryThreeId = "";
                        this.getCommodityCategoryThree();
                    }
                }
            }
        },
        components: {
            paging
        },
    }
</script>
<style scoped>
    .containers{
        min-width: 1000px;
        margin: 20px 0 0;
    }
    .el-input{ width: 265px; }
    .el-select{ width: 125px; }
    .publicHeader >div{
        display: inline-block;
        margin-right: 10px;
    }
    /* 高级搜索 */
    .row-style > div{
        display: inline-block;
        margin-right: 10px;
    }
    .publicModelSearch .el-input{ width: 295px; }
    .publicModelSearch .el-select{ width: 295px; }
    .commodity-classif .el-select{ width: 96px; }
    .publicModelSearch .row-style{ margin: 5px 0; }
    .multiSearch-button{
        width: 50px;
        text-align: right;
    }
    /* table样式  */
    .el-table {  margin: 20px 0; }
    .el-table .cell{
        max-width:240px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    /*  */
    .inventoryWaringStyle{ color:red; }
    
    .dialog_label_style{ width: 72px; }
    .dialog_input_style{ width: 120px; }
    .dialog_span_style{
        width: 40px;
        padding:0 5px;
    }
</style>
