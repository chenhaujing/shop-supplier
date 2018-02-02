<template>
    <div>
        <div>
            <mybreadcrumb :navigationList="navigationList"></mybreadcrumb>
            <img class="resize" alt="打印" title="打印" @click="exportFile" src="../../../static/img/icon/print.png"
                 v-show="isAdmin ==0">
        </div>
        <div ref="commodityInfo">
            <div class="row commodityInfo_status">
                <commodityAudit :commodityStatus="commodityStatus"></commodityAudit>
                <div class="col-xs-offset-4 col-xs-5">
                    <el-button type="primary" v-has:commodityDetail_goodsShelves @click="openWarning(2)" v-show="isShow"
                               :disabled="commodityStatus !== 3">上架
                    </el-button>
                    <el-button type="primary" v-has:commodityDetail_goodsOffShelf :disabled="commodityStatus!== 2"
                               @click="openWarning(1)" v-show="isShow"> 下架
                    </el-button>
                    <el-button type="danger" v-has:commodityDetail_openWarning @click="openWarning(3)"
                               :disabled="commodityStatus === 2 || commodityStatus === 4 || commodityStatus === 5 || commodityStatus === 6"
                               v-show="isShow">删除
                    </el-button>
                    <el-button type="success" v-has:commodityDetail_editCommodity @click="edit" v-show="isShow">编辑
                    </el-button>
                </div>
            </div>
            <div class="row commodityinfo_contact clearMargin">
                <div class="col-xs-4 slider" ref="myDiv" v-show="isShow">
                    <p class="LeftButton" ref="arrowsLeft" @click="previousPage">
                        <img src="../../../static/img/icon/arrowLeft.png">
                    </p>
                    <ul class="largerUl" ref="myUl">
                        <li v-for="img in largeImgArr">
                            <img :src="img.url">
                        </li>
                    </ul>
                    <p class="nextButton" ref="arrowsRight" @click="nextPage">
                        <img src="../../../static/img/icon/arrowRight.png">
                    </p>
                    <ul class="smallUl">
                        <li @click="touchMiniImg(index)" v-for="(img,index) in smallImgArr">
                            <img :src="img.url">
                        </li>
                    </ul>
                </div>
                <infoListContent :commodityDetails="commodityDetails"></infoListContent>
            </div>
            <div class="row clearMargin">
                <p class="commodity">商品说明</p>
            </div>
            <quill-editor ref="myTextEditor" v-model="commodityDetails.remark" :options="editorOption">
            </quill-editor>
        </div>
        <div class="commodityInfo_buttonWrap">
            <el-button type="primary" @click="back">返回上一级</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="isWarning" size="tiny">
            <span v-show="warningType==3">确定删除商品？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="isWarning = false">取 消</el-button>
                    <el-button v-show="warningType==3" type="primary" @click="deleteCommoditySku">确定</el-button>
                </span>
        </el-dialog>
        <!--资质信息未通过模态框-->
        <el-dialog
            :visible.sync="isAptitudePass"
            size="tiny"
            :before-close="aptitudeHandleClose">
            <span>抱歉，该供应商还没通过资质信息审核，无法上架商品！</span>
            <span slot="footer" class="dialog-footer" v-show="isAdmin=== '0'">
              <router-link supplierAccountId
                           :to="{path:'/commonSupplierInfoEdit',query: {'accountId':supplierAccountId,'routeSupplier':5,'commodityId':commodityId}}">
                  <el-button type="info">资质信息</el-button>
              </router-link>
            </span>
            <span slot="footer" class="dialog-footer" v-show="isAdmin=== '1'">
              <router-link
                  :to="{path:'/supplierInfoEdit',query: {'accountId':accountId,'routeSupplier':4,'commodityId':commodityId}}">
                  <el-button type="info">资质信息</el-button>
              </router-link>
            </span>
        </el-dialog>
    </div>
</template>

