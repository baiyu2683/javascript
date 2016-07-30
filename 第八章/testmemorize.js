function memorize(f){
    var cache = {};
//    var args = arguments;
    return function(){
        var key = argumens.length + Array.prototype.join.call(arguments, ",");
        if(key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    };
}
//返回最大公约数
//欧几里得算法
function gcd(a, b){
    var t;
    if(a < b) t = b, b = a, a = t;
    while(b != 0 ) t = b, b = a%b, a = t;
    return a;
}

var gcdmemo = memorize(gcd);
var result = gcdmemo(85, 187);
console.log(result);
