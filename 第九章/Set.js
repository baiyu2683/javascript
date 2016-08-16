function Set(){
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);            //这一行什么意思?
}

//add all arguments to Set
Set.prototype.add = function(){
    for(var i = 0; i < arguments.length; i++){
        var val = arguments[i];
        var str = Set._v2s(val);
        if(!this.values.hasOwnProperty(str)){
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

//delete arguments from Set
Set.prototype.delete = function(){
    for(var i = 0; i < arguments.length; i++){
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

//contains
Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
};

//foreach, 这个什么上下文怎么调用要试一下
Set.prototype.forEach = function(f, context){
    for(var s in this.values){
        if(this.values.hasOwnProperty(s))
            f.call(context, this.values[s]);
    }
};

//
Set._v2s = function(val){
    switch(val){
    case undefined: return 'u';
    case null: return 'n';
    case true: return 't';
    case false: return 'f';                      //以上几种只能有一个
    default: switch(typeof val){
        case 'number': return '#' + val;
        case 'string': return '"' + val;
        default: return '@' + objectId(val);
        }
    }
    function objectId(o){
        var prop = "|**objectid**|";  //这个值用来存放对象id
        if(!o.hasOwnProperty(prop))
            o[prop] = Set._v2s.next++;
        return o[prop];
    }
};
Set._v2s.next = 100; //初始id


var set = new Set();
set.add(1,2,3,4,new Date(),[1,2,3]);
set.forEach(console.log);
var set1 = new Set();
console.log("----------------------------");
set1.add(new Date(),[1,2,3]);
//set.forEach(console.error, set1); //试了上下文,还是不懂....
