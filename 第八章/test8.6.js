//closure
function test0(){
    var x = 1;
    function f(){
        return x++;
    }
    return f();
}
function test1(){
    var x = 1;
    function f(){
        return x++;
    }
    return f;
}
function test2(){
    var x = 1;
    return function(){return x++;};
}
var uniqueInteger = (function(){
    var counter = 0;
    return function(){return counter++;};
}());
//test
var f0 = test0();
console.log(f0);
console.log(f0);
console.log("--------------");
var f1 = test1();
console.log(f1());
console.log(f1());
console.log("--------------");
var f2 = test2();
console.log(f2());
console.log(f2());
console.log("--------------");
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());
