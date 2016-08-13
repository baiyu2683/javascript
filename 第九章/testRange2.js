function Range(from, to){
    this.from = from;
    this.to = to;
}

Range.prototype = {
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

var r =new Range(1, 4);
console.log("--------------");
console.log(r.includes(2));
console.log("--------------");
r.foreach(console.log);
console.log("--------------");
console.log(r.toString());        //发现这个toString必须显式调用啊
console.log(r);
