<template>
    <div>
        <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>

        <el-col class="comodityList-listWrap">
            <!--普通搜索栏-->
            <div class="publicHeader">
                <!-- 商品状态 -->
                <div class="fl">
                    <label>商品状态</label>
                    <el-select style="width:150px;" v-model="commoditySimpleSearch.status" placeholder="请选择商品状态"
                               @change="simplesearch()">
                        <el-option
                            v-for="item in statusList"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!--审核结果-->
                <div class="fl margin-left15">
                    <label>审核结果</label>
                    <el-select style="width:150px;" v-model="commoditySimpleSearch.auditResult" placeholder="请选择审核结果"
                               @change="simplesearch">
                        <el-option
                            v-for="item in auditStatusList"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- 商品条码/商品名称 -->
                <el-input
                    style="margin-left:15px;width: 250px;"
                    placeholder="商品条码／商品名称"
                    icon="search"
                    v-model="commoditySimpleSearch.inputvalue"
                    :on-icon-click="simplesearch">
                </el-input>
                <!-- 高级搜索按钮 -->
                <el-button class="margin-left15" type="info" @click="supper_search">高级搜索</el-button>
            </div>
            <!-- 高级搜索弹层 -->
            <div class="publicModelSearch commodityList_ModelBox" v-show="dialogFormVisible">
                <el-row>
                    <el-col :span="8">
                        <label style="min-width: 66px;">商品名称</label>
                        <el-input type="text" placeholder="请输入商品名称" style="width:244px;"
                                  v-model="commodityQuery.commName" :maxlength="Number(10)"></el-input>
                    </el-col>

                    <el-col :span="8">
                        <label style="min-width: 66px;">审核结果</label>
                        <el-select style="width:244px;" v-model="commodityQuery.auditResult" placeholder="请选择审核状态">
                            <el-option
                                v-for="item in auditStatusList"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="8">
                        <label style="text-align:right;min-width: 100px;">APP订货价</label>
                        <el-input v-model="commodityQuery.minPrice" :maxlength="Number(256)" type="number" step="0.01"
                                  style="width:120px;"
                                  min="0"></el-input>
                        <el-input type="number" step="0.01" min="0" v-model="commodityQuery.maxPrice"
                                  style="width:120px;"
                                  :maxlength="Number(256)"></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="8">
                        <label style="width: 66px;">商品条码</label>
                        <el-input type="text" style="width:244px;"
                                  placeholder="请输入商品条码" v-model="commodityQuery.commCode69"
                                  :maxlength="Number(20)" onkeyup="value=value.replace(/[^0-9]/g,'');"></el-input>
                    </el-col>


                    <el-col :span="8">
                        <label style="min-width: 66px;">商品状态</label>
                        <el-select style="width:244px;" v-model="commodityQuery.status" placeholder="请选择商品状态">
                            <el-option v-for="list in statusList" :value="list.value"
                                       :label="list.name"></el-option>
                        </el-select>
                    </el-col>


                    <el-col :span="8">
                        <label style="text-align:right;min-width: 100px;">透云进货价</label>
                        <el-input v-model="commodityQuery.minUnitPrice" :maxlength="Number(256)" style="width:120px;"
                                  type="number" step="0.01" min="0"></el-input>
                        <el-input type="number" step="0.01" min="0" v-model="commodityQuery.maxUnitPrice"
                                  style="width:120px;"
                                  :maxlength="Number(256)"></el-input>
                    </el-col>

                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="8">
                        <label style="min-width: 66px;">更新时间</label>
                        <el-date-picker v-model="commodityQuery.beginUpdateAt"
                                        :editable='false' placeholder="请输入日期" type="date"
                                        style="width:120px;">
                        </el-date-picker>
                        <el-date-picker v-model="commodityQuery.endUpdateAt"
                                        :editable='false' placeholder="请输入日期" type="date"
                                        style="width:120px;">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="8">
                        <label style="min-width: 66px;">商品品牌</label>
                        <el-input style="width: 244px;" placeholder="请输入商品品牌" v-model="commodityQuery.commBrand"
                                  :maxlength="Number(256)"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <label style="text-align:right;min-width: 100px;">商品商家编码</label>
                        <el-input placeholder="请输入商品商家编码"
                                  v-model="commodityQuery.code" :maxlength="Number(256)" style="width: 244px;"
                                  onkeyup="value=value.replace(/[^\w\.\/]/ig,'');"></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px;">
                    <el-col :span="16">
                        <label style="min-width: 66px;">商品科属</label>
                        <el-select style="width: 150px;" placeholder="请选择商品科属" v-model="commodityQuery.typeOneId">
                            <el-option value="" :label="all"></el-option>
                            <el-option v-for="cc in commodityClassifyOne" :value="cc.id"
                                       :label="cc.name"></el-option>
                        </el-select>
                        <el-select style="width: 150px;" placeholder="请选择商品科属" v-model="commodityQuery.typeTwoId">
                            <el-option value="" :label="all"></el-option>
                            <el-option v-for="cc in commodityClassifyTwo" :value="cc.id"
                                       :label="cc.name"></el-option>
                        </el-select>
                        <el-select style="width: 150px;" placeholder="请选择商品科属" v-model="commodityQuery.typeThreeId">
                            <el-option value="" :label="all"></el-option>
                            <el-option v-for="cc in commodityClassifyThree" :value="cc.id"
                                       :label="cc.name"></el-option>
                        </el-select>
                    </el-col>
                    <el-col style="float:right;" :span="4">
                        <el-button type="info" @click="highSearch()">查询</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 表单操作区域 -->
            <div class="clearfix commodityList_buttonWrap">
                <div class="col-xs-7 pull-right listOptions clearPadding">
                    <ul class="optionsBox">
                        <li>
                            <el-button @click="router" type="success" v-has:commodityList_addCommodity>新增
                            </el-button>
                        </li>
                        <li>
                            <el-button type="danger" v-has:commodityList_openWarning @click="openWarning(null)">删除
                            </el-button>
                        </li>
                        <li>
                            <el-button type="info" v-has:commodityList_uploadCommodity
                                       @click="uploadCommodity(null)">
                                上架
                            </el-button>
                        </li>
                        <li>
                            <el-button type="info" v-has:commodityList_cancelCommodity
                                       @click="cancelCommodity(null)">
                                下架
                            </el-button>
                        </li>
                        <li>
                            <el-button type="info" v-has:commodityList_exportFile @click="exportFile">导出</el-button>
                        </li>
                        <li>
                            <el-button type="info" v-has:commodityList_download @click="downloadTemplate">下载模板
                            </el-button>
                        </li>
                        <li>
                            <el-upload
                                name="excelFile"
                                class="upload-demo"
                                :action="baseUrl+'/comm/importExcel?supplierId=' + (accountId ? accountId : 0) "
                                :show-file-list="false"
                                :headers="headers"
                                :accept="accepts"
                                :disabled="$store.state.permissions.check('commodityList_importFile')"
                                :before-upload="beforeUpload"
                                :on-preview="handlePreview"
                                :on-success="uploadSuccess"
                                :on-remove="handleRemove">
                                <el-button type="info" v-has:commodityList_importFile>上传</el-button>
                            </el-upload>
                        </li>
                        <!-- 右边划入划出 -->
                        <!-- 按钮 -->
                        <li>
                            <el-button v-has:commodityList_checkedCols type="default"
                                       class="glyphicon glyphicon-list active" role="presentation"
                                       @click="slideToggle"></el-button>
                        </li>
                        <!-- 主体部分 -->
                    </ul>
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
                        <el-checkbox class="checkbox" @change="checkBox">共{{displayCols.length}}项
                        </el-checkbox>
                        <div class="text-center confirm">
                            <button class="btn btn-default" @click="confirmDisplay">确认</button>
                        </div>
                    </div>
                </transition>
            </div>
            <!--table表格-->
            <div class="commodityList_largeTableWrap">
                <div class="commodityList_tableWrap table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <td>
                                <input type="checkbox" v-model='checked' @click='selectAll'/>
                            </td>
                            <td>序号</td>
                            <td v-show="displayCols[0].display">商品名称</td>
                            <td v-show="displayCols[1].display">商品品牌</td>
                            <td v-show="displayCols[2].display">商品条码</td>
                            <td v-show="displayCols[3].display">商品商家编码</td>
                            <td v-show="displayCols[4].display">商品图片</td>
                            <td v-show="displayCols[5].display">规格值</td>
                            <td v-show="displayCols[6].display">库存单位</td>
                            <td v-show="displayCols[7].display">库存量</td>
                            <td v-show="displayCols[8].display">透云进货价</td>
                            <td v-show="displayCols[9].display">APP订货价</td>
                            <td v-show="displayCols[10].display">起订量</td>
                            <td v-show="displayCols[11].display">是否失效</td>
                            <td v-show="displayCols[12].display">商品状态</td>
                            <td v-show="displayCols[13].display">审核结果</td>
                            <td @click="sort" ref="sortTd"
                                v-show="displayCols[14].display">更新时间
                                <i ref="sortI" class="el-icon-arrow-down commodityList_sort"
                                   :class="{commodityList_arrowDown: sortStatus === 0, commodityList_arrowUp:sortStatus=== 1 }"></i>
                            </td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody id="myLowTbody">
                        <tr ref="myLowTr" v-for="(commodityList,index) in commodityLists">
                            <td>
                                <input type="checkbox" name='checkboxinput' :value="commodityList.id"
                                       v-model="ids"/>
                            </td>
                            <td>{{index+1}}</td>
                            <!--商品名称-->
                            <td v-show="displayCols[0].display">{{commodityList.commName}}</td>
                            <!--商品品牌-->
                            <td v-show="displayCols[1].display">{{commodityList.brandName}}</td>
                            <!--商品条码-->
                            <td v-show="displayCols[2].display">{{commodityList.code69}}</td>
                            <!--商品商家编码-->
                            <td v-show="displayCols[3].display">{{commodityList.code}}</td>
                            <!--缩略图-->
                            <td v-show="displayCols[4].display">
                                <!--正常图片-->
                                <img
                                    v-if="commodityList.minImg && commodityList.minImg !== 'ERROR' && commodityList.minImg !== null"
                                    @mouseover="showImg(commodityList.minImg,$event)"
                                    @mouseout="hiddenImg($event)"
                                    :src="commodityList.minImg" class="commityList_tableImgShow">
                                <!--图片正在上传中的占位图-->
                                <img v-if="commodityList.minImg === null" src="../../../static/img/placeholder.png"
                                     style="width: 50px;height: 50px;">
                                <!--图片上传失败的图片-->
                                <img v-if="commodityList.minImg==='ERROR'"
                                     src="../../../static/img/uploadImgError.png"
                                     style="width: 50px;height: 50px;">
                                <!--缩略图显示-->
                                <img class="commityList_tableImgHidden">
                            </td>
                            <!--规格值-->
                            <td v-show="displayCols[5].display">{{commodityList.ruleVal}}</td>
                            <!--库存单位-->
                            <td v-show="displayCols[6].display">{{commodityList.unitName}}</td>
                            <!--库存量-->
                            <td v-show="displayCols[7].display">{{commodityList.inventory}}</td>
                            <!--透云进货价-->
                            <td v-show="displayCols[8].display">{{commodityList.unitPrice}}</td>
                            <!--app订货价-->
                            <td v-show="displayCols[9].display">{{commodityList.price}}</td>
                            <!--起订量-->
                            <td v-show="displayCols[10].display">
                                {{commodityList.minOrderQuantity}}{{commodityList.unitName}}
                            </td>
                            <!--是否失效-->
                            <td v-show="displayCols[11].display">
                                <span v-if="commodityList.invalidStatus===0">失效</span>
                                <span v-if="commodityList.invalidStatus===1">正常</span>
                            </td>
                            <!--商品状态-->
                            <td v-show="displayCols[12].display">
                                <span v-if='commodityList.statusNum === 2'>已上架</span>
                                <span v-else-if='commodityList.statusNum === 3'>已下架</span>
                                <span v-else-if='commodityList.statusNum === 4'>上架待审核</span>
                                <span v-else-if='commodityList.statusNum === 5'>下架待审核</span>
                                <span v-else-if='commodityList.statusNum === 6'>编辑待审核</span>
                            </td>
                            <!--审核结果-->
                            <td v-show="displayCols[13].display">
                                <div v-if="commodityList.auditResult === 0" class="commodityList_auditMessage">
                                    <p class="commodityList_auditMessage">未通过</p>
                                    <p>{{commodityList.auditOpinion}}</p>
                                </div>
                                <p v-if="commodityList.auditResult === 1">通过</p>
                                <p v-if="commodityList.auditResult === 2">待审核</p>
                            </td>
                            <!--更新时间-->
                            <td v-show="displayCols[14].display">{{commodityList.updatedAt}}</td>
                            <!--操作-->
                            <td class="publicLargeEdit">
                                <img src="../../../static/img/details.png" alt="">
                                <infoListBut :commodityList="commodityList" :type="Number(2)"
                                             @goodsShelves="goodsShelves(commodityList.id)"
                                             @goodsOffShelf="goodsOffShelf(commodityList.id)"
                                             @commodityDetail="commodityDetail(commodityList.id)"
                                             @openWarning="openWarning(commodityList.id)"></infoListBut>
                            </td>
                        </tr>
                        <tr v-if="commodityLists.length===0">
                            <td v-if="isAdmin" colspan="17"> 没有数据记录</td>
                            <td v-else colspan="17">没有数据记录</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <table class="table table-hover table-bordered publicEditTable">
                    <thead>
                    <tr>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody id="myHighTbody">
                    <tr v-for="(commodityList,index) in commodityLists">
                        <td>
                            <img src="../../../static/img/details.png" alt="">
                            <infoListBut :commodityList="commodityList" :type="Number(2)"
                                         @goodsShelves="goodsShelves(commodityList.id)"
                                         @goodsOffShelf="goodsOffShelf(commodityList.id)"
                                         @commodityDetail="commodityDetail(commodityList.id)"
                                         @openWarning="openWarning(commodityList.id)"></infoListBut>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--分页-->
            <div class="commodityList_pageWrap" v-show="queryType==1">
                <paging ref="page" :page-num="simplePageTotal" :current-page="simpleCurrentPage"
                        :pageSize="10" @change="change" v-on:changeR="changeRows"></paging>
            </div>
            <!--分页-->
            <div class="commodityList_pageWrap" v-show="queryType==2">
                <paging ref="page" :page-num="pageTotal" :current-page="currentPage"
                        :pageSize="10" @change="change" v-on:changeR="changeRows"></paging>
            </div>
        </el-col>
        <!--批量上架商品的模态框-->
        <div>
            <el-dialog class="commoidityList_export" title="商品批量导入详情" :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                    <el-table-column property="code69" label="商品条码"></el-table-column>
                    <el-table-column property="sjcode" label="商品商家编码"></el-table-column>
                    <el-table-column property="brand" label="商品品牌"></el-table-column>
                    <el-table-column property="name" label="商品名称"></el-table-column>
                    <el-table-column property="measureSpecName" label="规格单位"></el-table-column>
                    <el-table-column property="ruleVal" label="规格值"></el-table-column>
                    <el-table-column property="unit" label="库存单位"></el-table-column>
                    <el-table-column property="tagName" label="商品标签"></el-table-column>
                    <el-table-column property="companyName" label="企业名称"></el-table-column>
                    <el-table-column property="originPlace" label="商品产地"></el-table-column>
                    <el-table-column property="message" label="上传结果"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <div>上传失败行号</div>
                    <div v-for="i in uncorrectNums" :disabled="true">
                        <span>行号:{{i.rowNum}}---错误信息:{{i.message}}</span>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 敏感操作的警告框 -->
        <el-dialog
            title="提示"
            :visible.sync="isWarning"
            size="tiny">
            <span>确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isWarning = false">取 消</el-button>
                <el-button type="primary" @click="deleteCommodity">确 定</el-button>
              </span>
        </el-dialog>
        <!-- 导出模态框 -->
        <el-dialog title="请选择导出方式:" :visible.sync="isExportShow" size="tiny" class="commodityList_exportWrap">
            <template>
                <!-- 单选按钮组-->
                <el-radio-group v-model="radio" @change="selectPageScope">
                    <div style="overflow:hidden">
                        <el-radio :label="1">导出当前页列表</el-radio>
                    </div>
                    <div style="overflow: hidden">
                        <el-radio :label="2" style="width: 100%;">导出所选页列表
                            <el-select @change="beginPage" v-model="selectedBeginPage" style="width: 60px;">
                                <el-option :value="index" v-for="(index,item) in totalPageExport">{{index}}
                                </el-option>
                            </el-select>
                            <span>--</span>
                            <el-select @change="overPage" v-model="selectedOverPage" style="width: 60px;">
                                <el-option :value="k" v-for="(k,item) in totalPageExport">{{k}}</el-option>
                            </el-select>
                        </el-radio>
                    </div>
                    <div style="overflow: hidden;">
                        <el-radio :label="3">导出所有列表</el-radio>
                    </div>
                </el-radio-group>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isExportShow = false">取 消</el-button>
                <el-button type="primary" @click="exportOrder">确 定</el-button>
            </span>
        </el-dialog>

        <!--资质信息未通过模态框-->
        <el-dialog
            :visible.sync="isAptitudePass"
            size="tiny"
            :before-close="aptitudeHandleClose">
            <span>抱歉，该供应商还没通过资质信息审核，无法上架商品！</span>
            <span slot="footer" class="dialog-footer" v-show="isAdmin === '1'">
              <router-link
                  :to="{path:'/supplierInfoEdit',query: {'accountId':accountId,'routeSupplier':2}}">
                  <el-button type="info">资质信息</el-button>
              </router-link>
            </span>
            <span slot="footer" class="dialog-footer" v-show="isAdmin === '0'">
              <router-link
                  :to="{path:'/commonSupplierInfoEdit',query: {'accountId':supplierAccountId,'routeSupplier':3}}">
                  <el-button type="info">资质信息</el-button>
              </router-link>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import vue from 'vue';
    import axios from 'axios';
    import qs from 'qs';
    import '../../../static/css/tempCommodityList.less';
    import paging from '../../components/page';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import FilterOper from '../../components/filter'
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import infoListBut from '../../components/commodity/infoListBut.vue';
    import {mapGetters} from 'vuex';
    import com from '../../utils/commodity.js';
    import comm from '../../api/comm.js';
    import commBrand from '../../api/commBrand.js';
    import commCarton from '../../api/commCarton.js';
    import commMeasureSpec from '../../api/commMeasureSpec.js';
    import commTag from '../../api/commTag.js';
    import commType from '../../api/commType.js';
    import commUnit from '../../api/commUnit.js';

    const colOptions = [{ id: '0', name: '商品名称', isCheck: true }, { id: '1', name: '商品品牌' },
        { id: '2', name: '商品条码', isCheck: true }, { id: '3', name: '商品商家编码' },
        { id: '4', name: '商品图片', isCheck: true }, { id: '5', name: '规格值', isCheck: true }, { id: '6', name: '库存单位' },
        { id: '7', name: '库存量', isCheck: true }, { id: '8', name: '透云进货价' }, { id: '9', name: 'APP订货价', isCheck: true },
        { id: '10', name: '起订量', isCheck: true }, { id: '11', name: '是否失效' },
        { id: '12', name: '商品状态', isCheck: true }, { id: '13', name: '审核结果', isCheck: true }, { id: '14', name: '更新时间' }
    ];
    export default {
        data() {
            return {
                baseUrl: '',
                value: '',
                familiesGenera: [
                    { name: '全部', value: 0 }
                ],
                all: '全部',
                statusList: [
                    { name: '全部', value: '' },
                    { name: '已上架', value: 2 },
                    { name: '已下架', value: 3 },
                    { name: '上架待审核', value: 4 },
                    { name: '下架待审核', value: 5 },
                    { name: '编辑待审核', value: 6 }
                ],
                auditStatusList: [
                    { name: '全部', value: '' },
                    { name: '未通过', value: 0 },
                    { name: '通过', value: 1 },
                    { name: '待审核', value: 2 }
                ],
                invalidStatus: [
                    { name: '全部', value: '' },
                    { name: '失效', value: 0 },
                    { name: '正常', value: 1 }
                ],
                accepts: 'application/zip, application/x-zip-compressed,application/rar',
                queryType: 1,                        //1-简易查询，2-高级查询
                simplePageSize: 10,
                simpleCurrentPage: 1,
                simplePageTotal: 5,
                simplePageNum: 1,
                displayCols: [],
                checkedCols: [],
                cols: colOptions,
                simBeginCreateAt: '',
                simEndCreateAt: '',

                dialogFormVisible: false,
                // 在敏感操作上添加确认弹窗，以防误操作；
                isWarning: false,
                checked: '',
                pageTotal: 5, //总页码
                pageNum: 1,
                currentPage: 1, //当前页
                title: '商品列表',
                token: null,
                accountId: {},
                ids: [],
                pid: null,
                commodityLists: [],
                commodityClassifyOne: [],
                commodityClassifyTwo: [],
                commodityClassifyThree: [],
                commoditySimpleSearch: {
                    'auditResult': null,
                    'status': null,
                    'inputvalue': '',
                },
                commodityQuery: {
                    'supplierId': '',
                    'commCode69': '',
                    'code': '',
                    'supplierName': '',
                    'commBrand': '',
                    'commName': '',
                    'status': '',
                    'typeOneId': null,
                    'typeTwoId': null,
                    'typeThreeId': null,
                    'minPrice': '',
                    'maxPrice': '',
                    'minUnitPrice': '',
                    'maxUnitPrice': '',
                    'beginUpdateAt': '',
                    'endUpdateAt': '',
                    'pageNum': 1,
                    'pageSize': 10,
                    'auditResult': null,

                },
                dialogTableVisible: false,
                gridData: [],
                uncorrectNums: [],
                // 选择列表项；
                isShowList: false,
                isAdmin: '',
//                导出模块部分
                isExportShow: false,
                selectedBeginPage: 1,
                selectedOverPage: 1,
                totalPageExport: 1,
                radio: 1,
                isExportOrHighExport: 1,   //刘述定义,判断是高级导出还是普通导出,默认导出为普通导出
                row: 10,                  //刘述定义,页面分页效果上面的页面显示条数,默认为10页
                exportMethod: 'currentPage',
                isAptitudePass: false,
                supplierAccountId: 0,
                sortStatus: 1,    //初始化排序,
                queryResult: null
            };
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'returnFlag'
            ]),
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            navigationList() {
//                this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
                this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
                if (this.isAdmin == 0) {
                    return [{ name: '商品管理' }, { name: '商品列表' }]
                } else if (this.isAdmin == 1) {
                    return [{ name: '供应商管理' }, { name: '供应商列表', route: { path: '/supplierInfoList' } }, {
                        name: '商品列表',
                        route: { path: '/commodityList', query: { 'accountId': this.$route.query.accountId } }
                    }];
                }
            }
        },
        created: function () {
            this.baseUrl = this.$globalData.baseUrl;
//            this.token = window.localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;

            //供应商accountId
//            this.supplierAccountId = JSON.parse(localStorage.getItem('account')).accountId;
            this.supplierAccountId = JSON.parse(sessionStorage.getItem('vuex')).user.account.accountId;
            //管理员跳转过来的accountId
            this.accountId = this.$route.query.accountId;

            if (this.$store.getters.returnFlag) {
                this.displayCols = this.$store.getters.pageInfo.displayCol;
                this.cols = this.$store.getters.pageInfo.cols;
                if (this.$store.getters.pageInfo.serachStuats.type === 1) {
                    this.simplesearch();
                } else if (this.$store.getters.pageInfo.serachStuats.type === 2) {
                    this.highSearch();
                }
                this.$store.dispatch('setFlag', false);
            } else {
                this.simplesearch();
                this.displayCols = colOptions.map(r => {
                    return {
                        'id': r.id,
                        'display': r.isCheck ? true : false,
                    };
                });
            }
            this.getCommodityType();


        },


        methods: {
            /**
             * 新增跳转
             * */
            router() {
                this.$router.push({
                    path: 'addCommodity',
                    query: {
                        accountId: this.accountId,
                    }
                });
            },
            //查看详情
            commodityDetail(id) {
                let pageInfo = {};
                //普通查询
                if (this.queryType === 1) {
                    pageInfo.serachStuats = {
                        pageNum: this.simpleCurrentPage,
                        pageSize: this.simplePageSize,
                        sortStatus: this.sortStatus,
                        status: this.commoditySimpleSearch.status,
                        auditResult: this.commoditySimpleSearch.auditResult,
                        inputvalue: this.commoditySimpleSearch.inputvalue,
                        supplierId: this.accountId,
                        type: 1
                    };
                } else if (this.queryType === 2) {
                    pageInfo.serachStuats = this.commodityQuery;
                    pageInfo.serachStuats.sortStatus = this.sortStatus;
                    pageInfo.serachStuats.type = 2;
                }
                pageInfo.displayCol = this.displayCols;

                //先把选项列表项所有选项置空
                for (let i = 0; i < this.cols.length; i++) {
                    this.cols[i].isCheck = false;
                }
                //根据当前选择的选项列表项确定选中状态
                for (let i = 0; i < this.checkedCols.length; i++) {
                    if (this.checkedCols[i]) {
                        this.cols[this.checkedCols[i]].isCheck = true;
                    }
                }
                pageInfo.cols = this.cols;
                this.$store.dispatch('setPageInfo', pageInfo);

                this.$router.push({
                    path: 'commodityInfo',
                    query: {
                        commodityId: id,
                        accountId: this.accountId,
                        supplierAccountId: this.supplierAccountId,
                        isAdmin: this.isAdmin
                    }
                });
            },

            /**
             * 正序倒序方法
             * */
            sort() {
                this.$refs.sortI.className = this.$refs.sortI.className === 'commodityList_arrowDown' ? 'commodityList_arrowUp' : 'commodityList_arrowDown';
                this.sortStatus = this.sortStatus ? 0 : 1;
                this.queryType === 1 ? this.getSimpleData() : this.query();
            }
            ,
            /**
             * 资质审核未通过关闭方法
             * */
            aptitudeHandleClose() {
                this.isAptitudePass = false;
            }
            ,
            //导出功能方法
            selectPageScope(index) {
                //根据选择的 的导出方式，确定打印范围；
                // label只支持数字，不支持非数字类型字符串；
                // 根据label传回值，来确定是哪种方式；
                index == 1 ? this.exportMethod = 'currentPage' : index == 2 ? this.exportMethod = 'selectedPage' : this.exportMethod = 'allPage';
            },
            beginPage() {
                this.startPage = this.selectedBeginPage;
            },
            overPage() {
                this.endPage = this.selectedOverPage;
            },
            /**
             * 导出函数(普通和高级导出)
             * */
            exportOrder() {
                let page = '',
                    beginUpdateAt = '',
                    endUpdateAt = '',
                    searchStr = '',
                    searchString = '',
                    inputValue = '',
                    accountId = null,         //供应商ID
                    token = this.token;
                //根据选择的导出类型，设置起始页，终止页
                if (this.exportMethod == 'currentPage') {
                    //传一个页数
                    page = this.currentPage;
                } else if (this.exportMethod == 'selectedPage') {
                    if (this.endPage < this.startPage) {
                        this.$alert('终止页不能小于起始页');
                        return;
                    }
                    if (this.startPage === undefined) {
                        this.startPage = 1;
                    }
                    if (this.endPage === undefined) {
                        this.endPage = 1;
                    }
                    page = [this.startPage, this.endPage];
                } else if (this.exportMethod == 'allPage') {
                    //全部数据传空值；
                    page = '';
                } else {
                    this.$alert('请选择导出方式');
                    return;
                }
                //判断供应商ID是否存在
                accountId = this.supplierAccountId ? this.supplierAccountId : this.accountId;

                if (this.commoditySimpleSearch.inputvalue) {
                    inputValue = this.commoditySimpleSearch.inputvalue;
                }

                this.isExportShow = false;   //关闭导出模态框
                //导出方式判断是高级导出还是普通导出
                if (this.isExportOrHighExport === 1) {    //普通导出
                    if (this.commoditySimpleSearch.status) {
                        searchString = 'pageNum=' + page + '&pageSize=' + this.row + '&supplierId=' + accountId + '&token=' + this.token + '&inputvalue=' + inputValue + '&status=' + this.commoditySimpleSearch.status + '&sortStatus=' + this.sortStatus;
                    } else if (this.commoditySimpleSearch.auditResult) {
                        searchString = 'pageNum=' + page + '&pageSize=' + this.row + '&supplierId=' + accountId + '&token=' + this.token + '&inputvalue=' + inputValue + '&auditResult=' + this.commoditySimpleSearch.auditResult + '&sortStatus=' + this.sortStatus;
                    } else if (this.commoditySimpleSearch.auditResult && this.commoditySimpleSearch.status) {
                        searchString = 'pageNum=' + page + '&pageSize=' + this.row + '&supplierId=' + accountId + '&token=' + this.token + '&inputvalue=' + inputValue + '&auditResult=' + this.commoditySimpleSearch.auditResult + '&status=' + this.commoditySimpleSearch.status + '&sortStatus=' + this.sortStatus;
                    }
                    searchString = 'pageNum=' + page + '&pageSize=' + this.row + '&supplierId=' + accountId + '&token=' + this.token + '&inputvalue=' + inputValue + '&sortStatus=' + this.sortStatus;
                } else if (this.isExportOrHighExport === 2) {    //高级导出
                    beginUpdateAt = this.commodityQuery.beginUpdateAt ? format(this.commodityQuery.beginUpdateAt, 'YYYY-MM-DD', { locale: zh_cn }) : ''; //高级查询的更新时间
                    endUpdateAt = this.commodityQuery.endUpdateAt ? format(this.commodityQuery.endUpdateAt, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                    for (let item in this.commodityQuery) {
                        if (this.commodityQuery[item] !== null) {
                            if (item === 'beginUpdateAt' || item === 'endUpdateAt' || item === 'pageNum') {
                            } else {
                                searchStr += item + '=' + this.commodityQuery[item] + '&';
                            }
                        }
                    }
                    searchString = searchStr.substr(0, searchStr.length - 1) + '' + '&beginUpdateAt=' + beginUpdateAt + '&endUpdateAt=' + endUpdateAt + '&token=' + this.token + '&pageNum=' + page + '&sortStatus=' + this.sortStatus;

                }
                window.location.href = this.baseUrl + '/comm/simpleExportExcel?' + searchString;

            },
            showImg(data, event) {
                if (data === '') { //判断图片不存在的话,放大的那张图片也就不显示了
                    event.target.nextElementSibling.src = '';
                } else {
                    event.target.nextElementSibling.src = data;
                    event.target.nextElementSibling.classList.add('commityList_tableImgDisplay');
                }

            },
            hiddenImg(event) {
                event.target.nextElementSibling.src = '';
                event.target.nextElementSibling.classList.remove('commityList_tableImgDisplay');
            },
            beforeUpload(file) {
                let suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
                if ('zip' !== suffix) {
                    this.$alert('请上传zip格式的文件');
                    return false;
                }
            },

            confirmDisplay() {
                if (this.checkedCols && this.checkedCols.length > 4) {
                    this.displayCols.forEach(r => {
                        if (this.checkedCols.indexOf(r.id) == -1) {
                            r.display = false;
                        } else {
                            r.display = true;
                        }
                    });
                    this.isShowList = !this.isShowList;
                } else {
                    this.$alert('请勾选4个以上的选项');
                    return;
                }
                this.changeRowHeight();
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
            /**
             * 普通查询
             * */
            simplesearch() {
                if (this.dialogFormVisible) {
                    this.dialogFormVisible = !this.dialogFormVisible;
                }
                //清空高级查询的搜索条件
                for (let key in this.commodityQuery) {
                    if (key === 'pageNum' || key === 'pageSize') {
                        continue;
                    }
                    this.commodityQuery[key] = null;
                }
                this.simpleCurrentPage = 1;
                this.queryType = 1;
                this.isExportOrHighExport = 1;
                this.getSimpleData();
            }
            ,
            /**
             * 普通查询实现
             * */
            getSimpleData() {
                let param = {},
                    auditResult = this.commoditySimpleSearch.auditResult,
                    status = this.commoditySimpleSearch.status,
                    inputvalue = this.commoditySimpleSearch.inputvalue;

                if (this.$store.getters.returnFlag) {
                    param = this.$store.getters.pageInfo.serachStuats;
                    for (let i in this.commoditySimpleSearch) {
                        this.commoditySimpleSearch[i] = param[i];
                    }
                    this.$store.dispatch('setFlag', false);
                } else {

                    //这个是普通查询的基本状态就是页面刷新的时候只有分页数量和每页数量
                    param = {
                        pageNum: this.simpleCurrentPage,
                        pageSize: this.simplePageSize,
                        sortStatus: this.sortStatus,
                    };

//                当进行普通查询的时候,判断商品状态是否有值
                    if (status) {
                        param.status = status;
                    }
//                当进行普通查询的时候,判断审核状态是否有值
                    if (auditResult === 0 || auditResult === 1 || auditResult === 2) {
                        param.auditResult = auditResult;
                    }
//                当进行普通查询的时候,判断输入值是否有值
                    if (inputvalue) {
                        param.inputvalue = inputvalue;
                    }
//                供应商ID
                    if (this.accountId) {
                        param.supplierId = this.accountId;
                    }
                }
                comm.simpleSearch(param).then(
                    (response) => {
                        let data = response.data.data;
                        //如果返回的数据是空就return,要不就会报错
                        if (!data) {
                            return;
                        }
                        this.simpleCurrentPage = data.pageNum;
                        //这个forEach是为了处理后台返回的库存量是带小数的,这里把小数全部切除掉了,后台没有处理,所以前端处理一下
                        data.list.forEach((value, index) => {
                            data.list[index].inventory = data.list[index].inventory.split('.')[0];

                        });
                        this.commodityLists = data ? data.list : [];

                        if (data) {
                            let pageTotal = (data.total % this.simplePageSize) == 0 ? data.total / this.simplePageSize : (data.total / this.simplePageSize) + 1;
                            this.simplePageTotal = Math.floor(pageTotal);
                        } else {
                            this.simplePageTotal = 0;
                        }
                    }
                );
            },
            supper_search() {
                this.dialogFormVisible = !this.dialogFormVisible;
            },
            selectAll(event) {
                if (!event.currentTarget.checked) {
                    this.ids = [];
                } else {
                    this.commodityLists.forEach((item, index) => {
                        this.ids.push(item.id);
                    });
                }
            },
            change(index) {
                if (this.queryType && this.queryType == 1) {
                    this.simpleCurrentPage = index;
                    this.getSimpleData();
                } else if (this.queryType && this.queryType == 2) {
                    this.currentPage = index;
                    this.query();
                }

            },
            //每页显示条数
            changeRows(row) {
                this.row = row;
                if (this.queryType && this.queryType == 1) {
                    this.simpleCurrentPage = 1;
                    this.simplePageSize = row;
                    this.getSimpleData();
                } else if (this.queryType && this.queryType == 2) {
                    this.currentPage = 1;
                    this.commodityQuery.pageSize = row;
                    this.query();
                }

            },
            /**
             * 高级查询
             * */
            highSearch() {
                this.queryType = 2;
                this.currentPage = 1;
                this.isExportOrHighExport = 2;   //当点击高级搜索里面的查询之后把判断导出的值切换为高级查询的状态
                this.query();
            },

            /**
             * 高级查询实现
             * */
            query() {
                let token = this.token;
                let commodityQuery = {};

                if (this.$store.getters.returnFlag) {
                    commodityQuery = this.$store.getters.pageInfo.serachStuats;
                    for (let i in this.commodityQuery) {
                        this.commodityQuery[i] = commodityQuery[i];
                    }
                    commodityQuery.beginUpdateAt = commodityQuery.beginUpdateAt ? format(commodityQuery.beginUpdateAt, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
                    commodityQuery.endUpdateAt = commodityQuery.endUpdateAt ? format(commodityQuery.endUpdateAt, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
                    this.$store.dispatch('setFlag', false);
                } else {
                    this.accountId ? this.commodityQuery.supplierId = this.accountId : null;
                    this.commodityQuery.pageNum = this.currentPage;

                    let beginUpdateAt = this.commodityQuery.beginUpdateAt ? format(this.commodityQuery.beginUpdateAt, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
                    let endUpdateAt = this.commodityQuery.endUpdateAt ? format(this.commodityQuery.endUpdateAt, 'YYYY-MM-DD HH:mm:ss', { locale: zh_cn }) : '';
                    //如果结束时间不为空,那么结束时间默认为当天最晚时间
                    if (endUpdateAt) {
                        endUpdateAt = endUpdateAt.split(' ')[0] + ' 23:59:59';
                    }
                    if (beginUpdateAt && endUpdateAt && beginUpdateAt > endUpdateAt) {
                        this.$alert('创建时间起始时间不能大于终止时间');
                        return;
                    }

                    if (parseInt(this.commodityQuery.minPrice) > parseInt(this.commodityQuery.maxPrice)) {
                        this.$alert('最小金额不能大于最大金额');
                        return;
                    }


                    //给json对象的空元素设置成null
                    for (let cq in this.commodityQuery) {
                        if (cq === 'status' && this.commodityQuery[cq] === 0) {
                            continue;
                        }
                        if (cq === 'auditResult' && this.commodityQuery[cq] === 0) {
                            continue;
                        }
                        if (cq === 'invalidStatus' && this.commodityQuery[cq] === 0) {
                            continue;
                        }
                        if (!this.commodityQuery[cq]) {
                            this.commodityQuery[cq] = null;
                        }
                    }
                    for (let prop in this.commodityQuery) {
                        commodityQuery[prop] = this.commodityQuery[prop];
                    }

                    if (beginUpdateAt) {
                        commodityQuery.beginUpdateAt = beginUpdateAt;
                    }

                    if (endUpdateAt) {
                        commodityQuery.endUpdateAt = endUpdateAt;
                    }
                    //添加排序
                    commodityQuery.sortStatus = this.sortStatus;
                }

                comm.search(commodityQuery, { 'Authorization': token }).then(res => {
                    let data = res.data.data;
                    if (!data) {
                        return;
                    }
                    this.currentPage = data.pageNum;
                    this.commodityLists = data ? data.list : [];
                    if (data) {
                        let pageTotal = (data.total % this.commodityQuery.pageSize) == 0 ? data.total / this.commodityQuery.pageSize : (data.total / this.commodityQuery.pageSize) + 1;
                        this.pageTotal = Math.floor(pageTotal);
                    } else {
                        this.pageTotal = 0;
                    }
                });

//                axios({
//                    url: '/comm/search',
//                    method: 'get',
//                    params: commodityQuery,
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        let data = response.data.data;
//                        if (!data) {
//                            return;
//                        }
//                        this.currentPage = data.pageNum;
//                        this.commodityLists = data ? data.list : [];
//                        if (data) {
//                            let pageTotal = (data.total % this.commodityQuery.pageSize) == 0 ? data.total / this.commodityQuery.pageSize : (data.total / this.commodityQuery.pageSize) + 1;
//                            this.pageTotal = Math.floor(pageTotal);
//                        } else {
//                            this.pageTotal = 0;
//                        }
//                    }
//                );
            },
            /**
             * 删除前显示删除模态框
             * */
            openWarning(id) {
                id ? this.ids.push(id) : this.ids;
                // 先进行判断，如果都没有选择商品，弹窗都不会出现；
                if (this.ids.length <= 0) {
                    this.$alert('至少需要选择一个商品');
                    return;
                }
                this.isWarning = true;
            }
            ,
            /**
             * 删除
             * @param id
             */
            deleteCommodity: function () {
                let token = this.token;
                this.isWarning = false;

                comm.deleteCommodity(this.ids, { 'Authorization': token }).then(res => {
                    if (res.data.code == 1) {
                        this.$alert('删除成功！');
                        this.queryResult = com.queryType(this.queryType);
                        this.queryResult === 1 ? this.getSimpleData() : this.query();
                    } else {
                        this.$alert(res.data.message);
                    }
                });
//                axios({
//                    url: '/comm/delete/bulk?id=' + this.ids,
//                    method: 'delete',
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        if (response.data.code == 1) {
//                            this.$alert('删除成功！');
//                            this.queryResult = com.queryType(this.queryType);
//                            this.queryResult === 1 ? this.getSimpleData() : this.query();
//                        } else {
//                            this.$alert(response.data.message);
//                        }
//                    }
//                );
                this.ids = [];
            }
            ,

            /**
             *单个商品上架
             */
            goodsShelves(id) {
//                this.accountId ? this.commodityQuery.supplierId = this.accountId : null;
                comm.goodsShelves(id).then(
                    (response) => {
                        if (response.data.code === 0) {
                            if (response.data.data) {
                                this.isAptitudePass = true;
                            } else {
                                this.$alert(response.data.message);
                            }
                        }
                        if (response.data.code == 1) {
                            this.$alert(response.data.message);
                        }
                        this.queryResult = com.queryType(this.queryType);
                        this.queryResult === 1 ? this.getSimpleData() : this.query();

                    }
                );
            },
            /**
             * 单个下架商品
             * */
            goodsOffShelf(id) {
//                this.accountId ? this.commodityQuery.supplierId = this.accountId : null;
                comm.cancelCommoditySku(id).then(
                    (response) => {
                        if (response.data.code == 0) {
                            this.$alert(response.data.message);
                        }
                        if (response.data.code == 1) {
                            this.$alert(response.data.message);
                        }
                        this.queryResult = com.queryType(this.queryType);
                        this.queryResult === 1 ? this.getSimpleData() : this.query();
                    }
                );
            },

            /**
             *  批量上架商品
             * @param id
             */
            uploadCommodity(id) {
//                this.accountId ? this.commodityQuery.supplierId = this.accountId : null;
                id ? this.ids.push(id) : this.ids;
                let token = this.token;
                if (this.ids.length <= 0) {
                    this.$alert('至少需要选择一个商品');
                    return;
                }
                comm.uploadCommodity(this.ids, { 'Authorization': token }).then(res => {
                    if (res.data.code == 0) {
                        this.$alert(res.data.message);
                    }
                    if (res.data.code == 1) {
                        this.$alert(res.data.message);
                    }
                    this.queryResult = com.queryType(this.queryType);
                    this.queryResult === 1 ? this.getSimpleData() : this.query();
                });
//                axios({
//                    url: '/comm/onShelves/batch?ids=' + this.ids,
//                    method: 'put',
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        if (response.data.code == 0) {
//                            this.$alert(response.data.message);
//                        }
//                        if (response.data.code == 1) {
//                            this.$alert(response.data.message);
//                        }
//                        this.queryType == 1;
//                        this.simpleSearch();
//                        this.queryResult = com.queryType(this.queryType);
//                        this.queryResult === 1 ? this.getSimpleData() : this.query();


//                        api.simplesearch({
//                            'pageNum': this.simpleCurrentPage,
//                            'pageSize': 10,
//                            'supplierId': this.accountId,
//                            'sortStatus': 1
//                        }).then(
//                            (response) => {
//                                let data = response.data.data;
//                                this.commodityLists = data ? data.list : [];
//                                if (data) {
//                                    let pageTotal = (data.total % this.simplePageSize) == 0 ? data.total / this.simplePageSize : (data.total / this.simplePageSize) + 1;
//                                    this.simplePageTotal = Math.floor(pageTotal);
//                                } else {
//                                    this.simplePageTotal = 0;
//                                }
//                            }
//                        );
//                    }
//                );
                this.ids = [];
            },
            /**
             * 批量下架商品
             * @param id
             */
            cancelCommodity(id) {
//                this.accountId ? this.commodityQuery.supplierId = this.accountId : null;
                id ? this.ids.push(id) : this.ids;
                let token = this.token;
                if (this.ids.length <= 0) {
                    this.$alert('至少需要选择一个商品');
                    return;
                }
                comm.cancelCommodity(this.ids, { 'Authorization': token }).then(res => {
                    if (res.data.code == 0) {
                        this.$alert(res.data.message);
                    }
                    if (res.data.code == 1) {
                        this.$alert(res.data.message);
                    }
                    this.queryResult = com.queryType(this.queryType);
                    this.queryResult === 1 ? this.getSimpleData() : this.query();
                });
//                axios({
//                    url: '/comm/offShelves/batch?ids=' + this.ids,
//                    method: 'put',
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        if (response.data.code == 0) {
//                            this.$alert(response.data.message);
//                        }
//                        if (response.data.code == 1) {
//                            this.$alert(response.data.message);
//                        }
//                        this.queryType == 1;
//                        this.simpleSearch();
//                        this.queryResult = com.queryType(this.queryType);
//                        this.queryResult === 1 ? this.getSimpleData() : this.query();

//                        api.simplesearch({
//                            'pageNum': this.simpleCurrentPage,
//                            'pageSize': 10,
//                            'supplierId': this.accountId,
//                            'sortStatus': 1
//                        }).then(
//                            (response) => {
//                                let data = response.data.data;
//                                this.commodityLists = data ? data.list : [];
//                                if (data) {
//                                    let pageTotal = (data.total % this.simplePageSize) == 0 ? data.total / this.simplePageSize : (data.total / this.simplePageSize) + 1;
//                                    this.simplePageTotal = Math.floor(pageTotal);
//                                } else {
//                                    this.simplePageTotal = 0;
//                                }
//                            }
//                        );
//                    }
//                );
                this.ids = [];
            },
            /**
             * 高级搜索中的商品科属三级联动---第一级(初始化)
             * */
            getCommodityType() {
                commType.getCommodityCategory({ pid: this.pid ? this.pid : 0 })
                    .then(response => this.commodityClassifyOne = response.data);
            },
            /**
             * 高级搜索中的商品科属三级联动---第二级--在watch监听中调用该方法
             * */
            getCommodityCategoryTwo() {
                commType.getCommodityCategory({ pid: this.commodityQuery.typeOneId })
                    .then(response => {
                        this.commodityClassifyTwo = response.data;
                    });
            },
            /**
             * 高级搜索中的商品科属三级联动---第三级--在watch监听中调用该方法
             * */
            getCommodityCategoryThree() {
                commType.getCommodityCategory({ pid: this.commodityQuery.typeTwoId })
                    .then(response => this.commodityClassifyThree = response.data);
            },
            exportFile() {
                if (this.isExportOrHighExport === 1) {
                    this.totalPageExport = this.simplePageTotal;
                } else {
                    this.totalPageExport = this.pageTotal;
                }
                this.isExportShow = true;
            }
            ,

            downloadTemplate() {
                window.location.href = this.baseUrl + '/Commodity.xlsx?token=' + JSON.parse(sessionStorage.getItem('vuex')).user.token;
            },

            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            handleExcelSuccess(data) {
                this.gridData = data;
                this.dialogTableVisible = true;
            },

            uploadSuccess(response) {
                this.dialogTableVisible = true;
                this.gridData = [];
                this.uncorrectNums = '';
                if (response.code === 0) {
                    this.$alert(response.message);
                    return;
                }

                let data = response.data;
                this.dialogTableVisible = true;
                if (data && data.rightlist && data.rightlist.length > 0) {
                    data.rightlist.forEach(r => {
                        if (r.code == 1) {
                            this.gridData.push(r);
                        }
                    });
                } else {
                    this.gridData = [];
                }

                if (data && data.errolist && data.errolist.length > 0) {
                    this.uncorrectNums = data.errolist;
                } else {
                    this.uncorrectNums = [];
                }
                //添加成功之后查询数据
//                this.queryType == 1;
//                this.simpleSearch();
                this.queryResult = com.queryType(this.queryType);
                this.queryResult === 1 ? this.getSimpleData() : this.query();

//                api.simplesearch({
//                    'pageNum': 1,
//                    'pageSize': 10,
//                    'supplierId': this.accountId,
//                    'sortStatus': this.sortStatus,
//
//                }).then(
//                    (response) => {
//                        let data = response.data.data;
//                        this.commodityLists = data ? data.list : [];
//                        if (data) {
//                            let pageTotal = (data.total % this.simplePageSize) == 0 ? data.total / this.simplePageSize : (data.total / this.simplePageSize) + 1;
//                            this.simplePageTotal = Math.floor(pageTotal);
//                        } else {
//                            this.simplePageTotal = 0;
//                        }
//                    }
//                );
            },


            //接受筛选子组件的数据
            /*            showDisplayCols(data) {
                            this.displayCols = data.displayCols;
                            this.isShowList = data.isShowList;
                            this.isShowTable = data.isShowTable;
                        },*/
            changeRowHeight() {
                let myLowTrs = document.querySelectorAll('#myLowTbody>tr');
                let myHighTrs = document.querySelectorAll('#myHighTbody>tr');
                com.rowHeight(myLowTrs, myHighTrs);
            }
        },
        watch: {//深度 watcher
            'ids':
                {
                    handler: function (val, oldVal) {
                        if (this.ids.length === this.commodityLists.length) {
                            this.checked = true;
                        } else {
                            this.checked = false;
                        }
                    }
                    ,
                    deep: true
                },
            'commodityQuery.typeOneId':
                {
                    handler(newVal, oldVal) {
                        this.commodityQuery.typeTwoId = "";
                        this.commodityQuery.typeThreeId = "";
                        if (newVal) {
                            this.getCommodityCategoryTwo();
                        }
                    }
                },
            'commodityQuery.typeTwoId':
                {
                    handler(newVal, oldVal) {
                        this.commodityQuery.typeThreeId = "";
                        if (newVal) {
                            this.getCommodityCategoryThree();
                        }
                    }
                }
        },
        mounted() {
            //监听页面窗口大小的变化,重新获取table的th行高
            window.onresize = () => {
                this.changeRowHeight();
            };
        },
        components: {
            paging,
            FilterOper,
            mybreadcrumb,
            infoListBut
        },
        updated() {
            this.changeRowHeight();
        }
    };
</script>
