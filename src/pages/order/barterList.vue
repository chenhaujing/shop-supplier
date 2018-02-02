<template>
    <div class="barterList_content">
            <div>
                <!--面包屑导航-->
                <breadCrumb :navigationList="barterBread"></breadCrumb>
            </div>
                <!--列表内容 普通查询  高级查询-->
                <listContent :barterList="barterList"
                             :barterListExpert="barterListExpert"
                             @getBarterList="getBarterList"
                            :barterState="barterState"
                             :shopListTable="shopListTable"
                             @statueChange="statueChange"
                             @supplierSearch="supplierSearch"
                             @isAdvancedSearch="isAdvancedSearch"
                             @barterListJump="barterListJump">
                </listContent>
            <div class="row clearMargin" style="float:right">
                <div class="block" v-show="barterList.pagingType===0&&shopList.total>0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="barterList.pageNum"
                        :page-sizes=pageList
                        :page-size="barterList.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="shopList.total">
                    </el-pagination>
                </div>
                <div class="block" v-show="barterListExpert.pagingType===1&&shopList.total>0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="barterListExpert.pageNum"
                        :page-sizes=pageList
                        :page-size="barterListExpert.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="shopList.total">
                    </el-pagination>
                </div>
            </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import api from '../../api/order';
    import breadCrumb from '../../components/Breadcrumb';
    import barterMethod from '../../utils/barterList.js';
    import listContent from '../../components/order/barterListContent.vue'
    import { format } from 'date-fns';
    import { zh_cn } from 'date-fns/locale/zh_cn';
    import '../../../static/css/barterList.less';
    export default {
        data(){
            return{
                pageList:[10,20,40], //每页选择的个数选项
                //面包屑导航
                barterBread:[
                    {name:' 订单管理'},
                    {name:'换货列表'}
                ],
                //订单表格头部内容
                orderTh:[],
                beginApplyForTime:'',   //换货时间起始时间
                endApplyForTime:'',     //换货时间终止时间
                //用于发送查询对象(普通查询)
                barterList:{
                    beginApplyForTime:'',   //换货时间起始时间
                    endApplyForTime:'',     //换货时间终止时间
                    receiverName:'',        //收货人姓名
                    receiverMobile:'',      //收货人电话
                    status:1,       //换货单状态
                    inputValue:'',       //多重查找
                    pageNum:1,        //当前页码
                    pageSize:10,        //每页显示的行数
                    pagingType:0,       //控制分页的显示
                },
                //用于发送查询对象(高级查询)
                barterListExpert:{
                    beginApplyForTime:'',   //换货时间起始时间
                    endApplyForTime:'',     //换货时间终止时间
                    returnNumber:'',        //换货单号
                    receiverName:'',        //收货人姓名
                    receiverMobile:'',      //收货人电话
                    pageNum:1,        //当前页码
                    pageSize:10,        //每页显示的行数
                    pagingType:null,       //控制分页的显示
                    //控制高级搜索的显示
                    barterListSearch:false,
                },
                //换货单状态
                barterState:[
                    {name:'全部',status:''},
                    {name:'待换货',statue:1},
                    {name:'审核通过',statue:2},
                    {name:'拒绝换货',statue:3},
                    {name:'换货中',statue:4},
                    {name:'已换货',statue:5},
                    {name:'换货取消',statue:6},
                ],

                shopList:[],   //接收列表成功返回后的内容
                shopListTable:[],   //用于表格
            }
        },
        created(){
                  this.getBarterList()      //发送请求，获取内容
        },
        methods:{
            //换货单状态选择
            statueChange(){
                this.getBarterList();  //发送请求，获取内容
            },
            //高级搜索
            supplierSearch(){
                this.barterListExpert.barterListSearch = ! this.barterListExpert.barterListSearch;
            },
            //路由跳转
            barterListJump(type,id,isAdmin){
                //type 用来区分 跳转页面     1：换货审核  2：订单详情
                // id  订单ID
                // isAdmin  用来区分管理员或者供应商身份      1:供应商
                if(type ===1){
                    //barterList.pagingType  //代表普通查询和高级查询
                    if(this.barterList.pagingType===0){
                        //普通查询对象存储
                        this.jumpBarterDetail(this.barterList,id,isAdmin)
                    }else if(this.barterList.pagingType===1){
                        //高级查询对象存储
                        this.jumpBarterDetail(this.barterListExpert,id,isAdmin)
                    }
                }else if(type===2){
                    //barterList.pagingType  //代表普通查询和高级查询
                    if(this.barterList.pagingType===0){
                        //普通查询对象存储
                        this.jumpOrderDetail(this.barterList,id,isAdmin)
                    }else if(this.barterList.pagingType===1){
                        //高级查询对象存储
                        this.jumpOrderDetail(this.barterListExpert,id,isAdmin)
                    }
                }
            },
           //跳转换货审核，保存对象
            jumpBarterDetail(obj,id,isAdmin){
                this.$store.dispatch('setPageInfo',obj);
                this.$router.push({path:'/barterListDetail',query:{detailsId:id,source:isAdmin}})
            },
            //跳转订单详情,保存对象
            jumpOrderDetail(obj,id,isAdmin){
                this.$store.dispatch('setPageInfo',obj);
                this.$router.push({path:'/orderDetail',query:{id:id,source:isAdmin}})
            },
            //每页选择个数
            handleSizeChange(row){
                if(this.barterList.pagingType===0){
                    this.barterList.pageNum = 1;
                    this.barterList.pageSize = row;
                    this.getList();
                }else if(this.barterListExpert.pagingType===1){
                    this.barterListExpert.pageNum = 1;
                    this.barterListExpert.pageSize = row;
                    this.isAdvancedSearch();
                }
            },
            //选择页数
            handleCurrentChange(index){
                if(this.barterList.pagingType===0){
                    this.barterList.pageNum = index;
                    this.getList();
                }else if(this.barterListExpert.pagingType===1){
                    this.barterListExpert.pageNum = index;
                    this.isAdvancedSearch();
                }
            },
            //获取换货列表内容（普通查询）
            getBarterList(){
                // 如果return flag 为true，就用vuex里面的条件，否则就用 用户输入；
                if(this.$store.getters.returnFlag){
                    this.$store.dispatch('setFlag', false);
                    //进行类别判断   0:普通查询   1：高级查询
                    if(this.$store.getters.pageInfo.pagingType===0){
                        this.barterList = this.$store.getters.pageInfo;  //重新赋值
                        //发送请求获取数据(普通查询)
                        this.getList();
                    }else{
                        this.barterListExpert = this.$store.getters.pageInfo;
                        //发送请求获取数据(高级查询)
                        this.isAdvancedSearch();
                    }
                }else{
                    //普通查询
                    this.getList();
                }
            },
            //普通查询
            getList(){
                //普通查询时 清空高级查询的所有数据
                barterMethod.clearData(this.barterListExpert);
                //换货时间二次赋值
                barterMethod.timeJudge(this.barterList)
                //换货时间判断
                if (this.barterList.beginApplyForTime && this.barterList.endApplyForTime && this.barterList.beginApplyForTime > this.barterList.endApplyForTime) {
                    this.$alert('换货结束时间必须大于换货开始时间');
                    return;
                }
                if(this.barterList.beginApplyForTime &&this.barterList.endApplyForTime&&this.barterList.beginApplyForTime===this.barterList.endApplyForTime){
                    this.$alert('换货结束时间不能等于换货开始时间');
                    return;
                }
                this.getContent(this.barterList);      //发送请求，获取内容
                //发送成功   进行分页切换
                this.barterList.pagingType=0;               //0:普通分页显示
                this.barterListExpert.pagingType=0;        //0：高级分页隐藏
            },
            //获取换货列表内容(高级查询)
            isAdvancedSearch(){
                //换货时间二次赋值
                barterMethod.timeJudge(this.barterListExpert);
                //换货时间判断
                if(this.barterListExpert.beginApplyForTime &&this.barterListExpert.endApplyForTime&&this.barterListExpert.beginApplyForTime>this.barterListExpert.endApplyForTime){
                    this.$alert('换货结束时间必须大于换货开始时间');
                    return;
                }
                if(this.barterListExpert.beginApplyForTime &&this.barterListExpert.endApplyForTime&&this.barterListExpert.beginApplyForTime===this.barterListExpert.endApplyForTime){
                    this.$alert('换货结束时间不能等于换货开始时间');
                    return;
                }
                this.getContent(this.barterListExpert);
                //发送成功   进行分页切换
                this.barterList.pagingType=1;       //1：隐藏
                this.barterListExpert.pagingType=1; //2：显示
            },
            //发送请求 获取列表内容
            getContent(type){
                api.getBarterListArr(type)
                    .then((res)=>{
                        if(res.data.code===1){
                            //对时间进行提前处理
                            this.shopList =res.data.data;
                            res.data.data.list?this.shopListTable = res.data.data.list:[];
                            //根据数据状态显示不同的名字
                            barterMethod.statusAssignment(this.shopListTable)
                        }else{
                            this.$alert(res.data.message);
                        }
                    })
            }
        },
        components:{
            breadCrumb,listContent
        }
    }
</script>


