(function(global){
    global.time = function(split) {
        var date = new Date();
        //年
        var year = date.getFullYear();
        //月
        var month = date.getMonth() + 1;
        month = month > 9? month: "0" + month;
        //日
        var day = date.getDate();
        day = day > 9? day: "0" + day;
        //时
        var hour = date.getHours();
        hour = hour > 9? hour: "0" + hour;
        //分
        var minute = date.getMinutes();
        minute = minute > 9? minute: "0" + minute;
        //秒
        var second = date.getSeconds();
        second = second > 9? second: "0" + second;
        return year + split + month + split + day + " " + hour + ":" + minute + ":" + second;
    };
})(this);
