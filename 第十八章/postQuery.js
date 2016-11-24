//以xml文档为主体发送post请求
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if(request.readyState === 4 && callback) {
            callback(request);
        }
    };

    //新建一个xml文档
    //<query><find zipcode='02134' radius='1km'>pizza</find></query>
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;
    var find = doc.createElement("find");
    query.appendChild(find);
    find.setAttribute("zipcode", where);
    find.setAttribute("radius", radius);
    find.appendChild(doc.createTextNode(what));

    //向服务器发送xml编码的数据，会自动设置Content-Type头
    request.send(doc);
}
