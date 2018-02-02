import Vue from 'vue'
// import moment from 'moment'

// Vue.filter('time', function(value, formatString) {
//   formatString = formatString || 'YYYY-MM-DD HH:mm';
//   return moment(value).format(formatString);
// })


Vue.filter('time', function (value) {//value为13位的时间戳
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var i = time.getMinutes()

    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(i);
});
