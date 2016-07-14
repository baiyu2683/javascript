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
/*
 *将p中可枚举的属性复制到o中，
 *如果o和p中含有同名属性，则覆盖o中属性
 *不处理getter和setter以及复制属性
 */
function extend(o,p){
    for(prop in p){
        o[prop] = p[prop];
    }
    return o;
}
/*合并*/
function merge(o,p){
    for(prop in p){
        if(!o.hasOwnProperty(prop)){
            o[prop] = p[prop];
        }
    }
    return o;
}
/*删除非同名属性*/
function restrict(o, p){
    for(prop in o){
        if(! (prop in p)){
            delete o[prop];
        }
    }
    return o;
}
/*删除同名属性*/
function substract(o, p){
    for(prop in p){
        delete o[prop];
    }
    return o;
}
