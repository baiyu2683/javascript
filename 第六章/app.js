//得到继承p的对象
function inherit(p){
    if(p == null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){};
    f.prototype = p;
    return new f();
}
//测试动态生成字符串访问数组属性
function show1(){
    var customer = [];
    customer["address0"] = "0";
    customer["address1"] = "1";
    customer["address2"] = "2";
    customer["address3"] = "3";
    var addr = "";
    for(var i = 0; i < 4; i++){
        var tmp = customer["address" + i];
        console.log("第"+i+"个:" + tmp);
        addr += tmp + "\n";
    }
    console.log(addr);
}
//测试严格模式下能够给一些对象复制
function show2(){
    "use strict";
    Object.prototype = 0;
}

