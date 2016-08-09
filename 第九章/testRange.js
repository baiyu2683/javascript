function inherit(p){
    if(p == null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){};
    f.prototype = p;
    return new f();
}

function range(from, to){
    var r = inherit(range.methods);
    r.from = from;
    r.to = to;
    return r;
}

range.methods={
    includes:function(x){
        return this.from <= x && x <= this.to;
    },

    foreach: function(y){
        for(var x = Math.ceil(this.from); x <= this.to; x++) y(x);
    },
    toString:function(){
        return "(" + this.from + "..." + this.to + ")";
    }
}


var r = range(1, 4);
console.log("--------------");
console.log(r.includes(2));
console.log("--------------");
r.foreach(console.log);
console.log("--------------");
console.log(r.toString());        //发现这个toString必须显式调用啊
console.log(r);
