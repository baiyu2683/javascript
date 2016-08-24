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

 for each (let v in o){
    console.log(v);
}
//console.log(p);
