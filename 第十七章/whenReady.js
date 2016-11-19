/**
 * 传递函数给whenReady，当稳当解析完毕且为操作准备就绪时，函数作为文档对象的方法调用
 */
var whenReady = (function(){   //这个函数表达式返回whenReady函数
    var funcs = [];   //当获得事件时，需要运行的函数
    var ready = false;  //当触发事件处理程序是，切换到true

    //当文档就绪时，调用事件处理程序
    function handler(e){
        //如果已经运行过一次，只需要返回
        if(ready) return;

        //如果发生readystatechange事件
        //但其状态不是‘complete’的话，说明文档尚未准备好
        if(e.type === "readystatechange" && document.readyState !== "complete")
            return;

        //运行所有注册函数
        //注意每次都要计算funcs.length
        //以防这些函数的调用可能会导致注册更多的函数
        for(var i = 0; i < funcs.length; i++){
            funcs[i].call(document);
        }

        //现在设置reday标示为true, 并移除所有函数
        ready = true;
        funcs = null;
    }

    //为接受到的任何事件注册处理程序
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if(document.attachEvent){
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }

    //返回whenReady函数
    return function whenReady(f) {
        if(ready) f.call(document);
        else funcs.push(f);
    };

}());
