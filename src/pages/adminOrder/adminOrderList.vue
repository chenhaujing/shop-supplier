<template>
    <div id="adminOrderList">
        <div class="orderList_nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 订单管理</el-breadcrumb-item>
                <el-breadcrumb-item class="breadNav">
                    <a href="javascript:location.reload()">订货列表</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="orderList_searchWrap">
            <!--搜索栏部分-->
            <div class="orderList_search row clearMargin clearPadding publicHeader">
                <div class="col-xs-4 clearPadding date_inputs">
                    <label>下单时间:</label>
                    <div class="col-xs-4 dateInput">
                        <el-date-picker
                            v-model="basicSearch.beginDate"
                            format="yyyy-MM-dd"
                            :editable='false'
                            type="date"
                            @change="searchWithDate($event)"
                            style="width: 100%;"
                        ></el-date-picker>
                    </div>
                    <span class="pull-left" style="text-align: center;line-height: 36px;">~</span>
                    <div class="col-xs-4 dateInput">
                        <el-date-picker
                            v-model="basicSearch.endDate"
                            format="yyyy-MM-dd"
                            :editable='false'
                            type="date"
                            @change="searchWithDate"
                            style="width: 100%;"
                        >
                        </el-date-picker>
                    </div>

                </div>
                <div class="col-xs-3 clearPadding input_search">
                    <el-input style="width: 98%;"
                              placeholder="收货人姓名/电话/供应商名称"
                              icon="search"
                              v-model="basicSearch.receiver"
                              :on-icon-click="searchWithReceiver"

                    >
                    </el-input>
                </div>
                <div class="col-xs-2 clearPadding">
                    <label>订货状态: </label>
                    <div class="col-xs-8">
                        <el-select v-model="changeSta" placeholder="请选择" @change="changeStatus"
                                   size="32rem">
                            <div style="height:200px;overflow:auto;">
                                <el-option
                                    v-for="item in ordersStatus"
                                    :key="item.status"
                                    :label="item.type"
                                    :data-status="item.status"
                                    :value="item.status">
                                </el-option>
                            </div>
                        </el-select>
                    </div>

                </div>
                <div class="col-xs-2 clearPadding btn_group">
                    <el-button type="info" @click="advancedSearch">高级搜索</el-button>

                    <button type="button" class="btn-info el-button" @click="dialogVisible=true"
                            style="margin:-2px 0;" v-has:adminOrderList_exportOrder>导出
                    </button>
                    <!-- 导出模态框 -->
                    <el-dialog title="请选择导出方式：" :visible.sync="dialogVisible" size="tiny" class="text-left">
                        <export-data
                            :total-pages="totalPageExport"
                            v-on:selectScope="selectPageScope"
                            v-on:chooseBeginPage="beginPage"
                            v-on:chooseEndPage="overPage"
                        ></export-data>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="closeLayer">取 消</el-button>
                            <el-button type="primary" @click="exportOrder">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="col-xs-1">
                    <el-button type="default" class="glyphicon glyphicon-list active" role="presentation" @click="slideToggle" v-has:adminOrderList_confirmDisplay></el-button>
                </div>
            </div>
            <!--高级搜索部分 刘述修改不要覆盖-->
            <div class="publicModelSearch orderList_advancedSearch clearfix" v-if="isAdvancedSearch">
                <div class="row">
                    <div class="col-xs-4">
                        <label>订单编号:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" placeholder="订单编号"
                                   v-model="advancedSrch.orderId" maxlength="30" style="width:100%;">
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <label>下单时间: </label>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.beginDate"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%;">
                            </el-date-picker>
                        </div>
                        <span class="col-xs-1">~</span>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.endDate"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%;">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <label>支付类型: </label>
                        <div class="col-xs-7">
                            <el-select v-model="advancedSrch.orderPaymentMethod" placeholder="请选择支付类型"
                                       style="width:100%;">
                                <el-option
                                    v-for="item in payType"
                                    :key="item.type"
                                    :label="item.name"
                                    :value="item.type">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <label>收货人姓名: </label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" placeholder="收货人姓名"
                                   v-model="advancedSrch.orderReceiverName" maxlength="30" style="width:100%;">
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <label>支付时间: </label>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.orderPaymentBeginTime"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%;">
                            </el-date-picker>
                        </div>
                        <span class="col-xs-1">~</span>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.orderPaymentEndTime"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%;">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <label>支付流水号: </label>
                        <div class="col-xs-7">
                            <input type="text" class="form-control" placeholder="支付流水号"
                                   v-model="advancedSrch.orderPaymentNum" maxlength="30" style="width: 100%">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <label>收货人电话: </label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" placeholder="收货人电话"
                                   v-model="advancedSrch.orderReceiverMobile" maxlength="30" style="width: 100%;">
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <label>收货时间: </label>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.orderReceiveBeginTime"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%">
                            </el-date-picker>
                        </div>
                        <span class="col-xs-1">~</span>
                        <div class="col-xs-4">
                            <el-date-picker
                                v-model="advancedSrch.orderReceiveEndTime"
                                format="yyyy-MM-dd"
                                :editable='false'
                                type="date" style="width: 100%">
                            </el-date-picker>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-xs-5 col-xs-offset-4">
                        <label>合计金额: </label>
                        <div class="col-xs-4">
                            <input type="text" class="form-control startMoney" maxlength="10"
                                   v-model="advancedSrch.beginMoney">
                        </div>
                        <span class="col-xs-1">~</span>
                        <div class="col-xs-4">
                            <input type="text" class="form-control endMoney" maxlength="10"
                                   v-model="advancedSrch.endMoney">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div slot="footer" class="dialog-footer col-xs-1 col-xs-offset-10">
                        <el-button type="primary" @click="searchOrder">查 询</el-button>
                    </div>
                </div>
            </div>
            <!-- 右边滑入滑出 -->
            <div class="selectList">
                <transition name="slide-fade">
                    <div class="selectionList" v-show="isShowList">
                        <div class="h4">选项列表项</div>
                        <el-checkbox-group v-model="checkedCols">
                            <el-checkbox class="checkbox" v-for="col in cols" :label="col.id" :key="col.id"
                                         :checked="col.isCheck"
                                         @change="checkBox">{{col.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox class="checkbox" @change="checkBox">共{{displayCols.length}}项</el-checkbox>
                        <div class="text-center confirm">
                            <button class="btn btn-default" @click="confirmDisplay">确认</button>
                        </div>
                    </div>
                </transition>
            </div>
            <!--table表格部分-->
            <div class="orderList_tableWrap">
                <div class="table-responsive orderList_tableWrap orderList_mainTableParent">
                    <table class="table table-bordered table-hover orderList_mainTable text-center" id="orders">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="(item,index) in displayCols" v-show="item.display" :style="{minWidth:item.minWidth}">{{item.name}}<i class="el-icon-arrow-down sort" :class="{arrowUp: flag == -1, arrowDown: flag == 1 }" @click="toSort" v-if="item.name==='下单时间'"></i></th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="getStatusList.length===0">
                            <td colspan="11"> 没有数据记录</td>
                        </tr>
                        <tr v-for="(item,index) in getStatusList">
                            <td>{{index + 1}}</td>
                            <td v-show="displayCols[0].display">{{item.storeName}}</td>
                            <td v-show="displayCols[1].display">{{item.orderId}}</td>
                            <td v-show="displayCols[2].display">
                                <!-- 在拒收这里需要弹窗来说明拒收原因； -->
                                <div v-if="item.statusName=='已拒收退款审核'">
                                    <a href="javascript:;" @click="showRefuseReason(item.orderId)"> {{item.statusName ? item.statusName : ''}}</a>
                                </div>
                                 <!-- 在已取消 这里需要弹窗来说明取消原因； -->
                                <div v-else-if="item.statusName=='已支付退款审核'">
                                    <a href="javascript:;" @click="showCancelReason(item.orderId)">{{item.statusName ? item.statusName :''}}</a>
                                </div>
                                <div v-else>
                                     {{item.statusName ? item.statusName : ''}}
                                </div>
                            </td>
                            <td v-show="displayCols[3].display">{{item.orderPrice|formatPrice}}</td>
                            <td v-show="displayCols[4].display" v-if="item.orderPostage == 0">包邮</td>
                            <td v-show="displayCols[4].display" v-else>{{item.orderPostage|formatPrice}}</td>
                            <td v-show="displayCols[5].display">{{item.discount |formatPrice}}</td>
                            <td v-show="displayCols[6].display">{{item.orderTotalPrice |formatPrice}}</td>
                            <td v-show="displayCols[7].display">{{item.payAmount |formatPrice}}</td>
                            <td v-show="displayCols[8].display">{{item.orderCreateTime}}</td>
                            <td v-show="displayCols[9].display">{{item.updateTime}}</td>
                            <td v-show="displayCols[10].display">{{item.orderPaymentMethod | paymentType}}</td>
                            <td v-show="displayCols[11].display">{{item.orderPaymentTime}}</td>
                            <td v-show="displayCols[12].display">{{item.orderPaymentNum}}</td>
                            <td v-show="displayCols[13].display">{{item.orderReceiveTime}}</td>
                            <td v-show="displayCols[14].display">{{item.orderReceiverName}}</td>
                            <td v-show="displayCols[15].display">{{item.orderReceiverMobile}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <conduct-btn :status-list = "getStatusList" @goDetail="goToDetail" @seeLogics= "seeLogics" @goToRefund="goToRefund"
                 @goLogistics="confirmOrder"></conduct-btn>
            </div>
            <!-- 查看物流模态框-->
            <el-dialog title="物流信息" :visible.sync="seeLogicsVisible" size="tiny">
                <!--自配送信息-->
                <div v-show="isShowInfo">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">配送人姓名</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" disabled v-model="distributorName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">配送人电话</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" disabled v-model="distributorMobile">
                            </div>
                        </div>
                    </div>
                </div>
                <!--其他配送信息-->
                <div v-show="!isShowInfo" class="orderList-trackInfo">
                    <div class="navbar-form row" role="search">
                        <div class="form-group orderList-inputLogicsNum">
                            <input type="text" class="form-control pull-left" placeholder="请输入物流单号"
                                   v-model="logisticsNum">
                            <button type="submit" class="btn btn-info pull-right" @click="trackLogisticsInfo(-1)">查询
                            </button>
                        </div>
                        <!-- 物流信息表单 -->
                        <template>
                            <el-table :data="logisticsData" stripe style="width: 100%" border>
                                <el-table-column prop="ftime" label="时间"></el-table-column>
                                <el-table-column prop="context" label="地点和跟踪进度"></el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="autoReceiveGoods"
                               v-if="isAuto && currentStatus == 3 || currentStatus == 19"
                               :disabled="isClicked">确认送达</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="pull-right orderList_pagingWrap">
            <paging ref="page" :page-num="pageTotal" :types="changeSta" :current-page="currentPage" :pageSize='10'
                    @change="change" v-on:changeR="selectLabelows"></paging>
        </div>
        <!-- 拒收原因弹窗 -->
        <el-dialog
            title="拒收原因"
            :visible.sync="isRefused"
            size="tiny">
            <!-- 数据绑定 -->
            <div class="orderListRefuseReason">
                <p>拒收类型：{{refusedReason.refuseType}}</p>
                <p>拒收理由：{{refusedReason.refuseReason}}</p>
            </div>
            <!-- 拒收图片展示，最多3张 -->
            <!-- 数据渲染 -->
            <div class="orderList-refusePics  text-center row"
                 v-if="refusedReason.refuseImgUrl && refusedReason.refuseImgUrl.length > 0">
                <img :src="item" alt="" v-for="item in refusedReason.refuseImgUrl" v-show="!!item">
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="isRefused= false">确 定</el-button>
          </span>
        </el-dialog>

        <!--取消订单原因 弹层 -->
        <el-dialog
            title="取消订单原因"
            :visible.sync="isCanceled"
            size="tiny">
            <!-- 数据绑定 -->
            <div class="orderListCancelReason">
                <p>取消类型：{{canceledReason.cancelType}}</p>
                <p>取消原因：{{canceledReason.orderCancelReason}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="isCanceled= false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>

    import '../../../static/css/adminOrderList.less'
    import Vue from 'vue';
    import api from '../../api/order';
    import paging from '../../components/page';
    import exportData from '../../components/order/exportData';
    import conductBtn from '../../components/order/conductBtn';
    import globalData from '../../common/global';
    // import parse from 'date-fns/parse';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import { mapGetters } from 'vuex';


    // 列表选项数据
    const colOptions = [
        { id: '0', name: '供应商名称', isCheck: true,minWidth:'300px' }, { id: '1', name: '订单编号', isCheck: true,minWidth:'280px'}, { id: '2', name: '订单状态', isCheck: true,minWidth:'128px' },
        { id: '3', name: '商品金额小计', isCheck: true, minWidth:'150px'}, { id: '4', name: '运费金额', isCheck: true, minWidth:'180px' }, { id: '5', name: '折扣优惠', isCheck: true, minWidth:'110px' },
        { id: '6', name: '合计金额', isCheck: true,minWidth:'120px' }, { id: '7', name: '实付金额', isCheck: true,minWidth:'120px' }, { id: '8', name: '下单时间', isCheck: true, minWidth:'180px' },
        { id: '9', name: '更新时间', isCheck: false,minWidth:'180px'}, { id: '10', name: '支付类型', isCheck: false,minWidth:'80px' }, { id: '11', name: '支付时间', isCheck: false,minWidth:'180px' },
        { id: '12', name: '支付流水号', isCheck: false,minWidth:'280px' }, { id: '13', name: '收货时间', isCheck: false,minWidth:'180px' }, { id: '14', name: '收货人姓名', isCheck: false,minWidth:'120px' },
        { id: '15', name: '收货人电话', isCheck: false,minWidth:'120px' }
    ];

    export default {
        data() {
            return {
                // 选择列表项；
                isShowList: false,
                displayCols: [],
                checkedCols: [],
                cols: colOptions,
                // 使用中间变量接收开始结束时间；
                beginDate: null,
                endDate: null,
                //支付类型
                payType: [
                    {
                        name:'全部',
                        type: 0,
                    },
                    {
                        name: '支付宝',
                        type: 1,
                    },
                    {
                        name: '微信',
                        type: 2,
                    }
                ],
                //是否弹出警告框；
                isWarning: false,
                //通过哪种方式导出,默认currentPage
                exportMethod: 'currentPage',
                // 导出部分 选择页面； 要给后台传的
                startPage: 1,
                endPage: 1,
                // 导出部分，用户选择页码范围；
                totalPageExport: 1,

                // 导出部分模态框 start
                dialogVisible: false,
                // 确认发货模态框
                //当前的id;
                currentId: '',
                // 当前订单状态；
                currentStatus: 0,
                formLabelWidth: '120px',
                text: '下一步',
                myTitle: '收货地址',
                // 表格类
                gridData: [],
                form: {
                    senderName: ' ', //配送人姓名
                    logistics: '', //物流公司
                    senderNumber: '', //配送人电话
                    logisticsNumber: '' //物流单号

                },
                isConfirm: false,
                isShow: true,
                // 默认是1；
                receiveMethod: 1,
                // 确认发货模态框结束
                //
                // 物流信息查看；
                seeLogicsVisible: false,
                //第一页一个，后面公用一个；
                isShowInfo: false,

                // 修改配送方式；
                distributorName: '',
                distributorMobile: '',

                getGlobalToken: globalData.globalToken,

                orderListArr: [],
                /*
                 * 1.待付款2.待发货3.已发货4.已完成 5.已拒收退款审核6.已退款7.已支付退款审核8.待付款已取消 9.退款中 10审核通过 11.拒绝退款 12.已收货
                 */
                ordersStatus: [
                    {
                        status: '0',
                        type: '全部订单',
                    },
                    {
                        status: '1',
                        type: '待付款',
                    },
                    {
                        status: '2',
                        type: '待发货',
                    },
                    {
                        status: '3',
                        type: '已发货',
                    },
                    {
                        status: '4',
                        type: '已完成',
                    },
                    {
                        status: '5',
                        type: '已拒收退款审核',
                    },
                    {
                        status: '6',
                        type: '已退款',
                    },
                    {
                        status: '7',
                        type: '已支付退款审核',
                    },
                    {
                        status: '8',
                        type: '待付款已取消',
                    },
                    {
                        status: '9',
                        type: '退款中',
                    },
                    {
                        status: '10',
                        type: '审核通过',
                    },
                    {
                        status: '11',
                        type: '拒绝退款',
                    },
                    {
                        status: '12',
                        type: '已收货',
                    },
                ],
                changeSta: '',
                tableId: 'orders',
                pageNum: 1,
                pageTotal: 1, //总页码
                pageSize: 10, //每页条数
                currentPage: 1, //当前页
                token: null,
                accountId: null,
                /*
                 *  <为了避免 双向绑定导致的冲突，； **不直接绑定 orderList;**>
                 *  basicSearch, advancedSrch  在后面搜索的时候，使用 this.orderList去接；搜索条件
                 *
                 */

                // 使用这个去搜索；
                orderList: {
                    pageNum: 1, //当前页数
                    pageSize: 10, //每页行数
                    orderId: null, //订单编号
                    orderReceiverName: null, //收货人姓名
                    beginDate: null, //查询时开始时间
                    endDate: null, //查询时截至时间
                    beginMoney: null, //查询时最小金额
                    endMoney: null, //查询时最大金额
                    orderReceiverMobile: null, //收货人电话
                    orderPaymentMethod: null, //支付方式
                    orderPaymentNum: null, //支付流水号
                    orderStatus: null, //订单状态
                    userId: null, //买家ID
                    storeId: null, //卖家ID
                    storeName: null, //供应商名称；
                    /*
                        需要添加的参数；
                        1.订单下单时间；开始，结束；**  beginDate endDate和orderCreateTime关系；
                        2.收货时间（开始，结束）（新字段）
                        3，支付时间（开始 结束）
                    */
                    // 收货时间，开始时间，结束时间
                    orderReceiveBeginTime: null,
                    orderReceiveEndTime: null,
                    // 付款时间，开始- 结束；
                    orderPaymentBeginTime: null,
                    orderPaymentEndTime: null,
                },
                // 模态框
                isAdvancedSearch: false,

                // 基本搜索 只有基本搜索字段；
                basicSearch: {
                    beginDate: null,
                    endDate: null,
                    // 通过收货人的电话/姓名查询；
                    receiver: null,
                    orderStatus: null,
                },
                // 高级搜索；
                advancedSrch: {
                    orderId: null,
                    beginDate: null,
                    endDate: null,
                    orderPaymentMethod: null,
                    orderReceiverName: null,
                    orderReceiverMobile: null,
                    orderPaymentNum: null,
                    beginMoney: null,
                    endMoney: null,
                    orderReceiveEndTime: null,
                    orderReceiveBeginTime: null,
                    orderPaymentBeginTime: null,
                    orderPaymentEndTime: null,
                },
                // 使用两个中间进行接收；搜索条件；起始时间；
                begin: '',
                end: '',

                // 确认发货，第二步修改；
                activeName: 'selfSend',
                // 拒收原因弹窗；
                isRefused: false,
                // 拒收原因，拒收图片
                refusedReason: {},

                // 获取物流公司名称
                logisticsFirm: [],

                // 取消订单原因；弹层开关；
                isCanceled: false,
                canceledReason: {},

                // 物流跟踪信息；
                logisticsNum: null,
                // 跟踪物流信息
                logisticsData: [{
                    ftime: '',
                    context: '',
                },
                ],
                /*
                 * 确定退款，需要当前的订单号，和当前的订单总金额；
                 * 当前订单号，使用currentId;
                 */
                currentOrderTotal: 0,
                orderFreight: 0,
                /*
                 *  是否显示提示，  取消不提示，拒收需要提示；
                 * 是否显示退运费，拒收不退，取消退；
                 */
                isShowHint: false,
                // 是否开启自动发货按钮；默认为false;
                isAuto: false,
                // 点击确认送达后，返回状态为19，这个按钮置灰；
                isClicked: false,
                // 供应商名称；
                storeName: '',
                flag: 0,
                baseUrl: '',
            };
        },
        created() {
            // 配置baseUrl;
            this.baseUrl = this.$globalData.baseUrl;
//            this.token = window.localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.accountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
//            this.accountId = JSON.parse(localStorage.getItem('account')).accountId;
            // this.orderList.storeId = this.accountId;
            this.currentId = this.$route.query.id;
            this.currentStatus = this.$route.query.status;
           this.getData();
        },
        methods: {
            // 选项列表部分
            confirmDisplay() {
                if (this.checkedCols && this.checkedCols.length > 4) {
                    this.displayCols.forEach(r => {
                        if (this.checkedCols.indexOf(r.id) == -1) {
                            r.display = false;
                        } else {
                            r.display = true;
                        }
                    });
                    if (this.checkedCols.length < 7) {
                        this.isShowTable = false;
                    } else {
                        this.isShowTable = true;

                    }
                    this.isShowList = !this.isShowList;
                } else {
                    this.$alert('请勾选4个以上的选项');
                }

            },
            checkBox(event) {
                if (event.target.value == '') {
                    if (event.target.checked) {
                        this.checkedCols = colOptions.map(r => r.id);
                    } else {
                        this.checkedCols = [];
                    }
                }
            },
            // 右边的滑动效果；
            slideToggle() {
                this.isShowList = !this.isShowList;
            },
            // 关闭弹窗；通过父级控制，不能自己控制；
            closeLayer() {
                this.dialogVisible = false;
            },

            //table中显示操作的事件
            showEditMenu(event, type) {    //type -1 显示    type -2 隐藏
                if (type == 1) {
                    event.target.nextElementSibling.style.display = 'block';
                }
                if (type == 2) {
                    event.target.nextElementSibling.style.display = 'none';
                }
            },
            //  确认发货，第二步修改；在tab切换的时候，添加事件监听；清除内容；
            handleClick() {
                if (this.activeName == 'selfSend') {
                    this.form.logisticsNumber = '';
                    this.form.logistics = '';
                } else {
                    this.form.senderName = '';
                    this.form.senderNumber = '';
                }
            },
            // 通过日期来进行过滤；
            searchWithDate() {

                // 点击的时候，关掉高级搜索框；清掉this.orderList,和this.advancedSrch;

                this.isAdvancedSearch = false;
                this.resetSearch();

                // 使用变量存储；
                let formattedObj = this.formateDate(this.basicSearch);
                if (this.basicSearch.beginDate && this.basicSearch.endDate) {
                    let beginTime = this.basicSearch.beginDate.getTime();
                    let endTime = this.basicSearch.endDate.getTime();
                    this.begin = formattedObj.beginDate;
                    this.end = formattedObj.endDate;
                    // 转换成 时间戳比较大小；
                    if (beginTime > endTime) {
                        this.$alert('起始时间不能大于结束时间');
                        return;
                    }

                } else {

                    this.begin = this.basicSearch.beginDate ? formattedObj.beginDate : '';
                    this.end = this.basicSearch.endDate ? formattedObj.endDate : '';

                }

                // 先置回第一页，在发送请求，根据日期获取数据
                // 赋值上去
                this.orderList.beginDate = this.begin;
                this.orderList.endDate = this.end;
                this.orderList.nameOrPhone= this.basicSearch.receiver;
                this.orderList.orderStatus = this.currentStatus;
                this.currentPage = 1;
                this.getData();
            },

            searchWithReceiver() {
                // 点击的时候，关掉高级搜索框；清掉this.orderList,和this.advancedSrch;
                this.isAdvancedSearch = false;
                this.resetSearch();
                /*
                    根据后台逻辑修改，这个需要把用户输入同时赋值给 orderReceiverMobile 和 orderReceiverName
                     // 根据收货人姓名/电话/供应商名称查询；在后台做区分；
                     符合条件拼接；
                 */

                this.orderList.beginDate = this.begin;
                this.orderList.endDate = this.end;
                // this.orderList.storeName = this.orderList.orderReceiverMobile = this.orderList.orderReceiverName = this.basicSearch.receiver;
                // this.orderList.nameOrPhone = this.basicSearch.receiver;
                this.orderList.orderStatus = this.basicSearch.orderStatus;
                // 根据收货人姓名/电话查询；先置回，在查找；
                this.currentPage = 1;
                this.getData();

            },

            // 点击按照下单时间排序；
            toSort(){
                this.flag = this.flag === 1 ? -1 : 1;
                this.orderList.flag = this.flag;
                this.currentPage = 1;
                this.getData();
            },

            // 确认发货；
            confirmOrder(orderId, orderStatus) {

                this.$router.push({path:'/orderLogistics', query: {id : orderId,status: orderStatus,source:'adminList'}});

            },

            // 通过接口获取物流公司名称；
            getLogisticsName() {
                api.getLogisticsName().then((res) => {
                    // 获取物流公司名称，并进行保存；
                    this.logisticsFirm = res.data;
                });
            },
            //查看物流；
            seeLogics(id) {
                this.isClicked = false;
                // 修改currentId 为当前订单id;
                this.currentId = id;
                api.getOrderById(id).then((res) => {
                    var info = res.data.data;
                    this.currentStatus = info.orderStatus;
                    // 设置当orderStatus等于19，禁止自动发货按钮
                    if (this.currentStatus == 19) {
                        this.isClicked = true;
                    };
                    if (res.data.code == 1) {
                        if (info.orderShipMethod === 1) {
                            //自配送
                            this.isShowInfo = true;
                            //绑定物流数据； 自配送
                            this.distributorName = info.distributorName;
                            this.distributorMobile = info.distributorMobile;
                            this.isAuto = true;
                        } else if (info.orderShipMethod === 2) {
                            this.isAuto = false;
                            //物流公司  显示物流信息；
                            this.isShowInfo = false;
                            /*
                             * decs:
                             * 获取当前快递单号；然后发请求，获取物流跟踪信息；
                             */
                            this.logisticsNum = info.orderShipmentNumber;
                            // 传参调用一次查询功能；
                            this.trackLogisticsInfo(this.logisticsNum);

                        } else {
                            this.$alert('请填写发货方式！');
                            return;
                        }
                    }
                    ;
                    //打开弹窗，显示物流信息；
                    this.seeLogicsVisible = true;
                }).catch(function (msg) {
                    console.log('error message is: ' + msg);
                });

            },

            /*
            高级搜索;
                1，允许基本搜索条件多个条件，也允许高级搜索条件重合，但是不许两种搜索之间条件交叉；
                2，只允许基本搜索和高级搜索，其中一个，
                3，在点开高级搜索的时候，清空参数对象，以免出现搜索条件冲突

             */
            advancedSearch() {
                // 在高级搜索的时候，需要置空所有的条件，发请求，展示所有数据；
                this.isAdvancedSearch = !this.isAdvancedSearch;
                this.resetSearch();
            },

            searchOrder() {

                for (var k  in this.formateDate(this.advancedSrch)) {
                    this.orderList[k] = this.formateDate(this.advancedSrch)[k];
                }

                // 使用键值对保存需要比对的；
                let timeArr = {
                    beginDate: 'endDate',
                    orderReceiveBeginTime: 'orderReceiveEndTime',
                    orderPaymentBeginTime: 'orderPaymentEndTime',
                    beginMoney: 'endMoney',
                };

                let advancedInput = this.advancedSrch;
                // 每对都有值，再判断大小；·
                // switch case 没法改啊。。。

                if (advancedInput.beginDate && advancedInput[timeArr.beginDate]) {
                    if (advancedInput.beginDate.getTime() > advancedInput[timeArr.beginDate].getTime()) {
                        this.$alert('创建日期：终止日期不能小于起始日期');
                        return;
                    }
                }

                if (advancedInput.orderReceiveBeginTime && advancedInput[timeArr.orderReceiveBeginTime]) {
                    if (advancedInput.orderReceiveBeginTime.getTime() > advancedInput[timeArr.orderReceiveBeginTime].getTime()) {
                        this.$alert('收货时间：终止日期不能小于起始日期');
                        return;
                    }
                }

                if (advancedInput.orderPaymentBeginTime && advancedInput[timeArr.orderPaymentBeginTime]) {
                    if (advancedInput.orderPaymentBeginTime.getTime() > advancedInput[timeArr.orderPaymentBeginTime].getTime()) {
                        this.$alert('支付时间：终止日期不能小于起始日期');
                        return;
                    }
                }

                if (Number(advancedInput.beginMoney) && Number(advancedInput[timeArr.beginMoney])) {
                    if (Number(advancedInput.beginMoney) > Number(advancedInput[timeArr.beginMoney])) {
                        this.$alert('支付金额：最大金额不能小于最小金额');
                        return;
                    }
                }

                // 不能和基本搜索里面的订单状态 合并搜索；
                // this.changeSta = this.orderList.orderStatus;

                if (this.orderList.orderId && !(/^\d{30}$/.test(this.orderList.orderId))) {
                    this.$alert('订单号长度为30位数');
                    return;
                }

                this.currentPage = 1;
                // this.isAdvancedSearch = false;
                this.getData();
            },

            // 导出框里面起始页和终止页逻辑；
            beginPage(selectedBeginPage) {
                this.startPage = selectedBeginPage;
            },

            overPage(selectedEndPage) {
                this.endPage = selectedEndPage;
            },

            selectPageScope(index) {
                //根据选择的 的导出方式，确定打印范围；
                // label只支持数字，不支持非数字类型字符串；
                // 根据label传回值，来确定是哪种方式；
                if (index == 1) {
                    this.exportMethod = 'currentPage';
                } else if (index == 2) {
                    this.exportMethod = 'selectedPage';
                } else {
                    this.exportMethod = 'allPage';
                }
            },
            // 点击确定，导出订单列表
            exportOrder() {
                //先关闭模态框
                let that = this;

                let page = '';
                //根据选择的导出类型，设置起始页，终止页
                if (this.exportMethod == 'currentPage') {
                    //传一个页数
                    page = this.currentPage;

                } else if (this.exportMethod == 'selectedPage') {
                    if (this.endPage < this.startPage) {
                        this.$alert('终止页不能小于起始页');
                        return;
                    }
                    page = this.startPage + ',' + this.endPage;
                } else if (this.exportMethod == 'allPage') {
                    //全部数据传空值；
                    page = '';
                } else {
                    this.$alert('请选择导出方式');
                    return;
                }

                this.dialogVisible = false;
                //发送请求之前，先进行参数处理 格式是 "’startPage,endPage'pageSize"
                // 实现下载功能 ，自己配置路径适配线上线下；
//                let hostName = this.$globalData.host || 'http://10.100.50.59:8080';

                // 根据过滤条件，拼接 导出参数；没有可以不用传；
                // 拷贝一份对象，过滤不需要的字段；
                let strObj = {};
                let searchString = '';
                // 修改rows为pageSize;
                for (let item in this.orderList) {
                    if (item != 'pageNum' && item != 'pageSize')
                        strObj[item] = this.orderList[item];
                }

                for (var item in strObj) {
                    if (strObj[item] && item != 'pageSize') {
                        searchString += item + '=' + strObj[item] + '&';
                    }
                }
                // 转换对象，然后进行替换；
                let searchStr = searchString.replace(/(.+)&$/g, '$1');
                let accountId = this.accountId;
                window.location.href =  this.baseUrl + '/order/adminExport?pageNum=' + page + '&pageSize=' + this.pageSize + '&accountId=' + accountId + '&' + searchStr + '&token=' + this.token;
            },

            /**
             * 分页 functions
             * 获取接口分页
             **/
            //当切换状态时， 页码重置为第一页， 并获取新数据
            changeStatus(e) {
                for (let item in this.orderList) {
                    this.orderList[item] = null;
                }
                this.changeSta = e;
                if (this.changeSta == 0) {
                    this.orderList.orderStatus = null;
                } else {
                    this.orderList.orderStatus = this.changeSta;
                }
                this.isAdvancedSearch = false;
                this.currentPage = 1;
                this.orderList.beginDate = this.begin;
                this.orderList.endDate = this.end;
                this.orderList.pageSize = this.pageSize;
                // this.orderList.storeName = this.orderList.orderReceiverMobile = this.orderList.orderReceiverName = this.basicSearch.receiver;
                this.orderList.nameOrPhone = this.basicSearch.receiver;
                this.getData();
            },
            //获取数据的方法
            getData() {
                // 处理前后的空格；
                if (this.basicSearch.receiver) {
                    // this.orderList.storeName = this.orderList.storeName && this.orderList.storeName.trim();
                    // this.orderList.orderReceiverMobile = this.orderList.orderReceiverMobile.trim();
                    // this.orderList.orderReceiverName = this.orderList.orderReceiverName.trim();
                    this.orderList.nameOrPhone = this.basicSearch.receiver && this.basicSearch.receiver.trim();
                }

                // 每次在发请求之前，加入供应商id;
                // this.orderList.storeId = this.accountId;
                this.orderList.flag = this.flag;
                this.orderList.pageNum = this.currentPage;
                this.orderList.pageSize = this.pageSize;
                // 如果是基本搜素，就带上过滤条件；
                if (!this.isAdvancedSearch) {
                    this.orderList.orderStatus = this.changeSta == 0 ? '' : this.changeSta;
                }

                for (let order in this.orderList) {
                    if(order === 'flag') {
                        this.orderList[order] = this.flag;
                    } else {
                        this.orderList[order] ? this.orderList[order] : this.orderList[order] = null;
                    }

                }
               // 如果return flag 为true，就用vuex里面的条件，否则就用 用户输入；
                if(this.$store.getters.returnFlag) {
                       //重置之前的操作；
                    this.orderList =  this.$store.getters.pageInfo;
                    this.resume();
                    let filterParams = this.orderList;
                    // 删除列筛选 属性；
                    delete(filterParams.filterDisplayCols);
                    delete(filterParams.filterCheckedCols);
                    this.$store.dispatch('setFlag', false);
                } else {
                        // checked和 display进行匹配；
                    this.displayCols = colOptions.map(r => {
                            return {
                                id: r.id,
                                display: r.isCheck ? true : false,
                                minWidth: r.minWidth,
                                name: r.name
                            };
                        });
                }
                api.searchOrderList(this.orderList).then((res) => {
                    if (res.data.code != 1) {
                        this.pageTotal = 1;
                        this.orderListArr = [];
                        this.$message.error(res.data.message);
                    } else {
                        this.orderListArr = res.data.data.list;
                        if (!this.orderListArr.length) {
                            // this.$alert('未找到符合条件的数据！');
                            this.pageTotal = 1;
                            return;
                        }
                        let ipage = res.data.data.total / this.pageSize;
                        this.pageTotal = res.data.data.total % this.pageSize == 0 ? ipage : Math.ceil(ipage);
                        //获取总页数；
                        this.totalPageExport = this.pageTotal;
                        // 执行回调函数；通过是否有回调函数，来确定来源；
                        // if (callback) {
                        //     callback();
                        // }
                    }
                       // 选中的列不能变；
                   this.displayCols.forEach(r => {
                        if (this.checkedCols.indexOf(r.id) == -1) {
                            r.display = false;
                        } else {
                            r.display = true;
                        }
                    });
                });
            },
            //当点击其他页时， 会触发该方法，  设置currentPage为 点击的页码
            change(index) {
                this.currentPage = index;
                this.getData();
            },

            //每页显示条数
            selectLabelows(row) {
                this.currentPage = 1;
                this.orderList.pageSize = row;
                this.pageSize = row;
                this.getData();
            },

            // 跳转到订单详情页面；
            goToDetail(orderId, orderStatus){
                this.orderList.isAdvancedSearch = this.isAdvancedSearch;
                // 把选择的结果存进去orderList里面去；存两个；
                this.orderList.filterDisplayCols=  this.displayCols;
                this.orderList.filterCheckedCols = this.checkedCols
                this.$store.dispatch('setPageInfo', this.orderList);
                // this.$router.push({path:'/adminOrderDetail', query: {id: orderId, status: orderStatus}});
                this.$router.push({path:'/orderDetail', query: {id: orderId, status: orderStatus,source: 'adminList'}});

            },
            // 跳到退款详情页面
             goToRefund(orderId,orderStatus){
                 // this.$router.push({path:'/refundAudit', query: {id: orderId,status: orderStatus, source:'adminList'}});
                 this.orderList.isAdvancedSearch = this.isAdvancedSearch;
                // 存进去用户筛选状态
                this.orderList.filterDisplayCols=  this.displayCols;
                this.orderList.filterCheckedCols = this.checkedCols
                this.$store.dispatch('setPageInfo', this.orderList);
                this.$router.push({path:'/refundAudit', query: {id: orderId,status: orderStatus, source:'adminList'}});
            },

            // 点击已拒收，查看拒收原因
            showRefuseReason(orderId) {
                this.isRefused = true;
                // 发送请求，获取原因，然后进行渲染；
                api.scanRefuseOrderReason(orderId).then((res) => {
                    if (res.data.code === 1) {
                        // 用对象接收，然后进行绑定赋值；
                        this.refusedReason = res.data.data;
                    } else {
                        this.$alert('获取失败');
                    }
                }).catch((err) => {
                    console.log('错误信息： ' + err);
                });

            },
              //重置之前的用户搜索状态；
            resume() {
                // 基本搜索和高级搜索两部分，需要传入参数来标记；
                this.isAdvancedSearch = this.orderList.isAdvancedSearch;
                this.changeSta = this.orderList.orderStatus;
                this.currentPage = this.orderList.pageNum || 1; //页数默认不能为null;
                // 还原用户选择的列；
                if(this.orderList.filterCheckedCols) {
                    // 还原用户操作；
                    this.displayCols = this.orderList.filterDisplayCols;
                    this.checkedCols = this.orderList.filterCheckedCols;
                    this.cols = this.displayCols;
                    this.isShowList = true;
                    this.confirmDisplay();
                }

                if(this.orderList.isAdvancedSearch) {
                    // 高级搜索；
                    for(let item in this.advancedSrch) {
                        if(this.orderList[item]) {
                            this.advancedSrch[item] = this.orderList[item]
                        }
                    };
                } else {
                     for(let item in this.basicSearch) {
                        if(this.orderList.nameOrPhone){
                             this.basicSearch.receiver = this.orderList.nameOrPhone;
                        }
                        if(this.orderList[item]) {
                            this.basicSearch[item] = this.orderList[item];
                        }
                    };
                }
            },
            // 点击查看 取消原因
            showCancelReason(orderId) {
                this.isCanceled = true;
                api.scanCancelReason(orderId).then((res) => {
                    if (res.data.code === 1) {
                        // 取消订单原因展示；
                        if (!res.data.data) {
                            return;
                        }
                        this.canceledReason = res.data.data;
                    } else {
                        this.$alert('获取失败');
                    }
                });
            },

            //物流信息跟踪；
            trackLogisticsInfo(logNum) {
                // 每次出来的时候，先置空；
                this.logisticsData = [{}];
                /*
                 * 1.调用跟踪物流接口，默认当前的快递单号，查询对应物流信息
                 * 2.用户输入快递单号，可以查询物流信息；
                 * 用传参来判断是进入页面查询，还是用户手动查询；
                 *
                 */
                var logNumber;
                if (logNum == -1) {
                    // 用户手动查询
                    logNumber = this.logisticsNum;
                } else {
                    // 刚进入查询自动查询；
                    logNumber = logNum;
                }

                api.trackLogistics(logNumber).then((res) => {
                    if (res.data.code === 1) {
                        // 物流跟踪消息；
                        this.logisticsData = res.data.data.data;

                    } else {
                        this.$alert('暂无数据');
                    }

                });
            },
// 自动收货；
            autoReceiveGoods() {
                this.seeLogicsVisible = false;
                let param = {orderId: this.currentId};
                api.autoReceiveGoods(param).then((res) => {
                    if (res.data.code === 1) {
                        this.$alert('确认送达成功!');
                        this.getData();
                    } else {
                        this.$alert('确认送达失败，请重试！');
                    }
                });
            },
            // 工具方法；
            //时间对象格式化；
            formateDate(obj) {
                // 新创建一个对象，进行浅拷贝；
                let dateObj = {};
                for (let key in obj) {
                    dateObj[key] = obj[key];
                }

                for (let item in dateObj) {
                    // 传入对象，datepicker传入的是对象；并且是日期对象；
                    if (typeof dateObj[item] == 'object' && dateObj[item] instanceof Date) {
                        dateObj[item] = format(dateObj[item], 'YYYY-MM-DD', {locale: zh_cn});
                    }
                }
                // 返回格式化后的对象；
                return dateObj;
            },

            // 公共方法每次在改变搜索状态时，进行重置；
            resetSearch() {
                for (let item in this.orderList) {
                    this.orderList[item] = null;
                }

                for (let item in this.advancedSrch) {
                    this.advancedSrch[item] = null;
                }

            },
        },
        watch: {
        },

        computed: {
            // vuex存储 orderList;
            ...mapGetters([
                'searchItems',
                'returnFlag'
            ]),
            supplierId() {
                return this.accountId;
            },

            getStatusList() {
                let status = this.changeSta;
                let searchStatus = this.orderList.orderStatus;
                let listArr = [];
                if (searchStatus == null) {
                    listArr = this.orderListArr;
                }
                if (status != 0 && !this.isAdvancedSearch) {
                    this.orderListArr.forEach(function (item) {
                        if (status == 3 && item.orderStatus == 19) {
                            listArr.push(item);
                        }
                        ;
                        if (item.orderStatus == status) {
                            listArr.push(item);
                        }
                    });
                } else {
                    listArr = this.orderListArr;
                }
                listArr.forEach(function (val) {
                /*
                 * 1.待付款2.待发货3.已发货4.已完成 5.已拒收退款审核6.已退款7.已支付退款审核8.待付款已取消 9.退款中 10审核通过 11.拒绝退款 12.已收货
                 */
                    if (!val.statusName) {
                        switch(val.orderStatus) {
                            case 1:
                                Vue.set(val, 'statusName', '待付款');
                                break;
                            case 2:
                                Vue.set(val, 'statusName', '待发货');
                                break;
                            case 3:
                            case 19:
                                Vue.set(val, 'statusName', '已发货');
                                break;
                            case 4:
                                Vue.set(val, 'statusName', '已完成');
                                break;
                            case 5:
                                Vue.set(val, 'statusName', '已拒收退款审核');
                                break;
                            case 6:
                                Vue.set(val, 'statusName', '已退款');
                                break;
                            case 7:
                                Vue.set(val, 'statusName', '已支付退款审核');
                                break;
                            case 8:
                                Vue.set(val, 'statusName', '待付款已取消');
                                break;
                            case 9:
                                Vue.set(val, 'statusName', '退款中');
                                break;
                            case 10:
                                Vue.set(val, 'statusName', '审核通过');
                                break;
                            case 11:
                                Vue.set(val, 'statusName', '拒绝退款');
                                break;
                            case 12:
                                Vue.set(val, 'statusName', '已收货');
                                break;
                            default:
                                break;
                        }
                        // if (val.orderStatus == 1) {
                        //     Vue.set(val, 'statusName', '待付款');
                        // }
                        // if (val.orderStatus == 2) {
                        //     Vue.set(val, 'statusName', '待发货');
                        // }
                        // if (val.orderStatus == 3 || val.orderStatus == 19) {
                        //     Vue.set(val, 'statusName', '已发货');
                        // }
                        // if (val.orderStatus == 4) {
                        //     Vue.set(val, 'statusName', '已完成');
                        // }
                        // if (val.orderStatus == 5) {
                        //     Vue.set(val, 'statusName', '已拒收待审核');
                        // }
                        // if (val.orderStatus == 6) {
                        //     Vue.set(val, 'statusName', '已退款');
                        // }
                        // if (val.orderStatus == 7) {
                        //     Vue.set(val, 'statusName', '已取消待审核');
                        // }
                        // if (val.orderStatus == 8) {
                        //     Vue.set(val, 'statusName', '待付款已取消');
                        // }
                    }

                });

                return listArr;
            },

        },

        components: {
            paging,
            exportData,
            conductBtn,
        },
        // 定义了过滤器处理数字和支付类型的转换，注意： 这里用的 switch,方面扩充支付类型，但是需要 case后面的值和args数据类型和内容都相等；
        filters: {
            paymentType: function (args) {
                switch (args) {
                    case 1:
                        return '支付宝';
                        break;
                    case 2:
                        return '微信';
                        break;
                    default:
                }
            },
        },
    }
</script>
