//call + apply，抄过来的试下
function trace(o, m){
    var original = o[m];   //在闭包中保存原始方法
    o[m] = function(){
        console.log(new Date(),"Entering:", m); //输出日志消息
        var result = original.apply(this, arguments);//调用原始函数
        console.log(new Date(), "Exiting:", m);//输出日志消息
        return result;
    };
}

var o = {};
o.m = function(){
    var s = "";
    for(var i = 0; i < 10; i++){
        if(i < 9)
            s += i + "-";
        else
            s += i;
    }
    return s;
};

trace(o,'m');

console.info(o.m());
