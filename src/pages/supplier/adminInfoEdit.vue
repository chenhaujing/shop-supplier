<template>
    <div>
        <!--（管理员）供应商管理--供应商列表--供应商详情-->
        <div  v-show="isAdmin==1&&!routeSupplier">
            <breadCrumb :navigationList="breadList"></breadCrumb>
        </div>
        <!--(管理员)供应商管理--供应商列表--商品列表-->
        <div v-show="routeSupplier==2">
            <brearCrumbTwo :navigationList="breadListTwo"></brearCrumbTwo>
        </div>

        <!--(管理员)供应商管理---供应商列表----商品列表----商品详情-->
        <div v-show="routeSupplier==4">
            <brearCrumbThree :navigationList="breadListThree"></brearCrumbThree>
        </div>
        <div>
            <!--管理员标签页-->
            <div class="supplierinfoEdit_basic_warp row well clearPadding" v-show="isAdmin==1">
                <div class="col-xs-2 col-md-2 col-lg-2" style="margin-left: 50px;cursor: pointer">
                    <p class="clearMargin"
                       v-bind:class="{supplierinfoEdit_message:true,supplierinfoEdit_message_cartoon:one}">
                        <el-button type="text" style="font-size: 18px" v-has:supplierInfoEdit_supplierHeader1  @click="supplierHeader(1)">基础信息</el-button>
                    </p>
                </div>
                <div class="col-xs-2 col-md-2 col-lg-2" style="cursor: pointer">
                    <p class="clearMargin"
                       v-bind:class="{supplierinfoEdit_message:true,supplierinfoEdit_message_cartoon:two}">
                        <el-button type="text" style="font-size: 18px" @click="supplierHeader(2)" v-has:supplierInfoEdit_supplierHeader2>合同信息</el-button>
                    </p>
                </div>
                <div class="col-xs-2 col-md-2 col-lg-2" style="cursor: pointer">
                    <p class="clearMargin"
                       v-bind:class="{supplierinfoEdit_message:true,supplierinfoEdit_message_cartoon:three}">
                        <el-button type="text" style="font-size: 18px" v-has:supplierInfoEdit_supplierHeader3  @click="supplierHeader(3)">资质信息</el-button>
                    </p>
                </div>
            </div>
            <!--管理员基础信息-->
            <div class="row supplierinfoEdit_basMessage"  v-show="isAdmin==1&&one">
                <div class="col-xs-6 supplierbaseMessage_Margin">
                    <div class="form-horizontal ">
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">供应商名称:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.providerName" :maxlength="254"
                                          :disabled="supplierDisplay"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">法人手机号:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.responsiblePhone" :maxlength="254"
                                          :disabled="supplierDisplay"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">法人代表:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.responsible" :maxlength="254"
                                          :disabled="supplierDisplay"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">注册地址:</label>
                            <div class="col-xs-3 supplierInfoEdit_margin">
                                <select class="form-control test" v-model="userInfo.registAddressProvince"
                                        :disabled="supplierDisplay"
                                        @change="getCity(userInfo.registAddressProvince,1)">
                                    <option :value="option.srId" v-for="option in registerProvinces">{{option.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-xs-3 supplierInfoEdit_margin">
                                <select class="form-control" v-model="userInfo.registAddressCity"
                                        :disabled="supplierDisplay"
                                        @change="getArea(userInfo.registAddressCity,1)">
                                    <option v-for="option in registerCities" :value="option.srId">{{option.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-xs-3 supplierInfoEdit_margin">
                                <select class="form-control" v-model="userInfo.registAddressDistrict"
                                        :disabled="supplierDisplay">
                                    <option v-for="option in registerDistricts" :value="option.srId">{{option.name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class=" row col-xs-6 col-xs-offset-3 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.registerAddressDetail"
                                          :disabled="supplierDisplay"
                                          :maxlength="254"></el-input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--管理员合同信息-->
            <div class="row supplierinfoEdit_basMessage" v-show="isAdmin==1&&two">
                <div class="col-xs-6 supplierbaseMessage_Margin">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">开户行类型:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin" v-show="supplierStatue">
                                <el-select v-model="userInfo.bankName" disabled>
                                    <el-option
                                        v-for="bankName in bankNames"
                                        :key="bankName"
                                        :label="bankName"
                                        :data-status="bankName"
                                        :value="bankName">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="col-xs-6 supplierInfoEdit_margin" v-show="!supplierStatue">
                                <el-select v-model="userInfo.bankName">
                                    <el-option
                                        v-for="bankName in bankNames"
                                        :key="bankName"
                                        :label="bankName"
                                        :data-status="bankName"
                                        :value="bankName">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">开户行账号:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.bankNum" :disabled="supplierStatue"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">开户人姓名:</label>
                            <div class="col-xs-6 supplierInfoEdit_margin">
                                <el-input type="text" v-model="userInfo.bankUserName" :maxlength="254"
                                          :disabled="supplierStatue"></el-input>
                            </div>
                        </div>
                        <div class="form-group" v-show="supplierStatue">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">合同附件:</label>
                            <div class="col-xs-3">
                                <el-button type="info" @click="exportFile()">下载附件</el-button>
                            </div>
                            <div class="col-xs-3">
                                <el-button type="info" @click="lookFile()">查看附件</el-button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-xs-6">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">合同有效期:</label>
                            <div class="col-xs-3 supplierInfoEdit_margin">
                                <el-date-picker
                                    :disabled="supplierStatue"
                                    v-model="userInfo.contractCreateDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    type="date" style="width:120%">
                                </el-date-picker>
                            </div>
                            <div class="col-xs-1 useful_time col-xs-offset-1">至</div>
                            <div class="col-xs-3 supplierInfoEdit_margin">
                                <el-date-picker
                                    :disabled="supplierStatue"
                                    v-model="userInfo.contractEndDate"
                                    format="yyyy-MM-dd"
                                    :editable='false'
                                    @change="editTime"
                                    type="date" style="width:120%">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-3 col-lg-offset-3 supplierinfoEdit_upComming"
                                 v-show="userInfo.contractStatus==1">合同即将过期
                            </div>
                            <div class="col-lg-3 col-lg-offset-3 supplierinfoEdit_pastDue"
                                 v-show="userInfo.contractStatus==2">合同已过期
                            </div>
                        </div>
                        <div class="form-group" v-show="!supplierStatue">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">更新合同附件:</label>
                            <div class="col-xs-9 supplierInfoEdit_margin">
                                <el-upload style="display: block"
                                           :multiple="false"
                                           class="upload-demo"
                                           :action="'/account/uploadContract?blobName='+userInfo.contractOriginalName"
                                           accept=".pdf"
                                           :on-preview="test"
                                           :headers="headers"
                                           :on-progress="inProgress"
                                           :on-success="uploadSuccess"
                                           :on-error="uploadError"
                                           :on-remove="removeFile"
                                           :before-upload="beforeAvatarUpload"
                                           :file-list="fileList"
                                           list-type="text">
                                    <el-button size="small" type="primary" ref="supplierEdit_upload"
                                               :disabled="supplierStatue">点击上传
                                    </el-button>
                                    <div slot="tip" class="el-upload__tip supplierinfoEdit_state">
                                        备注说明：上传文件类型：.pdf文件大小不得超过20MB
                                    </div>
                                </el-upload>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label"><img src="../../../static/img/20170801162143.png">是否启用:</label>
                            <div class="col-xs-2" style="margin-top:13px">
                                <input type="radio" name="supplierStart" v-model="userInfo.accountStatus" :value="1"
                                       :disabled="supplierStatue" @click="supplierStart(1)">启用
                            </div>
                            <div class="col-xs-2" type="radio" name="supplierStart" style="margin-top:13px">
                                <input type="radio" name="supplierStart" v-model="userInfo.accountStatus" :value="2"
                                       :disabled="supplierStatue" @click="supplierStart(0)">禁用
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-xs-3  control-label">
                                <img src="../../../static/img/20170801162143.png">
                                回款结算方式：
                            </label>
                            <div class="col-xs-7">
                                <input name="balance1" type="radio" v-model="userInfo.remittanceType" value="1"
                                       :disabled="supplierStatue">
                                <span>自然月（按照合同账期结算）</span>
                                <br>
                                <input name="balance1" type="radio" v-model="userInfo.remittanceType" value="2"
                                       :disabled="supplierStatue">
                                <span>固定时间</span>
                                <div class="supolierInfoEdit_inputStyle" v-show="userInfo.remittanceType==2">

                                    <span>结账时间</span>
                                    <el-input type="text" :value="remittanceTwo" v-model="remittanceTwo"
                                              :maxlength="6" :disabled="supplierStatue"></el-input>
                                    <span>天为一个周期</span>
                                </div>
                                <div class="supolierInfoEdit_selectStyle" v-show="userInfo.remittanceType==1">
                                    <span>设置每月</span>
                                    <select class="form-control" v-model="remittanceOne" style="width:100px"
                                            :disabled="supplierStatue">
                                        <option :value="remittanceTwo" v-show="remittanceTwo">{{remittanceTwo}}</option>
                                        <option selected="selected" v-show="remittanceOne">{{remittanceOne}}</option>
                                        <option v-for="optionsNumber in number" :value="optionsNumber">{{optionsNumber}}
                                        </option>
                                    </select>
                                    <span>号为结账时间</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--从另外页面跳转到供应商的页面  默认优先显示资质审核-->
        </div>
        <!--第一部分的上一步按钮-->
        <div class="row supplierinfoEdit_basic_warp">
            <div class="col-xs-3 col-xs-offset-5">
                <!--基础信息按钮组 管理员-->
                <div v-show="isAdmin==1&&supplierDisplayStatue&&routeSupplier!=2&&routeSupplier!=3&&routeSupplier!=4"
                     class="supplierinfo_button">
                    <el-button type="info" @click="supplierReturn" v-show="supplierDisplayOne" >返回上一级</el-button>
                    <el-button v-show="supplierDisplayOne" type="info" @click="supplierAduit(1)" >编辑</el-button>
                    <el-button v-show="supplierDisplayTwo" type="info" @click="supplierAduit(0)" >取消</el-button>
                    <el-button v-show="supplierDisplayThree" type="info" @click="save(1)">保存</el-button>

                </div>
                <!--合同信息按钮组 管理员-->
                <div v-show="isAdmin==1&&bargainDisplayStatue&&routeSupplier!=2&&routeSupplier!=3&&routeSupplier!=4">
                    <el-button type="info" @click="supplierReturn" v-show="bargainDisplayOne">返回上一级</el-button>
                    <el-button v-show="bargainDisplayOne" type="info" @click="supplierAduit(3)" style="width:102px">编 辑</el-button>
                    <el-button v-show="bargainDisplayTwo" type="info" @click="supplierAduit(4)">取 消</el-button>
                    <el-button v-show="bargainDisplayThree" type="info" @click="save(2)">保存</el-button>
                </div>

            </div>
        </div>
        <div class="row supplierinfoEdit_top supplierinfoEdit_basic_warp" v-show="two">
            <div class="col-xs-2 col-xs-offset-4">
            </div>
            <!--第二部分的按钮-->
            <div class="col-xs-2 col-xs-offset-1">
            </div>
        </div>
        <br>
        <br>
        <!--资质审核 状态为未发起审核状态-->
        <div v-show="aptitudeCheck&&supplierList.qualificationStatus==0" class="audit">
            <div class="row">
                <!--开户银行许可证-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationBank">
                        <label><img src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListFive"
                            :before-upload="beforeAvatarUploadBank"
                            :on-preview="testBank"
                            :on-success="uploadSuccessBank"
                            :on-remove="removeFileBank">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <!--营业执照-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationBusiness">
                        <label><img src="../../../static/img/20170801162143.png">营业执照:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListTwo"
                            :before-upload="beforeAvatarUploadBusiness"
                            :on-preview="testBusiness"
                            :on-success="uploadSuccessBusiness"
                            :on-remove="removeFileBusiness">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>

                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <!--授权报告-->
                <div class="col-xs-6 ">
                    <div class="col-xs-6" v-model="qualificationAccredit">
                        <label style="position: relative;left:42px;">授权报告:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :before-upload="beforeAvatarUploadAccredit"
                            :on-preview="testAccredit"
                            :on-success="uploadSuccessAccredit"
                            :on-remove="removeFileAccredit">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                    </div>
                </div>
                <!--质检报告-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationQuality">
                        <label>质检报告:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :before-upload="beforeAvatarUploadPic"
                            :on-preview="testPic"
                            :on-success="uploadSuccessPic"
                            :on-remove="removeFilePic">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <!--食品流通许可证-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationFood">
                        <label>食品流通许可证:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListFour"
                            :before-upload="beforeAvatarUploadFood"
                            :on-preview="testFood"
                            :on-success="uploadSuccessFood"
                            :on-remove="removeFileFood">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <!--资质审核 状态为未发起审核状态所显示的按钮-->
            <div class="row">
                <div class="col-xs-3 col-xs-offset-5">
                    <el-button type="info" @click="presentAudit">提交审核</el-button>
                </div>
            </div>
        </div>
        <!--资质审核 状态为待审核状态-->
        <div v-show="aptitudeCheck&&supplierList.qualificationStatus==1" class="supplier_status supplierinfoEdit_pic">
            <div class="row supplierinfoEdit_basic_warp">
                <!--开户银行许可证-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="position: relative;left:-10%;"><img
                        src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.4%">
                    <el-upload
                        :disabled="true"
                        action=""
                        accept=".jpg,png,gif"
                        list-type="picture-card"
                        :file-list="fileListFive"
                        :on-preview="testBankTwo">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleTwo" size="tiny">
                        <img width="100%" :src="dialogImageUrlTwo" alt="">
                    </el-dialog>
                </div>
                <!--营业执照-->
                <div class="col-xs-5">
                    <label style="left:-1%;" class="col-xs-7 control-label"><img src="../../../static/img/20170801162143.png">营业执照:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListTwo"
                        :on-preview="testBusinessTwo">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleTwo" size="tiny">
                        <img width="100%" :src="dialogImageUrlTwo" alt="">
                    </el-dialog>
                </div>
            </div>
            <br>
            <br>
            <div class="row supplierinfoEdit_basic_warp">
                <!--授权报告-->
                <div v-show="fileListThree.length>0">
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-3%;">授权报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :on-preview="testAccreditTwo">
                        </el-upload>
                    </div>
                </div>
                <!--质检报告-->
                <div v-show="fileListPic.length>0">
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-1%;">质检报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.5%">
                        <el-upload
                            :disabled="true"
                            action=""
                            accept=".jpg,png,gif"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :on-preview="testPicTwo">
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row supplierinfoEdit_basic_warp" v-show="fileListFour.length>0">
                <!--食品流通许可证-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="left:-10%;">食品流通许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListFour"
                        :on-preview="testFoodTwo">
                    </el-upload>
                </div>
            </div>
            <br>
            <br>
            <!--资质审核 状态为待审核状态所显示的按钮-->
            <div class="row supplierinfoEdit_basic_warp">
                <div class="col-xs-3 col-xs-offset-5">
                    <el-button type="info">审核中</el-button>
                </div>
            </div>
        </div>
        <!--资质审核 状态为通过状态-->
        <div v-show="aptitudeCheck&&supplierList.qualificationStatus==2&&supplierListStatus==false"
             class="supplier_status supplierinfoEdit_pic">
            <div class="row supplierinfoEdit_basic_warp">
                <!--开户银行许可证-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="position: relative;left:-10%;"><img
                        src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.8%">
                    <el-upload
                        :disabled="true"
                        action=""
                        :on-preview="testBankThree"
                        accept=".jpg,png,gif"
                        list-type="picture-card"
                        :file-list="fileListFive">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisibleThree" size="tiny">
                        <img width="100%" :src="dialogImageUrlThree" alt="">
                    </el-dialog>
                </div>
                <!--营业执照-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="left:-1%;"><img
                        src="../../../static/img/20170801162143.png">营业执照:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListTwo"
                        :on-preview="testBusinessThree">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div v-show="fileListThree.length>0">
                    <!--授权报告-->
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style=";left:-3%;">授权报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :on-preview="testAccreditThree">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <div v-show="fileListPic.length>0">
                    <!--质检报告-->
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-1%;">质检报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.5%">
                        <el-upload
                            :disabled="true"
                            action=""
                            accept=".jpg,png,gif"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :on-preview="testPicThree">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div v-show="fileListFour.length>0">
                    <!--食品流通许可证-->
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-10%;">食品流通许可证:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListFour"
                            :on-preview="testFoodThree">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row clearMargin">
                <div class="col-xs-3 col-xs-offset-5">
                    <h4>审核已通过</h4>
                </div>
            </div>
            <br>
            <!--资质审核 状态为审核已通过状态所显示的按钮-->
            <div class="row clearMargin" v-show="againUpload">
                <div class="col-xs-3 col-xs-offset-5">
                    <el-button type="info" v-has:supplierInfoEdit_supplierHeader3AgainAdd @click="supplierSubmit(1)">重新提交</el-button>
                </div>
            </div>
        </div>
        <!--资质审核 状态为未通过状态-->
        <div v-show="aptitudeCheck&&supplierList.qualificationStatus==3&&supplierListStatus==false"
             class="supplier_status supplierinfoEdit_pic">
            <div class="row supplierinfoEdit_basic_warp">
                <!--开户银行许可证-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="position: relative;left:-10%;"><img
                        src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.8%">
                    <el-upload
                        :disabled="true"
                        action=""
                        accept=".jpg,png,gif"
                        list-type="picture-card"
                        :on-preview="testBankFour"
                        :file-list="fileListFive">
                    </el-upload>
                    <el-dialog v-model="dialogVisibleFour" size="tiny">
                        <img width="100%" :src="dialogImageUrlFour" alt="">
                    </el-dialog>
                </div>
                <!--营业执照-->
                <div class="col-xs-5">
                    <label class="col-xs-7 control-label" style="left:-1%;"><img
                        src="../../../static/img/20170801162143.png">营业执照:</label>
                </div>
                <div class="col-xs-5" style="margin-left:-34.7%">
                    <el-upload
                        :disabled="true"
                        action=""
                        list-type="picture-card"
                        :file-list="fileListTwo"
                        :on-preview="testBusinessFour">
                    </el-upload>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div v-show="fileListThree.length>0">
                    <!--授权报告-->
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-3%;">授权报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :on-preview="testAccreditFour">
                        </el-upload>
                    </div>
                </div>
                <div v-show="fileListPic.length>0">
                    <!--质检报告-->
                    <div class="col-xs-5">
                        <label class="col-xs-7 control-label" style="left:-1%;">质检报告:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-34.5%">
                        <el-upload
                            :disabled="true"
                            action=""
                            accept=".jpg,png,gif"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :on-preview="testPicFour"
                        >
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row clearMargin">
                <div v-show="fileListFour.length>0">
                    <!--食品流通许可证-->
                    <div class="col-xs-3">
                        <label class="col-xs-6 control-label" style="left:-14%;">食品流通许可证:</label>
                    </div>
                    <div class="col-xs-5" style="margin-left:-17.7%">
                        <el-upload
                            :disabled="true"
                            action=""
                            list-type="picture-card"
                            :file-list="fileListFour"
                            :on-preview="testFoodFour">
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div class="col-xs-3 col-xs-offset-5">
                    <h4>审核未通过</h4>
                </div>
            </div>
            <div class="supplierInfoEdit_reason">
                <div>{{supplierList.reason}}</div>
            </div>
            <br>
            <!--资质审核 状态为未通过状态所显示的按钮-->
            <div class="row" v-show="againUpload">
                <div class="col-xs-3 col-xs-offset-5">
                    <el-button type="info" v-has:supplierInfoEdit_supplierHeader3AgainAdd @click="supplierSubmit(2)">重新提交</el-button>
                </div>
            </div>
        </div>
        <!--资质审核 状态为二次审核状态-->
        <div v-show="aptitudeCheck&&supplierListStatus==true" class="audit" >
            <div class="row supplierinfoEdit_basic_warp">
                <!--开户银行许可证-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationBank">
                        <label><img src="../../../static/img/20170801162143.png">开户银行许可证:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListFive"
                            :before-upload="beforeAvatarUploadBank"
                            :on-preview="testBankFive"
                            :on-success="uploadSuccessBank"
                            :on-remove="removeFileBank">
                            <!--<i class="el-icon-plus"></i>-->
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                        <el-dialog v-model="dialogVisibleFive" size="tiny">
                            <img width="100%" :src="dialogImageUrlFive" alt="">
                        </el-dialog>
                    </div>
                </div>
                <!--营业执照-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationBusiness">
                        <label><img src="../../../static/img/20170801162143.png">营业执照:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListTwo"
                            :before-upload="beforeAvatarUploadBusiness"
                            :on-preview="testBusinessFive"
                            :on-success="uploadSuccessBusiness"
                            :on-remove="removeFileBusiness">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                        <el-dialog v-model="dialogVisibleFive" size="tiny">
                            <img width="100%" :src="dialogImageUrlFive" alt="">
                        </el-dialog>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row supplierinfoEdit_basic_warp">
                <!--授权报告-->
                <div class="col-xs-6 ">
                    <div class="col-xs-6" v-model="qualificationAccredit">
                        <label style="position: relative;left:42px;">授权报告:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListThree"
                            :before-upload="beforeAvatarUploadAccredit"
                            :on-preview="testAccreditFive"
                            :on-success="uploadSuccessAccredit"
                            :on-remove="removeFileAccredit">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                        <el-dialog v-model="dialogVisibleFive" size="tiny">
                            <img width="100%" :src="dialogImageUrlFive" alt="">
                        </el-dialog>
                    </div>
                </div>
                <!--质检报告-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationQuality">
                        <label>质检报告:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListPic"
                            :before-upload="beforeAvatarUploadPic"
                            :on-preview="testPicFive"
                            :on-success="uploadSuccessPic"
                            :on-remove="removeFilePic">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="row supplierinfoEdit_basic_warp">
                <!--食品流通许可证-->
                <div class="col-xs-6">
                    <div class="col-xs-6" v-model="qualificationFood">
                        <label>食品流通许可证:</label>
                    </div>
                    <div class="col-xs-8">
                        <el-upload
                            :action="baseUrl+'/account/qualification/upload'"
                            list-type="picture-card"
                            :file-list="fileListFour"
                            :before-upload="beforeAvatarUploadFood"
                            :on-preview="testFoodFive"
                            :on-success="uploadSuccessFood"
                            :on-remove="removeFileFood">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <!--资质审核状态为二次审核状态所显示的按钮-->
            <div class="row clearMargin">
                <div class="col-xs-1 col-xs-offset-5">
                    <el-button type="info" @click="abolish()" style="width:88px;">取消</el-button>
                </div>
                <div class="col-xs-3">
                    <el-button type="info" @click="againPresent()" v-has:supplierHeader3AgainAdd_supplierHeader3submit>提交审核</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueResource from 'vue-resource';
    import breadCrumb from '../../components/Breadcrumb';
    import api from '../../api/account';
    import dateConvert from '../../dateConvert';
    import parse from 'date-fns/parse';
    import {format} from 'date-fns';
    import {zh_cn} from 'date-fns/locale/zh_cn';
    import '../../../static/css/AdimnsupplierinfoEdit.css';
    import {mapGetters} from 'vuex';
    import adminEdit from '../../utils/adminInfoEdit.js';
    export default {
        data() {
            return {
                baseUrl:'',     //用于存放上传数据的URL
                supplierListStatus: false,//控制二次审核状态的显示
                dialogVisibleModel: false, //控制模态框的显示
                supplierUpload: false,
                againUpload: true,
                isAdmin: '',     //用户登录的权限
                bargainDisplayStatue: false, //合同信息按钮组
                supplierDisplayStatue: true, //基础信息按钮组
                aptitudeCheck: false,//资质审核
                bargainDisplayOne: true, //合同信息按钮组
                bargainDisplayTwo: false,
                bargainDisplayThree: false,
                supplierDisplay: true, //控制基础信息的状态
                supplierStatue: true,//控制合同信息的状态
                supplierDisplayOne: true,
                supplierDisplayTwo: false,
                supplierDisplayThree: false,
                dialogVisible: false,
                dialogImageUrl: '',
                dialogVisibleTwo: false,
                dialogImageUrlTwo: '',
                dialogVisibleThree: false,
                dialogImageUrlThree: '',
                dialogVisibleFour: false,
                dialogImageUrlFour: '',
                dialogVisibleFive: false,
                dialogImageUrlFive: '',
                supplierList: {//供应商获得资质信息的列表
                },
                remittanceShow: true,
                remittanceOne: '',
                remittanceTwo: '',
                number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
                token: '',
                save_model: false,
                bankNames: [],
                industries: [],
                banks: [],
                registerProvinces: [],
                registerCities: [],
                registerDistricts: [],
                contactRegisterProvinces: [],
                contactRegisterCities: [],
                contactRegisterDistricts: [],
                userInfo: {},
                fileList: [],
                one: true,
                two: false,
                three: false,
                routeSupplier: null,
                supplierListAll: [], //保存供应商片段
                fileListPic: [],  //质检报告
                fileListTwo: [],   //营业执照
                fileListThree: [], //授权报告
                fileListFour: [],  //食品流通许可证
                fileListFive: [],  //开户银行许可证
                qualificationBank: 1,    //开户银行许可证
                qualificationBusiness: 2, //营业执照
                qualificationAccredit: 3,    //授权报告
                qualificationQuality: 4,  //质检报告
                qualificationFood: 5,        //食品流通许可证
                obj: { blobName: null },
                contractOriginalName: '',  //合同云端名称（fileName）
                contractOriginal: '',       //合同云端地址（fileUrl）
                accountId: '',               //供应商ID
                commodityId: '',
                adminFlag: 1,    //刘述添加   跳转到管理员里面的供应商管理下面的供应商列表下面的单个供应商的info页面
                newSupplier:{},         //用于提交供应商审核的对象
            };
        },
        created: function () {
            this.baseUrl = this.$globalData.baseUrl;
            this.commodityId = this.$route.query.commodityId;
            this.accountId = this.$route.query.accountId     //路由解析的Id
            this.routeSupplier = this.$route.query.routeSupplier
            this.getSupplierStatus()
            this.getIndustries();
            this.getBankNames();
            this.token = JSON.parse(sessionStorage.getItem('vuex')).user.token;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            //获取供应商资质信息
            this.getSupplierAptitudeStatus()
            //根据状态进行标签页切换
            this.toggleStatus()
        },
        methods: {
            //提交审核
            abolish() {
                this.supplierListStatus = false;         //将当前页面显示，返回上一级
                this.clearPic();
                this.getSupplierAptitudeStatus()
            },
            //返回跳转供应商列表
            supplierReturn() {
                /*
               *修改flag标记为true,在第一个从vuex里面获取搜索条件，搜索一次，重置为false,然后清空vuex条件；
               */
                this.$store.dispatch('setFlag', true);

                this.$router.push('/supplierInfoList');
            },
            //根据状态进行标签页切换
            toggleStatus() {
                if (this.routeSupplier == 1 || this.routeSupplier == 2 || this.routeSupplier == 3 || this.routeSupplier == 4||this.routeSupplier==5) {
                    this.three = true;
                    this.two = false;
                    this.one = false;
                    this.aptitudeCheck = true;
                }
            },
            //提交审核
            presentAudit() {
                if (this.fileListFive.length <= 0) {
                    this.$alert('开户银行许可证不能为空');
                    return;
                }
                if (this.fileListTwo.length <= 0) {
                    this.$alert('营业执照不能为空');
                    return;
                }
                //用于保存提交审核的对象
                this.saveAudit();
                let that = this;
                api.submitAptitude(this.newSupplier)
                    .then(function (res) {
                        if (res.data.code == 1) {
                            that.$alert(res.data.message)
                            //清空审核本地图片
                            that.clearPic();
                            that.getSupplierAptitudeStatus()
                            that.supplierListStatus = false
                        } else {
                            that.$alert(res.data.message)
                        }
                    })
            },
            //用于提交审核保存的对象
            saveAudit(){
                this.newSupplier = {
                    accountId: this.$route.query.accountId,
                    imgs: [{
                        qualificationType: this.qualificationBank,
                        list: this.fileListFive
                    },
                        {
                            qualificationType: this.qualificationQuality,
                            list: this.fileListPic
                        },
                        {
                            qualificationType: this.qualificationBusiness,
                            list: this.fileListTwo
                        },
                        {
                            qualificationType: this.qualificationAccredit,
                            list: this.fileListThree
                        },
                        {
                            qualificationType: this.qualificationFood,
                            list: this.fileListFour
                        }
                    ]
                }
            },
            //清空审核本地图片
            clearPic(){
                this.fileListFive=adminEdit.clearPic(this.fileListFive);
                this.fileListPic=adminEdit.clearPic(this.fileListPic);
                this.fileListTwo=adminEdit.clearPic(this.fileListTwo);
                this.fileListThree=adminEdit.clearPic(this.fileListThree);
                this.fileListFour=adminEdit.clearPic(this.fileListFour);
            },
            //二次提交审核
            againPresent() {
                this.presentAudit()
            },
            //获取供应商资质信息
            getSupplierAptitudeStatus() {
                let that = this
                api.getSupplierAptitudeStatus(that.accountId)
                    .then(function (res) {
                        if (res.data.code == 1) {
                            if (res.data.data.qualificationStatus == 0) {
                                that.supplierList = res.data.data;
                                //待审核成功后 将隐藏的状态置为显示
                                that.picBlock();
                            } else {
                                that.supplierList = res.data.data[0]
                                //对未通过原因进行数据处理
                                that.supplierList.reason = '原因:' + that.supplierList.reason;
                                that.supplierListAll = res.data.data
                                //根据供应商不同的状态显示不同的本地图片
                                that.showPic();
                            }
                        } else {
                            that.$alert(res.data.message)
                        }
                    })
            },
            //待审核成功后 将隐藏的状态置为显示
            picBlock(){
                let li = document.getElementsByClassName('el-upload');
                adminEdit.picBlock(li);
            },
            //根据供应商不同的状态显示不同的本地图片
            showPic(){
                adminEdit.showPic(this.supplierListAll,this.fileListFive,this.fileListTwo,this.fileListThree,this.fileListPic,this.fileListFour);
            },
            //获取供应商参数
            getSupplierStatus() {
                let that = this;
                axios.all([api.getUserAccount({ 'id': that.$route.query.accountId }), api.getAreaList()])
                    .then(axios.spread(function (acct, perms) {
                        that.userInfo = acct.data;
                        that.userInfo.remittanceType = parseFloat(acct.data.remittanceType);
                        that.userInfo.remittanced = parseFloat(acct.data.remittanced);
                        that.userInfo.remittanceType == 1?that.remittanceOne = that.userInfo.remittanced:that.remittanceTwo = that.userInfo.remittanced;
                        that.obj.blobName = that.userInfo.contractOriginalName;
                        that.registerProvinces = perms.data;
                        //发送请求，获取二级三级地方名字
                        that.getOtherCity();
                    }));
            },
            //发送请求，获取二级三级地方名字
            getOtherCity(){
                let that = this;
                if (that.registerCities && that.registerCities.length === 0) {
                    that.getCity(that.userInfo.registAddressProvince, 1);
                }
                if (that.registerDistricts && that.registerDistricts.length === 0) {
                    api.getAreaList({ 'pid': that.userInfo.registAddressCity }).then(res => {
                        that.registerDistricts = res.data;
                    });
                }
            },
            //下载附件
            exportFile() {
                let contractOriginal = this.userInfo.contractOriginal;
                let contractOriginalName = encodeURI(this.userInfo.contractName);
                window.location.href = this.baseUrl+'/account/downloadContract?downloadUrl=' + contractOriginal + '&realFileName=' + contractOriginalName
                    + '&token=' + this.token
            },
            //查看附件
            lookFile() {
                window.open(this.userInfo.contractOriginal, 'newwindow', 'height=800, width=1000,top=200,left=400,resizable=yes');
            },
            //状态切换
            supplierStart(type) {
                if (type == 1) {
                    this.userInfo.status = type;
                } else if (type == 0) {
                    this.userInfo.status = type;
                }
            },
            //控制标题的显隐藏
            supplierHeader(type) {
                //type 1  2   3  代表管理员标签页切换
                switch(type){
                    case 1:
                        this.one = true;
                        this.supplierDisplayStatue = true;
                        !this.supplierDisplay? this.supplierDisplay = false: this.supplierDisplay = true;
                        this.baseHeader(1);
                        break;
                    case 2:
                        this.two = true;
                        this.bargainDisplayStatue = true;
                        this.baseHeader(2);
                        break;
                    case 3:
                        this.three = true;
                        this.aptitudeCheck = true;
                        this.baseHeader(3);
                        break;
                }
            },
            //标签页基础信息保存状态
            baseHeader(type){
                switch (type){
                    case 1:
                        this.two = false;
                        this.three = false;
                        this.aptitudeCheck = false;
                        this.bargainDisplayStatue = false;
                        break;
                    case 2:
                        this.one = false;
                        this.three = false;
                        this.aptitudeCheck = false;
                        this.supplierDisplayStatue = false;
                        break;
                    case 3:
                        this.one = false;
                        this.two = false;
                        this.bargainDisplayStatue = false;
                        this.supplierDisplayStatue = false;
                        break;
                }
            },
            //合同信息 基础信息（编辑 保存按钮）
            supplierAduit(type) {
                //1:基础信息编辑  0：基础信息取消 3：合同信息编辑 4：合同信息取消
                switch(type){
                    case 1:
                        this.baseMessage();
                        break;
                    case 0:
                        this.baseMessage();
                        this.messageList();
                        this.registerCities = [];
                        this.registerDistricts = [];
                        this.getSupplierStatus();
                        break;
                    case 3:
                        this.bargainMessage();
                        break;
                    case 4:
                        this.bargainMessage();
                        this.messageList();
                        this.getSupplierStatus();
                        break;
                }
            },
            //基础信息显隐藏
            baseMessage(){
                this.supplierDisplay = !this.supplierDisplay;
                this.supplierDisplayOne = !this.supplierDisplayOne;
                this.supplierDisplayTwo = !this.supplierDisplayTwo;
                this.supplierDisplayThree = !this.supplierDisplayThree;
            },
            //合同信息显隐藏
            bargainMessage(){
                this.bargainDisplayOne = !this.bargainDisplayOne;
                this.bargainDisplayTwo = !this.bargainDisplayTwo;
                this.bargainDisplayThree = !this.bargainDisplayThree;
                this.supplierStatue = !this.supplierStatue;
            },
            messageList(){
                //清除点击上传图片的个数
                if (this.fileList.length > 0) {
                    this.fileList.length--;
                }
                let ul = document.getElementsByClassName('el-upload-list')[0];
                if (ul) {
                    ul.style.display = 'none';
                }
            },
            //删除照片
            deletePic(file, fileListPic){
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileListPic.forEach((v, i) => {
                    if (removedUrl == v.url) {
                        this.fileListPic.splice(i, 1);
                    }
                });
            },
            //质检报告 542-566
            removeFilePic(file, fileListPic) {
                //删除照片
                this.deletePic(file, fileListPic)
//                if (!file) {
//                    return;
//                }
//                let removedUrl = file.url;
//                this.fileListPic.forEach((v, i) => {
//                    if (removedUrl == v.url) {
//                        this.fileListPic.splice(i, 1);
//                    }
//                });
            },

            testPic(file, fileListPic) {
//                this.picLook(file,this.dialogImageUrl,this.dialogVisible);
                this.dialogImageUrl=adminEdit.picLookDialogImageUrl(file,this.dialogImageUrl);
                console.log(this.dialogImageUrl)
                this.dialogVisible = adminEdit.picLookDialogVisible(file,this.dialogVisible);
//                this.dialogImageUrl = file.url;
//                this.dialogVisible = true;
            },
            testPicTwo(file, fileListPic) {
                this.dialogImageUrlTwo = file.url;
                this.dialogVisibleTwo = true;
            },
            testPicThree(file, fileListPic) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            testPicFour(file, fileListPic) {
                this.dialogImageUrlFour = file.url;
                this.dialogVisibleFour = true;
            },
            testPicFive(file, fileListPic) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive = true;
            },
            beforeAvatarUploadPic(file) {
                if (this.fileListPic && this.fileListPic.length > 2) {
                    this.$message.error('文件只能上传3次')
                    return false
                }
                let extension = file.name.split('.')[1] === 'jpg'
                let extension2 = file.name.split('.')[1] === 'jpeg'
                let extension3 = file.name.split('.')[1] === 'png'
                if (!extension && !extension2 && !extension3) {
                    this.$alert('上传模板只能是 jpg、jpeg、png格式!')
                    return false
                }
            },
            uploadSuccessPic(response, file, fileListPic) {
                this.fileListPic.push(file.response.data)
            },

            //营业执照 570-593
            removeFileBusiness(file, fileListTwo) {
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileListTwo.forEach((v, i) => {
                    if (removedUrl == v.url) {
                        this.fileListTwo.splice(i, 1);
                    }
                });
            },
            testBusiness(file, fileListTwo) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            testBusinessTwo(file, fileListTwo) {
                this.dialogImageUrlTwo = file.url;
                this.dialogVisibleTwo = true;
            },
            testBusinessThree(file, fileListTwo) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            testBusinessFour(file, fileListTwo) {
                this.dialogImageUrlFour = file.url;
                this.dialogVisibleFour = true;
            },
            testBusinessFive(file, fileListTwo) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive = true;
            },
            beforeAvatarUploadBusiness(file) {
                if (this.fileListTwo && this.fileListTwo.length > 2) {
                    this.$message.error('文件只能上传3次')
                    return false
                }
                let extension = file.name.split('.')[1] === 'jpg'
                let extension2 = file.name.split('.')[1] === 'jpeg'
                let extension3 = file.name.split('.')[1] === 'png'
                if (!extension && !extension2 && !extension3) {
                    this.$alert('上传模板只能是 jpg、jpeg、png格式!')
                    return false
                }
            },
            uploadSuccessBusiness(response, file, fileListTwo) {
                this.fileListTwo.push(file.response.data)
            },

            //授权报告601-623
            removeFileAccredit(file, fileListThree) {
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileListThree.forEach((v, i) => {
                    if (removedUrl == v.url) {
                        this.fileListThree.splice(i, 1);
                    }
                });
            },
            testAccredit(file, fileListThree) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            testAccreditTwo(file, fileListThree) {
                this.dialogImageUrlTwo = file.url;
                this.dialogVisibleTwo = true;
            },
            testAccreditThree(file, fileListThree) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            testAccreditFour(file, fileListThree) {
                this.dialogImageUrlFour = file.url;
                this.dialogVisibleFour = true;
            },
            testAccreditFive(file, fileListThree) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive = true;
            },
            beforeAvatarUploadAccredit(file) {
                if (this.fileListThree && this.fileListThree.length > 2) {
                    this.$message.error('文件只能上传3次')
                    return false
                }
                let extension = file.name.split('.')[1] === 'jpg'
                let extension2 = file.name.split('.')[1] === 'jpeg'
                let extension3 = file.name.split('.')[1] === 'png'
                if (!extension && !extension2 && !extension3) {
                    this.$alert('上传模板只能是 jpg、jpeg、png格式!')
                    return false
                }
            },
            uploadSuccessAccredit(response, file, fileListThree) {
                this.fileListThree.push(file.response.data)
            },
            //食品流通许可证 626 -650
            removeFileFood(file, fileListFour) {
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileListFour.forEach((v, i) => {
                    if (removedUrl == v.url) {
                        this.fileListFour.splice(i, 1);
                    }
                });
            },
            testFood(file, fileListFour) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            testFoodTwo(file, fileListFour) {
                this.dialogImageUrlTwo = file.url;
                this.dialogVisibleTwo = true;
            },
            testFoodThree(file, fileListFour) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            testFoodFour(file, fileListFour) {
                this.dialogImageUrlFour = file.url;
                this.dialogVisibleFour = true;
            },
            testFoodFive(file, fileListFour) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive = true;
            },
            beforeAvatarUploadFood(file) {
                if (this.fileListFour && this.fileListFour.length > 2) {
                    this.$message.error('文件只能上传3次')
                    return false
                }
                let extension = file.name.split('.')[1] === 'jpg'
                let extension2 = file.name.split('.')[1] === 'jpeg'
                let extension3 = file.name.split('.')[1] === 'png'
                if (!extension && !extension2 && !extension3) {
                    this.$alert('上传模板只能是 jpg、jpeg、png格式!')
                    return false
                }
            },
            uploadSuccessFood(response, file, fileListFour) {
                this.fileListFour.push(file.response.data)
            },
            //开户银行许可证
            removeFileBank(file, fileListFive) {
                if (!file) {
                    return;
                }
                let removedUrl = file.url;
                this.fileListFive.forEach((v, i) => {
                    if (removedUrl === v.url) {
                        this.fileListFive.splice(i, 1);
                    }
                });
            },
            testBank(file, fileListFive) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            testBankTwo(file, fileListFive) {
                this.dialogImageUrlTwo = file.url;
                this.dialogVisibleTwo = true;
            },
            testBankThree(file, fileListFive) {
                this.dialogImageUrlThree = file.url;
                this.dialogVisibleThree = true;
            },
            testBankFour(file, fileListFive) {
                this.dialogImageUrlFour = file.url;
                this.dialogVisibleFour = true;
            },
            testBankFive(file, fileListFive) {
                this.dialogImageUrlFive = file.url;
                this.dialogVisibleFive = true;
            },
            beforeAvatarUploadBank(file) {
                if (this.fileListFive && this.fileListFive.length > 2) {
                    this.$message.error('文件只能上传3次')
                    return false
                }
                let extension = file.name.split('.')[1] === 'jpg'
                let extension2 = file.name.split('.')[1] === 'jpeg'
                let extension3 = file.name.split('.')[1] === 'png'
                if (!extension && !extension2 && !extension3) {
                    this.$alert('上传模板只能是 jpg、jpeg、png格式!')
                    return false
                }
            },
            uploadSuccessBank(response, file, fileListFive) {
                this.fileListFive.push(file.response.data)
            },
            editTime() {
                let contractCreateDate = new Date().getTime();
                let contractEndDate = new Date(this.userInfo.contractEndDate).getTime();
                let betweenDate = contractEndDate - contractCreateDate;
                if (betweenDate > (30 * 86400000)) {
                    this.userInfo.contractStatus = 0;
                    return;
                }
                if (betweenDate <= (30 * 86400000) && betweenDate >= 0) {
                    this.userInfo.contractStatus = 1;
                    return;
                }
                if (this.userInfo.contractStatus === 2 && betweenDate < 0) {
                    this.userInfo.contractStatus == 2;
                    return;
                }
                if (this.userInfo.contractStatus !== 2 && betweenDate < 0) {
                    this.$alert('合同有效期终止时间不能小于本地当地时间');
                    this.userInfo.contractStatus = 0;
                    this.userInfo.contractEndDate = '';
                    return;
                }
                if (this.userInfo.contractCreateDate) {
                    this.userInfo.contractCreateDate = this.formateContractCreateDate;
                }
                if (this.userInfo.contractEndDate) {
                    this.userInfo.contractEndDate = this.formateContractEndDate;
                }
            },
            //查看合同详情
            test(file) {
                window.open(file.response.data.fileUrl, 'newwindow', 'height=800, width=1000,top=200,left=400,resizable=yes');
            },
            //上传文件start
            uploadSuccess(response, file, fileList) {
                this.userInfo.contractOriginalName = response.data.fileName;
                this.userInfo.contractOriginal = response.data.fileUrl;
                this.obj.blobName = this.userInfo.contractOriginalName;
                this.userInfo.contractName = response.data.originalFileName;
                this.fileList.push(file);
            },
            //删除文件
            removeFile(file, fileList) {
                if (file) {
                    this.userInfo.contractOriginalName = '';
                    this.userInfo.contractOriginal = '';
                    this.fileList.length--;
                }
            },
            //限制上传图片大小/
            beforeAvatarUpload(file) {
                let ul = document.getElementsByClassName('el-upload-list')[0]
                if (ul) {
                    ul.style.display = 'block'
                }
                if (this.fileList && this.fileList.length == 1) {
                    this.$message.error('文件只能上传一次!');
                    return false;
                }
                let suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
                if ('pdf' !== suffix) {
                    this.$alert('您上传的格式有误');
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 20;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 20MB!');
                }
                return isLt2M;
            },
            inProgress(event, file, fileList) {
                /*this.$alert('文件正在上传中')*/
            },
            uploadError(err, file, fileList) {
                this.$alert('文件上传失败');
            },
            //获取银行类别
            getBankNames: function () {
                api.getBanks()
                    .then(
                        (response) => {
                            this.bankNames = response.data;
                        }
                    );
            },
            //保存所有供应商信息
            save: function (type) {
                let _this = this;
                let bankNum = /^\d{1,30}$/;
                if (this.userInfo.remittanceType == 1) {
                    this.userInfo.remittanced = this.remittanceOne;
                    this.remittanceTwo = '';
                } else {
                    this.userInfo.remittanced = this.remittanceTwo;
                    this.remittanceOne = '';
                }
                if (this.userInfo) {
                    if (this.userInfo.licenseTimeCreate) {
                        this.userInfo.licenseTimeCreate = this.formateLicenseTimeCreate;
                    }
                    if (this.userInfo.licenseTimeEnd) {
                        this.userInfo.licenseTimeEnd = this.formateLicenseTimeEnd;
                    }
                    if (this.userInfo.contractCreateDate) {
                        this.userInfo.contractCreateDate = this.formateContractCreateDate;
                    }
                    if (this.userInfo.contractEndDate) {
                        this.userInfo.contractEndDate = this.formateContractEndDate;
                    }
                    if (this.userInfo.contractLicenseCreate) {
                        this.userInfo.contractLicenseCreate = this.formateContractLicenseCreate;
                    }
                    if (this.userInfo.contractLicenseEnd) {
                        this.userInfo.contractLicenseEnd = this.formateContractLicenseEnd;
                    }
                }
                let _that = this;
                let isEmpty = false;
                let item2Check = {
                    providerName: '供应商名称',
                    responsible: '法人代表',
                    responsiblePhone: '法人手机号',
                    registAddressProvince: '注册地址',
                    registAddressCity: '注册地址',
                    registAddressDistrict: '注册地址',
                    registerAddressDetail: '注册地址',
                    contractCreateDate: '合同有效期起始时间',
                    contractEndDate: '合同有效期终止时间',
                    bankName: '开户行类型',
                    contractOriginalName: '上传合同',
                    contractOriginal: '合同云端地址',
                    bankNum: '开户行账号',
                    bankUserName: '开户人姓名',
                    remittanced: '回款结算时间',
                };
                let supperlierPhone = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                if (!(supperlierPhone).test(this.userInfo.responsiblePhone)) {
                    this.$alert('请输入正确的手机号码!');
                    return;
                }
                if(this.registerCities.length===0){
                    this.$alert('注册地址不能为空');
                    return;

                }
                if(this.registerDistricts.length===0){
                    this.$alert('注册地址不能为空');
                    return;
                }
                for (let item in item2Check) {
                    if (!_that.userInfo[item]) {
                        this.$alert(item2Check[item] + '不能为空');
                        isEmpty = true;
                        break;
                    }
                }
                if ((this.userInfo.bankNum) && (!bankNum.test(this.userInfo.bankNum))) {
                    this.$alert('您输入的银行卡号有误!请重新输入');
                    this.userInfo.bankNum = '';
                    return;
                }
                if (this.userInfo.licenseTimeEnd && this.userInfo.licenseTimeCreate >= this.userInfo.licenseTimeEnd) {
                    this.$alert('营业执照有效期起始时间不能大于终止时间');
                    return;
                }
                if (this.userInfo.contractEndDate && this.userInfo.contractCreateDate > this.userInfo.contractEndDate) {
                    this.$alert('合同有效期起始时间不能大于终止时间');
                    return;
                }
                if (this.userInfo.contractEndDate && this.userInfo.contractCreateDate == this.userInfo.contractEndDate) {
                    this.$alert('合同有效期起始时间不能等于终止时间');
                    return;
                }
                if (this.userInfo.contractLicenseEnd && this.userInfo.contractLicenseCreate >= this.userInfo.contractLicenseEnd) {
                    this.$alert('营业执照有效期起始时间不能大于终止时间');
                    return;
                }
                if (!/^\d{0,256}$/.test(Number(this.userInfo.remittanced))) {
                    this.$alert('回款结算方式必须为整数字!');
                    return;
                }
                if (isEmpty) {
                    return;
                }
                if (this.userInfo.contractEndDate && this.userInfo.contractCreateDate >= this.userInfo.contractEndDate) {
                    this.$alert('合同有效期起始时间不能大于终止时间');
                    return;
                }
                if (!/^\d{0,256}$/.test(Number(this.userInfo.remittanced))) {
                    this.$alert('回款结算方式必须为整数字!');
                    return;
                }
                let that = this;
                api.submitEditInfo(this.userInfo)
                    .then(function (res) {
                        let result = res.data;
                        if (result.code == 1) {
                            that.getSupplierStatus()
                            if (type == 1) {
                                that.supplierDisplay = !that.supplierDisplay
                                that.supplierDisplayOne = !that.supplierDisplayOne
                                that.supplierDisplayTwo = !that.supplierDisplayTwo
                                that.supplierDisplayThree = !that.supplierDisplayThree
                            }
                            if (type == 2) {
                                that.bargainDisplayOne = !that.bargainDisplayOne
                                that.bargainDisplayTwo = !that.bargainDisplayTwo
                                that.bargainDisplayThree = !that.bargainDisplayThree
                                that.supplierStatue = !that.supplierStatue
                            }
                        } else {
                            _that.$alert(result.message);
                        }
                    });
            }
            ,
            supplierSubmit(type) {
                if (type == 1) {
                    this.supplierListStatus = true;
                } else if (type == 2) {
                    this.supplierListStatus = true;
                }
            },
            //获取省份信息
            getProvince: function () {
                api.getAreaList().then(res => {
                    this.registerProvinces = res.data;
                    this.contactRegisterProvinces = res.data;
                });
            }
            ,
            getCity: function (code, type) { //type:1注册地址,type:2合同注册地址
                if (!code) return;
                this.registerCities = [];
                this.registerDistricts = [];
                api.getAreaList({ 'pid': code }).then(res => {
                    if (type == 1) {
                        this.registerCities = res.data;
                    } else if (type == 2) {
                        this.contactRegisterCities = res.data;
                    }
                });
            },
            //获取行业类别
            getIndustries: function () {
                api.getIndustry().then(res => {
                    this.industries = res.data;
                });
            },
            getArea: function (code, type) { //type:1注册地址,type:2合同注册地址
                if (!code) return;
                this.userInfo.registAddressDistrict = ''
                api.getAreaList({ 'pid': code }).then(res => {
                    if (type == 1) {
                        this.registerDistricts = res.data;
                    } else if (type == 2) {
                        this.contactRegisterDistricts = res.data;
                    }
                });
            },
        },
        filters: {
            toDate: function (timeStamp) {
                return dateConvert.dateConvert(timeStamp);
            }
        },
        computed: {
            headers() {
                let token = this.token;
                return {
                    'Authorization': token
                };
            },
            //面包屑导航
            breadList(){
                return  [{name:' 供应商管理'},
                    {name:'供应商列表',route:'/supplierInfoList'},
                    {name:'供应商详情'}]
            },
            //面包屑导航
            breadListTwo(){
                return[{name:' 供应商管理'},
                    {name:'供应商列表',route:'/supplierInfoList'},
                    {name:'商品列表',route:{path:'/commodityList',query:{'accountId':this.accountId}}},
                    {name:'供应商详情'}]
            },
            //面包屑导航
            breadListThree(){
                return[{name:' 供应商管理'},
                    {name:'供应商列表',route:'/supplierInfoList'},
                    {name:'商品列表',route:{path:'/commodityList',query:{'accountId':this.accountId}}},
                    {name:'商品详情',route:{path:'/commodityInfo',query:{'commodityId':this.commodityId,'adminFlag':this.adminFlag,'accountId':this.accountId}}},
                    {name:'供应商详情'}]
            },
            formateLicenseTimeCreate: function () {
                return format(this.userInfo.licenseTimeCreate, 'YYYY-MM-DD', { locale: zh_cn });
            },
            formateLicenseTimeEnd: function () {
                return format(this.userInfo.licenseTimeEnd, 'YYYY-MM-DD', { locale: zh_cn });
            },
            formateContractCreateDate: function () {
                return format(this.userInfo.contractCreateDate, 'YYYY-MM-DD', { locale: zh_cn });
            },
            formateContractEndDate: function () {
                return format(this.userInfo.contractEndDate, 'YYYY-MM-DD', { locale: zh_cn });
            },
            formateContractLicenseCreate: function () {
                return format(this.userInfo.contractLicenseCreate, 'YYYY-MM-DD', { locale: zh_cn });
            },
            formateContractLicenseEnd: function () {
                return format(this.userInfo.contractLicenseEnd, 'YYYY-MM-DD', { locale: zh_cn });
            }
        },
        components:{
            breadCrumb:breadCrumb,
            brearCrumbTwo:breadCrumb,
            brearCrumbThree:breadCrumb
        }

    };
</script>
