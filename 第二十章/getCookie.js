//将document.cookie的值以名/值对组成的一个对象返回
//假设存储cookie的值时是用encodeURIComponent函数编码的
function getCookie() {
    var cookie = {};
    var all = document.cookie;
    if(all === "") {
        return cookie;
    }
    //cookie之间使用"; "(分好加一个空格)分割的
    var list = all.split("; ");
    for(var i = 0, len = list.length; i < len; i++) {
        var cookieTmp = list[i];
        var p = cookieTmp.indexOf("=");
        var name = cookieTmp.substring(0, p);
        var value = cookieTmp.substring(p+1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
