/**
 * 解析url中带的参数
 */
function urlArgs(){
    var args = {};
    var query = location.search.substring(1);    //去掉？ , location.search()获得的参数为 “？key1=1&key2=2..”
    var pairs = query.split("&");
    for(var i = 0; i < pairs.length; i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);         //对value进行解码
        args[name] = value;
    }
    return args;
}
