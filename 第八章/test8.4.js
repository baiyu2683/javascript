//property of function
uniqueInteger.counter = 0;

function uniqueInteger(){
    return uniqueInteger.counter++;
}

function factorial(n){
    if(isFinite(n) && n > 0 && n == Math.round(n)){
        if(!(n in factorial))
            factorial[n] = n * factorial(n - 1);
        return factorial[n];
    }
    else return NaN;
}
factorial[1] = 1;

// test factorial()
factorial(10);
var s = "";
for(v in factorial){
    s += v + ";";
}
console.log(s);
console.log(factorial[0]);
//---
//test uniqueInteger()
for(var i = 0; i < 10; i++){
    console.log(uniqueInteger());
}
