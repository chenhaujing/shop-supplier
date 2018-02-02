<template>
    <div class="commodityEdit_wrap">
        <div class="crumbs" style="margin-bottom: 20px;">
            <el-breadcrumb separator="/" v-show="isAdmin == 0">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/commodityList',query:{'accountId':accountId}}">商品列表
                </el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/commodityInfo',query:{'accountId':accountId,'commodityId':skuId}}">
                    商品详情
                </el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">商品编辑</a></el-breadcrumb-item>
            </el-breadcrumb>
            <!--供应商详情跳转面包屑导航-->
            <el-breadcrumb separator="/" v-show="isAdmin == 1 &&accountId&&!adminCommInfoFlag">
                <el-breadcrumb-item><i class="el-icon-date"></i> 供应商管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/supplierInfoList'}">供应商列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/commodityList',query:{'accountId':accountId}}">商品列表
                </el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/commodityInfo',query:{'accountId':accountId,'commodityId':skuId}}">
                    商品详情
                </el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">商品编辑</a></el-breadcrumb-item>
            </el-breadcrumb>

            <!--供应商审核跳转面包屑导航-->
            <el-breadcrumb separator="/" v-show="isAdmin == 1&&auditResult">
                <el-breadcrumb-item><i class="el-icon-date"></i> 供应商管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/commodityAudit',query:{'accountId':accountId}}"> 商品审核
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    :to="{path:'/commodityInfo',query:{'accountId':accountId,'commodityId':skuId,'auditResult':auditResult}}">
                    商品详情
                </el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">商品编辑</a></el-breadcrumb-item>
            </el-breadcrumb>

            <el-breadcrumb separator="/" v-show="adminCommInfoFlag">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/adminCommodityList'}">商品列表
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    :to="{path:'/commodityInfo',query:{'accountId':accountId,'commodityId':skuId,'adminCommInfoFlag':adminCommInfoFlag}}">
                    商品详情
                </el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:location.reload();">商品编辑</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 商品规格部分 -->
        <div class="plugins-tips test4">商品规格</div>
        <div class="row clearMargin" style="margin-bottom: 20px;background: #eee;" v-for="(item,index) in specTable">
            <div class="col-xs-11">
                <table class="commodityEditTableOne">
                    <thead>
                    <tr>
                        <th v-for="item in tableHeadOne">{{item.name}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <!--商品条码-->
                        <td>
                            <span v-if="item.isShow">{{item.code69}}</span>
                            <input v-else v-model="item.code69" :disabled="true" class="commodityEdit_input"/>
                        </td>
                        <!--商品商家编码-->
                        <td>
                            <span v-if="item.isShow">{{item.code}}</span>
                            <input v-else v-model="item.code" class="commodityEdit_input"
                                   onkeyup="value=value.replace(/[^\w\.\/]/ig,'');">
                        </td>
                        <!--库存单位-->
                        <td>
                            <span v-if="item.isShow">{{item.unitName}}</span>
                            <span v-else>
                                <el-select v-model="item.unitId" @change="changeUnitId(item.unitId)"
                                           style="width: 85px;">
                                    <el-option :label="i.name" :value="i.id"
                                               v-for="i in inventoryUnits"></el-option>
                                </el-select>
                            </span>
                        </td>
                        <!--规格-->
                        <td>
                            <span v-if="item.isShow">
                                {{item.measureSpecVal}}{{item.measureSpecName}}/{{item.unitName}}
                            </span>
                            <span v-else>
                                <input v-model="item.measureSpecVal" :value="specObj.measureSpecName"
                                       :maxlength="128"
                                       class="commodityEdit_input" style="width: 80px;"/>
                                <el-select v-model="item.measureSpecId"
                                           @change="changeMeasureSpecId(item.measureSpecId)" style="width: 100px">
                                    <el-option :label="item.name" :value="item.id"
                                               v-for="item in measureSpecUnits"></el-option>
                                </el-select>
                                <span v-if="tempObj.name !==''">/{{tempObj.name}}</span>
                                <span v-else>/{{item.unitName}}</span>
                            </span>
                        </td>
                        <!--箱规-->
                        <td>
                            <span
                                v-if="item.isShow">{{item.cartonVal}}{{item.unitName}}/{{item.cartonName}}</span>
                            <span v-else>
                                 <input v-model="item.cartonVal" class="commodityEdit_input" type="text"
                                        style="width:80px;"/>
                                 <span v-if="tempObj.name !==''">/{{tempObj.name}}</span>
                                 <span v-else>/{{item.unitName}}</span>
                                 <el-select v-model="item.cartonId" style="width: 80px"
                                            @change="changeCartonId(item.cartonId)">
                                     <el-option :label="item.name" :value="item.id"
                                                v-for="item in cartonUnits"></el-option>
                                 </el-select>
                            </span>
                        </td>
                        <!--规格值-->
                        <td>
                            ({{item.measureSpecVal}}{{item.measureSpecName}}*{{item.cartonVal}}
                            <span v-if="tempObj.name !==''">{{tempObj.name}}</span>
                            <span v-else>{{item.unitName}}</span>)
                            /{{item.cartonName}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="commodityEditTableTwo">
                    <thead>
                    <tr>
                        <th v-for="item in tableHeadTwo">{{item.name}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <!--起订量-->
                        <td>
                            <span v-if="item.isShow">{{item.minOrderQuantity}}</span>
                            <input v-else class="commodityEdit_input" v-model="item.minOrderQuantity"/>
                        </td>
                        <!--透云进货价-->
                        <td>
                            <span v-if="item.isShow">¥{{item.unitPrice}}</span>
                            <input v-else class="form-control" v-model="item.unitPrice" maxlength="256"

                                   type="number" step="0.01" min="0"/>
                        </td>
                        <!--app订货价-->
                        <td>
                            <span v-if="item.isShow">¥{{item.price}}</span>
                            <input v-else class="form-control" v-model="item.price" maxlength="256"

                                   type="number" step="0.01" min="0"/>
                        </td>
                        <!--生产日期-->
                        <td>
                            <span v-if="item.isShow">{{item.productionDate}}</span>
                            <span v-else>
                                <el-date-picker
                                    style="width: 80%;"
                                    v-model="item.productionDate"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                                </el-date-picker>
                            </span>
                        </td>
                        <!--有效期-->
                        <td>
                            <span v-if="item.isShow && !tempObj.guaranteePeriodUnit">{{item.guaranteePeriod}}{{item.guaranteePeriodUnit}}</span>
                            <span v-if="item.isShow && tempObj.guaranteePeriodUnit">{{item.guaranteePeriod}}{{tempObj.guaranteePeriodUnit}}</span>
                            <span v-if="!item.isShow">
                                <input v-model="item.guaranteePeriod" class="commodityEdit_input" style="width: 80px;"/>
                                <el-select v-model="item.guaranteePeriodUnit" class="mySelect selectLayer"
                                           style="width: 80px;"
                                           @change="changeGuaranteePeriodUnit(item.guaranteePeriodUnit)">
                                    <el-option :value="item.id" :label="item.value"
                                               v-for="item in guaranteePeriodUnit"></el-option>
                                </el-select>
                            </span>
                        </td>
                        <!--商品标签-->
                        <td>
                            <span v-if="item.isShow && !tempObj.tagName">{{item.tagName}}</span>
                            <span v-if="item.isShow && tempObj.tagName">{{tempObj.tagName}}</span>
                            <span v-if="!item.isShow">
                          <el-select v-model="item.tagId" @change="changeTagName(item.tagId)"
                                     class="commodityEdit_select">
                              <el-option :value="item.id" v-for="item in tags" :label="item.name"></el-option>
                          </el-select>
                        </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tr v-if="item.isShow" v-for="(item,index) in specTable">
                        <td colspan="12">
                            <ul class="commodityEdit_viewPhotos clearfix" style="float:left;">
                                <li v-for="item in commodityInfo.imgeList">
                                    <!--正常图片-->
                                    <img v-if="item.url && item.url !== 'ERROR' && item.url !== null"
                                         :src="item.url" class="commityList_tableImgShow">
                                    <!--图片正在上传中的占位图-->
                                    <img v-if="item.url === null" src="../../../static/img/placeholder.png">
                                    <!--图片上传失败的图片-->
                                    <img v-if="item.url==='ERROR'" src="../../../static/img/uploadImgError.png">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-else ref="form" class="commodityEdit_imgWrap">
                        <td colspan="12">
                            <el-upload
                                :action="baseUrl+'/upload/file'"
                                list-type="picture-card"
                                :on-success="addFile"
                                :before-upload="stopUpdate"
                                :file-list="fileList"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="removeImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-xs-1" style="padding-top: 100px;">
                <!--操作-->
                <span v-if="item.isShow">
                    <el-button v-has:commodityDetail_editButton size="small" type="danger" @click="showAddCommodity(index,1)">编辑</el-button>
                </span>
                <span v-else>
                    <el-button size="small" type="danger" @click="showAddCommodity(index,2)">完成</el-button>
                </span>
            </div>
        </div>


        <el-form ref="form" label-width="80px" style="margin-top:30px;">
            <div class="form-group row clearMargin">
                <el-form-item label="商品名称" class="col-lg-3 test2">
                    <el-input v-model="commodityInfo.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" class="col-lg-3 test2">
                    <el-input v-model="commodityInfo.brandName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品产地" class="col-lg-3 test2">
                    <el-input v-model="commodityInfo.originPlace" :maxlength="30" :disabled="true"></el-input>
                </el-form-item>
            </div>
            <!-- line2 -->
            <div class="form-group row commodityEdit_selectParent clearMargin">
                <el-form-item label="商品科属" class="col-lg-3 test3">

                    <el-select v-model="commodityInfo.categoryOneId" :disabled="true"
                               @change="getCommodityCategory(commodityInfo.categoryOneId,1)"
                               class="commodityEdit_select multiSelect">
                        <el-option :value="level1.id" :label="level1.name"
                                   v-for="level1 in level1_classifications"></el-option>
                    </el-select>


                    <el-select v-model="commodityInfo.categoryTwoId" :disabled="true"
                               @change="getCommodityCategory(commodityInfo.categoryTwoId,2)"
                               class="commodityEdit_select multiSelect">
                        <el-option :value="level2.id" :label="level2.name"
                                   v-for="level2 in level2_classifications"></el-option>
                    </el-select>


                    <el-select v-model="commodityInfo.categoryThreeId" :disabled="true"
                               class="commodityEdit_select multiSelect">
                        <el-option :value="level3.id" :label="level3.name"
                                   v-for="level3 in level3_classifications"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="企业名称" class="col-lg-3 test2">
                    <el-input v-model="commodityInfo.companyName" :maxlength="30" :disabled="true"></el-input>
                </el-form-item>
            </div>
        </el-form>


        <div class="plugins-tips kindTit test4">商品说明</div>
        <quill-editor ref="myTextEditor" v-model="commodityInfo.remark" :options="editorOption" @change="onChange">
            <div id="toolbar" slot="toolbar">
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
                <select class="ql-size">
                    <option value="small"></option>
                    <option selected></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
                <span class="ql-formats">
                    <button type="button" @click="imgClick">
                        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
                            class="ql-fill" cx="6" cy="7" r="1"></circle>
                            <polyline class="ql-even ql-fill"
                                      points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                        </svg>
                    </button>
                </span>
            </div>
        </quill-editor>
        <el-button v-has:commodityDetail_submit class="editor-btn commodityEdit_submit" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor';
    import axios from 'axios';
    import '../../../static/css/commodityEdit.less';
    import ElForm from '../../../node_modules/element-ui/packages/form/src/form.vue';
    import {Money} from 'v-money';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import com from '../../utils/commodity.js';
    import comm from '../../api/comm.js';
    import commBrand from '../../api/commBrand.js';
    import commCarton from '../../api/commCarton.js';
    import commMeasureSpec from '../../api/commMeasureSpec.js';
    import commTag from '../../api/commTag.js';
    import commType from '../../api/commType.js';
    import commUnit from '../../api/commUnit.js';

    export default {
        props: {
            value: {
                type: String
            },
            /*上传图片的地址*/
            uploadUrl: {
                type: String,
                default: '/upload/file'
            },
            /*上传图片的file控件name*/
            fileName: {
                type: String,
                default: 'file'
            },
        },
        data: function () {
            return {
                baseUrl: '',
                //有效期单位
                guaranteePeriodUnit: [
                    { 'id': 1, 'value': '天' }, { 'id': 2, 'value': '月' }, { 'id': 3, 'value': '年' }
                ],
                commodityId: '',
                auditResult: '',
                money: {
                    decimal: '.',
                    thousands: ',',
                    precision: 2,
                    masked: true
                },
                tags: [],
                units: [],
                measureSpecs: [],
                dialogImageUrl: '',
                photoShow: false,
                editPhotoShow: false,
                addPop: false,
                type: -1,
                index: -1,
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    },
                    placeholder: 'Compose an epic...',
                    readOnly: false,
                    theme: 'snow'
                },
                specTable: [],
                specObj: {
                    code: '',
                    code69: '',
                    id: '',
                    inventory: '',
                    minImg: '',
                    price: '',
                    ruleVal: '',
                    unitPrice: '',
                    imgList: [],
                    measureSpecId: '',//计量规格ID
                    unitId: '',        //计量单位ID
                    unitName: '',   //计量单位名称
                    measureSpecName: '',   //计量规格名称
                    minOrderQuantity: 0,
                    measureSpecVal: "",
                    cartonId: "",
                    cartonVal: "",
                    cartonName: "",
                    productionDate: "",
                    guaranteePeriod: "",
                    guaranteePeriodUnit: "",
                    tagId: "",
                    tagName: "",
                    isShow: true,
                },
                imgItem: {},
                categoryOneId: '',
                categoryTwoId: '',
                categoryThreeId: '',
                level1_classifications: {},
                level2_classifications: {},
                level3_classifications: {},
                fileList: [],
                commodityInfo: {},
                token: null,
                accountId: null,
                skuId: '',
                isAdmin: '',
                isAddImg: false,
                adminCommInfoFlag: false,//入口是管理员商品列表
                status: -1,   //刘述定义 通过route传递过来的参数,
                dialogVisible: false,
                fileListLength: 0,
                measureSpecUnits: [],    //规格单位
                inventoryUnits: [],
                cartonUnits: [],
                pickerOptions0: {},
                tempObj: {
                    name: '',
                    tagName: '',
                    guaranteePeriodUnit: '',
                },
                tableHeadOne: com.tableHeadOne,
                tableHeadTwo: com.tableHeadTwo

            };
        },
        created() {
            this.baseUrl = this.$globalData.baseUrl;
            let id = this.$route.query.skuId;
            this.accountId = this.$route.query.accountId;
            this.auditResult = this.$route.query.auditResult;
            this.status = this.$route.query.status;
            this.adminCommInfoFlag = this.$route.query.adminCommInfoFlag;
            this.skuId = id;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.getCommodityInfo(id);
            //获取商品标签
            commTag.getCommTag(this.accountId ? this.accountId : 0).then(res => this.tags = res.data.data);
            //调用查询库存单位的方法
            commUnit.getCommUnit(this.accountId ? this.accountId : 0).then(res => this.inventoryUnits = res.data.data);
            //调用规格单位的方法
            commMeasureSpec.getCommMeasureSpec(this.accountId ? this.accountId : 0).then(res => this.measureSpecUnits = res.data.data);
            //调用查询箱规单位的方法
            commCarton.getCommCarton(this.accountId ? this.accountId : 0).then(res => this.cartonUnits = res.data.data);
        },
        methods: {
            //获取上传多张图片数据
            addFile(response, file, fileList) {
                if (!response) {
                    return;
                }
                if (response.code == 0) {
                    this.$alert(response.message);
                    return;
                }
                let imgObj = {
                    name: response.data[0].fileName,
                    size: response.data[0].size,
                    type: response.data[0].type,
                    url: response.data[0].url,
                    thumbnailUrl: response.data[0].minImgUrl,
                };
                this.fileList.push(imgObj);
            },

            //判断是否图片大于上传的最大数量,和判断照片格式
            stopUpdate(file) {
                if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
                    this.$alert('请上传jpg,jpeg,png格式的图片');
                    return false;
                }
                if (this.fileList.length > 9) {
                    this.$alert('图片最多上传10张');
                    return false;
                }
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //移除多张图片中的数据
            removeImg(file, fileList) {
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileList.forEach((v, i) => {
                    if (removedUrl == v.url) {
                        this.fileList.splice(i, 1);
                    }
                });
            },
            getCommodityInfo(id) {
                comm.getCommodityInfo(id).then(
                    (response) => {
                        this.commodityInfo = response.data.data;
                        console.log(this.commodityInfo);
                        this.getCommodityCategory(0, 0);
                        this.getCommodityCategory(this.commodityInfo.categoryOneId, 1);
                        this.getCommodityCategory(this.commodityInfo.categoryTwoId, 2);
                        this.specTable.push({
                            'code': this.commodityInfo.code,
                            'code69': this.commodityInfo.code69,
                            'id': this.commodityInfo.id,
                            'inventory': this.commodityInfo.inventory,
                            'minImg': this.commodityInfo.minImg,
                            'price': parseFloat(this.commodityInfo.price).toFixed(2),
                            'ruleVal': this.commodityInfo.ruleVal,
                            'unitPrice': parseFloat(this.commodityInfo.unitPrice).toFixed(2),
                            'unitId': this.commodityInfo.unitId,        //计量单位ID
                            'unitName': this.commodityInfo.unitName,   //计量单位名称
                            'measureSpecId': this.commodityInfo.measureSpecId,//计量规格ID
                            'measureSpecName': this.commodityInfo.measureSpecName,   //计量规格名称
                            'minOrderQuantity': this.commodityInfo.minOrderQuantity,
                            'measureSpecVal': this.commodityInfo.measureSpecVal,
                            'cartonId': this.commodityInfo.cartonId,
                            'cartonVal': this.commodityInfo.cartonVal,
                            'cartonName': this.commodityInfo.cartonName,
                            'guaranteePeriod': this.commodityInfo.guaranteePeriod,
                            'guaranteePeriodUnit': this.commodityInfo.guaranteePeriodUnit,
                            'productionDate': this.commodityInfo.productionDate ? this.commodityInfo.productionDate.split(' ')[0] : '',
                            'tagId': this.commodityInfo.tagId,
                            'tagName': this.commodityInfo.tagName,
                            'isShow': true
                        });
                        this.fileList = this.commodityInfo ? this.commodityInfo.imgeList : [];

                        this.fileList.forEach(v => {
                            if (v.url === 'ERROR') {
                                v.url = '../../../static/img/uploadImgError.png';
                            } else if (v.url === 'null') {
                                v.url = '../../../static/img/placeholder.png';
                            }
                        });
                    }
                );
            },
            changeUnitId(id) {
                for (let i = 0; i < this.inventoryUnits.length; i++) {
                    if (this.inventoryUnits[i].id === id) {
                        this.tempObj.name = this.inventoryUnits[i].name;
                        break;
                    }
                }

            },
            changeTagName(id) {
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.tags[i].id === id) {
                        this.tempObj.tagName = this.tags[i].name;
                        break;
                    }
                }
            },
            changeGuaranteePeriodUnit(id) {
                for (let i = 0; i < this.guaranteePeriodUnit.length; i++) {
                    if (this.guaranteePeriodUnit[i].id === id) {
                        this.specTable[0].guaranteePeriodUnit = this.guaranteePeriodUnit[i].value;
                        break;
                    }
                }
            },
            changeCartonId(id) {
                for (let i = 0; i < this.cartonUnits.length; i++) {
                    if (this.cartonUnits[i].id === id) {
                        this.specTable[0].cartonName = this.cartonUnits[i].name;
                        break;
                    }
                }
            },
            changeMeasureSpecId(id) {
                for (let i = 0; i < this.measureSpecUnits.length; i++) {
                    if (this.measureSpecUnits[i].id === id) {
                        this.specTable[0].measureSpecName = this.measureSpecUnits[i].name;
                        break;
                    }
                }
            },
            onChange() {
                this.$emit('input', this.content);
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                let fileInput = e.target;
                if (fileInput.files.length == 0) {
                    return;
                }
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    });
                }
                let self = this;
                let data = new FormData;
                data.append(this.fileName, fileInput.files[0]);
                axios.post(this.uploadUrl, data).then(res => {
                    if (res.data) {
                        let data = res.data.data;
                        self.editor.insertEmbed(self.editor.getSelection() ? self.editor.getSelection().index : '', 'image', data[0].url);
                    }
                });
            },
            /*点击上传图片按钮*/
            imgClick() {
                if (!this.uploadUrl) {
                    return;
                }
                /*内存创建input file*/
                let input = document.createElement('input');
                input.type = 'file';
                input.name = this.fileName;
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                input.onchange = this.onFileChange;
                input.click();
            },
            onEditorChange(html) {
                this.content = html;
            },
            submit() {
                let paramObj = {},
//                    token = localStorage.getItem('token'),
                    commodityList = [],
                    id = null;
                if (!this.specTable[0].isShow) {
                    this.$alert('请先完成商品规格添加,在编辑状态下无法提交');
                    return;
                }
                if (!this.commodityInfo.remark) {
                    this.$alert("商品说明不能为空");
                    return;
                }


                commodityList.push({
                    'code': this.specTable[0].code,
                    'code69': this.specTable[0].code69,
                    'id': this.specTable[0].id,
                    'inventory': this.specTable[0].inventory,
                    'minImg': this.commodityInfo.imgeList[0].thumbnailUrl,
                    'price': parseFloat(this.specTable[0].price).toFixed(2),
                    'unitPrice': parseFloat(this.specTable[0].unitPrice).toFixed(2),
                    'measureSpecId': this.specTable[0].measureSpecId,
                    'unitId': this.specTable[0].unitId,
                    'minOrderQuantity': this.specTable[0].minOrderQuantity,
                    'imgeList': this.fileList,
                    'unitName': this.specTable[0].unitName,   //计量单位名称
                    'measureSpecName': this.specTable[0].measureSpecName,   //计量规格名称
                    'measureSpecVal': this.specTable[0].measureSpecVal,
                    'cartonId': this.specTable[0].cartonId,
                    'cartonVal': this.specTable[0].cartonVal,
                    'cartonName': this.specTable[0].cartonName,
                    'productionDate': this.specTable[0].productionDate,
                    'guaranteePeriod': this.specTable[0].guaranteePeriod,
                    'guaranteePeriodUnit': this.specTable[0].guaranteePeriodUnit,
                    'tagId': this.specTable[0].tagId,
                    'tagName': this.commodityInfo.tagName,
                    'ruleVal': '(' + this.specTable[0].measureSpecVal + '' + this.specTable[0].measureSpecName + '*' + this.specTable[0].cartonVal + '' + this.specTable[0].unitName + ')/' + this.specTable[0].cartonName,
                });
                for (let i in commodityList[0]) {
                    if (i !== 'code' && i !== 'tagId' && i !== 'tagName') {
                        if (commodityList[0][i] === null) {
                            this.$alert('请您更新您的商品信息,更新过后再尝试提交');
                            return;
                        }
                    }
                }

                paramObj.remark = this.commodityInfo.remark;
                paramObj.commodityList = commodityList;
                id = this.accountId ? this.accountId : 0;
                comm.editSubmitContent(id, paramObj)
                    .then((response) => {
                        if (response.data.code == 1) {
                            this.$alert(response.data.message);
                            this.$router.push({
                                path: '/commodityInfo',
                                query: {
                                    accountId: this.accountId,
                                    commodityId: this.skuId,
                                    adminCommInfoFlag: this.adminCommInfoFlag,
                                }
                            });
                        } else if (response.data.code == 0) {
                            this.$alert(response.data.message);
                        } else if (response.code === 'ERROR_MODEL_VALIDATE') {
                            this.$alert('请更新您的数据信息,以完成编辑');
                        }
                    }).catch(function (msg) {
                    console.log('error message is ' + msg);
                });
//                axios({
//                    method: 'put',
//                    url: '/comm/update?supplierId=' + (this.accountId ? this.accountId : 0),
//                    data: paramObj,
//                    headers: { 'Authorization': window.localStorage.getItem('token') }
//                })
//                    .then((response) => {
//                        if (response.data.code == 1) {
//                            this.$alert(response.data.message);
//                            this.$router.push({
//                                path: '/commodityInfo',
//                                query: {
//                                    accountId: this.accountId,
//                                    commodityId: this.skuId,
//                                    adminCommInfoFlag: this.adminCommInfoFlag,
//                                }
//                            });
//                        } else if (response.data.code == 0) {
//                            this.$alert(response.data.message);
//                        } else if (response.code === 'ERROR_MODEL_VALIDATE') {
//                            this.$alert('请更新您的数据信息,以完成编辑');
//                        }
//                    })
//                    .catch(function (msg) {
//                        console.log('error message is ' + msg);
//                    });
            },
            showAddCommodity(index, status) {   //status 状态--1为完成状态,  --2为编辑状态
                this.photoShow = false;
                this.editPhotoShow = false;
                if (status === 1) {
                    this.specTable[index].isShow = false;
                } else if (status === 2) {
                    this.addOneSpec();
                }
            },
            addOneSpec() {
                let checkResult = null,
                    obj = {};
                if (this.tempObj.name) {
                    this.specTable[0].unitName = this.tempObj.name;
                }
                this.specTable[0].productionDate = this.specTable[0].productionDate ? format(this.specTable[0].productionDate, 'YYYY-MM-DD', { locale: zh_cn }) : '';
                obj = this.specTable[0];
                obj.imgeList = [];
                this.fileList.forEach((item) => {
                    let newObj = {};
                    newObj.name = item.name;
                    newObj.size = item.size;
                    newObj.type = item.type;
                    newObj.url = item.url;
                    if (item.thumbnailUrl) {
                        newObj.thumbnailUrl = item.thumbnailUrl;
                    }
                    obj.imgeList.push(newObj);
                });
                this.units.forEach(r => {
                    if (r.id === obj.unitId) {
                        obj.unitName = r.name;
                    }
                });

                this.measureSpecs.forEach(r => {
                    if (r.id == obj.measureSpecId) {
                        obj.measureSpecName = r.name;
                    }
                });
                checkResult = com.checkout(obj);


                if (checkResult) {
                    this.$alert(checkResult);
                    return;
                }
                obj.isShow = true;


            },
            getCommodityCategory(pid, type) {
                if (!pid && type) {
                    return;
                }
                commType.getCommodityCategory({ 'pid': pid }).then(
                    response => {
                        if (type && type == 1) {
                            this.level2_classifications = response.data;
                            return;
                        }
                        if (type && type == 2) {
                            this.level3_classifications = response.data;
                            return;
                        }
                        this.level1_classifications = response.data;
                    }
                );
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill;
            },
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            }
        },
        mounted() {
            // you can use current editor object to do something(quill methods)
//            console.log('this is current quill instance object', this.editor)
            this.value = this.commodityInfo.remark;
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor) {
                    if (newVal !== this.commodityInfo.remark) {
                        this.commodityInfo.remark = newVal;
                    }
                }
            },
        },
        components: {
            ElForm,
            quillEditor
        },
    };
</script>

