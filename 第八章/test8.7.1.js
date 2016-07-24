//funciton的length属性，实参的个数
function check(args){
    var actual = args.length;
    var expected = args.callee.length;
    if(actual !== expected)
        //        throw Error("Expected " + expected + "args; got " + actual);
        console.error("Expected " + expected + "args; got " + actual);
}
function f(x, y, z){
    check(arguments);
    return x + y + z;
}

f(1,3,4,5);
console.log(f.length);
