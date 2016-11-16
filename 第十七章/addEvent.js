/**
 * addEventListener默认this是事件的目标
 * attachEvent的this是全局window对象
 */
function addEvent(target, type, handler){
    if(target.addEventListener)
        target.addEventListener(type, handler, false);
    else
        target.attachEvent("on" + type, ,
                           function(event){
                               //把处理程序作为事件目标的方法调用
                               //传递事件对象
                               return handler.call(target, event);
                           });
}
