//使用post方法发送multipart/form-data请求主体
function postFormData(url, data, callback) {
    if(typeof FormData === "undefined") {
        throw new Error("FormData is not implemented");
    }

    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if(request.readyState === 4 && callback) {
            callback(request);
        }
    };
    var formdata = new FormData();
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue;
        var value = data[name];
        if(typeof value === "function") continue;
        //每个属性变成请求的一部分
        formdata.append(name, value); //用FormData的append方法来加参数，允许file
    }
    //发送请求，send()会自动设置Content-Type头
    request.send(formdata);
}
