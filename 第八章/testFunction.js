/*用function关键字定义函数*/
function f(x, y){
    return x + y;
}

/*用构造函数Function()来定义函数*/
var g = new Function('x', 'y', 'z', "return x * y * z;");

//toString()方法返回函数的源码
console.log(g(1,2,3));

var h = new Function("return 'zhangheng';");
console.log(h());

console.log(Object.prototype.toString.call(f));
