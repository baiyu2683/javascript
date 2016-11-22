function getText(url, callback){
    url = url || "http://localhost:9006/test/get1";
    callback = callback || show;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
        //如果请求完成，则它是成功的
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.match(/text|json/)) {
                callback(request.responseText);
            }
        }
    };
    request.send(null);  //立即发送请求
}

function show(msg) {
    console.info(msg);
}
