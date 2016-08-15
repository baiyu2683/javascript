/*function type(o){
    var t, c, n; //type, class, name

    if(o === null) return "null";

    if(o !== o) return "nan";   //NaN和自身不相等

    if((t = typeof o) !== "object") return t;

    if((c = classof(o)) !== "Object") return c;

    if(o.constructor && typeof o.constructor === "function"
       && (n = o.constructor.getName())) return n;

    return "Object";
}

console.log(1);
console.log("1");
console.log(new Date());
console.log(null);
console.log(undefined);
console.log(true);
console.log(/\s/);
*/
