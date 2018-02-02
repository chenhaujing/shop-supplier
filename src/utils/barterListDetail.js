export default {

    //table内容赋值 渲染页面
    tableContext(data,sendData){
        sendData[0] = {
            goodsImage: data.goodsImage,
            goodsName: data.goodsName,
            brandName: data.brandName,
            code69: data.code69,
            goodsNumber: data.goodsNumber,
            goodsAttribute: data.goodsAttribute,
            goodsUnitPrice: data.goodsUnitPrice,
            goodsDiscount: data.goodsDiscount,
            goodsTotalPrice: data.goodsTotalPrice,
            returnReason:data.returnReason,
        }
    },
}
