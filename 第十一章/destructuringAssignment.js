//解构赋值
let [x, y]  = [1, 2];

[x, y] = [x+1, y+1];
[x, y] = [y, x];

console.log([x, y]);
console.log(x + "-" + y);


//右侧是对象
let transparent = {r:0.0, g:0.0, b:0.0, a:0.0};
let {r:red, g:green, b:blue} = transparent;// red = 0, green = 0, blue = 0
