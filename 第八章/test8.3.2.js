/*实参对象：arguments, 类数组对象*/
function max(/*...*/){
    var max = Number.NEGATIVE_INFINITY;
    for(var i = 0; i < arguments.length; i++){
        if(max < arguments[i]) max = arguments[i];
    }
    return max;
}
/*实参对象包含的属性，callee，指代当前正在运行的函数本身*/
var factorial = function(x){
    if (x <= 1) return 1;
    return x * arguments.callee(x-1);
}
