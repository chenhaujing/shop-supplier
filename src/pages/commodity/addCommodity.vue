<template>
    <div class="addCommodity">
        <breadCrumb :navigationList="navigationList"></breadCrumb>
        <el-form ref="form" label-width="80px" style="margin-top:30px;">
            <div class="proSpecTop">
                <div class="plugins-tips kindTit test4">商品规格</div>
                <el-button type="success" @click="showAddCommodity(1)" class="addSpecBtn">添加商品规格</el-button>
            </div>
            <div class="row clearMargin addCommodity_tableWrap" v-for="(item,index) in specTable">
                <div class="col-xs-11">
                    <table class="addCommodityTableOne">
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
                                <input v-else v-model="specObj.code69" class="addCommodity_shopper"
                                       @blur="checkCode69(specObj.code69,index)"
                                       onKeyup="value=value.replace(/[^\d]/g,'');"/>
                            </td>
                            <!--商品商家编码-->
                            <td>
                                <span v-if="item.isShow">{{item.code}}</span>
                                <span v-else>
                                  <input v-model="specObj.code"
                                         class="addCommodity_shopper"/>
                            </span>
                            </td>
                            <!--库存单位-->
                            <td>
                                <span v-if="item.isShow">{{item.unitName}}</span>
                                <span v-else>
                                    <el-select v-model="specObj.unitId" class="addCommodity_select">
                                        <el-option :label="item.name" :value="item.id"
                                                   v-for="item in inventoryUnits"></el-option>
                                    </el-select>
                                 </span>
                            </td>
                            <!--规格-->
                            <td>
                            <span v-if="item.isShow">
                                {{item.measureSpecVal}}{{item.measureSpecName}}/{{item.unitName}}
                            </span>
                                <span v-else>
                                <input v-model.trim="specObj.measureSpecVal"
                                       class="addCommodity_shopper" style="width: 80px;"/>
                                <el-select v-model="specObj.measureSpecId"
                                           class="addCommodity_select" style="width: 100px;">
                                    <el-option :label="item.name" :value="item.id"
                                               v-for="item in measureSpecUnits"></el-option>
                                </el-select>
                                <span>/{{specObj.unitName}}</span>
                            </span>
                            </td>
                            <!--箱规-->
                            <td>
                                <span v-if="item.isShow">
                                    {{item.cartonVal}}{{item.unitName}}/{{item.cartonName}}
                                </span>
                                <span v-else>
                                     <input v-model.trim="specObj.cartonVal" class="addCommodity_shopper"
                                            style="width:80px;"/>
                                     <span>{{specObj.unitName}}/</span>
                                     <el-select v-model="specObj.cartonId" class="addCommodity_select"
                                                style="width: 100px;">
                                         <el-option :label="item.name" :value="item.id"
                                                    v-for="item in cartonUnits"></el-option>
                                     </el-select>
                                </span>
                            </td>
                            <!--规格值-->
                            <td>
                            <span v-if="item.isShow">
                                ({{item.measureSpecVal}}{{item.measureSpecName}}*{{item.cartonVal}}{{item.unitName}})/{{item.cartonName}}
                            </span>
                                <span v-else v-model="specObj.ruleVal">
                                ({{specObj.measureSpecVal}}{{specObj.measureSpecName}}*{{specObj.cartonVal}}{{specObj.unitName}})/{{specObj.cartonName}}
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table class="addCommodityTableTwo">
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
                                <input v-else v-model="specObj.minOrderQuantity" class="addCommodity_shopper">
                            </td>
                            <!--透云进货价-->
                            <td>
                                <span v-if="item.isShow">¥{{item.unitPrice}}</span>
                                <input v-else class="addCommodity_shopper" v-model="specObj.unitPrice" maxlength="256"
                                       type="number" step="0.01" min="0"/>

                            </td>
                            </td>
                            <!--app订货价-->
                            <td>
                                <span v-if="item.isShow">¥{{item.price}}</span>
                                <input v-else class="addCommodity_shopper" v-model="specObj.price" maxlength="256"
                                       type="number" step="0.01" min="0"/>
                            </td>
                            <!--生产日期-->
                            <td>
                                <span v-if="item.isShow">{{item.productionDate}}</span>
                                <span v-else>
                                 <el-date-picker
                                     style="width: 90%;margin: 0 auto;"
                                     v-model="specObj.productionDate"
                                     type="date"
                                     placeholder="选择日期"
                                     :picker-options="pickerOptions0">
                                 </el-date-picker>
                            </span>

                            </td>
                            <!--有效期-->
                            <td>
                                <span v-if="item.isShow">{{item.guaranteePeriod}}{{item.guaranteePeriodUnit}}</span>
                                <span v-else>
                                    <input style="width: 40%;" class="addCommodity_shopper"
                                           v-model="specObj.guaranteePeriod"/>
                                    <el-select v-model="specObj.guaranteePeriodUnit"
                                               class="addCommodity_select" style="width: 50%;">
                                    <el-option :value="item.value" :label="item.value"
                                               v-for="item in guaranteePeriodUnit"></el-option>
                                    </el-select>
                                </span>
                            </td>
                            <!--商品标签-->
                            <td>
                                <span v-if="item.isShow">{{item.tagName}}</span>
                                <span v-else>
                                <el-select v-model="specObj.tagId" class="mySelect selectLayer">
                                    <el-option :value="item.name" :label="item.name"
                                               v-for="item in tags"></el-option>
                                </el-select>
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <!--展示照片-->
                        <tr class="addCommodity_uploadImg" v-if="item.isShow">
                            <td colspan="6">
                                <ul style="overflow:hidden;">
                                    <li style="float:left;width:150px;" v-for="i in item.imgeList">
                                        <img :src="i.thumbnailUrl">
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <!--上传照片-->
                        <tr class="addCommodity_uploadImg" v-else>
                            <td colspan="6">
                                <el-upload
                                    :action="baseUrl+'/upload/file'"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-success="addFile"
                                    :before-upload="stopUpdate"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="removeImg">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog v-model="dialogVisible" size="tiny">
                                    <img width="100%" :src="dialogImageUrl">
                                </el-dialog>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-xs-1 addCommodity_button">
                    <el-button v-if="item.isShow" size="small" type="danger" :disabled="isEdit"
                               class="addCommodity_butOne"
                               @click="showAddCommodity(2,index)">
                        编辑
                    </el-button>
                    <el-button v-else size="small" type="danger" class="addCommodity_butTwo" @click="addOneSpec()">完成
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(index)" style="margin-left:0;">删除
                    </el-button>
                </div>
            </div>
            <div class="form-group row clearMargin">
                <el-form-item label="商品名称" class="test1 col-lg-3">
                    <el-input v-model="name" class="addCommodity_input col-lg-12 clearPadding"
                              :disabled="disabledInput.name"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" class="col-lg-3 test2">
                    <el-autocomplete class="addCommodity_input" v-model.trim="brand" :fetch-suggestions="querySearch"
                                     :disabled="disabledInput.brand"
                                     style="width: 100%;"></el-autocomplete>
                </el-form-item>
                <el-form-item label="商品产地" class="col-lg-3 test2">
                    <el-input v-model="originPlace" class="addCommodity_input"
                              :disabled="disabledInput.originPlace"></el-input>
                </el-form-item>
            </div>
            <div class="form-group row clearMargin">
                <el-form-item label="商品科属" class="col-lg-3 test3">
                    <!-- code69未反显 -->
                    <el-select v-show="!code69Display" v-model="categoryOneId"
                               @change="getCommodityCategory(categoryOneId,1)"
                               class="mySelect mutiSelect">
                        <el-option :value="level1.id" :label="level1.name"
                                   v-for="level1 in level1_classifications"></el-option>
                    </el-select>
                    <el-select v-show="!code69Display" v-model="categoryTwoId"
                               @change="getCommodityCategory(categoryTwoId,2)"
                               class="mySelect mutiSelect">
                        <el-option :label="level2.name" :value="level2.id"
                                   v-for="level2 in level2_classifications"></el-option>
                    </el-select>
                    <el-select v-show="!code69Display" v-model="categoryThreeId" class="mySelect mutiSelect">
                        <el-option :value="level3.id" :label="level3.name"
                                   v-for="level3 in level3_classifications"></el-option>
                    </el-select>
                    <!-- code69反显 -->
                    <el-select v-model="code69DisplayCategoryOneId" v-show="code69Display"
                               class="mySelect mutiSelect" :disabled="disabledInput.categoryOneId">
                        <el-option :value="level1.id" :label="level1.name"
                                   v-for="level1 in level1_classifications"></el-option>
                    </el-select>
                    <el-select v-model="code69DisplayCategoryTwoId" v-show="code69Display"
                               class="mySelect mutiSelect" :disabled="disabledInput.categoryTwoId">
                        <el-option :label="level2.name" :value="level2.id"
                                   v-for="level2 in level2_classifications"></el-option>
                    </el-select>
                    <el-select v-show="code69Display" v-model="code69DisplayCategoryThreeId" class="mySelect mutiSelect"
                               :disabled="disabledInput.categoryThreeId">
                        <el-option :value="level3.id" :label="level3.name"
                                   v-for="level3 in level3_classifications"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="企业名称" class="col-lg-3 test2">
                    <el-input v-model="companyName" class="addCommodity_input"
                              :disabled="disabledInput.companyName"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div class="plugins-tips kindTit test4">商品说明</div>
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"
                      style="min-height:300px;" @change="onChange"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)">
            <div id="toolbar" slot="toolbar">
                <!-- Add a bold button -->
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
                <!-- Add font size dropdown -->
                <select class="ql-size">
                    <option value="small"></option>
                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                    <option selected></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
                <span class="ql-formats">
                    <button type="button" @click="imgClick">
                        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
                            class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill"
                                                                                    points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
                    </button>
                </span>
            </div>
        </quill-editor>
        <div class="addBtns" style="margin-top:20px;">
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor';
    import axios from 'axios';
    import '../../../static/css/addCommodity.less';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import {Money} from 'v-money';
    import com from '../../utils/commodity.js';
    import comm from '../../api/comm.js';
    import commBrand from '../../api/commBrand.js';
    import commCarton from '../../api/commCarton.js';
    import commMeasureSpec from '../../api/commMeasureSpec.js';
    import commTag from '../../api/commTag.js';
    import commType from '../../api/commType.js';
    import commUnit from '../../api/commUnit.js';
    import breadCrumb from '../../components/Breadcrumb.vue';

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
        data() {
            return {
                baseUrl: '',
                code69Display: false,
                addCommodityFinsh: false,
                addCommodityEdit: false,
                addCommodityStatus: false,
                money: {
                    decimal: '.',
                    thousands: ',',
                    precision: 2,
                    masked: true
                },
                accepts: 'image/jpeg, image/jpg, image/png, image/gif',
                fieldDisabled: false,
                originPlace: '',
                marketTime: '',
                tags: [],
                units: [],
                measureSpecs: [],
                companyName: '',
                accountId: null,
                imageUrl: '',
                addPop: false,
                type: -1,
                index: -1,
                content: '',
                name: '',
                brand: '',
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    },
                    placeholder: '请添加商品说明',
                    readOnly: false,
                    theme: 'snow'
                },
                specTable: [],
                specObj: {
                    code69: '',      //商品条码
                    code: '',        //商品商家编码
                    ruleVal: '',      //规格值
                    unitPrice: '',     //成本价
                    price: '',        //市场价
                    minImg: '',       //缩略图地址
                    imgeList: [],       //图片
                    measureSpecId: '',//计量规格ID
                    measureSpecName: '',   //计量规格名称
                    unitId: '',        //计量单位ID
                    unitName: '',   //计量单位名称
                    tagId: '',
                    tagName: '',
                    minOrderQuantity: 1,
                    productionDate: '',   //刘述添加 生产日期
                    cartonId: '',
                    cartonVal: '',
                    guaranteePeriod: '',
                    guaranteePeriodUnit: '',
                    isShow: false,
                    isUpdateImg: false, //刘述添加 判断是否进行上传照片操作
                    isCheckPhoto: false,  //刘述添加 判断是否是在完成状态查看照片
                    is69code: true,
                    isToggleUploadImg: true, //是否显示上传照片组件
                    isOver: false,
                },
                isAdd: true, //刘述添加  判断是否可以添加商品规格,
                confirm: false,  //刘述添加 为了解决点击完成之后再点击删除不能添加商品规格的问题
                isEdit: true,   //刘述添加 判断是否可编辑状态
                dialogImageUrl: '',  //刘述添加 element-ui照片上传组件中的变量
                dialogVisible: false, //刘述添加 element-ui照片上传组件中的变量
                categoryOneId: '',
                categoryTwoId: '',
                categoryThreeId: '',
                code69DisplayCategoryOneId: '',
                code69DisplayCategoryTwoId: '',
                code69DisplayCategoryThreeId: '',
                level1_classifications: {},
                level2_classifications: {},
                level3_classifications: {},
                fileList: [],
                textAreaDescription: '',    //暂时用textarea代替content
                token: null,
                disabledInput: {
                    'name': false,
                    'brand': false,
                    'originPlace': false,
                    'categoryTwoId': false,
                    'categoryThreeId': false,
                    'companyName': false,
                    'marketTime': false
                },
                isAdmin: '',
                commodityBrand: [],
                restaurants: [],
                isAddImg: false,
                code69Arr: [],
                imgLength: 0,
                pickerOptions0: {},
                guaranteePeriodUnit: [
                    { 'id': 1, 'value': '天' }, { 'id': 2, 'value': '月' }, { 'id': 3, 'value': '年' }
                ],
                inventoryUnits: [],     //库存单位
                cartonUnits: [],         //    箱规规格单位
                measureSpecUnits: [],    //规格单位
                isSubmit: 0,
                tempArr: [],
                arr69Code: false,
                tableHeadOne: com.tableHeadOne,
                tableHeadTwo: com.tableHeadTwo
            };
        },
        created() {
            this.baseUrl = this.$globalData.baseUrl;
//            this.token = localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            //管理员跳过来的
            this.accountId = this.$route.query.accountId;
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.getCommodityCategory(0, 0);
            //获取商品标签
            commTag.getCommTag(this.accountId ? this.accountId : 0).then(res => this.tags = res.data.data);
            //调用查询库存单位的方法
            commUnit.getCommUnit(this.accountId ? this.accountId : 0).then(res => this.inventoryUnits = res.data.data);
            //调用规格单位的方法
            commMeasureSpec.getCommMeasureSpec(this.accountId ? this.accountId : 0).then(res => this.measureSpecUnits = res.data.data);
            //调用查询箱规单位的方法
            commCarton.getCommCarton(this.accountId ? this.accountId : 0).then(res => this.cartonUnits = res.data.data);
            //调用商品品牌的方法
            commBrand.getCommodityBrand().then((res) => {
                let myResult = [];
                this.commodityBrand = res.data.data;
                this.commodityBrand.forEach(v => {
                    let item = {};
                    item.value = v.name;
                    myResult.push(item);
                });
                this.restaurants = myResult;
            });
            //页面初始化的时候就实现一次商品添加
            this.showAddCommodity(1);

        },
        methods: {
            /**
             * 失去焦点69码校验
             * */
            checkCode69(val, index) {
                let i = 0;
                if (this.tempArr.length > 0) {
                    for (i; i < this.tempArr.length; i++) {
                        if (val === this.tempArr[i].val && val !== '' && index !== i) {
                            this.$alert('存在重复的商品条码');
                            this.specObj.code69 = '';
                            return;
                        }
                    }
                }
                comm.findByCode69(val).then(
                    res => {
                        let data = res.data;
                        let result = data ? data.data : {};
                        //能进行返查
                        if (data.code === 1) {
                            //这个是已经存在69库的数据,所以报错
                            if (this.fieldDisabled && this.tableList.length > 1) {
                                if (this.name != result.name
                                    || this.brand != result.brandName
                                    || this.originPlace != result.originPlace
                                    || (this.categoryOneId ? this.categoryOneId != result.categoryOneId : this.code69DisplayCategoryOneId != result.categoryOneId)
                                    || (this.categoryTwoId ? this.categoryTwoId != result.categoryTwoId : this.code69DisplayCategoryTwoId != result.categoryTwoId)
                                    || (this.categoryThreeId ? this.categoryThreeId != result.categoryThreeId : this.code69DisplayCategoryThreeId != result.categoryThreeId)
                                    || this.companyName != result.companyName) {
                                    this.$message.error('非同一种商品的不同规格，无法添加');
                                    this.specObj.code69 = '';
                                    return;
                                }
                            } else {    //返查通过走这里
                                this.arr69Code = true;
                                result.name ? this.disabledInput.name = true : this.disabledInput.name = false;
                                result.brandName ? this.disabledInput.brand = true : this.disabledInput.brand = false;
                                result.originPlace ? this.disabledInput.originPlace = true : this.disabledInput.originPlace = false;
                                result.categoryOneId ? this.disabledInput.categoryOneId = true : this.disabledInput.categoryOneId = false;
                                if (result.categoryOneId) {
                                    this.code69Display = true;                                   //如果返差的3级联动有数据就把3级联动禁掉
                                    this.disabledInput.categoryOneId = true;
                                    this.getCommodityCategory(result.categoryOneId, 1);
                                } else {
                                    this.disabledInput.categoryOneId = false;
                                }
                                if (result.categoryTwoId) {
                                    this.disabledInput.categoryTwoId = true;
                                    this.getCommodityCategory(result.categoryTwoId, 2);
                                } else {
                                    this.disabledInput.categoryTwoId = false;
                                }
                                result.categoryThreeId ? this.disabledInput.categoryThreeId = true : this.disabledInput.categoryThreeId = false;
                                result.companyName ? this.disabledInput.companyName = true : this.disabledInput.companyName = false;
                                this.name = result.name;
                                this.brand = result.brandName;
                                this.originPlace = result.originPlace;
                                this.code69DisplayCategoryOneId = result.categoryOneId;
                                this.code69DisplayCategoryTwoId = result.categoryTwoId;
                                this.code69DisplayCategoryThreeId = result.categoryThreeId;
                                this.companyName = result.companyName;

                            }
                        } else if (data.code === 0) {
                            if (this.tempArr[index] && this.tempArr[index].arr69Code) {
                                for (let key in this.disabledInput) {
                                    this.disabledInput[key] = false;
                                }
                            }
                        }
                        //当69码查询通过没有重复后,push到临时数组,如果数组len长度大于0,那么就直接更新,因为商品规格是可以编辑的
                        if (this.tempArr.length === 0) {
                            this.tempArr.push({ 'val': val, 'arr69Code': this.arr69Code });
                        } else {
                            if (this.tempArr[index]) {
                                this.tempArr[index].val = val;
                                this.tempArr[index].arr69Code = this.arr69Code;
                            } else {
                                this.tempArr.push({ 'val': val, 'arr69Code': this.arr69Code });
                            }
                        }
                    }
                );

            },
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
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
                axios.post(this.uploadUrl, data).then(function (res) {
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
            showAddCommodity(type, index) {    //type -1  新增， -2 编辑
                this.type = type;
                this.index = index;
                this.addCommodityFinsh = true;
                this.addCommodityEdit = false;
                this.addCommodityStatus = false;
                if (type == 1) {
                    this.arr69Code = false;
                    for (let i = 0; i < this.specTable.length; i++) {
                        if (!this.specTable[i].isOver) {
                            this.$alert('请完成一次规格添加之后再添加规格!');
                            return;
                        }
                    }
                    if (this.isAdd) {
                        this.isAdd = false;
                        this.specTable.push(this.specObj);
                    } else {
                        this.$alert('请完成一次规格添加之后再添加规格!');
                    }
                } else if (type == 2) {
                    //获取当前选中编辑条目Id,
                    //从数组中找到此Id的条目
                    //将值赋给编辑框对象


                    //当编辑的商品规格为数据库里面有数据的商品之后,点编辑之后要把值置位false
                    if (this.tempArr[index].arr69Code) {
                        this.fieldDisabled = false;
                    }
                    this.isEdit = true;
                    this.isAdd = false;
                    this.specTable[index].isShow = !this.specTable[index].isShow;
                    this.specTable[index].isToggleUploadImg = !this.specTable[index].isToggleUploadImg;
                    this.specObj = this.tableList[index];
                    this.fileList = this.tableList[index].imgeList;
                }
            },

            closeAddCommodity() {
                this.fileList = [];
                this.specObj = {
                    code69: '',      //商品条码
                    code: '',        //商品商家编码
                    ruleVal: '',      //规格值
                    unitPrice: '',     //成本价
                    price: '',        //市场价
                    inventory: '',    //库存
                    minImg: '',       //缩略图地址
                    imgeList: [],       //图片
                    measureSpecId: '',//计量规格ID
                    unitId: '',        //库存单位ID
                    unitName: '',   //计量单位名称
                    measureSpecName: '',   //计量规格名称
                    isShow: false,
                    isUpdateImg: false, //刘述添加 判断是否进行上传照片操作
                    isCheckPhoto: false,  //刘述添加 判断是否是在完成状态查看照片
                    minOrderQuantity: 1,
                    cartonId: '',
                    cartonVal: '',
                    tagId: '',
                    productionDate: '',   //刘述添加 生产日期
                    guaranteePeriod: '',
                    guaranteePeriodUnit: '',
                    is69code: true,
                    isToggleUploadImg: true, //是否显示上传照片组件
                    isOver: false
                };
            },
            //新增一条规格
            addOneSpec() {
                let checkResult = null;
                let obj = this.specObj;
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
                obj.minImg = this.fileList && this.fileList.length > 0 ? this.fileList[0].thumbnailUrl : '';

                //把商品标签转换成商品ID
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.tags[i].name === obj.tagId) {
                        obj.tagId = this.tags[i].id;
                        obj.tagName = this.tags[i].name;
                        break;
                    }
                }

                this.inventoryUnits.forEach(r => {
                    if (r.id == obj.unitId) {
                        obj.unitName = r.name;
                    }
                });


                checkResult = com.checkout(obj);
                if (checkResult) {
                    this.$alert(checkResult);
                    return;
                }
                if (this.arr69Code) {
                    this.fieldDisabled = true;
                }

                obj.unitPrice = parseFloat(this.specObj.unitPrice).toFixed(2);
                obj.price = parseFloat(this.specObj.price).toFixed(2);
                obj.cartonVal = parseInt(obj.cartonVal);
                obj.guaranteePeriod = parseInt(obj.guaranteePeriod);
                obj.measureSpecVal = parseInt(obj.measureSpecVal);
                obj.productionDate = format(obj.productionDate, 'YYYY-MM-DD', { locale: zh_cn });

                this.isAdd = true;
                this.confirm = true;
                this.isEdit = false;
                obj.isShow = true;
                obj.isUpdateImg = false;
                obj.isOver = true;
                this.specObj.isToggleUploadImg = false;
                obj.ruleVal = '(' + obj.measureSpecVal + '' + obj.measureSpecName + '*' + obj.cartonVal + '' + obj.unitName + ')/' + obj.cartonName;
                this.closeAddCommodity();
            },
            //删除一条规格
            handleDelete(index) {
                this.specTable[index].isUpdateImg = false;
                if (this.confirm) {
                    this.isAdd = true;
                } else {
                    this.isAdd = !this.isAdd;
                }
                //当在编辑状态下删除,那么其他条目应该变成可编辑状态
                if (this.isEdit) {
                    this.isEdit = false;
                }
                //如果删除的是69码存在的商品,要把规格值全部解禁
                if (this.tempArr[index] && this.tempArr[index].arr69Code) {
                    this.fieldDisabled = false;
                    for (let key in this.disabledInput) {
                        this.disabledInput[key] = false;
                    }
                }

                //删除临时数组对应的数据--69码提出来的方法中调用
                this.tempArr.splice(index, 1);


                this.confirm = false;
                this.specTable.splice(index, 1);


                //判断是否删除的是能返差出来的对象,如果是那么就把上面的商品信息打开可编辑
                if (this.specTable && this.specTable.length > 0) {
                    for (let item in this.specTable) {
                        if (item.is69code) {
                            for (let key in this.disabledInput) {
                                this.disabledInput[key] = true;
                            }
                        }
                    }
                } else {
                    for (let key in this.disabledInput) {
                        this.disabledInput[key] = false;
                    }
                }

                this.fileList = [];
                this.specObj = {
                    code69: '',      //商品条码
                    code: '',        //商品商家编码
                    ruleVal: '',      //规格值
                    unitPrice: '',     //成本价
                    price: '',        //市场价
                    inventory: '',    //库存
                    minImg: '',       //缩略图地址
                    imgeList: [],       //图片
                    measureSpecId: '',//计量规格ID
                    unitId: '',        //计量单位ID
                    unitName: '',   //计量单位名称
                    measureSpecName: '',   //计量规格名称
                    isShow: false,
                    isUpdateImg: false, //刘述添加 判断是否进行上传照片操作
                    minOrderQuantity: 1,
                    cartonId: '',
                    cartonVal: '',
                    tagId: '',
                    productionDate: '',   //刘述添加 生产日期
                    guaranteePeriod: '',
                    guaranteePeriodUnit: '',
                    isCheckPhoto: false,  //刘述添加 判断是否是在完成状态查看照片
                    is69code: true,
                    isToggleUploadImg: true,
                };
                this.isAdd = true;  //刘述添加  当进行完删除操作之后恢复到原始状态,因为规格可能有多个,不能删除一个之后就改变状态

                if (this.specTable && this.specTable.length == 0) {
                    this.fieldDisabled = false;
                    for (let key in this.disabledInput) {
                        this.disabledInput[key] = false;
                    }
                    //当删除的是最后一条规格之后要执行一次新增
                    this.showAddCommodity(1);
                }


            }
            ,
            //上传规格图片时获取图片url
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.specObj.minImg = res.data[0].minImgUrl;
            }
            ,


            //获取上传多张图片数据
            addFile(response, file, fileList) {
                //当是否可以上传照片为true的时候进行操作
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
            }
            ,
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
            }
            ,
            //图片预览的方法
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
            ,

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

            }
            ,
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
            }
            ,
            //限制上传图片大小/
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
            ,

            getCommodityCategory(pid, type) {
                if (!pid && type) {
                    return;
                }
                commType.getCommodityCategory({ 'pid': pid ? pid : 0 }).then(response => {
                    if (type && type == 1) {
                        this.categoryTwoId = '';
                        this.categoryThreeId = '';
                        this.level3_classifications = [];
                        this.level2_classifications = response.data;
                        return;
                    } else if (type && type == 2) {
                        this.categoryThreeId = '';
                        this.level3_classifications = response.data;
                        return;
                    }
                    this.level1_classifications = response.data;
                });
            }
            ,
            submit() {
                // 外部必填项校验；
                if (!this.isAdd) {
                    this.$alert('请先完成商品规格添加,在编辑状态下无法提交');
                    return;
                }
                if (!this.name) {
                    this.$alert('请输入商品名称');
                    return;
                }
                if (this.name && this.name.length > 127) {
                    this.$alert('商品名称长度不能超过128个字符');
                    return;
                }

                if (!this.brand) {
                    this.$alert('请输入商品品牌');
                    return;
                }

                if (this.brand && this.brand.length > 127) {
                    this.$alert('商品品牌长度不能超过128个字符');
                    return;
                }
                if (!this.originPlace) {
                    this.$alert('请输入商品产地');
                    return;
                }
                if (this.originPlace && this.originPlace.length > 127) {
                    this.$alert('商品产地长度不能超过128个字符');
                    return;
                }

                if (this.code69Display) {
                    if (!this.code69DisplayCategoryOneId || !this.code69DisplayCategoryTwoId || !this.code69DisplayCategoryThreeId) {
                        this.$alert('请选择商品科属');
                        return;
                    }
                } else {
                    if (!this.categoryOneId || !this.categoryTwoId || !this.categoryThreeId) {
                        this.$alert('请选择商品科属');
                        return;
                    }
                }
                if (!this.companyName) {
                    this.$alert('请输入企业名称');
                    return;
                }

                if (this.companyName && this.companyName.length > 127) {
                    this.$alert('企业名称长度不能超过128个字符');
                    return;
                }

                if (this.tableList.length < 1) {
                    this.$alert('请添加商品规格');
                    return;
                }
                if (!this.content || this.content === '') {
                    this.$alert('请填写商品说明');
                    return;
                }

                let submitDate = {
                    name: this.name,
                    brandName: this.brand,
                    categoryOneId: this.code69DisplayCategoryOneId ? this.code69DisplayCategoryOneId : this.categoryOneId,
                    categoryThreeId: this.code69DisplayCategoryThreeId ? this.code69DisplayCategoryThreeId : this.categoryThreeId,
                    categoryTwoId: this.code69DisplayCategoryTwoId ? this.code69DisplayCategoryTwoId : this.categoryTwoId,
                    commodityList: this.tableList,
                    remark: this.content,
                    supplierId: this.accountId ? this.accountId : 0,
                    companyName: this.companyName,
                    originPlace: this.originPlace
                };
//                let token = window.localStorage.getItem('token');

                if (this.isSubmit !== 0) {
                    this.$alert("请不要重复提交!");
                    return;
                }

                this.isSubmit++;
                comm.submitContent(submitDate).then(res => {
                    this.isSubmit = 0;
                    if (res.data.code == 1) {
                        this.$router.push({ path: '/commodityList', query: { accountId: this.accountId } });
                    } else if (res.data.code == 0) {
                        this.$alert(res.data.message);
                    }
                });

//                axios({
//                    method: 'post',
//                    url: '/comm/save?supplierId=' + (this.accountId ? this.accountId : 0),
//                    data: submitDate,
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        this.isSubmit = 0;
//                        if (response.data.code == 1) {
//                            this.$router.push({ path: '/commodityList', query: { accountId: this.accountId } });
//                        } else if (response.data.code == 0) {
//                            this.$alert(response.data.message);
//                        }
//                    }
//                );
            }
            ,
            reset() {
                this.name = '';
                this.brand = '';
                this.categoryOneId = '';
                this.categoryTwoId = '';
                this.categoryThreeId = '';
                this.code69DisplayCategoryOneId = '';
                this.code69DisplayCategoryTwoId = '';
                this.code69DisplayCategoryThreeId = '';
                this.specTable = [];
                this.content = '';
                this.textAreaDescription = '';
                this.originPlace = '';
                this.marketTime = '';
                this.companyName = '';
                this.tagId = '';
                this.disabledInput.name = false;
                this.disabledInput.brand = false;
                this.disabledInput.categoryOneId = false;
                this.disabledInput.categoryTwoId = false;
                this.disabledInput.categoryThreeId = false;
                this.isAdd = true;
                this.specObj = {
                    code69: '',      //商品条码
                    code: '',        //商品商家编码
                    ruleVal: '',      //规格值
                    unitPrice: '',     //成本价
                    price: '',        //市场价
                    inventory: '',    //库存
                    minImg: '',       //缩略图地址
                    imgeList: [],       //图片
                    measureSpecId: '',//计量规格ID
                    unitId: '',        //计量单位ID
                    unitName: '',   //计量单位名称
                    measureSpecName: '',   //计量规格名称
                    isShow: false,
                    isUpdateImg: false, //刘述添加 判断是否进行上传照片操作
                    minOrderQuantity: 1,
                    cartonId: '',
                    cartonVal: '',
                    tagId: '',
                    productionDate: '',   //刘述添加 生产日期
                    guaranteePeriod: '',
                    guaranteePeriodUnit: '',
                    isCheckPhoto: false,  //刘述添加 判断是否是在完成状态查看照片
                    is69code: true,
                    isToggleUploadImg: true,
                };


                //页面重置的时候实现一次商品添加
                this.showAddCommodity(1);
            }
        },
        computed: {
            formateUnitPrice() {
                return this.specObj.unitPrice;
            },
            formatePrice() {
                return this.specObj.price;
            },
            editor() {
                return this.$refs.myTextEditor.quill;
            },
            tableList() {
                let arr = this.specTable;
                return arr;
            },
            getImgList() {
                let arr = [];
                let newObj = {};
                this.fileList.forEach((item) => {
                    newObj.name = item.name;
                    newObj.size = item.size;
                    newObj.type = item.type;
                    newObj.url = item.url;
                    arr.push(newObj);
                });
                return arr;
            },
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            navigationList() {
                if (this.isAdmin == 0) {
                    return [{ name: '商品管理' }, { name: '新增商品' }]
                } else if (this.isAdmin == 1) {
                    return [{ name: ' 供应商管理' },
                        { name: '供应商列表', route: { path: '/supplierInfoList' } },
                        { name: '商品列表', route: { path: '/commodityList', query: { 'accountId': this.accountId } } },
                        { name: '新增商品' }];
                }
            }
        },
        components: {
            quillEditor,
            breadCrumb
        },
        mounted() {
            this.content = this.value;
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor) {
                    if (newVal !== this.content) {
                        this.content = newVal;
                    }
                }
            }
            ,
            //监听新增table库存单位变动,后面的2个占位同时变动
            'specObj.unitId':
                {
                    handler(newVal) {
                        if (newVal) {
                            for (let i = 0; i < this.inventoryUnits.length; i++) {
                                if (this.inventoryUnits[i].id === newVal) {
                                    this.specObj.unitName = this.inventoryUnits[i].name;
                                    break;
                                }
                            }
                        }
                    }
                }
            ,
            'specObj.measureSpecId':
                {
                    handler(newVal) {
                        if (newVal) {
                            for (let i = 0; i < this.measureSpecUnits.length; i++) {
                                if (this.measureSpecUnits[i].id === newVal) {
                                    this.specObj.measureSpecName = this.measureSpecUnits[i].name;
                                    break;
                                }
                            }
                        }
                    }
                }
            ,
            'specObj.cartonId':
                {
                    handler(newVal) {
                        if (newVal) {
                            for (let i = 0; i < this.cartonUnits.length; i++) {
                                if (this.cartonUnits[i].id === newVal) {
                                    this.specObj.cartonName = this.cartonUnits[i].name;
                                    break;
                                }
                            }
                        }
                    }
                }
            ,
            'specObj.tagId': {
                handler(newVal) {
                    if (newVal) {
                        for (let i = 0; i < this.tags.length; i++) {
                            if (this.tags[i].id === newVal) {
                                this.specObj.tagId = this.tags[i].name;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
</script>