<style>
    .crumbs .el-breadcrumb__item__inner {
        cursor: pointer;
    }

    /*刘述添加的样式start*/

    .commodityinfo_row {
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .commodityinfo_row > div > h2 {
        text-align: center;
    }

    .commoditylnfo_button {
        width: 100%;
        margin-bottom: 20px;
    }

    .commoditylnfo_button > button {
        margin: 10px 20px;
    }

    .commoditylnfo_button > button:nth-of-type(1) {
        margin: 10px 20px 10px 65%;
    }

    .commodityinfo_contact {
        border-top: 1px solid #ccc;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }

    .commoditylnfo_tab > td {
        text-align: center;
        vertical-align: center;
    }

    /*刘述添加的样式end*/

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-carousel__container {
        height: 190px;
    }

    .el-carousel__container img {
        width: 100%;
    }

    .resize {
        width: 30px;
        height: 30px;
        position: relative;
        top: -10px;
        left: 2%;
        cursor: pointer;
    }

    p.commodity {
        margin-left: 15px;
        margin-top: 20px;
    }

    .proDes {
        border-top: 1px solid #ccc;
    }

    .commoditylnfo_img {
        height: 40%;
    }

    .commoditylnfo_tab th {
        text-align: center;
    }

    .commoditylnfo_tab td {
        text-align: center;
        vertical-align: middle;
        height: 20%;
    }

    /*调整幻灯片位置*/

    .slider {
        margin-top: 5px;
        position: relative;
        height: 300px;
        overflow: hidden;
    }

    .slider:hover p {
        display: block;
    }

    .slider > p {
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }

    .slider > .LeftButton {
        left: 0;
    }

    .slider > .nextButton {
        right: 0;
    }

    .slider .largerUl {
        position: absolute;
        top: 0;
        left: 0;
    }

    .slider li {
        float: left;
    }

    .slider .largerUl > li > img {
        height: 245px;
        display: block;
        margin: 0 auto;
    }

    .slider > p > img {
        width: 35px;
    }

    .slider .smallUl {
        position: absolute;
        top: 255px;
    }

    .slider .smallUl > li {
        margin-right: 5px;
    }

    .slider .smallUl > li > img {
        border: 1px solid #ccc;
        width: 60px;
        height: 40px;
    }

    .commodityinfo_contact b {
        width: 110px;
        display: inline-block;
    }

    .commodityInfo_list {
        padding: 0 !important;
    }

    .commodityInfo_list b {
        width: 70px;
        display: inline-block;
    }

    .commodityInfo_status {
        margin: 0;
        margin-bottom: 15px;
    }

    .commodityInfo_status > div > span {
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
        padding-left: 20px;
    }

    .commodityInfo_buttonWrap {
        margin-top: 20px;
        text-align: center;
    }

</style>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import {quillEditor} from 'vue-quill-editor';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import '../../../static/css/commodityInfo.less';
    import mybreadcrumb from '../../components/Breadcrumb.vue';
    import commodityAudit from '../../components/commodity/commodityAudit.vue';
    import infoListContent from '../../components/commodity/infoListContent.vue';
    import comm from '../../api/comm.js';
    import commBrand from '../../api/commBrand.js';
    import commCarton from '../../api/commCarton.js';
    import commMeasureSpec from '../../api/commMeasureSpec.js';
    import commTag from '../../api/commTag.js';
    import commType from '../../api/commType.js';
    import commUnit from '../../api/commUnit.js';

    export default {
        data() {
            return {
                auditResult: '',
                isAdmin: '',
                warningType: '',
                // 敏感操作弹窗；
                isWarning: false,
                title: '商品详情页',
                commodityId: null,
                accountId: null,
                token: null,
                commodityStatus: null,
                commodityDetails: {},
                commoditySku: {},
                adminCommInfoFlag: false,
                editorOption: {
                    modules: {
                        toolbar: false
                    },
                    placeholder: 'Compose an epic...',
                    readOnly: true,
                    theme: 'snow'
                },
                isShow: true,
                commodityDetailsImgList: null,
                //  navigationList:[{name:"商品管理"},{name:"商品列表",route:{path:'/commodityList',query:{'accountId':this.$route.query.accountId}}},{name:"商品详情"}],
                PageInfo: '',
                dialogVisible: false,
                textShow: false,
                optionsRadiosPass: 0,
                optionsRadiosNoPass: 0,
                commodityText: '',
                myDivWidth: '0px',
                sign: true,
                index: 0,
                maxIndex: 0,
                smallImgArr: [],
                largeImgArr: [],
                myUl: null,
                isProhibit: false,
                isAptitudePass: false,
                adminFlag: null


            };
        },
        computed: {
            navigationList() {
                this.commodityId = this.$route.query.commodityId;
                this.accountId = this.$route.query.accountId;
                this.auditResult = this.$route.query.auditResult;
                this.adminCommInfoFlag = this.$route.query.adminCommInfoFlag;
//                this.token = window.localStorage.getItem('token');
                this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
                if (this.isAdmin == 0) {
                    return [{ name: "商品管理" }, {
                        name: "商品列表",
                        route: { path: '/commodityList', query: { 'accountId': this.accountId } }
                    }, { name: "商品详情" }]
                } else if (this.isAdmin == 1 && this.adminCommInfoFlag) {
                    return [{ name: "商品管理" }, {
                        name: "商品列表",
                        route: { path: '/adminCommodityList' }
                    }, { name: "商品详情" }]
                } else if (this.isAdmin == 1 && this.auditResult && !this.adminCommInfoFlag) {
                    return [{ name: '商品管理' }, {
                        name: '商品审核',
                        route: { path: '/commodityAudit', query: { 'accountId': this.accountId } }
                    }, { name: '商品详情' }]
                } else if (this.isAdmin == 1 && this.accountId && !this.adminCommInfoFlag) {
                    return [{ name: '供应商管理' }, { name: '供应商列表', route: { path: '/supplierInfoList' } }, {
                        name: '供应商详情',
                        route: { path: '/basicInfo', query: { 'accountId': this.accountId } }
                    }, {
                        name: '商品列表',
                        route: {
                            path: '/commodityList',
                            query: { 'accountId': this.accountId, commodityId: this.commodityId }
                        }
                    }, { name: '商品详情' }]
                }
            }
        },
        components: {
            quillEditor,
            mybreadcrumb,
            commodityAudit,
            infoListContent
        },
        created() {
            this.adminFlag = this.$route.query.adminFlag;
            this.commodityId = this.$route.query.commodityId;
            this.accountId = this.$route.query.accountId;
            this.supplierAccountId = this.$route.query.supplierAccountId;
            this.auditResult = this.$route.query.auditResult;
            this.adminCommInfoFlag = this.$route.query.adminCommInfoFlag;
//            this.token = window.localStorage.getItem('token');
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
//            this.userId = JSON.parse(window.localStorage.getItem('account')).id;
            this.userId = JSON.parse(sessionStorage.getItem('vuex')).user.account.id;
            //管理员---商品详情
            if (this.auditResult == 0 || this.auditResult == 1 || this.auditResult == 2) {
                this.commodityId = this.$route.query.commodityId;
                this.getInform(this.commodityId);
            } else {   //供应商--商品详情
                this.getDetails(this.commodityId);
            }
        },
        methods: {
            /**
             * 返回方法
             * */
            back() {
                this.$store.dispatch('setFlag', true);
                this.isAdmin === '0' ? this.$router.push({
                    path: '/commodityList',
                    query: { 'accountId': this.accountId, 'commodityId': this.commodityId }
                }) : this.isAdmin === '1' && !this.adminCommInfoFlag ? this.$router.push({
                    path: '/commodityList',
                    query: { 'accountId': this.accountId, 'commodityId': this.commodityId }
                }) : this.$router.push('/adminCommodityList');
            },

            /**
             * 轮播图下一张图片
             * */
            nextPage() {
                if (this.maxIndex < 1) {
                    return;
                }
                if (this.sign) {
                    this.sign = false;
                    if (this.index === this.maxIndex) {
                        this.index = 0;
                        this.myUl.style.transition = "none";
                        this.myUl.style.left = this.index + "px";
                    }
                    this.index++;
                    setTimeout(() => {
                        this.myUl.style.transitionProperty = "left";
                        this.myUl.style.transitionDuration = "1s";
                        this.myUl.style.transitionTimingFunction = "linear";
                        this.myUl.style.left = "-" + (this.myDivWidth * this.index) + "px";
                    }, 100);
                    setTimeout(() => {
                        this.sign = true;
                    }, 1300);
                }

            },
            /**
             * 轮播图上一张图片
             * */
            previousPage() {
                if (this.maxIndex < 1) {
                    return;
                }
                if (this.sign) {
                    this.sign = false;
                    if (this.index === 0) {
                        this.index = this.maxIndex;
                        this.myUl.style.transition = "none";
                        this.myUl.style.left = "-" + (this.myDivWidth * this.index) + "px";
                    }
                    this.index--;
                    setTimeout(() => {
                        this.myUl.style.transitionProperty = "left";
                        this.myUl.style.transitionDuration = "1s";
                        this.myUl.style.transitionTimingFunction = "linear";
                        this.myUl.style.left = "-" + (this.myDivWidth * this.index) + "px";
                    }, 1);
                    setTimeout(() => {
                        this.sign = true;
                    }, 1300);
                }
            },
            /**
             * 轮播图上面的小图
             * */
            touchMiniImg(id) {
                this.myUl.style.transitionProperty = "left";
                this.myUl.style.transitionDuration = "1s";
                this.myUl.style.transitionTimingFunction = "linear";
                this.myUl.style.left = "-" + (this.myDivWidth * id) + "px";
                setTimeout(() => {
                    this.index = id;
                }, 1300);
            },
            /**
             * 编辑按钮方法
             * */
            edit() {
                if (this.commodityDetails.status === 4 || this.commodityDetails.status === 5 || this.commodityDetails.status === 6) {
                    this.$alert('待审核状态下的商品,禁止操作！');
                    return;
                }
                this.$router.push({
                    path: '/commodityEdit',
                    query: {
                        skuId: this.commodityId,
                        accountId: this.accountId,
                        auditResult: this.auditResult,
                        adminCommInfoFlag: this.adminCommInfoFlag
                    }
                });
            },
            /**
             * 管理员查询
             *
             * */
            getInform(id) {
                comm.getAdminCommodityInfo(id).then(response => {
                    if (response.data.data) {
                        this.commodityDetails = response.data.data;
                        this.query(this.commodityDetails);
                    }
                });
            },
            /**
             * 供应商查询
             * */
            getDetails(id) {
                comm.getCommodityInfo(id).then(
                    (response) => {
                        if (response.data.data) {
                            this.commodityDetails = response.data.data;
                            this.query(this.commodityDetails);
                        }
                    }
                );
            },
            // 添加敏感操作弹窗；
            openWarning(type) {
                if (type == 1) {
                    this.isWarning = false;
                    this.cancelCommoditySku();
                    return;
                } else if (type == 2) {
                    this.isWarning = false;
                    this.upCommoditySku();
                    return;
                }
                this.isWarning = true;
                this.warningType = type;
            },

            deleteCommoditySku() {
                this.isWarning = false;
                comm.deleteCommoditySku(this.commodityId).then(
                    (response) => {
                        if (response.data.code == 1) {
                            this.$alert(response.data.message);
                            this.$router.push({ path: '/commodityList', query: { accountId: this.accountId } });
                        } else if (response.data.code == 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            exportFile() {
                this.isShow = false;
                this.$refs.content.className = 'col-xs-12';
                setTimeout(() => {
                    window.document.body.innerHTML = this.$refs.commodityInfo.innerHTML;
                    window.print();
                    window.location.reload();
                }, 50);
            },
            /**
             * 上架商品
             * @param id
             */
            upCommoditySku() {
                let token = this.token,
                    ids = [];
                this.isWarning = false;
                ids.push(this.commodityId);
                comm.goodsShelves(ids).then(res => {
                    if (res.data.data && !this.adminCommInfoFlag) {
                        this.isAptitudePass = true;
                    } else {
                        this.$alert(res.data.message);
                    }
                    if (res.data.code == 1) {
                        this.$alert(res.data.message);
                        this.getDetails(this.commodityId);
                    }
                });
//                axios({
//                    url: '/comm/onShelves/' + ids,
//                    method: 'put',
//                    headers: { 'Authorization': token }
//                }).then(
//                    (response) => {
//                        if (response.data.data && !this.adminCommInfoFlag) {
//                            this.isAptitudePass = true;
//                        } else {
//                            this.$alert(response.data.message);
//                        }
//                        if (response.data.code == 1) {
//                            this.$alert(response.data.message);
//                            this.getDetails(this.commodityId);
//                        }
//                    }
//                );
            },
            /**
             * 下架商品
             */
            cancelCommoditySku() {
                comm.cancelCommoditySku(this.commodityId).then(response => {
                    if (response.data.code == 0) {
                        this.$alert(response.data.message);
                    }
                    if (response.data.code == 1) {
                        this.$alert(response.data.message);
                        this.getDetails(this.commodityId);
                    }
                });
            },
//            /**
//             * 管理员点击审核触发模态框
//             */
//            audit() {
//                this.dialogVisible = true;
//            },
//            /**
//             * 管理员审核未通过的时候的input输入框
//             * */
//            show(type) {
//                if (type === 1) {   //1是通过   0是不通过
//                    this.textShow = false;
//                    this.optionsRadiosPass = true;
//                    this.optionsRadiosNoPass = false;
//                } else if (type === 0) {
//                    this.textShow = true;
//                    this.optionsRadiosPass = false;
//                    this.optionsRadiosNoPass = true;
//                }
//            },
//            /**
//             *管理员审核模态框（确定按钮）功能
//             */
//            commit() {
//                let textCheck = /^[\u4E00-\u9FA5A-Za-z0-9]{1,200}$/;
//                if (this.optionsRadiosNoPass && this.commodityText && (!textCheck.test(this.commodityText))) {
//                    this.$alert('你输入的方式有误!');
//                    this.commodityText = '';
//                    return;
//                }
//                if (this.optionsRadiosPass) {
//                    this.getbulk();
//                } else if (this.optionsRadiosNoPass && this.commodityText) {
//                    this.getbulk();
//                } else if (!this.optionsRadiosPass && !this.optionsRadiosNoPass) {
//                    this.$alert('选择方式不能为空');
//                } else if (this.optionsRadiosNoPass && (!this.commodityText)) {
//                    this.$alert('必须输入内容');
//                }
//            },
//            /**
//             * 管理员审核模态框（取消按钮功能）
//             * */
//            cancel() {
//                this.optionsRadiosPass = '';
//                this.optionsRadiosNoPass = '';
//                this.commodityText = '';
//                this.dialogVisible = false;
//                this.textShow = false;
//            },
//
//            //商品批量审核请求(通过)
//            getbulk() {
//                axios({
//                    method: 'post',
//                    url: '/comm/audit/bulk',
//                    data: {
//                        ids: [this.commodityId],
//                        userId: parseFloat(this.userId),
//                        auditResult: this.auditResult,
//                        auditOpinion: this.commodityText
//                    }
//                }).then(res => {
//                    this.isProhibit = true;
//                    this.dialogVisible = false;
//                    this.$alert(res.data.message);
//                })
//            },
            /**
             * 资质审核未通过关闭方法
             * */
            aptitudeHandleClose() {
                this.isAptitudePass = false;
            },
            /**
             * 公共方法
             * */
            //1.页面初始化,查询方法公共部分
            query(data) {
                let i = 0;
                //如果时间有结果返回
                data.productionDate = data.productionDate && data.productionDate.split(' ')[0];
                this.commodityStatus = data.status;
                if (data.imgeList.length === 0) {
                    data.imgeList.push({ url: '../../../static/img/LargePlaceholder.png' });
                }

                let larImg = [];
                for (let i = 0; i < data.imgeList.length; i++) {
                    larImg[i] = data.imgeList[i];
                }

                let smallImg = [];
                for (let i = 0; i < data.imgeList.length; i++) {
                    smallImg[i] = data.imgeList[i];
                }


                //实现轮播图的大图
                this.largeImgArr = larImg.length > 4 ? larImg.slice(0, 4) : larImg;
//
                //实现轮播图无缝轮播的效果,把img列表的第一项添加到img列表的最后
                if (this.largeImgArr.length > 1) {
                    this.largeImgArr.push(this.largeImgArr[0]);
                }

                //实现轮播图的小图
                this.smallImgArr = smallImg.length > 4 ? smallImg.slice(0, 4) : smallImg;

                //如果imgList里面url有错误的替换图片的路径,大图和小图都要替换
                this.largeImgArr.forEach((value, index) => {
                    if (value.url === 'ERROR') {
                        this.largeImgArr[index].url = '../../../static/img/uploadLargeImgError.png';
                    }
                });
                this.smallImgArr.forEach((val, index) => {
                    if (val.url === 'ERROR') {
                        this.smallImgArr[index].url = '../../../static/img/uploadLargeImgError.png';
                    }
                });


                this.maxIndex = this.largeImgArr.length - 1;
                this.myDivWidth = this.$refs.myDiv.offsetWidth;
                this.myUl = this.$refs.myUl;
                this.myUl.style.width = (this.largeImgArr.length * this.myDivWidth) + 'px';

                this.$nextTick(() => {
                    for (i; i < this.myUl.children.length; i++) {
                        this.myUl.children[i].style.width = this.myDivWidth + 'px';
                    }
                });
            },
        },
        filters: {
            toFloat(args) {
                if (args) {
                    return args.toFixed(2);
                }
            },
        },
    };
</script>
