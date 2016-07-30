//参数时一个函数f,返回一个数组
function mapper(f){
    return function(a) { return a.map(f); };
}

var increment = function(x){return x+1;};
var incrementer = mapper(increment);
var result = incrementer([1,2,3,4]);
console.log(result);



//返回一个可以计算f(g(...))的函数
function compose(f, g){
    return function(){
        return f.call(this, g.apply(this, arguments));
    };
}

var square = function(x){ return x * x; };
var sum = function(x,y) { return x + y; };
var squareofsum = compose(square, sum);
var result2 = squareofsum(2,3);
console.log(result2);
