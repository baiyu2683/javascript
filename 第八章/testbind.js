function f(x, y){
    return x + y;
}

var o = {};

var g = f.bind(o,2);

console.log(g(3));
