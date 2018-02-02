const getters = {

    pageInfo: state => state.listPageInfo.pageInfo,

    returnFlag: state => state.listPageInfo.returnFlag,
    //记录用户输入的物流信息；
    logiticsInfo: state => state.logisticsInformation.logiticsInfo,
    isRemember: state => state.logisticsInformation.isRemember,

    //permission
    permissionList: state => state.permissions.permissionList,
    menus: state => state.permissions.menus,
    check: state => state.permissions.check(permission),

    //user
    account: state => state.user.account,
    token: token => state.user.token

}
export default getters
