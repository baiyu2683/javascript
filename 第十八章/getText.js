//发送一个get请求到制定url
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

//发送同步的HTTP get请求
//返回指定的文本，如果请求不成功或响应不是文本就报错
function getTextSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);        //false表示方法是同步的
    request.send(null);  //立即发送请求
    //如果请求不是200 OK，就报错
    if (request.status !== 200) throw new Error(request.statusText);

    //如果是类型错误，就报错
    var type = request.getResponseHeader("Content-Type");
    if(!type.match(/text|json/)) {
        throw new Error("Expected textual or json response; got: " + type);
    }

    return request.responseText;
}


//发起HTTP GET响应以获取指定URL的内容
//当响应到达时，把他以解析后的XML Document对象、解析后的JSON对象
//或字符串的形式传递给回调函数
function get(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.onreadystatechange = function() {
        //如果请求完成
        if(request.readyState === 4 && request.status === 200) {
            //获得响应类型
            var type = request.getResponseHeader("Content-Type");
            //检查类型，这样我们能在将来得到HTML文档
            if(type.indexOf("xml") != -1 && request.responseXML) {
                callback(request.responseXML);
            }
            else if(type === "application/json"){
                callback(JSON.parse(request.responseText));//json响应
            }
            else {
                callback(request.responseText);
            }
        }
    };
    request.send(null);
}
