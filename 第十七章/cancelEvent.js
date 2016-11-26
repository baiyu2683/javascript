function calcelHandler(event){
    event = event || window.event;   //用于IE

    //TODO 事件处理代码

    if(event.preventDefault) event.preventDefault();  //标准API
    if(event.returnValue) event.returnValue = false;  //IE
    return false;    //用于处理使用对象属性注册的处理程序
}

