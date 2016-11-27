//根据指定的url发送JSONP请求
//然后把解析得到的相应数据传递给回调函数
//在url中调价一个名为jsonp的查询参数，用于指定该请求的回调函数的名字
function getJSONP(url, callback) {
    //为本次请求创建一个唯一的回调函数名称
    var cbnum = "cb" + getJSONP.counter++; //每次自增计数器
    var cbname = "getJSONP."  + cbnum; //作为JSONP函数的属性

    //将回调函数名称以表单编码的形式添加到URL的查询部分中，使用jsonp作为参数名
    //一些支持jsonp的服务可能使用其他的参数名，比如callback
    if(url.indexOf("?") === -1) {
        url += "?jsonp=" + cbname; //作为查询部分添加参数
    } else {
        url += "&jsonp=" + cbname; //作为新的参数添加它
    }

    //创建script元素用于发送请求
    var script = document.createElement("script");

    //定义将被脚本执行的回调函数
    getJSONP[cbnum] = function(response) {
        try {
            callback(response); //处理服务器响应
        }
        finally {
            delete getJSONP[cbnum];               //删除该函数
            script.parentNode.removeChild(script); //移除script元素
        }
    };

    //立即发送http请求
    script.src = url;
    document.body.appendChild(script); //添加到文档中
}

getJSONP.counter = 0;    //创建唯一回调函数的计数器
