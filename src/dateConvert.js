export default {
	dateConvert(param){
		//根据传入进行判断是时间戳，或者是用户的输入
		if(typeof param == 'number' || typeof param =='string' && /^\d+$/g.test(param)){
			// 传入的是时间戳，转成年月日格式
			var d = new Date(param);
                var year = d.getFullYear();
                var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
                var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                var dateFormat = year + '-' + month + '-' + day;
                return dateFormat;	
		} 
		// 否则是用户输入，转成时间戳；
		return new Date(param).getTime();
	},
	dateRestrict(startTime,endTime){
		if(startTime < endTime) {
			return true;
		}
		return false;
	}
}
