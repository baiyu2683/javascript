function timedGetText(url, timeout, callback) {
    var request = new XMLHttpRequest();
    var isTimeout = false;
    //启动定时器, 在timeout毫秒后终止请求
    var timer = setTimeout(function() {
        isTimeout = true;
        request.abort();
    },timeout);
    request.opend("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState !== 4) return; //忽略未完成, abort会触发onreadystatechange
        if(isTimeout) return;
        clearTimeout(timer); //取消超时等待
        if(request.status === 200 && callback) {
            callback(request.responseText);
        }
    };
    request.send(null);
}
