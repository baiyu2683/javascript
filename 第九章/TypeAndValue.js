//eval("document.write(\"<script src='Complex.js'></script>\")");
function typeAndValue(x){
    if(x == null) return "";
    switch(x.constructor){
    case Number:return "Number:" + x;
    case String : return "String:" + x;
    case Date:return "Date:" + x;
    case RegExp:return "RegExp:" + x;
//    case Complex:return "Complex:" + x;
    }
}

console.log(typeAndValue(1));
console.log(typeAndValue('1'));
console.log(typeAndValue(new Date()));
console.log(typeAndValue(/\s/));
//console.log(typeAndValue(new Complex(1,2)));
