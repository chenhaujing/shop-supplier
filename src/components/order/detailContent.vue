<template>
    <div>
    <div class="row clearMargin barterListDetail_sendList">
        <!--运费金额 实付金额-->
        <div>
            <span>运费金额</span>
            <el-input :disabled="true" v-model="orderPostage" style="width:100px;margin-left:5px;"></el-input>
            <span style="margin-left:40px;">实付金额</span>
            <el-input :disabled="true" v-model="totalPrice" style="width:100px;margin-left:5px;"></el-input>
        </div>
    </div>
    <!--换货理由-->
    <div class="row clearMargin barterListDetail_sendList">
        <div>
            <span>换货理由</span>
            <el-input  :disabled="true" v-model="barterList.returnReason" style="width:402px;margin-left: 6px;"></el-input>
        </div>
    </div>
        <div class="row clearMargin barterListDetail_sendList">
            <div>
                <span>换货原因</span>
                <el-input  :disabled="true" v-model="barterList.returnRemarks" style="width:402px;margin-left: 6px;"></el-input>
            </div>
        </div>
        <div class="row clearMargin barterListDetail_sendList">
            <div>
                <span>寄回单号</span>
                <el-input  :disabled="true" v-model="barterList.returnLogisticsNumber" style="width:260px;margin-left: 6px;"></el-input>
                <el-button @click="lookLogistics(1)" type="primary" v-has:barListDetail_Look>查看寄回单号</el-button>
                <el-button :disabled="barterList.status!==5" @click="sendLogistics" type="primary" v-has:barListDetail_Send>查看寄出单号</el-button>
            </div>
        </div>
        <!--图片显示-->
        <div class="row clearMargin barterListDetail_sendList" v-show="imagesList.url">
            <div>
                <span>图片展示</span>
                <img :src="item.url" v-for="item in imagesList">
            </div>
        </div>
        <!--按钮组-->
        <div class="row clearMargin barterListDetail_sendList" style="margin-left:40%;">
            <el-button @click="goBack" v-show="showIdentity!=='incomeDetailList'&&showIdentity!=='unSettlementListDetail'&&showIdentity!=='settlementListDetail'&&showIdentity!=='financialManageDetails'">返回上一级</el-button>
            <!--拒绝换货二个-->
            <el-button @click="refuseReceiving"  v-has:barListDetail_NoPass :disabled="barterList.status!==1" v-show="barterList.status!==3&&barterList.status!==4&&barterList.status!==6&&barterList.status!==2&&barterList.status!==5">拒绝换货</el-button>
            <el-button @click="refuseReceivingLook" v-has:barListDetailNoPassReason v-show="barterList.status===3">拒绝换货</el-button>
            <el-button @click="checkPass()" v-show="barterList.status===1||barterList.status===3" :disabled="barterList.status===3" v-has:barListDetail_Pass>审核通过</el-button>
            <el-button  v-show="barterList.status!==1&&barterList.status!==3" @click="openModel()" :disabled="barterList.status!==4" v-has:barListDetailTransform>确认换货</el-button>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/barterListDetail.less';
    export default {
        props:{
            showIdentity:{
                type:String
            },
            orderPostage:{
                type:String
            },
            totalPrice:{
                type:String
            },
            barterList:{
                type:Object
            },
            imagesList:{
                type:Array
            }
        },
        methods:{
            sendLogistics(){
                this.$emit('sendLogistics');
            },
            lookLogistics(){
                this.$emit('lookLogistics',1);
            },
            openModel(){
                this.$emit('openModel')
            },
            //返回上一级
            goBack(){
                this.$emit('goBack');
            },
            //打开模态框
            refuseReceiving(){
                this.$emit('refuseReceiving')
            },
            //打开模态框
            refuseReceivingLook(){
                this.$emit('refuseReceivingLook')
            },
            //审核通过模态框
            checkPass(){
                this.$emit('checkPass')
            }
        }
    }
</script>

