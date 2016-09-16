/**
 * 函数接受任意多的参数
 * 每个参数讲当做元素的id传给getElementById
 * 返回一个对象，把这些id映射到对应Element对象
 * 如任意一个id未定义，则抛出Error对象
 */
function getElements(/*id...*/){
    var elements = {};
    for(var i = 0; i < arguments.length; i++){
        var id = arguments[i];
        var elt = document.getElementById(id);
        if(elt === null){
            throw new Error("No element with id:" + id);
        }
        elements[id] = elt;
    }
    return elements;
}
