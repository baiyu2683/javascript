//编码表单数据
function encodeFormData(data) {
    if(!data) return "";
    var pairs = [];
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue; //跳过继承
        if(typeof data[name] === "function") continue;//跳过方法
        var value = data[name].toString();
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pairs.push(name + "=" + value);   //记住名=值对
    }
    return pairs.join("&");
}
