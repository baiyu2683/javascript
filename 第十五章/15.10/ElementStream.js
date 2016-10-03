//针对innerHTML属性的流式API
function ElementStream(elt){
    if(typeof elt === 'string')
        elt = document.getElementById(elt);
    this.elt = elt;
    this.buffer = "";
}

//连接所有参数
ElementStream.prototype.write = function(){
    this.buffer += Array.prototype.join.call(arguments, "");
};

//参数加换行符,writeln
ElementStream.prototype.writeln = function(){
    this.buffer += Array.prototype.join.call(arguments, "\n");
};

//从缓存中设置元素的内容，然后清空缓存
ElementStream.prototype.close = function(){
    this.elt.innerHTML = this.buffer;
    this.buffer = "";
};
