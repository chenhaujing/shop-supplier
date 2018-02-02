<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import '../static/css/index.css'
import globalData from './common/global'

export default {
	data() {
		return{
			getLocationToken: ''
		}

	},
	created () {
		//退出登录时将token移除
		//目前无退出登录，如果已登录过的要测试登录界面，请手动清除缓存token
		// window.localStorage.removeItem('token');
//		this.getLocationToken = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '';

//		this.wacthLogin()
	},
	watch: {
//        '$route': 'wacthLogin'
    },
	methods:{
		//判断是否已经登录
//		wacthLogin() {
//			this.getLocationToken = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '';
//            this.account = JSON.parse(localStorage.getItem("account"));
//			let _path = this.$route.path;
//			let _getLocationToken = this.getLocationToken;
//
//
//			if(_path.indexOf('login') != -1 || _path.indexOf('forgetPassword') != -1 || _path.indexOf('confirmReceipt') != -1){
//				if(_getLocationToken == 'false' || _getLocationToken == ''){
//					return;
//				}else{
//					// alert('您已登录')
//                    if(this.account&&this.account.isAdmin==1){
//                        this.$router.push('/supplierInfoList')
//                    }else if(this.account&&this.account.isAdmin==0){
//                        this.$router.push('/orderList')
//                    }
//				}
//            }else{
//                if(_getLocationToken == 'false' || _getLocationToken == ''){
////					alert('请先登录')
//					this.$router.push('/login')
//				}
//            }
//		},
//		signOut() {
//			window.localStorage.removeItem('token');
//			this.$router.push('/login')
//		},
	},

}
</script>
