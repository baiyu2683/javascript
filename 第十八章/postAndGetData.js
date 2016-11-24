//使用表单编码数据发送一个post请求
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if(request.readyState === 4 && callback) {
            callback(request);
        }
    };
    //form表单的固定Content-Type
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //将编码的数据发出
    request.send(encodeFormData(data));
}

//使用form表单发起一个get请求
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    url = url + "?" + encodeFormData(data);
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === 4 && callback) {
            callback(request);
        }
    };
    request.send(null);
}
