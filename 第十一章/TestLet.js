'use strict';

function oddsums(n){
    let total = 0, result = [];
    for(let x = 1; x <= n; x++){
        let odd = 2*x - 1;
        total += odd;
        result.push(total);
    }
    //x = 1; 这里如果引用x或者odd，会报错： ReferenceError: x is not defined
    return result;
}

console.log(oddsums(2));


let o = {x:1, y:2};
for(let p in o){
    console.log(p);
}
//以下代码貌似都不对，跳过这些介绍了。。之后学es6和nodejs怎么支持es6

 //for each (let v in o){    //会报错
   // console.log(v);
//}
//console.log(p);

let x = 1;
for(let x = x + 1; x < 5; x++){  //报错 ReferenceError: x is not defined
    console.log(x);
}
{
    let x = x + 1;
    console.log(x);
}
